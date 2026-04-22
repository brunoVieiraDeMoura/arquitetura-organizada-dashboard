import { createClient } from '@/lib/supabase/server'

export default async function Footer() {
  const supabase = await createClient()
  const { data } = await supabase.from('settings').select('value').eq('key', 'company_name').single()
  const name = data?.value || 'Arquitetura Organizada'

  return (
    <footer className="bg-neutral-900 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="font-semibold text-sm tracking-wide uppercase mb-1">{name}</p>
          <p className="text-xs text-neutral-400">Design de interiores e arquitetura</p>
        </div>

        <div className="flex items-center gap-6">
          <a href="#projetos" className="text-xs text-neutral-400 hover:text-white transition-colors">Projetos</a>
          <a href="#contato" className="text-xs text-neutral-400 hover:text-white transition-colors">Contato</a>
          <a href="#faq" className="text-xs text-neutral-400 hover:text-white transition-colors">FAQ</a>
          <a href="/dashboard" className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors">Dash</a>
        </div>

        <p className="text-xs text-neutral-500 text-center md:text-left">
          © {new Date().getFullYear()} {name}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
