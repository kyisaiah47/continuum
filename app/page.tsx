"use client"

import Link from "next/link"
import { GridBackground, SectionDivider, ButtonPurple, StatCard } from "@/components/ui/plural"
import { ContinuumLogo } from "@/components/brand/continuum-logo"
import { MynLogo } from "@/components/brand/myn-logo"
import { EthosLogo } from "@/components/brand/ethos-logo"
import { ArrowRight, User, Building2, Network } from "lucide-react"

export default function LandingPage() {
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
            <Link href="/ethos" className="text-sm text-white/60 hover:text-white transition tracking-wide">Ethos</Link>
            <Link href="/protocol" className="text-sm text-white/60 hover:text-white transition tracking-wide">Protocol</Link>
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
        <div className="max-w-[900px] mx-auto">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm">
              <Network className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-medium uppercase tracking-[0.15em] text-white/60">Built on Polkadot</span>
            </div>

            <h1 className="text-8xl font-light tracking-[-0.02em] leading-[1.1] text-white">
              The Continuum
              <br />
              <span className="text-white/40">of Trust</span>
            </h1>

            <p className="text-xl font-light text-white/50 max-w-[600px] mx-auto leading-relaxed">
              A decentralized data ecosystem where individuals own their information,
              organizations operate with consent, and every exchange is verified on-chain.
            </p>

            <div className="flex items-center justify-center gap-4 pt-4">
              <ButtonPurple className="h-12 px-8 text-base" asChild>
                <Link href="#ecosystem">
                  Explore Ecosystem
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </ButtonPurple>
              <Link
                href="/ethos/dashboard"
                className="h-12 px-8 inline-flex items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-base font-medium text-white/80 hover:bg-white/[0.05] hover:text-white transition-all"
              >
                View Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-8 pb-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="glass-card rounded-none border-y border-white/[0.03] grid grid-cols-3 divide-x divide-white/[0.03]">
            <StatCard value="100%" label="Data ownership for individuals" />
            <StatCard value="0" label="Trust assumptions required" />
            <StatCard value="∞" label="Cryptographic verification" />
          </div>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section id="ecosystem" className="px-8 py-32">
        <div className="max-w-[1400px] mx-auto">
          <SectionDivider label="Ecosystem" />

          <div className="mt-24 mb-16 text-center">
            <h2 className="text-6xl font-light tracking-tight text-white mb-6">
              Three products.
              <br />
              <span className="text-white/40">One ecosystem.</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-px bg-white/[0.03]">
            {/* Myn Card */}
            <Link href="/myn" className="group bg-background p-12 hover:bg-white/[0.02] transition-all relative overflow-hidden">
              <div className="absolute top-0 left-0 h-px w-0 bg-primary group-hover:w-full transition-all duration-500" />

              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-myn p-3">
                  <MynLogo className="h-full w-full text-white" />
                </div>
                <User className="h-5 w-5 text-white/20 group-hover:text-white/40 transition-colors" />
              </div>

              <h3 className="text-4xl font-light tracking-tight text-white mb-3">Myn</h3>
              <p className="text-sm text-white/40 mb-8 italic">Your data, your power.</p>

              <p className="text-base text-white/60 leading-relaxed mb-8">
                Personal data wallet for individuals. See, manage, and monetize your digital footprint.
              </p>

              <div className="flex items-center gap-2 text-sm text-white/40 group-hover:text-primary transition-colors">
                <span className="uppercase tracking-[0.15em]">Learn More</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </Link>

            {/* Ethos Card */}
            <Link href="/ethos" className="group bg-background p-12 hover:bg-white/[0.02] transition-all relative overflow-hidden">
              <div className="absolute top-0 left-0 h-px w-0 bg-primary group-hover:w-full transition-all duration-500" />

              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-primary p-3">
                  <EthosLogo className="h-full w-full text-primary-foreground" />
                </div>
                <Building2 className="h-5 w-5 text-white/20 group-hover:text-white/40 transition-colors" />
              </div>

              <h3 className="text-4xl font-light tracking-tight text-white mb-3">Ethos</h3>
              <p className="text-sm text-white/40 mb-8 italic">The ethical CRM.</p>

              <p className="text-base text-white/60 leading-relaxed mb-8">
                Enterprise platform for verified consent-based customer data. Compliance by design.
              </p>

              <div className="flex items-center gap-2 text-sm text-white/40 group-hover:text-primary transition-colors">
                <span className="uppercase tracking-[0.15em]">Learn More</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </Link>

            {/* Continuum Card */}
            <Link href="/protocol" className="group bg-background p-12 hover:bg-white/[0.02] transition-all relative overflow-hidden">
              <div className="absolute top-0 left-0 h-px w-0 bg-primary group-hover:w-full transition-all duration-500" />

              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-continuum animate-gradient-flow p-3">
                  <ContinuumLogo className="h-full w-full text-white" />
                </div>
                <Network className="h-5 w-5 text-white/20 group-hover:text-white/40 transition-colors" />
              </div>

              <h3 className="text-4xl font-light tracking-tight text-white mb-3">Continuum</h3>
              <p className="text-sm text-white/40 mb-8 italic">Where data meets integrity.</p>

              <p className="text-base text-white/60 leading-relaxed mb-8">
                Decentralized protocol on Polkadot. Verifies and records every data exchange.
              </p>

              <div className="flex items-center gap-2 text-sm text-white/40 group-hover:text-primary transition-colors">
                <span className="uppercase tracking-[0.15em]">Learn More</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="px-8 py-32 bg-white/[0.01]">
        <div className="max-w-[1100px] mx-auto">
          <SectionDivider label="How it Works" />

          <div className="mt-24 space-y-px bg-white/[0.03]">
            <div className="bg-background p-16 flex gap-12 items-start">
              <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full border border-white/[0.08] text-white/40 font-light text-2xl">
                1
              </div>
              <div>
                <h3 className="text-3xl font-light text-white mb-4">Individual owns data in Myn</h3>
                <p className="text-lg text-white/50 leading-relaxed">
                  Users connect their data sources to the Myn app. Everything stays encrypted and under their control.
                  They set privacy preferences and decide who can request access.
                </p>
              </div>
            </div>

            <div className="bg-background p-16 flex gap-12 items-start">
              <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full border border-white/[0.08] text-white/40 font-light text-2xl">
                2
              </div>
              <div>
                <h3 className="text-3xl font-light text-white mb-4">Organization requests via Ethos</h3>
                <p className="text-lg text-white/50 leading-relaxed">
                  Brands use the Ethos CRM to submit data access requests. They specify which fields they need,
                  for how long, and offer fair compensation in DOT tokens.
                </p>
              </div>
            </div>

            <div className="bg-background p-16 flex gap-12 items-start">
              <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full border border-white/[0.08] text-white/40 font-light text-2xl">
                3
              </div>
              <div>
                <h3 className="text-3xl font-light text-white mb-4">Continuum verifies and records</h3>
                <p className="text-lg text-white/50 leading-relaxed">
                  Every approval, rejection, and revocation is recorded on Polkadot. Cryptographic proof of consent.
                  Smart contracts enforce time limits and handle payments automatically.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-8 py-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="border-y border-white/[0.03] py-24 text-center">
            <h2 className="text-7xl font-light tracking-tight text-white mb-6">
              Join the ecosystem
            </h2>
            <p className="text-xl text-white/50 mb-12 max-w-[700px] mx-auto">
              Whether you're an individual, organization, or developer—there's a place for you in Continuum.
            </p>
            <ButtonPurple className="h-14 px-12 text-lg" asChild>
              <Link href="/signup">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
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
