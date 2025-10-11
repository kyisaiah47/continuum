"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ButtonPurple } from "@/components/ui/plural"
import { Plus, Loader2 } from "lucide-react"
import { createDataAccessRequest } from "@/lib/api/data-access-requests"
import { toast } from "sonner"

interface DataAccessRequestDialogProps {
  contactName?: string
  contactWallet?: string
  onSuccess?: () => void
}

export function DataAccessRequestDialog({
  contactName,
  contactWallet,
  onSuccess
}: DataAccessRequestDialogProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    customer_wallet: contactWallet || "",
    customer_name: contactName || "",
    requested_fields: [] as string[],
    access_duration_days: 30,
    payment_amount: 5.0
  })

  const availableFields = [
    "Full Name",
    "Email",
    "Phone",
    "Company",
    "Job Title",
    "LinkedIn",
    "Industry Interest",
    "Budget Range",
    "Decision Timeline"
  ]

  function toggleField(field: string) {
    setFormData(prev => ({
      ...prev,
      requested_fields: prev.requested_fields.includes(field)
        ? prev.requested_fields.filter(f => f !== field)
        : [...prev.requested_fields, field]
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!formData.customer_wallet) {
      toast.error("Wallet address is required")
      return
    }

    if (formData.requested_fields.length === 0) {
      toast.error("Please select at least one field")
      return
    }

    try {
      setIsSubmitting(true)
      await createDataAccessRequest(formData)
      toast.success("Data access request created successfully")
      setOpen(false)
      onSuccess?.()

      // Reset form
      setFormData({
        customer_wallet: "",
        customer_name: "",
        requested_fields: [],
        access_duration_days: 30,
        payment_amount: 5.0
      })
    } catch (error) {
      console.error("Failed to create request:", error)
      toast.error("Failed to create request. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <ButtonPurple className="h-12 px-6 text-base">
          <Plus className="mr-2 h-4 w-4" />
          New Request
        </ButtonPurple>
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-[#0a0a0a] border-white/[0.08]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-light text-white">
            Request Data Access
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div>
            <label className="text-sm text-white/60 mb-2 block">
              Customer Wallet Address *
            </label>
            <input
              type="text"
              value={formData.customer_wallet}
              onChange={(e) => setFormData({ ...formData, customer_wallet: e.target.value })}
              className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-lg text-white focus:outline-none focus:border-primary/50 transition font-mono text-sm"
              placeholder="5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY"
              required
            />
          </div>

          <div>
            <label className="text-sm text-white/60 mb-2 block">
              Customer Name (Optional)
            </label>
            <input
              type="text"
              value={formData.customer_name}
              onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
              className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-lg text-white focus:outline-none focus:border-primary/50 transition"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="text-sm text-white/60 mb-3 block">
              Requested Fields * (Select at least one)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {availableFields.map((field) => (
                <button
                  key={field}
                  type="button"
                  onClick={() => toggleField(field)}
                  className={`px-3 py-2 rounded-lg text-sm transition ${
                    formData.requested_fields.includes(field)
                      ? "bg-primary/20 border border-primary/40 text-primary"
                      : "bg-white/[0.03] border border-white/[0.08] text-white/60 hover:border-white/20"
                  }`}
                >
                  {field}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-white/60 mb-2 block">
                Access Duration (days)
              </label>
              <input
                type="number"
                value={formData.access_duration_days}
                onChange={(e) => setFormData({ ...formData, access_duration_days: parseInt(e.target.value) })}
                className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-lg text-white focus:outline-none focus:border-primary/50 transition"
                min="1"
                max="365"
                required
              />
            </div>

            <div>
              <label className="text-sm text-white/60 mb-2 block">
                Payment Amount (DOT)
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.payment_amount}
                onChange={(e) => setFormData({ ...formData, payment_amount: parseFloat(e.target.value) })}
                className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-lg text-white focus:outline-none focus:border-primary/50 transition"
                min="0.1"
                required
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <ButtonPurple
              type="submit"
              className="flex-1 h-12"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Request...
                </>
              ) : (
                `Request Access for ${formData.payment_amount} DOT`
              )}
            </ButtonPurple>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-6 h-12 rounded-lg border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.05] text-white/60 hover:text-white transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
