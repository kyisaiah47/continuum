import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function createDemoUser() {
  console.log('🔧 Creating demo user with password...')

  const demoEmail = 'demo@continuum.app'
  const demoPassword = 'demo123456'

  // Check if user already exists
  const { data: existingUser } = await supabase
    .from('ownbase_users')
    .select('id, email')
    .eq('email', demoEmail)
    .single()

  if (existingUser) {
    console.log('✅ Demo user already exists')
    console.log('🔑 Updating password...')

    // Hash password
    const passwordHash = await bcrypt.hash(demoPassword, 10)

    // Update password
    const { error } = await supabase
      .from('ownbase_users')
      .update({ password_hash: passwordHash })
      .eq('email', demoEmail)

    if (error) {
      console.error('❌ Error updating password:', error)
      process.exit(1)
    }

    console.log('✅ Password updated successfully!')
  } else {
    console.log('📝 Creating new demo user...')

    // Hash password
    const passwordHash = await bcrypt.hash(demoPassword, 10)

    // Create user
    const { data: newUser, error } = await supabase
      .from('ownbase_users')
      .insert({
        email: demoEmail,
        password_hash: passwordHash,
        name: 'Demo User',
        company: 'Continuum',
        preferred_product: 'ethos'
      })
      .select()
      .single()

    if (error) {
      console.error('❌ Error creating user:', error)
      process.exit(1)
    }

    console.log('✅ Demo user created successfully!')
    console.log('🆔 User ID:', newUser.id)
  }

  console.log('')
  console.log('🎉 Demo user is ready!')
  console.log('📧 Email: demo@continuum.app')
  console.log('🔑 Password: demo123456')
  console.log('')
  console.log('You can now log in at: http://localhost:3000/login')
}

createDemoUser().catch(console.error)
