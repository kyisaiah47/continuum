"use client"

import Link from "next/link"
import { GridBackground, SectionDivider, ButtonPurple } from "@/components/ui/plural"
import { MynHeader } from "@/components/myn-header"
import { Settings, Wallet, Bell, Shield, Eye } from "lucide-react"
import { useWallet } from "@/lib/polkadot/wallet-context"

export default function MynSettings() {
  const { account, connect, disconnect, isConnecting } = useWallet()

  // DEMO: Use hardcoded demo wallet if no wallet connected
  const demoWallet = {
    address: '5EAK3BZNspnebxQeTGaiBUejfxq2ivnQzs9PJAqw4afkYuAv',
    meta: { name: 'Demo Wallet' }
  }
  const displayWallet = account || demoWallet

  return (
    <GridBackground showCorners className="min-h-screen">
      <MynHeader currentPage="settings" />

      <main className="pt-32 pb-16 px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <h1 className="text-6xl font-light tracking-tight text-white mb-4">
              Settings
            </h1>
            <p className="text-xl text-white/50">
              Manage your privacy preferences and wallet connection
            </p>
          </div>

          {/* Wallet Settings */}
          <div className="mb-12">
            <h2 className="text-2xl font-light text-white mb-6 flex items-center gap-3">
              <Wallet className="h-6 w-6 text-primary" />
              Wallet Connection
            </h2>
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-8">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-base text-white mb-2">Connected Wallet</div>
                  <div className="space-y-2">
                    {displayWallet.meta.name && (
                      <div className="text-sm text-white/60">{displayWallet.meta.name}</div>
                    )}
                    <code className="text-sm font-mono text-primary bg-white/[0.03] px-3 py-1 rounded border border-white/[0.08] block">
                      {displayWallet.address}
                    </code>
                  </div>
                </div>
                {account && (
                  <button
                    onClick={disconnect}
                    className="px-6 py-2 rounded-lg border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.05] text-white/60 hover:text-white transition-all"
                  >
                    Disconnect
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="mb-12">
            <h2 className="text-2xl font-light text-white mb-6 flex items-center gap-3">
              <Shield className="h-6 w-6 text-primary" />
              Privacy & Permissions
            </h2>
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg divide-y divide-white/[0.05]">
              <div className="p-6 flex items-center justify-between">
                <div>
                  <div className="text-base text-white mb-1">Auto-approve requests</div>
                  <div className="text-sm text-white/40">Automatically approve requests from trusted companies</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-white/[0.08] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              <div className="p-6 flex items-center justify-between">
                <div>
                  <div className="text-base text-white mb-1">Require manual approval for high-value requests</div>
                  <div className="text-sm text-white/40">Requests above 10 DOT require manual review</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-white/[0.08] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              <div className="p-6 flex items-center justify-between">
                <div>
                  <div className="text-base text-white mb-1">Allow companies to see profile picture</div>
                  <div className="text-sm text-white/40">Companies can view your avatar when requesting access</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-white/[0.08] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="mb-12">
            <h2 className="text-2xl font-light text-white mb-6 flex items-center gap-3">
              <Bell className="h-6 w-6 text-primary" />
              Notifications
            </h2>
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg divide-y divide-white/[0.05]">
              <div className="p-6 flex items-center justify-between">
                <div>
                  <div className="text-base text-white mb-1">New access requests</div>
                  <div className="text-sm text-white/40">Get notified when companies request access to your data</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-white/[0.08] peer-focus:outline-none rounded-lg peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              <div className="p-6 flex items-center justify-between">
                <div>
                  <div className="text-base text-white mb-1">Payment received</div>
                  <div className="text-sm text-white/40">Notify when DOT payments are received to your wallet</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-white/[0.08] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              <div className="p-6 flex items-center justify-between">
                <div>
                  <div className="text-base text-white mb-1">Access expiring soon</div>
                  <div className="text-sm text-white/40">Get reminded 7 days before access grants expire</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-white/[0.08] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <ButtonPurple className="h-12 px-8 text-base">
              Save Settings
            </ButtonPurple>
          </div>
        </div>
      </main>

      <footer className="border-t border-white/[0.08] px-8 py-8">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <p className="text-xs text-white/30"> 2025 Continuum. Built on Polkadot.</p>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
            <span className="text-xs text-white/30">Wallet Connected</span>
          </div>
        </div>
      </footer>
    </GridBackground>
  )
}
