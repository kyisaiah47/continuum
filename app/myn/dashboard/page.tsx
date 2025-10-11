"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { GridBackground, SectionDivider, ButtonPurple, StatCard } from "@/components/ui/plural"
import { ProductSwitcher } from "@/components/product-switcher"
import { Shield, DollarSign, Users, Lock, ArrowRight, AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import { useWallet } from "@/lib/polkadot/wallet-context"
import { getPendingCustomerRequests, getActiveRequests, type DataAccessRequest } from "@/lib/api/data-access-requests"
import { getEarningsStats } from "@/lib/api/earnings"
import { getVaultStats } from "@/lib/api/vault"
import { subscribeToCustomerRequests, subscribeToEarnings } from "@/lib/supabase/realtime"

export default function MynDashboard() {
  const { account } = useWallet()
  const [isLoading, setIsLoading] = useState(true)
  const [pendingRequests, setPendingRequests] = useState<DataAccessRequest[]>([])
  const [activeGrants, setActiveGrants] = useState<DataAccessRequest[]>([])
  const [totalEarnings, setTotalEarnings] = useState(0)
  const [sharedFieldsCount, setSharedFieldsCount] = useState(0)

  useEffect(() => {
    if (account?.address) {
      loadDashboardData()

      // Subscribe to realtime updates for requests and earnings
      const requestsSubscription = subscribeToCustomerRequests(
        account.address,
        (event) => {
          if (event.eventType === "INSERT" || event.eventType === "UPDATE") {
            loadDashboardData()
          }
        }
      )

      const earningsSubscription = subscribeToEarnings((event) => {
        if (event.eventType === "INSERT" || event.eventType === "UPDATE") {
          loadDashboardData()
        }
      })

      return () => {
        requestsSubscription.unsubscribe()
        earningsSubscription.unsubscribe()
      }
    }
  }, [account?.address])

  async function loadDashboardData() {
    try {
      setIsLoading(true)
      const [pending, active, earnings, vaultStats] = await Promise.all([
        getPendingCustomerRequests(account!.address),
        getActiveRequests(account!.address),
        getEarningsStats(),
        getVaultStats()
      ])

      setPendingRequests(pending)
      setActiveGrants(active)
      setTotalEarnings(earnings.totalEarnings)
      setSharedFieldsCount(vaultStats.sharedFieldsCount)
    } catch (error) {
      console.error("Failed to load dashboard data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <GridBackground showCorners className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 border-b border-white/[0.08] bg-background/80 backdrop-blur-xl">
        <div className="max-w-[1400px] mx-auto px-8 h-20 flex items-center justify-between">
          <ProductSwitcher />

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/myn/dashboard" className="text-sm text-primary transition tracking-wide">Dashboard</Link>
            <Link href="/myn/vault" className="text-sm text-white/60 hover:text-white transition tracking-wide">Data Vault</Link>
            <Link href="/myn/requests" className="text-sm text-white/60 hover:text-white transition tracking-wide">Requests</Link>
            <Link href="/myn/access" className="text-sm text-white/60 hover:text-white transition tracking-wide">Access</Link>
            <Link href="/myn/earnings" className="text-sm text-white/60 hover:text-white transition tracking-wide">Earnings</Link>
            <div className="h-6 w-px bg-white/[0.08]" />
            <ButtonPurple className="h-9 px-5 text-sm" asChild>
              <Link href="/myn/settings">Settings</Link>
            </ButtonPurple>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-32 pb-16 px-8">
        <div className="max-w-[1400px] mx-auto">
          {/* Page Title */}
          <div className="mb-16">
            <h1 className="text-6xl font-light tracking-tight text-white mb-4">
              Your Data Vault
            </h1>
            <p className="text-xl text-white/50">
              You own your data. Control who accesses it and earn DOT tokens.
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
              <StatCard value={`$${totalEarnings.toFixed(2)}`} label="Total Earnings" />
              <StatCard value={activeGrants.length.toString()} label="Active Access Grants" />
              <StatCard value={pendingRequests.length.toString()} label="Pending Requests" />
              <StatCard value={sharedFieldsCount.toString()} label="Data Fields Shared" />
            </div>
          )}

          <SectionDivider label="Overview" />

          {/* Alert Banner */}
          {!isLoading && pendingRequests.length > 0 && (
            <div className="mt-16 mb-12 bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-6 flex items-start gap-4">
              <AlertCircle className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-light text-white mb-2">
                  {pendingRequests.length} New Access Request{pendingRequests.length > 1 ? 's' : ''}
                </h3>
                <p className="text-sm text-white/60 mb-4">
                  Companies are requesting access to your data. Review and approve to earn DOT tokens.
                </p>
                <ButtonPurple className="h-10 px-6 text-sm" asChild>
                  <Link href="/myn/requests">Review Requests</Link>
                </ButtonPurple>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-px bg-white/[0.03] mb-24">
            <Link href="/myn/vault" className="group bg-background p-12 hover:bg-white/[0.02] transition-all relative overflow-hidden">
              <div className="absolute top-0 left-0 h-px w-0 bg-primary group-hover:w-full transition-all duration-500" />
              <Shield className="h-10 w-10 text-primary mb-6" />
              <h3 className="text-2xl font-light text-white mb-3">Data Vault</h3>
              <p className="text-base text-white/50 mb-6">
                View and manage your personal data stored securely on-chain
              </p>
              <div className="flex items-center gap-2 text-sm text-white/40 group-hover:text-primary transition-colors">
                <span className="uppercase tracking-[0.15em]">Manage Data</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </Link>

            <Link href="/myn/requests" className="group bg-background p-12 hover:bg-white/[0.02] transition-all relative overflow-hidden">
              <div className="absolute top-0 left-0 h-px w-0 bg-primary group-hover:w-full transition-all duration-500" />
              <Users className="h-10 w-10 text-primary mb-6" />
              <h3 className="text-2xl font-light text-white mb-3">Access Requests</h3>
              <p className="text-base text-white/50 mb-6">
                Review companies requesting access to your data
              </p>
              <div className="flex items-center gap-2 text-sm text-white/40 group-hover:text-primary transition-colors">
                <span className="uppercase tracking-[0.15em]">View Requests</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </Link>

            <Link href="/myn/earnings" className="group bg-background p-12 hover:bg-white/[0.02] transition-all relative overflow-hidden">
              <div className="absolute top-0 left-0 h-px w-0 bg-primary group-hover:w-full transition-all duration-500" />
              <DollarSign className="h-10 w-10 text-primary mb-6" />
              <h3 className="text-2xl font-light text-white mb-3">Earnings</h3>
              <p className="text-base text-white/50 mb-6">
                Track your DOT earnings from data access grants
              </p>
              <div className="flex items-center gap-2 text-sm text-white/40 group-hover:text-primary transition-colors">
                <span className="uppercase tracking-[0.15em]">View Earnings</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          </div>

          <SectionDivider label="Recent Activity" />

          {/* Recent Activity */}
          <div className="mt-16 grid md:grid-cols-2 gap-6">
            {/* Recent Requests */}
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-light text-white">Recent Requests</h3>
                <Link href="/myn/requests" className="text-sm text-white/40 hover:text-primary transition uppercase tracking-[0.15em]">
                  View All
                </Link>
              </div>
              <div className="space-y-4">
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                ) : pendingRequests.length === 0 ? (
                  <div className="text-center py-8 text-white/40">
                    No pending requests
                  </div>
                ) : (
                  pendingRequests.slice(0, 3).map((req) => (
                    <div key={req.id} className="flex items-center justify-between py-3 border-b border-white/[0.05] last:border-0">
                      <div>
                        <div className="text-base text-white mb-1">{req.customer_name || 'Unknown Business'}</div>
                        <div className="text-sm text-white/40">{req.requested_fields.length} fields · {req.payment_amount} {req.payment_currency}</div>
                      </div>
                      <div className="px-3 py-1 rounded-full text-xs uppercase tracking-[0.15em] bg-yellow-500/10 border border-yellow-500/20 text-yellow-400">
                        pending
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Active Access Grants */}
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-light text-white">Active Access</h3>
                <Link href="/myn/access" className="text-sm text-white/40 hover:text-primary transition uppercase tracking-[0.15em]">
                  View All
                </Link>
              </div>
              <div className="space-y-4">
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                ) : activeGrants.length === 0 ? (
                  <div className="text-center py-8 text-white/40">
                    No active grants
                  </div>
                ) : (
                  activeGrants.slice(0, 3).map((grant) => {
                    const daysLeft = grant.expires_at
                      ? Math.ceil((new Date(grant.expires_at).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
                      : 0
                    return (
                      <div key={grant.id} className="flex items-center justify-between py-3 border-b border-white/[0.05] last:border-0">
                        <div>
                          <div className="text-base text-white mb-1">{grant.customer_name || 'Unknown Business'}</div>
                          <div className="text-sm text-white/40">{grant.requested_fields.length} fields</div>
                        </div>
                        <div className="text-xs text-white/30 uppercase tracking-[0.15em]">
                          {daysLeft} {daysLeft === 1 ? 'day' : 'days'}
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            </div>
          </div>

          {/* Privacy Info */}
          <div className="mt-24 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-light text-white mb-2">Your Data, Your Control</h3>
                <p className="text-base text-white/60 leading-relaxed mb-4">
                  All your data is encrypted and stored on the Polkadot blockchain. Companies can only access what you approve, for the duration you specify. You can revoke access at any time.
                </p>
                <div className="flex items-center gap-6 text-sm text-white/40">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>End-to-end encrypted</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Time-limited access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Instant revocation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.08] px-8 py-8">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <p className="text-xs text-white/30"> 2025 Continuum. Built on Polkadot.</p>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
            <span className="text-xs text-white/30">Wallet Connected</span>
          </div>
        </div>
      </footer>
    </GridBackground>
  )
}
