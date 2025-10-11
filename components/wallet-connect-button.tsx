"use client"

import { useState } from "react"
import { usePolkadotWallet } from "@/hooks/use-polkadot-wallet"
import { ButtonPurple } from "./ui/plural"
import { Wallet, ChevronDown, Check, LogOut } from "lucide-react"

export function WalletConnectButton() {
  const { accounts, selectedAccount, isConnecting, isConnected, connect, disconnect, selectAccount } = usePolkadotWallet()
  const [isOpen, setIsOpen] = useState(false)

  const handleConnect = async () => {
    try {
      await connect()
    } catch (error) {
      console.error('Connection error:', error)
    }
  }

  const handleDisconnect = async () => {
    await disconnect()
    setIsOpen(false)
  }

  if (!isConnected) {
    return (
      <ButtonPurple
        onClick={handleConnect}
        disabled={isConnecting}
        className="h-10 px-6"
      >
        <Wallet className="mr-2 h-4 w-4" />
        {isConnecting ? 'Connecting...' : 'Connect Wallet'}
      </ButtonPurple>
    )
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-10 px-4 rounded-lg border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.05] transition-all flex items-center gap-3"
      >
        <div className="h-2 w-2 rounded-full bg-green-500" />
        <span className="text-sm text-white font-mono">
          {selectedAccount ? formatAddress(selectedAccount.address) : 'No account'}
        </span>
        <ChevronDown className={`h-4 w-4 text-white/40 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-80 bg-[#1a1f2e] border border-white/[0.08] rounded-lg shadow-2xl z-50 overflow-hidden">
            <div className="p-4 border-b border-white/[0.08]">
              <p className="text-xs text-white/40 uppercase tracking-[0.15em] mb-2">Connected Accounts</p>
            </div>

            <div className="max-h-64 overflow-y-auto">
              {accounts.map((account) => {
                const isSelected = selectedAccount?.address === account.address

                return (
                  <button
                    key={account.address}
                    onClick={() => {
                      selectAccount(account.address)
                      setIsOpen(false)
                    }}
                    className={`w-full px-4 py-3 hover:bg-white/[0.03] transition-all flex items-center gap-3 ${
                      isSelected ? 'bg-white/[0.05]' : ''
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
                    )}
                    <div className="flex-1 text-left">
                      <div className="text-sm text-white mb-1">{account.meta.name || 'Unnamed'}</div>
                      <div className="text-xs font-mono text-white/40">{formatAddress(account.address)}</div>
                    </div>
                    {isSelected && (
                      <Check className="h-4 w-4 text-primary" />
                    )}
                  </button>
                )
              })}
            </div>

            <div className="p-4 border-t border-white/[0.08]">
              <button
                onClick={handleDisconnect}
                className="w-full h-10 px-4 rounded-lg border border-red-500/50 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all flex items-center justify-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Disconnect
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
