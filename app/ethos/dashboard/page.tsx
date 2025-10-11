"use client"

import Link from "next/link"
import { GridBackground, SectionDivider, ButtonPurple, StatCard, GlassCard } from "@/components/ui/plural"
import { ProductSwitcher } from "@/components/product-switcher"
import {
  Users, Briefcase, TrendingUp, CheckSquare,
  Plus, ArrowRight, Activity, DollarSign
} from "lucide-react"

export default function DashboardPage() {
  return (
    <GridBackground showCorners className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 border-b border-white/[0.08] bg-background/80 backdrop-blur-xl">
        <div className="max-w-[1400px] mx-auto px-8 h-20 flex items-center justify-between">
          <ProductSwitcher />

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/ethos/dashboard" className="text-sm text-primary transition tracking-wide">Dashboard</Link>
            <Link href="/ethos/contacts" className="text-sm text-white/60 hover:text-white transition tracking-wide">Contacts</Link>
            <Link href="/ethos/deals" className="text-sm text-white/60 hover:text-white transition tracking-wide">Deals</Link>
            <Link href="/ethos/activities" className="text-sm text-white/60 hover:text-white transition tracking-wide">Activities</Link>
            <div className="h-6 w-px bg-white/[0.08]" />
            <ButtonPurple className="h-9 px-5 text-sm" asChild>
              <Link href="/ethos/data-access">Request Data</Link>
            </ButtonPurple>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-32 pb-16 px-8">
        <div className="max-w-[1400px] mx-auto">
          {/* Page Title */}
          <div className="mb-16">
            <h1 className="text-6xl font-light tracking-tight text-white mb-4">
              Dashboard
            </h1>
            <p className="text-xl text-white/50">
              Monitor your customer relationships and pipeline performance
            </p>
          </div>

          {/* Stats Grid */}
          <div className="glass-card rounded-none border-y border-white/[0.03] grid grid-cols-4 divide-x divide-white/[0.03] mb-16">
            <StatCard value="156" label="Total Contacts" />
            <StatCard value="$45K" label="Pipeline Value" />
            <StatCard value="23" label="Active Deals" />
            <StatCard value="12" label="Tasks Due" />
          </div>

          <SectionDivider label="Overview" />

          {/* Quick Actions */}
          <div className="mt-16 mb-24 grid md:grid-cols-4 gap-px bg-white/[0.03]">
            <Link href="/ethos/contacts" className="group bg-background p-8 hover:bg-white/[0.02] transition-all relative overflow-hidden">
              <div className="absolute top-0 left-0 h-px w-0 bg-primary group-hover:w-full transition-all duration-500" />
              <Users className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-light text-white mb-2">Contacts</h3>
              <p className="text-sm text-white/50 mb-4">Manage your customer database</p>
              <div className="flex items-center gap-2 text-sm text-white/40 group-hover:text-primary transition-colors">
                <span className="uppercase tracking-[0.15em]">View All</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </Link>

            <Link href="/ethos/deals" className="group bg-background p-8 hover:bg-white/[0.02] transition-all relative overflow-hidden">
              <div className="absolute top-0 left-0 h-px w-0 bg-primary group-hover:w-full transition-all duration-500" />
              <Briefcase className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-light text-white mb-2">Deals</h3>
              <p className="text-sm text-white/50 mb-4">Track sales pipeline</p>
              <div className="flex items-center gap-2 text-sm text-white/40 group-hover:text-primary transition-colors">
                <span className="uppercase tracking-[0.15em]">View All</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </Link>

            <Link href="/ethos/activities" className="group bg-background p-8 hover:bg-white/[0.02] transition-all relative overflow-hidden">
              <div className="absolute top-0 left-0 h-px w-0 bg-primary group-hover:w-full transition-all duration-500" />
              <Activity className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-light text-white mb-2">Activities</h3>
              <p className="text-sm text-white/50 mb-4">Log customer interactions</p>
              <div className="flex items-center gap-2 text-sm text-white/40 group-hover:text-primary transition-colors">
                <span className="uppercase tracking-[0.15em]">View All</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </Link>

            <Link href="/ethos/tasks" className="group bg-background p-8 hover:bg-white/[0.02] transition-all relative overflow-hidden">
              <div className="absolute top-0 left-0 h-px w-0 bg-primary group-hover:w-full transition-all duration-500" />
              <CheckSquare className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-light text-white mb-2">Tasks</h3>
              <p className="text-sm text-white/50 mb-4">Manage follow-ups</p>
              <div className="flex items-center gap-2 text-sm text-white/40 group-hover:text-primary transition-colors">
                <span className="uppercase tracking-[0.15em]">View All</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          </div>

          <SectionDivider label="Recent Activity" />

          {/* Recent Activity */}
          <div className="mt-16 grid md:grid-cols-2 gap-px bg-white/[0.03]">
            {/* Recent Contacts */}
            <div className="bg-background p-12">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-light text-white">Recent Contacts</h3>
                <Link href="/ethos/contacts" className="text-sm text-white/40 hover:text-primary transition uppercase tracking-[0.15em]">
                  View All
                </Link>
              </div>
              <div className="space-y-4">
                {[
                  { name: 'Sarah Johnson', company: 'Acme Corp', time: '2 hours ago' },
                  { name: 'Mike Chen', company: 'TechStart', time: '5 hours ago' },
                  { name: 'Emma Davis', company: 'InnovateCo', time: '1 day ago' },
                ].map((contact, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-white/[0.05] last:border-0">
                    <div>
                      <div className="text-base text-white mb-1">{contact.name}</div>
                      <div className="text-sm text-white/40">{contact.company}</div>
                    </div>
                    <div className="text-xs text-white/30 uppercase tracking-[0.15em]">{contact.time}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Deals */}
            <div className="bg-background p-12">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-light text-white">Recent Deals</h3>
                <Link href="/ethos/deals" className="text-sm text-white/40 hover:text-primary transition uppercase tracking-[0.15em]">
                  View All
                </Link>
              </div>
              <div className="space-y-4">
                {[
                  { title: 'Enterprise License', value: '$50,000', stage: 'Proposal' },
                  { title: 'Annual Subscription', value: '$12,000', stage: 'Negotiation' },
                  { title: 'Professional Plan', value: '$8,500', stage: 'Demo' },
                ].map((deal, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-white/[0.05] last:border-0">
                    <div>
                      <div className="text-base text-white mb-1">{deal.title}</div>
                      <div className="text-sm text-white/40">{deal.stage}</div>
                    </div>
                    <div className="text-base text-primary font-light">{deal.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <SectionDivider label="Pipeline Performance" className="mt-24" />

          {/* Pipeline Stats */}
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            <GlassCard className="p-12">
              <DollarSign className="h-10 w-10 text-primary mb-6" />
              <div className="text-5xl font-light text-white mb-2">$127K</div>
              <div className="text-sm text-white/40 uppercase tracking-[0.15em]">Total Pipeline</div>
              <div className="mt-6 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-500">+18% this month</span>
              </div>
            </GlassCard>

            <GlassCard className="p-12">
              <Briefcase className="h-10 w-10 text-primary mb-6" />
              <div className="text-5xl font-light text-white mb-2">68%</div>
              <div className="text-sm text-white/40 uppercase tracking-[0.15em]">Win Rate</div>
              <div className="mt-6 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-500">+5% from last quarter</span>
              </div>
            </GlassCard>

            <GlassCard className="p-12">
              <CheckSquare className="h-10 w-10 text-primary mb-6" />
              <div className="text-5xl font-light text-white mb-2">24</div>
              <div className="text-sm text-white/40 uppercase tracking-[0.15em]">Days Avg Close</div>
              <div className="mt-6 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-500">-3 days improvement</span>
              </div>
            </GlassCard>
          </div>
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
    </GridBackground>
  )
}
