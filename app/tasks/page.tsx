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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Calendar } from "lucide-react";
import { mockTasks, getContactById } from "@/lib/mock-data";

export default function TasksPage() {
  const pendingTasks = mockTasks.filter((t) => !t.completed);
  const completedTasks = mockTasks.filter((t) => t.completed);

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
          {/* Actions */}
          <div className="flex items-center justify-end">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Task
            </Button>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="pending" className="w-full">
            <TabsList>
              <TabsTrigger value="pending">
                Pending ({pendingTasks.length})
              </TabsTrigger>
              <TabsTrigger value="completed">
                Completed ({completedTasks.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="space-y-3 mt-4">
              {pendingTasks.map((task) => {
                const contact = getContactById(task.contactId);
                const isOverdue = new Date(task.dueDate) < new Date();

                return (
                  <Card key={task.id} className="p-4">
                    <div className="flex items-start gap-4">
                      <Checkbox className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold">{task.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {task.description}
                            </p>
                          </div>
                          <Badge
                            variant={
                              task.priority === "high"
                                ? "destructive"
                                : task.priority === "medium"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {task.priority}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-4 mt-3">
                          {contact && (
                            <span className="text-sm text-muted-foreground">
                              👤 {contact.name}
                            </span>
                          )}
                          <div className="flex items-center gap-1 text-sm">
                            <Calendar className="h-3 w-3" />
                            <span className={isOverdue ? "text-red-600 font-medium" : "text-muted-foreground"}>
                              {new Date(task.dueDate).toLocaleDateString()}
                              {isOverdue && " (Overdue)"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
              {pendingTasks.length === 0 && (
                <Card className="p-8 text-center text-muted-foreground">
                  No pending tasks
                </Card>
              )}
            </TabsContent>

            <TabsContent value="completed" className="space-y-3 mt-4">
              {completedTasks.map((task) => {
                const contact = getContactById(task.contactId);

                return (
                  <Card key={task.id} className="p-4 opacity-60">
                    <div className="flex items-start gap-4">
                      <Checkbox checked className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold line-through">{task.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1 line-through">
                              {task.description}
                            </p>
                          </div>
                          <Badge variant="secondary">{task.priority}</Badge>
                        </div>

                        <div className="flex items-center gap-4 mt-3">
                          {contact && (
                            <span className="text-sm text-muted-foreground">
                              👤 {contact.name}
                            </span>
                          )}
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
              {completedTasks.length === 0 && (
                <Card className="p-8 text-center text-muted-foreground">
                  No completed tasks
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
