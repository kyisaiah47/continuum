-- Remove the trigger approach since DB is shared
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;

-- Instead, add an INSERT policy that allows the user to create their own profile
DROP POLICY IF EXISTS "Users can insert own profile" ON public.ownbase_user_profiles;
CREATE POLICY "Users can insert own profile"
  ON public.ownbase_user_profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);
