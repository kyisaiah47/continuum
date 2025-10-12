"use client"

import { useState } from "react"
import Link from "next/link"
import { GridBackground, SectionDivider, ButtonPurple } from "@/components/ui/plural"
import { ContinuumHeader } from "@/components/continuum-header"
import { Box, Upload, Code, Settings, Eye, Trash2 } from "lucide-react"
import { DeployContractDialog } from "@/components/dialogs/deploy-contract-dialog"

export default function ContinuumContracts() {
  const [deployDialogOpen, setDeployDialogOpen] = useState(false)
  const contracts = [
    {
      id: 1,
      name: "DataAccessControl",
      version: "v2.1.0",
      address: "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
      deployed: "Jan 15, 2025",
      calls: "1.2M",
      status: "active"
    },
    {
      id: 2,
      name: "PaymentEscrow",
      version: "v1.8.3",
      address: "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty",
      deployed: "Dec 28, 2024",
      calls: "847K",
      status: "active"
    },
    {
      id: 3,
      name: "PrivacyVault",
      version: "v3.0.0-beta",
      address: "5DAAnrj7VHTznn2AWBemMuyBwZWs6FNFjdyVXUeYum3PTXFy",
      deployed: "Jan 20, 2025",
      calls: "234K",
      status: "testing"
    },
  ]

  return (
    <GridBackground showCorners className="min-h-screen">
      <ContinuumHeader currentPage="contracts" />

      <main className="pt-32 pb-16 px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16 flex items-end justify-between">
            <div>
              <h1 className="text-6xl font-light tracking-tight text-white mb-4">
                Smart Contracts
              </h1>
              <p className="text-xl text-white/50">
                Deploy and manage ink! contracts on Polkadot
              </p>
            </div>
            <ButtonPurple
              className="h-12 px-6 text-base"
              onClick={() => setDeployDialogOpen(true)}
            >
              <Upload className="mr-2 h-4 w-4" />
              Deploy Contract
            </ButtonPurple>
          </div>

          <SectionDivider label={`${contracts.length} Active Contracts`} />

          <div className="mt-16 space-y-6">
            {contracts.map((contract) => (
              <div
                key={contract.id}
                className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-8 hover:bg-white/[0.05] transition-all"
              >
                <div className="flex gap-8">
                  <div className="flex-shrink-0">
                    <div className="h-16 w-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <Box className="h-8 w-8 text-primary" />
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-2xl font-light text-white">{contract.name}</h3>
                          <span className="px-2 py-1 rounded bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-white/60">
                            {contract.version}
                          </span>
                        </div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                          <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                          <span className="text-xs text-green-400 uppercase tracking-[0.15em]">{contract.status}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-light text-primary">{contract.calls}</div>
                        <div className="text-sm text-white/40">total calls</div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <p className="text-xs text-white/40 uppercase tracking-[0.15em] mb-2">Contract Address</p>
                      <code className="text-sm font-mono text-white/60 bg-white/[0.03] px-3 py-1 rounded border border-white/[0.08]">
                        {contract.address}
                      </code>
                    </div>

                    <div className="mb-6">
                      <p className="text-xs text-white/40 uppercase tracking-[0.15em] mb-2">Deployed</p>
                      <p className="text-base text-white/60">{contract.deployed}</p>
                    </div>

                    <div className="flex gap-3">
                      <button className="h-10 px-6 text-sm rounded-lg border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.05] text-white/60 hover:text-white transition-all flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        View Details
                      </button>
                      <button className="h-10 px-6 text-sm rounded-lg border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.05] text-white/60 hover:text-white transition-all flex items-center gap-2">
                        <Code className="h-4 w-4" />
                        Interact
                      </button>
                      <button className="h-10 px-6 text-sm rounded-lg border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.05] text-white/60 hover:text-white transition-all flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        Configure
                      </button>
                      <button className="h-10 px-6 text-sm rounded-lg border border-red-500/50 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all flex items-center gap-2">
                        <Trash2 className="h-4 w-4" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Deploy Instructions */}
          <div className="mt-16 bg-white/[0.03] border border-white/[0.08] rounded-lg p-8">
            <h3 className="text-2xl font-light text-white mb-6">Deploy a New Contract</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-white/40 uppercase tracking-[0.15em] mb-2">Step 1: Compile</p>
                <code className="block bg-black/40 border border-white/[0.08] rounded px-4 py-3 text-sm font-mono text-primary">
                  cargo contract build --release
                </code>
              </div>
              <div>
                <p className="text-sm text-white/40 uppercase tracking-[0.15em] mb-2">Step 2: Deploy</p>
                <code className="block bg-black/40 border border-white/[0.08] rounded px-4 py-3 text-sm font-mono text-primary">
                  cargo contract instantiate --suri //Alice --constructor new
                </code>
              </div>
              <div>
                <p className="text-sm text-white/40 uppercase tracking-[0.15em] mb-2">Step 3: Upload</p>
                <p className="text-base text-white/60">Use the "Deploy Contract" button above to upload your .contract file</p>
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

      <DeployContractDialog
        open={deployDialogOpen}
        onOpenChange={setDeployDialogOpen}
        onSuccess={() => {
          // In a real implementation, this would reload contracts from the blockchain
          console.log("Contract deployed successfully")
        }}
      />
    </GridBackground>
  )
}
