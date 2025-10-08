import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Animated gradient background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-blue-600/20 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/50 backdrop-blur-2xl">
          <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg width="22" height="22" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M28.7 0H12.8L0 12.8V28.7L12.8 41.5H28.7L41.5 28.7V12.8L28.7 0ZM15 28.9L6.80002 20.7L15 12.5C18.1 9.4 23.2 9.4 26.3 12.5L34.5 20.7L26.3 28.9C23.2 32 18.2 32 15 28.9Z" fill="white"/>
              </svg>
              <span className="font-semibold text-sm tracking-wide" style={{ fontFamily: 'var(--font-geist-sans)' }}>Ownbase</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-sm text-zinc-400 hover:text-white transition">Features</a>
              <a href="#pricing" className="text-sm text-zinc-400 hover:text-white transition">Pricing</a>
              <div className="h-4 w-px bg-white/10" />
              <Button variant="ghost" size="sm" className="text-sm h-8" asChild>
                <Link href="/dashboard">Login</Link>
              </Button>
              <Button size="sm" className="bg-white text-black hover:bg-zinc-200 h-8 text-sm font-medium" asChild>
                <Link href="/dashboard">Get Started</Link>
              </Button>
            </nav>
          </div>
        </header>

        {/* Hero */}
        <section className="pt-32 pb-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-purple-500/20 bg-purple-500/10 backdrop-blur-sm">
                <Sparkles className="h-3 w-3 text-purple-400" />
                <span className="text-xs font-medium text-purple-300">Built on Polkadot</span>
              </div>
            </div>

            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 text-center bg-gradient-to-b from-white via-white to-zinc-500 bg-clip-text text-transparent leading-[0.9]">
              Your customers<br />own their data
            </h1>

            <p className="text-xl md:text-2xl text-center text-zinc-400 mb-12 max-w-3xl mx-auto font-light">
              The first CRM built on customer ownership. No more data hoarding. No more breaches. Just fair exchange.
            </p>

            <div className="flex items-center justify-center gap-3">
              <Button size="lg" className="bg-white text-black hover:bg-zinc-200 h-11 px-6 font-medium shadow-lg shadow-white/20" asChild>
                <Link href="/dashboard">
                  Start building
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-11 px-6 border-white/10 hover:bg-white/5 font-medium" asChild>
                <Link href="/dashboard">View demo</Link>
              </Button>
            </div>

            <div className="flex items-center justify-center gap-12 mt-16 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold mb-1">$40K+</div>
                <div className="text-zinc-500">Paid to customers</div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="text-center">
                <div className="text-2xl font-bold mb-1">100%</div>
                <div className="text-zinc-500">Customer owned</div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="text-center">
                <div className="text-2xl font-bold mb-1">Zero</div>
                <div className="text-zinc-500">Data breaches</div>
              </div>
            </div>
          </div>
        </section>

        {/* Visual */}
        <section className="px-6 pb-32">
          <div className="max-w-6xl mx-auto">
            <div className="relative rounded-xl border border-white/10 bg-gradient-to-b from-zinc-900 to-black p-1 shadow-2xl">
              <div className="absolute -inset-px bg-gradient-to-b from-purple-500/20 via-blue-500/20 to-transparent rounded-xl blur-sm" />
              <div className="relative rounded-[11px] bg-black overflow-hidden">
                <div className="aspect-[16/10] bg-gradient-to-br from-zinc-900 via-black to-black flex items-center justify-center border-b border-white/5">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center h-16 w-16 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 mb-4">
                      <Sparkles className="h-8 w-8 text-white" />
                    </div>
                    <p className="text-zinc-600 text-sm">Dashboard Preview</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem/Solution */}
        <section className="px-6 py-32">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
              <div>
                <div className="inline-block px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium mb-6">
                  The Problem
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                  Traditional CRMs<br />are broken
                </h2>
                <p className="text-lg text-zinc-400 leading-relaxed">
                  Companies hoard data. Customers have zero control. Same info duplicated across hundreds of databases.
                  Privacy breaches everywhere. Trust is dead.
                </p>
              </div>
              <div className="space-y-4">
                <div className="p-6 rounded-lg border border-red-500/20 bg-red-500/5">
                  <div className="text-red-400 font-semibold mb-2">No customer control</div>
                  <p className="text-sm text-zinc-500">Fill out a form → company owns it forever</p>
                </div>
                <div className="p-6 rounded-lg border border-red-500/20 bg-red-500/5">
                  <div className="text-red-400 font-semibold mb-2">Always outdated</div>
                  <p className="text-sm text-zinc-500">100 copies of your info, none accurate</p>
                </div>
                <div className="p-6 rounded-lg border border-red-500/20 bg-red-500/5">
                  <div className="text-red-400 font-semibold mb-2">Privacy nightmare</div>
                  <p className="text-sm text-zinc-500">Breaches, leaks, sold to highest bidder</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1 space-y-4">
                <div className="p-6 rounded-lg border border-purple-500/20 bg-purple-500/5">
                  <div className="text-purple-400 font-semibold mb-2">Customer-controlled</div>
                  <p className="text-sm text-zinc-500">Encrypted wallets. Time-limited access. Revocable anytime.</p>
                </div>
                <div className="p-6 rounded-lg border border-blue-500/20 bg-blue-500/5">
                  <div className="text-blue-400 font-semibold mb-2">Always accurate</div>
                  <p className="text-sm text-zinc-500">One profile. Customer maintains it. Shared everywhere.</p>
                </div>
                <div className="p-6 rounded-lg border border-green-500/20 bg-green-500/5">
                  <div className="text-green-400 font-semibold mb-2">Fair exchange</div>
                  <p className="text-sm text-zinc-500">Pay for access. Customers get paid. Smart contracts handle it.</p>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="inline-block px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium mb-6">
                  Our Solution
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                  Customer ownership<br />changes everything
                </h2>
                <p className="text-lg text-zinc-400 leading-relaxed">
                  Data lives in Polkadot wallets. Customers grant access. Businesses pay fair rates.
                  Everyone wins. Simple.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="px-6 py-32 border-y border-white/5" id="features">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">How it works</h2>
              <p className="text-lg text-zinc-400">Three simple steps</p>
            </div>

            <div className="space-y-12">
              <div className="flex gap-6">
                <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full border border-white/10 bg-white/5 font-bold text-lg">
                  1
                </div>
                <div className="pt-2">
                  <h3 className="text-2xl font-semibold mb-3">Request access</h3>
                  <p className="text-zinc-400 text-lg leading-relaxed">
                    Choose data fields. Set duration and payment in DOT. Request sent to customer's wallet.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full border border-white/10 bg-white/5 font-bold text-lg">
                  2
                </div>
                <div className="pt-2">
                  <h3 className="text-2xl font-semibold mb-3">Customer approves</h3>
                  <p className="text-zinc-400 text-lg leading-relaxed">
                    Customer reviews in wallet. Approves or declines. Gets paid instantly via smart contract.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full border border-white/10 bg-white/5 font-bold text-lg">
                  3
                </div>
                <div className="pt-2">
                  <h3 className="text-2xl font-semibold mb-3">Time-limited access</h3>
                  <p className="text-zinc-400 text-lg leading-relaxed">
                    You get access for agreed duration. Auto-expires. Customer can revoke anytime.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="px-6 py-32" id="pricing">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Simple pricing</h2>
              <p className="text-lg text-zinc-400">Start free. Pay as you grow.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="p-8 rounded-xl border border-white/10 bg-zinc-900/50">
                <div className="mb-8">
                  <div className="text-sm font-medium text-zinc-400 mb-2">Free</div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-5xl font-bold">$0</span>
                    <span className="text-zinc-500">/mo</span>
                  </div>
                  <p className="text-sm text-zinc-500">For trying it out</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 text-sm text-zinc-400">
                    <Check className="h-4 w-4" />
                    10 contacts
                  </li>
                  <li className="flex items-center gap-3 text-sm text-zinc-400">
                    <Check className="h-4 w-4" />
                    Basic CRM
                  </li>
                  <li className="flex items-center gap-3 text-sm text-zinc-400">
                    <Check className="h-4 w-4" />
                    Wallet support
                  </li>
                </ul>
                <Button variant="outline" className="w-full border-white/10 hover:bg-white/5" asChild>
                  <Link href="/dashboard">Get started</Link>
                </Button>
              </div>

              <div className="p-8 rounded-xl border border-purple-500/30 bg-gradient-to-b from-purple-500/10 to-transparent relative">
                <div className="absolute top-4 right-4 px-2 py-0.5 rounded-full bg-purple-500 text-white text-[10px] font-bold uppercase tracking-wide">
                  Popular
                </div>
                <div className="mb-8">
                  <div className="text-sm font-medium text-zinc-400 mb-2">Pro</div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-5xl font-bold">$49</span>
                    <span className="text-zinc-500">/mo</span>
                  </div>
                  <p className="text-sm text-zinc-500">For growing teams</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 text-sm">
                    <Check className="h-4 w-4" />
                    Unlimited contacts
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <Check className="h-4 w-4" />
                    Advanced analytics
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <Check className="h-4 w-4" />
                    Data marketplace
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <Check className="h-4 w-4" />
                    Priority support
                  </li>
                </ul>
                <Button className="w-full bg-white text-black hover:bg-zinc-200 shadow-lg" asChild>
                  <Link href="/dashboard">Get started</Link>
                </Button>
              </div>

              <div className="p-8 rounded-xl border border-white/10 bg-zinc-900/50">
                <div className="mb-8">
                  <div className="text-sm font-medium text-zinc-400 mb-2">Enterprise</div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-5xl font-bold">Custom</span>
                  </div>
                  <p className="text-sm text-zinc-500">For large orgs</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 text-sm text-zinc-400">
                    <Check className="h-4 w-4" />
                    Everything in Pro
                  </li>
                  <li className="flex items-center gap-3 text-sm text-zinc-400">
                    <Check className="h-4 w-4" />
                    White-label
                  </li>
                  <li className="flex items-center gap-3 text-sm text-zinc-400">
                    <Check className="h-4 w-4" />
                    API access
                  </li>
                  <li className="flex items-center gap-3 text-sm text-zinc-400">
                    <Check className="h-4 w-4" />
                    Dedicated support
                  </li>
                </ul>
                <Button variant="outline" className="w-full border-white/10 hover:bg-white/5" asChild>
                  <Link href="/dashboard">Contact sales</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              Ready to build?
            </h2>
            <p className="text-xl text-zinc-400 mb-10">
              Join the future of customer data
            </p>
            <Button size="lg" className="bg-white text-black hover:bg-zinc-200 h-12 px-8 font-medium shadow-lg shadow-white/20" asChild>
              <Link href="/dashboard">
                Get started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/5 px-6 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-12 mb-12">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <svg width="20" height="20" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M28.7 0H12.8L0 12.8V28.7L12.8 41.5H28.7L41.5 28.7V12.8L28.7 0ZM15 28.9L6.80002 20.7L15 12.5C18.1 9.4 23.2 9.4 26.3 12.5L34.5 20.7L26.3 28.9C23.2 32 18.2 32 15 28.9Z" fill="white"/>
                  </svg>
                  <span className="font-semibold text-sm tracking-wide" style={{ fontFamily: 'var(--font-geist-sans)' }}>Ownbase</span>
                </div>
                <p className="text-xs text-zinc-600">
                  Customer data, customer owned.
                </p>
              </div>
              <div>
                <div className="text-xs font-medium mb-4 text-zinc-400">Product</div>
                <ul className="space-y-2.5 text-xs text-zinc-600">
                  <li><a href="#features" className="hover:text-white transition">Features</a></li>
                  <li><a href="#pricing" className="hover:text-white transition">Pricing</a></li>
                  <li><a href="#" className="hover:text-white transition">Docs</a></li>
                </ul>
              </div>
              <div>
                <div className="text-xs font-medium mb-4 text-zinc-400">Company</div>
                <ul className="space-y-2.5 text-xs text-zinc-600">
                  <li><a href="#" className="hover:text-white transition">About</a></li>
                  <li><a href="#" className="hover:text-white transition">Blog</a></li>
                </ul>
              </div>
              <div>
                <div className="text-xs font-medium mb-4 text-zinc-400">Legal</div>
                <ul className="space-y-2.5 text-xs text-zinc-600">
                  <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                  <li><a href="#" className="hover:text-white transition">Terms</a></li>
                </ul>
              </div>
            </div>
            <div className="pt-8 border-t border-white/5 flex items-center justify-between">
              <p className="text-xs text-zinc-600">© 2025 Ownbase. Built on Polkadot.</p>
              <div className="text-[10px] text-zinc-700 tracking-wider uppercase">Hackathon Project</div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
