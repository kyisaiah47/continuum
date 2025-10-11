"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { ButtonPurple } from "@/components/ui/plural"
import { Loader2, Upload, FileCode, Wallet } from "lucide-react"
import { toast } from "sonner"

type DeployContractDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function DeployContractDialog({
  open,
  onOpenChange,
  onSuccess,
}: DeployContractDialogProps) {
  const [contractName, setContractName] = useState("")
  const [contractFile, setContractFile] = useState<File | null>(null)
  const [wasmFile, setWasmFile] = useState<File | null>(null)
  const [constructorArgs, setConstructorArgs] = useState("")
  const [isDeploying, setIsDeploying] = useState(false)
  const [deployedAddress, setDeployedAddress] = useState<string | null>(null)

  const handleContractFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.name.endsWith('.contract') && !file.name.endsWith('.json')) {
        toast.error("Please upload a .contract or .json file")
        return
      }
      setContractFile(file)
    }
  }

  const handleWasmFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.name.endsWith('.wasm')) {
        toast.error("Please upload a .wasm file")
        return
      }
      setWasmFile(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!contractName.trim()) {
      toast.error("Please enter a contract name")
      return
    }

    if (!contractFile) {
      toast.error("Please upload a contract metadata file")
      return
    }

    if (!wasmFile) {
      toast.error("Please upload a WASM file")
      return
    }

    try {
      setIsDeploying(true)

      // In a real implementation, this would:
      // 1. Read the contract metadata and WASM
      // 2. Connect to Polkadot wallet
      // 3. Deploy the contract using @polkadot/api-contract
      // 4. Return the deployed contract address

      // For now, simulate deployment
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Generate a mock contract address
      const mockAddress = `5${Math.random().toString(36).substring(2, 15).toUpperCase()}${Math.random().toString(36).substring(2, 15).toUpperCase()}`

      setDeployedAddress(mockAddress)
      toast.success("Contract deployed successfully!")

      // Reset form after a short delay
      setTimeout(() => {
        onOpenChange(false)
        onSuccess?.()
        resetForm()
      }, 2000)
    } catch (error) {
      console.error("Failed to deploy contract:", error)
      toast.error("Failed to deploy contract. Please try again.")
    } finally {
      setIsDeploying(false)
    }
  }

  const resetForm = () => {
    setContractName("")
    setContractFile(null)
    setWasmFile(null)
    setConstructorArgs("")
    setDeployedAddress(null)
  }

  return (
    <Dialog open={open} onOpenChange={(open) => {
      onOpenChange(open)
      if (!open) resetForm()
    }}>
      <DialogContent className="bg-[#0A0A0A] border-white/[0.08] text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-light">Deploy Smart Contract</DialogTitle>
          <p className="text-sm text-white/50 mt-2">
            Upload your compiled ink! contract to the Polkadot network
          </p>
        </DialogHeader>

        {deployedAddress ? (
          <div className="space-y-6 mt-4">
            <div className="p-8 rounded-lg bg-green-500/10 border border-green-500/20 text-center">
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                <FileCode className="h-8 w-8 text-green-400" />
              </div>
              <h3 className="text-xl font-light text-white mb-2">Contract Deployed!</h3>
              <p className="text-sm text-white/50 mb-4">Your contract has been successfully deployed to the network</p>

              <div className="mt-6 p-4 rounded-lg bg-white/[0.03] border border-white/[0.08]">
                <div className="text-xs text-white/40 uppercase tracking-[0.15em] mb-2">Contract Address</div>
                <code className="text-sm font-mono text-primary break-all">
                  {deployedAddress}
                </code>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            {/* Contract Name */}
            <div>
              <label className="text-xs text-white/40 uppercase tracking-[0.15em] mb-3 block">
                Contract Name
              </label>
              <input
                type="text"
                value={contractName}
                onChange={(e) => setContractName(e.target.value)}
                placeholder="e.g., DataAccessControl"
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 transition"
                required
              />
            </div>

            {/* Contract Metadata File */}
            <div>
              <label className="text-xs text-white/40 uppercase tracking-[0.15em] mb-3 block">
                <FileCode className="inline h-3 w-3 mr-2" />
                Contract Metadata (.contract or .json)
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept=".contract,.json"
                  onChange={handleContractFileChange}
                  className="hidden"
                  id="contract-file"
                />
                <label
                  htmlFor="contract-file"
                  className="flex items-center justify-center w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-8 text-white/60 hover:bg-white/[0.05] hover:border-primary/30 transition-all cursor-pointer"
                >
                  <div className="text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-primary" />
                    {contractFile ? (
                      <p className="text-sm text-white">{contractFile.name}</p>
                    ) : (
                      <>
                        <p className="text-sm">Click to upload contract metadata</p>
                        <p className="text-xs text-white/40 mt-1">Generated by cargo contract build</p>
                      </>
                    )}
                  </div>
                </label>
              </div>
            </div>

            {/* WASM File */}
            <div>
              <label className="text-xs text-white/40 uppercase tracking-[0.15em] mb-3 block">
                <FileCode className="inline h-3 w-3 mr-2" />
                WASM Binary (.wasm)
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept=".wasm"
                  onChange={handleWasmFileChange}
                  className="hidden"
                  id="wasm-file"
                />
                <label
                  htmlFor="wasm-file"
                  className="flex items-center justify-center w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-8 text-white/60 hover:bg-white/[0.05] hover:border-primary/30 transition-all cursor-pointer"
                >
                  <div className="text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-primary" />
                    {wasmFile ? (
                      <p className="text-sm text-white">{wasmFile.name}</p>
                    ) : (
                      <>
                        <p className="text-sm">Click to upload WASM binary</p>
                        <p className="text-xs text-white/40 mt-1">Compiled contract code</p>
                      </>
                    )}
                  </div>
                </label>
              </div>
            </div>

            {/* Constructor Arguments (optional) */}
            <div>
              <label className="text-xs text-white/40 uppercase tracking-[0.15em] mb-3 block">
                Constructor Arguments (optional)
              </label>
              <input
                type="text"
                value={constructorArgs}
                onChange={(e) => setConstructorArgs(e.target.value)}
                placeholder='e.g., ["arg1", "arg2"]'
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 transition font-mono text-sm"
              />
              <p className="mt-2 text-xs text-white/40">
                Leave empty if constructor takes no arguments
              </p>
            </div>

            {/* Info Box */}
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <div className="flex items-start gap-3">
                <Wallet className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-sm text-white/80">
                  <p className="mb-2">This will deploy your contract to the Polkadot Westend testnet.</p>
                  <p className="text-white/60">Make sure your wallet is connected and has sufficient balance for gas fees.</p>
                </div>
              </div>
            </div>

            <DialogFooter>
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="px-6 py-3 rounded-lg border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.05] text-white/60 hover:text-white transition-all"
                disabled={isDeploying}
              >
                Cancel
              </button>
              <ButtonPurple type="submit" disabled={isDeploying} className="px-6 py-3">
                {isDeploying ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deploying...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Deploy Contract
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
