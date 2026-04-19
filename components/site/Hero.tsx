'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

type Project = {
  id: string
  title: string
  slug: string
  main_image: string
  date: string
  categories: { name: string; slug: string } | null
}

export default function Hero({ projects }: { projects: Project[] }) {
  const [current, setCurrent] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  function startTimer() {
    if (timerRef.current) clearInterval(timerRef.current)
    if (projects.length <= 1) return
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % projects.length)
    }, 5000)
  }

  useEffect(() => {
    startTimer()
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects.length])

  if (!projects.length) return null

  const project = projects[current]

  function goTo(i: number) {
    setCurrent(i)
    startTimer()
  }

  return (
    <section className="relative h-[100dvh] overflow-hidden">
      {/* Background images (all rendered, only active is visible) */}
      {projects.map((p, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={p.id}
          src={p.main_image}
          alt={p.title}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            i === current ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-20 px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          {project.categories && (
            <span className="text-xs font-medium text-white/70 uppercase tracking-widest mb-3 block">
              {project.categories.name}
            </span>
          )}
          <h1 className="text-5xl font-bold text-white mb-4 max-w-2xl leading-tight">
            {project.title}
          </h1>
          <Link
            href={`/${project.categories?.slug ?? 'projetos'}/${project.slug}`}
            className="inline-flex items-center text-sm text-white border border-white/50 px-6 py-3 rounded-full hover:bg-white/10 transition-colors"
          >
            Ver Projeto →
          </Link>
        </div>

        {/* Dots navigation */}
        {projects.length > 1 && (
          <div className="flex gap-2">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current ? 'bg-white w-6' : 'bg-white/40 w-2'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
