"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
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
import {
  Mail,
  Phone,
  Building2,
  Briefcase,
  MapPin,
  Calendar,
  Edit,
  ArrowLeft,
  Loader2,
  DollarSign,
  CheckCircle2,
  Circle,
} from "lucide-react";
import { getContactById, deleteContact } from "@/lib/api/contacts";
import { getDealsByContactId } from "@/lib/api/deals";
import { getActivitiesByContactId } from "@/lib/api/activities";
import { getTasksByContactId } from "@/lib/api/tasks";
import { ContactDialog } from "@/components/contact-dialog";
import type { Contact, Deal, Activity, Task } from "@/lib/supabase-client";
import { toast } from "sonner";

export default function ContactDetailPage() {
  const params = useParams();
  const router = useRouter();
  const contactId = params?.id as string;

  const [contact, setContact] = useState<Contact | null>(null);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (contactId) {
      loadContactData();
    }
  }, [contactId]);

  const loadContactData = async () => {
    try {
      setIsLoading(true);
      const [contactData, dealsData, activitiesData, tasksData] = await Promise.all([
        getContactById(contactId),
        getDealsByContactId(contactId),
        getActivitiesByContactId(contactId),
        getTasksByContactId(contactId),
      ]);
      setContact(contactData);
      setDeals(dealsData);
      setActivities(activitiesData);
      setTasks(tasksData);
    } catch (error: any) {
      toast.error(error.message || "Failed to load contact");
      router.push("/contacts");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!contact) return;
    if (!confirm(`Are you sure you want to delete ${contact.name}?`)) return;

    try {
      await deleteContact(contact.id);
      toast.success("Contact deleted successfully");
      router.push("/contacts");
    } catch (error: any) {
      toast.error(error.message || "Failed to delete contact");
    }
  };

  if (isLoading) {
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
          <div className="flex items-center justify-center p-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  if (!contact) {
    return null;
  }

  const totalDealValue = deals.reduce((sum, deal) => sum + Number(deal.value), 0);
  const openTasks = tasks.filter((t) => !t.completed).length;

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
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/contacts")}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">Contact Details</h2>
            </div>
            <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </div>

          {/* Contact Info Card */}
          <Card className="p-6">
            <div className="flex items-start gap-6">
              <Avatar className="h-20 w-20">
                <AvatarImage src={contact.avatar_url} />
                <AvatarFallback className="text-2xl">
                  {contact.name.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-2xl font-bold">{contact.name}</h3>
                  {contact.has_wallet && (
                    <Badge variant="outline">🔗 Web3 Connected</Badge>
                  )}
                </div>
                {(contact.job_title || contact.company) && (
                  <p className="text-lg text-muted-foreground mb-4">
                    {contact.job_title}
                    {contact.job_title && contact.company && " at "}
                    {contact.company}
                  </p>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {contact.email && (
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <a
                        href={`mailto:${contact.email}`}
                        className="hover:underline"
                      >
                        {contact.email}
                      </a>
                    </div>
                  )}
                  {contact.phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <a href={`tel:${contact.phone}`} className="hover:underline">
                        {contact.phone}
                      </a>
                    </div>
                  )}
                  {contact.company && (
                    <div className="flex items-center gap-2 text-sm">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      {contact.company}
                    </div>
                  )}
                  {contact.job_title && (
                    <div className="flex items-center gap-2 text-sm">
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                      {contact.job_title}
                    </div>
                  )}
                  {contact.location && (
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      {contact.location}
                    </div>
                  )}
                  {contact.wallet_address && (
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">💳</span>
                      <code className="text-xs">{contact.wallet_address.slice(0, 20)}...</code>
                    </div>
                  )}
                </div>
                {contact.tags && contact.tags.length > 0 && (
                  <div className="flex gap-2 mt-4 flex-wrap">
                    {contact.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
                {contact.notes && (
                  <div className="mt-4 p-3 bg-muted rounded-lg">
                    <p className="text-sm">{contact.notes}</p>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Total Deal Value</span>
              </div>
              <p className="text-2xl font-bold mt-2">
                ${totalDealValue.toLocaleString()}
              </p>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Active Deals</span>
              </div>
              <p className="text-2xl font-bold mt-2">{deals.length}</p>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Open Tasks</span>
              </div>
              <p className="text-2xl font-bold mt-2">{openTasks}</p>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="deals" className="flex-1">
            <TabsList>
              <TabsTrigger value="deals">
                Deals ({deals.length})
              </TabsTrigger>
              <TabsTrigger value="activities">
                Activities ({activities.length})
              </TabsTrigger>
              <TabsTrigger value="tasks">
                Tasks ({tasks.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="deals" className="space-y-4">
              {deals.length === 0 ? (
                <Card className="p-12 text-center">
                  <p className="text-muted-foreground">No deals yet</p>
                </Card>
              ) : (
                deals.map((deal) => (
                  <Card key={deal.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold">{deal.title}</h4>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-lg font-bold text-green-600">
                            ${Number(deal.value).toLocaleString()}
                          </span>
                          <Badge variant="outline">{deal.stage}</Badge>
                          <Badge
                            variant={deal.status === "won" ? "default" : "secondary"}
                          >
                            {deal.status}
                          </Badge>
                        </div>
                        {deal.notes && (
                          <p className="text-sm text-muted-foreground mt-2">
                            {deal.notes}
                          </p>
                        )}
                      </div>
                      {deal.expected_close_date && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {new Date(deal.expected_close_date).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="activities" className="space-y-4">
              {activities.length === 0 ? (
                <Card className="p-12 text-center">
                  <p className="text-muted-foreground">No activities yet</p>
                </Card>
              ) : (
                activities.map((activity) => (
                  <Card key={activity.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{activity.type}</Badge>
                          <span className="text-sm text-muted-foreground">
                            {new Date(activity.activity_date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm mt-2">{activity.description}</p>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="tasks" className="space-y-4">
              {tasks.length === 0 ? (
                <Card className="p-12 text-center">
                  <p className="text-muted-foreground">No tasks yet</p>
                </Card>
              ) : (
                tasks.map((task) => (
                  <Card key={task.id} className="p-4">
                    <div className="flex items-start gap-3">
                      {task.completed ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                      ) : (
                        <Circle className="h-5 w-5 text-muted-foreground mt-0.5" />
                      )}
                      <div className="flex-1">
                        <h4
                          className={`font-medium ${
                            task.completed ? "line-through text-muted-foreground" : ""
                          }`}
                        >
                          {task.title}
                        </h4>
                        {task.description && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {task.description}
                          </p>
                        )}
                        {task.due_date && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                            <Calendar className="h-4 w-4" />
                            Due: {new Date(task.due_date).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                      <Badge variant={task.priority === "high" ? "destructive" : "secondary"}>
                        {task.priority}
                      </Badge>
                    </div>
                  </Card>
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>

      <ContactDialog
        contact={contact}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSuccess={loadContactData}
      />
    </SidebarProvider>
  );
}
