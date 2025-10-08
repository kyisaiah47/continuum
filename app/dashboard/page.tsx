"use client";

import { Card, Metric, Text, AreaChart, BarList, DonutChart } from "@tremor/react";
import { mockDeals, mockTasks, mockActivities } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function DashboardPage() {
  // Calculate metrics
  const totalRevenue = mockDeals
    .filter((d) => d.status === "won")
    .reduce((sum, d) => sum + d.value, 0);

  const openDeals = mockDeals.filter((d) => d.status === "open").length;
  const wonDeals = mockDeals.filter((d) => d.status === "won").length;
  const lostDeals = mockDeals.filter((d) => d.status === "lost").length;

  const pipelineValue = mockDeals
    .filter((d) => d.status === "open")
    .reduce((sum, d) => sum + d.value, 0);

  // Revenue chart data (mock monthly data)
  const revenueData = [
    { month: "Jul", revenue: 45000 },
    { month: "Aug", revenue: 52000 },
    { month: "Sep", revenue: 61000 },
    { month: "Oct", revenue: 10000 },
    { month: "Nov", revenue: 0 },
    { month: "Dec", revenue: 0 },
  ];

  // Deals by stage
  const dealsByStage = [
    {
      name: "Lead",
      value: mockDeals.filter((d) => d.stage === "lead").length,
    },
    {
      name: "Qualified",
      value: mockDeals.filter((d) => d.stage === "qualified").length,
    },
    {
      name: "Demo",
      value: mockDeals.filter((d) => d.stage === "demo").length,
    },
    {
      name: "Proposal",
      value: mockDeals.filter((d) => d.stage === "proposal").length,
    },
    {
      name: "Negotiation",
      value: mockDeals.filter((d) => d.stage === "negotiation").length,
    },
  ];

  // Top deals
  const topDeals = mockDeals
    .filter((d) => d.status === "open")
    .sort((a, b) => b.value - a.value)
    .slice(0, 5)
    .map((d) => ({
      name: d.title,
      value: d.value,
    }));

  // Win/Loss donut
  const winLossData = [
    { name: "Won", value: wonDeals },
    { name: "Open", value: openDeals },
    { name: "Lost", value: lostDeals },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's your CRM overview.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Deal
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <Text>Total Revenue</Text>
          <Metric>${(totalRevenue / 1000).toFixed(0)}K</Metric>
          <Text className="text-green-600">+12.5% from last month</Text>
        </Card>

        <Card>
          <Text>Pipeline Value</Text>
          <Metric>${(pipelineValue / 1000).toFixed(0)}K</Metric>
          <Text className="text-muted-foreground">{openDeals} open deals</Text>
        </Card>

        <Card>
          <Text>Deals Closed</Text>
          <Metric>{wonDeals}</Metric>
          <Text className="text-muted-foreground">This month</Text>
        </Card>

        <Card>
          <Text>Pending Tasks</Text>
          <Metric>{mockTasks.filter((t) => !t.completed).length}</Metric>
          <Text className="text-red-600">
            {mockTasks.filter((t) => !t.completed && t.priority === "high").length}{" "}
            high priority
          </Text>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        {/* Revenue Chart */}
        <Card>
          <Text className="mb-4 font-semibold">Revenue Over Time</Text>
          <AreaChart
            className="h-72"
            data={revenueData}
            index="month"
            categories={["revenue"]}
            colors={["blue"]}
            valueFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
          />
        </Card>

        {/* Top Deals */}
        <Card>
          <Text className="mb-4 font-semibold">Top Deals by Value</Text>
          <BarList
            data={topDeals}
            valueFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
          />
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        {/* Deals by Stage */}
        <Card>
          <Text className="mb-4 font-semibold">Deals by Stage</Text>
          <BarList data={dealsByStage} />
        </Card>

        {/* Win/Loss Distribution */}
        <Card>
          <Text className="mb-4 font-semibold">Deal Status Distribution</Text>
          <DonutChart
            className="h-72"
            data={winLossData}
            category="value"
            index="name"
            colors={["green", "blue", "red"]}
          />
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <div className="mb-4 flex items-center justify-between">
          <Text className="font-semibold">Recent Activity</Text>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
        <div className="space-y-4">
          {mockActivities.slice(0, 5).map((activity) => (
            <div key={activity.id} className="flex items-start gap-4 border-b pb-4 last:border-0">
              <Badge variant="outline">{activity.type}</Badge>
              <div className="flex-1">
                <p className="font-medium">{activity.title}</p>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
              </div>
              <Text className="text-sm text-muted-foreground">
                {new Date(activity.activityDate).toLocaleDateString()}
              </Text>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
