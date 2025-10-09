"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, DollarSign, TrendingUp } from "lucide-react";
import { mockDeals } from "@/lib/mock-data";
import {
  KanbanProvider,
  KanbanBoard,
  KanbanHeader,
  KanbanCards,
  KanbanCard,
} from "@/components/ui/shadcn-io/kanban";

const columns = [
  { id: "lead", name: "Lead" },
  { id: "qualified", name: "Qualified" },
  { id: "demo", name: "Demo" },
  { id: "proposal", name: "Proposal" },
  { id: "negotiation", name: "Negotiation" },
  { id: "closed", name: "Closed Won" },
];

type Deal = {
  id: string;
  name: string;
  column: string;
  title: string;
  contact: { name: string; company: string };
  value: number;
  currency: string;
  probability: number;
  expectedCloseDate: string;
};

export default function DealsPage() {
  const [deals, setDeals] = useState<Deal[]>(
    mockDeals.map((deal) => ({
      id: deal.id,
      name: deal.title,
      column: deal.stage,
      title: deal.title,
      contact: deal.contact,
      value: deal.value,
      currency: deal.currency,
      probability: deal.probability,
      expectedCloseDate: deal.expectedCloseDate,
    }))
  );

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
          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Total Value</span>
              </div>
              <p className="text-2xl font-bold mt-2">
                ${totalValue.toLocaleString()}
              </p>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Active Deals</span>
              </div>
              <p className="text-2xl font-bold mt-2">{activeDeals}</p>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Won This Month</span>
              </div>
              <p className="text-2xl font-bold mt-2">
                ${wonDeals.reduce((sum, d) => sum + d.value, 0).toLocaleString()}
              </p>
            </Card>
          </div>

          {/* Kanban Board */}
          <div className="flex-1 overflow-hidden">
            <KanbanProvider
              columns={columns}
              data={deals}
              onDataChange={setDeals}
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
                        <KanbanCard key={deal.id} id={deal.id} name={deal.name}>
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
                            <div className="text-xs text-muted-foreground">
                              {deal.contact.name} • {deal.contact.company}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {new Date(deal.expectedCloseDate).toLocaleDateString()}
                            </div>
                          </div>
                        </KanbanCard>
                      )}
                    </KanbanCards>
                  </KanbanBoard>
                );
              }}
            </KanbanProvider>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
