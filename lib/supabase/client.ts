import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// Use placeholder values for build time if env vars are missing
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export function createClient() {
  return createSupabaseClient(supabaseUrl, supabaseAnonKey);
}

// Only create the client instance if we have real credentials
let supabaseInstance: ReturnType<typeof createClient> | null = null;

export const supabase = new Proxy({} as ReturnType<typeof createClient>, {
  get(target, prop) {
    if (!supabaseInstance) {
      supabaseInstance = createClient();
    }
    return (supabaseInstance as any)[prop];
  }
});
