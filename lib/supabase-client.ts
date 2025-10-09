import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export type Contact = {
  id: string;
  user_id: string;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  job_title?: string;
  wallet_address?: string;
  has_wallet: boolean;
  data_access_expires_at?: string;
  access_payment_amount?: number;
  tags?: string[];
  notes?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
};

export type Deal = {
  id: string;
  user_id: string;
  contact_id?: string;
  title: string;
  value: number;
  currency: string;
  stage: 'lead' | 'qualified' | 'demo' | 'proposal' | 'negotiation' | 'closed';
  status: 'open' | 'won' | 'lost';
  probability: number;
  expected_close_date?: string;
  closed_at?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
};

export type Activity = {
  id: string;
  user_id: string;
  contact_id?: string;
  deal_id?: string;
  type: 'call' | 'email' | 'meeting' | 'note' | 'task';
  title: string;
  description?: string;
  created_at: string;
  activity_date: string;
};

export type Task = {
  id: string;
  user_id: string;
  contact_id?: string;
  deal_id?: string;
  title: string;
  description?: string;
  due_date?: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  completed_at?: string;
  created_at: string;
  updated_at: string;
};

export type DataAccessRequest = {
  id: string;
  business_user_id: string;
  customer_wallet: string;
  customer_name?: string;
  requested_fields: string[];
  access_duration_days: number;
  payment_amount: number;
  payment_currency: string;
  status: 'pending' | 'approved' | 'rejected' | 'expired';
  approved_at?: string;
  expires_at?: string;
  transaction_hash?: string;
  contract_address?: string;
  created_at: string;
  updated_at: string;
};
