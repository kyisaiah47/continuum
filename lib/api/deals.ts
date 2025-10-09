import { supabase, type Deal } from '../supabase-client';

export async function getDeals() {
  const { data, error } = await supabase
    .from('ownbase_deals')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Deal[];
}

export async function getDealById(id: string) {
  const { data, error } = await supabase
    .from('ownbase_deals')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data as Deal;
}

export async function getDealsByStage(stage: Deal['stage']) {
  const { data, error } = await supabase
    .from('ownbase_deals')
    .select('*')
    .eq('stage', stage)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Deal[];
}

export async function createDeal(deal: Omit<Deal, 'id' | 'created_at' | 'updated_at'>) {
  // Get the current user
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('ownbase_deals')
    .insert([{ ...deal, user_id: user.id }])
    .select()
    .single();

  if (error) throw error;
  return data as Deal;
}

export async function updateDeal(id: string, updates: Partial<Deal>) {
  const { data, error } = await supabase
    .from('ownbase_deals')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as Deal;
}

export async function updateDealStage(id: string, stage: Deal['stage']) {
  return updateDeal(id, { stage });
}

export async function deleteDeal(id: string) {
  const { error } = await supabase
    .from('ownbase_deals')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

export async function getDealsByContactId(contactId: string) {
  const { data, error } = await supabase
    .from('ownbase_deals')
    .select('*')
    .eq('contact_id', contactId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Deal[];
}

// Get deals with contact information
export async function getDealsWithContacts() {
  const { data, error } = await supabase
    .from('ownbase_deals')
    .select(`
      *,
      contact:ownbase_contacts(
        id,
        name,
        email,
        company,
        job_title
      )
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

// Get pipeline statistics
export async function getPipelineStats() {
  const { data: deals, error } = await supabase
    .from('ownbase_deals')
    .select('stage, value, status');

  if (error) throw error;

  const stats = {
    totalValue: 0,
    activeDeals: 0,
    wonDeals: 0,
    wonValue: 0,
    byStage: {} as Record<string, { count: number; value: number }>,
  };

  deals?.forEach((deal) => {
    stats.totalValue += Number(deal.value);

    if (deal.status === 'open') {
      stats.activeDeals++;
    }

    if (deal.status === 'won') {
      stats.wonDeals++;
      stats.wonValue += Number(deal.value);
    }

    if (!stats.byStage[deal.stage]) {
      stats.byStage[deal.stage] = { count: 0, value: 0 };
    }
    stats.byStage[deal.stage].count++;
    stats.byStage[deal.stage].value += Number(deal.value);
  });

  return stats;
}
