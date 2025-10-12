"use client"

import Link from "next/link"
import { GridBackground, SectionDivider } from "@/components/ui/plural"
import { ContinuumHeader } from "@/components/continuum-header"
import { ArrowLeft, Shield, Lock, AlertTriangle, TestTube } from "lucide-react"

export default function SecurityBestPractices() {
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
            Security Best Practices
          </h1>
          <p className="text-xl text-white/50 mb-16">
            Learn how to build secure and auditable privacy infrastructure
          </p>

          <SectionDivider label="Access Control" />

          <div className="mt-12 space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <div className="h-10 w-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-light text-white mb-4">Implement Proper Authorization</h3>
                <p className="text-base text-white/60 mb-4">
                  Always verify that callers have the appropriate permissions:
                </p>
              </div>
            </div>

            <div className="bg-black/40 border border-white/[0.08] rounded-lg p-6">
              <div className="flex items-start gap-3 mb-4">
                <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-400 mb-1">Vulnerable Code</p>
                  <p className="text-sm text-white/60">Missing authorization check allows anyone to approve requests</p>
                </div>
              </div>
              <pre className="text-sm font-mono text-red-400 overflow-x-auto">
{`#[ink(message)]
pub fn approve_request(&mut self, company: AccountId) -> Result<(), Error> {
    // ❌ No check - anyone can approve!
    let request = self.requests.get(&company)?;
    request.status = RequestStatus::Approved;
    Ok(())
}`}
              </pre>
            </div>

            <div className="bg-black/40 border border-white/[0.08] rounded-lg p-6">
              <div className="flex items-start gap-3 mb-4">
                <Shield className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-green-400 mb-1">Secure Code</p>
                  <p className="text-sm text-white/60">Verify caller is the customer before approving</p>
                </div>
              </div>
              <pre className="text-sm font-mono text-green-400 overflow-x-auto">
{`#[ink(message)]
pub fn approve_request(&mut self, company: AccountId) -> Result<(), Error> {
    let customer = self.env().caller();

    // ✅ Verify caller is the customer in the request
    let mut request = self.requests.get(&(company, customer))
        .ok_or(Error::RequestNotFound)?;

    if request.customer != customer {
        return Err(Error::Unauthorized);
    }

    request.status = RequestStatus::Approved;
    self.requests.insert((company, customer), &request);
    Ok(())
}`}
              </pre>
            </div>

            <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-6">
              <h4 className="text-lg text-white mb-3">Access Control Checklist</h4>
              <ul className="space-y-2 text-base text-white/60">
                <li>✓ Always check <code className="text-primary font-mono">self.env().caller()</code></li>
                <li>✓ Verify caller matches expected role (customer, company, admin)</li>
                <li>✓ Use custom error types for unauthorized access</li>
                <li>✓ Emit events for all permission changes</li>
                <li>✓ Implement time-based permissions (expiration)</li>
              </ul>
            </div>
          </div>

          <SectionDivider label="Input Validation" className="mt-16" />

          <div className="mt-12 space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <div className="h-10 w-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Lock className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-light text-white mb-4">Validate All Inputs</h3>
                <p className="text-base text-white/60 mb-4">
                  Never trust user input - validate and sanitize everything:
                </p>
              </div>
            </div>

            <div className="bg-black/40 border border-white/[0.08] rounded-lg p-6">
              <pre className="text-sm font-mono text-primary overflow-x-auto">
{`#[ink(message)]
pub fn request_access(
    &mut self,
    customer: AccountId,
    fields: Vec<String>,
    payment: Balance,
    duration: u32,
) -> Result<u64, Error> {
    // ✅ Validate fields array is not empty
    if fields.is_empty() {
        return Err(Error::InvalidFields);
    }

    // ✅ Validate fields array is not too large
    if fields.len() > 50 {
        return Err(Error::TooManyFields);
    }

    // ✅ Validate each field name
    for field in &fields {
        if field.is_empty() || field.len() > 100 {
            return Err(Error::InvalidFieldName);
        }
    }

    // ✅ Validate payment amount
    if payment < MINIMUM_PAYMENT {
        return Err(Error::InsufficientPayment);
    }

    // ✅ Validate duration
    if duration == 0 || duration > 365 {
        return Err(Error::InvalidDuration);
    }

    // ✅ Validate customer address is not zero
    if customer == AccountId::from([0x00; 32]) {
        return Err(Error::InvalidCustomer);
    }

    // Proceed with request...
    Ok(request_id)
}`}
              </pre>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-6">
              <h4 className="text-lg text-yellow-400 mb-3">Common Validation Issues</h4>
              <ul className="space-y-2 text-sm text-yellow-400/80">
                <li>• Empty or oversized arrays can cause DoS attacks</li>
                <li>• Unbounded strings can exhaust storage</li>
                <li>• Zero or negative values may break business logic</li>
                <li>• Special characters in strings can cause parsing issues</li>
              </ul>
            </div>
          </div>

          <SectionDivider label="Reentrancy Guards" className="mt-16" />

          <div className="mt-12 space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <div className="h-10 w-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-light text-white mb-4">Prevent Reentrancy Attacks</h3>
                <p className="text-base text-white/60 mb-4">
                  Protect against recursive calls that can drain funds or corrupt state:
                </p>
              </div>
            </div>

            <div className="bg-black/40 border border-white/[0.08] rounded-lg p-6">
              <div className="flex items-start gap-3 mb-4">
                <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-400 mb-1">Vulnerable Pattern</p>
                  <p className="text-sm text-white/60">State updated after external call allows reentrancy</p>
                </div>
              </div>
              <pre className="text-sm font-mono text-red-400 overflow-x-auto">
{`#[ink(message)]
pub fn withdraw_payment(&mut self) -> Result<(), Error> {
    let caller = self.env().caller();
    let amount = self.balances.get(&caller).unwrap_or(0);

    // ❌ External call before state update
    self.env().transfer(caller, amount)?;

    // ❌ Attacker can reenter and withdraw again!
    self.balances.insert(caller, &0);

    Ok(())
}`}
              </pre>
            </div>

            <div className="bg-black/40 border border-white/[0.08] rounded-lg p-6">
              <div className="flex items-start gap-3 mb-4">
                <Shield className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-green-400 mb-1">Secure Pattern (Checks-Effects-Interactions)</p>
                  <p className="text-sm text-white/60">Update state before external calls</p>
                </div>
              </div>
              <pre className="text-sm font-mono text-green-400 overflow-x-auto">
{`#[ink(message)]
pub fn withdraw_payment(&mut self) -> Result<(), Error> {
    let caller = self.env().caller();

    // ✅ Check: Verify conditions
    let amount = self.balances.get(&caller).unwrap_or(0);
    if amount == 0 {
        return Err(Error::NoBalance);
    }

    // ✅ Effects: Update state first
    self.balances.insert(caller, &0);

    // ✅ Interactions: External call last
    self.env().transfer(caller, amount)?;

    self.env().emit_event(PaymentWithdrawn {
        account: caller,
        amount,
    });

    Ok(())
}`}
              </pre>
            </div>

            <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-6">
              <h4 className="text-lg text-white mb-3">Reentrancy Guard Pattern</h4>
              <pre className="text-sm font-mono text-primary overflow-x-auto">
{`#[ink(storage)]
pub struct DataAccessControl {
    locked: bool,
    // ... other fields
}

impl DataAccessControl {
    fn ensure_not_locked(&self) -> Result<(), Error> {
        if self.locked {
            return Err(Error::Reentrancy);
        }
        Ok(())
    }

    #[ink(message)]
    pub fn sensitive_operation(&mut self) -> Result<(), Error> {
        self.ensure_not_locked()?;
        self.locked = true;

        // ... perform operations ...

        self.locked = false;
        Ok(())
    }
}`}
              </pre>
            </div>
          </div>

          <SectionDivider label="Testing" className="mt-16" />

          <div className="mt-12 space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <div className="h-10 w-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <TestTube className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-light text-white mb-4">Comprehensive Testing</h3>
                <p className="text-base text-white/60 mb-4">
                  Write thorough tests to catch security issues before deployment:
                </p>
              </div>
            </div>

            <div className="bg-black/40 border border-white/[0.08] rounded-lg p-6">
              <pre className="text-sm font-mono text-primary overflow-x-auto">
{`#[cfg(test)]
mod tests {
    use super::*;

    #[ink::test]
    fn unauthorized_approval_fails() {
        let mut contract = DataAccessControl::new();

        // Alice requests access to Bob's data
        set_caller(alice());
        contract.request_access(bob(), vec!["email".into()], 5_000).unwrap();

        // Charlie tries to approve (should fail)
        set_caller(charlie());
        let result = contract.approve_request(alice());

        assert!(result.is_err());
        assert_eq!(result.unwrap_err(), Error::Unauthorized);
    }

    #[ink::test]
    fn expired_access_denied() {
        let mut contract = DataAccessControl::new();

        // Create and approve request
        set_caller(alice());
        contract.request_access(bob(), vec!["email".into()], 5_000).unwrap();

        set_caller(bob());
        contract.approve_request(alice()).unwrap();

        // Fast forward time past expiration
        advance_block_timestamp(31 * 24 * 60 * 60 * 1000);

        // Verify access is denied
        set_caller(alice());
        let has_access = contract.verify_access(bob(), "email".into()).unwrap();
        assert!(!has_access);
    }

    #[ink::test]
    fn invalid_input_rejected() {
        let mut contract = DataAccessControl::new();

        set_caller(alice());

        // Empty fields array
        assert!(contract.request_access(
            bob(),
            vec![],
            5_000
        ).is_err());

        // Payment below minimum
        assert!(contract.request_access(
            bob(),
            vec!["email".into()],
            100
        ).is_err());

        // Invalid duration
        assert!(contract.request_access(
            bob(),
            vec!["email".into()],
            5_000,
            0 // zero duration
        ).is_err());
    }
}`}
              </pre>
            </div>

            <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-6">
              <h4 className="text-lg text-white mb-3">Testing Checklist</h4>
              <div className="space-y-2 text-base text-white/60">
                <p>✓ Test all access control paths (authorized and unauthorized)</p>
                <p>✓ Test boundary conditions (zero, max values, empty arrays)</p>
                <p>✓ Test time-based logic (expirations, deadlines)</p>
                <p>✓ Test error conditions and proper error messages</p>
                <p>✓ Test event emissions</p>
                <p>✓ Test reentrancy scenarios</p>
                <p>✓ Test integration with other contracts</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-500/10 to-yellow-500/5 border border-yellow-500/20 rounded-lg p-6">
              <h4 className="text-lg text-yellow-400 mb-3">Professional Audit Recommended</h4>
              <p className="text-base text-white/60">
                Before deploying to mainnet with real funds, consider a professional smart contract audit.
                While these practices reduce risk, an expert security review can catch subtle vulnerabilities.
              </p>
            </div>
          </div>

          <div className="mt-16 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-8">
            <h3 className="text-2xl font-light text-white mb-4">Security Resources</h3>
            <div className="space-y-3">
              <Link
                href="/continuum/docs/smart-contracts"
                className="block text-base text-primary hover:text-primary/80 transition"
              >
                → Review Smart Contract best practices
              </Link>
              <Link
                href="/continuum/docs/sdk-reference"
                className="block text-base text-primary hover:text-primary/80 transition"
              >
                → SDK Reference for secure client integration
              </Link>
              <a
                href="https://use.ink/security"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-base text-primary hover:text-primary/80 transition"
              >
                → ink! Security Documentation ↗
              </a>
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
