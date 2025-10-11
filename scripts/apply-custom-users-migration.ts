#!/usr/bin/env tsx
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function applyMigration() {
  console.log('🔧 Applying custom users table migration...\n')

  const sql = readFileSync('supabase/migrations/20251011010000_custom_users_table.sql', 'utf-8')

  const { error } = await supabase.rpc('exec_sql', { sql_query: sql })

  if (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  }

  console.log('✅ Migration applied successfully!')
}

applyMigration()
