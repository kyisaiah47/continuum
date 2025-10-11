"use client"

import Link from "next/link"
import { GridBackground, SectionDivider, ButtonPurple } from "@/components/ui/plural"
import { ProductSwitcher } from "@/components/product-switcher"
import { Lock, Shield, AlertCircle, XCircle } from "lucide-react"

export default function MynAccess() {
  const activeGrants = [
    { id: 1, company: "GlobalTech", logo: "GT", fields: ["Full Name", "Email", "Phone", "Company"], grantedDate: "Jan 15, 2025", expiresDate: "Feb 15, 2025", daysLeft: 15, amount: "5 DOT" },
    { id: 2, company: "DataCorp", logo: "DC", fields: ["Email", "Company", "Job Title"], grantedDate: "Jan 10, 2025", expiresDate: "Feb 25, 2025", daysLeft: 25, amount: "4 DOT" },
    { id: 3, company: "SalesHub", logo: "SH", fields: ["Full Name", "Email", "Phone", "LinkedIn", "Industry Interest", "Budget Range"], grantedDate: "Jan 20, 2025", expiresDate: "Feb 5, 2025", daysLeft: 5, amount: "8 DOT" },
  ]

  return (
    <GridBackground showCorners className="min-h-screen">
      <header className="fixed top-0 w-full z-50 border-b border-white/[0.08] bg-background/80 backdrop-blur-xl">
        <div className="max-w-[1400px] mx-auto px-8 h-20 flex items-center justify-between">
          <ProductSwitcher />
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/myn/dashboard" className="text-sm text-white/60 hover:text-white transition tracking-wide">Dashboard</Link>
            <Link href="/myn/vault" className="text-sm text-white/60 hover:text-white transition tracking-wide">Data Vault</Link>
            <Link href="/myn/requests" className="text-sm text-white/60 hover:text-white transition tracking-wide">Requests</Link>
            <Link href="/myn/access" className="text-sm text-primary transition tracking-wide">Access</Link>
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
          <div className="mb-16">
            <h1 className="text-6xl font-light tracking-tight text-white mb-4">
              Active Access
            </h1>
            <p className="text-xl text-white/50">
              Manage companies with active access to your data
            </p>
          </div>

          <SectionDivider label={`${activeGrants.length} Active Grants`} />

          <div className="mt-16 space-y-6">
            {activeGrants.map((grant) => {
              const isExpiringSoon = grant.daysLeft <= 7

              return (
                <div
                  key={grant.id}
                  className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-8 hover:bg-white/[0.05] transition-all"
                >
                  <div className="flex gap-8">
                    <div className="flex-shrink-0">
                      <div className="h-16 w-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <span className="text-lg font-light text-primary">{grant.logo}</span>
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-light text-white mb-2">{grant.company}</h3>
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                            <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                            <span className="text-xs text-green-400 uppercase tracking-[0.15em]">Active</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-3xl font-light mb-1 ${isExpiringSoon ? 'text-yellow-400' : 'text-white'}`}>
                            {grant.daysLeft} days
                          </div>
                          <div className="text-sm text-white/40">remaining</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6 mb-6">
                        <div>
                          <p className="text-xs text-white/40 uppercase tracking-[0.15em] mb-2">Granted</p>
                          <p className="text-base text-white/60">{grant.grantedDate}</p>
                        </div>
                        <div>
                          <p className="text-xs text-white/40 uppercase tracking-[0.15em] mb-2">Expires</p>
                          <p className="text-base text-white/60">{grant.expiresDate}</p>
                        </div>
                      </div>

                      <div className="mb-6">
                        <p className="text-xs text-white/40 uppercase tracking-[0.15em] mb-3">Access to Fields</p>
                        <div className="flex flex-wrap gap-2">
                          {grant.fields.map((field, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 rounded bg-white/[0.03] border border-white/[0.08] text-sm text-white/60"
                            >
                              {field}
                            </span>
                          ))}
                        </div>
                      </div>

                      {isExpiringSoon && (
                        <div className="mb-4 flex items-center gap-2 px-3 py-2 rounded bg-yellow-500/10 border border-yellow-500/20">
                          <AlertCircle className="h-4 w-4 text-yellow-400" />
                          <span className="text-sm text-yellow-400">Expiring soon</span>
                        </div>
                      )}

                      <button className="h-10 px-6 text-sm rounded-lg border border-red-500/50 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all flex items-center gap-2">
                        <XCircle className="h-4 w-4" />
                        Revoke Access
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
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
