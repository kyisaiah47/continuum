"use client";

import { useState, useEffect } from "react";
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
import { Search, Plus, Mail, Phone, Loader2 } from "lucide-react";
import { getContacts, searchContacts, deleteContact } from "@/lib/api/contacts";
import { ContactDialog } from "@/components/contact-dialog";
import type { Contact } from "@/lib/supabase-client";
import Link from "next/link";
import { toast } from "sonner";

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      setIsLoading(true);
      const data = await getContacts();
      setContacts(data);
    } catch (error: any) {
      toast.error(error.message || "Failed to load contacts");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      loadContacts();
      return;
    }

    try {
      const data = await searchContacts(query);
      setContacts(data);
    } catch (error: any) {
      toast.error(error.message || "Search failed");
    }
  };

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
          {/* Search & Add */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search contacts..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Contact
            </Button>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          )}

          {/* Empty State */}
          {!isLoading && contacts.length === 0 && (
            <Card className="p-12 text-center">
              <h3 className="text-lg font-semibold mb-2">No contacts yet</h3>
              <p className="text-muted-foreground mb-4">
                Get started by adding your first contact
              </p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Contact
              </Button>
            </Card>
          )}

          {/* Contacts Grid */}
          {!isLoading && contacts.length > 0 && (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {contacts.map((contact) => (
                <Link key={contact.id} href={`/contacts/${contact.id}`}>
                  <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={contact.avatar_url} />
                        <AvatarFallback>
                          {contact.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">{contact.name}</h3>
                          {contact.has_wallet && (
                            <Badge variant="outline" className="text-xs">
                              🔗 Web3
                            </Badge>
                          )}
                        </div>
                        {contact.job_title && contact.company && (
                          <p className="text-sm text-muted-foreground">
                            {contact.job_title} at {contact.company}
                          </p>
                        )}
                        <div className="flex flex-col gap-1 pt-2">
                          {contact.email && (
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Mail className="h-3 w-3" />
                              {contact.email}
                            </div>
                          )}
                          {contact.phone && (
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Phone className="h-3 w-3" />
                              {contact.phone}
                            </div>
                          )}
                        </div>
                        {contact.tags && contact.tags.length > 0 && (
                          <div className="flex gap-1 pt-2 flex-wrap">
                            {contact.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </SidebarInset>

      <ContactDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSuccess={loadContacts}
      />
    </SidebarProvider>
  );
}
