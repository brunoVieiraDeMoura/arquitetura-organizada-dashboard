import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import DeleteProjectButton from './_components/DeleteProjectButton'
import ProjectSearch from './_components/ProjectSearch'

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  const supabase = await createClient()

  let query = supabase
    .from('projects')
    .select('id, title, date, is_featured, categories(name)')
    .order('created_at', { ascending: false })

  if (q) query = query.ilike('title', `%${q}%`)

  const { data: projects } = await query

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold text-neutral-900">Projetos</h1>
        <Link
          href="/dashboard/projects/new"
          className="inline-flex items-center px-3 py-1.5 rounded-lg bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-colors"
        >
          Novo Projeto
        </Link>
      </div>

      <ProjectSearch defaultValue={q ?? ''} />

      <div className="bg-white rounded-xl border border-neutral-200 mt-4">
        {projects?.length ? (
          <ul className="divide-y divide-neutral-100">
            {projects.map((p) => (
              <li key={p.id} className="flex items-center justify-between px-6 py-4">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-neutral-800">{p.title}</p>
                    {p.is_featured && (
                      <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">Destaque</span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-400">
                    {/* @ts-ignore */}
                    {p.categories?.name} · {p.date}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Link href={`/dashboard/projects/${p.id}/edit`} className="text-xs text-neutral-500 hover:underline">
                    Editar
                  </Link>
                  <DeleteProjectButton id={p.id} title={p.title} />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="px-6 py-12 text-center text-sm text-neutral-400">
            {q ? `Nenhum projeto encontrado para "${q}".` : 'Nenhum projeto cadastrado ainda. '}
            {!q && <Link href="/dashboard/projects/new" className="underline">Criar primeiro projeto</Link>}
          </div>
        )}
      </div>
    </div>
  )
}
