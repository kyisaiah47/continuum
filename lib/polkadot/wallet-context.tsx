"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { updateWalletAddress, clearWalletAddress } from "../api/user-profile"
import { toast } from "sonner"

type Account = {
  address: string
  meta: {
    name?: string
    source?: string
  }
}

interface WalletContextType {
  account: Account | null
  isConnecting: boolean
  error: string | null
  connect: () => Promise<void>
  disconnect: () => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<Account | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [walletModule, setWalletModule] = useState<any>(null)

  useEffect(() => {
    // Only run in browser environment
    if (typeof window !== "undefined") {
      loadWalletModule()
    }
  }, [])

  async function loadWalletModule() {
    try {
      const { polkadotWallet } = await import("./wallet")
      setWalletModule(polkadotWallet)
      // Try to restore connection after module is loaded
      const restored = await polkadotWallet.restoreConnection()
      if (restored) {
        const acc = polkadotWallet.getSelectedAccount()
        if (acc) {
          setAccount({
            address: acc.address,
            meta: acc.meta
          })
          // Sync wallet address to database
          try {
            await updateWalletAddress(acc.address)
          } catch (err) {
            console.error("Failed to sync wallet address to database:", err)
          }
        }
      }
    } catch (err) {
      console.error("Failed to load wallet module:", err)
    }
  }

  async function connect() {
    if (!walletModule) {
      setError("Wallet module not loaded")
      return
    }
    try {
      setIsConnecting(true)
      setError(null)
      await walletModule.connect()
      const acc = walletModule.getSelectedAccount()
      if (acc) {
        setAccount({
          address: acc.address,
          meta: acc.meta
        })
        // Sync wallet address to database
        try {
          await updateWalletAddress(acc.address)
          toast.success("Wallet connected and synced to your profile")
        } catch (err) {
          console.error("Failed to sync wallet address to database:", err)
          // Don't fail the connection if sync fails
          toast.success("Wallet connected")
        }
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to connect wallet"
      setError(message)
      toast.error(message)
      console.error("Wallet connection error:", err)
    } finally {
      setIsConnecting(false)
    }
  }

  async function disconnect() {
    if (!walletModule) return
    try {
      await walletModule.disconnect()
      setAccount(null)
      // Clear wallet address from database
      try {
        await clearWalletAddress()
        toast.success("Wallet disconnected")
      } catch (err) {
        console.error("Failed to clear wallet address from database:", err)
        toast.success("Wallet disconnected")
      }
    } catch (err) {
      console.error("Failed to disconnect wallet:", err)
      toast.error("Failed to disconnect wallet")
    }
  }

  return (
    <WalletContext.Provider value={{ account, isConnecting, error, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}
