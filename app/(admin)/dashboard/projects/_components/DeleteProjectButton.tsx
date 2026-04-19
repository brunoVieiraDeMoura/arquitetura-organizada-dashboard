'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function DeleteProjectButton({ id, title }: { id: string; title: string }) {
  const router = useRouter()
  const supabase = createClient()

  async function handleDelete() {
    if (!confirm(`Deletar o projeto "${title}"?`)) return
    await supabase.from('projects').delete().eq('id', id)
    router.refresh()
  }

  return (
    <button onClick={handleDelete} className="text-xs text-red-500 hover:underline">
      Deletar
    </button>
  )
}
