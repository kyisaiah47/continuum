#!/usr/bin/env tsx
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''
const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function disableRLS() {
  console.log('🔓 Disabling RLS on all tables...\n')

  const tables = [
    'ownbase_contacts',
    'ownbase_deals',
    'ownbase_activities',
    'ownbase_tasks',
    'ownbase_data_access_requests'
  ]

  for (const table of tables) {
    const { error } = await supabase.rpc('exec_sql', {
      query: `ALTER TABLE ${table} DISABLE ROW LEVEL SECURITY;`
    })

    if (error) {
      console.error(`❌ Failed to disable RLS on ${table}:`, error)
    } else {
      console.log(`✅ Disabled RLS on ${table}`)
    }
  }

  console.log('\n✅ RLS disabled on all tables!')
}

disableRLS()
