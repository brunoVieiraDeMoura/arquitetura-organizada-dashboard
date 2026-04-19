import { createClient } from '@/lib/supabase/server'
import ProjectForm from '@/components/admin/ProjectForm'
import Link from 'next/link'

export default async function NewProjectPage({
  searchParams,
}: {
  searchParams: Promise<{ categoryId?: string }>
}) {
  const supabase = await createClient()
  const { categoryId } = await searchParams

  const { data: categories } = await supabase
    .from('categories')
    .select('id, name')
    .order('order_index')

  const storageReady = Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-neutral-900">Novo Projeto</h1>
        <Link href="/dashboard/projects" className="text-xs text-neutral-400 hover:underline">
          ← Todos os projetos
        </Link>
      </div>

      {!storageReady && (
        <div className="mb-6 p-4 rounded-lg border border-amber-200 bg-amber-50 text-sm">
          <p className="font-medium text-amber-800 mb-1">Upload de arquivos não configurado</p>
          <p className="text-amber-700">
            Para fazer upload de imagens, adicione a{' '}
            <code className="bg-amber-100 px-1 rounded">SUPABASE_SERVICE_ROLE_KEY</code> no{' '}
            <code className="bg-amber-100 px-1 rounded">.env.local</code>.
            Enquanto isso, use o modo <strong>URL</strong> no campo de imagem (cole um link direto).
          </p>
        </div>
      )}

      <ProjectForm
        categories={categories ?? []}
        defaultCategoryId={categoryId}
      />
    </div>
  )
}
