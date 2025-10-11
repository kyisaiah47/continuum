"use client"

import Link from "next/link"
import { GridBackground, SectionDivider, ButtonPurple } from "@/components/ui/plural"
import { ProductSwitcher } from "@/components/product-switcher"
import { Key, Plus, Copy, Eye, EyeOff, Trash2, AlertCircle } from "lucide-react"

export default function ContinuumApiKeys() {
  const apiKeys = [
    {
      id: 1,
      name: "Production API Key",
      key: "ck_live_a8f7e2b9c4d3f1e0a5b2c7d8e9f0a1b2",
      created: "Jan 15, 2025",
      lastUsed: "2 hours ago",
      requests: "1.2M",
      status: "active"
    },
    {
      id: 2,
      name: "Development API Key",
      key: "ck_test_d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8",
      created: "Jan 10, 2025",
      lastUsed: "1 day ago",
      requests: "45K",
      status: "active"
    },
    {
      id: 3,
      name: "Testing Environment",
      key: "ck_test_b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4",
      created: "Dec 28, 2024",
      lastUsed: "Never",
      requests: "0",
      status: "inactive"
    },
  ]

  return (
    <GridBackground showCorners className="min-h-screen">
      <header className="fixed top-0 w-full z-50 border-b border-white/[0.08] bg-background/80 backdrop-blur-xl">
        <div className="max-w-[1400px] mx-auto px-8 h-20 flex items-center justify-between">
          <ProductSwitcher />
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/continuum/dashboard" className="text-sm text-white/60 hover:text-white transition tracking-wide">Dashboard</Link>
            <Link href="/continuum/contracts" className="text-sm text-white/60 hover:text-white transition tracking-wide">Contracts</Link>
            <Link href="/continuum/explorer" className="text-sm text-white/60 hover:text-white transition tracking-wide">Explorer</Link>
            <Link href="/continuum/docs" className="text-sm text-white/60 hover:text-white transition tracking-wide">Docs</Link>
            <Link href="/continuum/playground" className="text-sm text-white/60 hover:text-white transition tracking-wide">Playground</Link>
            <div className="h-6 w-px bg-white/[0.08]" />
            <ButtonPurple className="h-9 px-5 text-sm" asChild>
              <Link href="/continuum/api-keys">API Keys</Link>
            </ButtonPurple>
          </nav>
        </div>
      </header>

      <main className="pt-32 pb-16 px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16 flex items-end justify-between">
            <div>
              <h1 className="text-6xl font-light tracking-tight text-white mb-4">
                API Keys
              </h1>
              <p className="text-xl text-white/50">
                Manage authentication keys for SDK access
              </p>
            </div>
            <ButtonPurple className="h-12 px-6 text-base">
              <Plus className="mr-2 h-4 w-4" />
              Create New Key
            </ButtonPurple>
          </div>

          {/* Security Warning */}
          <div className="mb-16 bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-6">
            <div className="flex gap-4">
              <AlertCircle className="h-6 w-6 text-yellow-400 flex-shrink-0" />
              <div>
                <h3 className="text-base font-medium text-yellow-400 mb-2">Keep your API keys secure</h3>
                <p className="text-sm text-yellow-400/80">
                  Never share your API keys publicly or commit them to version control. Treat them like passwords.
                </p>
              </div>
            </div>
          </div>

          <SectionDivider label={`${apiKeys.length} API Keys`} />

          <div className="mt-16 space-y-6">
            {apiKeys.map((apiKey) => (
              <div
                key={apiKey.id}
                className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-8 hover:bg-white/[0.05] transition-all"
              >
                <div className="flex gap-8">
                  <div className="flex-shrink-0">
                    <div className="h-16 w-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <Key className="h-8 w-8 text-primary" />
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-light text-white mb-2">{apiKey.name}</h3>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                          <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                          <span className="text-xs text-green-400 uppercase tracking-[0.15em]">{apiKey.status}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-light text-primary">{apiKey.requests}</div>
                        <div className="text-sm text-white/40">requests</div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <p className="text-xs text-white/40 uppercase tracking-[0.15em] mb-2">API Key</p>
                      <div className="flex items-center gap-3">
                        <code className="flex-1 text-sm font-mono text-white/60 bg-black/40 px-4 py-3 rounded border border-white/[0.08]">
                          {apiKey.key}
                        </code>
                        <button className="h-11 px-4 rounded-lg border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.05] text-white/60 hover:text-white transition-all">
                          <Copy className="h-4 w-4" />
                        </button>
                        <button className="h-11 px-4 rounded-lg border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.05] text-white/60 hover:text-white transition-all">
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div>
                        <p className="text-xs text-white/40 uppercase tracking-[0.15em] mb-2">Created</p>
                        <p className="text-base text-white/60">{apiKey.created}</p>
                      </div>
                      <div>
                        <p className="text-xs text-white/40 uppercase tracking-[0.15em] mb-2">Last Used</p>
                        <p className="text-base text-white/60">{apiKey.lastUsed}</p>
                      </div>
                    </div>

                    <button className="h-10 px-6 text-sm rounded-lg border border-red-500/50 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all flex items-center gap-2">
                      <Trash2 className="h-4 w-4" />
                      Revoke Key
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Usage Example */}
          <div className="mt-16 bg-white/[0.03] border border-white/[0.08] rounded-lg p-8">
            <h3 className="text-2xl font-light text-white mb-6">Using Your API Key</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-white/40 uppercase tracking-[0.15em] mb-2">Environment Variable</p>
                <code className="block bg-black/40 border border-white/[0.08] rounded px-4 py-3 text-sm font-mono text-primary">
                  CONTINUUM_API_KEY=ck_live_a8f7e2b9c4d3f1e0a5b2c7d8e9f0a1b2
                </code>
              </div>
              <div>
                <p className="text-sm text-white/40 uppercase tracking-[0.15em] mb-2">SDK Initialization</p>
                <div className="bg-black/40 border border-white/[0.08] rounded px-4 py-3">
                  <pre className="text-sm font-mono text-primary">
{`import { ContinuumClient } from '@continuum/sdk'

const client = new ContinuumClient({
  apiKey: process.env.CONTINUUM_API_KEY,
  network: 'polkadot'
})`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

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
