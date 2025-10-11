"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { ButtonPurple } from "@/components/ui/plural"
import { Phone, Mail, Calendar, FileText, Loader2 } from "lucide-react"
import { createActivity } from "@/lib/api/activities"
import { type Activity } from "@/lib/supabase-client"
import { toast } from "sonner"

type ActivityDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
  contactId?: string
  dealId?: string
}

const activityTypes = [
  { value: "call", label: "Phone Call", icon: Phone },
  { value: "email", label: "Email", icon: Mail },
  { value: "meeting", label: "Meeting", icon: Calendar },
  { value: "note", label: "Note", icon: FileText },
] as const

export function ActivityDialog({ open, onOpenChange, onSuccess, contactId, dealId }: ActivityDialogProps) {
  const [type, setType] = useState<Activity["type"]>("call")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [activityDate, setActivityDate] = useState(new Date().toISOString().slice(0, 16))
  const [isSubmitting, setIsSubmitting] = useState(false)

  const resetForm = () => {
    setType("call")
    setTitle("")
    setDescription("")
    setActivityDate(new Date().toISOString().slice(0, 16))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) {
      toast.error("Please enter a title")
      return
    }

    try {
      setIsSubmitting(true)
      await createActivity({
        type,
        title: title.trim(),
        description: description.trim() || undefined,
        activity_date: new Date(activityDate).toISOString(),
        contact_id: contactId,
        deal_id: dealId,
      })

      toast.success("Activity logged successfully")
      resetForm()
      onOpenChange(false)
      onSuccess?.()
    } catch (error) {
      console.error("Failed to create activity:", error)
      toast.error("Failed to log activity. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#0A0A0A] border-white/[0.08] text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-light">Log Activity</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Activity Type */}
          <div>
            <label className="text-xs text-white/40 uppercase tracking-[0.15em] mb-3 block">
              Activity Type
            </label>
            <div className="grid grid-cols-4 gap-3">
              {activityTypes.map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setType(value)}
                  className={`p-4 rounded-lg border transition-all ${
                    type === value
                      ? "bg-primary/10 border-primary/30 text-primary"
                      : "bg-white/[0.03] border-white/[0.08] text-white/60 hover:bg-white/[0.05]"
                  }`}
                >
                  <Icon className="h-5 w-5 mx-auto mb-2" />
                  <div className="text-xs">{label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="text-xs text-white/40 uppercase tracking-[0.15em] mb-3 block">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Discovery call with customer"
              className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-primary/50 transition"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-xs text-white/40 uppercase tracking-[0.15em] mb-3 block">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add details about this activity..."
              rows={4}
              className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-primary/50 transition resize-none"
            />
          </div>

          {/* Date & Time */}
          <div>
            <label className="text-xs text-white/40 uppercase tracking-[0.15em] mb-3 block">
              Date & Time
            </label>
            <input
              type="datetime-local"
              value={activityDate}
              onChange={(e) => setActivityDate(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition"
              required
            />
          </div>

          <DialogFooter>
            <button
              type="button"
              onClick={() => {
                resetForm()
                onOpenChange(false)
              }}
              className="px-6 py-3 rounded-lg border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.05] text-white/60 hover:text-white transition-all"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <ButtonPurple type="submit" disabled={isSubmitting} className="px-6 py-3">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging...
                </>
              ) : (
                "Log Activity"
              )}
            </ButtonPurple>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
