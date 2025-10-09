# Data Access Smart Contract

This ink! smart contract manages customer data access permissions and payments for the Web3 CRM.

## Features

- **Request Access**: Businesses can request access to customer data with escrowed payment
- **Approve/Reject**: Customers approve or reject access requests
- **Time-Limited Access**: Access automatically expires after the specified duration
- **Payment Escrow**: DOT payments are held in contract until approved or rejected
- **Revoke Access**: Customers can revoke access at any time
- **Access Verification**: Check if a business has active access to customer data

## Contract Functions

### For Businesses

#### `request_access(customer, requested_fields, duration_days)`
- **Payable**: Requires DOT payment
- **Parameters**:
  - `customer`: AccountId of the customer
  - `requested_fields`: Vec<u8> encoded list of fields requested
  - `duration_days`: How long access should last
- **Returns**: Request ID
- **Description**: Creates an access request and escrows payment

#### `has_access(business, customer)`
- **View**: Read-only
- **Parameters**:
  - `business`: Business AccountId
  - `customer`: Customer AccountId
- **Returns**: bool
- **Description**: Check if business currently has active access

#### `get_business_requests(business, customer)`
- **View**: Read-only
- **Returns**: Vec<u64> of request IDs
- **Description**: Get all requests from a business to a specific customer

### For Customers

#### `approve_access(request_id)`
- **Parameters**: request_id
- **Description**: Approves an access request and transfers payment to customer

#### `reject_access(request_id)`
- **Parameters**: request_id
- **Description**: Rejects an access request and refunds payment to business

#### `revoke_access(request_id)`
- **Parameters**: request_id
- **Description**: Revokes previously approved access

#### `get_customer_requests(customer)`
- **View**: Read-only
- **Returns**: Vec<u64> of request IDs
- **Description**: Get all requests for a customer

### For Anyone

#### `get_request(request_id)`
- **View**: Read-only
- **Returns**: AccessRequest struct
- **Description**: Get details of a specific request

## Data Structures

### AccessRequest
```rust
pub struct AccessRequest {
    pub business: AccountId,        // Business requesting access
    pub customer: AccountId,        // Customer whose data is requested
    pub requested_fields: Vec<u8>,  // Encoded field list
    pub payment_amount: Balance,    // Payment in DOT
    pub duration: u64,              // Duration in seconds
    pub status: RequestStatus,      // Current status
    pub created_at: Timestamp,      // When created
    pub expires_at: Option<Timestamp>, // When access expires
}
```

### RequestStatus
```rust
pub enum RequestStatus {
    Pending,   // Waiting for customer approval
    Approved,  // Customer approved, access active
    Rejected,  // Customer rejected or business revoked
    Expired,   // Access period has ended
}
```

## Events

- `AccessRequested`: Emitted when a business requests access
- `AccessApproved`: Emitted when a customer approves access
- `AccessRejected`: Emitted when a customer rejects access
- `AccessRevoked`: Emitted when access is revoked

## Building the Contract

### Prerequisites
```bash
# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install ink! CLI
cargo install cargo-contract --force

# Add wasm target
rustup component add rust-src
rustup target add wasm32-unknown-unknown
```

### Build
```bash
cd contracts/data_access
cargo contract build --release
```

This will generate:
- `target/ink/data_access.contract` (contract + metadata)
- `target/ink/data_access.wasm` (contract code)
- `target/ink/data_access.json` (metadata)

## Testing

Run the included unit tests:
```bash
cargo test
```

## Deployment

### Deploy to Testnet (Westend/Rococo)

1. **Using Contracts UI** (Easiest):
   - Go to [https://contracts-ui.substrate.io/](https://contracts-ui.substrate.io/)
   - Connect to Westend or Rococo Contracts
   - Upload `data_access.contract`
   - Deploy with constructor parameters
   - Save the contract address

2. **Using cargo-contract CLI**:
   ```bash
   cargo contract instantiate \
     --constructor new \
     --suri //Alice \
     --url wss://westend-rpc.polkadot.io
   ```

### After Deployment

1. Copy the contract address
2. Add to `.env.local`:
   ```
   NEXT_PUBLIC_CONTRACT_ADDRESS=your_contract_address
   ```
3. Update frontend integration to use the deployed contract

## Usage Example

### Business Side (JavaScript/TypeScript)
```typescript
import { ApiPromise, WsProvider } from '@polkadot/api';
import { ContractPromise } from '@polkadot/api-contract';

// Connect to chain
const provider = new WsProvider('wss://westend-rpc.polkadot.io');
const api = await ApiPromise.create({ provider });

// Load contract
const contract = new ContractPromise(api, contractAbi, contractAddress);

// Request access (with 5 DOT payment)
const tx = contract.tx.requestAccess(
  { value: 5000000000000 }, // 5 DOT in pico
  customerAddress,
  encodedFields,
  30 // 30 days
);

await tx.signAndSend(businessAccount);
```

### Customer Side
```typescript
// Approve access
const tx = contract.tx.approveAccess({}, requestId);
await tx.signAndSend(customerAccount);

// Or reject
const tx = contract.tx.rejectAccess({}, requestId);
await tx.signAndSend(customerAccount);
```

## Security Considerations

1. **Payment Escrow**: Payments are held in the contract until approved or rejected
2. **Authorization**: Only customers can approve/reject their own requests
3. **Time Limits**: Access automatically expires after the duration
4. **No Double Spending**: Cannot approve the same request twice
5. **Refunds**: Rejected requests automatically refund the business

## Future Enhancements

- [ ] Partial refunds for early revocation
- [ ] Multi-signature approvals for businesses
- [ ] Field-level permissions
- [ ] Access rate limiting
- [ ] Encrypted field storage on IPFS
- [ ] Cross-chain support via XCM

## License

MIT License - Open Source
