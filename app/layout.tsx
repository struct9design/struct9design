import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

const SITE_URL = 'https://struct9design.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: SITE_URL },
  title: {
    default: 'STRUCT9 Design — Agencia IA para PYMEs',
    template: '%s | STRUCT9 Design',
  },
  description: 'Webs, auditorías SEO, Meta Ads y automatizaciones con IA. Entrega en 48h, precio fijo, sin sorpresas. La agencia digital más rápida para PYMEs en España.',
  keywords: ['agencia digital', 'agencia IA', 'SEO España', 'diseño web PYME', 'automatización n8n', 'Meta Ads', 'agencia digital Madrid'],
  authors: [{ name: 'STRUCT9 Design', url: SITE_URL }],
  creator: 'STRUCT9 Design',
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
    shortcut: '/icon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: SITE_URL,
    siteName: 'STRUCT9 Design',
    title: 'STRUCT9 Design — Agencia IA para PYMEs',
    description: 'Webs, auditorías SEO, Meta Ads y automatizaciones con IA. Entrega en 48h, precio fijo, sin sorpresas.',
    images: [{ url: '/icon.png', alt: 'STRUCT9 Design' }],
  },
  twitter: {
    card: 'summary',
    title: 'STRUCT9 Design — Agencia IA para PYMEs',
    description: 'Webs, SEO, Meta Ads y automatizaciones con IA. Entrega en 48h.',
    images: ['/icon.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-grafito text-humo">
        {children}
      </body>
    </html>
  )
}
