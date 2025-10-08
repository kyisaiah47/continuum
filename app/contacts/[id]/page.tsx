"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  getContactById,
  getDealsByContactId,
  getActivitiesByContactId,
  getTasksByContactId,
} from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  ArrowLeft,
  Mail,
  Phone,
  Briefcase,
  Wallet,
  Edit,
  MoreVertical,
} from "lucide-react";

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
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Contact Not Found</h2>
          <p className="mt-2 text-muted-foreground">
            The contact you're looking for doesn't exist.
          </p>
          <Button asChild className="mt-4">
            <Link href="/contacts">Back to Contacts</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Back Button */}
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/contacts">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Contacts
        </Link>
      </Button>

      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div className="flex items-start gap-6">
          <Image
            src={contact.avatar}
            alt={contact.name}
            width={80}
            height={80}
            className="rounded-full"
          />
          <div>
            <h1 className="text-3xl font-bold">{contact.name}</h1>
            <p className="text-lg text-muted-foreground">
              {contact.jobTitle} at {contact.company}
            </p>
            <div className="mt-3 flex gap-2">
              {contact.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
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

      {/* Contact Info Cards */}
      <div className="mb-8 grid gap-6 md:grid-cols-3">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{contact.email}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="font-medium">{contact.phone}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <Wallet className="h-5 w-5 text-muted-foreground" />
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Wallet</p>
              {contact.hasWallet ? (
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="gap-1">
                    <Wallet className="h-3 w-3" />
                    Connected
                  </Badge>
                  <Button variant="link" size="sm" className="h-auto p-0">
                    View
                  </Button>
                </div>
              ) : (
                <Button variant="outline" size="sm" className="mt-1">
                  Request Connection
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Deals */}
      <Card className="mb-8 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Deals ({deals.length})</h2>
          <Button variant="outline" size="sm">
            <Briefcase className="mr-2 h-4 w-4" />
            New Deal
          </Button>
        </div>
        {deals.length > 0 ? (
          <div className="space-y-3">
            {deals.map((deal) => (
              <div
                key={deal.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div>
                  <p className="font-medium">{deal.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {deal.stage.charAt(0).toUpperCase() + deal.stage.slice(1)} •{" "}
                    {deal.probability}% probability
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">
                    ${deal.value.toLocaleString()}
                  </p>
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
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">No deals yet</p>
        )}
      </Card>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card className="p-6">
          <h2 className="mb-4 text-xl font-semibold">
            Recent Activity ({activities.length})
          </h2>
          {activities.length > 0 ? (
            <div className="space-y-4">
              {activities.map((activity) => (
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

        {/* Tasks */}
        <Card className="p-6">
          <h2 className="mb-4 text-xl font-semibold">Tasks ({tasks.length})</h2>
          {tasks.length > 0 ? (
            <div className="space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-start gap-3 rounded-lg border p-3"
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    readOnly
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <p
                      className={`font-medium ${
                        task.completed ? "line-through" : ""
                      }`}
                    >
                      {task.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Due: {task.dueDate}
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
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">No tasks yet</p>
          )}
        </Card>
      </div>
    </div>
  );
}
