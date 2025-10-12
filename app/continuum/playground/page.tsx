"use client"

import Link from "next/link"
import { GridBackground, SectionDivider, ButtonPurple } from "@/components/ui/plural"
import { ContinuumHeader } from "@/components/continuum-header"
import { Play, Code, Terminal, Save, Share2, RotateCcw } from "lucide-react"

export default function ContinuumPlayground() {
  const exampleCode = `#![cfg_attr(not(feature = "std"), no_std)]

#[ink::contract]
mod data_access {
    #[ink(storage)]
    pub struct DataAccessControl {
        owner: AccountId,
        requests: ink::storage::Mapping<AccountId, AccessRequest>,
    }

    #[derive(scale::Decode, scale::Encode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub struct AccessRequest {
        company: AccountId,
        customer: AccountId,
        fields: Vec<String>,
        payment: Balance,
        approved: bool,
    }

    impl DataAccessControl {
        #[ink(constructor)]
        pub fn new() -> Self {
            Self {
                owner: Self::env().caller(),
                requests: Default::default(),
            }
        }

        #[ink(message)]
        pub fn request_access(
            &mut self,
            customer: AccountId,
            fields: Vec<String>,
            payment: Balance,
        ) -> Result<(), Error> {
            let company = self.env().caller();

            let request = AccessRequest {
                company,
                customer,
                fields,
                payment,
                approved: false,
            };

            self.requests.insert(company, &request);
            Ok(())
        }

        #[ink(message)]
        pub fn approve_request(&mut self) -> Result<(), Error> {
            let customer = self.env().caller();
            // Implementation...
            Ok(())
        }
    }
}`

  return (
    <GridBackground showCorners className="min-h-screen">
      <ContinuumHeader currentPage="playground" />

      <main className="pt-32 pb-16 px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16 flex items-end justify-between">
            <div>
              <h1 className="text-6xl font-light tracking-tight text-white mb-4">
                Contract Playground
              </h1>
              <p className="text-xl text-white/50">
                Test and debug smart contracts in a sandboxed environment
              </p>
            </div>
            <div className="flex gap-3">
              <button className="h-12 px-6 text-base rounded-lg border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.05] text-white/60 hover:text-white transition-all flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save
              </button>
              <button className="h-12 px-6 text-base rounded-lg border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.05] text-white/60 hover:text-white transition-all flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </button>
              <ButtonPurple className="h-12 px-6 text-base">
                <Play className="mr-2 h-4 w-4" />
                Run Contract
              </ButtonPurple>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-16">
            {/* Code Editor */}
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg overflow-hidden">
              <div className="border-b border-white/[0.08] px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Code className="h-5 w-5 text-primary" />
                  <span className="text-base text-white">Contract Code</span>
                </div>
                <button className="text-sm text-white/40 hover:text-white transition flex items-center gap-2">
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </button>
              </div>
              <div className="p-6 bg-black/40">
                <pre className="text-sm font-mono text-primary overflow-auto max-h-[600px]">
                  {exampleCode}
                </pre>
              </div>
            </div>

            {/* Output Console */}
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg overflow-hidden">
              <div className="border-b border-white/[0.08] px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Terminal className="h-5 w-5 text-primary" />
                  <span className="text-base text-white">Console Output</span>
                </div>
              </div>
              <div className="p-6 bg-black/40">
                <div className="space-y-2 font-mono text-sm">
                  <div className="text-green-400">✓ Contract compiled successfully</div>
                  <div className="text-white/60">Building contract...</div>
                  <div className="text-white/60">Optimizing WASM...</div>
                  <div className="text-green-400">✓ WASM optimization complete</div>
                  <div className="text-white/60">Deploying to test network...</div>
                  <div className="text-green-400">✓ Contract deployed at: 5EAK3BZNspnebxQeTGaiBUejfxq2ivnQzs9PJAqw4afkYuAv</div>
                  <div className="text-white/60 mt-4">Ready to execute contract methods</div>
                </div>
              </div>
            </div>
          </div>

          <SectionDivider label="Test Contract Methods" />

          {/* Contract Interaction */}
          <div className="mt-16 grid grid-cols-2 gap-6">
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-8">
              <h3 className="text-xl font-light text-white mb-6">Request Data Access</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-white/40 uppercase tracking-[0.15em] mb-2 block">Customer Address</label>
                  <input
                    type="text"
                    placeholder="5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty"
                    className="w-full h-12 px-4 bg-white/[0.03] border border-white/[0.08] rounded text-white placeholder:text-white/40 focus:outline-none focus:border-primary/50 transition font-mono text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm text-white/40 uppercase tracking-[0.15em] mb-2 block">Fields (comma-separated)</label>
                  <input
                    type="text"
                    placeholder="email, name, phone"
                    className="w-full h-12 px-4 bg-white/[0.03] border border-white/[0.08] rounded text-white placeholder:text-white/40 focus:outline-none focus:border-primary/50 transition"
                  />
                </div>
                <div>
                  <label className="text-sm text-white/40 uppercase tracking-[0.15em] mb-2 block">Payment (DOT)</label>
                  <input
                    type="text"
                    placeholder="5.0"
                    className="w-full h-12 px-4 bg-white/[0.03] border border-white/[0.08] rounded text-white placeholder:text-white/40 focus:outline-none focus:border-primary/50 transition"
                  />
                </div>
                <ButtonPurple className="w-full h-12 text-base">
                  <Play className="mr-2 h-4 w-4" />
                  Execute Method
                </ButtonPurple>
              </div>
            </div>

            <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-8">
              <h3 className="text-xl font-light text-white mb-6">Approve Access Request</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-white/40 uppercase tracking-[0.15em] mb-2 block">Company Address</label>
                  <input
                    type="text"
                    placeholder="5DAAnrj7VHTznn2AWBemMuyBwZWs6FNFjdyVXUeYum3PTXFy"
                    className="w-full h-12 px-4 bg-white/[0.03] border border-white/[0.08] rounded text-white placeholder:text-white/40 focus:outline-none focus:border-primary/50 transition font-mono text-sm"
                  />
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded p-4">
                  <p className="text-sm text-yellow-400">
                    This method must be called from the customer's account
                  </p>
                </div>
                <ButtonPurple className="w-full h-12 text-base">
                  <Play className="mr-2 h-4 w-4" />
                  Execute Method
                </ButtonPurple>
              </div>
            </div>
          </div>

          {/* Example Templates */}
          <div className="mt-16 bg-white/[0.03] border border-white/[0.08] rounded-lg p-8">
            <h3 className="text-2xl font-light text-white mb-6">Example Templates</h3>
            <div className="grid grid-cols-3 gap-4">
              <button className="text-left px-4 py-3 rounded border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.05] text-white/60 hover:text-white transition">
                <div className="text-sm font-medium text-white mb-1">Data Access Control</div>
                <div className="text-xs text-white/40">Privacy-preserving access management</div>
              </button>
              <button className="text-left px-4 py-3 rounded border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.05] text-white/60 hover:text-white transition">
                <div className="text-sm font-medium text-white mb-1">Payment Escrow</div>
                <div className="text-xs text-white/40">DOT token payment handling</div>
              </button>
              <button className="text-left px-4 py-3 rounded border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.05] text-white/60 hover:text-white transition">
                <div className="text-sm font-medium text-white mb-1">Time-locked Access</div>
                <div className="text-xs text-white/40">Expiring data permissions</div>
              </button>
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
