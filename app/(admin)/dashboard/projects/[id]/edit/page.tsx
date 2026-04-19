import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import ProjectForm from '@/components/admin/ProjectForm'

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const [{ data: project }, { data: categories }] = await Promise.all([
    supabase.from('projects').select('*').eq('id', id).single(),
    supabase.from('categories').select('id, name').order('order_index'),
  ])

  if (!project) notFound()

  return (
    <div>
      <h1 className="text-2xl font-semibold text-neutral-900 mb-6">Editar Projeto</h1>
      <ProjectForm categories={categories ?? []} initial={project} />
    </div>
  )
}
