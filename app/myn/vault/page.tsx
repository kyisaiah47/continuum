"use client"

import Link from "next/link"
import { GridBackground, SectionDivider, ButtonPurple } from "@/components/ui/plural"
import { ProductSwitcher } from "@/components/product-switcher"
import { Shield, Edit, Eye, EyeOff, Save } from "lucide-react"

export default function MynVault() {
  const dataFields = [
    { category: "Personal Information", fields: [
      { name: "Full Name", value: "Sarah Johnson", shared: true },
      { name: "Email", value: "sarah@example.com", shared: true },
      { name: "Phone", value: "+1 (555) 123-4567", shared: false },
      { name: "Date of Birth", value: "1990-05-15", shared: false },
    ]},
    { category: "Professional", fields: [
      { name: "Company", value: "TechCorp Inc", shared: true },
      { name: "Job Title", value: "Product Manager", shared: true },
      { name: "LinkedIn", value: "linkedin.com/in/sarahjohnson", shared: false },
    ]},
    { category: "Preferences", fields: [
      { name: "Industry Interest", value: "Technology, SaaS", shared: true },
      { name: "Budget Range", value: "$10K - $50K", shared: false },
      { name: "Decision Timeline", value: "3-6 months", shared: false },
    ]},
  ]

  return (
    <GridBackground showCorners className="min-h-screen">
      <header className="fixed top-0 w-full z-50 border-b border-white/[0.08] bg-background/80 backdrop-blur-xl">
        <div className="max-w-[1400px] mx-auto px-8 h-20 flex items-center justify-between">
          <ProductSwitcher />
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/myn/dashboard" className="text-sm text-white/60 hover:text-white transition tracking-wide">Dashboard</Link>
            <Link href="/myn/vault" className="text-sm text-primary transition tracking-wide">Data Vault</Link>
            <Link href="/myn/requests" className="text-sm text-white/60 hover:text-white transition tracking-wide">Requests</Link>
            <Link href="/myn/access" className="text-sm text-white/60 hover:text-white transition tracking-wide">Access</Link>
            <Link href="/myn/earnings" className="text-sm text-white/60 hover:text-white transition tracking-wide">Earnings</Link>
            <div className="h-6 w-px bg-white/[0.08]" />
            <ButtonPurple className="h-9 px-5 text-sm" asChild>
              <Link href="/myn/settings">Settings</Link>
            </ButtonPurple>
          </nav>
        </div>
      </header>

      <main className="pt-32 pb-16 px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16 flex items-end justify-between">
            <div>
              <h1 className="text-6xl font-light tracking-tight text-white mb-4">
                Data Vault
              </h1>
              <p className="text-xl text-white/50">
                View and edit your encrypted personal data
              </p>
            </div>
            <ButtonPurple className="h-12 px-6 text-base">
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </ButtonPurple>
          </div>

          <SectionDivider label="Your Data Fields" />

          <div className="mt-16 space-y-12">
            {dataFields.map((category, idx) => (
              <div key={idx}>
                <h3 className="text-2xl font-light text-white mb-6">{category.category}</h3>
                <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg divide-y divide-white/[0.05]">
                  {category.fields.map((field, i) => (
                    <div key={i} className="p-6 flex items-center gap-6 hover:bg-white/[0.02] transition-all group">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <label className="text-sm text-white/40 uppercase tracking-[0.15em]">
                            {field.name}
                          </label>
                          {field.shared && (
                            <span className="px-2 py-1 rounded bg-primary/10 border border-primary/20 text-xs text-primary uppercase tracking-[0.15em]">
                              Shared
                            </span>
                          )}
                        </div>
                        <input
                          type="text"
                          defaultValue={field.value}
                          className="w-full bg-transparent border-none text-white text-lg focus:outline-none"
                        />
                      </div>
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 rounded hover:bg-white/[0.05]">
                        <Edit className="h-4 w-4 text-white/40" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="border-t border-white/[0.08] px-8 py-8">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <p className="text-xs text-white/30">© 2025 Continuum. Built on Polkadot.</p>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
            <span className="text-xs text-white/30">Wallet Connected</span>
          </div>
        </div>
      </footer>
    </GridBackground>
  )
}
