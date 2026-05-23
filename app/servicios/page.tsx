import Link from 'next/link'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Monitor, MessageSquare, Phone, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: { absolute: 'Diseño Web y Asistentes IA | STRUCT9 Design' },
  description: 'Diseño web a medida y asistentes IA (chatbot WhatsApp y voz) para PYMEs españolas. Presupuesto gratuito, respuesta en menos de 24h.',
  alternates: { canonical: 'https://struct9design.com/servicios' },
  openGraph: {
    title: 'Diseño Web y Asistentes IA — STRUCT9 Design',
    description: 'Webs a medida y asistentes IA para PYMEs. Presupuesto gratuito, respuesta en menos de 24h.',
    url: 'https://struct9design.com/servicios',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'STRUCT9 Design' }],
    siteName: 'STRUCT9 Design',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Diseño Web y Asistentes IA — STRUCT9 Design',
    description: 'Webs a medida y asistentes IA para PYMEs. Presupuesto gratuito.',
    images: ['/og-image.png'],
  },
}

const services = [
  {
    icon: Monitor,
    name: 'Diseño & Desarrollo Web',
    tag: 'Presupuesto a medida',
    headline: 'Tu negocio merece una web que trabaje por ti.',
    desc: 'Da igual si partes de cero, de tu cuenta de Instagram o tienes una web antigua que necesita renovarse. Diseñamos y desarrollamos webs a medida que convierten visitas en clientes: landing pages de alta conversión, webs corporativas, e-commerce, CRMs personalizados y rediseños que modernizan tu imagen sin perder lo que ya funciona. Código limpio, responsive, optimizado para Google y listo para crecer contigo.',
    includes: [
      'Webs desde cero o desde tu perfil de Instagram',
      'Landing pages y webs corporativas',
      'CRMs y paneles de gestión a medida',
      'Rediseño de web antigua a diseño moderno',
      'Optimización SEO incluida en cada proyecto',
      'Diseño + desarrollo en un único equipo',
    ],
  },
  {
    icon: MessageSquare,
    name: 'Chatbot WhatsApp 24/7',
    tag: 'Setup + cuota mensual',
    headline: 'Tu negocio atendiendo clientes mientras duermes.',
    desc: 'Un chatbot de WhatsApp entrenado con toda la información de tu negocio: servicios, precios, horarios, ubicación, preguntas frecuentes. Atiende consultas, gestiona reservas y citas, filtra clientes y escala a un humano cuando es necesario — todo de forma automática, las 24 horas del día. Tus clientes obtienen respuesta inmediata, tú recibes solo los contactos cualificados.',
    includes: [
      'Asistente entrenado con la información de tu negocio',
      'Atención automática 24/7 en WhatsApp',
      'Gestión de reservas y citas',
      'Gestión de consultas y preguntas frecuentes',
      'Derivación a humano cuando sea necesario',
      'Actualizaciones y mantenimiento incluidos',
    ],
  },
  {
    icon: Phone,
    name: 'Asistente de Voz IA',
    tag: 'Setup + cuota mensual',
    headline: 'Nunca más una llamada sin respuesta.',
    desc: 'Un asistente de voz con IA que atiende las llamadas de tu negocio las 24 horas: responde preguntas, gestiona reservas y citas, toma mensajes y registra solicitudes. Voz natural, formado con tu información, integrado con tu sistema de agenda. Tus clientes siempre tienen a alguien al teléfono — aunque estés ocupado, fuera de horario o de vacaciones.',
    includes: [
      'Asistente de voz entrenado con tu negocio',
      'Atención telefónica automática 24/7',
      'Gestión de reservas y citas',
      'Registro de solicitudes y mensajes',
      'Actualizaciones y mantenimiento incluidos',
    ],
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Servicios digitales — STRUCT9 Design',
  url: 'https://struct9design.com/servicios',
  numberOfItems: services.length,
  itemListElement: services.map((s, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Service',
      name: s.name,
      description: s.headline,
      provider: {
        '@type': 'Organization',
        name: 'STRUCT9 Design',
        url: 'https://struct9design.com',
      },
    },
  })),
}

export default function Servicios() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="flex-1 pt-24 pb-28">
        <div className="mx-auto max-w-7xl px-6">

          {/* Page header */}
          <div className="mb-16 pt-8">
            <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-oro mb-3">Catálogo completo</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-nieve leading-tight">
              Dos servicios.<br />
              <span className="text-gradient-oro">Toda tu presencia digital.</span>
            </h1>
            <p className="mt-4 text-nieve/35 text-base max-w-xl leading-relaxed">
              Webs a medida y asistentes IA que trabajan por tu negocio las 24 horas. Presupuesto gratuito, sin compromiso.
            </p>
          </div>

          {/* Services grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {services.map(({ icon: Icon, name, tag, headline, desc, includes }) => (
              <div
                key={name}
                className="reveal group rounded-2xl border border-white/[0.05] bg-pizarra/60 p-8
                  hover:border-oro/[0.15] hover:bg-pizarra transition-all duration-400"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3.5">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-oro/10 shrink-0
                      group-hover:bg-oro/[0.18] transition-colors duration-300">
                      <Icon className="h-5 w-5 text-oro" />
                    </div>
                    <div>
                      <h2 className="font-bold text-nieve">{name}</h2>
                      <p className="text-xs text-oro/70 font-medium mt-0.5">{headline}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs font-semibold text-oro/80">{tag}</div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-nieve/40 leading-relaxed mb-5">{desc}</p>

                {/* Includes */}
                <ul className="space-y-2 mb-6">
                  {includes.map(item => (
                    <li key={item} className="flex items-start gap-2.5 text-xs text-nieve/50">
                      <span className="mt-1.5 h-px w-3 bg-oro/40 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/contacto?servicio=${encodeURIComponent(name)}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-oro/50
                    hover:text-oro group-hover:text-oro transition-colors duration-200"
                >
                  Solicitar información <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            ))}
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
