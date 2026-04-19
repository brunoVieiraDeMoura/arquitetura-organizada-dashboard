import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import Footer from '@/components/site/Footer'

export const revalidate = 60

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category: categorySlug } = await params
  const supabase = await createClient()

  const [{ data: category }, { data: allCategories }] = await Promise.all([
    supabase
      .from('categories')
      .select('id, name, slug, description, projects(id, title, slug, main_image, date)')
      .eq('slug', categorySlug)
      .single(),
    supabase
      .from('categories')
      .select('id, name, slug')
      .order('order_index', { ascending: true }),
  ])

  if (!category) notFound()

  const projects = (category as any).projects ?? []
  const otherCategories = (allCategories ?? []).filter((c) => c.slug !== categorySlug)

  return (
    <>
      {/* Breadcrumb + navegação entre categorias */}
      <div className="border-b border-neutral-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-neutral-500">
            <Link href="/" className="hover:text-neutral-900 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/#projetos" className="hover:text-neutral-900 transition-colors">
              Projetos
            </Link>
            <span>/</span>
            <span className="text-neutral-900 font-medium">{category.name}</span>
          </nav>

          {/* Navegação entre categorias */}
          {otherCategories.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-neutral-400">Ver também:</span>
              {otherCategories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/${cat.slug}`}
                  className="text-xs px-3 py-1 rounded-full border border-neutral-200 text-neutral-600 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Cabeçalho da categoria */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-neutral-900">{category.name}</h1>
        {(category as any).description && (
          <p className="text-neutral-500 mt-3 text-base max-w-2xl">
            {(category as any).description}
          </p>
        )}
        <p className="text-sm text-neutral-400 mt-2">
          {projects.length} projeto{projects.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Grid de projetos */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p: any) => (
              <Link
                key={p.id}
                href={`/${categorySlug}/${p.slug}`}
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
                  <h2 className="font-medium text-neutral-900 mb-1">{p.title}</h2>
                  <p className="text-xs text-neutral-400">{formatDate(p.date)}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-neutral-400">
            <p className="text-lg">Nenhum projeto nesta categoria ainda.</p>
            <Link
              href="/#projetos"
              className="mt-4 inline-block text-sm underline hover:text-neutral-900 transition-colors"
            >
              Ver outras categorias
            </Link>
          </div>
        )}
      </div>

      <Footer />
    </>
  )
}
