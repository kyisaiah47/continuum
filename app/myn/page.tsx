"use client"

import Link from "next/link"
import { GridBackground, SectionDivider, ButtonPurple, StatCard, GlassCard } from "@/components/ui/plural"
import { ContinuumLogo } from "@/components/brand/continuum-logo"
import { MynLogo } from "@/components/brand/myn-logo"
import {
  ArrowRight, ArrowLeft, Wallet, Eye, Shield, DollarSign,
  Check, Lock, Smartphone, Database, Users, TrendingUp,
  Calendar, Bell, Settings, Download
} from "lucide-react"

export default function MynPage() {
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
            <Link href="/myn" className="text-sm text-primary transition tracking-wide">Myn</Link>
            <Link href="/ethos" className="text-sm text-white/60 hover:text-white transition tracking-wide">Ethos</Link>
            <Link href="/continuum" className="text-sm text-white/60 hover:text-white transition tracking-wide">Continuum</Link>
            <div className="h-6 w-px bg-white/[0.08]" />
            <Link href="/login" className="text-sm text-white/60 hover:text-white transition tracking-wide">Login</Link>
            <ButtonPurple className="h-9 px-5 text-sm" asChild>
              <Link href="/signup">Get Started</Link>
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
                <div className="flex items-center justify-center h-20 w-20 rounded-2xl bg-gradient-myn p-4">
                  <MynLogo className="h-full w-full text-white" />
                </div>
                <div>
                  <h1 className="text-7xl font-light tracking-tight text-white">Myn</h1>
                  <p className="text-lg text-white/40 italic mt-1">Your data, your power.</p>
                </div>
              </div>

              <p className="text-2xl font-light text-white/60 leading-relaxed mb-12">
                The personal data wallet that gives you complete visibility and control.
                See what you share, decide who accesses it, and earn when your data creates value.
              </p>

              <div className="flex items-center gap-4">
                <ButtonPurple className="h-14 px-8 text-lg">
                  <Download className="mr-2 h-5 w-5" />
                  Download Myn
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
              <div className="aspect-square bg-gradient-to-br from-[#C5B6F7]/20 to-[#A7E2F2]/20 rounded-xl flex items-center justify-center border border-white/[0.05]">
                <div className="text-center text-white/40">
                  <Smartphone className="h-32 w-32 mx-auto mb-4" />
                  <p className="text-sm uppercase tracking-[0.15em]">Myn App Interface</p>
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
            <StatCard value="100%" label="Your data ownership" />
            <StatCard value="$0" label="Cost to use Myn" />
            <StatCard value="24/7" label="Access control" />
            <StatCard value="∞" label="Revocations allowed" />
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section id="features" className="px-8 py-32 bg-white/[0.01]">
        <div className="max-w-[1400px] mx-auto">
          <SectionDivider label="Core Features" />

          <div className="mt-24 mb-16 text-center max-w-[800px] mx-auto">
            <h2 className="text-6xl font-light tracking-tight text-white mb-6">
              Everything you need to
              <br />
              <span className="text-white/40">own your data</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-white/[0.03]">
            <div className="bg-background p-12">
              <div className="h-14 w-14 rounded-xl bg-[#C5B6F7]/10 border border-[#C5B6F7]/20 flex items-center justify-center mb-8">
                <Eye className="h-7 w-7 text-[#C5B6F7]" />
              </div>
              <h3 className="text-2xl font-light text-white mb-4">See Your Data</h3>
              <p className="text-base text-white/50 leading-relaxed mb-6">
                Connect all your accounts and see a unified dashboard of everything you share across the internet.
                From social media to shopping habits—it's all in one place.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-white/40">
                  <Check className="h-4 w-4 text-[#C5B6F7]" />
                  <span>Unified data dashboard</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-white/40">
                  <Check className="h-4 w-4 text-[#C5B6F7]" />
                  <span>Real-time sync across sources</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-white/40">
                  <Check className="h-4 w-4 text-[#C5B6F7]" />
                  <span>Privacy-first visualization</span>
                </li>
              </ul>
            </div>

            <div className="bg-background p-12">
              <div className="h-14 w-14 rounded-xl bg-[#A7E2F2]/10 border border-[#A7E2F2]/20 flex items-center justify-center mb-8">
                <Shield className="h-7 w-7 text-[#A7E2F2]" />
              </div>
              <h3 className="text-2xl font-light text-white mb-4">Control Access</h3>
              <p className="text-base text-white/50 leading-relaxed mb-6">
                Decide exactly who can see what. Approve or reject data requests from organizations.
                Revoke access anytime with a single tap.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-white/40">
                  <Check className="h-4 w-4 text-[#A7E2F2]" />
                  <span>Granular permission controls</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-white/40">
                  <Check className="h-4 w-4 text-[#A7E2F2]" />
                  <span>One-tap revocation</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-white/40">
                  <Check className="h-4 w-4 text-[#A7E2F2]" />
                  <span>Time-limited access grants</span>
                </li>
              </ul>
            </div>

            <div className="bg-background p-12">
              <div className="h-14 w-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-8">
                <DollarSign className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-2xl font-light text-white mb-4">Earn From Value</h3>
              <p className="text-base text-white/50 leading-relaxed mb-6">
                When organizations pay to access your data, you earn directly in DOT tokens.
                No middlemen. No data brokers. Just you and fair compensation.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-white/40">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Direct DOT payments</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-white/40">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Transparent pricing</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-white/40">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Automatic smart contract escrow</span>
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
                <h3 className="text-3xl font-light text-white mb-4">Download and Connect</h3>
                <p className="text-lg text-white/50 leading-relaxed">
                  Install the Myn app on your phone. Connect your social media, email, shopping accounts,
                  and any other data sources. Everything is encrypted locally on your device.
                </p>
              </div>
            </div>

            <div className="bg-background p-16 flex gap-12 items-start">
              <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full border border-white/[0.08] text-white/40 font-light text-2xl">
                2
              </div>
              <div>
                <h3 className="text-3xl font-light text-white mb-4">Set Your Preferences</h3>
                <p className="text-lg text-white/50 leading-relaxed">
                  Define what data you're willing to share and at what price. Set default rules for
                  different types of organizations—or review each request individually.
                </p>
              </div>
            </div>

            <div className="bg-background p-16 flex gap-12 items-start">
              <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full border border-white/[0.08] text-white/40 font-light text-2xl">
                3
              </div>
              <div>
                <h3 className="text-3xl font-light text-white mb-4">Receive Requests</h3>
                <p className="text-lg text-white/50 leading-relaxed">
                  When an organization using Ethos wants your data, you get a notification.
                  Review exactly what they want, for how long, and how much they'll pay.
                </p>
              </div>
            </div>

            <div className="bg-background p-16 flex gap-12 items-start">
              <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full border border-white/[0.08] text-white/40 font-light text-2xl">
                4
              </div>
              <div>
                <h3 className="text-3xl font-light text-white mb-4">Approve and Earn</h3>
                <p className="text-lg text-white/50 leading-relaxed">
                  Tap approve, and the payment is automatically escrowed on Polkadot. The organization gets
                  access for the agreed time period, and you earn DOT tokens instantly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Privacy */}
      <section className="px-8 py-32 bg-white/[0.01]">
        <div className="max-w-[1400px] mx-auto">
          <SectionDivider label="Security & Privacy" />

          <div className="mt-24 grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-5xl font-light tracking-tight text-white mb-8">
                Built with
                <br />
                <span className="text-white/40">privacy first</span>
              </h2>
              <p className="text-lg text-white/50 leading-relaxed mb-8">
                Your data never leaves your device without your explicit consent.
                Everything is encrypted end-to-end using industry-standard cryptography.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <Lock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-xl font-light text-white mb-2">End-to-End Encryption</h4>
                    <p className="text-base text-white/50">All data encrypted with AES-256 before it leaves your device</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-xl font-light text-white mb-2">Zero-Knowledge Architecture</h4>
                    <p className="text-base text-white/50">We can't see your data even if we wanted to</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Database className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-xl font-light text-white mb-2">Local-First Storage</h4>
                    <p className="text-base text-white/50">Your data stays on your device until you grant access</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card p-12 rounded-2xl">
              <div className="space-y-6">
                <div className="border-l-2 border-primary pl-6">
                  <div className="text-4xl font-light text-white mb-2">256-bit</div>
                  <div className="text-sm text-white/40 uppercase tracking-[0.15em]">Encryption Standard</div>
                </div>

                <div className="border-l-2 border-primary pl-6">
                  <div className="text-4xl font-light text-white mb-2">0</div>
                  <div className="text-sm text-white/40 uppercase tracking-[0.15em]">Data Breaches</div>
                </div>

                <div className="border-l-2 border-primary pl-6">
                  <div className="text-4xl font-light text-white mb-2">Open</div>
                  <div className="text-sm text-white/40 uppercase tracking-[0.15em]">Source Audited</div>
                </div>

                <div className="border-l-2 border-primary pl-6">
                  <div className="text-4xl font-light text-white mb-2">GDPR</div>
                  <div className="text-sm text-white/40 uppercase tracking-[0.15em]">Compliant by Design</div>
                </div>
              </div>
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
              Who is Myn for?
            </h2>
            <p className="text-xl text-white/50">
              Anyone who wants to take back control of their digital footprint
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-white/[0.03]">
            <div className="bg-background p-12">
              <Users className="h-12 w-12 text-primary mb-6" />
              <h3 className="text-3xl font-light text-white mb-4">Privacy-Conscious Individuals</h3>
              <p className="text-lg text-white/50 leading-relaxed mb-6">
                You care about where your data goes. You're tired of being the product.
                Myn gives you visibility into every company that has your information.
              </p>
              <div className="text-sm text-white/30 uppercase tracking-[0.15em]">
                Take back control →
              </div>
            </div>

            <div className="bg-background p-12">
              <TrendingUp className="h-12 w-12 text-primary mb-6" />
              <h3 className="text-3xl font-light text-white mb-4">Data Monetizers</h3>
              <p className="text-lg text-white/50 leading-relaxed mb-6">
                Your data has value—why shouldn't you profit from it? Set your price and earn
                every time an organization wants access to your information.
              </p>
              <div className="text-sm text-white/30 uppercase tracking-[0.15em]">
                Start earning →
              </div>
            </div>

            <div className="bg-background p-12">
              <Calendar className="h-12 w-12 text-primary mb-6" />
              <h3 className="text-3xl font-light text-white mb-4">Digital Minimalists</h3>
              <p className="text-lg text-white/50 leading-relaxed mb-6">
                Reduce your digital footprint by seeing exactly what you share and with whom.
                Revoke access to services you no longer use with a single tap.
              </p>
              <div className="text-sm text-white/30 uppercase tracking-[0.15em]">
                Simplify your data →
              </div>
            </div>

            <div className="bg-background p-12">
              <Bell className="h-12 w-12 text-primary mb-6" />
              <h3 className="text-3xl font-light text-white mb-4">Transparency Seekers</h3>
              <p className="text-lg text-white/50 leading-relaxed mb-6">
                Get real-time notifications when your data is accessed. Know exactly what information
                is being used and for what purpose—no more mystery.
              </p>
              <div className="text-sm text-white/30 uppercase tracking-[0.15em]">
                Stay informed →
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-8 py-32 bg-white/[0.01]">
        <div className="max-w-[1400px] mx-auto">
          <div className="border-y border-white/[0.03] py-24 text-center">
            <div className="inline-flex items-center justify-center h-24 w-24 rounded-2xl bg-gradient-myn mb-8 p-5">
              <MynLogo className="h-full w-full text-white" />
            </div>
            <h2 className="text-7xl font-light tracking-tight text-white mb-6">
              Own your data.
              <br />
              <span className="text-white/40">Own your future.</span>
            </h2>
            <p className="text-xl text-white/50 mb-12 max-w-[700px] mx-auto">
              Download Myn today and start taking control of your digital life.
            </p>
            <ButtonPurple className="h-14 px-12 text-lg">
              <Download className="mr-2 h-5 w-5" />
              Download Myn App
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
                <li><Link href="/continuum" className="text-sm text-white/60 hover:text-white transition">Continuum</Link></li>
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
            <p className="text-xs text-white/30">(c) 2025 Continuum. Built on Polkadot.</p>
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
