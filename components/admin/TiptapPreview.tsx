'use client'

import { generateHTML } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import type { JSONContent } from '@tiptap/react'
import { useMemo } from 'react'

type Props = {
  title: string
  mainImage: string | null
  content: JSONContent | null
  date: string
}

export default function TiptapPreview({ title, mainImage, content, date }: Props) {
  const html = useMemo(() => {
    if (!content) return ''
    try {
      return generateHTML(content, [StarterKit, Image])
    } catch {
      return ''
    }
  }, [content])

  return (
    <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden h-full overflow-y-auto">
      <div className="px-4 py-3 border-b border-neutral-200 bg-neutral-50">
        <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Preview</span>
      </div>

      <div className="p-6">
        {mainImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={mainImage}
            alt={title}
            className="w-full aspect-video object-cover rounded-lg mb-6"
          />
        )}

        {title && (
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">{title}</h1>
        )}

        {date && (
          <p className="text-sm text-neutral-400 mb-6">{date}</p>
        )}

        {html ? (
          <div
            className="prose prose-neutral max-w-none text-sm max-h-64 overflow-hidden relative"
          >
            <div dangerouslySetInnerHTML={{ __html: html }} />
            {/* Fade-out gradient when content overflows */}
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" />
          </div>
        ) : (
          <p className="text-sm text-neutral-400 italic">O conteúdo aparecerá aqui...</p>
        )}
      </div>
    </div>
  )
}
