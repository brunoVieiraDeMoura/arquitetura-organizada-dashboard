import Navbar from '@/components/site/Navbar'
import { createClient } from '@/lib/supabase/server'

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: rows } = await supabase
    .from('settings')
    .select('key, value')
    .in('key', ['logo_type', 'logo_name', 'logo_subname', 'logo_image_url', 'logo_font', 'logo_subname_align'])

  const get = (key: string, fallback = '') => rows?.find((r) => r.key === key)?.value ?? fallback

  const logoSettings = {
    type: (get('logo_type', 'text') as 'text' | 'image'),
    name: get('logo_name', 'Arquitetura'),
    subname: get('logo_subname', 'organizada'),
    imageUrl: get('logo_image_url', ''),
    logoFont: get('logo_font', ''),
    subnameAlign: (get('logo_subname_align', 'end') as 'start' | 'center' | 'end'),
  }

  return (
    <>
      <Navbar logoSettings={logoSettings} />
      <div className="pt-16">{children}</div>
    </>
  )
}
