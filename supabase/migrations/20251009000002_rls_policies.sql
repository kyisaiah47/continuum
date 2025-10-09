-- Row Level Security Policies
-- Ensures users can only access their own data

-- ============================================
-- ENABLE RLS ON ALL TABLES
-- ============================================
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE data_access_requests ENABLE ROW LEVEL SECURITY;

-- ============================================
-- CONTACTS POLICIES
-- ============================================

-- Users can view their own contacts
CREATE POLICY "Users can view own contacts" ON contacts
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own contacts
CREATE POLICY "Users can insert own contacts" ON contacts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own contacts
CREATE POLICY "Users can update own contacts" ON contacts
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own contacts
CREATE POLICY "Users can delete own contacts" ON contacts
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- DEALS POLICIES
-- ============================================

-- Users can view their own deals
CREATE POLICY "Users can view own deals" ON deals
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own deals
CREATE POLICY "Users can insert own deals" ON deals
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own deals
CREATE POLICY "Users can update own deals" ON deals
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own deals
CREATE POLICY "Users can delete own deals" ON deals
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- ACTIVITIES POLICIES
-- ============================================

-- Users can view their own activities
CREATE POLICY "Users can view own activities" ON activities
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own activities
CREATE POLICY "Users can insert own activities" ON activities
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own activities
CREATE POLICY "Users can update own activities" ON activities
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own activities
CREATE POLICY "Users can delete own activities" ON activities
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- TASKS POLICIES
-- ============================================

-- Users can view their own tasks
CREATE POLICY "Users can view own tasks" ON tasks
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own tasks
CREATE POLICY "Users can insert own tasks" ON tasks
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own tasks
CREATE POLICY "Users can update own tasks" ON tasks
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own tasks
CREATE POLICY "Users can delete own tasks" ON tasks
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- DATA ACCESS REQUESTS POLICIES
-- ============================================

-- Business users can view their own requests
CREATE POLICY "Business users can view own requests" ON data_access_requests
  FOR SELECT USING (auth.uid() = business_user_id);

-- Business users can insert their own requests
CREATE POLICY "Business users can insert own requests" ON data_access_requests
  FOR INSERT WITH CHECK (auth.uid() = business_user_id);

-- Business users can update their own requests
CREATE POLICY "Business users can update own requests" ON data_access_requests
  FOR UPDATE USING (auth.uid() = business_user_id);

-- Business users can delete their own requests
CREATE POLICY "Business users can delete own requests" ON data_access_requests
  FOR DELETE USING (auth.uid() = business_user_id);

-- TODO: Add policies for customers to view/approve requests for their wallet address
-- This will require a separate customer_users table or authentication mechanism
