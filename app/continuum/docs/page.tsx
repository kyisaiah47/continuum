"use client"

import Link from "next/link"
import { GridBackground, SectionDivider, ButtonPurple } from "@/components/ui/plural"
import { ContinuumHeader } from "@/components/continuum-header"
import { FileCode, Book, Code, Terminal, Rocket, Shield } from "lucide-react"

export default function ContinuumDocs() {
  const guides = [
    {
      title: "Getting Started",
      icon: Rocket,
      description: "Set up your development environment and deploy your first contract",
      topics: ["Installation", "Project Setup", "First Contract", "Local Testing"]
    },
    {
      title: "Smart Contracts",
      icon: Code,
      description: "Write and deploy ink! smart contracts for privacy-preserving data access",
      topics: ["Contract Structure", "Storage & Events", "Cross-Contract Calls", "Upgrades"]
    },
    {
      title: "SDK Reference",
      icon: Terminal,
      description: "Complete API reference for the Continuum TypeScript/JavaScript SDK",
      topics: ["Client Setup", "Contract Interaction", "Event Listeners", "Error Handling"]
    },
    {
      title: "Security Best Practices",
      icon: Shield,
      description: "Learn how to build secure and auditable privacy infrastructure",
      topics: ["Access Control", "Input Validation", "Reentrancy Guards", "Testing"]
    },
  ]

  return (
    <GridBackground showCorners className="min-h-screen">
      <ContinuumHeader currentPage="docs" />

      <main className="pt-32 pb-16 px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <h1 className="text-6xl font-light tracking-tight text-white mb-4">
              Documentation
            </h1>
            <p className="text-xl text-white/50">
              Everything you need to build on Continuum
            </p>
          </div>

          <SectionDivider label="Developer Guides" />

          {/* Guide Cards */}
          <div className="mt-16 grid grid-cols-2 gap-6 mb-16">
            {guides.map((guide, i) => (
              <div
                key={i}
                className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-8 hover:bg-white/[0.05] transition-all group cursor-pointer"
              >
                <div className="flex items-start gap-6 mb-6">
                  <div className="h-12 w-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <guide.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-light text-white mb-2 group-hover:text-primary transition">
                      {guide.title}
                    </h3>
                    <p className="text-base text-white/50">{guide.description}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {guide.topics.map((topic, j) => (
                    <span
                      key={j}
                      className="px-3 py-1 rounded bg-white/[0.03] border border-white/[0.08] text-sm text-white/60"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <SectionDivider label="Quick Start" />

          {/* Code Examples */}
          <div className="mt-16 space-y-8">
            <div>
              <h3 className="text-2xl font-light text-white mb-4">Install the SDK</h3>
              <code className="block bg-black/40 border border-white/[0.08] rounded px-6 py-4 text-base font-mono text-primary">
                npm install @continuum/sdk
              </code>
            </div>

            <div>
              <h3 className="text-2xl font-light text-white mb-4">Initialize the Client</h3>
              <div className="bg-black/40 border border-white/[0.08] rounded px-6 py-4">
                <pre className="text-base font-mono text-primary">
{`import { ContinuumClient } from '@continuum/sdk'

const client = new ContinuumClient({
  network: 'polkadot',
  contract: '5EAK3BZNspnebxQeTGaiBUejfxq2ivnQzs9PJAqw4afkYuAv'
})`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-light text-white mb-4">Request Data Access</h3>
              <div className="bg-black/40 border border-white/[0.08] rounded px-6 py-4">
                <pre className="text-base font-mono text-primary">
{`const request = await client.requestAccess({
  customer: '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty',
  fields: ['email', 'name', 'phone'],
  duration: 30, // days
  payment: '5.0' // DOT
})

console.log('Request ID:', request.id)`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-light text-white mb-4">Verify Access</h3>
              <div className="bg-black/40 border border-white/[0.08] rounded px-6 py-4">
                <pre className="text-base font-mono text-primary">
{`const hasAccess = await client.verifyAccess({
  customer: '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty',
  company: '5DAAnrj7VHTznn2AWBemMuyBwZWs6FNFjdyVXUeYum3PTXFy',
  field: 'email'
})

if (hasAccess) {
  const data = await client.getData('email')
  console.log('Email:', data)
}`}
                </pre>
              </div>
            </div>
          </div>

          {/* Additional Resources */}
          <div className="mt-16 bg-white/[0.03] border border-white/[0.08] rounded-lg p-8">
            <h3 className="text-2xl font-light text-white mb-6">Additional Resources</h3>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Book className="h-5 w-5 text-primary" />
                  <h4 className="text-base text-white">API Reference</h4>
                </div>
                <p className="text-sm text-white/50">Complete API documentation</p>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <FileCode className="h-5 w-5 text-primary" />
                  <h4 className="text-base text-white">Example Projects</h4>
                </div>
                <p className="text-sm text-white/50">Sample applications and templates</p>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Terminal className="h-5 w-5 text-primary" />
                  <h4 className="text-base text-white">CLI Tools</h4>
                </div>
                <p className="text-sm text-white/50">Command-line utilities for developers</p>
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
