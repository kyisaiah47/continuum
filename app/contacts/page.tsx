"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Plus, Mail, Phone, Briefcase } from "lucide-react";
import { mockContacts } from "@/lib/mock-data";
import Link from "next/link";

export default function ContactsPage() {
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
              <h1 className="text-3xl font-bold tracking-tight">Contacts</h1>
              <p className="text-muted-foreground">
                Manage your customer relationships
              </p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Contact
            </Button>
          </div>

          {/* Search */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search contacts..."
                className="pl-9"
              />
            </div>
          </div>

          {/* Contacts Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockContacts.map((contact) => (
              <Link key={contact.id} href={`/contacts/${contact.id}`}>
                <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={contact.avatar} />
                      <AvatarFallback>
                        {contact.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{contact.name}</h3>
                        {contact.hasWallet && (
                          <Badge variant="outline" className="text-xs">
                            🔗 Web3
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {contact.jobTitle} at {contact.company}
                      </p>
                      <div className="flex flex-col gap-1 pt-2">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          {contact.email}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Phone className="h-3 w-3" />
                          {contact.phone}
                        </div>
                      </div>
                      <div className="flex gap-1 pt-2">
                        {contact.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
