import { createClient } from '@/lib/supabase/server'
import type { MetadataRoute } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient()

  const [{ data: categories }, { data: projects }] = await Promise.all([
    supabase.from('categories').select('slug, updated_at'),
    supabase.from('projects').select('slug, updated_at, categories(slug)'),
  ])

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/projetos`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
  ]

  const categoryRoutes: MetadataRoute.Sitemap = (categories ?? []).map((c) => ({
    url: `${siteUrl}/${c.slug}`,
    lastModified: c.updated_at ? new Date(c.updated_at) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  const projectRoutes: MetadataRoute.Sitemap = (projects ?? []).map((p) => ({
    url: `${siteUrl}/${(p.categories as any)?.slug}/${p.slug}`,
    lastModified: p.updated_at ? new Date(p.updated_at) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticRoutes, ...categoryRoutes, ...projectRoutes]
}
