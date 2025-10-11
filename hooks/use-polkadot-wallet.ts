import { useState, useEffect, useCallback } from 'react'
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types'
import { polkadotWallet } from '@/lib/polkadot/wallet'
import { toast } from 'sonner'

export function usePolkadotWallet() {
  const [accounts, setAccounts] = useState<InjectedAccountWithMeta[]>([])
  const [selectedAccount, setSelectedAccount] = useState<InjectedAccountWithMeta | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)

  // Restore connection on mount
  useEffect(() => {
    const restore = async () => {
      const restored = await polkadotWallet.restoreConnection()
      if (restored) {
        setAccounts(polkadotWallet.getAllAccounts())
        setSelectedAccount(polkadotWallet.getSelectedAccount())
        setIsConnected(true)
      }
    }
    restore()
  }, [])

  const connect = useCallback(async () => {
    setIsConnecting(true)
    try {
      const accs = await polkadotWallet.connect()
      setAccounts(accs)
      setSelectedAccount(polkadotWallet.getSelectedAccount())
      setIsConnected(true)
      toast.success('Wallet connected', {
        description: `Connected to ${accs.length} account(s)`
      })
      return accs
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to connect wallet'
      toast.error('Connection failed', {
        description: message
      })
      throw error
    } finally {
      setIsConnecting(false)
    }
  }, [])

  const disconnect = useCallback(async () => {
    await polkadotWallet.disconnect()
    setAccounts([])
    setSelectedAccount(null)
    setIsConnected(false)
    toast.success('Wallet disconnected')
  }, [])

  const selectAccount = useCallback(async (address: string) => {
    try {
      await polkadotWallet.selectAccount(address)
      setSelectedAccount(polkadotWallet.getSelectedAccount())
      toast.success('Account selected')
    } catch (error) {
      toast.error('Failed to select account')
      throw error
    }
  }, [])

  return {
    accounts,
    selectedAccount,
    isConnecting,
    isConnected,
    connect,
    disconnect,
    selectAccount
  }
}
