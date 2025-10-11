"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { GridBackground, SectionDivider, ButtonPurple, GlassCard } from "@/components/ui/plural"
import { ContinuumLogo } from "@/components/brand/continuum-logo"
import { Search, Plus, Mail, Phone, Loader2, User, Building2 } from "lucide-react"
import { getContacts, searchContacts } from "@/lib/api/contacts"
import { ContactDialog } from "@/components/contact-dialog"
import type { Contact } from "@/lib/supabase-client"
import { toast } from "sonner"

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    loadContacts()
  }, [])

  const loadContacts = async () => {
    try {
      setIsLoading(true)
      const data = await getContacts()
      setContacts(data)
    } catch (error: any) {
      toast.error(error.message || "Failed to load contacts")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = async (query: string) => {
    setSearchQuery(query)
    if (!query.trim()) {
      loadContacts()
      return
    }

    try {
      const data = await searchContacts(query)
      setContacts(data)
    } catch (error: any) {
      toast.error(error.message || "Search failed")
    }
  }

  return (
    <GridBackground showCorners className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 border-b border-white/[0.08] bg-background/80 backdrop-blur-xl">
        <div className="max-w-[1400px] mx-auto px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-all p-2">
              <ContinuumLogo className="h-full w-full text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-semibold tracking-tight">Continuum</span>
              <span className="text-[10px] text-white/40 uppercase tracking-[0.15em]">Contacts</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/dashboard" className="text-sm text-white/60 hover:text-white transition tracking-wide">Dashboard</Link>
            <Link href="/contacts" className="text-sm text-primary transition tracking-wide">Contacts</Link>
            <Link href="/deals" className="text-sm text-white/60 hover:text-white transition tracking-wide">Deals</Link>
            <Link href="/activities" className="text-sm text-white/60 hover:text-white transition tracking-wide">Activities</Link>
            <div className="h-6 w-px bg-white/[0.08]" />
            <ButtonPurple className="h-9 px-5 text-sm" asChild>
              <Link href="/data-access">Request Data</Link>
            </ButtonPurple>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-32 pb-16 px-8">
        <div className="max-w-[1400px] mx-auto">
          {/* Page Title & Actions */}
          <div className="mb-16 flex items-end justify-between">
            <div>
              <h1 className="text-6xl font-light tracking-tight text-white mb-4">
                Contacts
              </h1>
              <p className="text-xl text-white/50">
                Manage your customer database
              </p>
            </div>
            <ButtonPurple className="h-12 px-6 text-base" onClick={() => setIsDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Contact
            </ButtonPurple>
          </div>

          {/* Search Bar */}
          <div className="mb-12">
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/30" />
              <input
                type="text"
                placeholder="Search contacts..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full h-12 pl-12 pr-4 bg-white/[0.03] border border-white/[0.08] rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>

          <SectionDivider label={`${contacts.length} Contacts`} />

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-32">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          )}

          {/* Empty State */}
          {!isLoading && contacts.length === 0 && (
            <div className="text-center py-32">
              <User className="h-24 w-24 mx-auto mb-8 text-white/20" />
              <h3 className="text-3xl font-light text-white mb-4">No contacts yet</h3>
              <p className="text-lg text-white/50 mb-8">
                Get started by adding your first contact
              </p>
              <ButtonPurple className="h-12 px-8 text-base" onClick={() => setIsDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Contact
              </ButtonPurple>
            </div>
          )}

          {/* Contacts Grid */}
          {!isLoading && contacts.length > 0 && (
            <div className="mt-16 grid md:grid-cols-3 gap-px bg-white/[0.03]">
              {contacts.map((contact) => (
                <Link
                  key={contact.id}
                  href={`/contacts/${contact.id}`}
                  className="group bg-background p-8 hover:bg-white/[0.02] transition-all relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 h-px w-0 bg-primary group-hover:w-full transition-all duration-500" />

                  <div className="flex items-start gap-4 mb-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-lg font-light text-primary">
                        {contact.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-light text-white truncate mb-1">{contact.name}</h3>
                      {contact.job_title && contact.company && (
                        <p className="text-sm text-white/40 truncate">
                          {contact.job_title} at {contact.company}
                        </p>
                      )}
                    </div>
                  </div>

                  {contact.email && (
                    <div className="flex items-center gap-2 text-sm text-white/50 mb-2">
                      <Mail className="h-4 w-4 text-white/30" />
                      <span className="truncate">{contact.email}</span>
                    </div>
                  )}

                  {contact.phone && (
                    <div className="flex items-center gap-2 text-sm text-white/50 mb-4">
                      <Phone className="h-4 w-4 text-white/30" />
                      <span>{contact.phone}</span>
                    </div>
                  )}

                  {contact.has_wallet && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mt-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span className="text-xs text-primary uppercase tracking-[0.15em]">Web3</span>
                    </div>
                  )}

                  {contact.tags && contact.tags.length > 0 && (
                    <div className="flex gap-2 mt-4 flex-wrap">
                      {contact.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 rounded bg-white/[0.03] border border-white/[0.08] text-white/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.08] px-8 py-8">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <p className="text-xs text-white/30">© 2025 Continuum. Built on Polkadot.</p>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
            <span className="text-xs text-white/30">Network Online</span>
          </div>
        </div>
      </footer>

      <ContactDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSuccess={loadContacts}
      />
    </GridBackground>
  )
}
