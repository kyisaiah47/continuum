"use client"

import Link from "next/link"
import { GridBackground, SectionDivider, ButtonPurple, StatCard } from "@/components/ui/plural"
import { ProductSwitcher } from "@/components/product-switcher"
import { EthosLogo } from "@/components/brand/ethos-logo"
import {
  ArrowRight, ArrowLeft, Shield, Users, Check, TrendingUp,
  Building2, BarChart, Lock, FileCheck, Zap, Target,
  Mail, MessageSquare, UserCheck, Award, Briefcase, Globe
} from "lucide-react"

export default function EthosPage() {
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
              <span className="text-[10px] text-white/40 uppercase tracking-[0.15em]">The Trust Layer</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/myn" className="text-sm text-white/60 hover:text-white transition tracking-wide">Myn</Link>
            <Link href="/ethos" className="text-sm text-primary transition tracking-wide">Ethos</Link>
            <Link href="/protocol" className="text-sm text-white/60 hover:text-white transition tracking-wide">Protocol</Link>
            <div className="h-6 w-px bg-white/[0.08]" />
            <Link href="/login" className="text-sm text-white/60 hover:text-white transition tracking-wide">Login</Link>
            <ButtonPurple className="h-9 px-5 text-sm" asChild>
              <Link href="/ethos/dashboard">Access Platform</Link>
            </ButtonPurple>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-40 pb-32 px-8">
        <div className="max-w-[1400px] mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/60 transition mb-12">
            <ArrowLeft className="h-4 w-4" />
            <span className="uppercase tracking-[0.15em]">Back to Ecosystem</span>
          </Link>

          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center justify-center h-20 w-20 rounded-2xl bg-primary p-4">
                  <EthosLogo className="h-full w-full text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-7xl font-light tracking-tight text-white">Ethos</h1>
                  <p className="text-lg text-white/40 italic mt-1">The ethical CRM.</p>
                </div>
              </div>

              <p className="text-2xl font-light text-white/60 leading-relaxed mb-12">
                The enterprise platform that transforms customer relationships from extraction to exchange.
                Access verified data through transparent consent—turning compliance into your competitive advantage.
              </p>

              <div className="flex items-center gap-4">
                <ButtonPurple className="h-14 px-8 text-lg" asChild>
                  <Link href="/ethos/dashboard">
                    <Shield className="mr-2 h-5 w-5" />
                    Access Platform
                  </Link>
                </ButtonPurple>
                <Link
                  href="#features"
                  className="h-14 px-8 inline-flex items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-lg font-medium text-white/80 hover:bg-white/[0.05] hover:text-white transition-all"
                >
                  Learn More
                </Link>
              </div>
            </div>

            <div className="glass-card p-12 rounded-2xl">
              <div className="aspect-square bg-primary/5 rounded-xl flex items-center justify-center border border-white/[0.05]">
                <div className="text-center text-white/40">
                  <Building2 className="h-32 w-32 mx-auto mb-4" />
                  <p className="text-sm uppercase tracking-[0.15em]">Ethos Dashboard</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-8 pb-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="glass-card rounded-none border-y border-white/[0.03] grid grid-cols-4 divide-x divide-white/[0.03]">
            <StatCard value="100%" label="Verified consent" />
            <StatCard value="3x" label="Better data quality" />
            <StatCard value="GDPR" label="Compliant by design" />
            <StatCard value="∞" label="Cryptographic proofs" />
          </div>
        </div>
      </section>

      {/* Core Value Props */}
      <section id="features" className="px-8 py-32 bg-white/[0.01]">
        <div className="max-w-[1400px] mx-auto">
          <SectionDivider label="Why Ethos" />

          <div className="mt-24 mb-16 text-center max-w-[900px] mx-auto">
            <h2 className="text-6xl font-light tracking-tight text-white mb-6">
              The CRM built for
              <br />
              <span className="text-white/40">a trust-first world</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-white/[0.03]">
            <div className="bg-background p-12">
              <div className="h-14 w-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-8">
                <FileCheck className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-2xl font-light text-white mb-4">Verified Consent</h3>
              <p className="text-base text-white/50 leading-relaxed mb-6">
                Every data point comes with cryptographic proof that the customer approved it.
                No more guessing if you have permission—you have mathematical certainty.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-white/40">
                  <Check className="h-4 w-4 text-primary" />
                  <span>On-chain consent records</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-white/40">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Immutable audit trail</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-white/40">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Real-time revocation alerts</span>
                </li>
              </ul>
            </div>

            <div className="bg-background p-12">
              <div className="h-14 w-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-8">
                <BarChart className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-2xl font-light text-white mb-4">Better Data Quality</h3>
              <p className="text-base text-white/50 leading-relaxed mb-6">
                When people choose to share, they give accurate information. No bots.
                No fake profiles. Just real customers who want to engage with your brand.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-white/40">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Human-verified profiles</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-white/40">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Self-reported accuracy</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-white/40">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Up-to-date information</span>
                </li>
              </ul>
            </div>

            <div className="bg-background p-12">
              <div className="h-14 w-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-8">
                <TrendingUp className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-2xl font-light text-white mb-4">Trust-Based Marketing</h3>
              <p className="text-base text-white/50 leading-relaxed mb-6">
                Build lasting customer relationships through transparency, not surveillance.
                When customers trust you with their data, they trust you with their business.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-white/40">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Transparent data usage</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-white/40">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Fair value exchange</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-white/40">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Increased brand loyalty</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-8 py-32">
        <div className="max-w-[1100px] mx-auto">
          <SectionDivider label="How It Works" />

          <div className="mt-24 space-y-px bg-white/[0.03]">
            <div className="bg-background p-16 flex gap-12 items-start">
              <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full border border-white/[0.08] text-white/40 font-light text-2xl">
                1
              </div>
              <div>
                <h3 className="text-3xl font-light text-white mb-4">Create Your Campaign</h3>
                <p className="text-lg text-white/50 leading-relaxed">
                  Define your target audience, the data fields you need, and how long you need access.
                  Set a fair price in DOT tokens based on the value exchange.
                </p>
              </div>
            </div>

            <div className="bg-background p-16 flex gap-12 items-start">
              <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full border border-white/[0.08] text-white/40 font-light text-2xl">
                2
              </div>
              <div>
                <h3 className="text-3xl font-light text-white mb-4">Send Requests</h3>
                <p className="text-lg text-white/50 leading-relaxed">
                  Ethos connects to Myn users who match your criteria. They receive a notification
                  showing exactly what you want, why you need it, and what you're offering.
                </p>
              </div>
            </div>

            <div className="bg-background p-16 flex gap-12 items-start">
              <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full border border-white/[0.08] text-white/40 font-light text-2xl">
                3
              </div>
              <div>
                <h3 className="text-3xl font-light text-white mb-4">Receive Consented Data</h3>
                <p className="text-lg text-white/50 leading-relaxed">
                  When users approve, their data flows into your CRM with cryptographic proof of consent
                  recorded on Polkadot. The smart contract handles payment automatically.
                </p>
              </div>
            </div>

            <div className="bg-background p-16 flex gap-12 items-start">
              <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full border border-white/[0.08] text-white/40 font-light text-2xl">
                4
              </div>
              <div>
                <h3 className="text-3xl font-light text-white mb-4">Build Relationships</h3>
                <p className="text-lg text-white/50 leading-relaxed">
                  Use verified, high-quality data to personalize outreach and build genuine connections.
                  If access expires or gets revoked, you're notified instantly—staying compliant by design.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="px-8 py-32 bg-white/[0.01]">
        <div className="max-w-[1400px] mx-auto">
          <SectionDivider label="Platform Features" />

          <div className="mt-24 mb-16 text-center max-w-[800px] mx-auto">
            <h2 className="text-6xl font-light tracking-tight text-white mb-6">
              Everything you need to
              <br />
              <span className="text-white/40">run ethical marketing</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-white/[0.03]">
            <div className="bg-background p-12">
              <Users className="h-10 w-10 text-primary mb-6" />
              <h3 className="text-2xl font-light text-white mb-4">Contact Management</h3>
              <p className="text-base text-white/50 leading-relaxed">
                Full CRM capabilities with consent tracking built-in. See exactly what data you have
                permission to use for each contact, with expiration dates and revocation alerts.
              </p>
            </div>

            <div className="bg-background p-12">
              <Target className="h-10 w-10 text-primary mb-6" />
              <h3 className="text-2xl font-light text-white mb-4">Pipeline & Deals</h3>
              <p className="text-base text-white/50 leading-relaxed">
                Kanban-style deal pipeline with drag-and-drop stages. Track revenue, assign owners,
                and manage your sales process with full visibility into consent status.
              </p>
            </div>

            <div className="bg-background p-12">
              <MessageSquare className="h-10 w-10 text-primary mb-6" />
              <h3 className="text-2xl font-light text-white mb-4">Activities & Tasks</h3>
              <p className="text-base text-white/50 leading-relaxed">
                Log calls, emails, meetings, and notes. Set follow-up tasks and reminders.
                Everything synced with consent records to ensure compliant outreach.
              </p>
            </div>

            <div className="bg-background p-12">
              <Lock className="h-10 w-10 text-primary mb-6" />
              <h3 className="text-2xl font-light text-white mb-4">Data Access Requests</h3>
              <p className="text-base text-white/50 leading-relaxed">
                Create and manage data access campaigns. Define fields, duration, and compensation.
                Track approval rates and optimize your value proposition.
              </p>
            </div>

            <div className="bg-background p-12">
              <BarChart className="h-10 w-10 text-primary mb-6" />
              <h3 className="text-2xl font-light text-white mb-4">Analytics & Reporting</h3>
              <p className="text-base text-white/50 leading-relaxed">
                Real-time dashboards showing pipeline value, consent rates, and customer engagement.
                Export reports with cryptographic proof of compliance.
              </p>
            </div>

            <div className="bg-background p-12">
              <Zap className="h-10 w-10 text-primary mb-6" />
              <h3 className="text-2xl font-light text-white mb-4">Smart Integrations</h3>
              <p className="text-base text-white/50 leading-relaxed">
                Connect your existing tools via API. Webhook notifications for consent changes.
                Polkadot blockchain integration for automatic payment and verification.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="px-8 py-32">
        <div className="max-w-[1400px] mx-auto">
          <SectionDivider label="Use Cases" />

          <div className="mt-24 mb-16 text-center max-w-[800px] mx-auto">
            <h2 className="text-6xl font-light tracking-tight text-white mb-6">
              Who uses Ethos?
            </h2>
            <p className="text-xl text-white/50">
              Forward-thinking organizations building trust-first customer relationships
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-white/[0.03]">
            <div className="bg-background p-12">
              <Mail className="h-12 w-12 text-primary mb-6" />
              <h3 className="text-3xl font-light text-white mb-4">Marketing Teams</h3>
              <p className="text-lg text-white/50 leading-relaxed">
                Run campaigns with verified consent. Better targeting, higher conversion,
                and zero compliance risk.
              </p>
            </div>

            <div className="bg-background p-12">
              <Briefcase className="h-12 w-12 text-primary mb-6" />
              <h3 className="text-3xl font-light text-white mb-4">Sales Teams</h3>
              <p className="text-lg text-white/50 leading-relaxed">
                Close deals faster with accurate, consented customer data. Build trust
                from the first interaction.
              </p>
            </div>

            <div className="bg-background p-12">
              <Globe className="h-12 w-12 text-primary mb-6" />
              <h3 className="text-3xl font-light text-white mb-4">Global Enterprises</h3>
              <p className="text-lg text-white/50 leading-relaxed">
                Navigate GDPR, CCPA, and global privacy regulations with compliance
                built into every interaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="px-8 py-32 bg-white/[0.01]">
        <div className="max-w-[1400px] mx-auto">
          <SectionDivider label="Compliance" />

          <div className="mt-24 grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-5xl font-light tracking-tight text-white mb-8">
                Compliance is
                <br />
                <span className="text-white/40">your advantage</span>
              </h2>
              <p className="text-lg text-white/50 leading-relaxed mb-8">
                While competitors worry about regulations, you're already ahead.
                Ethos makes privacy law compliance automatic—turning legal requirements
                into a competitive moat.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <Award className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-xl font-light text-white mb-2">GDPR Native</h4>
                    <p className="text-base text-white/50">Right to erasure, portability, and access built-in</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-xl font-light text-white mb-2">CCPA Ready</h4>
                    <p className="text-base text-white/50">California Consumer Privacy Act compliance out of the box</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <FileCheck className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-xl font-light text-white mb-2">Audit Trail</h4>
                    <p className="text-base text-white/50">Every consent action recorded immutably on Polkadot</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <UserCheck className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-xl font-light text-white mb-2">User Rights Management</h4>
                    <p className="text-base text-white/50">Handle data requests automatically with cryptographic proof</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card p-12 rounded-2xl">
              <div className="space-y-6">
                <div className="border-l-2 border-primary pl-6">
                  <div className="text-4xl font-light text-white mb-2">100%</div>
                  <div className="text-sm text-white/40 uppercase tracking-[0.15em]">Verifiable Consent</div>
                </div>

                <div className="border-l-2 border-primary pl-6">
                  <div className="text-4xl font-light text-white mb-2">0</div>
                  <div className="text-sm text-white/40 uppercase tracking-[0.15em]">Compliance Violations</div>
                </div>

                <div className="border-l-2 border-primary pl-6">
                  <div className="text-4xl font-light text-white mb-2">Real-time</div>
                  <div className="text-sm text-white/40 uppercase tracking-[0.15em]">Consent Revocation</div>
                </div>

                <div className="border-l-2 border-primary pl-6">
                  <div className="text-4xl font-light text-white mb-2">Immutable</div>
                  <div className="text-sm text-white/40 uppercase tracking-[0.15em]">Blockchain Records</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-8 py-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="border-y border-white/[0.03] py-24 text-center">
            <div className="inline-flex items-center justify-center h-24 w-24 rounded-2xl bg-primary mb-8 p-5">
              <EthosLogo className="h-full w-full text-primary-foreground" />
            </div>
            <h2 className="text-7xl font-light tracking-tight text-white mb-6">
              Build trust.
              <br />
              <span className="text-white/40">Win customers.</span>
            </h2>
            <p className="text-xl text-white/50 mb-12 max-w-[700px] mx-auto">
              Transform your customer relationships with the ethical CRM built on Polkadot.
            </p>
            <ButtonPurple className="h-14 px-12 text-lg" asChild>
              <Link href="/ethos/dashboard">
                <Shield className="mr-2 h-5 w-5" />
                Access Ethos Platform
              </Link>
            </ButtonPurple>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.08] px-8 py-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-4 gap-16 mb-16">
            <div className="col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary/10 border border-primary/20 p-1.5">
                  <ContinuumLogo className="h-full w-full text-primary" />
                </div>
                <span className="font-semibold tracking-tight">Continuum</span>
              </div>
              <p className="text-sm text-white/40 leading-relaxed">
                The trust layer for data exchange. Built on Polkadot.
              </p>
            </div>

            <div>
              <div className="text-xs font-medium uppercase tracking-[0.15em] text-white/40 mb-6">Products</div>
              <ul className="space-y-3">
                <li><Link href="/myn" className="text-sm text-white/60 hover:text-white transition">Myn App</Link></li>
                <li><Link href="/ethos" className="text-sm text-white/60 hover:text-white transition">Ethos CRM</Link></li>
                <li><Link href="/protocol" className="text-sm text-white/60 hover:text-white transition">Protocol</Link></li>
              </ul>
            </div>

            <div>
              <div className="text-xs font-medium uppercase tracking-[0.15em] text-white/40 mb-6">Resources</div>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-white/60 hover:text-white transition">Documentation</a></li>
                <li><a href="#" className="text-sm text-white/60 hover:text-white transition">GitHub</a></li>
                <li><a href="#" className="text-sm text-white/60 hover:text-white transition">Brand Assets</a></li>
              </ul>
            </div>

            <div>
              <div className="text-xs font-medium uppercase tracking-[0.15em] text-white/40 mb-6">Company</div>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-white/60 hover:text-white transition">About</a></li>
                <li><a href="#" className="text-sm text-white/60 hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="text-sm text-white/60 hover:text-white transition">Terms</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/[0.08] flex items-center justify-between">
            <p className="text-xs text-white/30">© 2025 Continuum. Built on Polkadot.</p>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
              <span className="text-xs text-white/30">Network Online</span>
            </div>
          </div>
        </div>
      </footer>
    </GridBackground>
  )
}
