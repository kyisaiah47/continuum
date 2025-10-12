"use client"

import Link from "next/link"
import { GridBackground, SectionDivider } from "@/components/ui/plural"
import { ContinuumHeader } from "@/components/continuum-header"
import { ArrowLeft, Code, Database, Zap, RefreshCw } from "lucide-react"

export default function SmartContracts() {
  return (
    <GridBackground showCorners className="min-h-screen">
      <ContinuumHeader currentPage="docs" />

      <main className="pt-32 pb-16 px-8">
        <div className="max-w-[900px] mx-auto">
          <Link
            href="/continuum/docs"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-primary transition mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Documentation
          </Link>

          <h1 className="text-6xl font-light tracking-tight text-white mb-4">
            Smart Contracts
          </h1>
          <p className="text-xl text-white/50 mb-16">
            Write and deploy ink! smart contracts for privacy-preserving data access
          </p>

          <SectionDivider label="Contract Structure" />

          <div className="mt-12 space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <div className="h-10 w-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Code className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-light text-white mb-4">Basic Contract Layout</h3>
                <p className="text-base text-white/60 mb-4">
                  A Continuum smart contract follows the standard ink! structure with privacy-specific patterns:
                </p>
              </div>
            </div>

            <div className="bg-black/40 border border-white/[0.08] rounded-lg p-6">
              <pre className="text-sm font-mono text-primary overflow-x-auto">
{`#![cfg_attr(not(feature = "std"), no_std)]

#[ink::contract]
mod data_access {
    use ink::storage::Mapping;

    #[ink(storage)]
    pub struct DataAccessControl {
        /// Contract owner
        owner: AccountId,
        /// Mapping of company -> customer access requests
        requests: Mapping<(AccountId, AccountId), AccessRequest>,
        /// Counter for request IDs
        request_count: u64,
    }

    #[derive(scale::Decode, scale::Encode)]
    #[cfg_attr(
        feature = "std",
        derive(scale_info::TypeInfo, ink::storage::traits::StorageLayout)
    )]
    pub struct AccessRequest {
        pub company: AccountId,
        pub customer: AccountId,
        pub fields: Vec<String>,
        pub payment: Balance,
        pub status: RequestStatus,
        pub expires_at: Timestamp,
    }

    #[derive(scale::Decode, scale::Encode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub enum RequestStatus {
        Pending,
        Approved,
        Rejected,
        Expired,
    }
}`}
              </pre>
            </div>

            <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-6">
              <h4 className="text-lg text-white mb-3">Key Components</h4>
              <ul className="space-y-3">
                <li className="text-base text-white/60">
                  <span className="text-primary font-mono">#[ink(storage)]</span> - Defines persistent contract state
                </li>
                <li className="text-base text-white/60">
                  <span className="text-primary font-mono">Mapping</span> - Key-value storage for efficient lookups
                </li>
                <li className="text-base text-white/60">
                  <span className="text-primary font-mono">AccountId</span> - Polkadot address type for users and contracts
                </li>
                <li className="text-base text-white/60">
                  <span className="text-primary font-mono">Balance</span> - Native token amounts (DOT)
                </li>
              </ul>
            </div>
          </div>

          <SectionDivider label="Storage & Events" className="mt-16" />

          <div className="mt-12 space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <div className="h-10 w-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Database className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-light text-white mb-4">Contract Events</h3>
                <p className="text-base text-white/60 mb-4">
                  Events allow off-chain applications to listen for contract activity:
                </p>
              </div>
            </div>

            <div className="bg-black/40 border border-white/[0.08] rounded-lg p-6">
              <pre className="text-sm font-mono text-primary overflow-x-auto">
{`#[ink(event)]
pub struct AccessRequested {
    #[ink(topic)]
    company: AccountId,
    #[ink(topic)]
    customer: AccountId,
    fields: Vec<String>,
    payment: Balance,
    request_id: u64,
}

#[ink(event)]
pub struct AccessApproved {
    #[ink(topic)]
    company: AccountId,
    #[ink(topic)]
    customer: AccountId,
    request_id: u64,
    expires_at: Timestamp,
}

#[ink(event)]
pub struct AccessRevoked {
    #[ink(topic)]
    company: AccountId,
    #[ink(topic)]
    customer: AccountId,
    request_id: u64,
}`}
              </pre>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-6">
              <h4 className="text-lg text-yellow-400 mb-2">Event Best Practices</h4>
              <ul className="space-y-2 text-sm text-yellow-400/80">
                <li>• Use <code className="font-mono">#[ink(topic)]</code> for fields you want to filter by</li>
                <li>• Limit topics to 3-4 per event for optimal indexing</li>
                <li>• Always emit events after state changes</li>
                <li>• Include all relevant data for off-chain processing</li>
              </ul>
            </div>

            <div className="bg-black/40 border border-white/[0.08] rounded-lg p-6">
              <p className="text-sm text-white/40 mb-3">Emitting events in contract methods:</p>
              <pre className="text-sm font-mono text-primary overflow-x-auto">
{`#[ink(message)]
pub fn request_access(
    &mut self,
    customer: AccountId,
    fields: Vec<String>,
    payment: Balance,
) -> Result<u64, Error> {
    let company = self.env().caller();
    let request_id = self.request_count;

    // ... store request ...

    self.env().emit_event(AccessRequested {
        company,
        customer,
        fields,
        payment,
        request_id,
    });

    Ok(request_id)
}`}
              </pre>
            </div>
          </div>

          <SectionDivider label="Cross-Contract Calls" className="mt-16" />

          <div className="mt-12 space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <div className="h-10 w-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-light text-white mb-4">Calling Other Contracts</h3>
                <p className="text-base text-white/60 mb-4">
                  Interact with other contracts for payment processing, data verification, or composability:
                </p>
              </div>
            </div>

            <div className="bg-black/40 border border-white/[0.08] rounded-lg p-6">
              <pre className="text-sm font-mono text-primary overflow-x-auto">
{`use payment_contract::PaymentContractRef;

#[ink(storage)]
pub struct DataAccessControl {
    payment_contract: AccountId,
    // ... other fields
}

#[ink(message)]
pub fn approve_with_payment(
    &mut self,
    company: AccountId,
) -> Result<(), Error> {
    let customer = self.env().caller();
    let request = self.get_request(company, customer)?;

    // Call external payment contract
    let mut payment = PaymentContractRef::from_account_id(
        self.payment_contract
    );

    payment.process_payment(
        company,
        customer,
        request.payment
    )?;

    // Update access status
    self.approve_access_internal(company, customer)?;

    Ok(())
}`}
              </pre>
            </div>

            <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-6">
              <h4 className="text-lg text-white mb-3">Cross-Contract Patterns</h4>
              <div className="space-y-3 text-base text-white/60">
                <p>
                  <span className="text-primary">Builder Pattern:</span> Use contract references for type-safe calls
                </p>
                <p>
                  <span className="text-primary">Error Handling:</span> Propagate errors with the <code className="font-mono">?</code> operator
                </p>
                <p>
                  <span className="text-primary">Gas Management:</span> Be mindful of gas limits when chaining calls
                </p>
              </div>
            </div>
          </div>

          <SectionDivider label="Contract Upgrades" className="mt-16" />

          <div className="mt-12 space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <div className="h-10 w-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <RefreshCw className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-light text-white mb-4">Upgradeability Patterns</h3>
                <p className="text-base text-white/60 mb-4">
                  Design contracts that can be upgraded without losing state or breaking integrations:
                </p>
              </div>
            </div>

            <div className="bg-black/40 border border-white/[0.08] rounded-lg p-6">
              <p className="text-sm text-white/40 mb-3">Proxy Pattern Implementation:</p>
              <pre className="text-sm font-mono text-primary overflow-x-auto">
{`#[ink(storage)]
pub struct Proxy {
    /// Address of the current implementation
    implementation: AccountId,
    /// Contract admin who can upgrade
    admin: AccountId,
}

#[ink(message)]
pub fn upgrade(&mut self, new_implementation: AccountId) -> Result<(), Error> {
    if self.env().caller() != self.admin {
        return Err(Error::Unauthorized);
    }

    self.implementation = new_implementation;
    self.env().emit_event(Upgraded {
        new_implementation,
    });

    Ok(())
}

#[ink(message)]
pub fn forward_call(&mut self, selector: [u8; 4], data: Vec<u8>) -> Vec<u8> {
    // Forward call to implementation contract
    self.env()
        .call_runtime(self.implementation, selector, data)
}`}
              </pre>
            </div>

            <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-6">
              <h4 className="text-lg text-white mb-3">Upgrade Strategies</h4>
              <div className="grid gap-4">
                <div>
                  <h5 className="text-base text-primary mb-2">1. Proxy Pattern</h5>
                  <p className="text-sm text-white/60">
                    Separate logic and storage contracts. Upgrade logic while preserving data.
                  </p>
                </div>
                <div>
                  <h5 className="text-base text-primary mb-2">2. Data Migration</h5>
                  <p className="text-sm text-white/60">
                    Deploy new contract and migrate data. Useful for major structural changes.
                  </p>
                </div>
                <div>
                  <h5 className="text-base text-primary mb-2">3. Versioning</h5>
                  <p className="text-sm text-white/60">
                    Include version numbers in storage to handle backward compatibility.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-8">
            <h3 className="text-2xl font-light text-white mb-4">Next Steps</h3>
            <div className="space-y-3">
              <Link
                href="/continuum/docs/sdk-reference"
                className="block text-base text-primary hover:text-primary/80 transition"
              >
                → Learn how to interact with contracts using the SDK
              </Link>
              <Link
                href="/continuum/docs/security"
                className="block text-base text-primary hover:text-primary/80 transition"
              >
                → Review Security Best Practices
              </Link>
              <Link
                href="/continuum/playground"
                className="block text-base text-primary hover:text-primary/80 transition"
              >
                → Test your contracts in the Playground
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-white/[0.08] px-8 py-8">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <p className="text-xs text-white/30">© 2025 Continuum. Built on Polkadot.</p>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
            <span className="text-xs text-white/30">Network Online</span>
          </div>
        </div>
      </footer>
    </GridBackground>
  )
}
