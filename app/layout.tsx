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
    default: 'STRUCT9 Design — Presencia digital real para negocios reales.',
    template: '%s | STRUCT9 Design',
  },
  description: 'Diseño web a medida y asistentes IA (chatbot WhatsApp y voz) para PYMEs españolas. Presupuesto gratuito, respuesta en menos de 24h.',
  keywords: ['agencia digital', 'agencia IA', 'diseño web PYME', 'desarrollo web a medida', 'chatbot WhatsApp', 'asistente de voz IA', 'agencia digital España'],
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
    title: 'STRUCT9 Design — Presencia digital real para negocios reales.',
    description: 'Diseño web a medida y asistentes IA (chatbot WhatsApp y voz) para PYMEs españolas. Presupuesto gratuito, respuesta en menos de 24h.',
    images: [{ url: '/icon.png', alt: 'STRUCT9 Design' }],
  },
  twitter: {
    card: 'summary',
    title: 'STRUCT9 Design — Presencia digital real para negocios reales.',
    description: 'Diseño web a medida y asistentes IA (chatbot WhatsApp y voz) para PYMEs españolas. Presupuesto gratuito, respuesta en menos de 24h.',
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
