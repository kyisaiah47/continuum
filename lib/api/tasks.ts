import { supabase, type Task } from '../supabase-client';

export async function getTasks() {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .order('due_date', { ascending: true, nullsFirst: false });

  if (error) throw error;
  return data as Task[];
}

export async function getTaskById(id: string) {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data as Task;
}

export async function getTasksByContactId(contactId: string) {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('contact_id', contactId)
    .order('due_date', { ascending: true, nullsFirst: false });

  if (error) throw error;
  return data as Task[];
}

export async function getTasksByDealId(dealId: string) {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('deal_id', dealId)
    .order('due_date', { ascending: true, nullsFirst: false });

  if (error) throw error;
  return data as Task[];
}

export async function createTask(task: Omit<Task, 'id' | 'created_at' | 'updated_at'>) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('tasks')
    .insert([{ ...task, user_id: user.id }])
    .select()
    .single();

  if (error) throw error;
  return data as Task;
}

export async function updateTask(id: string, updates: Partial<Task>) {
  const { data, error } = await supabase
    .from('tasks')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as Task;
}

export async function toggleTaskComplete(id: string) {
  const task = await getTaskById(id);
  return updateTask(id, { completed: !task.completed });
}

export async function deleteTask(id: string) {
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

export async function getUpcomingTasks(limit: number = 10) {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('completed', false)
    .order('due_date', { ascending: true, nullsFirst: false })
    .limit(limit);

  if (error) throw error;
  return data as Task[];
}

export async function getOverdueTasks() {
  const today = new Date().toISOString().split('T')[0];

  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('completed', false)
    .lt('due_date', today)
    .order('due_date', { ascending: true });

  if (error) throw error;
  return data as Task[];
}
