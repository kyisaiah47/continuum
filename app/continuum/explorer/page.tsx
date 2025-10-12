"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { GridBackground, SectionDivider, ButtonPurple } from "@/components/ui/plural"
import { ContinuumHeader } from "@/components/continuum-header"
import { Search, Box, Activity, ArrowRight, Clock, Loader2 } from "lucide-react"
import {
  getExplorerStats,
  getRecentBlocks,
  getRecentTransactions,
  type ExplorerStats,
  type BlockInfo,
  type TransactionInfo
} from "@/lib/api/blockchain-explorer"

export default function ContinuumExplorer() {
  const [stats, setStats] = useState<ExplorerStats | null>(null)
  const [recentBlocks, setRecentBlocks] = useState<BlockInfo[]>([])
  const [recentTxs, setRecentTxs] = useState<TransactionInfo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    loadExplorerData()

    // Auto-refresh every 30 seconds
    const interval = setInterval(loadExplorerData, 30000)
    return () => clearInterval(interval)
  }, [])

  async function loadExplorerData() {
    try {
      setIsLoading(true)
      const [statsData, blocksData, txsData] = await Promise.all([
        getExplorerStats(),
        getRecentBlocks(),
        getRecentTransactions()
      ])
      setStats(statsData)
      setRecentBlocks(blocksData)
      setRecentTxs(txsData)
    } catch (error) {
      console.error('Failed to load explorer data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    // Search functionality would go here
    console.log('Searching for:', searchQuery)
  }

  return (
    <GridBackground showCorners className="min-h-screen">
      <ContinuumHeader currentPage="explorer" />

      <main className="pt-32 pb-16 px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <h1 className="text-6xl font-light tracking-tight text-white mb-4">
              Blockchain Explorer
            </h1>
            <p className="text-xl text-white/50">
              Search blocks, transactions, and addresses
            </p>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-16">
            <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by block number, transaction hash, or address..."
                className="w-full h-16 pl-16 pr-6 bg-white/[0.03] border border-white/[0.08] rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-primary/50 transition"
              />
            </div>
          </form>

          {/* Stats */}
          {isLoading ? (
            <div className="mb-16 grid grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-6 flex items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ))}
            </div>
          ) : stats ? (
            <div className="mb-16 grid grid-cols-3 gap-6">
              <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Box className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-3xl font-light text-white">{stats.latestBlock}</div>
                    <div className="text-sm text-white/40">Latest Block</div>
                  </div>
                </div>
              </div>

              <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Activity className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-3xl font-light text-white">{stats.totalTransactions}</div>
                    <div className="text-sm text-white/40">Total Transactions</div>
                  </div>
                </div>
              </div>

              <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-3xl font-light text-white">{stats.avgBlockTime}</div>
                    <div className="text-sm text-white/40">Avg Block Time</div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          <SectionDivider label="Recent Blocks" />

          {/* Recent Blocks */}
          {isLoading ? (
            <div className="mt-16 flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-3 text-white/50">Loading blocks...</span>
            </div>
          ) : recentBlocks.length === 0 ? (
            <div className="mt-16 text-center py-20">
              <Box className="h-16 w-16 mx-auto mb-4 text-white/20" />
              <p className="text-white/40">No recent blocks</p>
            </div>
          ) : (
            <div className="mt-16 bg-white/[0.03] border border-white/[0.08] rounded-lg divide-y divide-white/[0.05] mb-16">
              {recentBlocks.map((block, i) => (
              <div key={i} className="p-6 hover:bg-white/[0.02] transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="h-12 w-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <Box className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-base text-white">Block {block.number}</span>
                        <code className="text-sm font-mono text-white/40 bg-white/[0.03] px-2 py-1 rounded border border-white/[0.08]">
                          {block.hash}
                        </code>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-white/40">
                        <span>{block.txs} transactions</span>
                        <span>•</span>
                        <span>Validator: {block.validator}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-white/40">{block.time}</div>
                  </div>
                </div>
              </div>
              ))}
            </div>
          )}

          <SectionDivider label="Recent Transactions" />

          {/* Recent Transactions */}
          {isLoading ? (
            <div className="mt-16 flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-3 text-white/50">Loading transactions...</span>
            </div>
          ) : recentTxs.length === 0 ? (
            <div className="mt-16 text-center py-20">
              <Activity className="h-16 w-16 mx-auto mb-4 text-white/20" />
              <p className="text-white/40">No recent transactions</p>
            </div>
          ) : (
            <div className="mt-16 bg-white/[0.03] border border-white/[0.08] rounded-lg divide-y divide-white/[0.05]">
              {recentTxs.map((tx, i) => (
                <div key={i} className="p-6 hover:bg-white/[0.02] transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <code className="text-sm font-mono text-primary bg-white/[0.03] px-2 py-1 rounded border border-white/[0.08]">
                      {tx.hash}
                    </code>
                    <div className={`px-3 py-1 rounded text-xs uppercase tracking-[0.15em] ${
                      tx.status === 'success' ? 'bg-green-500/10 border border-green-500/20 text-green-400' :
                      tx.status === 'pending' ? 'bg-yellow-500/10 border border-yellow-500/20 text-yellow-400' :
                      'bg-red-500/10 border border-red-500/20 text-red-400'
                    }`}>
                      {tx.status}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <code className="text-sm font-mono text-white/60">{tx.from}</code>
                    <ArrowRight className="h-4 w-4 text-white/40" />
                    <code className="text-sm font-mono text-white/60">{tx.to}</code>
                    <div className="ml-auto flex items-center gap-6">
                      <div className="text-lg font-light text-primary">{tx.value}</div>
                      <div className="text-sm text-white/40">{tx.time}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
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
