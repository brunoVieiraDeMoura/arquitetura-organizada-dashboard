type Testimonial = { id: string; author: string; role: string; content: string }

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  if (!testimonials.length) return null

  return (
    <section id="depoimentos" className="py-24 px-6 bg-neutral-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-neutral-900 mb-12 text-center">O que dizem nossos clientes</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white rounded-xl border border-neutral-200 p-6">
              <p className="text-neutral-600 text-sm leading-relaxed mb-6">"{t.content}"</p>
              <div>
                <p className="font-medium text-neutral-900 text-sm">{t.author}</p>
                {t.role && <p className="text-xs text-neutral-400">{t.role}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
