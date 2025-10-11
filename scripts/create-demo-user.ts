import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function createDemoUser() {
  console.log('🔧 Creating demo user in Supabase Auth...')

  // Check if user already exists
  const { data: existingUsers, error: listError } = await supabase.auth.admin.listUsers()

  if (listError) {
    console.error('❌ Error listing users:', listError)
    process.exit(1)
  }

  const existingUser = existingUsers.users.find(u => u.email === 'demo@continuum.app')

  if (existingUser) {
    console.log('✅ Demo user already exists:', existingUser.id)
    console.log('📧 Email:', existingUser.email)
    console.log('🆔 ID:', existingUser.id)
    return
  }

  // Create the demo user with admin API
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

  // Create user profile
  const { error: profileError } = await supabase
    .from('ownbase_user_profiles')
    .insert({
      id: newUser.user.id,
      email: 'demo@continuum.app',
      full_name: 'Demo User'
    })

  if (profileError) {
    console.log('⚠️  Profile creation warning:', profileError.message)
    console.log('   (This is OK - trigger might have handled it)')
  } else {
    console.log('✅ User profile created!')
  }

  console.log('\n🎉 Demo user is ready for testing!')
  console.log('   Email: demo@continuum.app')
  console.log('   Password: demo123456')
}

createDemoUser().catch(console.error)
