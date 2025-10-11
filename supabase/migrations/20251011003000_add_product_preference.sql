-- Add product preference to user profiles
-- Tracks which product the user last used for better UX

ALTER TABLE public.ownbase_user_profiles
ADD COLUMN IF NOT EXISTS last_product TEXT DEFAULT 'ethos' CHECK (last_product IN ('myn', 'ethos', 'continuum'));

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_profiles_last_product ON public.ownbase_user_profiles(last_product);
