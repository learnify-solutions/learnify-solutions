import type { SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SUPABASE_URL) ||
  '';
const supabaseAnonKey =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SUPABASE_ANON_KEY) ||
  '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

let cachedClient: SupabaseClient | null = null;

export async function getSupabase(): Promise<SupabaseClient | null> {
  if (cachedClient) return cachedClient;
  if (!isSupabaseConfigured) return null;
  try {
    const { createClient } = await import('@supabase/supabase-js');
    cachedClient = createClient(supabaseUrl, supabaseAnonKey);
    return cachedClient;
  } catch (err) {
    console.warn('Supabase client failed to load dynamically:', err);
    return null;
  }
}

