"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { GridBackground, SectionDivider, ButtonPurple } from "@/components/ui/plural"
import { MynHeader } from "@/components/myn-header"
import { Shield, Edit, Eye, EyeOff, Save, Loader2 } from "lucide-react"
import { getVaultData, bulkUpdateVaultFields, seedDefaultVaultFields, type VaultCategory } from "@/lib/api/vault"
import { toast } from "sonner"

export default function MynVault() {
  const [dataFields, setDataFields] = useState<VaultCategory[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const [editedFields, setEditedFields] = useState<Record<string, { field_value?: string; is_shared?: boolean }>>({})

  useEffect(() => {
    loadVaultData()
  }, [])

  async function loadVaultData() {
    try {
      setIsLoading(true)
      const data = await getVaultData()

      // If no data, seed default fields
      if (data.length === 0) {
        await seedDefaultVaultFields()
        const newData = await getVaultData()
        setDataFields(newData)
      } else {
        setDataFields(data)
      }
    } catch (error) {
      console.error("Failed to load vault data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  function handleFieldChange(fieldId: string, value: string) {
    setEditedFields(prev => ({
      ...prev,
      [fieldId]: { ...prev[fieldId], field_value: value }
    }))
    setHasChanges(true)
  }

  function handleSharedToggle(fieldId: string, currentShared: boolean) {
    setEditedFields(prev => ({
      ...prev,
      [fieldId]: { ...prev[fieldId], is_shared: !currentShared }
    }))
    setHasChanges(true)
  }

  async function handleSave() {
    try {
      setIsSaving(true)

      const updates = Object.entries(editedFields).map(([id, changes]) => ({
        id,
        ...changes
      }))

      await bulkUpdateVaultFields(updates)

      // Reload data
      await loadVaultData()
      setEditedFields({})
      setHasChanges(false)
      toast.success("Changes saved successfully")
    } catch (error) {
      console.error("Failed to save changes:", error)
      toast.error("Failed to save changes. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <GridBackground showCorners className="min-h-screen">
      <MynHeader currentPage="vault" />

      <main className="pt-32 pb-16 px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16 flex items-end justify-between">
            <div>
              <h1 className="text-6xl font-light tracking-tight text-white mb-4">
                Data Vault
              </h1>
              <p className="text-xl text-white/50">
                View and edit your encrypted personal data
              </p>
            </div>
            <ButtonPurple
              className="h-12 px-6 text-base"
              onClick={handleSave}
              disabled={!hasChanges || isSaving}
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </ButtonPurple>
          </div>

          <SectionDivider label="Your Data Fields" />

          {isLoading ? (
            <div className="mt-16 flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-3 text-white/50">Loading your data...</span>
            </div>
          ) : dataFields.length === 0 ? (
            <div className="mt-16 text-center py-20">
              <p className="text-white/50">No data fields found.</p>
            </div>
          ) : (
            <div className="mt-16 space-y-12">
              {dataFields.map((category, idx) => (
                <div key={idx}>
                  <h3 className="text-2xl font-light text-white mb-6">{category.category}</h3>
                  <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg divide-y divide-white/[0.05]">
                    {category.fields.map((field) => {
                      const currentValue = editedFields[field.id]?.field_value ?? field.field_value ?? ""
                      const currentShared = editedFields[field.id]?.is_shared ?? field.is_shared

                      return (
                        <div key={field.id} className="p-6 flex items-center gap-6 hover:bg-white/[0.02] transition-all group">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <label className="text-sm text-white/40 uppercase tracking-[0.15em]">
                                {field.field_name}
                              </label>
                              <button
                                onClick={() => handleSharedToggle(field.id, currentShared)}
                                className={`px-2 py-1 rounded border text-xs uppercase tracking-[0.15em] transition-all ${
                                  currentShared
                                    ? "bg-primary/10 border-primary/20 text-primary"
                                    : "bg-white/[0.02] border-white/[0.08] text-white/40 hover:border-white/20"
                                }`}
                              >
                                {currentShared ? (
                                  <>
                                    <Eye className="inline h-3 w-3 mr-1" />
                                    Shared
                                  </>
                                ) : (
                                  <>
                                    <EyeOff className="inline h-3 w-3 mr-1" />
                                    Private
                                  </>
                                )}
                              </button>
                            </div>
                            <input
                              type="text"
                              value={currentValue}
                              onChange={(e) => handleFieldChange(field.id, e.target.value)}
                              className="w-full bg-transparent border-none text-white text-lg focus:outline-none"
                              placeholder={`Enter ${field.field_name.toLowerCase()}`}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="border-t border-white/[0.08] px-8 py-8">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <p className="text-xs text-white/30">� 2025 Continuum. Built on Polkadot.</p>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
            <span className="text-xs text-white/30">Wallet Connected</span>
          </div>
        </div>
      </footer>
    </GridBackground>
  )
}
