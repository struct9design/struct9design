import Link from 'next/link'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import {
  Search, Target, BarChart3, Globe, Smartphone,
  PieChart, Zap, Puzzle, Clock, ArrowRight, Package,
} from 'lucide-react'

export const metadata: Metadata = {
  title: { absolute: 'Agencia IA: SEO, Webs y Automatizaciones | STRUCT9' },
  description: 'Catálogo completo de servicios: diagnóstico SEO, Meta Ads, webs express, dashboard financiero, automatizaciones con n8n y más. Precios fijos, entrega rápida, sin sorpresas.',
  alternates: { canonical: 'https://struct9design.com/servicios' },
  openGraph: {
    title: 'Agencia IA: SEO, Webs y Automatizaciones — STRUCT9 Design',
    description: 'SEO, webs, Meta Ads y automatizaciones para PYMEs. Precios fijos, entrega rápida.',
    url: 'https://struct9design.com/servicios',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'STRUCT9 Design' }],
    siteName: 'STRUCT9 Design',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SEO, Webs y Automatizaciones con IA — STRUCT9 Design',
    description: 'Catálogo completo: SEO, Meta Ads, webs, dashboards y automatizaciones para PYMEs. Precio fijo, entrega rápida.',
    images: ['/og-image.png'],
  },
}

