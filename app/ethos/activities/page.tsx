"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { GridBackground, SectionDivider, ButtonPurple } from "@/components/ui/plural"
import { ContinuumLogo } from "@/components/brand/continuum-logo"
import { Plus, Phone, Mail, Calendar, FileText, Activity as ActivityIcon, Loader2 } from "lucide-react"
import { getActivities, type Activity } from "@/lib/api/activities"
import { getContactById, type Contact } from "@/lib/api/contacts"
import { subscribeToActivities } from "@/lib/supabase/realtime"
import { ActivityDialog } from "@/components/dialogs/activity-dialog"

const activityIcons = {
  call: Phone,
  email: Mail,
  meeting: Calendar,
  note: FileText,
  task: FileText,
}

const activityColors = {
  call: "text-blue-400",
  email: "text-purple-400",
  meeting: "text-green-400",
  note: "text-yellow-400",
  task: "text-orange-400",
}

type ActivityWithContact = Activity & {
  contact?: Contact | null
}

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<ActivityWithContact[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    loadActivities()

    // Subscribe to real-time updates
    const subscription = subscribeToActivities((event) => {
      if (event.eventType === "INSERT" || event.eventType === "UPDATE" || event.eventType === "DELETE") {
        loadActivities()
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  async function loadActivities() {
    try {
      setIsLoading(true)
      const activitiesData = await getActivities()

      // Fetch contact info for each activity
      const activitiesWithContacts = await Promise.all(
        activitiesData.map(async (activity) => {
          if (activity.contact_id) {
            try {
              const contact = await getContactById(activity.contact_id)
              return { ...activity, contact }
            } catch (error) {
              console.error(`Failed to fetch contact ${activity.contact_id}:`, error)
              return { ...activity, contact: null }
            }
          }
          return { ...activity, contact: null }
        })
      )

      setActivities(activitiesWithContacts)
    } catch (error) {
      console.error("Failed to load activities:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const sortedActivities = [...activities].sort(
    (a, b) => new Date(b.activity_date).getTime() - new Date(a.activity_date).getTime()
  )

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
              <span className="text-[10px] text-white/40 uppercase tracking-[0.15em]">Activities</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/ethos/dashboard" className="text-sm text-white/60 hover:text-white transition tracking-wide">Dashboard</Link>
            <Link href="/ethos/contacts" className="text-sm text-white/60 hover:text-white transition tracking-wide">Contacts</Link>
            <Link href="/ethos/deals" className="text-sm text-white/60 hover:text-white transition tracking-wide">Deals</Link>
            <Link href="/ethos/activities" className="text-sm text-primary transition tracking-wide">Activities</Link>
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
                Activities
              </h1>
              <p className="text-xl text-white/50">
                Track customer interactions and engagements
              </p>
            </div>
            <ButtonPurple className="h-12 px-6 text-base" onClick={() => setIsDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Log Activity
            </ButtonPurple>
          </div>

          {/* Activity Type Filters */}
          <div className="mb-16 flex items-center gap-4">
            <span className="text-sm text-white/40 uppercase tracking-[0.15em]">Filter by type:</span>
            <div className="flex gap-2">
              {Object.entries(activityIcons).map(([type, Icon]) => (
                <button
                  key={type}
                  className="px-4 py-2 bg-white/[0.03] border border-white/[0.08] rounded-lg hover:bg-white/[0.05] transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <Icon className={`h-4 w-4 ${activityColors[type as keyof typeof activityColors]}`} />
                    <span className="text-sm text-white/60 capitalize">{type}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <SectionDivider label={isLoading ? "Loading..." : `${sortedActivities.length} Activities`} />

          {/* Loading State */}
          {isLoading && (
            <div className="mt-16 flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-3 text-white/50">Loading activities...</span>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && sortedActivities.length === 0 && (
            <div className="text-center py-32">
              <ActivityIcon className="h-24 w-24 mx-auto mb-8 text-white/20" />
              <h3 className="text-3xl font-light text-white mb-4">No activities yet</h3>
              <p className="text-lg text-white/50 mb-8">
                Start logging customer interactions
              </p>
              <ButtonPurple className="h-12 px-8 text-base" onClick={() => setIsDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Log Activity
              </ButtonPurple>
            </div>
          )}

          {/* Activity Timeline */}
          {!isLoading && sortedActivities.length > 0 && (
            <div className="mt-16 max-w-4xl mx-auto space-y-8">
              {sortedActivities.map((activity, index) => {
                const Icon = activityIcons[activity.type as keyof typeof activityIcons]
                const iconColor = activityColors[activity.type as keyof typeof activityColors]

                return (
                  <div key={activity.id} className="relative">
                    {/* Timeline connector */}
                    {index < sortedActivities.length - 1 && (
                      <div className="absolute left-6 top-16 w-px h-[calc(100%+2rem)] bg-white/[0.08]" />
                    )}

                    <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-8 hover:bg-white/[0.05] transition-all group relative overflow-hidden">
                      <div className="absolute top-0 left-0 h-px w-0 bg-primary group-hover:w-full transition-all duration-500" />

                      <div className="flex gap-6">
                        {/* Icon */}
                        <div className="flex-shrink-0">
                          <div className="h-12 w-12 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center">
                            <Icon className={`h-5 w-5 ${iconColor}`} />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-xl font-light text-white">{activity.title}</h3>
                                <span className="px-2 py-1 rounded bg-white/[0.03] border border-white/[0.08] text-xs text-white/50 uppercase tracking-[0.15em]">
                                  {activity.type}
                                </span>
                              </div>
                              {activity.description && (
                                <p className="text-base text-white/50 leading-relaxed">
                                  {activity.description}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-6">
                            {activity.contact && (
                              <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                                  <span className="text-xs text-primary">
                                    {activity.contact.name.split(" ").map((n) => n[0]).join("")}
                                  </span>
                                </div>
                                <div>
                                  <div className="text-sm text-white font-light">{activity.contact.name}</div>
                                  {activity.contact.company && (
                                    <div className="text-xs text-white/30">{activity.contact.company}</div>
                                  )}
                                </div>
                              </div>
                            )}
                            <div className="h-px flex-1 bg-white/[0.05]" />
                            <span className="text-xs text-white/30 uppercase tracking-[0.15em]">
                              {new Date(activity.activity_date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
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

      {/* Activity Dialog */}
      <ActivityDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSuccess={loadActivities}
      />
    </GridBackground>
  )
}
