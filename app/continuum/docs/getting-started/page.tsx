"use client"

import Link from "next/link"
import { GridBackground, SectionDivider, ButtonPurple } from "@/components/ui/plural"
import { ContinuumHeader } from "@/components/continuum-header"
import { ArrowLeft, Terminal, Package, Rocket, TestTube } from "lucide-react"

export default function GettingStarted() {
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
            Getting Started
          </h1>
          <p className="text-xl text-white/50 mb-16">
            Set up your development environment and deploy your first contract
          </p>

          <SectionDivider label="Installation" />

          <div className="mt-12 space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <div className="h-10 w-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Terminal className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-light text-white mb-4">Prerequisites</h3>
                <p className="text-base text-white/60 mb-4">
                  Before you begin, ensure you have the following installed on your system:
                </p>
                <ul className="space-y-2 text-base text-white/60 list-disc list-inside">
                  <li>Node.js 18.x or higher</li>
                  <li>npm or yarn package manager</li>
                  <li>Rust 1.70 or higher (for smart contract development)</li>
                  <li>cargo-contract 3.0+ (for ink! contracts)</li>
                </ul>
              </div>
            </div>

            <div className="bg-black/40 border border-white/[0.08] rounded-lg p-6">
              <p className="text-sm text-white/40 mb-3">Install Rust and cargo-contract:</p>
              <code className="block bg-black/60 border border-white/[0.08] rounded px-4 py-3 text-sm font-mono text-primary">
                curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh<br/>
                cargo install cargo-contract --force
              </code>
            </div>

            <div className="bg-black/40 border border-white/[0.08] rounded-lg p-6">
              <p className="text-sm text-white/40 mb-3">Install Continuum SDK:</p>
              <code className="block bg-black/60 border border-white/[0.08] rounded px-4 py-3 text-sm font-mono text-primary">
                npm install @continuum/sdk
              </code>
            </div>
          </div>

          <SectionDivider label="Project Setup" className="mt-16" />

          <div className="mt-12 space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <div className="h-10 w-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Package className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-light text-white mb-4">Create a New Project</h3>
                <p className="text-base text-white/60 mb-4">
                  Initialize a new Continuum project with the CLI tool:
                </p>
              </div>
            </div>

            <div className="bg-black/40 border border-white/[0.08] rounded-lg p-6">
              <code className="block bg-black/60 border border-white/[0.08] rounded px-4 py-3 text-sm font-mono text-primary mb-4">
                npx @continuum/create-app my-privacy-app<br/>
                cd my-privacy-app
              </code>
              <p className="text-sm text-white/40">
                This will scaffold a new project with example contracts and SDK integration.
              </p>
            </div>

            <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-6">
              <h4 className="text-lg text-white mb-3">Project Structure</h4>
              <pre className="text-sm font-mono text-white/60">
{`my-privacy-app/
├── contracts/          # ink! smart contracts
│   └── data_access/    # Example data access contract
├── src/                # Application code
│   └── lib/
│       └── continuum.ts # SDK client setup
├── tests/              # Contract and integration tests
└── continuum.config.js # Continuum configuration`}
              </pre>
            </div>
          </div>

          <SectionDivider label="First Contract" className="mt-16" />

          <div className="mt-12 space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <div className="h-10 w-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Rocket className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-light text-white mb-4">Deploy Your Contract</h3>
                <p className="text-base text-white/60 mb-4">
                  Build and deploy the example contract to the Polkadot testnet:
                </p>
              </div>
            </div>

            <div className="bg-black/40 border border-white/[0.08] rounded-lg p-6">
              <p className="text-sm text-white/40 mb-3">Build the contract:</p>
              <code className="block bg-black/60 border border-white/[0.08] rounded px-4 py-3 text-sm font-mono text-primary mb-4">
                cd contracts/data_access<br/>
                cargo contract build --release
              </code>
              <p className="text-sm text-white/40 mb-3">Deploy to testnet:</p>
              <code className="block bg-black/60 border border-white/[0.08] rounded px-4 py-3 text-sm font-mono text-primary">
                cargo contract instantiate \<br/>
                {"  "}--constructor new \<br/>
                {"  "}--suri //Alice \<br/>
                {"  "}--url ws://localhost:9944
              </code>
            </div>

            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6">
              <h4 className="text-lg text-green-400 mb-2">Contract Deployed!</h4>
              <p className="text-sm text-white/60 mb-4">
                Save your contract address - you'll need it to interact with the contract.
              </p>
              <code className="block bg-black/40 border border-white/[0.08] rounded px-4 py-3 text-sm font-mono text-primary">
                Contract address: 5EAK3BZNspnebxQeTGaiBUejfxq2ivnQzs9PJAqw4afkYuAv
              </code>
            </div>
          </div>

          <SectionDivider label="Local Testing" className="mt-16" />

          <div className="mt-12 space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <div className="h-10 w-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <TestTube className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-light text-white mb-4">Test Your Contract</h3>
                <p className="text-base text-white/60 mb-4">
                  Run the included test suite to verify your contract works correctly:
                </p>
              </div>
            </div>

            <div className="bg-black/40 border border-white/[0.08] rounded-lg p-6">
              <code className="block bg-black/60 border border-white/[0.08] rounded px-4 py-3 text-sm font-mono text-primary">
                cargo test
              </code>
            </div>

            <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-6">
              <h4 className="text-lg text-white mb-3">Example Test</h4>
              <pre className="text-sm font-mono text-primary overflow-x-auto">
{`#[ink::test]
fn request_access_works() {
    let mut contract = DataAccessControl::new();

    let result = contract.request_access(
        AccountId::from([0x01; 32]),
        vec!["email".to_string()],
        5_000_000_000_000 // 5 DOT
    );

    assert!(result.is_ok());
}`}
              </pre>
            </div>
          </div>

          <div className="mt-16 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-8">
            <h3 className="text-2xl font-light text-white mb-4">Next Steps</h3>
            <div className="space-y-3">
              <Link
                href="/continuum/docs/smart-contracts"
                className="block text-base text-primary hover:text-primary/80 transition"
              >
                → Learn about Smart Contract structure and best practices
              </Link>
              <Link
                href="/continuum/docs/sdk-reference"
                className="block text-base text-primary hover:text-primary/80 transition"
              >
                → Explore the SDK Reference documentation
              </Link>
              <Link
                href="/continuum/playground"
                className="block text-base text-primary hover:text-primary/80 transition"
              >
                → Try the interactive Playground
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
