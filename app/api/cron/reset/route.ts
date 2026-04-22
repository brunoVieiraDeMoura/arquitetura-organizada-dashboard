import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createAdminClient()

  const { data: row } = await supabase
    .from('settings')
    .select('value')
    .eq('key', '_snapshot')
    .single()

  if (!row?.value) {
    return NextResponse.json({ error: 'No snapshot found. POST /api/admin/snapshot first.' }, { status: 400 })
  }

  const snapshot = JSON.parse(row.value) as {
    categories: any[]
    projects: any[]
    testimonials: any[]
    faqs: any[]
    settings: any[]
  }

  // Delete in order respecting FK (projects → categories)
  await supabase.from('projects').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  await supabase.from('categories').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  await supabase.from('testimonials').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  await supabase.from('faqs').delete().neq('id', '00000000-0000-0000-0000-000000000000')

  // Re-insert from snapshot
  if (snapshot.categories.length) await supabase.from('categories').insert(snapshot.categories)
  if (snapshot.projects.length) await supabase.from('projects').insert(snapshot.projects)
  if (snapshot.testimonials.length) await supabase.from('testimonials').insert(snapshot.testimonials)
  if (snapshot.faqs.length) await supabase.from('faqs').insert(snapshot.faqs)

  // Restore settings (skip internal keys starting with _)
  for (const s of snapshot.settings) {
    await supabase.from('settings').upsert(s)
  }

  return NextResponse.json({ ok: true, restored: { categories: snapshot.categories.length, projects: snapshot.projects.length, testimonials: snapshot.testimonials.length, faqs: snapshot.faqs.length } })
}
