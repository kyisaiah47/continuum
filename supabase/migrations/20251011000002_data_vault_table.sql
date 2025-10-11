-- Data Vault Table for Myn
-- Stores encrypted personal data for users

-- ============================================
-- DATA VAULT TABLE
-- ============================================
CREATE TABLE ownbase_data_vault (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,

  -- Field Organization
  category TEXT NOT NULL,
  field_name TEXT NOT NULL,
  field_value TEXT,

  -- Sharing Status
  is_shared BOOLEAN DEFAULT false,
  shared_count INTEGER DEFAULT 0,

  -- Encryption (for future implementation)
  is_encrypted BOOLEAN DEFAULT false,
  encryption_key_id TEXT,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Constraints
  UNIQUE(user_id, category, field_name)
);

-- Indexes
CREATE INDEX idx_data_vault_user_id ON ownbase_data_vault(user_id);
CREATE INDEX idx_data_vault_category ON ownbase_data_vault(category);
CREATE INDEX idx_data_vault_shared ON ownbase_data_vault(is_shared);

-- Enable RLS
ALTER TABLE ownbase_data_vault ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own vault data" ON ownbase_data_vault
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own vault data" ON ownbase_data_vault
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own vault data" ON ownbase_data_vault
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own vault data" ON ownbase_data_vault
  FOR DELETE USING (auth.uid() = user_id);

-- Trigger for updated_at
CREATE TRIGGER update_data_vault_updated_at
  BEFORE UPDATE ON ownbase_data_vault
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- SEED DEFAULT VAULT FIELDS
-- ============================================

-- Function to seed default vault fields for new users
CREATE OR REPLACE FUNCTION seed_default_vault_fields(p_user_id UUID)
RETURNS VOID AS $$
BEGIN
  INSERT INTO ownbase_data_vault (user_id, category, field_name, field_value, is_shared)
  VALUES
    -- Personal Information
    (p_user_id, 'Personal Information', 'Full Name', '', false),
    (p_user_id, 'Personal Information', 'Email', '', false),
    (p_user_id, 'Personal Information', 'Phone', '', false),
    (p_user_id, 'Personal Information', 'Date of Birth', '', false),

    -- Professional
    (p_user_id, 'Professional', 'Company', '', false),
    (p_user_id, 'Professional', 'Job Title', '', false),
    (p_user_id, 'Professional', 'LinkedIn', '', false),

    -- Preferences
    (p_user_id, 'Preferences', 'Industry Interest', '', false),
    (p_user_id, 'Preferences', 'Budget Range', '', false),
    (p_user_id, 'Preferences', 'Decision Timeline', '', false)
  ON CONFLICT (user_id, category, field_name) DO NOTHING;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- EARNINGS TRACKING TABLE
-- ============================================
CREATE TABLE ownbase_earnings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,

  -- Transaction Details
  request_id UUID REFERENCES ownbase_data_access_requests(id) ON DELETE CASCADE,
  amount DECIMAL(10, 4) NOT NULL,
  currency TEXT DEFAULT 'DOT',

  -- Business Info
  business_name TEXT,
  business_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,

  -- Transaction
  transaction_hash TEXT,
  status TEXT DEFAULT 'pending',

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  paid_at TIMESTAMP WITH TIME ZONE,

  -- Constraints
  CONSTRAINT valid_status CHECK (status IN ('pending', 'completed', 'failed'))
);

-- Indexes
CREATE INDEX idx_earnings_user_id ON ownbase_earnings(user_id);
CREATE INDEX idx_earnings_request_id ON ownbase_earnings(request_id);
CREATE INDEX idx_earnings_status ON ownbase_earnings(status);
CREATE INDEX idx_earnings_created_at ON ownbase_earnings(created_at DESC);

-- Enable RLS
ALTER TABLE ownbase_earnings ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own earnings" ON ownbase_earnings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own earnings" ON ownbase_earnings
  FOR INSERT WITH CHECK (auth.uid() = user_id);
