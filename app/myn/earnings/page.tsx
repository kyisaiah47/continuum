"use client"

import Link from "next/link"
import { GridBackground, SectionDivider, ButtonPurple, StatCard } from "@/components/ui/plural"
import { ProductSwitcher } from "@/components/product-switcher"
import { DollarSign, TrendingUp, Wallet, ArrowUpRight } from "lucide-react"

export default function MynEarnings() {
  const transactions = [
    { id: 1, type: "Payment Received", company: "GlobalTech", amount: "+5 DOT", date: "Jan 15, 2025", status: "completed" },
    { id: 2, type: "Payment Received", company: "DataCorp", amount: "+4 DOT", date: "Jan 10, 2025", status: "completed" },
    { id: 3, type: "Payment Received", company: "SalesHub", amount: "+8 DOT", date: "Jan 20, 2025", status: "completed" },
    { id: 4, type: "Payment Pending", company: "TechStart", amount: "+8 DOT", date: "Pending approval", status: "pending" },
    { id: 5, type: "Payment Received", company: "InnovateCo", amount: "+3 DOT", date: "Dec 28, 2024", status: "completed" },
  ]

  const totalEarned = transactions.filter(t => t.status === "completed").reduce((sum, t) => sum + parseFloat(t.amount.replace("+", "").replace(" DOT", "")), 0)
  const pendingEarnings = transactions.filter(t => t.status === "pending").reduce((sum, t) => sum + parseFloat(t.amount.replace("+", "").replace(" DOT", "")), 0)

  return (
    <GridBackground showCorners className="min-h-screen">
      <header className="fixed top-0 w-full z-50 border-b border-white/[0.08] bg-background/80 backdrop-blur-xl">
        <div className="max-w-[1400px] mx-auto px-8 h-20 flex items-center justify-between">
          <ProductSwitcher />
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/myn/dashboard" className="text-sm text-white/60 hover:text-white transition tracking-wide">Dashboard</Link>
            <Link href="/myn/vault" className="text-sm text-white/60 hover:text-white transition tracking-wide">Data Vault</Link>
            <Link href="/myn/requests" className="text-sm text-white/60 hover:text-white transition tracking-wide">Requests</Link>
            <Link href="/myn/access" className="text-sm text-white/60 hover:text-white transition tracking-wide">Access</Link>
            <Link href="/myn/earnings" className="text-sm text-primary transition tracking-wide">Earnings</Link>
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
                Earnings
              </h1>
              <p className="text-xl text-white/50">
                Track your DOT earnings from data access grants
              </p>
            </div>
            <ButtonPurple className="h-12 px-6 text-base">
              <Wallet className="mr-2 h-4 w-4" />
              Withdraw to Wallet
            </ButtonPurple>
          </div>

          {/* Stats Grid */}
          <div className="glass-card rounded-none border-y border-white/[0.03] grid grid-cols-3 divide-x divide-white/[0.03] mb-16">
            <StatCard value={`${totalEarned} DOT`} label="Total Earned" />
            <StatCard value={`${pendingEarnings} DOT`} label="Pending Earnings" />
            <StatCard value={`${transactions.filter(t => t.status === "completed").length}`} label="Total Payments" />
          </div>

          {/* Earning Trend */}
          <div className="mb-16 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-light text-white mb-2">Earning More Each Month</h3>
                <p className="text-base text-white/60 leading-relaxed">
                  Your earnings have increased by 45% compared to last month. Keep approving quality access requests to maximize your income.
                </p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-light text-primary">+45%</div>
                <div className="text-sm text-white/40">vs last month</div>
              </div>
            </div>
          </div>

          <SectionDivider label="Transaction History" />

          {/* Transaction List */}
          <div className="mt-16 bg-white/[0.03] border border-white/[0.08] rounded-lg divide-y divide-white/[0.05]">
            {transactions.map((tx) => (
              <div key={tx.id} className="p-6 hover:bg-white/[0.02] transition-all flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                    tx.status === "completed"
                      ? "bg-green-500/10 border border-green-500/20"
                      : "bg-yellow-500/10 border border-yellow-500/20"
                  }`}>
                    {tx.status === "completed" ? (
                      <DollarSign className="h-6 w-6 text-green-400" />
                    ) : (
                      <DollarSign className="h-6 w-6 text-yellow-400" />
                    )}
                  </div>
                  <div>
                    <div className="text-base text-white mb-1">{tx.type}</div>
                    <div className="text-sm text-white/40">{tx.company}</div>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <div className="text-sm text-white/40 mb-1">{tx.date}</div>
                    <div className={`px-2 py-1 rounded text-xs uppercase tracking-[0.15em] ${
                      tx.status === "completed"
                        ? "bg-green-500/10 border border-green-500/20 text-green-400"
                        : "bg-yellow-500/10 border border-yellow-500/20 text-yellow-400"
                    }`}>
                      {tx.status}
                    </div>
                  </div>
                  <div className="text-2xl font-light text-primary min-w-[120px] text-right">
                    {tx.amount}
                  </div>
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
