"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { GridBackground, SectionDivider, ButtonPurple } from "@/components/ui/plural"
import { EthosHeader } from "@/components/ethos-header"
import { Plus, Calendar, CheckSquare, Square, AlertCircle, Loader2 } from "lucide-react"
import { getTasks, toggleTaskComplete, type Task } from "@/lib/api/tasks"
import { getContactById, type Contact } from "@/lib/api/contacts"
import { subscribeToTasks } from "@/lib/supabase/realtime"
import { TaskDialog } from "@/components/dialogs/task-dialog"
import { toast } from "sonner"

const priorityColors = {
  high: "border-red-500/50 bg-red-500/10",
  medium: "border-yellow-500/50 bg-yellow-500/10",
  low: "border-blue-500/50 bg-blue-500/10",
}

const priorityTextColors = {
  high: "text-red-400",
  medium: "text-yellow-400",
  low: "text-blue-400",
}

type TaskWithContact = Task & {
  contact?: Contact | null
}

export default function TasksPage() {
  const [view, setView] = useState<"pending" | "completed">("pending")
  const [tasks, setTasks] = useState<TaskWithContact[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [togglingTaskId, setTogglingTaskId] = useState<string | null>(null)

  useEffect(() => {
    loadTasks()

    // Subscribe to real-time updates
    const subscription = subscribeToTasks((event) => {
      if (event.eventType === "INSERT" || event.eventType === "UPDATE" || event.eventType === "DELETE") {
        loadTasks()
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  async function loadTasks() {
    try {
      setIsLoading(true)
      const tasksData = await getTasks()

      // Fetch contact info for each task
      const tasksWithContacts = await Promise.all(
        tasksData.map(async (task) => {
          if (task.contact_id) {
            try {
              const contact = await getContactById(task.contact_id)
              return { ...task, contact }
            } catch (error) {
              console.error(`Failed to fetch contact ${task.contact_id}:`, error)
              return { ...task, contact: null }
            }
          }
          return { ...task, contact: null }
        })
      )

      setTasks(tasksWithContacts)
    } catch (error) {
      console.error("Failed to load tasks:", error)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleToggleComplete(taskId: string) {
    try {
      setTogglingTaskId(taskId)
      await toggleTaskComplete(taskId)
      await loadTasks()
      toast.success("Task updated")
    } catch (error) {
      console.error("Failed to toggle task:", error)
      toast.error("Failed to update task")
    } finally {
      setTogglingTaskId(null)
    }
  }

  const pendingTasks = tasks.filter((t) => !t.completed)
  const completedTasks = tasks.filter((t) => t.completed)
  const displayedTasks = view === "pending" ? pendingTasks : completedTasks

  return (
    <GridBackground showCorners className="min-h-screen">
      {/* Header */}
      <EthosHeader currentPage="tasks" />

      {/* Main Content */}
      <main className="pt-32 pb-16 px-8">
        <div className="max-w-[1400px] mx-auto">
          {/* Page Title & Actions */}
          <div className="mb-16 flex items-end justify-between">
            <div>
              <h1 className="text-6xl font-light tracking-tight text-white mb-4">
                Tasks
              </h1>
              <p className="text-xl text-white/50">
                Manage follow-ups and action items
              </p>
            </div>
            <ButtonPurple className="h-12 px-6 text-base" onClick={() => setIsDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Task
            </ButtonPurple>
          </div>

          {/* View Toggle */}
          <div className="mb-16 flex items-center gap-4">
            <span className="text-sm text-white/40 uppercase tracking-[0.15em]">View:</span>
            <div className="flex gap-2">
              <button
                onClick={() => setView("pending")}
                className={`px-6 py-3 border rounded-lg transition-all ${
                  view === "pending"
                    ? "bg-primary/10 border-primary/50 text-primary"
                    : "bg-white/[0.03] border-white/[0.08] text-white/60 hover:bg-white/[0.05]"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Square className="h-4 w-4" />
                  <span className="text-sm font-light">Pending ({pendingTasks.length})</span>
                </div>
              </button>
              <button
                onClick={() => setView("completed")}
                className={`px-6 py-3 border rounded-lg transition-all ${
                  view === "completed"
                    ? "bg-primary/10 border-primary/50 text-primary"
                    : "bg-white/[0.03] border-white/[0.08] text-white/60 hover:bg-white/[0.05]"
                }`}
              >
                <div className="flex items-center gap-2">
                  <CheckSquare className="h-4 w-4" />
                  <span className="text-sm font-light">Completed ({completedTasks.length})</span>
                </div>
              </button>
            </div>
          </div>

          <SectionDivider label={isLoading ? "Loading..." : `${displayedTasks.length} ${view === "pending" ? "Pending" : "Completed"} Tasks`} />

          {/* Loading State */}
          {isLoading && (
            <div className="mt-16 flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-3 text-white/50">Loading tasks...</span>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && displayedTasks.length === 0 && (
            <div className="text-center py-32">
              <CheckSquare className="h-24 w-24 mx-auto mb-8 text-white/20" />
              <h3 className="text-3xl font-light text-white mb-4">
                {view === "pending" ? "No pending tasks" : "No completed tasks"}
              </h3>
              <p className="text-lg text-white/50 mb-8">
                {view === "pending" ? "Add a new task to get started" : "Complete some tasks to see them here"}
              </p>
              {view === "pending" && (
                <ButtonPurple className="h-12 px-8 text-base" onClick={() => setIsDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Task
                </ButtonPurple>
              )}
            </div>
          )}

          {/* Tasks List */}
          {!isLoading && displayedTasks.length > 0 && (
            <div className="mt-16 max-w-4xl mx-auto space-y-4">
              {displayedTasks.map((task) => {
                const isOverdue = !task.completed && task.due_date && new Date(task.due_date) < new Date()
                const isToggling = togglingTaskId === task.id

                return (
                  <div
                    key={task.id}
                    className={`bg-white/[0.03] border border-white/[0.08] rounded-lg p-6 hover:bg-white/[0.05] transition-all group relative overflow-hidden ${
                      task.completed ? "opacity-50" : ""
                    }`}
                  >
                    <div className="absolute top-0 left-0 h-px w-0 bg-primary group-hover:w-full transition-all duration-500" />

                    <div className="flex gap-6">
                      {/* Checkbox */}
                      <div className="flex-shrink-0">
                        <button
                          onClick={() => handleToggleComplete(task.id)}
                          disabled={isToggling}
                          className="h-6 w-6 rounded border-2 border-white/[0.20] flex items-center justify-center hover:border-primary transition-colors disabled:opacity-50"
                        >
                          {isToggling ? (
                            <Loader2 className="h-4 w-4 animate-spin text-primary" />
                          ) : task.completed ? (
                            <CheckSquare className="h-5 w-5 text-primary" />
                          ) : null}
                        </button>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className={`text-xl font-light text-white mb-2 ${task.completed ? "line-through" : ""}`}>
                              {task.title}
                            </h3>
                            {task.description && (
                              <p className={`text-base text-white/50 ${task.completed ? "line-through" : ""}`}>
                                {task.description}
                              </p>
                            )}
                          </div>
                          <div className={`ml-4 px-3 py-1 rounded border ${priorityColors[task.priority as keyof typeof priorityColors]}`}>
                            <span className={`text-xs uppercase tracking-[0.15em] ${priorityTextColors[task.priority as keyof typeof priorityTextColors]}`}>
                              {task.priority}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-6 mt-4">
                          {task.contact && (
                            <div className="flex items-center gap-3">
                              <div className="h-6 w-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                                <span className="text-[10px] text-primary">
                                  {task.contact.name.split(" ").map((n) => n[0]).join("")}
                                </span>
                              </div>
                              <span className="text-sm text-white/50">{task.contact.name}</span>
                            </div>
                          )}
                          <div className="h-px flex-1 bg-white/[0.05]" />
                          {task.due_date && (
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-white/30" />
                              <span className={`text-xs uppercase tracking-[0.15em] ${
                                isOverdue ? "text-red-400" : "text-white/30"
                              }`}>
                                {new Date(task.due_date).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric'
                                })}
                                {isOverdue && " • OVERDUE"}
                              </span>
                            </div>
                          )}
                        </div>

                        {isOverdue && (
                          <div className="mt-4 flex items-center gap-2 px-3 py-2 rounded bg-red-500/10 border border-red-500/20">
                            <AlertCircle className="h-4 w-4 text-red-400" />
                            <span className="text-sm text-red-400">This task is overdue</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
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

      {/* Task Dialog */}
      <TaskDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSuccess={loadTasks}
      />
    </GridBackground>
  )
}
