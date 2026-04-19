export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="font-semibold text-sm tracking-wide uppercase mb-1">Domu Arquitetura</p>
          <p className="text-xs text-neutral-400">Design de interiores e arquitetura</p>
        </div>

        <div className="flex items-center gap-6">
          <a href="#projetos" className="text-xs text-neutral-400 hover:text-white transition-colors">Projetos</a>
          <a href="#contato" className="text-xs text-neutral-400 hover:text-white transition-colors">Contato</a>
          <a href="#faq" className="text-xs text-neutral-400 hover:text-white transition-colors">FAQ</a>
        </div>

        <p className="text-xs text-neutral-500">
          © {new Date().getFullYear()} Domu Arquitetura. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
