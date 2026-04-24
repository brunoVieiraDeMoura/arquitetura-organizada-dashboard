import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { formatDate, extractTiptapText, truncate } from '@/lib/utils'
import Footer from '@/components/site/Footer'
import type { Metadata } from 'next'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const supabase = await createClient()
  const { data } = await supabase.from('settings').select('value').eq('key', 'company_name').single()
  const name = data?.value || 'Arquitetura Organizada'
  const title = 'Projetos'
  const description = `Conheça todos os projetos de ${name} — design de interiores e arquitetura.`
  return {
    title,
    description,
    openGraph: { title, description, type: 'website' },
    twitter: { title, description },
  }
}

export default async function ProjetosPage() {
  const supabase = await createClient()

  const { data: categories } = await supabase
    .from('categories')
    .select('id, name, slug, description, projects(id, title, slug, main_image, date, content)')
    .order('order_index', { ascending: true })

  const cats = (categories as any[]) ?? []

  return (
    <>
      {/* Page header */}
      <div className="border-b border-neutral-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center gap-2 text-sm text-neutral-500">
            <Link href="/" className="hover:text-neutral-900 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-neutral-900 font-medium">Projetos</span>
          </nav>
        </div>
      </div>

      {/* Category quick nav */}
      <div className="bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-2 overflow-x-auto flex-nowrap md:flex-wrap scrollbar-none">
          {cats.map((cat: any) => (
            <Link
              key={cat.id}
              href={`/${cat.slug}`}
              className="text-xs px-3 py-1 rounded-full border border-neutral-200 text-neutral-600 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-colors"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      <main className="py-10 md:py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-3 text-center">Todos os Projetos</h1>
          <p className="text-neutral-500 text-center mb-10 md:mb-16">
            Explore nosso portfólio completo de projetos de arquitetura.
          </p>

          {cats.map((cat: any) => {
            const projects: any[] = cat.projects ?? []
            const preview = projects.slice(0, 2)
            return (
              <section key={cat.id} id={`cat-${cat.slug}`} className="mb-20">
                {/* Category header */}
                <div className="flex items-center gap-4 mb-8">
                  {projects[0] && (
                    <Link href={`/${cat.slug}`} className="flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={projects[0].main_image}
                        alt={projects[0].title}
                        className="w-20 h-20 rounded-xl object-cover hover:opacity-90 transition-opacity"
                      />
                    </Link>
                  )}
                  <div>
                    <Link href={`/${cat.slug}`} className="group inline-flex items-center gap-2">
                      <h2 className="text-2xl font-semibold text-neutral-900 group-hover:underline underline-offset-4">
                        {cat.name}
                      </h2>
                      <span className="text-neutral-400 text-sm group-hover:translate-x-0.5 transition-transform">→</span>
                    </Link>
                    {cat.description && (
                      <p className="text-neutral-500 mt-1 text-sm">{truncate(cat.description, 140)}</p>
                    )}
                    <p className="text-xs text-neutral-400 mt-1">
                      {projects.length} projeto{projects.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>

                {preview.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {preview.map((p: any) => {
                        const excerpt = extractTiptapText(p.content, 110)
                        return (
                          <Link
                            key={p.id}
                            href={`/${cat.slug}/${p.slug}`}
                            className="group block overflow-hidden rounded-xl border border-neutral-200 hover:shadow-lg transition-shadow"
                          >
                            <div className="aspect-[4/3] overflow-hidden">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={p.main_image}
                                alt={p.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                            <div className="p-4">
                              <h3 className="font-medium text-neutral-900 mb-1">{p.title}</h3>
                              <p className="text-xs text-neutral-400 mb-2">{formatDate(p.date)}</p>
                              {excerpt && (
                                <p className="text-sm text-neutral-500 line-clamp-2">{excerpt}</p>
                              )}
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                    <div className="mt-6 flex justify-end">
                      <Link
                        href={`/${cat.slug}`}
                        className="inline-flex items-center gap-2 text-sm border border-neutral-300 text-neutral-700 px-4 py-2 rounded-lg hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-colors"
                      >
                        Ver todos de {cat.name}
                        <span className="text-xs">→</span>
                      </Link>
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-neutral-400">Em breve.</p>
                )}
              </section>
            )
          })}
        </div>
      </main>

      <Footer />
    </>
  )
}
