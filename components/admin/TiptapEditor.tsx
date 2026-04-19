'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import type { JSONContent } from '@tiptap/react'

type Props = {
  content: JSONContent | null
  onChange: (json: JSONContent) => void
}

const ToolbarButton = ({
  onClick,
  active,
  children,
}: {
  onClick: () => void
  active?: boolean
  children: React.ReactNode
}) => (
  <button
    type="button"
    onMouseDown={(e) => { e.preventDefault(); onClick() }}
    className={`px-2 py-1 rounded text-sm transition-colors ${
      active ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-100'
    }`}
  >
    {children}
  </button>
)

export default function TiptapEditor({ content, onChange }: Props) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ link: { openOnClick: false } }),
      Image,
      Placeholder.configure({ placeholder: 'Escreva a descrição do projeto...' }),
    ],
    content: content ?? undefined,
    onUpdate: ({ editor }) => onChange(editor.getJSON()),
    editorProps: {
      attributes: {
        class:
          'prose prose-neutral max-w-none min-h-[300px] px-4 py-3 focus:outline-none text-sm',
      },
    },
  })

  if (!editor) return null

  function addImage() {
    const url = window.prompt('URL da imagem:')
    if (url) editor!.chain().focus().setImage({ src: url }).run()
  }

  function setLink() {
    const url = window.prompt('URL do link:')
    if (url) editor!.chain().focus().setLink({ href: url }).run()
  }

  return (
    <div className="border border-neutral-300 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 px-3 py-2 border-b border-neutral-200 bg-neutral-50">
        <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')}>
          <strong>B</strong>
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')}>
          <em>I</em>
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive('heading', { level: 1 })}>
          H1
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })}>
          H2
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })}>
          H3
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')}>
          • Lista
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')}>
          1. Lista
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')}>
          " Citação
        </ToolbarButton>
        <ToolbarButton onClick={setLink} active={editor.isActive('link')}>
          Link
        </ToolbarButton>
        <ToolbarButton onClick={addImage}>
          Imagem
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().undo().run()}>
          ↩ Desfazer
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().redo().run()}>
          ↪ Refazer
        </ToolbarButton>
      </div>

      <EditorContent editor={editor} />
    </div>
  )
}
