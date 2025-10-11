-- Create API Keys table
CREATE TABLE IF NOT EXISTS ownbase_api_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  key_hash TEXT NOT NULL UNIQUE,
  key_prefix TEXT NOT NULL, -- First 8 characters for display
  last_used_at TIMESTAMPTZ,
  requests_count INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'revoked')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on user_id for faster lookups
CREATE INDEX idx_api_keys_user_id ON ownbase_api_keys(user_id);

-- Create index on key_hash for authentication
CREATE INDEX idx_api_keys_key_hash ON ownbase_api_keys(key_hash);

-- Enable RLS
ALTER TABLE ownbase_api_keys ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Users can only see their own API keys
CREATE POLICY "Users can view own API keys"
  ON ownbase_api_keys FOR SELECT
  USING (auth.uid() = user_id);

-- Users can create their own API keys
CREATE POLICY "Users can create own API keys"
  ON ownbase_api_keys FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own API keys
CREATE POLICY "Users can update own API keys"
  ON ownbase_api_keys FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own API keys
CREATE POLICY "Users can delete own API keys"
  ON ownbase_api_keys FOR DELETE
  USING (auth.uid() = user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_api_keys_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER update_api_keys_updated_at_trigger
  BEFORE UPDATE ON ownbase_api_keys
  FOR EACH ROW
  EXECUTE FUNCTION update_api_keys_updated_at();
