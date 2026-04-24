import Link from 'next/link'
import { formatDate, extractTiptapText, truncate } from '@/lib/utils'

type Project = {
  id: string
  title: string
  slug: string
  main_image: string
  date: string
  content?: unknown
}

type Category = {
  id: string
  name: string
  slug: string
  description: string
  projects: Project[]
}

export default function Features({ categories }: { categories: Category[] }) {
  // Show only the first 2 categories on the home section
  const visibleCategories = categories.slice(0, 2)

  return (
    <section id="projetos" className="py-16 md:py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-neutral-900 mb-16 text-center">Nossos Projetos</h2>

        {visibleCategories.map((cat) => {
          const coverProject = cat.projects[0]
          // Show at most 2 projects per category
          const visibleProjects = cat.projects.slice(0, 2)

          return (
            <div key={cat.id} className="mb-20">
              {/* Category header */}
              <div className="mb-8 flex items-center gap-4">
                {coverProject && (
                  <Link href={`/${cat.slug}`} className="flex-shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={coverProject.main_image}
                      alt={coverProject.title}
                      className="w-20 h-20 rounded-xl object-cover hover:opacity-90 transition-opacity"
                    />
                  </Link>
                )}
                <div>
                  <Link href={`/${cat.slug}`} className="group inline-flex items-center gap-2">
                    <h3 className="text-2xl font-semibold text-neutral-900 group-hover:underline underline-offset-4">
                      {cat.name}
                    </h3>
                    <span className="text-neutral-400 text-sm group-hover:translate-x-0.5 transition-transform">→</span>
                  </Link>
                  {cat.description && (
                    <p className="text-neutral-500 mt-1 text-sm">
                      {truncate(cat.description, 100)}
                    </p>
                  )}
                  {cat.projects.length > 0 && (
                    <p className="text-xs text-neutral-400 mt-1">
                      {cat.projects.length} projeto{cat.projects.length !== 1 ? 's' : ''}
                    </p>
                  )}
                </div>
              </div>

              {visibleProjects.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {visibleProjects.map((p) => {
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
                            <h4 className="font-medium text-neutral-900 mb-1">{p.title}</h4>
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
            </div>
          )
        })}

        {/* Show All Projects button */}
        <div className="mt-4 flex justify-center">
          <Link
            href="/projetos"
            className="inline-flex items-center gap-2 bg-neutral-900 text-white text-sm font-medium px-8 py-3 rounded-full hover:bg-neutral-700 transition-colors"
          >
            Exibir Todos os Projetos →
          </Link>
        </div>
      </div>
    </section>
  )
}
