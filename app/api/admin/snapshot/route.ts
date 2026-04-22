import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createAdminClient()

  const [categories, projects, testimonials, faqs, settings] = await Promise.all([
    supabase.from('categories').select('*').order('order_index', { ascending: true }),
    supabase.from('projects').select('*').order('created_at', { ascending: true }),
    supabase.from('testimonials').select('*').order('created_at', { ascending: true }),
    supabase.from('faqs').select('*').order('order_index', { ascending: true }),
    supabase.from('settings').select('*').not('key', 'like', '_%'),
  ])

  const snapshot = JSON.stringify({
    categories: categories.data ?? [],
    projects: projects.data ?? [],
    testimonials: testimonials.data ?? [],
    faqs: faqs.data ?? [],
    settings: settings.data ?? [],
  })

  await supabase.from('settings').upsert({ key: '_snapshot', value: snapshot })

  return NextResponse.json({ ok: true, saved: { categories: categories.data?.length, projects: projects.data?.length, testimonials: testimonials.data?.length, faqs: faqs.data?.length } })
}
