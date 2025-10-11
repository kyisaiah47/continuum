"use client"

import Link from "next/link"
import { GridBackground, SectionDivider, ButtonPurple, StatCard } from "@/components/ui/plural"
import { ProductSwitcher } from "@/components/product-switcher"
import { Code, Activity, Network, Box, Key, FileCode } from "lucide-react"

export default function ContinuumDashboard() {
  const recentActivity = [
    { id: 1, type: "Contract Deployed", name: "DataAccessControl v2.1", time: "2 hours ago", status: "success" },
    { id: 2, type: "Transaction", name: "Access grant approved", time: "5 hours ago", status: "success" },
    { id: 3, type: "API Call", name: "verifyAccess() executed", time: "1 day ago", status: "success" },
  ]

  return (
    <GridBackground showCorners className="min-h-screen">
      <header className="fixed top-0 w-full z-50 border-b border-white/[0.08] bg-background/80 backdrop-blur-xl">
        <div className="max-w-[1400px] mx-auto px-8 h-20 flex items-center justify-between">
          <ProductSwitcher />
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/continuum/dashboard" className="text-sm text-primary transition tracking-wide">Dashboard</Link>
            <Link href="/continuum/contracts" className="text-sm text-white/60 hover:text-white transition tracking-wide">Contracts</Link>
            <Link href="/continuum/explorer" className="text-sm text-white/60 hover:text-white transition tracking-wide">Explorer</Link>
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
          <div className="mb-16 flex items-end justify-between">
            <div>
              <h1 className="text-6xl font-light tracking-tight text-white mb-4">
                Network Overview
              </h1>
              <p className="text-xl text-white/50">
                Polkadot-based privacy infrastructure
              </p>
            </div>
            <ButtonPurple className="h-12 px-6 text-base">
              <Code className="mr-2 h-4 w-4" />
              Deploy Contract
            </ButtonPurple>
          </div>

          {/* Network Stats */}
          <div className="glass-card rounded-none border-y border-white/[0.03] grid grid-cols-4 divide-x divide-white/[0.03] mb-16">
            <StatCard value="1.2M" label="Total Transactions" />
            <StatCard value="847" label="Active Contracts" />
            <StatCard value="32K DOT" label="Total Value Locked" />
            <StatCard value="99.9%" label="Uptime" />
          </div>

          {/* Network Status */}
          <div className="mb-16 bg-gradient-to-r from-green-500/10 to-green-500/5 border border-green-500/20 rounded-lg p-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                  <Activity className="h-6 w-6 text-green-400" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-light text-white mb-2">Network Status: Operational</h3>
                <p className="text-base text-white/60 leading-relaxed">
                  All systems operational. Current block height: 4,892,103. Average block time: 6.2s.
                </p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-light text-green-400">100%</div>
                <div className="text-sm text-white/40">availability</div>
              </div>
            </div>
          </div>

          <SectionDivider label="Quick Actions" />

          {/* Quick Action Cards */}
          <div className="mt-16 grid grid-cols-3 gap-6 mb-16">
            <Link href="/continuum/contracts" className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-8 hover:bg-white/[0.05] transition-all group">
              <div className="h-12 w-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
                <Box className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-light text-white mb-3 group-hover:text-primary transition">Smart Contracts</h3>
              <p className="text-base text-white/50">Deploy and manage your ink! smart contracts</p>
            </Link>

            <Link href="/continuum/playground" className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-8 hover:bg-white/[0.05] transition-all group">
              <div className="h-12 w-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-light text-white mb-3 group-hover:text-primary transition">Playground</h3>
              <p className="text-base text-white/50">Test contracts in a sandboxed environment</p>
            </Link>

            <Link href="/continuum/docs" className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-8 hover:bg-white/[0.05] transition-all group">
              <div className="h-12 w-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
                <FileCode className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-light text-white mb-3 group-hover:text-primary transition">Documentation</h3>
              <p className="text-base text-white/50">SDK guides and API references</p>
            </Link>
          </div>

          <SectionDivider label="Recent Activity" />

          {/* Recent Activity */}
          <div className="mt-16 bg-white/[0.03] border border-white/[0.08] rounded-lg divide-y divide-white/[0.05]">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="p-6 hover:bg-white/[0.02] transition-all flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="h-12 w-12 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                    <Activity className="h-6 w-6 text-green-400" />
                  </div>
                  <div>
                    <div className="text-base text-white mb-1">{activity.type}</div>
                    <div className="text-sm font-mono text-white/40">{activity.name}</div>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="text-sm text-white/40">{activity.time}</div>
                  <div className="px-3 py-1 rounded bg-green-500/10 border border-green-500/20 text-xs text-green-400 uppercase tracking-[0.15em]">
                    {activity.status}
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
