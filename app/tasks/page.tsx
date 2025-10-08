"use client";

import { useState } from "react";
import Link from "next/link";
import { mockTasks, mockContacts, mockDeals } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Search, Calendar } from "lucide-react";

export default function TasksPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");

  const filteredTasks = mockTasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      (filter === "pending" && !task.completed) ||
      (filter === "completed" && task.completed);

    return matchesSearch && matchesFilter;
  });

  const getContact = (contactId: string) =>
    mockContacts.find((c) => c.id === contactId);
  const getDeal = (dealId: string) => mockDeals.find((d) => d.id === dealId);

  const pendingCount = mockTasks.filter((t) => !t.completed).length;
  const completedCount = mockTasks.filter((t) => t.completed).length;
  const overdueCount = mockTasks.filter(
    (t) => !t.completed && new Date(t.dueDate) < new Date()
  ).length;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tasks</h1>
          <p className="text-muted-foreground">Manage your to-do list</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Task
        </Button>
      </div>

      {/* Stats */}
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Pending Tasks</div>
          <p className="mt-1 text-2xl font-bold">{pendingCount}</p>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Completed Tasks</div>
          <p className="mt-1 text-2xl font-bold">{completedCount}</p>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-red-600">Overdue Tasks</div>
          <p className="mt-1 text-2xl font-bold text-red-600">{overdueCount}</p>
        </Card>
      </div>

      {/* Search & Filter */}
      <div className="mb-6 flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
          >
            All
          </Button>
          <Button
            variant={filter === "pending" ? "default" : "outline"}
            onClick={() => setFilter("pending")}
          >
            Pending
          </Button>
          <Button
            variant={filter === "completed" ? "default" : "outline"}
            onClick={() => setFilter("completed")}
          >
            Completed
          </Button>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        {filteredTasks.map((task) => {
          const contact = task.contactId ? getContact(task.contactId) : null;
          const deal = task.dealId ? getDeal(task.dealId) : null;
          const isOverdue =
            !task.completed && new Date(task.dueDate) < new Date();

          return (
            <Card
              key={task.id}
              className={`p-4 transition-all ${
                task.completed ? "opacity-60" : ""
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={task.completed}
                  readOnly
                  className="mt-1 h-5 w-5 cursor-pointer"
                />

                {/* Task Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3
                        className={`text-lg font-semibold ${
                          task.completed ? "line-through" : ""
                        }`}
                      >
                        {task.title}
                      </h3>
                      {task.description && (
                        <p className="mt-1 text-sm text-muted-foreground">
                          {task.description}
                        </p>
                      )}

                      {/* Related Info */}
                      <div className="mt-3 flex flex-wrap gap-3 text-sm">
                        {contact && (
                          <Link
                            href={`/contacts/${contact.id}`}
                            className="text-primary hover:underline"
                          >
                            Contact: {contact.name}
                          </Link>
                        )}
                        {deal && (
                          <Link
                            href={`/deals/${deal.id}`}
                            className="text-primary hover:underline"
                          >
                            Deal: {deal.title}
                          </Link>
                        )}
                      </div>
                    </div>

                    {/* Priority & Due Date */}
                    <div className="flex items-center gap-2">
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
                  </div>

                  {/* Due Date */}
                  <div className="mt-3 flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4" />
                    <span
                      className={isOverdue ? "font-semibold text-red-600" : ""}
                    >
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                      {isOverdue && " (Overdue)"}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Stats */}
      <div className="mt-6 text-sm text-muted-foreground">
        Showing {filteredTasks.length} of {mockTasks.length} tasks
      </div>
    </div>
  );
}
