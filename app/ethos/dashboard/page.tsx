"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { GridBackground, SectionDivider, ButtonPurple, StatCard, GlassCard } from "@/components/ui/plural"
import { EthosHeader } from "@/components/ethos-header"
import {
  Users, Briefcase, TrendingUp, CheckSquare,
  Plus, ArrowRight, Activity, DollarSign, Loader2
} from "lucide-react"
import { getContacts } from "@/lib/api/contacts"
import { getPipelineStats, getDealsWithContacts } from "@/lib/api/deals"
import { getUpcomingTasks } from "@/lib/api/tasks"

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalContacts: 0,
    pipelineValue: 0,
    activeDeals: 0,
    tasksDue: 0
  })
  const [recentContacts, setRecentContacts] = useState<any[]>([])
  const [recentDeals, setRecentDeals] = useState<any[]>([])
  const [pipelineStats, setPipelineStats] = useState({
    totalValue: 0,
    wonValue: 0,
    wonDeals: 0,
    activeDeals: 0
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  async function loadDashboardData() {
    try {
      setIsLoading(true)
      const [contacts, pipelineData, deals, tasks] = await Promise.all([
        getContacts(),
        getPipelineStats(),
        getDealsWithContacts(),
        getUpcomingTasks(20)
      ])

      setStats({
        totalContacts: contacts.length,
        pipelineValue: pipelineData.totalValue,
        activeDeals: pipelineData.activeDeals,
        tasksDue: tasks.filter(t => !t.completed).length
      })

      setRecentContacts(contacts.slice(0, 3))
      setRecentDeals(deals.slice(0, 3))
      setPipelineStats(pipelineData)
    } catch (error) {
      console.error('Failed to load dashboard data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  function formatCurrency(value: number) {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`
    }
    return `$${value}`
  }

  function formatTimeAgo(date: string) {
    const now = new Date()
    const created = new Date(date)
    const diffMs = now.getTime() - created.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffHours / 24)

    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
    }
    return 'Just now'
  }

  const winRate = pipelineStats.activeDeals + pipelineStats.wonDeals > 0
    ? Math.round((pipelineStats.wonDeals / (pipelineStats.activeDeals + pipelineStats.wonDeals)) * 100)
    : 0

  return (
    <GridBackground showCorners className="min-h-screen">
      <EthosHeader currentPage="dashboard" />

      {/* Main Content */}
      <main className="pt-32 pb-16 px-8">
        <div className="max-w-[1400px] mx-auto">
          {/* Page Title */}
          <div className="mb-16">
            <h1 className="text-6xl font-light tracking-tight text-white mb-4">
              Dashboard
            </h1>
            <p className="text-xl text-white/50">
              Monitor your customer relationships and pipeline performance
            </p>
          </div>

          {/* Stats Grid */}
          {isLoading ? (
            <div className="glass-card rounded-none border-y border-white/[0.03] grid grid-cols-4 divide-x divide-white/[0.03] mb-16">
              {[1,2,3,4].map(i => (
                <div key={i} className="p-8 flex flex-col items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-card rounded-none border-y border-white/[0.03] grid grid-cols-4 divide-x divide-white/[0.03] mb-16">
              <StatCard value={stats.totalContacts.toString()} label="Total Contacts" />
              <StatCard value={formatCurrency(stats.pipelineValue)} label="Pipeline Value" />
              <StatCard value={stats.activeDeals.toString()} label="Active Deals" />
              <StatCard value={stats.tasksDue.toString()} label="Tasks Due" />
            </div>
          )}

          <SectionDivider label="Overview" />

          {/* Quick Actions */}
          <div className="mt-16 mb-24 grid md:grid-cols-4 gap-px bg-white/[0.03]">
            <Link href="/ethos/contacts" className="group bg-background p-8 hover:bg-white/[0.02] transition-all relative overflow-hidden">
              <div className="absolute top-0 left-0 h-px w-0 bg-primary group-hover:w-full transition-all duration-500" />
              <Users className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-light text-white mb-2">Contacts</h3>
              <p className="text-sm text-white/50 mb-4">Manage your customer database</p>
              <div className="flex items-center gap-2 text-sm text-white/40 group-hover:text-primary transition-colors">
                <span className="uppercase tracking-[0.15em]">View All</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </Link>

            <Link href="/ethos/deals" className="group bg-background p-8 hover:bg-white/[0.02] transition-all relative overflow-hidden">
              <div className="absolute top-0 left-0 h-px w-0 bg-primary group-hover:w-full transition-all duration-500" />
              <Briefcase className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-light text-white mb-2">Deals</h3>
              <p className="text-sm text-white/50 mb-4">Track sales pipeline</p>
              <div className="flex items-center gap-2 text-sm text-white/40 group-hover:text-primary transition-colors">
                <span className="uppercase tracking-[0.15em]">View All</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </Link>

            <Link href="/ethos/activities" className="group bg-background p-8 hover:bg-white/[0.02] transition-all relative overflow-hidden">
              <div className="absolute top-0 left-0 h-px w-0 bg-primary group-hover:w-full transition-all duration-500" />
              <Activity className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-light text-white mb-2">Activities</h3>
              <p className="text-sm text-white/50 mb-4">Log customer interactions</p>
              <div className="flex items-center gap-2 text-sm text-white/40 group-hover:text-primary transition-colors">
                <span className="uppercase tracking-[0.15em]">View All</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </Link>

            <Link href="/ethos/tasks" className="group bg-background p-8 hover:bg-white/[0.02] transition-all relative overflow-hidden">
              <div className="absolute top-0 left-0 h-px w-0 bg-primary group-hover:w-full transition-all duration-500" />
              <CheckSquare className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-light text-white mb-2">Tasks</h3>
              <p className="text-sm text-white/50 mb-4">Manage follow-ups</p>
              <div className="flex items-center gap-2 text-sm text-white/40 group-hover:text-primary transition-colors">
                <span className="uppercase tracking-[0.15em]">View All</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          </div>

          <SectionDivider label="Recent Activity" />

          {/* Recent Activity */}
          <div className="mt-16 grid md:grid-cols-2 gap-px bg-white/[0.03]">
            {/* Recent Contacts */}
            <div className="bg-background p-12">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-light text-white">Recent Contacts</h3>
                <Link href="/ethos/contacts" className="text-sm text-white/40 hover:text-primary transition uppercase tracking-[0.15em]">
                  View All
                </Link>
              </div>
              <div className="space-y-4">
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                ) : recentContacts.length === 0 ? (
                  <div className="text-center py-8 text-white/40">
                    No contacts yet
                  </div>
                ) : (
                  recentContacts.map((contact) => (
                    <div key={contact.id} className="flex items-center justify-between py-3 border-b border-white/[0.05] last:border-0">
                      <div>
                        <div className="text-base text-white mb-1">{contact.name}</div>
                        <div className="text-sm text-white/40">{contact.company || contact.email}</div>
                      </div>
                      <div className="text-xs text-white/30 uppercase tracking-[0.15em]">
                        {formatTimeAgo(contact.created_at)}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Recent Deals */}
            <div className="bg-background p-12">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-light text-white">Recent Deals</h3>
                <Link href="/ethos/deals" className="text-sm text-white/40 hover:text-primary transition uppercase tracking-[0.15em]">
                  View All
                </Link>
              </div>
              <div className="space-y-4">
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                ) : recentDeals.length === 0 ? (
                  <div className="text-center py-8 text-white/40">
                    No deals yet
                  </div>
                ) : (
                  recentDeals.map((deal) => (
                    <div key={deal.id} className="flex items-center justify-between py-3 border-b border-white/[0.05] last:border-0">
                      <div>
                        <div className="text-base text-white mb-1">{deal.title}</div>
                        <div className="text-sm text-white/40 capitalize">{deal.stage?.replace('_', ' ')}</div>
                      </div>
                      <div className="text-base text-primary font-light">
                        {formatCurrency(Number(deal.value))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <SectionDivider label="Pipeline Performance" className="mt-24" />

          {/* Pipeline Stats */}
          {isLoading ? (
            <div className="mt-16 grid md:grid-cols-3 gap-6">
              {[1,2,3].map(i => (
                <GlassCard key={i} className="p-12 flex items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </GlassCard>
              ))}
            </div>
          ) : (
            <div className="mt-16 grid md:grid-cols-3 gap-6">
              <GlassCard className="p-12">
                <DollarSign className="h-10 w-10 text-primary mb-6" />
                <div className="text-5xl font-light text-white mb-2">
                  {formatCurrency(pipelineStats.totalValue)}
                </div>
                <div className="text-sm text-white/40 uppercase tracking-[0.15em]">Total Pipeline</div>
                {pipelineStats.activeDeals > 0 && (
                  <div className="mt-6 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-green-500">{pipelineStats.activeDeals} active deals</span>
                  </div>
                )}
              </GlassCard>

              <GlassCard className="p-12">
                <Briefcase className="h-10 w-10 text-primary mb-6" />
                <div className="text-5xl font-light text-white mb-2">{winRate}%</div>
                <div className="text-sm text-white/40 uppercase tracking-[0.15em]">Win Rate</div>
                <div className="mt-6 flex items-center gap-2">
                  <span className="text-sm text-white/60">
                    {pipelineStats.wonDeals} won / {pipelineStats.activeDeals + pipelineStats.wonDeals} total
                  </span>
                </div>
              </GlassCard>

              <GlassCard className="p-12">
                <CheckSquare className="h-10 w-10 text-primary mb-6" />
                <div className="text-5xl font-light text-white mb-2">
                  {formatCurrency(pipelineStats.wonValue)}
                </div>
                <div className="text-sm text-white/40 uppercase tracking-[0.15em]">Revenue Closed</div>
                {pipelineStats.wonDeals > 0 && (
                  <div className="mt-6 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-green-500">{pipelineStats.wonDeals} deals won</span>
                  </div>
                )}
              </GlassCard>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
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
