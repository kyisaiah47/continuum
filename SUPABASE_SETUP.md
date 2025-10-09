# Supabase Setup Guide

This guide will help you set up Supabase for the Web3 CRM project.

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Choose an organization
5. Enter project details:
   - **Name**: web3-crm (or any name you prefer)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to you
   - **Pricing Plan**: Free tier is fine for development
6. Click "Create new project"
7. Wait for the project to be provisioned (~2 minutes)

## Step 2: Get Your API Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. You'll find:
   - **Project URL**: This is your `NEXT_PUBLIC_SUPABASE_URL`
   - **Project API keys**:
     - `anon` `public` key: This is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `service_role` key: This is your `SUPABASE_SERVICE_ROLE_KEY` (keep this secret!)

## Step 3: Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and replace with your actual values:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

   NEXT_PUBLIC_POLKADOT_NETWORK=westend
   NEXT_PUBLIC_CONTRACT_ADDRESS=your_contract_address

   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

## Step 4: Run Database Migrations

### Option A: Using Supabase Dashboard (Easiest)

1. Go to **SQL Editor** in your Supabase dashboard
2. Click **New query**
3. Copy the contents of `supabase/migrations/20251009000001_initial_schema.sql`
4. Paste into the SQL editor
5. Click **Run**
6. Repeat for `supabase/migrations/20251009000002_rls_policies.sql`

### Option B: Using Supabase CLI

1. Install Supabase CLI:
   ```bash
   npm install -g supabase
   ```

2. Login to Supabase:
   ```bash
   supabase login
   ```

3. Link your project:
   ```bash
   supabase link --project-ref your-project-ref
   ```
   (Find project ref in Settings → General)

4. Push migrations:
   ```bash
   supabase db push
   ```

## Step 5: Verify Database Setup

1. Go to **Table Editor** in Supabase dashboard
2. You should see these tables:
   - `contacts`
   - `deals`
   - `activities`
   - `tasks`
   - `data_access_requests`

3. Go to **Authentication** → **Policies**
4. Verify that RLS is enabled on all tables

## Step 6: Configure Authentication

1. Go to **Authentication** → **Providers**
2. Email provider should be enabled by default
3. For development, you can:
   - Disable email confirmation: **Authentication** → **Settings** → **Enable email confirmations** (toggle off)
   - This allows instant signup without waiting for confirmation emails

## Step 7: Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Go to `http://localhost:3000/signup`
3. Create a test account
4. You should be redirected to `/dashboard`
5. Check Supabase **Authentication** → **Users** to see your new user

## Troubleshooting

### "Invalid API key" error
- Double-check your `.env.local` file
- Make sure you copied the `anon` key, not the `service_role` key for `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Restart your dev server after changing `.env.local`

### Tables not found
- Make sure you ran both migration files
- Check **SQL Editor** → **History** to see if migrations ran successfully

### Can't sign up
- Check **Authentication** → **Settings**
- Make sure "Enable email confirmations" is OFF for development
- Or check your email for confirmation link

### RLS errors (can't read/write data)
- Make sure you're logged in
- Check that RLS policies were created (run migration 2)
- Verify in **Authentication** → **Policies**

## Next Steps

After setup is complete:
1. The authentication system is ready
2. Database tables are created
3. You can now implement CRUD operations
4. Start building the Web3 features!

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
