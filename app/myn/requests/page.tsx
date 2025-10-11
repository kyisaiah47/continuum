"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { GridBackground, SectionDivider, ButtonPurple } from "@/components/ui/plural"
import { ProductSwitcher } from "@/components/product-switcher"
import { Users, Check, X, Clock, DollarSign, Loader2 } from "lucide-react"
import { getPendingCustomerRequests, approveDataAccessRequest, rejectDataAccessRequest, type DataAccessRequest } from "@/lib/api/data-access-requests"
import { createEarning } from "@/lib/api/earnings"
import { toast } from "sonner"
import { useWallet } from "@/lib/polkadot/wallet-context"

export default function MynRequests() {
  const { account } = useWallet()
  const [requests, setRequests] = useState<DataAccessRequest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [processingId, setProcessingId] = useState<string | null>(null)

  useEffect(() => {
    if (account?.address) {
      loadRequests()
    }
  }, [account?.address])

  async function loadRequests() {
    if (!account?.address) return
    try {
      setIsLoading(true)
      const data = await getPendingCustomerRequests(account.address)
      setRequests(data)
    } catch (error) {
      console.error("Failed to load requests:", error)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleApprove(request: DataAccessRequest) {
    try {
      setProcessingId(request.id)

      // Approve the request
      await approveDataAccessRequest(request.id)

      // Create earning record
      await createEarning({
        request_id: request.id,
        amount: request.payment_amount,
        currency: request.payment_currency,
        business_name: request.customer_name || "Unknown Business",
        business_user_id: request.business_user_id,
      })

      // Reload requests
      await loadRequests()
      toast.success(`Request approved! You've earned ${request.payment_amount} ${request.payment_currency}`)
    } catch (error) {
      console.error("Failed to approve request:", error)
      toast.error("Failed to approve request. Please try again.")
    } finally {
      setProcessingId(null)
    }
  }

  async function handleReject(requestId: string) {
    try {
      setProcessingId(requestId)
      await rejectDataAccessRequest(requestId)
      await loadRequests()
      toast.success("Request rejected successfully")
    } catch (error) {
      console.error("Failed to reject request:", error)
      toast.error("Failed to reject request. Please try again.")
    } finally {
      setProcessingId(null)
    }
  }

  function formatTimeAgo(dateString: string): string {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now.getTime() - date.getTime()

    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 60) return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`
    if (hours < 24) return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`
    return `${days} ${days === 1 ? 'day' : 'days'} ago`
  }

  function getCompanyInitials(name: string | null): string {
    if (!name) return "?"
    return name.split(" ").map(word => word[0]).join("").toUpperCase().slice(0, 2)
  }

  return (
    <GridBackground showCorners className="min-h-screen">
      <header className="fixed top-0 w-full z-50 border-b border-white/[0.08] bg-background/80 backdrop-blur-xl">
        <div className="max-w-[1400px] mx-auto px-8 h-20 flex items-center justify-between">
          <ProductSwitcher />
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/myn/dashboard" className="text-sm text-white/60 hover:text-white transition tracking-wide">Dashboard</Link>
            <Link href="/myn/vault" className="text-sm text-white/60 hover:text-white transition tracking-wide">Data Vault</Link>
            <Link href="/myn/requests" className="text-sm text-primary transition tracking-wide">Requests</Link>
            <Link href="/myn/access" className="text-sm text-white/60 hover:text-white transition tracking-wide">Access</Link>
            <Link href="/myn/earnings" className="text-sm text-white/60 hover:text-white transition tracking-wide">Earnings</Link>
            <div className="h-6 w-px bg-white/[0.08]" />
            <ButtonPurple className="h-9 px-5 text-sm" asChild>
              <Link href="/myn/settings">Settings</Link>
            </ButtonPurple>
          </nav>
        </div>
      </header>

      <main className="pt-32 pb-16 px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <h1 className="text-6xl font-light tracking-tight text-white mb-4">
              Access Requests
            </h1>
            <p className="text-xl text-white/50">
              Review and approve companies requesting access to your data
            </p>
          </div>

          <SectionDivider label={`${requests.length} Pending Requests`} />

          {isLoading ? (
            <div className="mt-16 flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-3 text-white/50">Loading requests...</span>
            </div>
          ) : requests.length === 0 ? (
            <div className="text-center py-32">
              <Users className="h-24 w-24 mx-auto mb-8 text-white/20" />
              <h3 className="text-3xl font-light text-white mb-4">No pending requests</h3>
              <p className="text-lg text-white/50">
                Companies will appear here when they request access to your data
              </p>
            </div>
          ) : (
            <div className="mt-16 space-y-6">
              {requests.map((request) => {
                const isProcessing = processingId === request.id

                return (
                  <div
                    key={request.id}
                    className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-8 hover:bg-white/[0.05] transition-all"
                  >
                    <div className="flex gap-8">
                      {/* Company Logo */}
                      <div className="flex-shrink-0">
                        <div className="h-16 w-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                          <span className="text-lg font-light text-primary">
                            {getCompanyInitials(request.customer_name)}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-2xl font-light text-white mb-2">
                              {request.customer_name || "Unknown Business"}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-white/40">
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                <span>{formatTimeAgo(request.created_at)}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-3xl font-light text-primary mb-1">
                              {request.payment_amount} {request.payment_currency}
                            </div>
                            <div className="text-sm text-white/40">
                              for {request.access_duration_days} days
                            </div>
                          </div>
                        </div>

                        {/* Requested Fields */}
                        <div className="mb-4">
                          <p className="text-xs text-white/40 uppercase tracking-[0.15em] mb-3">
                            Requested Fields
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {request.requested_fields.map((field, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 rounded bg-white/[0.03] border border-white/[0.08] text-sm text-white/60"
                              >
                                {field}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 mt-6">
                          <ButtonPurple
                            className="h-11 px-6 text-sm"
                            onClick={() => handleApprove(request)}
                            disabled={isProcessing}
                          >
                            {isProcessing ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Processing...
                              </>
                            ) : (
                              <>
                                <Check className="mr-2 h-4 w-4" />
                                Approve & Earn {request.payment_amount} {request.payment_currency}
                              </>
                            )}
                          </ButtonPurple>
                          <button
                            className="h-11 px-6 text-sm rounded-lg border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.05] text-white/60 hover:text-white transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={() => handleReject(request.id)}
                            disabled={isProcessing}
                          >
                            <X className="h-4 w-4" />
                            Reject
                          </button>
                        </div>
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
