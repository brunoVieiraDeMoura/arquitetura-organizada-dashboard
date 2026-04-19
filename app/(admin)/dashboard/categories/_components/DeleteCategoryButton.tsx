'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function DeleteCategoryButton({ id, name }: { id: string; name: string }) {
  const router = useRouter()
  const supabase = createClient()

  async function handleDelete() {
    if (!confirm(`Deletar a categoria "${name}"? Todos os projetos vinculados serão removidos.`)) return
    await supabase.from('categories').delete().eq('id', id)
    router.refresh()
  }

  return (
    <button
      onClick={handleDelete}
      className="text-xs text-red-500 hover:underline"
    >
      Deletar
    </button>
  )
}
