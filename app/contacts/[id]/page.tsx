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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Phone, Briefcase, MapPin, Calendar, ArrowLeft, Wallet } from "lucide-react";
import {
  getContactById,
  getDealsByContactId,
  getActivitiesByContactId,
  getTasksByContactId
} from "@/lib/mock-data";
import Link from "next/link";
import { use } from "react";

export default function ContactDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const contact = getContactById(id);
  const deals = getDealsByContactId(id);
  const activities = getActivitiesByContactId(id);
  const tasks = getTasksByContactId(id);

  if (!contact) {
    return <div>Contact not found</div>;
  }

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
          {/* Back Button */}
          <Link href="/contacts">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Contacts
            </Button>
          </Link>

          {/* Header */}
          <Card className="p-6">
            <div className="flex items-start gap-6">
              <Avatar className="h-20 w-20">
                <AvatarImage src={contact.avatar} />
                <AvatarFallback className="text-2xl">
                  {contact.name.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold">{contact.name}</h1>
                  {contact.hasWallet && (
                    <Badge variant="outline">
                      <Wallet className="mr-1 h-3 w-3" />
                      Web3 Connected
                    </Badge>
                  )}
                </div>
                <p className="text-lg text-muted-foreground mb-4">
                  {contact.jobTitle} at {contact.company}
                </p>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <a href={`mailto:${contact.email}`} className="hover:underline">
                      {contact.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <a href={`tel:${contact.phone}`} className="hover:underline">
                      {contact.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    {contact.company}
                  </div>
                </div>
                <div className="flex gap-2">
                  {contact.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                {contact.walletAddress && (
                  <div className="mt-4 p-3 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Polkadot Wallet Address</p>
                    <code className="text-xs font-mono">{contact.walletAddress}</code>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Button>Edit</Button>
                <Button variant="outline">Delete</Button>
              </div>
            </div>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="deals" className="w-full">
            <TabsList>
              <TabsTrigger value="deals">Deals ({deals.length})</TabsTrigger>
              <TabsTrigger value="activities">Activities ({activities.length})</TabsTrigger>
              <TabsTrigger value="tasks">Tasks ({tasks.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="deals" className="space-y-4">
              {deals.map((deal) => (
                <Card key={deal.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{deal.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        ${deal.value.toLocaleString()} {deal.currency}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge>{deal.stage}</Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        {deal.probability}% probability
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
              {deals.length === 0 && (
                <Card className="p-8 text-center text-muted-foreground">
                  No deals yet
                </Card>
              )}
            </TabsContent>

            <TabsContent value="activities" className="space-y-4">
              {activities.map((activity) => (
                <Card key={activity.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-muted rounded-lg">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline">{activity.type}</Badge>
                        <h3 className="font-semibold">{activity.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {new Date(activity.activityDate).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
              {activities.length === 0 && (
                <Card className="p-8 text-center text-muted-foreground">
                  No activities yet
                </Card>
              )}
            </TabsContent>

            <TabsContent value="tasks" className="space-y-4">
              {tasks.map((task) => (
                <Card key={task.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      className="mt-1"
                      readOnly
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`font-semibold ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                          {task.title}
                        </h3>
                        <Badge variant={task.priority === 'high' ? 'destructive' : 'secondary'}>
                          {task.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{task.description}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
              {tasks.length === 0 && (
                <Card className="p-8 text-center text-muted-foreground">
                  No tasks yet
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
