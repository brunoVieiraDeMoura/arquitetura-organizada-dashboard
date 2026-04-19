'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'

type FAQ = { id: string; question: string; answer: string; order_index: number }

export default function FAQsManager({ initial }: { initial: FAQ[] }) {
  const router = useRouter()
  const supabase = createClient()
  const [items, setItems] = useState(initial)
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [saving, setSaving] = useState(false)

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const { data } = await supabase
      .from('faqs')
      .insert({ question, answer, order_index: items.length })
      .select()
      .single()
    if (data) {
      setItems([...items, data])
      setQuestion(''); setAnswer('')
    }
    setSaving(false)
  }

  async function handleDelete(id: string) {
    if (!confirm('Deletar esta FAQ?')) return
    await supabase.from('faqs').delete().eq('id', id)
    setItems(items.filter((i) => i.id !== id))
    router.refresh()
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-neutral-200 p-6">
        <h2 className="text-sm font-medium text-neutral-900 mb-4">Adicionar FAQ</h2>
        <form onSubmit={handleAdd} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Pergunta</label>
            <input required value={question} onChange={(e) => setQuestion(e.target.value)}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
              placeholder="Qual é o prazo médio de um projeto?" />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Resposta</label>
            <textarea required value={answer} onChange={(e) => setAnswer(e.target.value)} rows={3}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 resize-none"
              placeholder="O prazo varia de acordo com..." />
          </div>
          <Button type="submit" disabled={saving}>{saving ? 'Adicionando...' : 'Adicionar'}</Button>
        </form>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200">
        {items.length ? (
          <ul className="divide-y divide-neutral-100">
            {items.map((f) => (
              <li key={f.id} className="flex items-start justify-between px-6 py-4">
                <div>
                  <p className="text-sm font-medium text-neutral-800">{f.question}</p>
                  <p className="text-sm text-neutral-600 mt-1">{f.answer}</p>
                </div>
                <button onClick={() => handleDelete(f.id)} className="text-xs text-red-500 hover:underline shrink-0 ml-4">
                  Deletar
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="px-6 py-8 text-center text-sm text-neutral-400">Nenhuma FAQ ainda.</p>
        )}
      </div>
    </div>
  )
}
