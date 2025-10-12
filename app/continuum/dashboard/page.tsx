"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { GridBackground, SectionDivider, ButtonPurple, StatCard } from "@/components/ui/plural"
import { ContinuumHeader } from "@/components/continuum-header"
import { Code, Activity, Network, Box, Key, FileCode, Loader2, AlertCircle, CheckCircle, Clock } from "lucide-react"
import { getBlockchainStats, getRecentActivity, type BlockchainStats, type RecentActivity } from "@/lib/api/blockchain-stats"

export default function ContinuumDashboard() {
  const [stats, setStats] = useState<BlockchainStats | null>(null)
  const [activities, setActivities] = useState<RecentActivity[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  async function loadDashboardData() {
    try {
      setIsLoading(true)
      const [statsData, activitiesData] = await Promise.all([
        getBlockchainStats(),
        getRecentActivity()
      ])
      setStats(statsData)
      setActivities(activitiesData)
    } catch (error) {
      console.error('Failed to load dashboard data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <GridBackground showCorners className="min-h-screen">
      <ContinuumHeader currentPage="dashboard" />

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
          {isLoading ? (
            <div className="glass-card rounded-none border-y border-white/[0.03] grid grid-cols-4 divide-x divide-white/[0.03] mb-16">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="p-8 flex flex-col items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ))}
            </div>
          ) : stats ? (
            <div className="glass-card rounded-none border-y border-white/[0.03] grid grid-cols-4 divide-x divide-white/[0.03] mb-16">
              <StatCard value={stats.totalTransactions} label="Total Transactions" />
              <StatCard value={stats.activeContracts} label="Active Contracts" />
              <StatCard value={stats.totalValueLocked} label="Total Value Locked" />
              <StatCard value={stats.uptime} label="Uptime" />
            </div>
          ) : (
            <div className="glass-card rounded-none border-y border-white/[0.03] grid grid-cols-4 divide-x divide-white/[0.03] mb-16">
              <StatCard value="N/A" label="Total Transactions" />
              <StatCard value="N/A" label="Active Contracts" />
              <StatCard value="N/A" label="Total Value Locked" />
              <StatCard value="N/A" label="Uptime" />
            </div>
          )}

          {/* Network Status */}
          {stats && (
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
                    All systems operational. Current block height: {stats.blockHeight.toLocaleString()}. Average block time: {stats.avgBlockTime}.
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-light text-green-400">{stats.availability}</div>
                  <div className="text-sm text-white/40">availability</div>
                </div>
              </div>
            </div>
          )}

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
          {isLoading ? (
            <div className="mt-16 flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-3 text-white/50">Loading activity...</span>
            </div>
          ) : activities.length === 0 ? (
            <div className="mt-16 text-center py-20">
              <Activity className="h-16 w-16 mx-auto mb-4 text-white/20" />
              <p className="text-white/40">No recent activity</p>
            </div>
          ) : (
            <div className="mt-16 bg-white/[0.03] border border-white/[0.08] rounded-lg divide-y divide-white/[0.05]">
              {activities.map((activity) => {
                const statusConfig = {
                  success: {
                    bg: "bg-green-500/10",
                    border: "border-green-500/20",
                    text: "text-green-400",
                    icon: CheckCircle
                  },
                  pending: {
                    bg: "bg-yellow-500/10",
                    border: "border-yellow-500/20",
                    text: "text-yellow-400",
                    icon: Clock
                  },
                  failed: {
                    bg: "bg-red-500/10",
                    border: "border-red-500/20",
                    text: "text-red-400",
                    icon: AlertCircle
                  }
                }

                const config = statusConfig[activity.status]
                const Icon = config.icon

                return (
                  <div key={activity.id} className="p-6 hover:bg-white/[0.02] transition-all flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className={`h-12 w-12 rounded-full ${config.bg} border ${config.border} flex items-center justify-center`}>
                        <Icon className={`h-6 w-6 ${config.text}`} />
                      </div>
                      <div>
                        <div className="text-base text-white mb-1">{activity.type}</div>
                        <div className="text-sm font-mono text-white/40">{activity.name}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="text-sm text-white/40">{activity.time}</div>
                      <div className={`px-3 py-1 rounded ${config.bg} border ${config.border} text-xs ${config.text} uppercase tracking-[0.15em]`}>
                        {activity.status}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
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
