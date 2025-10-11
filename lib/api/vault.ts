// Data Vault API Functions
import { createClient } from "@/lib/supabase/client"

export interface VaultField {
  id: string
  user_id: string
  category: string
  field_name: string
  field_value: string | null
  is_shared: boolean
  shared_count: number
  created_at: string
  updated_at: string
}

export interface VaultCategory {
  category: string
  fields: VaultField[]
}

// Get all vault data for the current user, organized by category
export async function getVaultData(): Promise<VaultCategory[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("ownbase_data_vault")
    .select("*")
    .order("category", { ascending: true })
    .order("field_name", { ascending: true })

  if (error) throw error

  // Group by category
  const categories: Record<string, VaultField[]> = {}

  data?.forEach((field) => {
    if (!categories[field.category]) {
      categories[field.category] = []
    }
    categories[field.category].push(field)
  })

  return Object.entries(categories).map(([category, fields]) => ({
    category,
    fields,
  }))
}

// Get a specific vault field
export async function getVaultField(fieldId: string): Promise<VaultField | null> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("ownbase_data_vault")
    .select("*")
    .eq("id", fieldId)
    .single()

  if (error) throw error
  return data
}

// Update a vault field value
export async function updateVaultField(
  fieldId: string,
  updates: Partial<Pick<VaultField, "field_value" | "is_shared">>
): Promise<VaultField> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("ownbase_data_vault")
    .update(updates)
    .eq("id", fieldId)
    .select()
    .single()

  if (error) throw error
  return data
}

// Bulk update vault fields
export async function bulkUpdateVaultFields(
  updates: Array<{ id: string; field_value?: string; is_shared?: boolean }>
): Promise<void> {
  const supabase = createClient()

  // Update each field individually (Supabase doesn't support bulk update with different values)
  const promises = updates.map(({ id, ...update }) =>
    supabase
      .from("ownbase_data_vault")
      .update(update)
      .eq("id", id)
  )

  const results = await Promise.all(promises)

  const errors = results.filter(r => r.error)
  if (errors.length > 0) {
    throw new Error(`Failed to update ${errors.length} fields`)
  }
}

// Create a new vault field
export async function createVaultField(
  field: Pick<VaultField, "category" | "field_name" | "field_value" | "is_shared">
): Promise<VaultField> {
  const supabase = createClient()

  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) throw new Error("Not authenticated")

  const { data, error } = await supabase
    .from("ownbase_data_vault")
    .insert({
      user_id: user.id,
      ...field,
    })
    .select()
    .single()

  if (error) throw error
  return data
}

// Delete a vault field
export async function deleteVaultField(fieldId: string): Promise<void> {
  const supabase = createClient()

  const { error } = await supabase
    .from("ownbase_data_vault")
    .delete()
    .eq("id", fieldId)

  if (error) throw error
}

// Initialize default vault fields for a new user
export async function seedDefaultVaultFields(): Promise<void> {
  const supabase = createClient()

  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) throw new Error("Not authenticated")

  const { error } = await supabase.rpc("seed_default_vault_fields", {
    p_user_id: user.id,
  })

  if (error) throw error
}

// Get fields that are currently shared
export async function getSharedFields(): Promise<VaultField[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("ownbase_data_vault")
    .select("*")
    .eq("is_shared", true)
    .order("category", { ascending: true })

  if (error) throw error
  return data || []
}

// Get vault statistics
export async function getVaultStats() {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("ownbase_data_vault")
    .select("is_shared, field_value")

  if (error) throw error

  const totalFields = data?.length || 0
  const sharedFields = data?.filter(f => f.is_shared).length || 0
  const filledFields = data?.filter(f => f.field_value && f.field_value.trim() !== "").length || 0
  const completionRate = totalFields > 0 ? Math.round((filledFields / totalFields) * 100) : 0

  return {
    totalFields,
    sharedFields,
    filledFields,
    completionRate,
  }
}
