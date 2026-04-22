import { createClient } from '@/lib/supabase/server'
import ContactSettingsForm from '@/components/admin/ContactSettingsForm'

export default async function ContactSettingsPage() {
  const supabase = await createClient()

  const { data: rows } = await supabase
    .from('settings')
    .select('key, value')
    .in('key', ['whatsapp_number', 'whatsapp_message', 'instagram_path', 'contact_email', 'gmail_user', 'gmail_app_password'])

  const get = (key: string, fallback = '') =>
    rows?.find((r) => r.key === key)?.value ?? fallback

  const initial = {
    whatsapp_number: get('whatsapp_number', '5511999999999'),
    whatsapp_message: get('whatsapp_message', 'Olá! Gostaria de saber mais sobre os projetos da Arquitetura Organizada.'),
    instagram_path: get('instagram_path', 'domu.arquitetura'),
    contact_email: get('contact_email', 'contato@domuarquitetura.com.br'),
    gmail_user: get('gmail_user', ''),
    gmail_app_password: get('gmail_app_password', ''),
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-neutral-900">Contato</h1>
        <p className="text-sm text-neutral-500 mt-1">
          Configure os links e dados de contato exibidos no site.
        </p>
      </div>

      <ContactSettingsForm initial={initial} />
    </div>
  )
}
