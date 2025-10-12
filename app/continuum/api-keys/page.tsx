"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { GridBackground, SectionDivider, ButtonPurple } from "@/components/ui/plural"
import { ContinuumHeader } from "@/components/continuum-header"
import { Key, Plus, Copy, Eye, EyeOff, Trash2, AlertCircle, Loader2, CheckCircle } from "lucide-react"
import { CreateApiKeyDialog } from "@/components/dialogs/create-api-key-dialog"
import {
  getApiKeys,
  revokeApiKey,
  formatRequestCount,
  formatTimeAgo,
  maskApiKey,
  type ApiKey
} from "@/lib/api/api-keys"
import { toast } from "sonner"

export default function ContinuumApiKeys() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [revokingKeyId, setRevokingKeyId] = useState<string | null>(null)
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set())
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null)

  useEffect(() => {
    loadApiKeys()
  }, [])

  async function loadApiKeys() {
    try {
      setIsLoading(true)
      const keys = await getApiKeys()
      setApiKeys(keys)
    } catch (error) {
      console.error('Failed to load API keys:', error)
      toast.error("Failed to load API keys")
    } finally {
      setIsLoading(false)
    }
  }

  async function handleRevoke(keyId: string, keyName: string) {
    if (!confirm(`Are you sure you want to revoke "${keyName}"? This action cannot be undone.`)) {
      return
    }

    try {
      setRevokingKeyId(keyId)
      await revokeApiKey(keyId)
      toast.success("API key revoked successfully")
      await loadApiKeys()
    } catch (error) {
      console.error('Failed to revoke API key:', error)
      toast.error("Failed to revoke API key")
    } finally {
      setRevokingKeyId(null)
    }
  }

  function toggleKeyVisibility(keyId: string) {
    setVisibleKeys(prev => {
      const newSet = new Set(prev)
      if (newSet.has(keyId)) {
        newSet.delete(keyId)
      } else {
        newSet.add(keyId)
      }
      return newSet
    })
  }

  async function handleCopy(keyHash: string, keyPrefix: string) {
    // We can't copy the full key as it's hashed in the database
    // We'll copy the key prefix for reference
    await navigator.clipboard.writeText(`${keyPrefix}•••••••••••••`)
    setCopiedKeyId(keyHash)
    toast.success("Key reference copied to clipboard")
    setTimeout(() => setCopiedKeyId(null), 2000)
  }

  return (
    <GridBackground showCorners className="min-h-screen">
      <ContinuumHeader currentPage="api-keys" />

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
            <ButtonPurple
              className="h-12 px-6 text-base"
              onClick={() => setCreateDialogOpen(true)}
            >
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

          {isLoading ? (
            <div className="mt-16 flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-3 text-white/50">Loading API keys...</span>
            </div>
          ) : apiKeys.length === 0 ? (
            <div className="mt-16 text-center py-20">
              <Key className="h-16 w-16 mx-auto mb-4 text-white/20" />
              <p className="text-white/40 mb-4">No API keys yet</p>
              <ButtonPurple className="h-12 px-6 text-base" onClick={() => setCreateDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Key
              </ButtonPurple>
            </div>
          ) : (
            <div className="mt-16 space-y-6">
              {apiKeys.map((apiKey) => {
                const isVisible = visibleKeys.has(apiKey.id)
                const isRevoked = apiKey.status === 'revoked'
                const isRevoking = revokingKeyId === apiKey.id
                const isCopied = copiedKeyId === apiKey.key_hash

                return (
                <div
                  key={apiKey.id}
                  className={`bg-white/[0.03] border border-white/[0.08] rounded-lg p-8 transition-all ${
                    isRevoked ? 'opacity-50' : 'hover:bg-white/[0.05]'
                  }`}
                >
                  <div className="flex gap-8">
                    <div className="flex-shrink-0">
                      <div className={`h-16 w-16 rounded-full border flex items-center justify-center ${
                        isRevoked
                          ? 'bg-red-500/10 border-red-500/20'
                          : 'bg-primary/10 border-primary/20'
                      }`}>
                        <Key className={`h-8 w-8 ${isRevoked ? 'text-red-400' : 'text-primary'}`} />
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-light text-white mb-2">{apiKey.name}</h3>
                          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${
                            apiKey.status === 'active'
                              ? 'bg-green-500/10 border border-green-500/20'
                              : apiKey.status === 'inactive'
                              ? 'bg-yellow-500/10 border border-yellow-500/20'
                              : 'bg-red-500/10 border border-red-500/20'
                          }`}>
                            <div className={`h-1.5 w-1.5 rounded-full ${
                              apiKey.status === 'active'
                                ? 'bg-green-500'
                                : apiKey.status === 'inactive'
                                ? 'bg-yellow-500'
                                : 'bg-red-500'
                            }`} />
                            <span className={`text-xs uppercase tracking-[0.15em] ${
                              apiKey.status === 'active'
                                ? 'text-green-400'
                                : apiKey.status === 'inactive'
                                ? 'text-yellow-400'
                                : 'text-red-400'
                            }`}>
                              {apiKey.status}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-light text-primary">
                            {formatRequestCount(apiKey.requests_count)}
                          </div>
                          <div className="text-sm text-white/40">requests</div>
                        </div>
                      </div>

                      <div className="mb-6">
                        <p className="text-xs text-white/40 uppercase tracking-[0.15em] mb-2">API Key</p>
                        <div className="flex items-center gap-3">
                          <code className="flex-1 text-sm font-mono text-white/60 bg-black/40 px-4 py-3 rounded border border-white/[0.08]">
                            {isVisible ? apiKey.key_prefix : maskApiKey(apiKey.key_prefix + '••••••••••••••••••••••••')}
                          </code>
                          <button
                            onClick={() => handleCopy(apiKey.key_hash, apiKey.key_prefix)}
                            className="h-11 px-4 rounded-lg border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.05] text-white/60 hover:text-white transition-all"
                            title="Copy key reference"
                          >
                            {isCopied ? (
                              <CheckCircle className="h-4 w-4 text-green-400" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </button>
                          <button
                            onClick={() => toggleKeyVisibility(apiKey.id)}
                            className="h-11 px-4 rounded-lg border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.05] text-white/60 hover:text-white transition-all"
                            title={isVisible ? "Hide key" : "Show key"}
                          >
                            {isVisible ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                        <p className="mt-2 text-xs text-white/40">
                          The full key is only shown once during creation. This displays the key prefix for reference.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-6 mb-6">
                        <div>
                          <p className="text-xs text-white/40 uppercase tracking-[0.15em] mb-2">Created</p>
                          <p className="text-base text-white/60">
                            {new Date(apiKey.created_at).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-white/40 uppercase tracking-[0.15em] mb-2">Last Used</p>
                          <p className="text-base text-white/60">
                            {formatTimeAgo(apiKey.last_used_at)}
                          </p>
                        </div>
                      </div>

                      {!isRevoked && (
                        <button
                          onClick={() => handleRevoke(apiKey.id, apiKey.name)}
                          disabled={isRevoking}
                          className="h-10 px-6 text-sm rounded-lg border border-red-500/50 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isRevoking ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Revoking...
                            </>
                          ) : (
                            <>
                              <Trash2 className="h-4 w-4" />
                              Revoke Key
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
            </div>
          )}

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

      <CreateApiKeyDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSuccess={loadApiKeys}
      />
    </GridBackground>
  )
}
