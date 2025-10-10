#![cfg_attr(not(feature = "std"), no_std, no_main)]

/// Web3 CRM Data Access Control Smart Contract
/// This contract manages customer data access permissions and payments
#[ink::contract]
mod data_access {
    use ink::prelude::vec::Vec;
    use ink::storage::Mapping;

    /// Status of an access request
    #[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo, ink::storage::traits::StorageLayout))]
    pub enum RequestStatus {
        Pending,
        Approved,
        Rejected,
        Expired,
    }

    /// Data access request structure
    #[derive(Debug, scale::Encode, scale::Decode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo, ink::storage::traits::StorageLayout))]
    pub struct AccessRequest {
        /// Business requesting access
        pub business: AccountId,
        /// Customer whose data is requested
        pub customer: AccountId,
        /// Fields being requested
        pub requested_fields: Vec<u8>, // Encoded field list
        /// Payment amount in DOT
        pub payment_amount: Balance,
        /// Duration of access in seconds
        pub duration: u64,
        /// Status of the request
        pub status: RequestStatus,
        /// When the request was created
        pub created_at: Timestamp,
        /// When access expires (if approved)
        pub expires_at: Option<Timestamp>,
    }

    /// Events emitted by the contract
    #[ink(event)]
    pub struct AccessRequested {
        #[ink(topic)]
        request_id: u64,
        #[ink(topic)]
        business: AccountId,
        #[ink(topic)]
        customer: AccountId,
        payment_amount: Balance,
    }

    #[ink(event)]
    pub struct AccessApproved {
        #[ink(topic)]
        request_id: u64,
        expires_at: Timestamp,
    }

    #[ink(event)]
    pub struct AccessRejected {
        #[ink(topic)]
        request_id: u64,
    }

    #[ink(event)]
    pub struct AccessRevoked {
        #[ink(topic)]
        request_id: u64,
    }

    /// Storage for the data access contract
    #[ink(storage)]
    pub struct DataAccess {
        /// Mapping from request ID to AccessRequest
        requests: Mapping<u64, AccessRequest>,
        /// Counter for request IDs
        next_request_id: u64,
        /// Mapping from (business, customer) to list of request IDs
        business_requests: Mapping<(AccountId, AccountId), Vec<u64>>,
        /// Mapping from customer to list of request IDs
        customer_requests: Mapping<AccountId, Vec<u64>>,
    }

