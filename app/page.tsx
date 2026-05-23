import Link from 'next/link'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ServicesSection from '@/components/ServicesSection'
import { ArrowRight } from 'lucide-react'


const differentiators = [
  {
    n: '01',
    title: 'De la idea al resultado antes de lo que esperas',
    desc: 'Sabemos que el tiempo es lo más valioso de un negocio. Por eso cada proyecto arranca con un plazo concreto que cumplimos siempre: procesos optimizados, sin esperas innecesarias, para que tengas el resultado en tus manos cuanto antes.',
  },
  {
    n: '02',
    title: 'Precio de freelance. Calidad de gran agencia.',
    desc: 'Sin equipos de diez personas facturando horas vacías. Sin gerentes de cuenta. Sin reuniones de alineación. Precio cerrado antes de empezar. Pagas el resultado, no el proceso que hay detrás.',
  },
  {
    n: '03',
    title: 'Cero burocracia. Cero scope creep.',
    desc: 'Sin reuniones de descubrimiento de tres semanas. Sin "esto se sale del alcance". Cuéntanos qué necesitas, confirmamos en 24h y arrancamos. Así de simple, así de rápido.',
  },
  {
    n: '04',
    title: 'IA real. No marketing de IA.',
    desc: 'No usamos IA para parecer modernos en LinkedIn. La usamos para darte en días lo que antes costaba meses y €10.000. La misma tecnología que tienen las grandes empresas, aplicada al tamaño de tu negocio.',
  },
  {
    n: '05',
    title: 'Entregables concretos, no promesas vacías.',
    desc: 'No vendemos estrategias. No vendemos consultoría. Vendemos resultados tangibles: una web funcional, un informe accionable, un flujo automatizado. Cuando cerramos el proyecto, tienes algo en la mano que puedes usar hoy mismo.',
  },
]

const steps = [
  { n: '01', title: 'Contáctanos',          desc: 'Cuéntanos qué necesitas. Confirmamos presupuesto en menos de 24h.' },
  { n: '02', title: 'Arrancamos',           desc: 'En cuanto confirmas, empezamos. La IA trabaja en tu entregable.' },
  { n: '03', title: 'Recibes el resultado', desc: 'En el plazo acordado recibes el resultado final, revisado y listo.' },
]

const faqs = [
  {
    q: '¿Cómo funciona el proceso desde que os contacto?',
    a: 'Simple: rellenas el formulario, en menos de 24 horas recibes un presupuesto cerrado con el plazo exacto y el entregable concreto que vas a recibir. Cuando confirmas, arrancamos de inmediato. Sin reuniones interminables, sin fases de descubrimiento de semanas, sin burocracia de ningún tipo.',
  },
  {
    q: '¿Por qué sois tan rápidos comparados con otras agencias?',
    a: 'Porque usamos sistemas de IA de última generación que comprimen el tiempo de ejecución. Una agencia tradicional tiene equipos que facturan por horas, procesos de validación internos y capas de gestión que alargan cada proyecto artificialmente. Nosotros hemos eliminado todo eso. El resultado: misma calidad, tiempo y precio radicalmente inferiores.',
  },
  {
    q: '¿El precio es realmente fijo? ¿Sin extras ni sorpresas?',
    a: 'Sí. Precio cerrado antes de empezar, por escrito. Sin sorpresas, sin "esto se sale del scope", sin coste por revisiones razonables. No cerramos un proyecto hasta que estás conforme con el resultado. Esa es nuestra garantía.',
  },
  {
    q: '¿Para qué tipo de negocios trabajáis?',
    a: 'Principalmente PYMEs y negocios digitales españoles que quieren resultados de agencia sin pagar precio de gran agencia. Si tienes un negocio con presencia digital —o quieres construirla—, nuestros servicios están diseñados para ti. Desde autónomos hasta empresas de 50 empleados.',
  },
  {
    q: '¿Necesito conocimientos técnicos para trabajar con vosotros?',
    a: 'Ninguno. Tú nos dices qué necesitas en tu idioma: "quiero una web", "quiero saber por qué mis anuncios no funcionan", "quiero automatizar mis facturas". Nosotros lo traducimos a tecnología y te devolvemos un resultado listo para usar. Sin tecnicismos, sin curva de aprendizaje.',
  },
  {
    q: '¿Qué diferencia hay entre vosotros y contratar a un freelance?',
    a: 'Un freelance tiene un perfil específico: diseñador, programador o marketero. Nosotros combinamos todos esos perfiles en un solo equipo potenciado por IA. Más capacidad, más velocidad, precio comparable, y un único interlocutor que responde de todo. Sin coordinar entre distintos profesionales.',
  },
  {
    q: '¿Podéis gestionar varios proyectos o servicios a la vez?',
    a: 'Sí. Puedes contratar los dos servicios simultáneamente — una web y un asistente IA, por ejemplo — y los gestionamos en paralelo. Tendrás un único punto de contacto para todo, sin necesidad de coordinar distintos proveedores.',
  },
  {
    q: '¿Trabajáis con cualquier sector?',
    a: 'Trabajamos con la mayoría de sectores: hostelería, consultoría, e-commerce, servicios profesionales, salud, formación, inmobiliaria... Nuestro modelo está diseñado para adaptarse a cualquier tipo de negocio digital. Si tienes dudas sobre si tu sector encaja, escríbenos y te lo confirmamos en menos de 24h.',
  },
  {
    q: '¿Qué pasa si no quedo satisfecho con el resultado?',
    a: 'No cerramos ningún proyecto hasta que estás conforme. Las revisiones razonables están incluidas sin coste adicional. Si en algún momento el resultado no es lo que esperabas, trabajamos hasta que lo sea. Eso es nuestra garantía: pagas el resultado, no el intento.',
  },
]

