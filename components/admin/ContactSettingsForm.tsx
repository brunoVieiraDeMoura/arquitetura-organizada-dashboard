'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

type Settings = {
  whatsapp_number: string
  whatsapp_message: string
  instagram_path: string
  contact_email: string
  gmail_user: string
  gmail_app_password: string
}

export default function ContactSettingsForm({ initial }: { initial: Settings }) {
  const supabase = createClient()

  const [whatsappNumber, setWhatsappNumber] = useState(initial.whatsapp_number)
  const [whatsappMessage, setWhatsappMessage] = useState(initial.whatsapp_message)
  const [instagramPath, setInstagramPath] = useState(initial.instagram_path)
  const [gmailUser, setGmailUser] = useState(initial.gmail_user)
  const [gmailAppPassword, setGmailAppPassword] = useState(initial.gmail_app_password)
  const [showPassword, setShowPassword] = useState(false)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setSuccess(false)
    setError('')

    const rows = [
      { key: 'whatsapp_number', value: whatsappNumber, updated_at: new Date().toISOString() },
      { key: 'whatsapp_message', value: whatsappMessage, updated_at: new Date().toISOString() },
      { key: 'instagram_path', value: instagramPath, updated_at: new Date().toISOString() },
      { key: 'gmail_user', value: gmailUser, updated_at: new Date().toISOString() },
      { key: 'gmail_app_password', value: gmailAppPassword, updated_at: new Date().toISOString() },
    ]

    const { error: err } = await supabase
      .from('settings')
      .upsert(rows, { onConflict: 'key' })

    if (err) {
      setError(err.message)
    } else {
      setSuccess(true)
    }
    setSaving(false)
  }

  const previewWhatsapp = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(whatsappMessage)}`
  const previewInstagram = `https://instagram.com/${instagramPath}`

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-xl">

      {/* WhatsApp */}
      <section className="space-y-4">
        <h2 className="text-base font-semibold text-neutral-900 border-b border-neutral-200 pb-2">
          WhatsApp
        </h2>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Número (com DDI e DDD, só dígitos)
          </label>
          <input
            type="text"
            required
            value={whatsappNumber}
            onChange={(e) => setWhatsappNumber(e.target.value)}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
            placeholder="5511999999999"
          />
          <p className="text-xs text-neutral-400 mt-1">Ex: 5511999999999 → código do país (55) + DDD (11) + número</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Mensagem pré-setada
          </label>
          <textarea
            required
            value={whatsappMessage}
            onChange={(e) => setWhatsappMessage(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 resize-none"
            placeholder="Olá! Gostaria de saber mais sobre..."
          />
        </div>

        <div className="rounded-lg bg-neutral-50 border border-neutral-200 px-3 py-2">
          <p className="text-xs text-neutral-400 mb-0.5">Link gerado:</p>
          <a href={previewWhatsapp} target="_blank" rel="noopener noreferrer"
            className="text-xs text-neutral-600 break-all hover:underline">
            {previewWhatsapp}
          </a>
        </div>
      </section>

      {/* Instagram */}
      <section className="space-y-4">
        <h2 className="text-base font-semibold text-neutral-900 border-b border-neutral-200 pb-2">
          Instagram
        </h2>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Usuário (sem @)
          </label>
          <div className="flex items-center border border-neutral-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-neutral-900">
            <span className="px-3 py-2 bg-neutral-50 text-sm text-neutral-400 border-r border-neutral-300 select-none">
              instagram.com/
            </span>
            <input
              type="text"
              required
              value={instagramPath}
              onChange={(e) => setInstagramPath(e.target.value.replace('@', ''))}
              className="flex-1 px-3 py-2 text-sm focus:outline-none"
              placeholder="domu.arquitetura"
            />
          </div>
        </div>

        <div className="rounded-lg bg-neutral-50 border border-neutral-200 px-3 py-2">
          <p className="text-xs text-neutral-400 mb-0.5">Link gerado:</p>
          <a href={previewInstagram} target="_blank" rel="noopener noreferrer"
            className="text-xs text-neutral-600 break-all hover:underline">
            {previewInstagram}
          </a>
        </div>
      </section>

      {/* Email de Contato */}
      <section className="space-y-4">
        <h2 className="text-base font-semibold text-neutral-900 border-b border-neutral-200 pb-2">
          Email de Contato
        </h2>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Gmail que recebe os contatos
          </label>
          <input
            type="email"
            value={gmailUser}
            onChange={(e) => setGmailUser(e.target.value)}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
            placeholder="seuemail@gmail.com"
          />
          <p className="text-xs text-neutral-400 mt-1">Mensagens enviadas pelo formulário do site chegam neste email.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Senha de App (Google)
          </label>
          <div className="flex items-center border border-neutral-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-neutral-900">
            <input
              type={showPassword ? 'text' : 'password'}
              value={gmailAppPassword}
              onChange={(e) => setGmailAppPassword(e.target.value)}
              className="flex-1 px-3 py-2 text-sm focus:outline-none"
              placeholder="xxxx xxxx xxxx xxxx"
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="px-3 py-2 text-xs text-neutral-400 hover:text-neutral-700 border-l border-neutral-300 bg-neutral-50 transition-colors"
            >
              {showPassword ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>
          <p className="text-xs text-neutral-400 mt-1">Senha de 16 caracteres gerada no Google. Não é a senha da sua conta.</p>
          <Link
            href="/dashboard/tutorial#gmail"
            className="inline-flex items-center gap-1 mt-2 text-xs text-blue-600 hover:underline"
          >
            Como gerar a senha de app →
          </Link>
        </div>
      </section>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {success && <p className="text-sm text-green-700">Configurações salvas com sucesso.</p>}

      <Button type="submit" disabled={saving}>
        {saving ? 'Salvando...' : 'Salvar Configurações'}
      </Button>
    </form>
  )
}
