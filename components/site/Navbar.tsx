'use client'

import Link from 'next/link'
import { useState } from 'react'

const links = [
  { href: '#projetos', label: 'Projetos' },
  { href: '#depoimentos', label: 'Depoimentos' },
  { href: '#faq', label: 'FAQ' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold text-neutral-900 tracking-wide text-sm uppercase">
          Domu Arquitetura
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
              {l.label}
            </a>
          ))}
          <a href="#contato" className="text-sm bg-neutral-900 text-white px-4 py-2 rounded-lg hover:bg-neutral-800 transition-colors">
            Contato
          </a>
        </div>

        {/* Mobile — botão hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 -mr-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          <span className={`block w-5 h-0.5 bg-neutral-900 transition-transform duration-200 ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block w-5 h-0.5 bg-neutral-900 transition-opacity duration-200 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-neutral-900 transition-transform duration-200 ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {/* Mobile — menu expandido */}
      {open && (
        <div className="md:hidden border-t border-neutral-200 bg-white/95 backdrop-blur-sm px-6 py-4 flex flex-col gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-2.5 text-sm text-neutral-700 hover:text-neutral-900 transition-colors border-b border-neutral-100 last:border-0"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contato"
            onClick={() => setOpen(false)}
            className="mt-2 text-center text-sm bg-neutral-900 text-white px-4 py-2.5 rounded-lg hover:bg-neutral-800 transition-colors"
          >
            Contato
          </a>
        </div>
      )}
    </nav>
  )
}
