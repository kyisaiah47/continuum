import { supabase } from '../supabase-client'
import crypto from 'crypto'

export type ApiKey = {
  id: string
  user_id: string
  name: string
  key_hash: string
  key_prefix: string
  last_used_at: string | null
  requests_count: number
  status: 'active' | 'inactive' | 'revoked'
  created_at: string
  updated_at: string
}

export type ApiKeyWithPlainKey = ApiKey & {
  plain_key: string
}

/**
 * Generate a secure API key
 */
function generateApiKey(prefix: string = 'ck_live'): { key: string; hash: string } {
  // Generate a random 32-byte key
  const randomBytes = crypto.randomBytes(32)
  const key = `${prefix}_${randomBytes.toString('hex')}`

  // Hash the key for storage
  const hash = crypto.createHash('sha256').update(key).digest('hex')

  return { key, hash }
}

/**
 * Get all API keys for the current user
 */
export async function getApiKeys(): Promise<ApiKey[]> {
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('User not authenticated')
  }

  const { data, error } = await supabase
    .from('ownbase_api_keys')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    throw error
  }

  return data || []
}

/**
 * Create a new API key
 */
export async function createApiKey(name: string, environment: 'live' | 'test' = 'live'): Promise<ApiKeyWithPlainKey> {
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('User not authenticated')
  }

  if (!name.trim()) {
    throw new Error('API key name is required')
  }

  // Generate the key
  const prefix = environment === 'live' ? 'ck_live' : 'ck_test'
  const { key, hash } = generateApiKey(prefix)
  const keyPrefix = key.substring(0, 8)

  // Store in database
  const { data, error } = await supabase
    .from('ownbase_api_keys')
    .insert([{
      user_id: user.id,
      name: name.trim(),
      key_hash: hash,
      key_prefix: keyPrefix,
      status: 'active',
      requests_count: 0
    }])
    .select()
    .single()

  if (error) {
    throw error
  }

  // Return the key with the plain text version (only time it's visible)
  return {
    ...data,
    plain_key: key
  }
}

/**
 * Update an API key's name or status
 */
export async function updateApiKey(
  keyId: string,
  updates: { name?: string; status?: 'active' | 'inactive' }
): Promise<ApiKey> {
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('User not authenticated')
  }

  const { data, error } = await supabase
    .from('ownbase_api_keys')
    .update(updates)
    .eq('id', keyId)
    .eq('user_id', user.id)
    .select()
    .single()

  if (error) {
    throw error
  }

  return data
}

/**
 * Revoke an API key (soft delete by setting status to revoked)
 */
export async function revokeApiKey(keyId: string): Promise<ApiKey> {
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('User not authenticated')
  }

  const { data, error } = await supabase
    .from('ownbase_api_keys')
    .update({ status: 'revoked' })
    .eq('id', keyId)
    .eq('user_id', user.id)
    .select()
    .single()

  if (error) {
    throw error
  }

  return data
}

/**
 * Delete an API key permanently
 */
export async function deleteApiKey(keyId: string): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('User not authenticated')
  }

  const { error } = await supabase
    .from('ownbase_api_keys')
    .delete()
    .eq('id', keyId)
    .eq('user_id', user.id)

  if (error) {
    throw error
  }
}

/**
 * Increment the request count for an API key (used internally)
 */
export async function incrementApiKeyUsage(keyId: string): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('User not authenticated')
  }

  const { error } = await supabase
    .from('ownbase_api_keys')
    .update({
      requests_count: supabase.rpc('increment', { x: 1 }) as any,
      last_used_at: new Date().toISOString()
    })
    .eq('id', keyId)
    .eq('user_id', user.id)

  if (error) {
    console.error('Failed to increment API key usage:', error)
  }
}

/**
 * Format request count with K/M suffix
 */
export function formatRequestCount(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(0)}K`
  }
  return count.toString()
}

/**
 * Format time ago
 */
export function formatTimeAgo(date: string | null): string {
  if (!date) return 'Never'

  const now = new Date()
  const past = new Date(date)
  const diffMs = now.getTime() - past.getTime()
  const diffSecs = Math.floor(diffMs / 1000)
  const diffMins = Math.floor(diffSecs / 60)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffDays > 0) {
    return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`
  } else if (diffHours > 0) {
    return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`
  } else if (diffMins > 0) {
    return `${diffMins} ${diffMins === 1 ? 'min' : 'mins'} ago`
  } else {
    return 'Just now'
  }
}

/**
 * Mask an API key for display
 */
export function maskApiKey(key: string): string {
  if (key.length < 16) return key
  const start = key.substring(0, 8)
  const end = key.substring(key.length - 4)
  return `${start}...${end}`
}
