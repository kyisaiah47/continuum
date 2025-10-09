import { supabase, type Contact } from '../supabase-client';

export async function getContacts(userId?: string) {
  const { data, error } = await supabase
    .from('ownbase_contacts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Contact[];
}

export async function getContactById(id: string) {
  const { data, error } = await supabase
    .from('ownbase_contacts')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data as Contact;
}

export async function createContact(contact: Omit<Contact, 'id' | 'created_at' | 'updated_at'>) {
  // Get the current user
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('ownbase_contacts')
    .insert([{ ...contact, user_id: user.id }])
    .select()
    .single();

  if (error) throw error;
  return data as Contact;
}

export async function updateContact(id: string, updates: Partial<Contact>) {
  const { data, error } = await supabase
    .from('ownbase_contacts')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as Contact;
}

export async function deleteContact(id: string) {
  const { error } = await supabase
    .from('ownbase_contacts')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

export async function searchContacts(query: string) {
  const { data, error } = await supabase
    .from('ownbase_contacts')
    .select('*')
    .or(`name.ilike.%${query}%,email.ilike.%${query}%,company.ilike.%${query}%`)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Contact[];
}
