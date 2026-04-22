'use client'

import { useState } from 'react'
import ImageUpload from './ImageUpload'
import LogoBrand from '@/components/LogoBrand'

const FONTS = [
  { label: 'Sistema',      cssVar: '' },
  { label: 'Geist',        cssVar: 'var(--font-geist-sans)' },
  { label: 'Playfair',     cssVar: 'var(--font-playfair)' },
  { label: 'Cormorant',    cssVar: 'var(--font-cormorant)' },
  { label: 'Montserrat',   cssVar: 'var(--font-montserrat)' },
  { label: 'Josefin Sans', cssVar: 'var(--font-josefin)' },
  { label: 'Baskerville',  cssVar: 'var(--font-baskerville)' },
]

const ALIGNS: { value: 'start' | 'center' | 'end'; label: string }[] = [
  { value: 'start',  label: '⇤ Início' },
  { value: 'center', label: '↔ Centro' },
  { value: 'end',    label: 'Fim ⇥' },
]

type Props = {
  initial: {
    companyName: string
    type: 'text' | 'image'
    name: string
    subname: string
    imageUrl: string
    logoFont: string
    subnameAlign: 'start' | 'center' | 'end'
  }
}

export default function LogoSettingsPanel({ initial }: Props) {
  const [companyName, setCompanyName] = useState(initial.companyName)
  const [type, setType] = useState<'text' | 'image'>(initial.type)
  const [name, setName] = useState(initial.name)
  const [subname, setSubname] = useState(initial.subname)
  const [imageUrl, setImageUrl] = useState(initial.imageUrl)
  const [logoFont, setLogoFont] = useState(initial.logoFont)
  const [subnameAlign, setSubnameAlign] = useState<'start' | 'center' | 'end'>(initial.subnameAlign || 'end')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  async function handleSave() {
    setSaving(true)
    setSaved(false)
    const entries = [
      { key: 'company_name',     value: companyName },
      { key: 'logo_type',        value: type },
      { key: 'logo_name',        value: name },
      { key: 'logo_subname',     value: subname },
      { key: 'logo_image_url',   value: imageUrl },
      { key: 'logo_font',        value: logoFont },
      { key: 'logo_subname_align', value: subnameAlign },
    ]
    await fetch('/api/admin/logo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entries),
    })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-6 flex flex-col gap-6">

      {/* Company name */}
      <div>
        <label className="block text-sm font-medium text-neutral-900 mb-1">Nome da empresa</label>
        <p className="text-xs text-neutral-400 mb-2">Substituído em todos os textos do site (footer, CTA, título da aba).</p>
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Arquitetura Organizada"
          className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
        />
      </div>

      <div className="border-t border-neutral-100" />

      {/* Logo */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-neutral-900">Logo</h2>
          <div className="flex items-center gap-1 text-xs">
            <button type="button" onClick={() => setType('text')}
              className={`px-3 py-1 rounded-md transition-colors ${type === 'text' ? 'bg-neutral-900 text-white' : 'text-neutral-500 hover:text-neutral-700'}`}>
              Texto
            </button>
            <button type="button" onClick={() => setType('image')}
              className={`px-3 py-1 rounded-md transition-colors ${type === 'image' ? 'bg-neutral-900 text-white' : 'text-neutral-500 hover:text-neutral-700'}`}>
              Imagem
            </button>
          </div>
        </div>

        {type === 'text' ? (
          <div className="flex flex-col gap-4">
            {/* Text inputs */}
            <div className="flex flex-col gap-3">
              <div>
                <label className="block text-xs font-medium text-neutral-600 mb-1">Nome (linha de cima)</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                  placeholder="ARQUITETURA"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 uppercase" />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-600 mb-1">Sub-nome (linha de baixo)</label>
                <input type="text" value={subname} onChange={(e) => setSubname(e.target.value)}
                  placeholder="organizada"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900" />
              </div>
            </div>

            {/* Font picker */}
            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-2">Tipografia</label>
              <div className="grid grid-cols-3 gap-2">
                {FONTS.map((f) => (
                  <button
                    key={f.cssVar}
                    type="button"
                    onClick={() => setLogoFont(f.cssVar)}
                    style={{ fontFamily: f.cssVar }}
                    className={`px-3 py-2.5 rounded-lg text-sm border transition-colors text-left ${
                      logoFont === f.cssVar
                        ? 'border-neutral-900 bg-neutral-50 text-neutral-900'
                        : 'border-neutral-200 text-neutral-600 hover:border-neutral-400'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Subname alignment */}
            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-2">Alinhamento do sub-nome</label>
              <div className="flex gap-2">
                {ALIGNS.map((a) => (
                  <button
                    key={a.value}
                    type="button"
                    onClick={() => setSubnameAlign(a.value)}
                    className={`flex-1 px-3 py-2 rounded-lg text-xs border transition-colors ${
                      subnameAlign === a.value
                        ? 'border-neutral-900 bg-neutral-50 text-neutral-900 font-medium'
                        : 'border-neutral-200 text-neutral-500 hover:border-neutral-400'
                    }`}
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <ImageUpload value={imageUrl} onChange={setImageUrl} bucket="logo" label="Imagem do Logo" />
        )}

        {/* Preview */}
        <div className="pt-3 border-t border-neutral-100">
          <p className="text-xs text-neutral-400 mb-3">Preview</p>
          <div className="bg-white border border-neutral-200 rounded-lg px-4 py-3 inline-flex items-center">
            <LogoBrand
              type={type}
              name={name}
              subname={subname}
              imageUrl={imageUrl}
              logoFont={logoFont}
              subnameAlign={subnameAlign}
            />
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={handleSave}
        disabled={saving}
        className="self-start px-4 py-2 bg-neutral-900 text-white text-sm rounded-lg hover:bg-neutral-800 disabled:opacity-60 transition-colors"
      >
        {saving ? 'Salvando...' : saved ? 'Salvo!' : 'Salvar'}
      </button>
    </div>
  )
}
