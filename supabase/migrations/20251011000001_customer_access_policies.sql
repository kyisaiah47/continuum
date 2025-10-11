-- Customer Access Request Policies
-- Allow customers to view and approve/reject their own access requests

-- ============================================
-- CUSTOMER USER PROFILES (for wallet linking)
-- ============================================

-- Add wallet_address to user profiles if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'ownbase_user_profiles'
    AND column_name = 'wallet_address'
  ) THEN
    ALTER TABLE ownbase_user_profiles
    ADD COLUMN wallet_address TEXT UNIQUE;
  END IF;
END $$;

-- Index for wallet lookups
CREATE INDEX IF NOT EXISTS idx_user_profiles_wallet
ON ownbase_user_profiles(wallet_address);

-- ============================================
-- CUSTOMER ACCESS REQUEST POLICIES
-- ============================================

-- Customers can view requests for their wallet address
CREATE POLICY "Customers can view their own access requests"
ON ownbase_data_access_requests
FOR SELECT
USING (
  customer_wallet IN (
    SELECT wallet_address
    FROM ownbase_user_profiles
    WHERE id = auth.uid()
  )
);

-- Customers can update status of their requests (approve/reject)
CREATE POLICY "Customers can approve/reject their requests"
ON ownbase_data_access_requests
FOR UPDATE
USING (
  customer_wallet IN (
    SELECT wallet_address
    FROM ownbase_user_profiles
    WHERE id = auth.uid()
  )
)
WITH CHECK (
  -- Can only update status and approval timestamp
  customer_wallet IN (
    SELECT wallet_address
    FROM ownbase_user_profiles
    WHERE id = auth.uid()
  )
);

-- ============================================
-- HELPER FUNCTIONS
-- ============================================

-- Function to get user's wallet address
CREATE OR REPLACE FUNCTION get_user_wallet()
RETURNS TEXT AS $$
  SELECT wallet_address
  FROM ownbase_user_profiles
  WHERE id = auth.uid()
  LIMIT 1;
$$ LANGUAGE SQL STABLE;

-- Function to check if user owns a wallet
CREATE OR REPLACE FUNCTION owns_wallet(wallet TEXT)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1
    FROM ownbase_user_profiles
    WHERE id = auth.uid()
    AND wallet_address = wallet
  );
$$ LANGUAGE SQL STABLE SECURITY DEFINER;
