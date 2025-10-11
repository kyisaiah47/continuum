import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function setupDemoUser() {
  console.log('🔧 Setting up demo user in Supabase Auth...')

  // Check if user already exists
  const { data: existingUsers, error: listError } = await supabase.auth.admin.listUsers()

  if (listError) {
    console.error('❌ Error listing users:', listError)
    process.exit(1)
  }

  const existingUser = existingUsers.users.find(u => u.email === 'demo@continuum.app')

  if (existingUser) {
    console.log('✅ Demo user already exists in auth.users')
    console.log('🔑 Updating password to: demo123456')

    // Update the user's password
    const { data: updatedUser, error: updateError } = await supabase.auth.admin.updateUserById(
      existingUser.id,
      { password: 'demo123456' }
    )

    if (updateError) {
      console.error('❌ Error updating password:', updateError)
      process.exit(1)
    }

    console.log('✅ Password updated successfully!')
    console.log('📧 Email: demo@continuum.app')
    console.log('🔑 Password: demo123456')
    console.log('🆔 User ID:', existingUser.id)
    return
  }

  // Create the demo user with admin API
  console.log('📝 Creating new demo user in auth.users...')
  const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
    email: 'demo@continuum.app',
    password: 'demo123456',
    email_confirm: true, // Auto-confirm email
    user_metadata: {
      full_name: 'Demo User'
    }
  })

  if (createError) {
    console.error('❌ Error creating user:', createError)
    process.exit(1)
  }

  console.log('✅ Demo user created successfully!')
  console.log('📧 Email: demo@continuum.app')
  console.log('🔑 Password: demo123456')
  console.log('🆔 User ID:', newUser.user.id)

  // Update ownbase_users with the auth user ID
  const { error: updateOwnbaseError } = await supabase
    .from('ownbase_users')
    .update({ auth_user_id: newUser.user.id })
    .eq('email', 'demo@continuum.app')

  if (updateOwnbaseError) {
    console.log('⚠️  Could not link to ownbase_users:', updateOwnbaseError.message)
  } else {
    console.log('✅ Linked to ownbase_users table')
  }

  // Create user profile
  const { error: profileError } = await supabase
    .from('ownbase_user_profiles')
    .insert({
      id: newUser.user.id,
      email: 'demo@continuum.app',
      full_name: 'Demo User'
    })
    .select()

  if (profileError) {
    console.log('⚠️  Profile creation warning:', profileError.message)
    console.log('   (Profile might already exist from trigger)')
  } else {
    console.log('✅ User profile created!')
  }

  console.log('\n🎉 Demo user is ready for testing!')
  console.log('   Email: demo@continuum.app')
  console.log('   Password: demo123456')
}

setupDemoUser().catch(console.error)
