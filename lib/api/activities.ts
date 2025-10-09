import { supabase, type Activity } from '../supabase-client';

export async function getActivities() {
  const { data, error } = await supabase
    .from('activities')
    .select('*')
    .order('activity_date', { ascending: false });

  if (error) throw error;
  return data as Activity[];
}

export async function getActivityById(id: string) {
  const { data, error } = await supabase
    .from('activities')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data as Activity;
}

export async function getActivitiesByContactId(contactId: string) {
  const { data, error } = await supabase
    .from('activities')
    .select('*')
    .eq('contact_id', contactId)
    .order('activity_date', { ascending: false });

  if (error) throw error;
  return data as Activity[];
}

export async function getActivitiesByDealId(dealId: string) {
  const { data, error} = await supabase
    .from('activities')
    .select('*')
    .eq('deal_id', dealId)
    .order('activity_date', { ascending: false });

  if (error) throw error;
  return data as Activity[];
}

export async function createActivity(activity: Omit<Activity, 'id' | 'created_at'>) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('activities')
    .insert([{ ...activity, user_id: user.id }])
    .select()
    .single();

  if (error) throw error;
  return data as Activity;
}

export async function updateActivity(id: string, updates: Partial<Activity>) {
  const { data, error } = await supabase
    .from('activities')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as Activity;
}

export async function deleteActivity(id: string) {
  const { error } = await supabase
    .from('activities')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

export async function getRecentActivities(limit: number = 10) {
  const { data, error } = await supabase
    .from('activities')
    .select('*')
    .order('activity_date', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data as Activity[];
}
