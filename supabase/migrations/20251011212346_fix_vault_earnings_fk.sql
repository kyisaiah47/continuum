-- Fix foreign key constraints on vault and earnings to use ownbase_users instead of auth.users

-- Drop old foreign key constraints that reference auth.users
ALTER TABLE ownbase_data_vault DROP CONSTRAINT IF EXISTS ownbase_data_vault_user_id_fkey;
ALTER TABLE ownbase_earnings DROP CONSTRAINT IF EXISTS ownbase_earnings_user_id_fkey;
ALTER TABLE ownbase_earnings DROP CONSTRAINT IF EXISTS ownbase_earnings_business_user_id_fkey;

-- Add new foreign key constraints that reference our custom users table
ALTER TABLE ownbase_data_vault
  ADD CONSTRAINT ownbase_data_vault_user_id_fkey
  FOREIGN KEY (user_id) REFERENCES ownbase_users(id) ON DELETE CASCADE;

ALTER TABLE ownbase_earnings
  ADD CONSTRAINT ownbase_earnings_user_id_fkey
  FOREIGN KEY (user_id) REFERENCES ownbase_users(id) ON DELETE CASCADE;

ALTER TABLE ownbase_earnings
  ADD CONSTRAINT ownbase_earnings_business_user_id_fkey
  FOREIGN KEY (business_user_id) REFERENCES ownbase_users(id) ON DELETE SET NULL;
