-- Row Level Security Policies
-- Ensures users can only access their own data

-- ============================================
-- ENABLE RLS ON ALL TABLES
-- ============================================
ALTER TABLE ownbase_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE ownbase_deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE ownbase_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE ownbase_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE ownbase_data_access_requests ENABLE ROW LEVEL SECURITY;

-- ============================================
-- CONTACTS POLICIES
-- ============================================

-- Users can view their own contacts
CREATE POLICY "Users can view own contacts" ON ownbase_contacts
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own contacts
CREATE POLICY "Users can insert own contacts" ON ownbase_contacts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own contacts
CREATE POLICY "Users can update own contacts" ON ownbase_contacts
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own contacts
CREATE POLICY "Users can delete own contacts" ON ownbase_contacts
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- DEALS POLICIES
-- ============================================

-- Users can view their own deals
CREATE POLICY "Users can view own deals" ON ownbase_deals
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own deals
CREATE POLICY "Users can insert own deals" ON ownbase_deals
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own deals
CREATE POLICY "Users can update own deals" ON ownbase_deals
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own deals
CREATE POLICY "Users can delete own deals" ON ownbase_deals
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- ACTIVITIES POLICIES
-- ============================================

-- Users can view their own activities
CREATE POLICY "Users can view own activities" ON ownbase_activities
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own activities
CREATE POLICY "Users can insert own activities" ON ownbase_activities
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own activities
CREATE POLICY "Users can update own activities" ON ownbase_activities
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own activities
CREATE POLICY "Users can delete own activities" ON ownbase_activities
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- TASKS POLICIES
-- ============================================

-- Users can view their own tasks
CREATE POLICY "Users can view own tasks" ON ownbase_tasks
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own tasks
CREATE POLICY "Users can insert own tasks" ON ownbase_tasks
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own tasks
CREATE POLICY "Users can update own tasks" ON ownbase_tasks
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own tasks
CREATE POLICY "Users can delete own tasks" ON ownbase_tasks
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- DATA ACCESS REQUESTS POLICIES
-- ============================================

-- Business users can view their own requests
CREATE POLICY "Business users can view own requests" ON ownbase_data_access_requests
  FOR SELECT USING (auth.uid() = business_user_id);

-- Business users can insert their own requests
CREATE POLICY "Business users can insert own requests" ON ownbase_data_access_requests
  FOR INSERT WITH CHECK (auth.uid() = business_user_id);

-- Business users can update their own requests
CREATE POLICY "Business users can update own requests" ON ownbase_data_access_requests
  FOR UPDATE USING (auth.uid() = business_user_id);

-- Business users can delete their own requests
CREATE POLICY "Business users can delete own requests" ON ownbase_data_access_requests
  FOR DELETE USING (auth.uid() = business_user_id);

-- Customer policies added in migration 20251011000001_customer_access_policies.sql
