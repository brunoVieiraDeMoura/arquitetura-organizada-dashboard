'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { slugify } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import TiptapEditor from './TiptapEditor'
import TiptapPreview from './TiptapPreview'
import ImageUpload from './ImageUpload'
import GalleryUpload from './GalleryUpload'
import type { JSONContent } from '@tiptap/react'

type Category = { id: string; name: string }

type Project = {
  id?: string
  title: string
  slug: string
  category_id: string
  date: string
  main_image: string
  gallery: string[]
  content: JSONContent | null
  is_featured: boolean
}

type Props = {
  categories: Category[]
  initial?: Project
  defaultCategoryId?: string
}

export default function ProjectForm({ categories, initial, defaultCategoryId }: Props) {
  const router = useRouter()
  const supabase = createClient()

  const [title, setTitle] = useState(initial?.title ?? '')
  const [slug, setSlug] = useState(initial?.slug ?? '')
  const [categoryId, setCategoryId] = useState(initial?.category_id ?? defaultCategoryId ?? '')
  const [date, setDate] = useState(initial?.date ?? new Date().toISOString().split('T')[0])
  const [mainImage, setMainImage] = useState<string>(initial?.main_image ?? '')
  const [gallery, setGallery] = useState<string[]>(initial?.gallery ?? [])
  const [content, setContent] = useState<JSONContent | null>(initial?.content ?? null)
  const [isFeatured, setIsFeatured] = useState(initial?.is_featured ?? false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function handleTitleChange(value: string) {
    setTitle(value)
    if (!initial) setSlug(slugify(value))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!mainImage) { setError('A imagem principal é obrigatória.'); return }
    if (!categoryId) { setError('Selecione uma categoria.'); return }
    setSaving(true)
    setError('')

    const payload = {
      title,
      slug,
      category_id: categoryId,
      date,
      main_image: mainImage,
      gallery,
      content,
      is_featured: isFeatured,
      updated_at: new Date().toISOString(),
    }

    const { error } = initial
      ? await supabase.from('projects').update(payload).eq('id', initial.id)
      : await supabase.from('projects').insert(payload)

    if (error) {
      setError(error.message)
      setSaving(false)
      return
    }

    router.push('/dashboard/projects')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col lg:flex-row gap-6 h-full">
        {/* Coluna esquerda — editor */}
        <div className="flex-1 space-y-5 min-w-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Título</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
                placeholder="Nome do projeto"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Slug</label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Categoria</label>
              <select
                required
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
              >
                <option value="">Selecione...</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Data</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              id="featured"
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="rounded border-neutral-300"
            />
            <label htmlFor="featured" className="text-sm text-neutral-700">
              Destaque no Hero
            </label>
          </div>

          <ImageUpload value={mainImage} onChange={setMainImage} />
          <GalleryUpload value={gallery} onChange={setGallery} />

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Conteúdo</label>
            <TiptapEditor content={content} onChange={setContent} />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex gap-3">
            <Button type="submit" disabled={saving}>
              {saving ? 'Salvando...' : initial ? 'Salvar Alterações' : 'Criar Projeto'}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.push('/dashboard/projects')}>
              Cancelar
            </Button>
          </div>
        </div>

        {/* Coluna direita — preview */}
        <div className="w-full lg:w-96 lg:shrink-0 lg:sticky lg:top-8 lg:self-start lg:max-h-[calc(100vh-4rem)] lg:overflow-y-auto">
          <TiptapPreview
            title={title}
            mainImage={mainImage || null}
            content={content}
            date={date}
          />
        </div>
      </div>
    </form>
  )
}
