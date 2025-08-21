import { supabase } from "../lib/supabase";

// Helper to fetch with Supabase JWT
export async function fetchWithAuth(url, options = {}) {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  const headers = {
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    'Content-Type': 'application/json',
  };
  return fetch(url, { ...options, headers });
}
