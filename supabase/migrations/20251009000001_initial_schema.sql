-- Web3 CRM Database Schema
-- Initial migration for all tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- CONTACTS TABLE
-- ============================================
CREATE TABLE ownbase_contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,

  -- Basic Info
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  company TEXT,
  job_title TEXT,

  -- Web3 Fields
  wallet_address TEXT UNIQUE,
  has_wallet BOOLEAN DEFAULT false,
  data_access_expires_at TIMESTAMP WITH TIME ZONE,
  access_payment_amount DECIMAL(10, 2),

  -- Metadata
  tags TEXT[],
  notes TEXT,
  avatar_url TEXT,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for contacts
CREATE INDEX idx_ownbase_contacts_user_id ON ownbase_contacts(user_id);
CREATE INDEX idx_ownbase_contacts_wallet ON ownbase_contacts(wallet_address);
CREATE INDEX idx_ownbase_contacts_email ON ownbase_contacts(email);

-- ============================================
-- DEALS TABLE
-- ============================================
CREATE TABLE ownbase_deals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  contact_id UUID REFERENCES ownbase_contacts(id) ON DELETE SET NULL,

  -- Deal Info
  title TEXT NOT NULL,
  value DECIMAL(12, 2) NOT NULL,
  currency TEXT DEFAULT 'USD',

  -- Pipeline
  stage TEXT NOT NULL DEFAULT 'lead',
  status TEXT DEFAULT 'open',
  probability INTEGER DEFAULT 50 CHECK (probability >= 0 AND probability <= 100),

  -- Dates
  expected_close_date DATE,
  closed_at TIMESTAMP WITH TIME ZONE,

  -- Metadata
  notes TEXT,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Constraints
  CONSTRAINT valid_stage CHECK (stage IN ('lead', 'qualified', 'demo', 'proposal', 'negotiation', 'closed')),
  CONSTRAINT valid_status CHECK (status IN ('open', 'won', 'lost'))
);

-- Indexes for deals
CREATE INDEX idx_ownbase_deals_user_id ON ownbase_deals(user_id);
CREATE INDEX idx_ownbase_deals_contact_id ON ownbase_deals(contact_id);
CREATE INDEX idx_ownbase_deals_stage ON ownbase_deals(stage);
CREATE INDEX idx_ownbase_deals_status ON ownbase_deals(status);

-- ============================================
-- ACTIVITIES TABLE
-- ============================================
CREATE TABLE ownbase_activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  contact_id UUID REFERENCES ownbase_contacts(id) ON DELETE CASCADE,
  deal_id UUID REFERENCES ownbase_deals(id) ON DELETE CASCADE,

  -- Activity Info
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  activity_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Constraints
  CONSTRAINT valid_type CHECK (type IN ('call', 'email', 'meeting', 'note', 'task'))
);

-- Indexes for activities
CREATE INDEX idx_ownbase_activities_user_id ON ownbase_activities(user_id);
CREATE INDEX idx_ownbase_activities_contact_id ON ownbase_activities(contact_id);
CREATE INDEX idx_ownbase_activities_deal_id ON ownbase_activities(deal_id);
CREATE INDEX idx_ownbase_activities_date ON ownbase_activities(activity_date DESC);

-- ============================================
-- TASKS TABLE
-- ============================================
CREATE TABLE ownbase_tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  contact_id UUID REFERENCES ownbase_contacts(id) ON DELETE CASCADE,
  deal_id UUID REFERENCES ownbase_deals(id) ON DELETE CASCADE,

  -- Task Info
  title TEXT NOT NULL,
  description TEXT,
  due_date DATE,
  priority TEXT DEFAULT 'medium',
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Constraints
  CONSTRAINT valid_priority CHECK (priority IN ('low', 'medium', 'high'))
);

-- Indexes for tasks
CREATE INDEX idx_ownbase_tasks_user_id ON ownbase_tasks(user_id);
CREATE INDEX idx_ownbase_tasks_contact_id ON ownbase_tasks(contact_id);
CREATE INDEX idx_ownbase_tasks_deal_id ON ownbase_tasks(deal_id);
CREATE INDEX idx_ownbase_tasks_due_date ON ownbase_tasks(due_date);
CREATE INDEX idx_ownbase_tasks_completed ON ownbase_tasks(completed);

-- ============================================
-- DATA ACCESS REQUESTS TABLE (Web3)
-- ============================================
CREATE TABLE ownbase_data_access_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Parties
  business_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  customer_wallet TEXT NOT NULL,
  customer_name TEXT,

  -- Access Details
  requested_fields TEXT[] NOT NULL,
  access_duration_days INTEGER DEFAULT 30,
  payment_amount DECIMAL(10, 4) NOT NULL,
  payment_currency TEXT DEFAULT 'DOT',

  -- Status
  status TEXT DEFAULT 'pending',
  approved_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE,

  -- Blockchain
  transaction_hash TEXT,
  contract_address TEXT,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Constraints
  CONSTRAINT valid_status CHECK (status IN ('pending', 'approved', 'rejected', 'expired'))
);

-- Indexes for data access requests
CREATE INDEX idx_ownbase_access_requests_business ON ownbase_data_access_requests(business_user_id);
CREATE INDEX idx_ownbase_access_requests_customer ON ownbase_data_access_requests(customer_wallet);
CREATE INDEX idx_ownbase_access_requests_status ON ownbase_data_access_requests(status);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
CREATE TRIGGER update_ownbase_contacts_updated_at BEFORE UPDATE ON ownbase_contacts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ownbase_deals_updated_at BEFORE UPDATE ON ownbase_deals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ownbase_tasks_updated_at BEFORE UPDATE ON ownbase_tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ownbase_data_access_requests_updated_at BEFORE UPDATE ON ownbase_data_access_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to auto-mark tasks as completed
CREATE OR REPLACE FUNCTION set_task_completed_at()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.completed = true AND OLD.completed = false THEN
    NEW.completed_at = NOW();
  ELSIF NEW.completed = false THEN
    NEW.completed_at = NULL;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER task_completed_trigger BEFORE UPDATE ON ownbase_tasks
  FOR EACH ROW EXECUTE FUNCTION set_task_completed_at();

-- Function to auto-mark deals as closed
CREATE OR REPLACE FUNCTION set_deal_closed_at()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status IN ('won', 'lost') AND OLD.status = 'open' THEN
    NEW.closed_at = NOW();
  ELSIF NEW.status = 'open' THEN
    NEW.closed_at = NULL;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER deal_closed_trigger BEFORE UPDATE ON ownbase_deals
  FOR EACH ROW EXECUTE FUNCTION set_deal_closed_at();
