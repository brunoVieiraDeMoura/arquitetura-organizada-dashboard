import type { Metadata } from "next";
import { Geist, Playfair_Display, Cormorant_Garamond, Montserrat, Josefin_Sans, Libre_Baskerville } from "next/font/google";
import "./globals.css";
import { createClient } from "@/lib/supabase/server";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"] });
const cormorant = Cormorant_Garamond({ variable: "--font-cormorant", subsets: ["latin"], weight: ["300", "400", "600"] });
const montserrat = Montserrat({ variable: "--font-montserrat", subsets: ["latin"] });
const josefin = Josefin_Sans({ variable: "--font-josefin", subsets: ["latin"] });
const baskerville = Libre_Baskerville({ variable: "--font-baskerville", subsets: ["latin"], weight: ["400", "700"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')

export async function generateMetadata(): Promise<Metadata> {
  const supabase = await createClient()
  const { data } = await supabase.from('settings').select('value').eq('key', 'company_name').single()
  const name = data?.value || 'Arquitetura Organizada'
  const description = 'Design de interiores e arquitetura'
  return {
    metadataBase: new URL(siteUrl),
    title: { default: name, template: `%s | ${name}` },
    description,
    openGraph: {
      siteName: name,
      type: 'website',
      locale: 'pt_BR',
      description,
    },
    twitter: {
      card: 'summary_large_image',
      description,
    },
    robots: { index: true, follow: true },
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const fontVars = [
    geistSans.variable,
    playfair.variable,
    cormorant.variable,
    montserrat.variable,
    josefin.variable,
    baskerville.variable,
  ].join(' ')

  return (
    <html lang="pt-BR" className={`${fontVars} antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
