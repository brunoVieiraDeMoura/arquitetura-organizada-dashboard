import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import DeleteCategoryButton from './_components/DeleteCategoryButton'

export default async function CategoriesPage() {
  const supabase = await createClient()
  const { data: categories } = await supabase
    .from('categories')
    .select('*, projects(id)')
    .order('order_index', { ascending: true })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-neutral-900">Categorias</h1>
        <Link
          href="/dashboard/categories/new"
          className="inline-flex items-center px-3 py-1.5 rounded-lg bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-colors"
        >
          Nova Categoria
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200">
        {categories?.length ? (
          <ul className="divide-y divide-neutral-100">
            {categories.map((cat) => {
              const count = Array.isArray(cat.projects) ? cat.projects.length : 0
              return (
                <li key={cat.id} className="flex items-center justify-between px-6 py-4">
                  <div>
                    <p className="text-sm font-medium text-neutral-800">{cat.name}</p>
                    <p className="text-xs text-neutral-400">
                      /{cat.slug} · {count} projeto{count !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/dashboard/projects/new?categoryId=${cat.id}`}
                      className="text-xs text-blue-600 hover:underline"
                    >
                      + Projeto
                    </Link>
                    <Link
                      href={`/dashboard/categories/${cat.id}`}
                      className="text-xs text-neutral-500 hover:underline"
                    >
                      Gerenciar
                    </Link>
                    <DeleteCategoryButton id={cat.id} name={cat.name} />
                  </div>
                </li>
              )
            })}
          </ul>
        ) : (
          <div className="px-6 py-12 text-center text-sm text-neutral-400">
            Nenhuma categoria criada ainda.{' '}
            <Link href="/dashboard/categories/new" className="underline">
              Criar primeira categoria
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
