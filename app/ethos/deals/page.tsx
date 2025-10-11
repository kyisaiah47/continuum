"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { GridBackground, SectionDivider, ButtonPurple, StatCard } from "@/components/ui/plural"
import { ContinuumLogo } from "@/components/brand/continuum-logo"
import { Plus, DollarSign, TrendingUp, Loader2, Briefcase } from "lucide-react"
import { getDealsWithContacts, updateDealStage, getPipelineStats } from "@/lib/api/deals"
import { DealDialog } from "@/components/deal-dialog"
import {
  KanbanProvider,
  KanbanBoard,
  KanbanHeader,
  KanbanCards,
  KanbanCard,
} from "@/components/ui/shadcn-io/kanban"
import { toast } from "sonner"

const columns = [
  { id: "lead", name: "Lead" },
  { id: "qualified", name: "Qualified" },
  { id: "demo", name: "Demo" },
  { id: "proposal", name: "Proposal" },
  { id: "negotiation", name: "Negotiation" },
  { id: "closed", name: "Closed Won" },
]

type KanbanDeal = {
  id: string
  name: string
  column: string
  title: string
  contact?: { name: string; company?: string }
  value: number
  currency: string
  probability: number
  expected_close_date?: string
}

export default function DealsPage() {
  const [deals, setDeals] = useState<KanbanDeal[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [stats, setStats] = useState({
    totalValue: 0,
    activeDeals: 0,
    wonValue: 0,
  })

  useEffect(() => {
    loadDeals()
    loadStats()
  }, [])

  const loadDeals = async () => {
    try {
      setIsLoading(true)
      const data = await getDealsWithContacts()
      const kanbanDeals: KanbanDeal[] = data.map((deal: any) => ({
        id: deal.id,
        name: deal.title,
        column: deal.stage,
        title: deal.title,
        contact: deal.contact ? {
          name: deal.contact.name,
          company: deal.contact.company,
        } : undefined,
        value: Number(deal.value),
        currency: deal.currency,
        probability: deal.probability,
        expected_close_date: deal.expected_close_date,
      }))
      setDeals(kanbanDeals)
    } catch (error: any) {
      toast.error(error.message || "Failed to load deals")
    } finally {
      setIsLoading(false)
    }
  }

  const loadStats = async () => {
    try {
      const pipelineStats = await getPipelineStats()
      setStats({
        totalValue: pipelineStats.totalValue,
        activeDeals: pipelineStats.activeDeals,
        wonValue: pipelineStats.wonValue,
      })
    } catch (error: any) {
      console.error("Failed to load stats", error)
    }
  }

  const handleDealMove = useCallback(async (updatedDeals: KanbanDeal[]) => {
    setDeals(updatedDeals)

    // Find which deal was moved by comparing with current state
    const movedDeal = updatedDeals.find((updated) => {
      const original = deals.find((d) => d.id === updated.id)
      return original && original.column !== updated.column
    })

    if (movedDeal) {
      try {
        await updateDealStage(movedDeal.id, movedDeal.column as any)
        loadStats() // Refresh stats after move
      } catch (error: any) {
        toast.error("Failed to update deal stage")
        loadDeals() // Reload deals to revert the optimistic update
      }
    }
  }, [deals])

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
              <span className="text-[10px] text-white/40 uppercase tracking-[0.15em]">Deals</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/ethos/dashboard" className="text-sm text-white/60 hover:text-white transition tracking-wide">Dashboard</Link>
            <Link href="/ethos/contacts" className="text-sm text-white/60 hover:text-white transition tracking-wide">Contacts</Link>
            <Link href="/ethos/deals" className="text-sm text-primary transition tracking-wide">Deals</Link>
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
                Pipeline
              </h1>
              <p className="text-xl text-white/50">
                Drag and drop to update deal stages
              </p>
            </div>
            <ButtonPurple className="h-12 px-6 text-base" onClick={() => setIsDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Deal
            </ButtonPurple>
          </div>

          {/* Stats Grid */}
          <div className="glass-card rounded-none border-y border-white/[0.03] grid grid-cols-3 divide-x divide-white/[0.03] mb-16">
            <StatCard value={`$${stats.totalValue.toLocaleString()}`} label="Total Pipeline" />
            <StatCard value={stats.activeDeals.toString()} label="Active Deals" />
            <StatCard value={`$${stats.wonValue.toLocaleString()}`} label="Won Value" />
          </div>

          <SectionDivider label="Pipeline Stages" />

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-32">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          )}

          {/* Empty State */}
          {!isLoading && deals.length === 0 && (
            <div className="text-center py-32">
              <Briefcase className="h-24 w-24 mx-auto mb-8 text-white/20" />
              <h3 className="text-3xl font-light text-white mb-4">No deals yet</h3>
              <p className="text-lg text-white/50 mb-8">
                Start tracking deals in your pipeline
              </p>
              <ButtonPurple className="h-12 px-8 text-base" onClick={() => setIsDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Deal
              </ButtonPurple>
            </div>
          )}

          {/* Kanban Board */}
          {!isLoading && deals.length > 0 && (
            <div className="mt-16">
              <KanbanProvider
                columns={columns}
                data={deals}
                onDataChange={handleDealMove}
              >
                {(column) => {
                  const columnDeals = deals.filter((d) => d.column === column.id)
                  const columnValue = columnDeals.reduce((sum, d) => sum + d.value, 0)

                  return (
                    <KanbanBoard id={column.id} key={column.id}>
                      <KanbanHeader className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-4 mb-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-base font-light text-white uppercase tracking-[0.15em]">
                              {column.name}
                            </div>
                            <div className="text-sm text-white/40 mt-1">
                              ${columnValue.toLocaleString()}
                            </div>
                          </div>
                          <div className="h-8 w-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                            <span className="text-sm text-primary">{columnDeals.length}</span>
                          </div>
                        </div>
                      </KanbanHeader>
                      <KanbanCards id={column.id}>
                        {(deal) => (
                          <KanbanCard key={deal.id} id={deal.id} name={deal.name} column={deal.column}>
                            <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-6 hover:bg-white/[0.05] transition-all cursor-grab active:cursor-grabbing group">
                              <div className="absolute top-0 left-0 h-px w-0 bg-primary group-hover:w-full transition-all duration-500" />

                              <h4 className="text-lg font-light text-white mb-4">{deal.title}</h4>

                              <div className="flex items-baseline justify-between mb-4">
                                <span className="text-2xl font-light text-primary">
                                  ${deal.value.toLocaleString()}
                                </span>
                                <div className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.08]">
                                  <span className="text-xs text-white/50">{deal.probability}%</span>
                                </div>
                              </div>

                              {deal.contact && (
                                <div className="text-sm text-white/50 mb-2">
                                  {deal.contact.name}
                                  {deal.contact.company && (
                                    <span className="text-white/30"> • {deal.contact.company}</span>
                                  )}
                                </div>
                              )}

                              {deal.expected_close_date && (
                                <div className="text-xs text-white/30 uppercase tracking-[0.15em]">
                                  Close: {new Date(deal.expected_close_date).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                  })}
                                </div>
                              )}
                            </div>
                          </KanbanCard>
                        )}
                      </KanbanCards>
                    </KanbanBoard>
                  )
                }}
              </KanbanProvider>
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

      <DealDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSuccess={() => {
          loadDeals()
          loadStats()
        }}
      />
    </GridBackground>
  )
}