const tickerItems = [
  'Diseño Web', 'Desarrollo Web', 'Chatbot WhatsApp 24/7', 'Asistente de Voz IA',
  'Landing Pages', 'CRM a Medida', 'Presencia Digital', 'IA para tu Negocio',
]

export const metadata: Metadata = {
  title: { absolute: 'STRUCT9 Design — Presencia digital real para negocios reales.' },
  description: 'Diseño web a medida y asistentes IA (chatbot WhatsApp y voz) para PYMEs españolas. Presupuesto gratuito, respuesta en menos de 24h.',
  alternates: { canonical: 'https://struct9design.com' },
  openGraph: {
    title: 'STRUCT9 Design — Presencia digital real para negocios reales.',
    description: 'Diseño web a medida y asistentes IA (chatbot WhatsApp y voz) para PYMEs españolas. Presupuesto gratuito, respuesta en menos de 24h.',
    url: 'https://struct9design.com',
    images: [{ url: '/icon.png', alt: 'STRUCT9 Design' }],
    siteName: 'STRUCT9 Design',
    locale: 'es_ES',
    type: 'website',
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://struct9design.com/#organization',
  name: 'STRUCT9 Design',
  url: 'https://struct9design.com',
  description: 'Agencia digital con IA para PYMEs españolas. Diseño web a medida y asistentes de voz y WhatsApp 24/7.',
  address: { '@type': 'PostalAddress', addressCountry: 'ES' },
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://struct9design.com/#website',
  url: 'https://struct9design.com',
  name: 'STRUCT9 Design',
  publisher: { '@id': 'https://struct9design.com/#organization' },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />
      <main className="flex-1">

        {/* ─── HERO ─── */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
          {/* Grid background */}
          <div className="absolute inset-0 grid-bg" />
          {/* Radial vignette — fades the grid toward the edges */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_48%,transparent_15%,rgba(8,8,8,0.75)_55%,#080808_100%)]" />
          {/* Gold ambient glow */}
          <div className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[240px] rounded-full bg-oro/[0.065] blur-[100px] pointer-events-none" />

          <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">

            {/* Brand headline */}
            <div
              className="animate-fade-up mb-1"
            >
              <h1 className="text-[clamp(4.5rem,13vw,10rem)] font-black tracking-[-0.03em] leading-[0.85]">
                <span className="block text-nieve">STRUCT9</span>
                <span className="block text-gradient-oro">DESIGN</span>
                <span className="sr-only"> — Agencia IA para PYMEs</span>
              </h1>
            </div>

            {/* Divider */}
            <div
              className="animate-fade-up flex items-center justify-center gap-5 my-8"
              style={{ animationDelay: '100ms' }}
            >
              <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-transparent to-oro/30" />
              <span className="text-[10px] font-semibold tracking-[0.4em] uppercase text-nieve/20">Tu agencia digital</span>
              <div className="h-px flex-1 max-w-[60px] bg-gradient-to-l from-transparent to-oro/30" />
            </div>

            {/* Subtitle */}
            <p
              className="animate-fade-up text-base sm:text-lg text-nieve/35 max-w-lg mx-auto leading-relaxed mb-10"
              style={{ animationDelay: '200ms' }}
            >
              Webs a medida y asistentes IA para que tu negocio nunca pare.
            </p>

            {/* CTAs */}
            <div
              className="animate-fade-up flex flex-col sm:flex-row items-center justify-center gap-3"
              style={{ animationDelay: '360ms' }}
            >
              <Link
                href="/servicios"
                className="flex items-center gap-2 rounded-xl bg-oro px-7 py-3.5 text-sm font-bold text-grafito hover:bg-oro/85 transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_28px_rgba(201,162,39,0.35)]"
              >
                Ver servicios <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contacto"
                className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-7 py-3.5 text-sm font-medium text-nieve/50 hover:border-white/[0.15] hover:text-nieve hover:bg-white/[0.06] transition-all duration-200"
              >
                Presupuesto gratuito
              </Link>
            </div>

            {/* Stats */}
            <div
              className="animate-fade-up mt-20 flex items-center justify-center gap-12 sm:gap-20"
              style={{ animationDelay: '480ms' }}
            >
              {[
                ['24/7', 'Asistentes IA activos'],
                ['80%',  'Ahorro vs. agencia'],
                ['<24h', 'Respuesta garantizada'],
              ].map(([v, l]) => (
                <div key={l} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-oro">{v}</div>
                  <div className="text-[11px] text-nieve/25 mt-1 tracking-wide">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── TICKER ─── */}
        <div className="border-y border-white/[0.05] py-4 overflow-hidden">
          <div className="animate-ticker flex gap-14 w-max">
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span
                key={i}
                className="text-[10px] font-bold tracking-[0.22em] uppercase text-nieve/15 whitespace-nowrap flex items-center gap-4"
              >
                <span className="h-1 w-1 rounded-full bg-oro inline-block shrink-0" />
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* ─── SERVICIOS ─── */}
        <section className="py-28 px-6">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14">
              <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-oro mb-3">Servicios</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-nieve leading-tight">
                Dos servicios.<br />Toda tu presencia digital.
              </h2>
            </div>

            <ServicesSection />
          </div>
        </section>

        {/* ─── POR QUÉ STRUCT9 ─── */}
        <section className="py-28 px-6">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 max-w-2xl">
              <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-oro mb-3">Por qué STRUCT9</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-nieve leading-tight">
                Somos el equipo digital<br />
                <span className="text-gradient-oro">que ojalá hubieras encontrado antes.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {differentiators.map(({ n, title, desc }, i) => (
                <div
                  key={n}
                  className={`reveal group rounded-2xl border border-white/[0.05] bg-pizarra/40 p-8
                    hover:border-oro/[0.12] hover:bg-pizarra/70 transition-all duration-400${
                    i === differentiators.length - 1 && differentiators.length % 2 !== 0
                      ? ' md:col-span-2'
                      : ''
                  }`}
                >
                  <div className="flex items-start gap-5">
                    <span className="text-4xl font-black text-oro/[0.12] leading-none shrink-0 group-hover:text-oro/[0.22] transition-colors duration-400 select-none">
                      {n}
                    </span>
                    <div>
                      <h3 className="font-bold text-nieve mb-3 leading-snug">{title}</h3>
                      <p className="text-sm text-nieve/40 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── PROCESO ─── */}
        <section id="proceso" className="py-28 px-6 bg-pizarra/20">
          <div className="mx-auto max-w-5xl">
            <div className="mb-14">
              <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-oro mb-3">Proceso</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-nieve">
                Simple, rápido, fiable
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
              {steps.map(({ n, title, desc }) => (
                <div key={n} className="reveal">
                  <div className="text-[5.5rem] font-black leading-none mb-5 select-none text-nieve/[0.04]">{n}</div>
                  <div className="w-6 h-px bg-oro/40 mb-4" />
                  <h3 className="font-semibold text-nieve mb-3">{title}</h3>
                  <p className="text-sm text-nieve/35 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section className="py-28 px-6">
          <div className="mx-auto max-w-3xl">
            <div className="mb-14">
              <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-oro mb-3">FAQ</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-nieve leading-tight">
                Todo lo que necesitas saber<br />antes de empezar
              </h2>
            </div>

            <div className="divide-y divide-white/[0.05]">
              {faqs.map(({ q, a }) => (
                <details key={q} className="group py-1">
                  <summary className="flex items-center justify-between gap-6 py-5 cursor-pointer list-none select-none [&::-webkit-details-marker]:hidden">
                    <span className="text-sm sm:text-base font-medium text-nieve/65 group-open:text-nieve transition-colors duration-200 text-left">
                      {q}
                    </span>
                    <span className="shrink-0 h-6 w-6 rounded-full border border-white/[0.08] flex items-center justify-center
                      group-open:border-oro/40 group-open:bg-oro/[0.06] transition-all duration-300">
                      <span className="text-nieve/35 text-sm leading-none font-light group-open:text-oro group-open:rotate-45 transition-all duration-300 inline-block">
                        +
                      </span>
                    </span>
                  </summary>
                  <div className="pb-6 pr-12 text-sm text-nieve/40 leading-relaxed">
                    {a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA FINAL ─── */}
        <section className="py-28 px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl sm:text-5xl font-bold text-nieve leading-tight mb-6">
              ¿Listo para transformar<br />
              <span className="text-gradient-oro">tu negocio digital?</span>
            </h2>
            <p className="text-nieve/30 text-base mb-10 max-w-md mx-auto leading-relaxed">
              Presupuesto gratuito en menos de 24 horas. Sin compromiso.
            </p>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 rounded-xl bg-oro px-9 py-4 text-sm font-bold text-grafito
                hover:bg-oro/85 transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_0_32px_rgba(201,162,39,0.35)]"
            >
              Solicitar presupuesto <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
