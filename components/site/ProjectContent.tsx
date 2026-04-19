'use client'

import { useMemo } from 'react'
import { generateHTML } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TiptapImage from '@tiptap/extension-image'

type Props = { content: unknown }

export default function ProjectContent({ content }: Props) {
  const html = useMemo(() => {
    if (!content) return ''
    let parsed = content
    if (typeof parsed === 'string') {
      try { parsed = JSON.parse(parsed) } catch { return '' }
    }
    try {
      return generateHTML(parsed as any, [StarterKit, TiptapImage])
    } catch {
      return ''
    }
  }, [content])

  if (!html) return <p className="text-neutral-400 text-sm italic">Sem descrição.</p>

  return (
    <div
      className="prose prose-neutral max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
