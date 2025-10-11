"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { GridBackground, SectionDivider, ButtonPurple, StatCard } from "@/components/ui/plural"
import { ProductSwitcher } from "@/components/product-switcher"
import { DollarSign, TrendingUp, Wallet, ArrowUpRight, Loader2 } from "lucide-react"
import { getEarnings, getEarningsStats, type Earning } from "@/lib/api/earnings"
import { subscribeToEarnings } from "@/lib/supabase/realtime"

export default function MynEarnings() {
  const [transactions, setTransactions] = useState<Earning[]>([])
  const [stats, setStats] = useState({
    totalEarnings: 0,
    pendingEarnings: 0,
    totalTransactions: 0,
    completedTransactions: 0,
    monthlyTrend: [] as Array<{ month: string; amount: number }>,
    currency: "DOT"
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadEarnings()

    // Subscribe to realtime updates
    const subscription = subscribeToEarnings((event) => {
      if (event.eventType === "INSERT" || event.eventType === "UPDATE") {
        // Reload earnings when new ones arrive or existing ones update
        loadEarnings()
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  async function loadEarnings() {
    try {
      setIsLoading(true)
      const [earningsData, statsData] = await Promise.all([
        getEarnings(),
        getEarningsStats()
      ])
      setTransactions(earningsData)
      setStats(statsData)
    } catch (error) {
      console.error("Failed to load earnings:", error)
    } finally {
      setIsLoading(false)
    }
  }

  function formatDate(dateString: string | null): string {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  function calculateGrowth(): string {
    if (stats.monthlyTrend.length < 2) return "+0%"

    const lastMonth = stats.monthlyTrend[stats.monthlyTrend.length - 1]?.amount || 0
    const previousMonth = stats.monthlyTrend[stats.monthlyTrend.length - 2]?.amount || 0

    if (previousMonth === 0) return "+0%"

    const growth = ((lastMonth - previousMonth) / previousMonth) * 100
    return `${growth >= 0 ? '+' : ''}${Math.round(growth)}%`
  }

  return (
    <GridBackground showCorners className="min-h-screen">
      <header className="fixed top-0 w-full z-50 border-b border-white/[0.08] bg-background/80 backdrop-blur-xl">
        <div className="max-w-[1400px] mx-auto px-8 h-20 flex items-center justify-between">
          <ProductSwitcher />
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/myn/dashboard" className="text-sm text-white/60 hover:text-white transition tracking-wide">Dashboard</Link>
            <Link href="/myn/vault" className="text-sm text-white/60 hover:text-white transition tracking-wide">Data Vault</Link>
            <Link href="/myn/requests" className="text-sm text-white/60 hover:text-white transition tracking-wide">Requests</Link>
            <Link href="/myn/access" className="text-sm text-white/60 hover:text-white transition tracking-wide">Access</Link>
            <Link href="/myn/earnings" className="text-sm text-primary transition tracking-wide">Earnings</Link>
            <div className="h-6 w-px bg-white/[0.08]" />
            <ButtonPurple className="h-9 px-5 text-sm" asChild>
              <Link href="/myn/settings">Settings</Link>
            </ButtonPurple>
          </nav>
        </div>
      </header>

      <main className="pt-32 pb-16 px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16 flex items-end justify-between">
            <div>
              <h1 className="text-6xl font-light tracking-tight text-white mb-4">
                Earnings
              </h1>
              <p className="text-xl text-white/50">
                Track your DOT earnings from data access grants
              </p>
            </div>
            <ButtonPurple className="h-12 px-6 text-base">
              <Wallet className="mr-2 h-4 w-4" />
              Withdraw to Wallet
            </ButtonPurple>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-3 text-white/50">Loading earnings...</span>
            </div>
          ) : (
            <>
              {/* Stats Grid */}
              <div className="glass-card rounded-none border-y border-white/[0.03] grid grid-cols-3 divide-x divide-white/[0.03] mb-16">
                <StatCard value={`${stats.totalEarnings.toFixed(2)} ${stats.currency}`} label="Total Earned" />
                <StatCard value={`${stats.pendingEarnings.toFixed(2)} ${stats.currency}`} label="Pending Earnings" />
                <StatCard value={`${stats.completedTransactions}`} label="Total Payments" />
              </div>

              {/* Earning Trend */}
              {stats.completedTransactions > 0 && (
                <div className="mb-16 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-8">
                  <div className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                        <TrendingUp className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-light text-white mb-2">Monthly Earnings Growth</h3>
                      <p className="text-base text-white/60 leading-relaxed">
                        {parseFloat(calculateGrowth()) > 0
                          ? `Your earnings have increased compared to last month. Keep approving quality access requests to maximize your income.`
                          : `Track your earnings over time and approve access requests to start earning.`
                        }
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-light text-primary">{calculateGrowth()}</div>
                      <div className="text-sm text-white/40">vs last month</div>
                    </div>
                  </div>
                </div>
              )}

              <SectionDivider label="Transaction History" />

              {/* Transaction List */}
              {transactions.length === 0 ? (
                <div className="text-center py-32">
                  <Wallet className="h-24 w-24 mx-auto mb-8 text-white/20" />
                  <h3 className="text-3xl font-light text-white mb-4">No transactions yet</h3>
                  <p className="text-lg text-white/50">
                    Start approving data access requests to earn {stats.currency}
                  </p>
                </div>
              ) : (
                <div className="mt-16 bg-white/[0.03] border border-white/[0.08] rounded-lg divide-y divide-white/[0.05]">
                  {transactions.map((tx) => (
                    <div key={tx.id} className="p-6 hover:bg-white/[0.02] transition-all flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                          tx.status === "completed"
                            ? "bg-green-500/10 border border-green-500/20"
                            : tx.status === "pending"
                            ? "bg-yellow-500/10 border border-yellow-500/20"
                            : "bg-red-500/10 border border-red-500/20"
                        }`}>
                          <DollarSign className={`h-6 w-6 ${
                            tx.status === "completed"
                              ? "text-green-400"
                              : tx.status === "pending"
                              ? "text-yellow-400"
                              : "text-red-400"
                          }`} />
                        </div>
                        <div>
                          <div className="text-base text-white mb-1">
                            {tx.status === "completed" ? "Payment Received" : tx.status === "pending" ? "Payment Pending" : "Payment Failed"}
                          </div>
                          <div className="text-sm text-white/40">{tx.business_name || "Unknown Business"}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-8">
                        <div className="text-right">
                          <div className="text-sm text-white/40 mb-1">
                            {tx.paid_at ? formatDate(tx.paid_at) : tx.status === "pending" ? "Pending" : formatDate(tx.created_at)}
                          </div>
                          <div className={`px-2 py-1 rounded text-xs uppercase tracking-[0.15em] ${
                            tx.status === "completed"
                              ? "bg-green-500/10 border border-green-500/20 text-green-400"
                              : tx.status === "pending"
                              ? "bg-yellow-500/10 border border-yellow-500/20 text-yellow-400"
                              : "bg-red-500/10 border border-red-500/20 text-red-400"
                          }`}>
                            {tx.status}
                          </div>
                        </div>
                        <div className="text-2xl font-light text-primary min-w-[120px] text-right">
                          +{tx.amount} {tx.currency}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <footer className="border-t border-white/[0.08] px-8 py-8">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <p className="text-xs text-white/30">� 2025 Continuum. Built on Polkadot.</p>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
            <span className="text-xs text-white/30">Wallet Connected</span>
          </div>
        </div>
      </footer>
    </GridBackground>
  )
}
