import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: { absolute: 'Contacto — Presupuesto gratuito en 24h | STRUCT9 Design' },
  description: 'Solicita presupuesto gratuito para tu proyecto digital. Respondemos en menos de 24 horas con precio cerrado y plazo exacto. Sin reuniones, sin compromiso.',
  alternates: { canonical: 'https://struct9design.com/contacto' },
  openGraph: {
    title: 'Solicita presupuesto gratuito — STRUCT9 Design',
    description: 'Respondemos en menos de 24 horas con precio cerrado.',
    url: 'https://struct9design.com/contacto',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Contacto STRUCT9 Design — Solicita tu presupuesto gratuito' }],
    siteName: 'STRUCT9 Design',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Solicita presupuesto gratuito — STRUCT9 Design',
    description: 'Respondemos en menos de 24 horas con precio cerrado y plazo exacto. Sin reuniones, sin compromiso.',
    images: ['/og-image.png'],
  },
}

export default function ContactoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
