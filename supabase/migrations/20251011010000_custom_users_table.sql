-- Create our own custom users table since we're using a shared Supabase instance
-- We can't rely on auth.users being exclusive to our app

-- Custom users table for our app
CREATE TABLE IF NOT EXISTS ownbase_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  company TEXT,

  -- Auth reference (optional - if they sign up via Supabase Auth)
  auth_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,

  -- Product preference
  preferred_product TEXT DEFAULT 'ethos',

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  CONSTRAINT valid_product CHECK (preferred_product IN ('myn', 'ethos', 'continuum'))
);

-- Index for lookups
CREATE INDEX idx_ownbase_users_email ON ownbase_users(email);
CREATE INDEX idx_ownbase_users_auth_id ON ownbase_users(auth_user_id);

-- Update trigger
CREATE TRIGGER update_ownbase_users_updated_at BEFORE UPDATE ON ownbase_users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Drop old foreign key constraints that reference auth.users
ALTER TABLE ownbase_contacts DROP CONSTRAINT IF EXISTS ownbase_contacts_user_id_fkey;
ALTER TABLE ownbase_deals DROP CONSTRAINT IF EXISTS ownbase_deals_user_id_fkey;
ALTER TABLE ownbase_activities DROP CONSTRAINT IF EXISTS ownbase_activities_user_id_fkey;
ALTER TABLE ownbase_tasks DROP CONSTRAINT IF EXISTS ownbase_tasks_user_id_fkey;
ALTER TABLE ownbase_data_access_requests DROP CONSTRAINT IF EXISTS ownbase_data_access_requests_business_user_id_fkey;

-- Add new foreign key constraints that reference our custom users table
ALTER TABLE ownbase_contacts
  ADD CONSTRAINT ownbase_contacts_user_id_fkey
  FOREIGN KEY (user_id) REFERENCES ownbase_users(id) ON DELETE CASCADE;

ALTER TABLE ownbase_deals
  ADD CONSTRAINT ownbase_deals_user_id_fkey
  FOREIGN KEY (user_id) REFERENCES ownbase_users(id) ON DELETE CASCADE;

ALTER TABLE ownbase_activities
  ADD CONSTRAINT ownbase_activities_user_id_fkey
  FOREIGN KEY (user_id) REFERENCES ownbase_users(id) ON DELETE CASCADE;

ALTER TABLE ownbase_tasks
  ADD CONSTRAINT ownbase_tasks_user_id_fkey
  FOREIGN KEY (user_id) REFERENCES ownbase_users(id) ON DELETE CASCADE;

ALTER TABLE ownbase_data_access_requests
  ADD CONSTRAINT ownbase_data_access_requests_business_user_id_fkey
  FOREIGN KEY (business_user_id) REFERENCES ownbase_users(id) ON DELETE CASCADE;

-- Create a default demo user
INSERT INTO ownbase_users (email, name, company, preferred_product)
VALUES ('demo@continuum.app', 'Demo User', 'Continuum', 'ethos')
ON CONFLICT (email) DO NOTHING;
