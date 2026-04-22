import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import Footer from '@/components/site/Footer'
import GalleryLightbox from '@/components/site/GalleryLightbox'
import ProjectContent from '@/components/site/ProjectContent'
import type { Metadata } from 'next'

export const revalidate = 60

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data: project } = await supabase
    .from('projects')
    .select('title, meta_description, main_image, categories(name)')
    .eq('slug', slug)
    .single()

  if (!project) return {}

  const title = project.title
  const description = project.meta_description || `Projeto de ${(project.categories as any)?.name || 'arquitetura'}: ${title}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      images: project.main_image ? [{ url: project.main_image, alt: title }] : [],
    },
    twitter: {
      title,
      description,
      images: project.main_image ? [project.main_image] : [],
    },
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>
}) {
  const { category: categorySlug, slug } = await params
  const supabase = await createClient()

  const { data: project } = await supabase
    .from('projects')
    .select('*, categories(name, slug)')
    .eq('slug', slug)
    .single()

  if (!project) notFound()

  const categoryName = (project.categories as any)?.name ?? ''
  const categorySlugResolved = (project.categories as any)?.slug ?? categorySlug

  const galleryImages = (project.gallery ?? []).map((url: string, i: number) => ({
    url,
    alt: `${project.title} - foto ${i + 1}`,
  }))


  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-neutral-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center gap-2 text-sm text-neutral-500">
            <Link href="/" className="hover:text-neutral-900 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/projetos" className="hover:text-neutral-900 transition-colors">Projetos</Link>
            <span>/</span>
            <Link href={`/${categorySlugResolved}`} className="hover:text-neutral-900 transition-colors">
              {categoryName}
            </Link>
            <span>/</span>
            <span className="text-neutral-900 font-medium truncate max-w-[200px]">{project.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero image */}
      <div className="relative h-[60vh] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.main_image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-4xl mx-auto">
          <p className="text-xs font-medium text-white/70 uppercase tracking-widest mb-2">
            {categoryName}
          </p>
          <h1 className="text-4xl font-bold text-white">{project.title}</h1>
          <p className="text-white/60 mt-2 text-sm">{formatDate(project.date)}</p>
        </div>
      </div>

      {/* Description + Gallery */}
      <article className="max-w-3xl mx-auto px-6 py-16">
        <ProjectContent content={project.content} />

        {galleryImages.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-semibold text-neutral-900 mb-6">Galeria</h2>
            <GalleryLightbox images={galleryImages} />
          </div>
        )}
      </article>

      <Footer />
    </>
  )
}
