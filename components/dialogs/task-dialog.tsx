"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { ButtonPurple } from "@/components/ui/plural"
import { Loader2 } from "lucide-react"
import { createTask } from "@/lib/api/tasks"
import { type Task } from "@/lib/supabase-client"
import { toast } from "sonner"

type TaskDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
  contactId?: string
  dealId?: string
}

export function TaskDialog({ open, onOpenChange, onSuccess, contactId, dealId }: TaskDialogProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState<Task["priority"]>("medium")
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const resetForm = () => {
    setTitle("")
    setDescription("")
    setPriority("medium")
    setDueDate(new Date().toISOString().split('T')[0])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) {
      toast.error("Please enter a task title")
      return
    }

    try {
      setIsSubmitting(true)
      await createTask({
        title: title.trim(),
        description: description.trim() || undefined,
        priority,
        due_date: dueDate,
        completed: false,
        contact_id: contactId,
        deal_id: dealId,
      })

      toast.success("Task created successfully")
      resetForm()
      onOpenChange(false)
      onSuccess?.()
    } catch (error) {
      console.error("Failed to create task:", error)
      toast.error("Failed to create task. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#0A0A0A] border-white/[0.08] text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-light">Add Task</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Title */}
          <div>
            <label className="text-xs text-white/40 uppercase tracking-[0.15em] mb-3 block">
              Task Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Follow up with customer"
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
              placeholder="Add details about this task..."
              rows={4}
              className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-primary/50 transition resize-none"
            />
          </div>

          {/* Priority */}
          <div>
            <label className="text-xs text-white/40 uppercase tracking-[0.15em] mb-3 block">
              Priority
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(["low", "medium", "high"] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`p-4 rounded-lg border transition-all capitalize ${
                    priority === p
                      ? p === "high"
                        ? "bg-red-500/10 border-red-500/30 text-red-400"
                        : p === "medium"
                        ? "bg-yellow-500/10 border-yellow-500/30 text-yellow-400"
                        : "bg-blue-500/10 border-blue-500/30 text-blue-400"
                      : "bg-white/[0.03] border-white/[0.08] text-white/60 hover:bg-white/[0.05]"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label className="text-xs text-white/40 uppercase tracking-[0.15em] mb-3 block">
              Due Date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
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
                  Creating...
                </>
              ) : (
                "Create Task"
              )}
            </ButtonPurple>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
