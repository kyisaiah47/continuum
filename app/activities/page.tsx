"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Phone, Mail, Calendar, FileText } from "lucide-react";
import { mockActivities, getContactById } from "@/lib/mock-data";

const activityIcons = {
  call: Phone,
  email: Mail,
  meeting: Calendar,
  note: FileText,
};

export default function ActivitiesPage() {
  const sortedActivities = [...mockActivities].sort(
    (a, b) => new Date(b.activityDate).getTime() - new Date(a.activityDate).getTime()
  );

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
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Activities</h1>
              <p className="text-muted-foreground">
                Track all customer interactions
              </p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Log Activity
            </Button>
          </div>

          {/* Timeline */}
          <div className="space-y-4 max-w-4xl">
            {sortedActivities.map((activity) => {
              const contact = getContactById(activity.contactId);
              const Icon = activityIcons[activity.type as keyof typeof activityIcons];

              return (
                <Card key={activity.id} className="p-6">
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="p-3 bg-primary/10 rounded-full">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="w-px h-full bg-border mt-2" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-lg">{activity.title}</h3>
                            <Badge variant="outline">{activity.type}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {activity.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mt-4">
                        {contact && (
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={contact.avatar} />
                              <AvatarFallback className="text-xs">
                                {contact.name.split(" ").map((n) => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">{contact.name}</span>
                          </div>
                        )}
                        <span className="text-xs text-muted-foreground">
                          {new Date(activity.activityDate).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
