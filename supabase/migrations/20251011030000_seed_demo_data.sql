-- Seed data for E2E tests
-- Creates demo user and comprehensive test data

DO $$
DECLARE
  v_user_id UUID;
  v_contact1_id UUID;
  v_contact2_id UUID;
  v_contact3_id UUID;
  v_deal1_id UUID;
  v_deal2_id UUID;
BEGIN
  -- Insert demo user into ownbase_users
  INSERT INTO ownbase_users (email, name, company, preferred_product)
  VALUES ('demo@continuum.app', 'Demo User', 'Continuum', 'ethos')
  ON CONFLICT (email) DO UPDATE SET
    name = EXCLUDED.name,
    company = EXCLUDED.company
  RETURNING id INTO v_user_id;

  RAISE NOTICE 'Demo user ID: %', v_user_id;

  -- Insert contacts
  INSERT INTO ownbase_contacts (user_id, name, email, company, phone)
  VALUES
    (v_user_id, 'Alice Johnson', 'alice@techcorp.com', 'TechCorp Inc', '+1-555-0101'),
    (v_user_id, 'Bob Smith', 'bob@startup.io', 'StartupHub', '+1-555-0102'),
    (v_user_id, 'Carol Williams', 'carol@enterprise.com', 'Enterprise Solutions', '+1-555-0103'),
    (v_user_id, 'David Chen', 'david@innovation.co', 'Innovation Labs', '+1-555-0104'),
    (v_user_id, 'Emma Davis', 'emma@growth.com', 'Growth Partners', '+1-555-0105')
  ON CONFLICT DO NOTHING
  RETURNING id INTO v_contact1_id;

  -- Get contact IDs for relations
  SELECT id INTO v_contact1_id FROM ownbase_contacts WHERE user_id = v_user_id AND email = 'alice@techcorp.com' LIMIT 1;
  SELECT id INTO v_contact2_id FROM ownbase_contacts WHERE user_id = v_user_id AND email = 'bob@startup.io' LIMIT 1;
  SELECT id INTO v_contact3_id FROM ownbase_contacts WHERE user_id = v_user_id AND email = 'carol@enterprise.com' LIMIT 1;

  -- Insert deals
  INSERT INTO ownbase_deals (user_id, contact_id, title, value, stage, status, probability)
  VALUES
    (v_user_id, v_contact1_id, 'Enterprise Software License', 50000, 'proposal', 'open', 25),
    (v_user_id, v_contact2_id, 'SaaS Annual Subscription', 12000, 'negotiation', 'open', 60),
    (v_user_id, v_contact3_id, 'Consulting Services', 75000, 'demo', 'open', 40),
    (v_user_id, v_contact1_id, 'Platform Integration', 30000, 'qualified', 'open', 75),
    (v_user_id, v_contact2_id, 'Premium Support Package', 15000, 'closed', 'won', 100)
  ON CONFLICT DO NOTHING
  RETURNING id INTO v_deal1_id;

  -- Get deal IDs
  SELECT id INTO v_deal1_id FROM ownbase_deals WHERE user_id = v_user_id AND title = 'Enterprise Software License' LIMIT 1;
  SELECT id INTO v_deal2_id FROM ownbase_deals WHERE user_id = v_user_id AND title = 'SaaS Annual Subscription' LIMIT 1;

  -- Insert activities
  INSERT INTO ownbase_activities (user_id, contact_id, deal_id, type, title, description, activity_date)
  VALUES
    (v_user_id, v_contact1_id, v_deal1_id, 'call', 'Discovery Call', 'Discussed requirements and timeline', NOW() - INTERVAL '2 days'),
    (v_user_id, v_contact2_id, v_deal2_id, 'email', 'Sent Proposal', 'Proposal document sent via email', NOW() - INTERVAL '1 day'),
    (v_user_id, v_contact3_id, NULL, 'meeting', 'Product Demo', 'Demonstrated platform features', NOW() - INTERVAL '3 hours'),
    (v_user_id, v_contact1_id, v_deal1_id, 'note', 'Follow-up Notes', 'Customer very interested in Q1 deployment', NOW() - INTERVAL '1 hour')
  ON CONFLICT DO NOTHING;

  -- Insert tasks
  INSERT INTO ownbase_tasks (user_id, contact_id, deal_id, title, description, due_date, priority, completed)
  VALUES
    (v_user_id, v_contact1_id, v_deal1_id, 'Follow up on proposal', 'Check if they have questions', NOW() + INTERVAL '2 days', 'high', false),
    (v_user_id, v_contact2_id, v_deal2_id, 'Schedule demo call', 'Book 30-min demo with engineering team', NOW() + INTERVAL '1 week', 'medium', false),
    (v_user_id, v_contact3_id, NULL, 'Send contract', 'Prepare and send service agreement', NOW() + INTERVAL '3 days', 'high', false),
    (v_user_id, v_contact1_id, NULL, 'Quarterly check-in', 'Touch base on satisfaction', NOW() + INTERVAL '30 days', 'low', true)
  ON CONFLICT DO NOTHING;

  -- Insert data access requests (for Myn customer portal testing)
  INSERT INTO ownbase_data_access_requests (business_user_id, customer_wallet, customer_name, requested_fields, payment_amount, status, expires_at, approved_at)
  VALUES
    (v_user_id, '0xDemo123...', 'TechCorp Marketing', ARRAY['name', 'email', 'company'], 25.00, 'approved', NOW() + INTERVAL '30 days', NOW() - INTERVAL '5 days'),
    (v_user_id, '0xDemo456...', 'StartupHub Analytics', ARRAY['name', 'email', 'phone'], 50.00, 'pending', NULL, NULL),
    (v_user_id, '0xDemo789...', 'Enterprise Solutions', ARRAY['name', 'company', 'preferences'], 100.00, 'approved', NOW() + INTERVAL '90 days', NOW() - INTERVAL '10 days')
  ON CONFLICT DO NOTHING;

  RAISE NOTICE 'Seed data created successfully!';
END $$;
