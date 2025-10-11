"use client"

import Link from "next/link"
import { GridBackground, SectionDivider, ButtonPurple } from "@/components/ui/plural"
import { ProductSwitcher } from "@/components/product-switcher"
import { Search, Box, Activity, ArrowRight, Clock } from "lucide-react"

export default function ContinuumExplorer() {
  const recentBlocks = [
    { number: "4,892,103", hash: "0x9f86d0...7e9b2c", txs: 47, time: "6 secs ago", validator: "Alice" },
    { number: "4,892,102", hash: "0x3c5a99...4f2d8a", txs: 32, time: "12 secs ago", validator: "Bob" },
    { number: "4,892,101", hash: "0x7d58c1...1a3e5b", txs: 28, time: "18 secs ago", validator: "Charlie" },
  ]

  const recentTxs = [
    {
      hash: "0xa4e7f2...9d3c1b",
      from: "5GrwvaEF...oHGKutQY",
      to: "5FHneW46...JM694ty",
      value: "5.00 DOT",
      time: "3 secs ago",
      status: "success"
    },
    {
      hash: "0x2f9b8c...7e4a5d",
      from: "5DAAnrj7...YUm3PTXFy",
      to: "5GrwvaEF...oHGKutQY",
      value: "8.50 DOT",
      time: "8 secs ago",
      status: "success"
    },
    {
      hash: "0x6c3d1a...4b9e7f",
      from: "5FHneW46...JM694ty",
      to: "5DAAnrj7...Yum3PTXFy",
      value: "3.25 DOT",
      time: "15 secs ago",
      status: "success"
    },
  ]

  return (
    <GridBackground showCorners className="min-h-screen">
      <header className="fixed top-0 w-full z-50 border-b border-white/[0.08] bg-background/80 backdrop-blur-xl">
        <div className="max-w-[1400px] mx-auto px-8 h-20 flex items-center justify-between">
          <ProductSwitcher />
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/continuum/dashboard" className="text-sm text-white/60 hover:text-white transition tracking-wide">Dashboard</Link>
            <Link href="/continuum/contracts" className="text-sm text-white/60 hover:text-white transition tracking-wide">Contracts</Link>
            <Link href="/continuum/explorer" className="text-sm text-primary transition tracking-wide">Explorer</Link>
            <Link href="/continuum/docs" className="text-sm text-white/60 hover:text-white transition tracking-wide">Docs</Link>
            <Link href="/continuum/playground" className="text-sm text-white/60 hover:text-white transition tracking-wide">Playground</Link>
            <div className="h-6 w-px bg-white/[0.08]" />
            <ButtonPurple className="h-9 px-5 text-sm" asChild>
              <Link href="/continuum/api-keys">API Keys</Link>
            </ButtonPurple>
          </nav>
        </div>
      </header>

      <main className="pt-32 pb-16 px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <h1 className="text-6xl font-light tracking-tight text-white mb-4">
              Blockchain Explorer
            </h1>
            <p className="text-xl text-white/50">
              Search blocks, transactions, and addresses
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-16">
            <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
              <input
                type="text"
                placeholder="Search by block number, transaction hash, or address..."
                className="w-full h-16 pl-16 pr-6 bg-white/[0.03] border border-white/[0.08] rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-primary/50 transition"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="mb-16 grid grid-cols-3 gap-6">
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Box className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-3xl font-light text-white">4.89M</div>
                  <div className="text-sm text-white/40">Latest Block</div>
                </div>
              </div>
            </div>

            <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Activity className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-3xl font-light text-white">1.2M</div>
                  <div className="text-sm text-white/40">Total Transactions</div>
                </div>
              </div>
            </div>

            <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-3xl font-light text-white">6.2s</div>
                  <div className="text-sm text-white/40">Avg Block Time</div>
                </div>
              </div>
            </div>
          </div>

          <SectionDivider label="Recent Blocks" />

          {/* Recent Blocks */}
          <div className="mt-16 bg-white/[0.03] border border-white/[0.08] rounded-lg divide-y divide-white/[0.05] mb-16">
            {recentBlocks.map((block, i) => (
              <div key={i} className="p-6 hover:bg-white/[0.02] transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="h-12 w-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <Box className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-base text-white">Block {block.number}</span>
                        <code className="text-sm font-mono text-white/40 bg-white/[0.03] px-2 py-1 rounded border border-white/[0.08]">
                          {block.hash}
                        </code>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-white/40">
                        <span>{block.txs} transactions</span>
                        <span>•</span>
                        <span>Validator: {block.validator}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-white/40">{block.time}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <SectionDivider label="Recent Transactions" />

          {/* Recent Transactions */}
          <div className="mt-16 bg-white/[0.03] border border-white/[0.08] rounded-lg divide-y divide-white/[0.05]">
            {recentTxs.map((tx, i) => (
              <div key={i} className="p-6 hover:bg-white/[0.02] transition-all">
                <div className="flex items-center justify-between mb-3">
                  <code className="text-sm font-mono text-primary bg-white/[0.03] px-2 py-1 rounded border border-white/[0.08]">
                    {tx.hash}
                  </code>
                  <div className="px-3 py-1 rounded bg-green-500/10 border border-green-500/20 text-xs text-green-400 uppercase tracking-[0.15em]">
                    {tx.status}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <code className="text-sm font-mono text-white/60">{tx.from}</code>
                  <ArrowRight className="h-4 w-4 text-white/40" />
                  <code className="text-sm font-mono text-white/60">{tx.to}</code>
                  <div className="ml-auto flex items-center gap-6">
                    <div className="text-lg font-light text-primary">{tx.value}</div>
                    <div className="text-sm text-white/40">{tx.time}</div>
                  </div>
                </div>
              </div>
            ))}
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
