"use client"

import Link from "next/link"
import { GridBackground, SectionDivider, ButtonPurple, StatCard } from "@/components/ui/plural"
import { ContinuumLogo } from "@/components/brand/continuum-logo"
import {
  ArrowRight, ArrowLeft, Network, Code, Lock, GitBranch,
  Check, Database, Cpu, Zap, FileCode, Shield,
  Terminal, BookOpen, Github, PackageOpen, Box, Blocks
} from "lucide-react"

export default function ContinuumPage() {
  return (
    <GridBackground showCorners className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 border-b border-white/[0.08] bg-background/80 backdrop-blur-xl">
        <div className="max-w-[1400px] mx-auto px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-all p-2">
              <ContinuumLogo className="h-full w-full text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-semibold tracking-tight">Continuum</span>
              <span className="text-[10px] text-white/40 uppercase tracking-[0.15em]">The Trust Layer</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/myn" className="text-sm text-white/60 hover:text-white transition tracking-wide">Myn</Link>
            <Link href="/ethos" className="text-sm text-white/60 hover:text-white transition tracking-wide">Ethos</Link>
            <Link href="/continuum" className="text-sm text-primary transition tracking-wide">Continuum</Link>
            <div className="h-6 w-px bg-white/[0.08]" />
            <Link href="/login" className="text-sm text-white/60 hover:text-white transition tracking-wide">Login</Link>
            <ButtonPurple className="h-9 px-5 text-sm" asChild>
              <Link href="/signup">Get Started</Link>
            </ButtonPurple>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-40 pb-32 px-8">
        <div className="max-w-[1400px] mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/60 transition mb-12">
            <ArrowLeft className="h-4 w-4" />
            <span className="uppercase tracking-[0.15em]">Back to Ecosystem</span>
          </Link>

          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center justify-center h-20 w-20 rounded-2xl bg-gradient-continuum animate-gradient-flow p-4">
                  <ContinuumLogo className="h-full w-full text-white" />
                </div>
                <div>
                  <h1 className="text-7xl font-light tracking-tight text-white">Continuum</h1>
                  <p className="text-lg text-white/40 italic mt-1">Where data meets integrity.</p>
                </div>
              </div>

              <p className="text-2xl font-light text-white/60 leading-relaxed mb-12">
                The decentralized protocol that verifies and immortalizes every data exchange.
                Open-source, auditable, and permanent—the trust infrastructure that makes Myn and Ethos possible.
              </p>

              <div className="flex items-center gap-4">
                <ButtonPurple className="h-14 px-8 text-lg">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Read the Docs
                </ButtonPurple>
                <Link
                  href="#features"
                  className="h-14 px-8 inline-flex items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-lg font-medium text-white/80 hover:bg-white/[0.05] hover:text-white transition-all"
                >
                  <Github className="mr-2 h-5 w-5" />
                  View on GitHub
                </Link>
              </div>
            </div>

            <div className="glass-card p-12 rounded-2xl bg-[#16171D] border-[#2A2B32]">
              <div className="aspect-square bg-gradient-continuum/5 rounded-xl flex items-center justify-center border border-white/[0.05] animate-gradient-flow">
                <div className="text-center text-white/40">
                  <Network className="h-32 w-32 mx-auto mb-4" />
                  <p className="text-sm uppercase tracking-[0.15em] font-mono">Network Explorer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-8 pb-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="glass-card rounded-none border-y border-white/[0.03] grid grid-cols-4 divide-x divide-white/[0.03]">
            <StatCard value="∞" label="Immutable records" />
            <StatCard value="<1s" label="Transaction finality" />
            <StatCard value="MIT" label="Open source license" />
            <StatCard value="Ed25519" label="Cryptographic signing" />
          </div>
        </div>
      </section>

      {/* Core Architecture */}
      <section id="features" className="px-8 py-32 bg-white/[0.01]">
        <div className="max-w-[1400px] mx-auto">
          <SectionDivider label="Architecture" />

          <div className="mt-24 mb-16 text-center max-w-[900px] mx-auto">
            <h2 className="text-6xl font-light tracking-tight text-white mb-6">
              Built on
              <br />
              <span className="text-white/40">Polkadot substrate</span>
            </h2>
            <p className="text-xl text-white/50">
              Leveraging the most advanced blockchain infrastructure for data integrity
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-white/[0.03]">
            <div className="bg-background p-12">
              <div className="h-14 w-14 rounded-xl bg-[#00D4FF]/10 border border-[#00D4FF]/20 flex items-center justify-center mb-8">
                <Lock className="h-7 w-7 text-[#00D4FF]" />
              </div>
              <h3 className="text-2xl font-light text-white mb-4">Cryptographic Verification</h3>
              <p className="text-base text-white/50 leading-relaxed mb-6 font-mono text-sm">
                Every consent action is signed with Ed25519 keys and recorded on-chain.
                Mathematical proof that consent was granted, not just claimed.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-white/40 font-mono">
                  <Check className="h-4 w-4 text-[#00D4FF]" />
                  <span>Ed25519 signature scheme</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-white/40 font-mono">
                  <Check className="h-4 w-4 text-[#00D4FF]" />
                  <span>Merkle tree verification</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-white/40 font-mono">
                  <Check className="h-4 w-4 text-[#00D4FF]" />
                  <span>Zero-knowledge proofs</span>
                </li>
              </ul>
            </div>

            <div className="bg-background p-12">
              <div className="h-14 w-14 rounded-xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center mb-8">
                <Database className="h-7 w-7 text-[#8B5CF6]" />
              </div>
              <h3 className="text-2xl font-light text-white mb-4">Immutable Records</h3>
              <p className="text-base text-white/50 leading-relaxed mb-6 font-mono text-sm">
                All transactions recorded permanently on Polkadot parachain.
                Once written, consent history cannot be altered or deleted.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-white/40 font-mono">
                  <Check className="h-4 w-4 text-[#8B5CF6]" />
                  <span>Append-only ledger</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-white/40 font-mono">
                  <Check className="h-4 w-4 text-[#8B5CF6]" />
                  <span>Byzantine fault tolerant</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-white/40 font-mono">
                  <Check className="h-4 w-4 text-[#8B5CF6]" />
                  <span>Global state consensus</span>
                </li>
              </ul>
            </div>

            <div className="bg-background p-12">
              <div className="h-14 w-14 rounded-xl bg-[#FF7AE0]/10 border border-[#FF7AE0]/20 flex items-center justify-center mb-8">
                <Code className="h-7 w-7 text-[#FF7AE0]" />
              </div>
              <h3 className="text-2xl font-light text-white mb-4">Open Infrastructure</h3>
              <p className="text-base text-white/50 leading-relaxed mb-6 font-mono text-sm">
                Build on top. Integrate. Extend. MIT licensed with full documentation
                and reference implementations.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-white/40 font-mono">
                  <Check className="h-4 w-4 text-[#FF7AE0]" />
                  <span>MIT open source</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-white/40 font-mono">
                  <Check className="h-4 w-4 text-[#FF7AE0]" />
                  <span>Public audit trail</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-white/40 font-mono">
                  <Check className="h-4 w-4 text-[#FF7AE0]" />
                  <span>Community governed</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Contracts */}
      <section className="px-8 py-32">
        <div className="max-w-[1400px] mx-auto">
          <SectionDivider label="Smart Contracts" />

          <div className="mt-24 grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-5xl font-light tracking-tight text-white mb-8">
                ink! smart contracts
                <br />
                <span className="text-white/40">on Polkadot</span>
              </h2>
              <p className="text-lg text-white/50 leading-relaxed mb-8">
                Written in Rust using ink! v5.0. Compiled to WebAssembly for maximum performance
                and security. Every function is tested, audited, and verifiable on-chain.
              </p>

              <div className="space-y-6 mb-8">
                <div className="flex gap-4">
                  <Cpu className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-xl font-light text-white mb-2 font-mono">DataAccessControl</h4>
                    <p className="text-base text-white/50 font-mono text-sm">
                      Manages access requests, approvals, and revocations with time-based expiration
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Zap className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-xl font-light text-white mb-2 font-mono">PaymentEscrow</h4>
                    <p className="text-base text-white/50 font-mono text-sm">
                      Handles DOT token escrow, automatic release, and refunds on revocation
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-xl font-light text-white mb-2 font-mono">ConsentRegistry</h4>
                    <p className="text-base text-white/50 font-mono text-sm">
                      Immutable registry of all consent grants with cryptographic signatures
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <ButtonPurple className="h-12 px-6 text-base">
                  <FileCode className="mr-2 h-4 w-4" />
                  View Contract Code
                </ButtonPurple>
                <Link
                  href="#"
                  className="h-12 px-6 inline-flex items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-base font-medium text-white/80 hover:bg-white/[0.05] hover:text-white transition-all"
                >
                  <Terminal className="mr-2 h-4 w-4" />
                  Deploy Guide
                </Link>
              </div>
            </div>

            <div className="bg-[#0D0E12] rounded-2xl p-8 border border-white/[0.05] font-mono text-sm">
              <div className="flex items-center justify-between mb-6">
                <span className="text-white/40 text-xs uppercase tracking-[0.15em]">data_access.rs</span>
                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500/30" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/30" />
                  <div className="h-3 w-3 rounded-full bg-green-500/30" />
                </div>
              </div>
              <pre className="text-white/60 leading-relaxed overflow-x-auto">
{`#[ink::contract]
mod data_access {
    use ink::storage::Mapping;

    #[ink(storage)]
    pub struct DataAccess {
        requests: Mapping<u64, Request>,
        next_id: u64,
    }

    impl DataAccess {
        #[ink(message)]
        pub fn request_access(
            &mut self,
            customer: AccountId,
            fields: Vec<String>,
            duration: u64,
            payment: Balance
        ) -> u64 {
            // Record request on-chain
            let id = self.next_id;
            self.requests.insert(id, &Request {
                customer,
                organization: self.env()
                    .caller(),
                fields,
                duration,
                payment,
                status: Pending,
            });
            self.next_id += 1;
            id
        }

        #[ink(message)]
        pub fn approve(&mut self, id: u64) {
            // Cryptographic verification
            // Escrow payment
            // Grant access
        }
    }
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-8 py-32 bg-white/[0.01]">
        <div className="max-w-[1100px] mx-auto">
          <SectionDivider label="Data Flow" />

          <div className="mt-24 space-y-px bg-white/[0.03]">
            <div className="bg-background p-16 flex gap-12 items-start">
              <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full border border-white/[0.08] text-white/40 font-light text-2xl font-mono">
                1
              </div>
              <div>
                <h3 className="text-3xl font-light text-white mb-4">Request Initiated</h3>
                <p className="text-lg text-white/50 leading-relaxed font-mono text-base">
                  Organization calls request_access() with customer address, required fields,
                  duration, and payment. Transaction signed and submitted to mempool.
                </p>
              </div>
            </div>

            <div className="bg-background p-16 flex gap-12 items-start">
              <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full border border-white/[0.08] text-white/40 font-light text-2xl font-mono">
                2
              </div>
              <div>
                <h3 className="text-3xl font-light text-white mb-4">On-Chain Recording</h3>
                <p className="text-lg text-white/50 leading-relaxed font-mono text-base">
                  Validators include transaction in next block. State updated with new AccessRequest
                  struct. Event emitted, picked up by Myn app indexer.
                </p>
              </div>
            </div>

            <div className="bg-background p-16 flex gap-12 items-start">
              <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full border border-white/[0.08] text-white/40 font-light text-2xl font-mono">
                3
              </div>
              <div>
                <h3 className="text-3xl font-light text-white mb-4">Customer Approval</h3>
                <p className="text-lg text-white/50 leading-relaxed font-mono text-base">
                  Customer reviews in Myn and calls approve(). Their private key signs the transaction,
                  creating cryptographic proof of consent. Payment escrowed automatically.
                </p>
              </div>
            </div>

            <div className="bg-background p-16 flex gap-12 items-start">
              <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full border border-white/[0.08] text-white/40 font-light text-2xl font-mono">
                4
              </div>
              <div>
                <h3 className="text-3xl font-light text-white mb-4">Data Exchange</h3>
                <p className="text-lg text-white/50 leading-relaxed font-mono text-base">
                  Ethos queries contract for active approvals. Encrypted data transferred off-chain
                  via secure channel. Access automatically expires after duration. All logged on-chain.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Developer Resources */}
      <section className="px-8 py-32">
        <div className="max-w-[1400px] mx-auto">
          <SectionDivider label="For Developers" />

          <div className="mt-24 mb-16 text-center max-w-[800px] mx-auto">
            <h2 className="text-6xl font-light tracking-tight text-white mb-6">
              Build on Continuum
            </h2>
            <p className="text-xl text-white/50">
              Everything you need to integrate with the trust layer
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-white/[0.03]">
            <div className="bg-background p-12">
              <BookOpen className="h-10 w-10 text-primary mb-6" />
              <h3 className="text-2xl font-light text-white mb-4">Documentation</h3>
              <p className="text-base text-white/50 leading-relaxed mb-6 font-mono text-sm">
                Complete API reference, integration guides, and tutorials. Learn how to query
                consent records, submit requests, and build custom applications.
              </p>
              <div className="text-sm text-white/30 uppercase tracking-[0.15em]">
                Read the docs →
              </div>
            </div>

            <div className="bg-background p-12">
              <Github className="h-10 w-10 text-primary mb-6" />
              <h3 className="text-2xl font-light text-white mb-4">GitHub Repository</h3>
              <p className="text-base text-white/50 leading-relaxed mb-6 font-mono text-sm">
                Browse source code, file issues, and contribute. All contracts, pallets,
                and SDK implementations are open source under MIT license.
              </p>
              <div className="text-sm text-white/30 uppercase tracking-[0.15em]">
                View on GitHub →
              </div>
            </div>

            <div className="bg-background p-12">
              <PackageOpen className="h-10 w-10 text-primary mb-6" />
              <h3 className="text-2xl font-light text-white mb-4">SDKs & Libraries</h3>
              <p className="text-base text-white/50 leading-relaxed mb-6 font-mono text-sm">
                JavaScript, Rust, and Python SDKs for interacting with smart contracts.
                Type-safe bindings generated from contract metadata.
              </p>
              <div className="text-sm text-white/30 uppercase tracking-[0.15em]">
                Install packages →
              </div>
            </div>

            <div className="bg-background p-12">
              <Terminal className="h-10 w-10 text-primary mb-6" />
              <h3 className="text-2xl font-light text-white mb-4">CLI Tools</h3>
              <p className="text-base text-white/50 leading-relaxed mb-6 font-mono text-sm">
                Command-line utilities for deploying contracts, querying state, and managing
                on-chain data. Works with any Substrate-based chain.
              </p>
              <div className="text-sm text-white/30 uppercase tracking-[0.15em]">
                Download CLI →
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specs */}
      <section className="px-8 py-32 bg-white/[0.01]">
        <div className="max-w-[1400px] mx-auto">
          <SectionDivider label="Technical Specifications" />

          <div className="mt-24 grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-5xl font-light tracking-tight text-white mb-8">
                Built for
                <br />
                <span className="text-white/40">performance</span>
              </h2>
              <p className="text-lg text-white/50 leading-relaxed mb-8 font-mono text-base">
                Optimized for high-throughput consent verification with sub-second finality.
                Horizontally scalable across Polkadot parachain network.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <Zap className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-xl font-light text-white mb-2 font-mono">&lt; 1s Finality</h4>
                    <p className="text-base text-white/50 font-mono text-sm">
                      Transactions confirmed in under one second using GRANDPA finality
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Blocks className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-xl font-light text-white mb-2 font-mono">1000+ TPS</h4>
                    <p className="text-base text-white/50 font-mono text-sm">
                      Over 1000 transactions per second on parachain
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Box className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-xl font-light text-white mb-2 font-mono">WebAssembly</h4>
                    <p className="text-base text-white/50 font-mono text-sm">
                      Contracts compiled to WASM for deterministic execution
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <GitBranch className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-xl font-light text-white mb-2 font-mono">Cross-Chain</h4>
                    <p className="text-base text-white/50 font-mono text-sm">
                      XCMP messaging for interoperability across Polkadot ecosystem
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card p-12 rounded-2xl bg-[#16171D] border-[#2A2B32]">
              <div className="space-y-6 font-mono">
                <div className="border-l-2 border-[#00D4FF] pl-6">
                  <div className="text-4xl font-light text-white mb-2">ink! 5.0</div>
                  <div className="text-sm text-white/40 uppercase tracking-[0.15em]">Smart Contract Framework</div>
                </div>

                <div className="border-l-2 border-[#8B5CF6] pl-6">
                  <div className="text-4xl font-light text-white mb-2">Rust</div>
                  <div className="text-sm text-white/40 uppercase tracking-[0.15em]">Primary Language</div>
                </div>

                <div className="border-l-2 border-[#FF7AE0] pl-6">
                  <div className="text-4xl font-light text-white mb-2">FRAME</div>
                  <div className="text-sm text-white/40 uppercase tracking-[0.15em]">Substrate Pallets</div>
                </div>

                <div className="border-l-2 border-primary pl-6">
                  <div className="text-4xl font-light text-white mb-2">Polkadot</div>
                  <div className="text-sm text-white/40 uppercase tracking-[0.15em]">Relay Chain</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-8 py-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="border-y border-white/[0.03] py-24 text-center">
            <div className="inline-flex items-center justify-center h-24 w-24 rounded-2xl bg-gradient-continuum animate-gradient-flow mb-8 p-5">
              <ContinuumLogo className="h-full w-full text-white" />
            </div>
            <h2 className="text-7xl font-light tracking-tight text-white mb-6 font-mono">
              Build. Integrate.
              <br />
              <span className="text-white/40">Verify.</span>
            </h2>
            <p className="text-xl text-white/50 mb-12 max-w-[700px] mx-auto font-mono">
              Start building on the trust layer for decentralized data exchange.
            </p>
            <div className="flex items-center justify-center gap-4">
              <ButtonPurple className="h-14 px-12 text-lg">
                <BookOpen className="mr-2 h-5 w-5" />
                Read Documentation
              </ButtonPurple>
              <Link
                href="#"
                className="h-14 px-12 inline-flex items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-lg font-medium text-white/80 hover:bg-white/[0.05] hover:text-white transition-all"
              >
                <Github className="mr-2 h-5 w-5" />
                View on GitHub
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.08] px-8 py-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-4 gap-16 mb-16">
            <div className="col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary/10 border border-primary/20 p-1.5">
                  <ContinuumLogo className="h-full w-full text-primary" />
                </div>
                <span className="font-semibold tracking-tight">Continuum</span>
              </div>
              <p className="text-sm text-white/40 leading-relaxed">
                The trust layer for data exchange. Built on Polkadot.
              </p>
            </div>

            <div>
              <div className="text-xs font-medium uppercase tracking-[0.15em] text-white/40 mb-6">Products</div>
              <ul className="space-y-3">
                <li><Link href="/myn" className="text-sm text-white/60 hover:text-white transition">Myn App</Link></li>
                <li><Link href="/ethos" className="text-sm text-white/60 hover:text-white transition">Ethos CRM</Link></li>
                <li><Link href="/continuum" className="text-sm text-white/60 hover:text-white transition">Continuum</Link></li>
              </ul>
            </div>

            <div>
              <div className="text-xs font-medium uppercase tracking-[0.15em] text-white/40 mb-6">Resources</div>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-white/60 hover:text-white transition">Documentation</a></li>
                <li><a href="#" className="text-sm text-white/60 hover:text-white transition">GitHub</a></li>
                <li><a href="#" className="text-sm text-white/60 hover:text-white transition">Brand Assets</a></li>
              </ul>
            </div>

            <div>
              <div className="text-xs font-medium uppercase tracking-[0.15em] text-white/40 mb-6">Company</div>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-white/60 hover:text-white transition">About</a></li>
                <li><a href="#" className="text-sm text-white/60 hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="text-sm text-white/60 hover:text-white transition">Terms</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/[0.08] flex items-center justify-between">
            <p className="text-xs text-white/30">© 2025 Continuum. Built on Polkadot.</p>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
              <span className="text-xs text-white/30">Network Online</span>
            </div>
          </div>
        </div>
      </footer>
    </GridBackground>
  )
}
