import { createClient } from '@/lib/supabase/client'
import bcrypt from 'bcryptjs'

export interface User {
  id: string
  email: string
  name: string | null
  company: string | null
  preferred_product: string | null
}

export interface SignupData {
  email: string
  password: string
  name?: string
  company?: string
}

export interface LoginData {
  email: string
  password: string
}

/**
 * Sign up a new user
 */
export async function signup(data: SignupData): Promise<{ user: User | null; error: string | null }> {
  const supabase = createClient()

  try {
    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('ownbase_users')
      .select('id')
      .eq('email', data.email)
      .single()

    if (existingUser) {
      return { user: null, error: 'User with this email already exists' }
    }

    // Hash password
    const passwordHash = await bcrypt.hash(data.password, 10)

    // Create user
    const { data: newUser, error } = await supabase
      .from('ownbase_users')
      .insert({
        email: data.email,
        password_hash: passwordHash,
        name: data.name || null,
        company: data.company || null,
        preferred_product: 'ethos'
      })
      .select()
      .single()

    if (error) {
      console.error('Signup error:', error)
      return { user: null, error: error.message }
    }

    // Create session
    await createSession(newUser.id)

    return {
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        company: newUser.company,
        preferred_product: newUser.preferred_product
      },
      error: null
    }
  } catch (error: any) {
    console.error('Signup error:', error)
    return { user: null, error: error.message || 'Failed to sign up' }
  }
}

/**
 * Log in an existing user
 */
export async function login(data: LoginData): Promise<{ user: User | null; error: string | null }> {
  const supabase = createClient()

  try {
    // Get user by email
    const { data: user, error } = await supabase
      .from('ownbase_users')
      .select('id, email, name, company, preferred_product, password_hash')
      .eq('email', data.email)
      .single()

    if (error || !user) {
      return { user: null, error: 'Invalid email or password' }
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(data.password, user.password_hash)

    if (!passwordMatch) {
      return { user: null, error: 'Invalid email or password' }
    }

    // Create session
    await createSession(user.id)

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        company: user.company,
        preferred_product: user.preferred_product
      },
      error: null
    }
  } catch (error: any) {
    console.error('Login error:', error)
    return { user: null, error: error.message || 'Failed to log in' }
  }
}

/**
 * Log out the current user
 */
export async function logout(): Promise<void> {
  // Clear the session cookie
  document.cookie = 'continuum_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC'

  // Redirect to home
  window.location.href = '/'
}

/**
 * Get the current user from session
 */
export async function getCurrentUser(): Promise<User | null> {
  const supabase = createClient()

  try {
    const userId = getSessionUserId()

    if (!userId) {
      return null
    }

    const { data: user, error } = await supabase
      .from('ownbase_users')
      .select('id, email, name, company, preferred_product')
      .eq('id', userId)
      .single()

    if (error || !user) {
      return null
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      company: user.company,
      preferred_product: user.preferred_product
    }
  } catch (error) {
    console.error('Get current user error:', error)
    return null
  }
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return !!getSessionUserId()
}

/**
 * Create a session cookie for the user
 */
function createSession(userId: string): void {
  // Create a session cookie that expires in 30 days
  const expiryDate = new Date()
  expiryDate.setDate(expiryDate.getDate() + 30)

  document.cookie = `continuum_session=${userId}; path=/; expires=${expiryDate.toUTCString()}; SameSite=Lax`
}

/**
 * Get the user ID from the session cookie
 */
export function getSessionUserId(): string | null {
  if (typeof document === 'undefined') {
    return null
  }

  const cookies = document.cookie.split(';')
  const sessionCookie = cookies.find(cookie => cookie.trim().startsWith('continuum_session='))

  if (!sessionCookie) {
    return null
  }

  const userId = sessionCookie.split('=')[1]
  return userId || null
}

/**
 * Server-side function to get user ID from cookies
 */
export function getServerSessionUserId(cookieHeader: string | null): string | null {
  if (!cookieHeader) {
    return null
  }

  const cookies = cookieHeader.split(';')
  const sessionCookie = cookies.find(cookie => cookie.trim().startsWith('continuum_session='))

  if (!sessionCookie) {
    return null
  }

  const userId = sessionCookie.split('=')[1]
  return userId || null
}
