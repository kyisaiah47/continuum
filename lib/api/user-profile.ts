import { supabase } from '../supabase/client'
import { getSessionUserId } from "@/lib/api/auth"

export type UserProfile = {
  id: string
  email?: string
  full_name?: string
  avatar_url?: string
  wallet_address?: string
  created_at: string
  updated_at: string
}

export async function getUserProfile(): Promise<UserProfile | null> {
  const userId = getSessionUserId()
  if (!userId) throw new Error('Not authenticated')

  const { data, error } = await supabase
    .from('ownbase_user_profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    // If profile doesn't exist, return null
    if (error.code === 'PGRST116') {
      return null
    }
    throw error
  }

  return data as UserProfile
}

export async function updateWalletAddress(walletAddress: string): Promise<UserProfile> {
  const userId = getSessionUserId()
  if (!userId) throw new Error('Not authenticated')

  // Check if profile exists
  const existingProfile = await getUserProfile()

  if (existingProfile) {
    // Update existing profile
    const { data, error } = await supabase
      .from('ownbase_user_profiles')
      .update({
        wallet_address: walletAddress,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)
      .select()
      .single()

    if (error) throw error
    return data as UserProfile
  } else {
    // Create new profile
    const { data, error } = await supabase
      .from('ownbase_user_profiles')
      .insert([{
        id: userId,
        wallet_address: walletAddress
      }])
      .select()
      .single()

    if (error) throw error
    return data as UserProfile
  }
}

export async function updateUserProfile(updates: Partial<UserProfile>): Promise<UserProfile> {
  const userId = getSessionUserId()
  if (!userId) throw new Error('Not authenticated')

  const { data, error } = await supabase
    .from('ownbase_user_profiles')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', userId)
    .select()
    .single()

  if (error) throw error
  return data as UserProfile
}

export async function clearWalletAddress(): Promise<void> {
  const userId = getSessionUserId()
  if (!userId) throw new Error('Not authenticated')

  const { error} = await supabase
    .from('ownbase_user_profiles')
    .update({
      wallet_address: null,
      updated_at: new Date().toISOString()
    })
    .eq('id', userId)

  if (error) throw error
}
