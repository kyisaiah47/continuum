-- User Profiles Table
-- This table stores additional user information beyond auth.users

CREATE TABLE IF NOT EXISTS public.ownbase_user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on user profiles
ALTER TABLE public.ownbase_user_profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own profile" ON public.ownbase_user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.ownbase_user_profiles;

-- Policy: Users can view their own profile
CREATE POLICY "Users can view own profile"
  ON public.ownbase_user_profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON public.ownbase_user_profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Function to create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.ownbase_user_profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  -- If anything fails, just continue - don't block user creation
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-create profile on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update trigger for user profiles
DROP TRIGGER IF EXISTS update_ownbase_user_profiles_updated_at ON public.ownbase_user_profiles;
CREATE TRIGGER update_ownbase_user_profiles_updated_at
  BEFORE UPDATE ON public.ownbase_user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
