import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim() || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);
export const missingSupabaseConfigMessage =
  'Missing Supabase configuration. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.';

let supabaseClient: SupabaseClient<Database> | null = null;

export function getSupabaseClient() {
  if (!isSupabaseConfigured) {
    throw new Error(missingSupabaseConfigMessage);
  }

  supabaseClient ??= createClient<Database>(supabaseUrl, supabaseKey);
  return supabaseClient;
}