const services = [
  {
    icon: Search,
    name: 'Diagnóstico SEO',
    price: 497,
    deadline: '72h',
    headline: 'Tu web existe. Google no lo sabe.',
    desc: '¿Sabes exactamente por qué tu negocio no aparece en los primeros resultados de búsqueda? La mayoría de las webs tienen entre 20 y 80 errores técnicos que las hacen invisibles para Google — y sus propietarios no lo saben. Nuestro Diagnóstico SEO con IA analiza los factores críticos de posicionamiento: errores de rastreo e indexación, problemas de velocidad de carga, oportunidades de keywords que tu competencia ya está aprovechando y estructura de contenido deficiente. El resultado no es un informe genérico de herramientas automáticas: es un análisis personalizado con las acciones concretas que más impacto van a tener en tu visibilidad.',
    includes: ['Auditoría técnica completa (Core Web Vitals, rastreo, indexación)', 'Análisis de keywords y oportunidades de posicionamiento', 'Auditoría de contenido y estructura', 'Revisión de backlinks y autoridad de dominio', 'Plan de acción priorizado por impacto'],
  },
  {
    icon: Target,
    name: 'Diagnóstico Meta Ads',
    price: 597,
    deadline: '72h',
    headline: 'Para de quemar presupuesto en Meta.',
    desc: 'Cada día que tus anuncios en Facebook e Instagram funcionan mal es dinero que va directamente al bolsillo de Meta, no al tuyo. El problema casi nunca es el presupuesto: es la estrategia. Nuestro análisis desglosa campañas, conjuntos de anuncios y creatividades activas para identificar exactamente qué está desperdiciando tu inversión: audiencias solapadas que se pujan entre sí, creatividades agotadas que ya no convierten, objetivos de campaña mal configurados y segmentaciones irrelevantes. El diagnóstico te dice exactamente qué parar, qué escalar y qué cambiar para que tu próxima inversión en publicidad trabaje tres veces mejor.',
    includes: ['Análisis completo de campañas activas e histórico', 'Diagnóstico de audiencias (solapamientos, saturación)', 'Evaluación de creatividades y copies', 'Revisión de estructura de cuenta y objetivos', 'Hoja de ruta de optimización con prioridades'],
  },
  {
    icon: BarChart3,
    name: 'Diagnóstico 360° Negocio',
    price: 899,
    deadline: '72h',
    headline: 'La radiografía completa de tu negocio digital.',
    desc: 'Antes de invertir un solo euro más en marketing, necesitas saber exactamente dónde estás parado. El Diagnóstico 360° es el análisis más completo del mercado para una PYME: estudiamos tu web (SEO técnico y de contenido), tus redes sociales (engagement, consistencia, posicionamiento de marca), tu oferta de productos o servicios (propuesta de valor, precios, diferenciación frente a la competencia) y hasta cinco competidores directos. El resultado es un informe estratégico que te dice qué está funcionando, qué está fallando y en qué orden exacto debes actuar para maximizar el impacto de cada euro que inviertas.',
    includes: ['Auditoría de web y SEO (técnico + contenido)', 'Análisis de redes sociales y posicionamiento de marca', 'Revisión de oferta, precios y propuesta de valor', 'Benchmarking competitivo (hasta 5 competidores)', 'Roadmap estratégico priorizado por impacto y coste'],
  },
  {
    icon: Globe,
    name: 'Web Express',
    price: 997,
    deadline: '5 días',
    headline: 'Una web que convierte, no solo que existe.',
    desc: 'Una landing page mal diseñada puede estar costándote el 80% de tus clientes potenciales sin que lo sepas. Los visitantes deciden si confían en tu negocio en menos de 3 segundos — y esa decisión la toma el diseño antes que cualquier texto. Web Express es una landing page o web corporativa profesional diseñada a medida: tu identidad de marca, tu propuesta de valor, tu llamada a la acción correctamente estructurada. Código limpio, velocidad de carga optimizada, responsive para cualquier dispositivo y diseñada con los principios de conversión que funcionan. Lista para publicar y empezar a convertir visitantes en clientes desde el primer día.',
    includes: ['Diseño personalizado con tu identidad de marca', 'Responsive y optimizada para móvil, tablet y escritorio', 'Velocidad de carga < 2s (optimizada para Core Web Vitals)', 'Formulario de contacto o CTA configurado', 'Código HTML/CSS limpio entregado y listo para publicar'],
  },
  {
    icon: Smartphone,
    name: 'Web desde Instagram',
    price: 595,
    deadline: '3 días',
    headline: 'Tienes audiencia. Ya es hora de tener web.',
    desc: 'Tienes cientos o miles de seguidores en Instagram que ya confían en ti, pero sin web estás perdiendo a todos los que te buscan en Google — que son la mayoría de los clientes que tienen intención real de compra. Transformamos tu perfil de Instagram en una web profesional en 3 días: extraemos tu contenido existente, adaptamos tu estética visual y construimos una presencia digital que trabaja para ti mientras duermes. Tu historia, tus servicios, tus resultados, tu galería y tu contacto — todo en una web que convierte visitantes en clientes, indexable por Google, sin que tengas que crear contenido nuevo desde cero.',
    includes: ['Extracción y adaptación de contenido de Instagram', 'Diseño basado en tu estética y paleta de marca', 'Secciones de bio, servicios, galería y contacto', 'Optimización básica para buscadores (SEO on-page)', 'Lista para publicar con dominio personalizado'],
  },
  {
    icon: PieChart,
    name: 'Dashboard Financiero',
    price: 799,
    deadline: '5 días',
    headline: 'Por fin, claridad total sobre tu negocio.',
    desc: '¿Cuánto ganaste exactamente el mes pasado? ¿Cuál es tu margen real después de todos los gastos? ¿Qué cliente te genera más ingresos y cuál más costes? ¿En qué meses creces y en cuáles caes? Si no tienes respuestas claras e inmediatas a estas preguntas, estás gestionando tu negocio a ciegas. Subimos tus facturas en PDF y en 3 días tienes un panel interactivo completo con todos tus números: ingresos desglosados por cliente, proveedor y mes; gastos categorizados automáticamente; márgenes reales y tendencias visualizadas. Por fin, la claridad financiera que necesitas para tomar decisiones con datos, no con intuición.',
    includes: ['Procesamiento y categorización automática de facturas PDF', 'Dashboard interactivo con filtros por período y categoría', 'Gráficos de ingresos, gastos y márgenes por mes', 'Ranking de clientes y proveedores por volumen', 'Exportación de datos a Excel/CSV'],
  },
  {
    icon: Zap,
    name: 'Automatización n8n',
    price: 1499,
    deadline: '1–2 semanas',
    headline: 'Tu equipo hace trabajo de humanos. Que la IA haga el resto.',
    desc: '¿Cuántas horas semanales pierde tu equipo haciendo exactamente lo mismo que podría ejecutar un sistema automatizado? Facturación manual. Seguimiento de leads por email. Sincronización entre plataformas. Recopilación y consolidación de datos. Cada tarea repetitiva que realiza un humano es dinero perdido y tiempo que no se puede recuperar. Las automatizaciones con n8n conectan todas tus herramientas — CRM, email, Stripe, Google Sheets, WhatsApp Business, Notion, Slack — y ejecutan flujos completos sin intervención humana, 24 horas al día. Desde la generación automática de presupuestos hasta la notificación de nuevos pedidos o la sincronización de inventario: si se puede automatizar, lo automatizamos y te lo entregamos funcionando.',
    includes: ['Análisis y mapeo de procesos a automatizar', 'Diseño del flujo en n8n (visual y documentado)', 'Implementación, pruebas y puesta en producción', 'Integración con tus herramientas actuales', 'Documentación completa y formación de uso'],
  },
  {
    icon: Puzzle,
    name: 'Extensión Chrome',
    price: 1195,
    deadline: '1 semana',
    headline: 'Si no existe la herramienta que necesitas, la construimos.',
    desc: 'Hay tareas que tu equipo repite decenas de veces al día en el navegador y para las que no existe ninguna solución en el mercado que las haga exactamente como necesitas. ¿Necesitas extraer precios de la competencia de forma automática? ¿Un asistente que rellene formularios repetitivos con un clic? ¿Una herramienta que analice webs de clientes o prospectos al instante? ¿Un scraper de LinkedIn o de cualquier directorio? Si lo puedes imaginar y funciona en Chrome, lo construimos. Te lo entregamos como extensión instalable directamente en el navegador, sin configuraciones complicadas, lista para distribuir a todo tu equipo en menos de una semana.',
    includes: ['Definición y diseño de funcionalidad a medida', 'Desarrollo de la extensión (JavaScript / Manifest V3)', 'Instalación, pruebas y validación en tu entorno', 'Compatible con Chrome, Edge y Brave', 'Código fuente completo entregado'],
  },
]

