"use client";

import { useState } from "react";
import Link from "next/link";
import { mockActivities, mockContacts, mockDeals } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Search, Phone, Mail, Calendar, FileText } from "lucide-react";

export default function ActivitiesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredActivities = mockActivities.filter(
    (activity) =>
      activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getContact = (contactId: string) =>
    mockContacts.find((c) => c.id === contactId);
  const getDeal = (dealId: string) => mockDeals.find((d) => d.id === dealId);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "call":
        return <Phone className="h-4 w-4" />;
      case "email":
        return <Mail className="h-4 w-4" />;
      case "meeting":
        return <Calendar className="h-4 w-4" />;
      case "note":
        return <FileText className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Activities</h1>
          <p className="text-muted-foreground">
            Track all your customer interactions
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Log Activity
        </Button>
      </div>

      {/* Search & Filter */}
      <div className="mb-6 flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search activities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">Filter by Type</Button>
        <Button variant="outline">Filter by Date</Button>
      </div>

      {/* Activity Timeline */}
      <div className="space-y-4">
        {filteredActivities.map((activity, index) => {
          const contact = getContact(activity.contactId);
          const deal = activity.dealId ? getDeal(activity.dealId) : null;

          return (
            <Card key={activity.id} className="p-6">
              <div className="flex items-start gap-4">
                {/* Timeline Indicator */}
                <div className="relative">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    {getActivityIcon(activity.type)}
                  </div>
                  {index < filteredActivities.length - 1 && (
                    <div className="absolute left-1/2 top-10 h-full w-0.5 -translate-x-1/2 bg-border" />
                  )}
                </div>

                {/* Activity Content */}
                <div className="flex-1">
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <div className="mb-1 flex items-center gap-2">
                        <Badge variant="outline">{activity.type}</Badge>
                        <span className="text-sm text-muted-foreground">
                          {new Date(
                            activity.activityDate
                          ).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold">
                        {activity.title}
                      </h3>
                      <p className="mt-1 text-muted-foreground">
                        {activity.description}
                      </p>
                    </div>
                  </div>

                  {/* Related Info */}
                  <div className="mt-3 flex gap-4 text-sm">
                    {contact && (
                      <Link
                        href={`/contacts/${contact.id}`}
                        className="flex items-center gap-1 text-primary hover:underline"
                      >
                        <span>Contact: {contact.name}</span>
                      </Link>
                    )}
                    {deal && (
                      <Link
                        href={`/deals/${deal.id}`}
                        className="flex items-center gap-1 text-primary hover:underline"
                      >
                        <span>Deal: {deal.title}</span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Stats */}
      <div className="mt-6 text-sm text-muted-foreground">
        Showing {filteredActivities.length} of {mockActivities.length}{" "}
        activities
      </div>
    </div>
  );
}
