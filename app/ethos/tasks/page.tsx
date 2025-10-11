"use client"

import { useState } from "react"
import Link from "next/link"
import { GridBackground, SectionDivider, ButtonPurple } from "@/components/ui/plural"
import { ContinuumLogo } from "@/components/brand/continuum-logo"
import { Plus, Calendar, CheckSquare, Square, AlertCircle } from "lucide-react"
import { mockTasks, getContactById } from "@/lib/mock-data"

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

export default function TasksPage() {
  const [view, setView] = useState<"pending" | "completed">("pending")

  const pendingTasks = mockTasks.filter((t) => !t.completed)
  const completedTasks = mockTasks.filter((t) => t.completed)
  const tasks = view === "pending" ? pendingTasks : completedTasks

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
              <span className="text-[10px] text-white/40 uppercase tracking-[0.15em]">Tasks</span>
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
                Tasks
              </h1>
              <p className="text-xl text-white/50">
                Manage follow-ups and action items
              </p>
            </div>
            <ButtonPurple className="h-12 px-6 text-base">
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

          <SectionDivider label={`${tasks.length} ${view === "pending" ? "Pending" : "Completed"} Tasks`} />

          {/* Empty State */}
          {tasks.length === 0 && (
            <div className="text-center py-32">
              <CheckSquare className="h-24 w-24 mx-auto mb-8 text-white/20" />
              <h3 className="text-3xl font-light text-white mb-4">
                {view === "pending" ? "No pending tasks" : "No completed tasks"}
              </h3>
              <p className="text-lg text-white/50 mb-8">
                {view === "pending" ? "Add a new task to get started" : "Complete some tasks to see them here"}
              </p>
              {view === "pending" && (
                <ButtonPurple className="h-12 px-8 text-base">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Task
                </ButtonPurple>
              )}
            </div>
          )}

          {/* Tasks List */}
          {tasks.length > 0 && (
            <div className="mt-16 max-w-4xl mx-auto space-y-4">
              {tasks.map((task) => {
                const contact = getContactById(task.contactId)
                const isOverdue = !task.completed && new Date(task.dueDate) < new Date()

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
                        <button className="h-6 w-6 rounded border-2 border-white/[0.20] flex items-center justify-center hover:border-primary transition-colors">
                          {task.completed && (
                            <CheckSquare className="h-5 w-5 text-primary" />
                          )}
                        </button>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className={`text-xl font-light text-white mb-2 ${task.completed ? "line-through" : ""}`}>
                              {task.title}
                            </h3>
                            <p className={`text-base text-white/50 ${task.completed ? "line-through" : ""}`}>
                              {task.description}
                            </p>
                          </div>
                          <div className={`ml-4 px-3 py-1 rounded border ${priorityColors[task.priority as keyof typeof priorityColors]}`}>
                            <span className={`text-xs uppercase tracking-[0.15em] ${priorityTextColors[task.priority as keyof typeof priorityTextColors]}`}>
                              {task.priority}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-6 mt-4">
                          {contact && (
                            <div className="flex items-center gap-3">
                              <div className="h-6 w-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                                <span className="text-[10px] text-primary">
                                  {contact.name.split(" ").map((n) => n[0]).join("")}
                                </span>
                              </div>
                              <span className="text-sm text-white/50">{contact.name}</span>
                            </div>
                          )}
                          <div className="h-px flex-1 bg-white/[0.05]" />
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-white/30" />
                            <span className={`text-xs uppercase tracking-[0.15em] ${
                              isOverdue ? "text-red-400" : "text-white/30"
                            }`}>
                              {new Date(task.dueDate).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                              {isOverdue && " • OVERDUE"}
                            </span>
                          </div>
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
    </GridBackground>
  )
}
