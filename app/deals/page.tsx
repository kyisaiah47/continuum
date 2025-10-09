"use client";

import { useState, useEffect, useCallback } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, DollarSign, TrendingUp, Loader2 } from "lucide-react";
import { getDealsWithContacts, updateDealStage, getPipelineStats } from "@/lib/api/deals";
import { DealDialog } from "@/components/deal-dialog";
import {
  KanbanProvider,
  KanbanBoard,
  KanbanHeader,
  KanbanCards,
  KanbanCard,
} from "@/components/ui/shadcn-io/kanban";
import { toast } from "sonner";

const columns = [
  { id: "lead", name: "Lead" },
  { id: "qualified", name: "Qualified" },
  { id: "demo", name: "Demo" },
  { id: "proposal", name: "Proposal" },
  { id: "negotiation", name: "Negotiation" },
  { id: "closed", name: "Closed Won" },
];

type KanbanDeal = {
  id: string;
  name: string;
  column: string;
  title: string;
  contact?: { name: string; company?: string };
  value: number;
  currency: string;
  probability: number;
  expected_close_date?: string;
};

export default function DealsPage() {
  const [deals, setDeals] = useState<KanbanDeal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [stats, setStats] = useState({
    totalValue: 0,
    activeDeals: 0,
    wonValue: 0,
  });

  useEffect(() => {
    loadDeals();
    loadStats();
  }, []);

  const loadDeals = async () => {
    try {
      setIsLoading(true);
      const data = await getDealsWithContacts();
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
      }));
      setDeals(kanbanDeals);
    } catch (error: any) {
      toast.error(error.message || "Failed to load deals");
    } finally {
      setIsLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const pipelineStats = await getPipelineStats();
      setStats({
        totalValue: pipelineStats.totalValue,
        activeDeals: pipelineStats.activeDeals,
        wonValue: pipelineStats.wonValue,
      });
    } catch (error: any) {
      console.error("Failed to load stats", error);
    }
  };

  const handleDealMove = useCallback(async (updatedDeals: KanbanDeal[]) => {
    setDeals(updatedDeals);

    // Find which deal was moved by comparing with current state
    const movedDeal = updatedDeals.find((updated) => {
      const original = deals.find((d) => d.id === updated.id);
      return original && original.column !== updated.column;
    });

    if (movedDeal) {
      try {
        await updateDealStage(movedDeal.id, movedDeal.column as any);
        loadStats(); // Refresh stats after move
      } catch (error: any) {
        toast.error("Failed to update deal stage");
        loadDeals(); // Reload deals to revert the optimistic update
      }
    }
  }, [deals]);

  const totalValue = deals.filter(d => columns.map(c => c.id).includes(d.column)).reduce((sum, d) => sum + d.value, 0);
  const activeDeals = deals.filter(d => d.column !== "closed").length;
  const wonDeals = deals.filter(d => d.column === "closed");

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 lg:p-6">
          {/* Header with Add Button */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Deals Pipeline</h2>
              <p className="text-muted-foreground">Drag and drop deals to update their stage</p>
            </div>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Deal
            </Button>
          </div>

          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Total Pipeline Value</span>
              </div>
              <p className="text-2xl font-bold mt-2">
                ${stats.totalValue.toLocaleString()}
              </p>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Active Deals</span>
              </div>
              <p className="text-2xl font-bold mt-2">{stats.activeDeals}</p>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Won Value</span>
              </div>
              <p className="text-2xl font-bold mt-2">
                ${stats.wonValue.toLocaleString()}
              </p>
            </Card>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          )}

          {/* Empty State */}
          {!isLoading && deals.length === 0 && (
            <Card className="p-12 text-center">
              <h3 className="text-lg font-semibold mb-2">No deals yet</h3>
              <p className="text-muted-foreground mb-4">
                Start tracking deals in your pipeline
              </p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Deal
              </Button>
            </Card>
          )}

          {/* Kanban Board */}
          {!isLoading && deals.length > 0 && (
            <div className="flex-1 overflow-hidden">
              <KanbanProvider
                columns={columns}
                data={deals}
                onDataChange={handleDealMove}
              >
                {(column) => {
                  const columnDeals = deals.filter((d) => d.column === column.id);
                  const columnValue = columnDeals.reduce((sum, d) => sum + d.value, 0);

                  return (
                    <KanbanBoard id={column.id} key={column.id}>
                      <KanbanHeader className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold">{column.name}</div>
                          <div className="text-xs text-muted-foreground">
                            ${columnValue.toLocaleString()}
                          </div>
                        </div>
                        <Badge variant="secondary">{columnDeals.length}</Badge>
                      </KanbanHeader>
                      <KanbanCards id={column.id}>
                        {(deal) => (
                          <KanbanCard key={deal.id} id={deal.id} name={deal.name} column={deal.column}>
                            <div className="space-y-2">
                              <h4 className="font-semibold text-sm">{deal.title}</h4>
                              <div className="flex items-center justify-between">
                                <span className="text-lg font-bold text-green-600">
                                  ${deal.value.toLocaleString()}
                                </span>
                                <Badge variant="outline" className="text-xs">
                                  {deal.probability}%
                                </Badge>
                              </div>
                              {deal.contact && (
                                <div className="text-xs text-muted-foreground">
                                  {deal.contact.name}
                                  {deal.contact.company && ` • ${deal.contact.company}`}
                                </div>
                              )}
                              {deal.expected_close_date && (
                                <div className="text-xs text-muted-foreground">
                                  {new Date(deal.expected_close_date).toLocaleDateString()}
                                </div>
                              )}
                            </div>
                          </KanbanCard>
                        )}
                      </KanbanCards>
                    </KanbanBoard>
                  );
                }}
              </KanbanProvider>
            </div>
          )}
        </div>
      </SidebarInset>

      <DealDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSuccess={() => {
          loadDeals();
          loadStats();
        }}
      />
    </SidebarProvider>
  );
}
