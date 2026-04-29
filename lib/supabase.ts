import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL

// Public anon client — used only for the public contact form
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
export const supabase = url && anonKey ? createClient(url, anonKey) : null

// Service role client — bypasses RLS, used only in server-side CRM APIs
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
export const supabaseAdmin = url && serviceKey
  ? createClient(url, serviceKey, { auth: { persistSession: false } })
  : null

export function isSupabaseConfigured(): boolean {
  return supabase !== null
}
