import { createClient } from '@/lib/supabase/server'
import Hero from '@/components/site/Hero'
import Features from '@/components/site/Features'
import CTA from '@/components/site/CTA'
import Testimonials from '@/components/site/Testimonials'
import Contact from '@/components/site/Contact'
import FAQ from '@/components/site/FAQ'
import Footer from '@/components/site/Footer'

export const revalidate = 60 // ISR: revalida a cada 60s

export default async function HomePage() {
  const supabase = await createClient()

  const [
    { data: featuredProjects },
    { data: categories },
    { data: testimonials },
    { data: faqs },
    { data: settingsRows },
  ] = await Promise.all([
    supabase
      .from('projects')
      .select('id, title, slug, main_image, date, categories(name, slug)')
      .eq('is_featured', true)
      .order('created_at', { ascending: false })
      .limit(6),
    supabase
      .from('categories')
      .select('id, name, slug, description, projects(id, title, slug, main_image, date, content)')
      .order('order_index', { ascending: true }),
    supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false }),
    supabase
      .from('faqs')
      .select('*')
      .order('order_index', { ascending: true }),
    supabase
      .from('settings')
      .select('key, value')
      .in('key', ['whatsapp_number', 'whatsapp_message', 'instagram_path']),
  ])

  const getSetting = (key: string, fallback = '') =>
    (settingsRows as any[])?.find((r) => r.key === key)?.value ?? fallback

  return (
    <>
      <Hero projects={(featuredProjects as any) ?? []} />
      <Features categories={(categories as any) ?? []} />
      <CTA />
      <Testimonials testimonials={testimonials ?? []} />
      <Contact
        whatsappNumber={getSetting('whatsapp_number', '5511999999999')}
        whatsappMessage={getSetting('whatsapp_message', 'Olá! Gostaria de saber mais sobre os projetos da Domu Arquitetura.')}
        instagramPath={getSetting('instagram_path', 'domu.arquitetura')}
      />
      <FAQ faqs={faqs ?? []} />
      <Footer />
    </>
  )
}
