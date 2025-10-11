"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { ButtonPurple } from "@/components/ui/plural"
import { Loader2, Key, Copy, CheckCircle } from "lucide-react"
import { createApiKey, type ApiKeyWithPlainKey } from "@/lib/api/api-keys"
import { toast } from "sonner"

type CreateApiKeyDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function CreateApiKeyDialog({
  open,
  onOpenChange,
  onSuccess,
}: CreateApiKeyDialogProps) {
  const [name, setName] = useState("")
  const [environment, setEnvironment] = useState<'live' | 'test'>('live')
  const [isCreating, setIsCreating] = useState(false)
  const [createdKey, setCreatedKey] = useState<ApiKeyWithPlainKey | null>(null)
  const [copied, setCopied] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      toast.error("Please enter a key name")
      return
    }

    try {
      setIsCreating(true)
      const newKey = await createApiKey(name.trim(), environment)
      setCreatedKey(newKey)
      toast.success("API key created successfully")
    } catch (error) {
      console.error("Failed to create API key:", error)
      toast.error("Failed to create API key. Please try again.")
    } finally {
      setIsCreating(false)
    }
  }

  const handleCopy = async () => {
    if (createdKey) {
      await navigator.clipboard.writeText(createdKey.plain_key)
      setCopied(true)
      toast.success("API key copied to clipboard")
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleClose = () => {
    onOpenChange(false)
    onSuccess?.()
    // Reset form after a short delay
    setTimeout(() => {
      setName("")
      setEnvironment('live')
      setCreatedKey(null)
      setCopied(false)
    }, 300)
  }

  return (
    <Dialog open={open} onOpenChange={(open) => {
      if (!open) handleClose()
    }}>
      <DialogContent className="bg-[#0A0A0A] border-white/[0.08] text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-light">
            {createdKey ? "API Key Created" : "Create New API Key"}
          </DialogTitle>
          <p className="text-sm text-white/50 mt-2">
            {createdKey
              ? "Make sure to copy your API key now. You won't be able to see it again!"
              : "Generate a new API key for SDK authentication"}
          </p>
        </DialogHeader>

        {createdKey ? (
          <div className="space-y-6 mt-4">
            <div className="p-8 rounded-lg bg-green-500/10 border border-green-500/20 text-center">
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                <Key className="h-8 w-8 text-green-400" />
              </div>
              <h3 className="text-xl font-light text-white mb-2">Your API Key</h3>
              <p className="text-sm text-white/50 mb-6">
                Copy this key and store it securely. This is the only time you'll see the full key.
              </p>

              <div className="p-4 rounded-lg bg-black/40 border border-white/[0.08] mb-4">
                <code className="text-sm font-mono text-primary break-all">
                  {createdKey.plain_key}
                </code>
              </div>

              <ButtonPurple
                onClick={handleCopy}
                className="w-full h-12 text-base font-medium"
              >
                {copied ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy API Key
                  </>
                )}
              </ButtonPurple>
            </div>

            <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
              <div className="text-sm text-yellow-400/80">
                <p className="mb-2 font-medium">Important:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Store this key securely - you won't see it again</li>
                  <li>Never share or commit this key to version control</li>
                  <li>Treat it like a password</li>
                </ul>
              </div>
            </div>

            <DialogFooter>
              <ButtonPurple
                onClick={handleClose}
                className="w-full h-12 text-base font-medium"
              >
                Done
              </ButtonPurple>
            </DialogFooter>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            {/* Key Name */}
            <div>
              <label className="text-xs text-white/40 uppercase tracking-[0.15em] mb-3 block">
                Key Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Production API Key"
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 transition"
                required
                autoFocus
              />
              <p className="mt-2 text-xs text-white/40">
                Give your key a descriptive name to identify it later
              </p>
            </div>

            {/* Environment */}
            <div>
              <label className="text-xs text-white/40 uppercase tracking-[0.15em] mb-3 block">
                Environment
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setEnvironment('live')}
                  className={`p-4 rounded-lg border transition-all ${
                    environment === 'live'
                      ? 'bg-primary/10 border-primary/50 text-white'
                      : 'bg-white/[0.03] border-white/[0.08] text-white/60 hover:bg-white/[0.05]'
                  }`}
                >
                  <div className="text-base font-medium mb-1">Production</div>
                  <div className="text-xs text-white/40">For live applications</div>
                </button>
                <button
                  type="button"
                  onClick={() => setEnvironment('test')}
                  className={`p-4 rounded-lg border transition-all ${
                    environment === 'test'
                      ? 'bg-primary/10 border-primary/50 text-white'
                      : 'bg-white/[0.03] border-white/[0.08] text-white/60 hover:bg-white/[0.05]'
                  }`}
                >
                  <div className="text-base font-medium mb-1">Testing</div>
                  <div className="text-xs text-white/40">For development</div>
                </button>
              </div>
            </div>

            <DialogFooter>
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="px-6 py-3 rounded-lg border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.05] text-white/60 hover:text-white transition-all"
                disabled={isCreating}
              >
                Cancel
              </button>
              <ButtonPurple type="submit" disabled={isCreating} className="px-6 py-3">
                {isCreating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Key className="mr-2 h-4 w-4" />
                    Create API Key
                  </>
                )}
              </ButtonPurple>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
