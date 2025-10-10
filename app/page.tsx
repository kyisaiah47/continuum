"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"
import { ArrowRight, Database, Shield, User, ChevronRight, Check, Wallet, Building2, Network } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Animated gradient background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-continuum rounded-full blur-[120px] animate-breathing" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[120px] animate-breathing" style={{ animationDelay: '2s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="fixed top-0 w-full z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-gradient-continuum animate-gradient-flow">
                <Database className="h-4 w-4 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-semibold tracking-tight">Continuum</span>
                <span className="text-[10px] text-muted-foreground">The Trust Layer</span>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#myn" className="text-sm text-muted-foreground hover:text-foreground transition">Myn</a>
              <a href="#ethos" className="text-sm text-muted-foreground hover:text-foreground transition">Ethos</a>
              <a href="#protocol" className="text-sm text-muted-foreground hover:text-foreground transition">Protocol</a>
              <div className="h-4 w-px bg-border" />
              <Button variant="ghost" size="sm" className="text-sm h-9" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button size="sm" className="h-9 text-sm font-medium" asChild>
                <Link href="/signup">Get Started</Link>
              </Button>
            </nav>
          </div>
        </header>

        {/* Hero */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mb-6">
              <Network className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-medium">Built on Polkadot</span>
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 bg-gradient-to-b from-foreground to-foreground/50 bg-clip-text text-transparent leading-[1.1]">
              The Continuum<br />of Trust
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto font-light leading-relaxed">
              A decentralized data ecosystem where individuals own their information, organizations operate with consent, and every exchange is verified on-chain.
            </p>

            <div className="inline-flex items-center gap-6 text-sm text-muted-foreground mb-12">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span>Own</span>
              </div>
              <div className="h-1 w-12 bg-gradient-to-r from-primary/50 to-transparent" />
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span>Connect</span>
              </div>
              <div className="h-1 w-12 bg-gradient-to-r from-primary/50 to-transparent" />
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-purple-500 animate-pulse" />
                <span>Trust</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <Button size="lg" className="h-12 px-6 font-medium shadow-lg" asChild>
                <Link href="#products">
                  Explore the Ecosystem
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-6 font-medium hover-glow" asChild>
                <Link href="/dashboard">View Demo</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Ecosystem Overview - 3 Products */}
        <section id="products" className="px-6 py-32 border-y border-border/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Three products. One ecosystem.</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Each product serves a different audience, but they all work together to create a fair data economy.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Myn Card */}
              <a href="#myn" className="group">
                <GlassCard variant="frosted" className="h-full hover:scale-[1.02] transition-all duration-300 cursor-pointer relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-myn opacity-10 group-hover:opacity-20 transition-opacity" />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-myn">
                        <User className="h-6 w-6 text-white" />
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                    </div>
                    <h3 className="text-3xl font-bold mb-2">Myn</h3>
                    <p className="text-sm text-muted-foreground mb-4 italic">"Your data, your power."</p>
                    <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                      Personal data wallet for individuals. See, manage, and monetize your digital footprint.
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Check className="h-4 w-4 text-[#C5B6F7]" />
                        <span>Own your data</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Check className="h-4 w-4 text-[#A7E2F2]" />
                        <span>Control access</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Check className="h-4 w-4 text-[#C5B6F7]" />
                        <span>Earn from value</span>
                      </div>
                    </div>
                    <div className="mt-6 pt-6 border-t border-border/50">
                      <div className="text-xs text-muted-foreground mb-1">For</div>
                      <div className="text-sm font-medium">Privacy-conscious individuals</div>
                    </div>
                  </div>
                </GlassCard>
              </a>

              {/* Ethos Card */}
              <a href="#ethos" className="group">
                <GlassCard variant="morph" className="h-full hover:scale-[1.02] transition-all duration-300 cursor-pointer relative overflow-hidden border-primary/20">
                  <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-primary">
                        <Building2 className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                    <h3 className="text-3xl font-bold mb-2">Ethos</h3>
                    <p className="text-sm text-muted-foreground mb-4 italic">"The ethical CRM."</p>
                    <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                      Enterprise platform for verified consent-based customer data. Compliance by design.
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Check className="h-4 w-4 text-primary" />
                        <span>Verified consent</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Check className="h-4 w-4 text-primary" />
                        <span>Better data quality</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Check className="h-4 w-4 text-primary" />
                        <span>Trust-based marketing</span>
                      </div>
                    </div>
                    <div className="mt-6 pt-6 border-t border-border/50">
                      <div className="text-xs text-muted-foreground mb-1">For</div>
                      <div className="text-sm font-medium">Marketing teams & enterprises</div>
                    </div>
                  </div>
                </GlassCard>
              </a>

              {/* Continuum Protocol Card */}
              <a href="#protocol" className="group">
                <GlassCard variant="continuum" className="h-full hover:scale-[1.02] transition-all duration-300 cursor-pointer relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-continuum opacity-5 group-hover:opacity-10 transition-opacity animate-gradient-flow" />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-continuum animate-gradient-flow">
                        <Network className="h-6 w-6 text-white" />
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-[#00D4FF] group-hover:translate-x-1 transition-all" />
                    </div>
                    <h3 className="text-3xl font-bold mb-2">Continuum</h3>
                    <p className="text-sm text-muted-foreground mb-4 italic">"Where data meets integrity."</p>
                    <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                      Decentralized protocol on Polkadot. Verifies and records every data exchange.
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Check className="h-4 w-4 text-[#00D4FF]" />
                        <span>Cryptographic proof</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Check className="h-4 w-4 text-[#8B5CF6]" />
                        <span>Immutable records</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Check className="h-4 w-4 text-[#FF7AE0]" />
                        <span>Open-source</span>
                      </div>
                    </div>
                    <div className="mt-6 pt-6 border-t border-border/50">
                      <div className="text-xs text-muted-foreground mb-1">For</div>
                      <div className="text-sm font-medium">Developers & protocol architects</div>
                    </div>
                  </div>
                </GlassCard>
              </a>
            </div>
          </div>
        </section>

        {/* How They Work Together */}
        <section className="px-6 py-32">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">How it works together</h2>
              <p className="text-lg text-muted-foreground">
                A complete data ecosystem built on transparency and consent
              </p>
            </div>

            <div className="space-y-12">
              <div className="flex gap-6 items-start animate-slide-in-up">
                <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-gradient-myn text-white font-bold text-lg">
                  1
                </div>
                <div className="pt-2">
                  <h3 className="text-2xl font-semibold mb-3">Individual owns data in Myn</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Users connect their data sources to the Myn app. Everything stays encrypted and under their control.
                    They set privacy preferences and decide who can request access.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
                <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground font-bold text-lg">
                  2
                </div>
                <div className="pt-2">
                  <h3 className="text-2xl font-semibold mb-3">Organization requests via Ethos</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Brands use the Ethos CRM to submit data access requests. They specify which fields they need,
                    for how long, and offer fair compensation in DOT tokens.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-gradient-continuum text-white font-bold text-lg">
                  3
                </div>
                <div className="pt-2">
                  <h3 className="text-2xl font-semibold mb-3">Continuum verifies and records</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Every approval, rejection, and revocation is recorded on Polkadot. Cryptographic proof of consent.
                    Smart contracts enforce time limits and handle payments automatically.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-16 p-8 rounded-2xl bg-muted/50 border border-border">
              <div className="text-center">
                <p className="text-lg font-medium mb-2">The Result</p>
                <p className="text-muted-foreground">
                  Individuals earn from their data. Organizations get verified, high-quality information.
                  Trust is mathematically proven. Everyone wins.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Product Deep Dives */}

        {/* Myn Section */}
        <section id="myn" className="px-6 py-32 bg-gradient-to-b from-[#C5B6F7]/5 to-transparent border-y border-border/50">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-myn text-white text-xs font-medium mb-6">
                  <User className="h-3 w-3" />
                  For Individuals
                </div>
                <h2 className="text-5xl font-bold mb-6 tracking-tight">Myn</h2>
                <p className="text-2xl text-muted-foreground mb-8 italic">"Your data, your power."</p>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  The personal data wallet that gives you complete visibility and control.
                  See what you share, decide who accesses it, and earn when your data creates value.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-[#C5B6F7]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="h-4 w-4 text-[#C5B6F7]" />
                    </div>
                    <div>
                      <div className="font-medium mb-1">See your data</div>
                      <div className="text-sm text-muted-foreground">Connect accounts and view unified dashboard of everything you share</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-[#A7E2F2]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="h-4 w-4 text-[#A7E2F2]" />
                    </div>
                    <div>
                      <div className="font-medium mb-1">Control access</div>
                      <div className="text-sm text-muted-foreground">Approve or reject requests. Revoke access anytime. Your rules, always.</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-[#C5B6F7]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="h-4 w-4 text-[#C5B6F7]" />
                    </div>
                    <div>
                      <div className="font-medium mb-1">Earn from value</div>
                      <div className="text-sm text-muted-foreground">Get paid directly in DOT tokens when organizations license your data</div>
                    </div>
                  </div>
                </div>
                <Button size="lg" className="bg-gradient-myn text-white hover:opacity-90">
                  <Wallet className="mr-2 h-4 w-4" />
                  Download Myn App
                </Button>
              </div>
              <div className="glass-frosted rounded-2xl p-8 animate-fade-in">
                <div className="aspect-square bg-gradient-to-br from-[#C5B6F7]/20 to-[#A7E2F2]/20 rounded-xl flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <User className="h-24 w-24 mx-auto mb-4 opacity-50" />
                    <p className="text-sm">Myn App Interface</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ethos Section */}
        <section id="ethos" className="px-6 py-32">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1 glass-morph rounded-2xl p-8 animate-fade-in">
                <div className="aspect-square bg-primary/5 rounded-xl flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <Building2 className="h-24 w-24 mx-auto mb-4 opacity-50" />
                    <p className="text-sm">Ethos Dashboard</p>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium mb-6">
                  <Building2 className="h-3 w-3" />
                  For Organizations
                </div>
                <h2 className="text-5xl font-bold mb-6 tracking-tight">Ethos</h2>
                <p className="text-2xl text-muted-foreground mb-8 italic">"The ethical CRM."</p>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  The enterprise platform that transforms customer relationships from extraction to exchange.
                  Access verified data through transparent consent—turning compliance into your competitive advantage.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium mb-1">Verified consent</div>
                      <div className="text-sm text-muted-foreground">Every data point comes with cryptographic proof of user approval</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium mb-1">Better data quality</div>
                      <div className="text-sm text-muted-foreground">Users who choose to share give accurate information—no bots or fake profiles</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium mb-1">Trust-based marketing</div>
                      <div className="text-sm text-muted-foreground">Build customer loyalty through transparency, not surveillance</div>
                    </div>
                  </div>
                </div>
                <Button size="lg" variant="default" asChild>
                  <Link href="/dashboard">
                    <Shield className="mr-2 h-4 w-4" />
                    Access Ethos Platform
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Continuum Protocol Section */}
        <section id="protocol" className="px-6 py-32 bg-gradient-to-b from-[#0D0E12] to-background border-y border-border/50">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-continuum text-white text-xs font-medium mb-6 animate-gradient-flow">
                  <Network className="h-3 w-3" />
                  Protocol Layer
                </div>
                <h2 className="text-5xl font-bold mb-6 tracking-tight">Continuum</h2>
                <p className="text-2xl text-muted-foreground mb-8 italic">"Where data meets integrity."</p>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  The decentralized protocol that verifies and immortalizes every data exchange.
                  Open-source, auditable, and permanent—the trust infrastructure that makes Myn and Ethos possible.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-[#00D4FF]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="h-4 w-4 text-[#00D4FF]" />
                    </div>
                    <div>
                      <div className="font-medium mb-1">Cryptographic verification</div>
                      <div className="text-sm text-muted-foreground text-mono">Every consent grant signed with Ed25519 keys</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-[#8B5CF6]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="h-4 w-4 text-[#8B5CF6]" />
                    </div>
                    <div>
                      <div className="font-medium mb-1">Immutable records</div>
                      <div className="text-sm text-muted-foreground">All transactions recorded permanently on Polkadot parachain</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-[#FF7AE0]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="h-4 w-4 text-[#FF7AE0]" />
                    </div>
                    <div>
                      <div className="font-medium mb-1">Open infrastructure</div>
                      <div className="text-sm text-muted-foreground">Build on top. Integrate. Extend. MIT licensed.</div>
                    </div>
                  </div>
                </div>
                <Button size="lg" variant="outline" className="border-[#00D4FF]/30 hover:bg-[#00D4FF]/10">
                  <Database className="mr-2 h-4 w-4" />
                  Read the Docs
                </Button>
              </div>
              <div className="bg-[#16171D] rounded-2xl p-8 border border-[#2A2B32] animate-fade-in">
                <div className="aspect-square bg-gradient-continuum/5 rounded-xl flex items-center justify-center animate-gradient-flow">
                  <div className="text-center text-muted-foreground">
                    <Network className="h-24 w-24 mx-auto mb-4 opacity-50" />
                    <p className="text-sm text-mono">Network Explorer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-6 py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              Join the ecosystem
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Whether you're an individual, organization, or developer—there's a place for you in Continuum.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-12 px-8 font-medium">
                <Link href="/signup" className="flex items-center">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 font-medium hover-glow" asChild>
                <Link href="/dashboard">View Demo</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border/50 px-6 py-16 bg-muted/20">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-5 gap-12 mb-12">
              <div className="md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-gradient-continuum animate-gradient-flow">
                    <Database className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-semibold text-lg tracking-tight">Continuum</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  The trust layer for data exchange. Built on Polkadot.
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span>Network status: Online</span>
                </div>
              </div>
              <div>
                <div className="text-sm font-semibold mb-4">Products</div>
                <ul className="space-y-2.5 text-sm text-muted-foreground">
                  <li><a href="#myn" className="hover:text-foreground transition">Myn App</a></li>
                  <li><a href="#ethos" className="hover:text-foreground transition">Ethos CRM</a></li>
                  <li><a href="#protocol" className="hover:text-foreground transition">Protocol Docs</a></li>
                </ul>
              </div>
              <div>
                <div className="text-sm font-semibold mb-4">Resources</div>
                <ul className="space-y-2.5 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-foreground transition">Documentation</a></li>
                  <li><a href="#" className="hover:text-foreground transition">GitHub</a></li>
                  <li><a href="#" className="hover:text-foreground transition">Brand Assets</a></li>
                </ul>
              </div>
              <div>
                <div className="text-sm font-semibold mb-4">Company</div>
                <ul className="space-y-2.5 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-foreground transition">About</a></li>
                  <li><a href="#" className="hover:text-foreground transition">Privacy</a></li>
                  <li><a href="#" className="hover:text-foreground transition">Terms</a></li>
                </ul>
              </div>
            </div>
            <div className="pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-muted-foreground">© 2025 Continuum. Built on Polkadot.</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>Own. Connect. Trust.</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
