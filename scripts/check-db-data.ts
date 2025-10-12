#!/usr/bin/env tsx
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''
const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function checkData() {
  const { data: user } = await supabase
    .from('ownbase_users')
    .select('*')
    .eq('email', 'demo@continuum.app')
    .single()

  console.log('User:', user?.email, user?.id)

  const { data: contacts } = await supabase
    .from('ownbase_contacts')
    .select('*')
    .eq('user_id', user.id)
  console.log('Contacts:', contacts?.length || 0)

  const { data: deals } = await supabase
    .from('ownbase_deals')
    .select('*')
    .eq('user_id', user.id)
  console.log('Deals:', deals?.length || 0)

  const { data: activities } = await supabase
    .from('ownbase_activities')
    .select('*')
    .eq('user_id', user.id)
  console.log('Activities:', activities?.length || 0)

  const { data: tasks } = await supabase
    .from('ownbase_tasks')
    .select('*')
    .eq('user_id', user.id)
  console.log('Tasks:', tasks?.length || 0)

  const { data: requests } = await supabase
    .from('ownbase_data_access_requests')
    .select('*')
    .eq('business_user_id', user.id)
  console.log('Data Access Requests:', requests?.length || 0)
}

checkData()