    /// Errors that can occur in the contract
    #[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub enum Error {
        /// Request not found
        RequestNotFound,
        /// Caller is not authorized
        Unauthorized,
        /// Insufficient payment
        InsufficientPayment,
        /// Request already processed
        AlreadyProcessed,
        /// Access has expired
        AccessExpired,
        /// Transfer failed
        TransferFailed,
    }

    pub type Result<T> = core::result::Result<T, Error>;

    impl DataAccess {
        /// Constructor
        #[ink(constructor)]
        pub fn new() -> Self {
            Self {
                requests: Mapping::new(),
                next_request_id: 0,
                business_requests: Mapping::new(),
                customer_requests: Mapping::new(),
            }
        }

        /// Request access to customer data
        /// Payment is escrowed in the contract
        #[ink(message, payable)]
        pub fn request_access(
            &mut self,
            customer: AccountId,
            requested_fields: Vec<u8>,
            duration_days: u32,
        ) -> Result<u64> {
            let caller = self.env().caller();
            let payment = self.env().transferred_value();
            let duration_seconds = (duration_days as u64).saturating_mul(86400); // Convert days to seconds

            // Ensure payment was sent
            if payment == 0 {
                return Err(Error::InsufficientPayment);
            }

            // Create the request
            let request_id = self.next_request_id;
            let request = AccessRequest {
                business: caller,
                customer,
                requested_fields,
                payment_amount: payment,
                duration: duration_seconds,
                status: RequestStatus::Pending,
                created_at: self.env().block_timestamp(),
                expires_at: None,
            };

            // Store the request
            self.requests.insert(request_id, &request);
            self.next_request_id = self.next_request_id.saturating_add(1);

            // Add to business and customer request lists
            let mut business_list = self
                .business_requests
                .get(&(caller, customer))
                .unwrap_or_default();
            business_list.push(request_id);
            self.business_requests.insert(&(caller, customer), &business_list);

            let mut customer_list = self.customer_requests.get(&customer).unwrap_or_default();
            customer_list.push(request_id);
            self.customer_requests.insert(&customer, &customer_list);

            // Emit event
            self.env().emit_event(AccessRequested {
                request_id,
                business: caller,
                customer,
                payment_amount: payment,
            });

            Ok(request_id)
        }

        /// Approve an access request (customer only)
        #[ink(message)]
        pub fn approve_access(&mut self, request_id: u64) -> Result<()> {
            let caller = self.env().caller();
            let mut request = self.requests.get(request_id).ok_or(Error::RequestNotFound)?;

            // Only customer can approve
            if request.customer != caller {
                return Err(Error::Unauthorized);
            }

            // Must be pending
            if request.status != RequestStatus::Pending {
                return Err(Error::AlreadyProcessed);
            }

            // Set expiration time
            let now = self.env().block_timestamp();
            let expires_at = now.saturating_add(request.duration);
            request.expires_at = Some(expires_at);
            request.status = RequestStatus::Approved;

            // Update storage
            self.requests.insert(request_id, &request);

            // Transfer payment to customer
            if self.env().transfer(request.customer, request.payment_amount).is_err() {
                return Err(Error::TransferFailed);
            }

            // Emit event
            self.env().emit_event(AccessApproved {
                request_id,
                expires_at,
            });

            Ok(())
        }

        /// Reject an access request (customer only)
        #[ink(message)]
        pub fn reject_access(&mut self, request_id: u64) -> Result<()> {
            let caller = self.env().caller();
            let mut request = self.requests.get(request_id).ok_or(Error::RequestNotFound)?;

            // Only customer can reject
            if request.customer != caller {
                return Err(Error::Unauthorized);
            }

            // Must be pending
            if request.status != RequestStatus::Pending {
                return Err(Error::AlreadyProcessed);
            }

            request.status = RequestStatus::Rejected;
            self.requests.insert(request_id, &request);

            // Refund payment to business
            if self.env().transfer(request.business, request.payment_amount).is_err() {
                return Err(Error::TransferFailed);
            }

            // Emit event
            self.env().emit_event(AccessRejected { request_id });

            Ok(())
        }

        /// Revoke access early (customer only)
        #[ink(message)]
        pub fn revoke_access(&mut self, request_id: u64) -> Result<()> {
            let caller = self.env().caller();
            let mut request = self.requests.get(request_id).ok_or(Error::RequestNotFound)?;

            // Only customer can revoke
            if request.customer != caller {
                return Err(Error::Unauthorized);
            }

            // Must be approved
            if request.status != RequestStatus::Approved {
                return Err(Error::AlreadyProcessed);
            }

            request.status = RequestStatus::Rejected;
            request.expires_at = None;
            self.requests.insert(request_id, &request);

            // Emit event
            self.env().emit_event(AccessRevoked { request_id });

            Ok(())
        }

        /// Check if business has active access to customer data
        #[ink(message)]
        pub fn has_access(&self, business: AccountId, customer: AccountId) -> bool {
            if let Some(request_ids) = self.business_requests.get(&(business, customer)) {
                let now = self.env().block_timestamp();
                for request_id in request_ids.iter() {
                    if let Some(request) = self.requests.get(request_id) {
                        if request.status == RequestStatus::Approved {
                            if let Some(expires_at) = request.expires_at {
                                if now < expires_at {
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
            false
        }

        /// Get a specific access request
        #[ink(message)]
        pub fn get_request(&self, request_id: u64) -> Option<AccessRequest> {
            self.requests.get(request_id)
        }

        /// Get all requests for a customer
        #[ink(message)]
        pub fn get_customer_requests(&self, customer: AccountId) -> Vec<u64> {
            self.customer_requests.get(&customer).unwrap_or_default()
        }

        /// Get all requests from a business to a customer
        #[ink(message)]
        pub fn get_business_requests(
            &self,
            business: AccountId,
            customer: AccountId,
        ) -> Vec<u64> {
            self.business_requests
                .get(&(business, customer))
                .unwrap_or_default()
        }
    }

    #[cfg(test)]
    mod tests {
        use super::*;

        #[ink::test]
        fn request_access_works() {
            let mut contract = DataAccess::new();
            let accounts = ink::env::test::default_accounts::<ink::env::DefaultEnvironment>();

            // Set caller as business
            ink::env::test::set_caller::<ink::env::DefaultEnvironment>(accounts.alice);
            ink::env::test::set_value_transferred::<ink::env::DefaultEnvironment>(1000);

            let result = contract.request_access(
                accounts.bob,
                vec![1, 2, 3], // Sample field data
                30,            // 30 days
            );

            assert!(result.is_ok());
            let request_id = result.unwrap();
            assert_eq!(request_id, 0);

            let request = contract.get_request(request_id).unwrap();
            assert_eq!(request.business, accounts.alice);
            assert_eq!(request.customer, accounts.bob);
            assert_eq!(request.status, RequestStatus::Pending);
        }

        #[ink::test]
        fn approve_access_works() {
            let mut contract = DataAccess::new();
            let accounts = ink::env::test::default_accounts::<ink::env::DefaultEnvironment>();

            // Business requests access
            ink::env::test::set_caller::<ink::env::DefaultEnvironment>(accounts.alice);
            ink::env::test::set_value_transferred::<ink::env::DefaultEnvironment>(1000);
            let request_id = contract.request_access(accounts.bob, vec![1, 2, 3], 30).unwrap();

            // Customer approves
            ink::env::test::set_caller::<ink::env::DefaultEnvironment>(accounts.bob);
            let result = contract.approve_access(request_id);
            assert!(result.is_ok());

            let request = contract.get_request(request_id).unwrap();
            assert_eq!(request.status, RequestStatus::Approved);
            assert!(request.expires_at.is_some());
        }

        #[ink::test]
        fn has_access_works() {
            let mut contract = DataAccess::new();
            let accounts = ink::env::test::default_accounts::<ink::env::DefaultEnvironment>();

            // Initially no access
            assert!(!contract.has_access(accounts.alice, accounts.bob));

            // Business requests access
            ink::env::test::set_caller::<ink::env::DefaultEnvironment>(accounts.alice);
            ink::env::test::set_value_transferred::<ink::env::DefaultEnvironment>(1000);
            let request_id = contract.request_access(accounts.bob, vec![1, 2, 3], 30).unwrap();

            // Still no access (pending)
            assert!(!contract.has_access(accounts.alice, accounts.bob));

            // Customer approves
            ink::env::test::set_caller::<ink::env::DefaultEnvironment>(accounts.bob);
            contract.approve_access(request_id).unwrap();

            // Now has access
            assert!(contract.has_access(accounts.alice, accounts.bob));
        }
    }
}
