import { createClient } from '@supabase/supabase-js'

/**
 * Client com service role — bypassa RLS.
 * Usar APENAS em Server Actions e API routes, nunca expor ao browser.
 */
export function createAdminClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!serviceKey) {
    throw new Error(
      'SUPABASE_SERVICE_ROLE_KEY não definida no .env.local.\n' +
      'Acesse: Supabase Dashboard → Project Settings → API → service_role key'
    )
  }
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    serviceKey,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
}
