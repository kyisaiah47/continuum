"use client";

import { use } from "react";
import Link from "next/link";
import { getDealById, mockActivities } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Edit, MoreVertical, DollarSign, Calendar, TrendingUp, User } from "lucide-react";

export default function DealDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const deal = getDealById(id);

  if (!deal) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Deal Not Found</h2>
          <p className="mt-2 text-muted-foreground">
            The deal you're looking for doesn't exist.
          </p>
          <Button asChild className="mt-4">
            <Link href="/deals">Back to Deals</Link>
          </Button>
        </div>
      </div>
    );
  }

  const dealActivities = mockActivities.filter((a) => a.dealId === id);

  const getStageProgress = () => {
    const stages = ["lead", "qualified", "demo", "proposal", "negotiation", "closed"];
    const currentIndex = stages.indexOf(deal.stage);
    return ((currentIndex + 1) / stages.length) * 100;
  };

  return (
    <div className="p-8">
      {/* Back Button */}
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/deals">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Pipeline
        </Link>
      </Button>

      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">{deal.title}</h1>
          <div className="mt-3 flex items-center gap-3">
            <Badge
              variant={
                deal.status === "won"
                  ? "default"
                  : deal.status === "open"
                  ? "secondary"
                  : "destructive"
              }
            >
              {deal.status}
            </Badge>
            <Badge variant="outline">
              {deal.stage.charAt(0).toUpperCase() + deal.stage.slice(1)}
            </Badge>
          </div>
        </div>
        <div className="flex gap-2">
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button variant="outline" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Deal Info Cards */}
      <div className="mb-8 grid gap-6 md:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <DollarSign className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm text-muted-foreground">Deal Value</p>
              <p className="text-2xl font-bold">${deal.value.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-sm text-muted-foreground">Probability</p>
              <p className="text-2xl font-bold">{deal.probability}%</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-purple-600" />
            <div>
              <p className="text-sm text-muted-foreground">Expected Close</p>
              <p className="text-lg font-semibold">
                {new Date(deal.expectedCloseDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-orange-600" />
            <div>
              <p className="text-sm text-muted-foreground">Contact</p>
              <Link
                href={`/contacts/${deal.contactId}`}
                className="text-lg font-semibold hover:underline"
              >
                {deal.contact?.name}
              </Link>
            </div>
          </div>
        </Card>
      </div>

      {/* Deal Progress */}
      <Card className="mb-8 p-6">
        <h2 className="mb-4 text-xl font-semibold">Deal Progress</h2>
        <div className="space-y-4">
          <div>
            <div className="mb-2 flex justify-between text-sm">
              <span className="font-medium">
                Stage: {deal.stage.charAt(0).toUpperCase() + deal.stage.slice(1)}
              </span>
              <span className="text-muted-foreground">
                {Math.round(getStageProgress())}% Complete
              </span>
            </div>
            <Progress value={getStageProgress()} className="h-2" />
          </div>

          <div className="grid grid-cols-6 gap-2 pt-4">
            {["Lead", "Qualified", "Demo", "Proposal", "Negotiation", "Closed"].map(
              (stage, index) => {
                const stageId = stage.toLowerCase();
                const isCurrent = deal.stage === stageId;
                const isPast =
                  ["lead", "qualified", "demo", "proposal", "negotiation", "closed"].indexOf(
                    deal.stage
                  ) >
                  ["lead", "qualified", "demo", "proposal", "negotiation", "closed"].indexOf(
                    stageId
                  );

                return (
                  <div
                    key={stage}
                    className={`rounded-lg p-3 text-center text-sm ${
                      isCurrent
                        ? "bg-primary text-primary-foreground"
                        : isPast
                        ? "bg-green-100 text-green-900"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {stage}
                  </div>
                );
              }
            )}
          </div>
        </div>
      </Card>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Deal Details */}
        <Card className="p-6">
          <h2 className="mb-4 text-xl font-semibold">Deal Details</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Company</p>
              <p className="font-medium">{deal.contact?.company}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Contact Person</p>
              <p className="font-medium">
                {deal.contact?.name} - {deal.contact?.jobTitle}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{deal.contact?.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Currency</p>
              <p className="font-medium">{deal.currency}</p>
            </div>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6">
          <h2 className="mb-4 text-xl font-semibold">
            Recent Activity ({dealActivities.length})
          </h2>
          {dealActivities.length > 0 ? (
            <div className="space-y-4">
              {dealActivities.map((activity) => (
                <div key={activity.id} className="border-b pb-4 last:border-0">
                  <div className="mb-1 flex items-center gap-2">
                    <Badge variant="outline">{activity.type}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {new Date(activity.activityDate).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="font-medium">{activity.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {activity.description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">
              No activities yet
            </p>
          )}
        </Card>
      </div>
    </div>
  );
}
