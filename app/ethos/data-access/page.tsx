"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { GridBackground, SectionDivider, ButtonPurple } from "@/components/ui/plural"
import { ProductSwitcher } from "@/components/product-switcher"
import { Plus, Wallet, Clock, DollarSign, Shield, Lock, AlertCircle, Loader2 } from "lucide-react"
import { getBusinessRequests, type DataAccessRequest } from "@/lib/api/data-access-requests"
import { DataAccessRequestDialog } from "@/components/data-access-request-dialog"
import { ExtendAccessDialog } from "@/components/dialogs/extend-access-dialog"

export default function DataAccessPage() {
  const [requests, setRequests] = useState<DataAccessRequest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [extendingRequest, setExtendingRequest] = useState<DataAccessRequest | null>(null)

  useEffect(() => {
    loadRequests()
  }, [])

  async function loadRequests() {
    try {
      setIsLoading(true)
      const data = await getBusinessRequests()
      setRequests(data)
    } catch (error) {
      console.error("Failed to load requests:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const activeRequests = requests.filter((r) => r.status === "approved")
  const pendingRequests = requests.filter((r) => r.status === "pending")

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
              <span className="text-[10px] text-white/40 uppercase tracking-[0.15em]">Data Access</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/ethos/dashboard" className="text-sm text-white/60 hover:text-white transition tracking-wide">Dashboard</Link>
            <Link href="/ethos/contacts" className="text-sm text-white/60 hover:text-white transition tracking-wide">Contacts</Link>
            <Link href="/ethos/deals" className="text-sm text-white/60 hover:text-white transition tracking-wide">Deals</Link>
            <Link href="/ethos/activities" className="text-sm text-white/60 hover:text-white transition tracking-wide">Activities</Link>
            <div className="h-6 w-px bg-white/[0.08]" />
            <ButtonPurple className="h-9 px-5 text-sm" asChild>
              <Link href="/ethos/data-access">Request Data</Link>
            </ButtonPurple>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-32 pb-16 px-8">
        <div className="max-w-[1400px] mx-auto">
          {/* Page Title & Actions */}
          <div className="mb-16 flex items-end justify-between">
            <div>
              <h1 className="text-6xl font-light tracking-tight text-white mb-4">
                Data Access
              </h1>
              <p className="text-xl text-white/50">
                Request temporary access to customer-owned data
              </p>
            </div>
            <DataAccessRequestDialog onSuccess={loadRequests} />
          </div>

          {/* Info Card */}
          <div className="mb-16 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-light text-white mb-2">Customer-Owned Data on Polkadot</h3>
                <p className="text-base text-white/60 leading-relaxed mb-4">
                  Request temporary access to customer data stored in their Polkadot wallets.
                  Pay in DOT tokens for time-limited access. Customers maintain full control and can revoke at any time.
                </p>
                <div className="flex items-center gap-6 text-sm text-white/40">
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    <span>End-to-end encrypted</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Time-limited access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wallet className="h-4 w-4" />
                    <span>Smart contract secured</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <SectionDivider label={`${activeRequests.length} Active Access Grants`} />

          {/* Active Requests */}
          <div className="mt-16">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-3 text-white/50">Loading requests...</span>
              </div>
            ) : activeRequests.length === 0 ? (
              <div className="text-center py-32">
                <Lock className="h-24 w-24 mx-auto mb-8 text-white/20" />
                <h3 className="text-3xl font-light text-white mb-4">No active access</h3>
                <p className="text-lg text-white/50 mb-8">
                  Request access to customer data to get started
                </p>
                <DataAccessRequestDialog onSuccess={loadRequests} />
              </div>
            ) : null}

            {!isLoading && activeRequests.length > 0 && (
              <div className="grid md:grid-cols-2 gap-6">
                {activeRequests.map((request) => {
                  const daysLeft = request.expires_at
                    ? Math.ceil((new Date(request.expires_at).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
                    : 0
                  const isExpiringSoon = daysLeft <= 7

                  return (
                    <div
                      key={request.id}
                      className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-8 hover:bg-white/[0.05] transition-all group relative overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 h-px w-0 bg-primary group-hover:w-full transition-all duration-500" />

                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <h3 className="text-2xl font-light text-white mb-2">{request.customer_name || "Customer"}</h3>
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                            <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                            <span className="text-xs text-green-400 uppercase tracking-[0.15em]">Active</span>
                          </div>
                        </div>
                        <ButtonPurple
                          className="h-9 px-4 text-sm"
                          onClick={() => setExtendingRequest(request)}
                        >
                          Extend
                        </ButtonPurple>
                      </div>

                      <div className="space-y-4 mb-6">
                        <div>
                          <p className="text-xs text-white/40 uppercase tracking-[0.15em] mb-2">Wallet Address</p>
                          <code className="text-sm font-mono text-primary bg-white/[0.03] px-3 py-1 rounded border border-white/[0.08]">
                            {request.customer_wallet.slice(0, 12)}...{request.customer_wallet.slice(-8)}
                          </code>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-white/40 uppercase tracking-[0.15em] mb-2">Payment</p>
                            <div className="flex items-baseline gap-2">
                              <span className="text-xl font-light text-white">{request.payment_amount}</span>
                              <span className="text-sm text-white/50">{request.payment_currency}</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-white/40 uppercase tracking-[0.15em] mb-2">Expires In</p>
                            <div className="flex items-baseline gap-2">
                              <span className={`text-xl font-light ${isExpiringSoon ? "text-yellow-400" : "text-white"}`}>
                                {daysLeft}
                              </span>
                              <span className="text-sm text-white/50">days</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mb-6">
                        <p className="text-xs text-white/40 uppercase tracking-[0.15em] mb-3">Access to Fields</p>
                        <div className="flex flex-wrap gap-2">
                          {request.requested_fields.map((field) => (
                            <span
                              key={field}
                              className="px-2 py-1 rounded bg-white/[0.03] border border-white/[0.08] text-xs text-white/60"
                            >
                              {field}
                            </span>
                          ))}
                        </div>
                      </div>

                      {isExpiringSoon && (
                        <div className="flex items-center gap-2 px-3 py-2 rounded bg-yellow-500/10 border border-yellow-500/20">
                          <AlertCircle className="h-4 w-4 text-yellow-400" />
                          <span className="text-sm text-yellow-400">Expiring soon - consider extending</span>
                        </div>
                      )}

                      {request.expires_at && (
                        <div className="mt-6 pt-6 border-t border-white/[0.05] text-xs text-white/30 uppercase tracking-[0.15em]">
                          Expires: {new Date(request.expires_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          <SectionDivider label={`${pendingRequests.length} Pending Approval`} className="mt-24" />

          {/* Pending Requests */}
          <div className="mt-16">
            {pendingRequests.length === 0 && (
              <div className="text-center py-16">
                <p className="text-base text-white/40">No pending requests</p>
              </div>
            )}

            {pendingRequests.length > 0 && (
              <div className="grid md:grid-cols-2 gap-6">
                {pendingRequests.map((request) => (
                  <div
                    key={request.id}
                    className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-8 hover:bg-white/[0.05] transition-all group relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 h-px w-0 bg-primary group-hover:w-full transition-all duration-500" />

                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-light text-white mb-2">{request.customer_name || "Customer"}</h3>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20">
                          <Clock className="h-3 w-3 text-yellow-400" />
                          <span className="text-xs text-yellow-400 uppercase tracking-[0.15em]">Pending</span>
                        </div>
                      </div>
                      <button className="text-sm text-white/40 hover:text-white/60 transition">
                        Cancel
                      </button>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div>
                        <p className="text-xs text-white/40 uppercase tracking-[0.15em] mb-2">Wallet Address</p>
                        <code className="text-sm font-mono text-primary bg-white/[0.03] px-3 py-1 rounded border border-white/[0.08]">
                          {request.customer_wallet.slice(0, 12)}...{request.customer_wallet.slice(-8)}
                        </code>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-white/40 uppercase tracking-[0.15em] mb-2">Offered Payment</p>
                          <div className="flex items-baseline gap-2">
                            <span className="text-xl font-light text-white">{request.payment_amount}</span>
                            <span className="text-sm text-white/50">{request.payment_currency}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-white/40 uppercase tracking-[0.15em] mb-2">Duration</p>
                          <div className="flex items-baseline gap-2">
                            <span className="text-xl font-light text-white">{request.access_duration_days}</span>
                            <span className="text-sm text-white/50">days</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-white/40 uppercase tracking-[0.15em] mb-3">Requested Fields</p>
                      <div className="flex flex-wrap gap-2">
                        {request.requested_fields.map((field) => (
                          <span
                            key={field}
                            className="px-2 py-1 rounded bg-white/[0.03] border border-white/[0.08] text-xs text-white/60"
                          >
                            {field}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-white/[0.05]">
                      <p className="text-xs text-white/30">
                        Waiting for customer approval via smart contract
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
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

      {/* Extend Access Dialog */}
      {extendingRequest && (
        <ExtendAccessDialog
          open={!!extendingRequest}
          onOpenChange={(open) => !open && setExtendingRequest(null)}
          onSuccess={loadRequests}
          requestId={extendingRequest.id}
          customerName={extendingRequest.customer_name || "Customer"}
          customerWallet={extendingRequest.customer_wallet}
          businessUserId={extendingRequest.business_user_id}
        />
      )}
    </GridBackground>
  )
}
