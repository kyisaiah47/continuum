#!/usr/bin/env tsx
/**
 * Demo Data Seeder
 *
 * This script seeds the database with demo data for testing.
 * It will only work when you have a logged-in user session.
 *
 * Usage:
 *   1. Start the dev server: npm run dev
 *   2. Log in to the app in your browser
 *   3. Run this script: npx tsx scripts/seed-demo-data.ts
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials')
  console.error('   Please check your .env.local file')
  process.exit(1)
}

// Use service role to bypass RLS
const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function seedData() {
  console.log('🌱 Seeding demo data...\n')

  // Get the first user (you'll need to be signed up first)
  const { data: users, error: userError } = await supabase.auth.admin.listUsers()

  if (userError || !users || users.users.length === 0) {
    console.error('❌ No users found. Please sign up first in the app.')
    process.exit(1)
  }

  const userId = users.users[0].id
  console.log(`✅ Found user: ${users.users[0].email}`)
  console.log(`   User ID: ${userId}\n`)

  // Create contacts
  console.log('📇 Creating contacts...')
  const { data: contacts, error: contactsError } = await supabase
    .from('ownbase_contacts')
    .insert([
      {
        user_id: userId,
        name: 'Alice Johnson',
        email: 'alice@example.com',
        phone: '+1 (555) 123-4567',
        company: 'TechCorp Inc.',
        job_title: 'CTO',
        wallet_address: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
        has_wallet: true,
        tags: ['vip', 'tech'],
        notes: 'Early adopter of Web3 technologies'
      },
      {
        user_id: userId,
        name: 'Bob Smith',
        email: 'bob@startup.io',
        phone: '+1 (555) 234-5678',
        company: 'StartupHub',
        job_title: 'CEO',
        wallet_address: '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty',
        has_wallet: true,
        tags: ['startup', 'founder'],
        notes: 'Looking to integrate blockchain into their platform'
      },
      {
        user_id: userId,
        name: 'Carol Williams',
        email: 'carol@enterprise.com',
        phone: '+1 (555) 345-6789',
        company: 'Enterprise Solutions',
        job_title: 'VP of Engineering',
        has_wallet: false,
        tags: ['enterprise'],
        notes: 'Interested in privacy-preserving data solutions'
      },
      {
        user_id: userId,
        name: 'David Chen',
        email: 'david@crypto.finance',
        phone: '+1 (555) 456-7890',
        company: 'CryptoFinance',
        job_title: 'Head of Product',
        wallet_address: '5DAAnrj7VHTznn2AWBemMuyBwZWs6FNFjdyVXUeYum3PTXFy',
        has_wallet: true,
        tags: ['crypto', 'finance'],
        notes: 'Building DeFi products on Polkadot'
      },
      {
        user_id: userId,
        name: 'Emma Davis',
        email: 'emma@devconsulting.dev',
        phone: '+1 (555) 567-8901',
        company: 'Dev Consulting',
        job_title: 'Smart Contract Developer',
        wallet_address: '5HGjWAeFDfFCWPsjFQdVV2Msvz2XtMktvgocEZcCj68kUMaw',
        has_wallet: true,
        tags: ['developer', 'ink'],
        notes: 'Expert in ink! smart contract development'
      }
    ])
    .select()

  if (contactsError) {
    console.error('❌ Failed to create contacts:', contactsError)
    process.exit(1)
  }
  console.log(`✅ Created ${contacts!.length} contacts\n`)

  // Create deals
  console.log('💼 Creating deals...')
  const { data: deals, error: dealsError } = await supabase
    .from('ownbase_deals')
    .insert([
      {
        user_id: userId,
        contact_id: contacts![0].id, // Alice
        title: 'Enterprise Data Access License',
        value: 50000,
        currency: 'USD',
        stage: 'proposal',
        status: 'open',
        probability: 75,
        expected_close_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        notes: 'Negotiating terms for annual enterprise license'
      },
      {
        user_id: userId,
        contact_id: contacts![1].id, // Bob
        title: 'Startup Package - 100 Users',
        value: 5000,
        currency: 'USD',
        stage: 'negotiation',
        status: 'open',
        probability: 60,
        expected_close_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        notes: 'Startup discount applied, reviewing contract'
      },
      {
        user_id: userId,
        contact_id: contacts![3].id, // David
        title: 'DeFi Integration Services',
        value: 25000,
        currency: 'USD',
        stage: 'demo',
        status: 'open',
        probability: 50,
        notes: 'Scheduled demo for next week'
      },
      {
        user_id: userId,
        contact_id: contacts![2].id, // Carol
        title: 'Privacy Consulting',
        value: 15000,
        currency: 'USD',
        stage: 'qualified',
        status: 'open',
        probability: 40,
        notes: 'Initial discovery call completed'
      },
      {
        user_id: userId,
        contact_id: contacts![4].id, // Emma
        title: 'Smart Contract Audit',
        value: 8000,
        currency: 'USD',
        stage: 'closed',
        status: 'won',
        probability: 100,
        closed_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        notes: 'Successfully completed audit, payment received in DOT'
      }
    ])
    .select()

  if (dealsError) {
    console.error('❌ Failed to create deals:', dealsError)
    process.exit(1)
  }
  console.log(`✅ Created ${deals!.length} deals\n`)

  // Create activities
  console.log('📝 Creating activities...')
  const { data: activities, error: activitiesError } = await supabase
    .from('ownbase_activities')
    .insert([
      {
        user_id: userId,
        contact_id: contacts![0].id,
        deal_id: deals![0].id,
        type: 'call',
        title: 'Discovery Call',
        description: 'Discussed enterprise requirements and data privacy needs',
        activity_date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        user_id: userId,
        contact_id: contacts![0].id,
        deal_id: deals![0].id,
        type: 'email',
        title: 'Sent Proposal',
        description: 'Sent detailed proposal with pricing and implementation timeline',
        activity_date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        user_id: userId,
        contact_id: contacts![1].id,
        deal_id: deals![1].id,
        type: 'meeting',
        title: 'Product Demo',
        description: 'Demonstrated platform features and Web3 capabilities',
        activity_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        user_id: userId,
        contact_id: contacts![4].id,
        deal_id: deals![4].id,
        type: 'note',
        title: 'Project Completed',
        description: 'Audit completed successfully. Client very happy with results.',
        activity_date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
      }
    ])
    .select()

  if (activitiesError) {
    console.error('❌ Failed to create activities:', activitiesError)
  } else {
    console.log(`✅ Created ${activities!.length} activities\n`)
  }

  // Create tasks
  console.log('✅ Creating tasks...')
  const { data: tasks, error: tasksError } = await supabase
    .from('ownbase_tasks')
    .insert([
      {
        user_id: userId,
        contact_id: contacts![0].id,
        deal_id: deals![0].id,
        title: 'Follow up on proposal',
        description: 'Check if Alice has reviewed the proposal',
        due_date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        priority: 'high',
        completed: false
      },
      {
        user_id: userId,
        contact_id: contacts![1].id,
        deal_id: deals![1].id,
        title: 'Send contract for signature',
        description: 'Prepare and send final contract to Bob',
        due_date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        priority: 'high',
        completed: false
      },
      {
        user_id: userId,
        contact_id: contacts![3].id,
        deal_id: deals![2].id,
        title: 'Prepare demo environment',
        description: 'Set up demo instance for David\'s team',
        due_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        priority: 'medium',
        completed: false
      },
      {
        user_id: userId,
        contact_id: contacts![4].id,
        title: 'Send thank you note',
        description: 'Thank Emma for the successful collaboration',
        due_date: new Date().toISOString().split('T')[0],
        priority: 'low',
        completed: true,
        completed_at: new Date().toISOString()
      }
    ])
    .select()

  if (tasksError) {
    console.error('❌ Failed to create tasks:', tasksError)
  } else {
    console.log(`✅ Created ${tasks!.length} tasks\n`)
  }

  // Create data access requests
  console.log('🔐 Creating data access requests...')
  const { data: accessRequests, error: accessError } = await supabase
    .from('ownbase_data_access_requests')
    .insert([
      {
        business_user_id: userId,
        customer_wallet: contacts![0].wallet_address,
        customer_name: contacts![0].name,
        requested_fields: ['email', 'phone', 'company', 'job_title'],
        access_duration_days: 30,
        payment_amount: 5.0,
        payment_currency: 'DOT',
        status: 'approved',
        approved_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        expires_at: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString(),
        transaction_hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
      },
      {
        business_user_id: userId,
        customer_wallet: contacts![1].wallet_address,
        customer_name: contacts![1].name,
        requested_fields: ['email', 'phone'],
        access_duration_days: 90,
        payment_amount: 10.0,
        payment_currency: 'DOT',
        status: 'pending',
      },
      {
        business_user_id: userId,
        customer_wallet: contacts![4].wallet_address,
        customer_name: contacts![4].name,
        requested_fields: ['email', 'phone', 'company'],
        access_duration_days: 60,
        payment_amount: 7.5,
        payment_currency: 'DOT',
        status: 'approved',
        approved_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        expires_at: new Date(Date.now() + 50 * 24 * 60 * 60 * 1000).toISOString(),
        transaction_hash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890'
      }
    ])
    .select()

  if (accessError) {
    console.error('❌ Failed to create access requests:', accessError)
  } else {
    console.log(`✅ Created ${accessRequests!.length} data access requests\n`)
  }

  console.log('✅ SEEDING COMPLETE!\n')
  console.log('📊 Summary:')
  console.log(`   - Contacts: ${contacts!.length}`)
  console.log(`   - Deals: ${deals!.length}`)
  console.log(`   - Activities: ${activities?.length || 0}`)
  console.log(`   - Tasks: ${tasks?.length || 0}`)
  console.log(`   - Access Requests: ${accessRequests?.length || 0}`)
  console.log('\n🎉 Your app is now ready to use!')
  console.log('\n👉 Go to http://localhost:3005 and log in to see your data!')
}

seedData()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('❌ Seeding failed:', err)
    process.exit(1)
  })