const packs = [
  { name: 'DIAGNÓSTICO TOTAL',      desc: 'SEO + Meta Ads + 360° Negocio',                         price: 1699, saving: 294,  ideal: 'negocios que quieren saber exactamente dónde están antes de invertir' },
  { name: 'PRESENCIA DIGITAL',      desc: 'Web Express + Diagnóstico SEO',                         price: 1295, saving: 199,  ideal: 'negocios sin web o con web obsoleta que quieren crecer en Google' },
  { name: 'AUTOMATIZACIÓN STARTER', desc: 'Dashboard Financiero + 1 Automatización n8n',           price: 2099, saving: 199,  ideal: 'negocios que pierden horas semanales en tareas manuales y repetitivas' },
  { name: 'TRANSFORMACIÓN DIGITAL', desc: 'Diagnóstico 360° + Web Express + 1 Automatización n8n', price: 2995, saving: 400,  ideal: 'negocios que quieren dar el salto digital completo de una sola vez' },
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
      offers: {
        '@type': 'Offer',
        price: String(s.price),
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
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
              Servicios digitales<br />
              <span className="text-gradient-oro">con la entrega más rápida</span>
            </h1>
            <p className="mt-4 text-nieve/35 text-base max-w-xl leading-relaxed">
              Entregable concreto, precio cerrado, plazo garantizado. Sin reuniones de dos semanas. Sin sorpresas.
            </p>
          </div>

          {/* Services grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-24">
            {services.map(({ icon: Icon, name, price, deadline, headline, desc, includes }) => (
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
                    <div className="text-sm font-bold text-oro">Bajo presupuesto</div>
                    <div className="flex items-center gap-1 text-[10px] text-nieve/25 justify-end mt-0.5">
                      <Clock className="h-3 w-3" /> {deadline}
                    </div>
                  </div>
                </div>

                {/* SEO description */}
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
                  Solicitar este servicio <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            ))}
          </div>

          {/* Packs */}
          <div className="mb-10">
            <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-oro mb-3">Paquetes</p>
            <h2 className="text-3xl font-bold text-nieve mb-2">Combina y ahorra</h2>
            <p className="text-nieve/35 text-sm max-w-xl leading-relaxed">
              Los paquetes están diseñados para los proyectos de transformación digital más habituales en PYMEs. Todo incluido, precio cerrado.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-24">
            {packs.map(({ name, desc, price, saving, ideal }) => (
              <div
                key={name}
                className="reveal rounded-2xl border border-oro/[0.12] bg-oro/[0.04] p-6 flex flex-col
                  hover:border-oro/25 hover:bg-oro/[0.07] transition-all duration-300"
              >
                <div className="inline-flex items-center gap-1.5 rounded-full border border-oro/20 px-2.5 py-0.5 text-[10px] font-bold text-oro mb-4 w-fit tracking-widest">
                  <Package className="h-2.5 w-2.5" /> Pack especial
                </div>
                <h3 className="font-bold text-[11px] text-nieve tracking-[0.12em] uppercase mb-2">{name}</h3>
                <p className="text-xs text-nieve/35 leading-relaxed flex-1">{desc}</p>
                <p className="mt-3 text-[10px] text-nieve/20 italic leading-relaxed">Ideal para {ideal}.</p>
                <div className="mt-4">
                  <span className="text-base font-bold text-oro">Bajo presupuesto</span>
                </div>
                <Link
                  href={`/contacto?servicio=${encodeURIComponent(name)}`}
                  className="mt-4 block text-center rounded-xl bg-oro px-4 py-2.5 text-xs font-bold text-grafito hover:bg-oro/85 transition-all duration-200"
                >
                  Solicitar
                </Link>
              </div>
            ))}
          </div>

          {/* Retainer */}
          <div className="rounded-2xl border border-white/[0.06] bg-pizarra/60 p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-oro mb-3">Retainer mensual</div>
              <h3 className="text-xl font-bold text-nieve mb-2">Tu equipo digital siempre disponible</h3>
              <p className="text-sm text-nieve/40 max-w-lg leading-relaxed">
                ¿Necesitas un equipo técnico que esté ahí cuando lo necesitas sin pagar un salario fijo?
                Hasta 10h/mes de trabajo en lo que necesites, informes mensuales de resultados y soporte continuo por
                una fracción del coste de un empleado. Mínimo 3 meses.
              </p>
            </div>
            <div className="shrink-0 flex flex-col items-start sm:items-end gap-4">
              <div>
                <div className="text-xl font-bold text-oro">395€</div>
                <div className="text-xs text-nieve/25 mt-0.5">Mensual · Mín. 3 meses</div>
              </div>
              <Link
                href="/contacto?servicio=Retainer+mensual"
                className="rounded-xl bg-oro px-6 py-2.5 text-sm font-bold text-grafito hover:bg-oro/85 transition-all duration-200"
              >
                Solicitar
              </Link>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
