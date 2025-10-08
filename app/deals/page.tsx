"use client";

import { useState } from "react";
import { mockDeals } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Plus, DollarSign, Calendar, TrendingUp } from "lucide-react";
import Link from "next/link";

const stages = [
  { id: "lead", name: "Lead", color: "bg-gray-100" },
  { id: "qualified", name: "Qualified", color: "bg-blue-100" },
  { id: "demo", name: "Demo", color: "bg-purple-100" },
  { id: "proposal", name: "Proposal", color: "bg-yellow-100" },
  { id: "negotiation", name: "Negotiation", color: "bg-orange-100" },
  { id: "closed", name: "Closed", color: "bg-green-100" },
];

export default function DealsPage() {
  const [deals] = useState(mockDeals);

  const getDealsByStage = (stage: string) => {
    return deals.filter((deal) => deal.stage === stage && deal.status === "open");
  };

  const getClosedDeals = () => {
    return deals.filter((deal) => deal.stage === "closed");
  };

  const getTotalValue = (stageDeals: typeof deals) => {
    return stageDeals.reduce((sum, deal) => sum + deal.value, 0);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Deals Pipeline</h1>
          <p className="text-muted-foreground">
            Manage your sales opportunities
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Deal
        </Button>
      </div>

      {/* Pipeline Stats */}
      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <Card className="p-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <DollarSign className="h-4 w-4" />
            Total Pipeline
          </div>
          <p className="mt-1 text-2xl font-bold">
            $
            {getTotalValue(deals.filter((d) => d.status === "open")).toLocaleString()}
          </p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <TrendingUp className="h-4 w-4" />
            Open Deals
          </div>
          <p className="mt-1 text-2xl font-bold">
            {deals.filter((d) => d.status === "open").length}
          </p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            Closing This Month
          </div>
          <p className="mt-1 text-2xl font-bold">
            {
              deals.filter(
                (d) =>
                  d.status === "open" &&
                  new Date(d.expectedCloseDate).getMonth() === new Date().getMonth()
              ).length
            }
          </p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <DollarSign className="h-4 w-4" />
            Won This Month
          </div>
          <p className="mt-1 text-2xl font-bold">
            ${getTotalValue(deals.filter((d) => d.status === "won")).toLocaleString()}
          </p>
        </Card>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {stages.slice(0, 5).map((stage) => {
          const stageDeals = getDealsByStage(stage.id);
          const stageValue = getTotalValue(stageDeals);

          return (
            <div
              key={stage.id}
              className="min-w-[300px] flex-shrink-0"
            >
              <div className={`mb-3 rounded-lg ${stage.color} p-3`}>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{stage.name}</h3>
                  <Badge variant="secondary">{stageDeals.length}</Badge>
                </div>
                <p className="mt-1 text-sm font-medium">
                  ${(stageValue / 1000).toFixed(0)}K
                </p>
              </div>

              <div className="space-y-3">
                {stageDeals.map((deal) => (
                  <Card key={deal.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                    <Link href={`/deals/${deal.id}`}>
                      <h4 className="font-medium mb-2">{deal.title}</h4>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          {deal.contact?.name}
                        </span>
                        <span className="font-semibold">
                          ${(deal.value / 1000).toFixed(0)}K
                        </span>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {deal.probability}% probability
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(deal.expectedCloseDate).toLocaleDateString()}
                        </span>
                      </div>
                    </Link>
                  </Card>
                ))}

                {stageDeals.length === 0 && (
                  <div className="rounded-lg border-2 border-dashed p-4 text-center text-sm text-muted-foreground">
                    No deals in this stage
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Closed Deals Column */}
        <div className="min-w-[300px] flex-shrink-0">
          <div className="mb-3 rounded-lg bg-green-100 p-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Closed Won</h3>
              <Badge variant="secondary">{getClosedDeals().length}</Badge>
            </div>
            <p className="mt-1 text-sm font-medium">
              ${(getTotalValue(getClosedDeals()) / 1000).toFixed(0)}K
            </p>
          </div>

          <div className="space-y-3">
            {getClosedDeals().map((deal) => (
              <Card key={deal.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                <Link href={`/deals/${deal.id}`}>
                  <h4 className="font-medium mb-2">{deal.title}</h4>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {deal.contact?.name}
                    </span>
                    <span className="font-semibold text-green-600">
                      ${(deal.value / 1000).toFixed(0)}K
                    </span>
                  </div>
                  <Badge variant="default" className="mt-2 bg-green-600">
                    Won
                  </Badge>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
