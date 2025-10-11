"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { ButtonPurple } from "@/components/ui/plural"
import { Loader2, Calendar, DollarSign } from "lucide-react"
import { extendDataAccessRequest } from "@/lib/api/data-access-requests"
import { createEarning } from "@/lib/api/earnings"
import { toast } from "sonner"

type ExtendAccessDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
  requestId: string
  customerName: string
  customerWallet: string
  businessUserId: string
}

export function ExtendAccessDialog({
  open,
  onOpenChange,
  onSuccess,
  requestId,
  customerName,
  customerWallet,
  businessUserId,
}: ExtendAccessDialogProps) {
  const [additionalDays, setAdditionalDays] = useState(30)
  const [additionalPayment, setAdditionalPayment] = useState(5)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (additionalDays <= 0) {
      toast.error("Please enter a valid number of days")
      return
    }
    if (additionalPayment <= 0) {
      toast.error("Please enter a valid payment amount")
      return
    }

    try {
      setIsSubmitting(true)

      // Extend the access
      await extendDataAccessRequest(requestId, additionalDays, additionalPayment)

      // Create earning record for the extension
      await createEarning({
        request_id: requestId,
        amount: additionalPayment,
        currency: "DOT",
        business_name: customerName,
        business_user_id: businessUserId,
      })

      toast.success(`Access extended for ${additionalDays} days`)
      onOpenChange(false)
      onSuccess?.()
    } catch (error) {
      console.error("Failed to extend access:", error)
      toast.error("Failed to extend access. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#0A0A0A] border-white/[0.08] text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-light">Extend Access</DialogTitle>
          <p className="text-sm text-white/50 mt-2">
            Extend access to {customerName}'s data
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Customer Info */}
          <div className="p-4 rounded-lg bg-white/[0.03] border border-white/[0.08]">
            <div className="text-xs text-white/40 uppercase tracking-[0.15em] mb-2">Customer Wallet</div>
            <code className="text-sm font-mono text-primary">
              {customerWallet.slice(0, 12)}...{customerWallet.slice(-8)}
            </code>
          </div>

          {/* Additional Days */}
          <div>
            <label className="text-xs text-white/40 uppercase tracking-[0.15em] mb-3 block">
              <Calendar className="inline h-3 w-3 mr-2" />
              Additional Days
            </label>
            <div className="flex items-center gap-4">
              <input
                type="number"
                value={additionalDays}
                onChange={(e) => setAdditionalDays(parseInt(e.target.value) || 0)}
                min="1"
                max="365"
                className="flex-1 bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition"
                required
              />
              <span className="text-white/50">days</span>
            </div>
            <p className="mt-2 text-xs text-white/40">
              Common durations: 7, 14, 30, 60, 90 days
            </p>
          </div>

          {/* Payment */}
          <div>
            <label className="text-xs text-white/40 uppercase tracking-[0.15em] mb-3 block">
              <DollarSign className="inline h-3 w-3 mr-2" />
              Additional Payment
            </label>
            <div className="flex items-center gap-4">
              <input
                type="number"
                value={additionalPayment}
                onChange={(e) => setAdditionalPayment(parseFloat(e.target.value) || 0)}
                step="0.1"
                min="0.1"
                className="flex-1 bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition"
                required
              />
              <span className="text-white/50">DOT</span>
            </div>
            <p className="mt-2 text-xs text-white/40">
              Customer will receive this payment for the extended access
            </p>
          </div>

          {/* Summary */}
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/60">Extension Cost:</span>
              <span className="text-lg font-light text-primary">{additionalPayment} DOT</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-2">
              <span className="text-white/60">Duration:</span>
              <span className="text-white">{additionalDays} days</span>
            </div>
          </div>

          <DialogFooter>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="px-6 py-3 rounded-lg border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.05] text-white/60 hover:text-white transition-all"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <ButtonPurple type="submit" disabled={isSubmitting} className="px-6 py-3">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Extending...
                </>
              ) : (
                `Extend for ${additionalDays} days`
              )}
            </ButtonPurple>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
