'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

type Props = {
  value: string[]
  onChange: (urls: string[]) => void
}

export default function GalleryUpload({ value, onChange }: Props) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setUploading(true)
    setError('')
    const uploaded: string[] = []

    for (const file of acceptedFiles) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('bucket', 'projects')

      try {
        const res = await fetch('/api/upload', { method: 'POST', body: formData })
        const json = await res.json()

        if (!res.ok || json.error) {
          setError(json.error ?? 'Erro ao enviar imagem')
        } else {
          uploaded.push(json.url)
        }
      } catch {
        setError('Falha na conexão ao enviar imagem')
      }
    }

    if (uploaded.length > 0) {
      onChange([...value, ...uploaded])
    }
    setUploading(false)
  }, [value, onChange])

  function removeImage(url: string) {
    onChange(value.filter((u) => u !== url))
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: true,
  })

  return (
    <div>
      <label className="block text-sm font-medium text-neutral-700 mb-2">Galeria de Fotos</label>

      {value.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mb-3">
          {value.map((url) => (
            <div key={url} className="relative aspect-square">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="w-full h-full object-cover rounded-lg border border-neutral-200" />
              <button
                type="button"
                onClick={() => removeImage(url)}
                className="absolute top-1 right-1 bg-white border border-neutral-200 rounded-full w-6 h-6 flex items-center justify-center text-xs text-neutral-500 hover:bg-neutral-50"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-neutral-900 bg-neutral-50' : 'border-neutral-300 hover:border-neutral-400'
        } ${uploading ? 'opacity-60 pointer-events-none' : ''}`}
      >
        <input {...getInputProps()} />
        <p className="text-sm text-neutral-500">
          {uploading ? 'Enviando...' : 'Arraste fotos ou clique para adicionar à galeria'}
        </p>
      </div>

      {error && (
        <p className="mt-1.5 text-xs text-red-600">{error}</p>
      )}
    </div>
  )
}
