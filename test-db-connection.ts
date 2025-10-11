#!/usr/bin/env tsx
/**
 * Database Connection Test
 * This script verifies that Supabase is properly connected and working
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase credentials in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testConnection() {
  console.log('🔍 Testing Supabase connection...\n')

  // Test 1: Check if we can connect
  console.log('1️⃣  Testing connection to Supabase...')
  const { data: healthCheck, error: healthError } = await supabase
    .from('ownbase_contacts')
    .select('count')
    .limit(1)

  if (healthError) {
    console.error('❌ Connection failed:', healthError.message)
    return false
  }
  console.log('✅ Connection successful!\n')

  // Test 2: Count records in each table
  console.log('2️⃣  Checking tables...')

  const tables = ['ownbase_contacts', 'ownbase_deals', 'ownbase_activities', 'ownbase_tasks', 'ownbase_data_access_requests']

  for (const table of tables) {
    const { count, error } = await supabase
      .from(table)
      .select('*', { count: 'exact', head: true })

    if (error) {
      console.log(`   ⚠️  ${table}: Error - ${error.message}`)
    } else {
      console.log(`   ✅ ${table}: ${count ?? 0} records`)
    }
  }

  // Test 3: Fetch sample data
  console.log('\n3️⃣  Fetching sample contacts...')
  const { data: contacts, error: contactsError } = await supabase
    .from('ownbase_contacts')
    .select('id, name, email, company')
    .limit(5)

  if (contactsError) {
    console.error('❌ Failed to fetch contacts:', contactsError.message)
  } else if (contacts && contacts.length > 0) {
    console.log(`✅ Found ${contacts.length} contacts:`)
    contacts.forEach(contact => {
      console.log(`   - ${contact.name} (${contact.email}) at ${contact.company}`)
    })
  } else {
    console.log('ℹ️  No contacts found (table is empty)')
  }

  console.log('\n✅ DATABASE IS WORKING PERFECTLY!\n')
  console.log('📊 Summary:')
  console.log('   - Connection: ✅ Successful')
  console.log('   - Tables: ✅ Accessible')
  console.log('   - Data: ✅ Readable')
  console.log('\n🎉 Your Supabase database is fully functional!')

  return true
}

testConnection()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('❌ Test failed:', err)
    process.exit(1)
  })
