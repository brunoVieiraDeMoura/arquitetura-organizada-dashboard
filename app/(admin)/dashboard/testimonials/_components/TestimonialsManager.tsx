'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'

type Testimonial = { id: string; author: string; role: string; content: string }

export default function TestimonialsManager({ initial }: { initial: Testimonial[] }) {
  const router = useRouter()
  const supabase = createClient()
  const [items, setItems] = useState(initial)
  const [author, setAuthor] = useState('')
  const [role, setRole] = useState('')
  const [content, setContent] = useState('')
  const [saving, setSaving] = useState(false)

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const { data } = await supabase
      .from('testimonials')
      .insert({ author, role, content })
      .select()
      .single()
    if (data) {
      setItems([data, ...items])
      setAuthor(''); setRole(''); setContent('')
    }
    setSaving(false)
  }

  async function handleDelete(id: string) {
    if (!confirm('Deletar depoimento?')) return
    await supabase.from('testimonials').delete().eq('id', id)
    setItems(items.filter((i) => i.id !== id))
    router.refresh()
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-neutral-200 p-6">
        <h2 className="text-sm font-medium text-neutral-900 mb-4">Adicionar Depoimento</h2>
        <form onSubmit={handleAdd} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Nome</label>
              <input required value={author} onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
                placeholder="Maria Silva" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Cargo / Empresa</label>
              <input value={role} onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
                placeholder="CEO, Empresa X" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Depoimento</label>
            <textarea required value={content} onChange={(e) => setContent(e.target.value)} rows={3}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 resize-none"
              placeholder="O trabalho foi incrível..." />
          </div>
          <Button type="submit" disabled={saving}>{saving ? 'Adicionando...' : 'Adicionar'}</Button>
        </form>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200">
        {items.length ? (
          <ul className="divide-y divide-neutral-100">
            {items.map((t) => (
              <li key={t.id} className="flex items-start justify-between px-6 py-4">
                <div>
                  <p className="text-sm font-medium text-neutral-800">{t.author}</p>
                  {t.role && <p className="text-xs text-neutral-400">{t.role}</p>}
                  <p className="text-sm text-neutral-600 mt-1">{t.content}</p>
                </div>
                <button onClick={() => handleDelete(t.id)} className="text-xs text-red-500 hover:underline shrink-0 ml-4">
                  Deletar
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="px-6 py-8 text-center text-sm text-neutral-400">Nenhum depoimento ainda.</p>
        )}
      </div>
    </div>
  )
}
