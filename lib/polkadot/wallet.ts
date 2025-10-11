import { web3Accounts, web3Enable, web3FromAddress } from '@polkadot/extension-dapp'
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types'

export class PolkadotWallet {
  private static instance: PolkadotWallet
  private accounts: InjectedAccountWithMeta[] = []
  private selectedAccount: InjectedAccountWithMeta | null = null

  private constructor() {}

  static getInstance(): PolkadotWallet {
    if (!PolkadotWallet.instance) {
      PolkadotWallet.instance = new PolkadotWallet()
    }
    return PolkadotWallet.instance
  }

  async connect(): Promise<InjectedAccountWithMeta[]> {
    try {
      // Enable the extension
      const extensions = await web3Enable('Continuum')

      if (extensions.length === 0) {
        throw new Error('No Polkadot extension found. Please install Polkadot.js extension.')
      }

      // Get all accounts
      this.accounts = await web3Accounts()

      if (this.accounts.length === 0) {
        throw new Error('No accounts found. Please create an account in Polkadot.js extension.')
      }

      // Select first account by default
      this.selectedAccount = this.accounts[0]

      // Store in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem('polkadot_selected_account', this.selectedAccount.address)
      }

      return this.accounts
    } catch (error) {
      console.error('Failed to connect wallet:', error)
      throw error
    }
  }

  async disconnect(): Promise<void> {
    this.selectedAccount = null
    this.accounts = []
    if (typeof window !== "undefined") {
      localStorage.removeItem('polkadot_selected_account')
    }
  }

  async selectAccount(address: string): Promise<void> {
    const account = this.accounts.find(acc => acc.address === address)
    if (!account) {
      throw new Error('Account not found')
    }
    this.selectedAccount = account
    if (typeof window !== "undefined") {
      localStorage.setItem('polkadot_selected_account', address)
    }
  }

  getSelectedAccount(): InjectedAccountWithMeta | null {
    return this.selectedAccount
  }

  getAllAccounts(): InjectedAccountWithMeta[] {
    return this.accounts
  }

  async getInjector(address: string) {
    return await web3FromAddress(address)
  }

  isConnected(): boolean {
    return this.selectedAccount !== null
  }

  // Restore connection from localStorage
  async restoreConnection(): Promise<boolean> {
    try {
      if (typeof window === "undefined") return false
      const savedAddress = localStorage.getItem('polkadot_selected_account')
      if (!savedAddress) return false

      await this.connect()
      if (savedAddress && this.accounts.some(acc => acc.address === savedAddress)) {
        await this.selectAccount(savedAddress)
        return true
      }
      return false
    } catch {
      return false
    }
  }
}

export const polkadotWallet = PolkadotWallet.getInstance()
