"use client"

import Link from "next/link"
import { GridBackground, SectionDivider } from "@/components/ui/plural"
import { ContinuumHeader } from "@/components/continuum-header"
import { ArrowLeft, Settings, Zap, Radio, AlertTriangle } from "lucide-react"

export default function SDKReference() {
  return (
    <GridBackground showCorners className="min-h-screen">
      <ContinuumHeader currentPage="docs" />

      <main className="pt-32 pb-16 px-8">
        <div className="max-w-[900px] mx-auto">
          <Link
            href="/continuum/docs"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-primary transition mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Documentation
          </Link>

          <h1 className="text-6xl font-light tracking-tight text-white mb-4">
            SDK Reference
          </h1>
          <p className="text-xl text-white/50 mb-16">
            Complete API reference for the Continuum TypeScript/JavaScript SDK
          </p>

          <SectionDivider label="Client Setup" />

          <div className="mt-12 space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <div className="h-10 w-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Settings className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-light text-white mb-4">Initialize the Client</h3>
                <p className="text-base text-white/60 mb-4">
                  Create a client instance to interact with Continuum contracts:
                </p>
              </div>
            </div>

            <div className="bg-black/40 border border-white/[0.08] rounded-lg p-6">
              <pre className="text-sm font-mono text-primary overflow-x-auto">
{`import { ContinuumClient } from '@continuum/sdk'

const client = new ContinuumClient({
  // Required: Network to connect to
  network: 'polkadot', // 'polkadot' | 'kusama' | 'westend'

  // Required: Your deployed contract address
  contract: '5EAK3BZNspnebxQeTGaiBUejfxq2ivnQzs9PJAqw4afkYuAv',

  // Optional: Custom RPC endpoint
  rpc: 'wss://rpc.polkadot.io',

  // Optional: Signer for transactions
  signer: keyring.addFromUri('//Alice'),

  // Optional: API key for rate limiting
  apiKey: process.env.CONTINUUM_API_KEY,
})`}
              </pre>
            </div>

            <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-6">
              <h4 className="text-lg text-white mb-3">Configuration Options</h4>
              <div className="space-y-3">
                <div>
                  <code className="text-primary font-mono">network</code>
                  <span className="text-white/40 ml-2">string</span>
                  <p className="text-sm text-white/60 mt-1">Target blockchain network</p>
                </div>
                <div>
                  <code className="text-primary font-mono">contract</code>
                  <span className="text-white/40 ml-2">string</span>
                  <p className="text-sm text-white/60 mt-1">Contract address on the network</p>
                </div>
                <div>
                  <code className="text-primary font-mono">rpc</code>
                  <span className="text-white/40 ml-2">string (optional)</span>
                  <p className="text-sm text-white/60 mt-1">Custom WebSocket RPC endpoint</p>
                </div>
                <div>
                  <code className="text-primary font-mono">signer</code>
                  <span className="text-white/40 ml-2">KeyringPair (optional)</span>
                  <p className="text-sm text-white/60 mt-1">Account for signing transactions</p>
                </div>
              </div>
            </div>
          </div>

          <SectionDivider label="Contract Interaction" className="mt-16" />

          <div className="mt-12 space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <div className="h-10 w-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-light text-white mb-4">Core Methods</h3>
                <p className="text-base text-white/60 mb-4">
                  Interact with the data access control contract:
                </p>
              </div>
            </div>

            <div className="space-y-8">
              {/* Request Access */}
              <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-6">
                <h4 className="text-xl text-white mb-4">requestAccess()</h4>
                <p className="text-sm text-white/60 mb-4">
                  Request access to customer data fields with payment
                </p>
                <div className="bg-black/40 border border-white/[0.08] rounded-lg p-4 mb-4">
                  <pre className="text-sm font-mono text-primary overflow-x-auto">
{`const request = await client.requestAccess({
  customer: '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty',
  fields: ['email', 'name', 'phone'],
  duration: 30, // days
  payment: '5.0' // DOT tokens
})

console.log('Request ID:', request.id)
console.log('Status:', request.status) // 'pending'`}
                  </pre>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-primary font-mono">customer</span>
                    <span className="text-white/40 ml-2">string</span>
                    <span className="text-white/60 ml-2">- Customer's Polkadot address</span>
                  </div>
                  <div>
                    <span className="text-primary font-mono">fields</span>
                    <span className="text-white/40 ml-2">string[]</span>
                    <span className="text-white/60 ml-2">- Data fields to request</span>
                  </div>
                  <div>
                    <span className="text-primary font-mono">duration</span>
                    <span className="text-white/40 ml-2">number</span>
                    <span className="text-white/60 ml-2">- Access duration in days</span>
                  </div>
                  <div>
                    <span className="text-primary font-mono">payment</span>
                    <span className="text-white/40 ml-2">string</span>
                    <span className="text-white/60 ml-2">- Payment amount in DOT</span>
                  </div>
                </div>
              </div>

              {/* Verify Access */}
              <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-6">
                <h4 className="text-xl text-white mb-4">verifyAccess()</h4>
                <p className="text-sm text-white/60 mb-4">
                  Check if a company has active access to a customer's data
                </p>
                <div className="bg-black/40 border border-white/[0.08] rounded-lg p-4 mb-4">
                  <pre className="text-sm font-mono text-primary overflow-x-auto">
{`const hasAccess = await client.verifyAccess({
  customer: '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty',
  company: '5DAAnrj7VHTznn2AWBemMuyBwZWs6FNFjdyVXUeYum3PTXFy',
  field: 'email'
})

if (hasAccess) {
  console.log('Access granted')
  const data = await client.getData('email')
}`}
                  </pre>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-primary font-mono">Returns</span>
                    <span className="text-white/40 ml-2">Promise&lt;boolean&gt;</span>
                    <span className="text-white/60 ml-2">- True if access is active and not expired</span>
                  </div>
                </div>
              </div>

              {/* Get Data */}
              <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-6">
                <h4 className="text-xl text-white mb-4">getData()</h4>
                <p className="text-sm text-white/60 mb-4">
                  Retrieve decrypted data field (requires active access)
                </p>
                <div className="bg-black/40 border border-white/[0.08] rounded-lg p-4 mb-4">
                  <pre className="text-sm font-mono text-primary overflow-x-auto">
{`try {
  const email = await client.getData('email')
  const name = await client.getData('name')

  console.log('Customer data:', { email, name })
} catch (error) {
  if (error.code === 'ACCESS_DENIED') {
    console.error('No active access grant')
  }
}`}
                  </pre>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 text-sm text-yellow-400/80">
                  <p className="font-medium mb-1">Note:</p>
                  <p>This method will throw an error if access has expired or been revoked.</p>
                </div>
              </div>

              {/* Revoke Access */}
              <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-6">
                <h4 className="text-xl text-white mb-4">revokeAccess()</h4>
                <p className="text-sm text-white/60 mb-4">
                  Revoke a company's access (customer only)
                </p>
                <div className="bg-black/40 border border-white/[0.08] rounded-lg p-4">
                  <pre className="text-sm font-mono text-primary overflow-x-auto">
{`await client.revokeAccess({
  company: '5DAAnrj7VHTznn2AWBemMuyBwZWs6FNFjdyVXUeYum3PTXFy'
})

console.log('Access revoked successfully')`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          <SectionDivider label="Event Listeners" className="mt-16" />

          <div className="mt-12 space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <div className="h-10 w-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Radio className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-light text-white mb-4">Subscribe to Events</h3>
                <p className="text-base text-white/60 mb-4">
                  Listen for real-time contract events:
                </p>
              </div>
            </div>

            <div className="bg-black/40 border border-white/[0.08] rounded-lg p-6">
              <pre className="text-sm font-mono text-primary overflow-x-auto">
{`// Listen for access requests
client.on('AccessRequested', (event) => {
  console.log('New request:', {
    company: event.company,
    customer: event.customer,
    fields: event.fields,
    payment: event.payment,
    requestId: event.requestId,
  })
})

// Listen for approvals
client.on('AccessApproved', (event) => {
  console.log('Access approved:', {
    company: event.company,
    customer: event.customer,
    expiresAt: event.expiresAt,
  })
})

// Listen for revocations
client.on('AccessRevoked', (event) => {
  console.log('Access revoked:', {
    company: event.company,
    customer: event.customer,
  })
})

// Remove listener
const listener = client.on('AccessRequested', handler)
client.off('AccessRequested', listener)`}
              </pre>
            </div>

            <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-6">
              <h4 className="text-lg text-white mb-3">Available Events</h4>
              <div className="space-y-2 text-sm text-white/60">
                <p><code className="text-primary font-mono">AccessRequested</code> - Company requests data access</p>
                <p><code className="text-primary font-mono">AccessApproved</code> - Customer approves request</p>
                <p><code className="text-primary font-mono">AccessRevoked</code> - Customer revokes access</p>
                <p><code className="text-primary font-mono">PaymentProcessed</code> - Payment completed</p>
              </div>
            </div>
          </div>

          <SectionDivider label="Error Handling" className="mt-16" />

          <div className="mt-12 space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <div className="h-10 w-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-light text-white mb-4">Handle Errors</h3>
                <p className="text-base text-white/60 mb-4">
                  Proper error handling ensures robust applications:
                </p>
              </div>
            </div>

            <div className="bg-black/40 border border-white/[0.08] rounded-lg p-6">
              <pre className="text-sm font-mono text-primary overflow-x-auto">
{`import { ContinuumError, ErrorCode } from '@continuum/sdk'

try {
  await client.requestAccess({
    customer: '5FHneW...',
    fields: ['email'],
    duration: 30,
    payment: '5.0'
  })
} catch (error) {
  if (error instanceof ContinuumError) {
    switch (error.code) {
      case ErrorCode.ACCESS_DENIED:
        console.error('Access denied')
        break
      case ErrorCode.INSUFFICIENT_BALANCE:
        console.error('Not enough DOT tokens')
        break
      case ErrorCode.REQUEST_EXPIRED:
        console.error('Request has expired')
        break
      case ErrorCode.NETWORK_ERROR:
        console.error('Network connection issue')
        break
      default:
        console.error('Unknown error:', error.message)
    }
  }
}`}
              </pre>
            </div>

            <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-6">
              <h4 className="text-lg text-white mb-3">Error Codes</h4>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <code className="text-primary font-mono">ACCESS_DENIED</code>
                    <p className="text-white/60 mt-1">No permission to access data</p>
                  </div>
                  <div>
                    <code className="text-primary font-mono">INSUFFICIENT_BALANCE</code>
                    <p className="text-white/60 mt-1">Not enough tokens for payment</p>
                  </div>
                  <div>
                    <code className="text-primary font-mono">REQUEST_EXPIRED</code>
                    <p className="text-white/60 mt-1">Access period has ended</p>
                  </div>
                  <div>
                    <code className="text-primary font-mono">NETWORK_ERROR</code>
                    <p className="text-white/60 mt-1">Connection or RPC issue</p>
                  </div>
                  <div>
                    <code className="text-primary font-mono">CONTRACT_ERROR</code>
                    <p className="text-white/60 mt-1">Contract execution failed</p>
                  </div>
                  <div>
                    <code className="text-primary font-mono">INVALID_INPUT</code>
                    <p className="text-white/60 mt-1">Invalid parameters provided</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-8">
            <h3 className="text-2xl font-light text-white mb-4">Next Steps</h3>
            <div className="space-y-3">
              <Link
                href="/continuum/docs/security"
                className="block text-base text-primary hover:text-primary/80 transition"
              >
                → Review Security Best Practices
              </Link>
              <Link
                href="/continuum/playground"
                className="block text-base text-primary hover:text-primary/80 transition"
              >
                → Try the SDK in the interactive Playground
              </Link>
              <Link
                href="/continuum/api-keys"
                className="block text-base text-primary hover:text-primary/80 transition"
              >
                → Generate your API key
              </Link>
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
