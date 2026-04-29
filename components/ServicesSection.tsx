'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Search, Target, BarChart3, Globe, Smartphone,
  PieChart, Zap, Puzzle, ArrowRight, Clock, X, Send, CheckCircle2,
} from 'lucide-react'

const services = [
  {
    icon: Search,
    name: 'Diagnóstico SEO',
    price: 497,
    deadline: '72h',
    shortDesc: 'Visibilidad real en Google. Detectamos lo que te hace invisible y el plan exacto para solucionarlo.',
    headline: 'Tu web existe. Google no lo sabe.',
    desc: '¿Sabes exactamente por qué tu negocio no aparece en los primeros resultados de búsqueda? La mayoría de las webs tienen entre 20 y 80 errores técnicos que las hacen invisibles para Google — y sus propietarios no lo saben. Nuestro Diagnóstico SEO con IA analiza los factores críticos de posicionamiento: errores de rastreo e indexación, problemas de velocidad de carga, oportunidades de keywords que tu competencia ya está aprovechando y estructura de contenido deficiente. El resultado no es un informe genérico de herramientas automáticas: es un análisis personalizado con las acciones concretas que más impacto van a tener en tu visibilidad.',
    includes: [
      'Auditoría técnica completa (Core Web Vitals, rastreo, indexación)',
      'Análisis de keywords y oportunidades de posicionamiento',
      'Auditoría de contenido y estructura',
      'Revisión de backlinks y autoridad de dominio',
      'Plan de acción priorizado por impacto',
    ],
  },
  {
    icon: Target,
    name: 'Diagnóstico Meta Ads',
    price: 597,
    deadline: '72h',
    shortDesc: 'Para de quemar presupuesto. Identificamos qué funciona y qué consume tu dinero sin resultado.',
    headline: 'Para de quemar presupuesto en Meta.',
    desc: 'Cada día que tus anuncios en Facebook e Instagram funcionan mal es dinero que va directamente al bolsillo de Meta, no al tuyo. El problema casi nunca es el presupuesto: es la estrategia. Nuestro análisis desglosa campañas, conjuntos de anuncios y creatividades activas para identificar exactamente qué está desperdiciando tu inversión: audiencias solapadas que se pujan entre sí, creatividades agotadas que ya no convierten, objetivos de campaña mal configurados y segmentaciones irrelevantes. El diagnóstico te dice exactamente qué parar, qué escalar y qué cambiar para que tu próxima inversión en publicidad trabaje tres veces mejor.',
    includes: [
      'Análisis completo de campañas activas e histórico',
      'Diagnóstico de audiencias (solapamientos, saturación)',
      'Evaluación de creatividades y copies',
      'Revisión de estructura de cuenta y objetivos',
      'Hoja de ruta de optimización con prioridades',
    ],
  },
  {
    icon: BarChart3,
    name: 'Diagnóstico 360°',
    price: 899,
    deadline: '72h',
    shortDesc: 'La radiografía completa de tu negocio digital: web, redes, oferta y competencia.',
    headline: 'La radiografía completa de tu negocio digital.',
    desc: 'Antes de invertir un solo euro más en marketing, necesitas saber exactamente dónde estás parado. El Diagnóstico 360° es el análisis más completo del mercado para una PYME: estudiamos tu web (SEO técnico y de contenido), tus redes sociales (engagement, consistencia, posicionamiento de marca), tu oferta de productos o servicios (propuesta de valor, precios, diferenciación frente a la competencia) y hasta cinco competidores directos. El resultado es un informe estratégico que te dice qué está funcionando, qué está fallando y en qué orden exacto debes actuar para maximizar el impacto de cada euro que inviertas.',
    includes: [
      'Auditoría de web y SEO (técnico + contenido)',
      'Análisis de redes sociales y posicionamiento de marca',
      'Revisión de oferta, precios y propuesta de valor',
      'Benchmarking competitivo (hasta 5 competidores)',
      'Roadmap estratégico priorizado por impacto y coste',
    ],
  },
  {
    icon: Globe,
    name: 'Web Express',
    price: 997,
    deadline: '5 días',
    shortDesc: 'Una landing profesional que convierte visitas en clientes. Lista para publicar, diseñada a tu medida.',
    headline: 'Una web que convierte, no solo que existe.',
    desc: 'Una landing page mal diseñada puede estar costándote el 80% de tus clientes potenciales sin que lo sepas. Los visitantes deciden si confían en tu negocio en menos de 3 segundos — y esa decisión la toma el diseño antes que cualquier texto. Web Express es una landing page o web corporativa profesional diseñada a medida: tu identidad de marca, tu propuesta de valor, tu llamada a la acción correctamente estructurada. Código limpio, velocidad de carga optimizada, responsive para cualquier dispositivo y diseñada con los principios de conversión que funcionan. Lista para publicar y empezar a convertir visitantes en clientes desde el primer día.',
    includes: [
      'Diseño personalizado con tu identidad de marca',
      'Responsive y optimizada para móvil, tablet y escritorio',
      'Velocidad de carga < 2s (optimizada para Core Web Vitals)',
      'Formulario de contacto o CTA configurado',
      'Código HTML/CSS limpio entregado y listo para publicar',
    ],
  },
  {
    icon: Smartphone,
    name: 'Web desde Instagram',
    price: 595,
    deadline: '3 días',
    shortDesc: 'Tienes audiencia pero no web. La construimos en días a partir de tu perfil de Instagram.',
    headline: 'Tienes audiencia. Ya es hora de tener web.',
    desc: 'Tienes cientos o miles de seguidores en Instagram que ya confían en ti, pero sin web estás perdiendo a todos los que te buscan en Google — que son la mayoría de los clientes que tienen intención real de compra. Transformamos tu perfil de Instagram en una web profesional en 3 días: extraemos tu contenido existente, adaptamos tu estética visual y construimos una presencia digital que trabaja para ti mientras duermes. Tu historia, tus servicios, tus resultados, tu galería y tu contacto — todo en una web que convierte visitantes en clientes, indexable por Google, sin que tengas que crear contenido nuevo desde cero.',
    includes: [
      'Extracción y adaptación de contenido de Instagram',
      'Diseño basado en tu estética y paleta de marca',
      'Secciones de bio, servicios, galería y contacto',
      'Optimización básica para buscadores (SEO on-page)',
      'Lista para publicar con dominio personalizado',
    ],
  },
  {
    icon: PieChart,
    name: 'Dashboard Financiero',
    price: 799,
    deadline: '5 días',
    shortDesc: 'Por fin sabes exactamente cuánto ganas, en qué gastas y cuál es tu margen real.',
    headline: 'Por fin, claridad total sobre tu negocio.',
    desc: '¿Cuánto ganaste exactamente el mes pasado? ¿Cuál es tu margen real después de todos los gastos? ¿Qué cliente te genera más ingresos y cuál más costes? ¿En qué meses creces y en cuáles caes? Si no tienes respuestas claras e inmediatas a estas preguntas, estás gestionando tu negocio a ciegas. Subimos tus facturas en PDF y en 3 días tienes un panel interactivo completo con todos tus números: ingresos desglosados por cliente, proveedor y mes; gastos categorizados automáticamente; márgenes reales y tendencias visualizadas. Por fin, la claridad financiera que necesitas para tomar decisiones con datos, no con intuición.',
    includes: [
      'Procesamiento y categorización automática de facturas PDF',
      'Dashboard interactivo con filtros por período y categoría',
      'Gráficos de ingresos, gastos y márgenes por mes',
      'Ranking de clientes y proveedores por volumen',
      'Exportación de datos a Excel/CSV',
    ],
  },
  {
    icon: Zap,
    name: 'Automatización n8n',
    price: 1499,
    deadline: '1–2 sem.',
    shortDesc: 'Elimina las tareas manuales que consumen horas de tu equipo. La IA trabaja mientras tú no.',
    headline: 'Tu equipo hace trabajo de humanos. Que la IA haga el resto.',
    desc: '¿Cuántas horas semanales pierde tu equipo haciendo exactamente lo mismo que podría ejecutar un sistema automatizado? Facturación manual. Seguimiento de leads por email. Sincronización entre plataformas. Recopilación y consolidación de datos. Cada tarea repetitiva que realiza un humano es dinero perdido y tiempo que no se puede recuperar. Las automatizaciones con n8n conectan todas tus herramientas — CRM, email, Stripe, Google Sheets, WhatsApp Business, Notion, Slack — y ejecutan flujos completos sin intervención humana, 24 horas al día. Desde la generación automática de presupuestos hasta la notificación de nuevos pedidos o la sincronización de inventario: si se puede automatizar, lo automatizamos y te lo entregamos funcionando.',
    includes: [
      'Análisis y mapeo de procesos a automatizar',
      'Diseño del flujo en n8n (visual y documentado)',
      'Implementación, pruebas y puesta en producción',
      'Integración con tus herramientas actuales',
      'Documentación completa y formación de uso',
    ],
  },
  {
    icon: Puzzle,
    name: 'Extensión Chrome',
    price: 1195,
    deadline: '1 sem.',
    shortDesc: 'Si lo necesitas y no existe, lo construimos. Tu herramienta a medida en el navegador.',
    headline: 'Si no existe la herramienta que necesitas, la construimos.',
    desc: 'Hay tareas que tu equipo repite decenas de veces al día en el navegador y para las que no existe ninguna solución en el mercado que las haga exactamente como necesitas. ¿Necesitas extraer precios de la competencia de forma automática? ¿Un asistente que rellene formularios repetitivos con un clic? ¿Una herramienta que analice webs de clientes o prospectos al instante? ¿Un scraper de LinkedIn o de cualquier directorio? Si lo puedes imaginar y funciona en Chrome, lo construimos. Te lo entregamos como extensión instalable directamente en el navegador, sin configuraciones complicadas, lista para distribuir a todo tu equipo en menos de una semana.',
    includes: [
      'Definición y diseño de funcionalidad a medida',
      'Desarrollo de la extensión (JavaScript / Manifest V3)',
      'Instalación, pruebas y validación en tu entorno',
      'Compatible con Chrome, Edge y Brave',
      'Código fuente completo entregado',
    ],
  },
]

type Service = typeof services[0]
type FormState = { name: string; email: string; phone: string; message: string }

const inputClass =
  'w-full rounded-xl border border-white/[0.07] bg-grafito px-4 py-3 text-sm text-nieve placeholder-nieve/20 focus:border-oro/40 focus:outline-none focus:ring-1 focus:ring-oro/20 transition-all duration-200'

export default function ServicesSection() {
  const [active, setActive] = useState<Service | null>(null)
  const [form, setForm] = useState<FormState>({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [accepted, setAccepted] = useState(false)

  function openService(service: Service) {
    setActive(service)
    setStatus('idle')
    setForm({ name: '', email: '', phone: '', message: '' })
    setAccepted(false)
    document.body.style.overflow = 'hidden'
  }

  function closeModal() {
    setActive(null)
    document.body.style.overflow = ''
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, service: active?.name }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      {/* ─── Grid ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {services.map((service) => {
          const { icon: Icon, name, shortDesc, deadline } = service
          return (
            <button
              key={name}
              onClick={() => openService(service)}
              className="group relative rounded-2xl border border-white/[0.05] bg-pizarra/60 p-6 overflow-hidden text-left
                hover:border-oro/[0.2] hover:-translate-y-2
                hover:shadow-[0_20px_60px_rgba(0,0,0,0.5),_0_0_0_1px_rgba(201,162,39,0.07)]
                transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-oro/[0.05] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="absolute top-0 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-oro/55 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />

              <div className="relative">
                <div className="mb-5 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-oro/10
                  group-hover:bg-oro/[0.18] group-hover:scale-110 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]">
                  <Icon className="h-4 w-4 text-oro" />
                </div>
                <h3 className="font-semibold text-nieve text-sm leading-snug mb-2">{name}</h3>
                <p className="text-xs text-nieve/35 leading-relaxed mb-5 group-hover:text-nieve/50 transition-colors duration-300">
                  {shortDesc}
                </p>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-xs text-oro/70 font-medium group-hover:text-oro transition-colors duration-300">
                    Ver más <ArrowRight className="h-3 w-3" />
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-nieve/25">
                    <Clock className="h-3 w-3" /> {deadline}
                  </span>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* ─── Ver catálogo link ─── */}
      <div className="mt-8 text-center">
        <Link
          href="/servicios"
          className="inline-flex items-center gap-1.5 text-sm text-nieve/30 hover:text-oro transition-colors duration-200"
        >
          Ver catálogo completo con todos los detalles <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* ─── Modal ─── */}
      {active && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-50 bg-grafito/80 backdrop-blur-sm"
            onClick={closeModal}
          />

          {/* Panel */}
          <div className="fixed inset-y-0 right-0 z-50 w-full max-w-xl bg-pizarra border-l border-white/[0.06] overflow-y-auto flex flex-col">

            {/* Sticky header */}
            <div className="sticky top-0 bg-pizarra/95 backdrop-blur-sm border-b border-white/[0.05] px-8 py-5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-oro/10">
                  <active.icon className="h-4 w-4 text-oro" />
                </div>
                <span className="font-semibold text-nieve text-sm">{active.name}</span>
              </div>
              <button
                onClick={closeModal}
                className="text-nieve/30 hover:text-nieve transition-colors p-1"
                aria-label="Cerrar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="px-8 py-8 space-y-8 flex-1">

              {/* Headline + price */}
              <div>
                <h2 className="text-2xl font-bold text-nieve leading-snug mb-4">{active.headline}</h2>
                <div className="flex items-center gap-5">
                  <span className="text-xl font-bold text-oro">
                    Bajo presupuesto
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-nieve/30">
                    <Clock className="h-3 w-3" /> Entrega en {active.deadline}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-nieve/55 leading-relaxed">{active.desc}</p>

              {/* Includes */}
              <div>
                <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-oro mb-4">Incluye</p>
                <ul className="space-y-3">
                  {active.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-nieve/55">
                      <span className="mt-1 h-4 w-4 rounded-full bg-oro/10 flex items-center justify-center shrink-0">
                        <span className="h-1.5 w-1.5 rounded-full bg-oro" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Form */}
              <div className="border-t border-white/[0.05] pt-8">
                <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-oro mb-6">
                  Solicitar presupuesto
                </p>

                {status === 'success' ? (
                  <div className="text-center py-10">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-oro/10 mb-5">
                      <CheckCircle2 className="h-7 w-7 text-oro" />
                    </div>
                    <p className="font-semibold text-nieve mb-2">¡Mensaje recibido!</p>
                    <p className="text-sm text-nieve/40 leading-relaxed">
                      Te respondemos en menos de 24h con el presupuesto para tu proyecto.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-nieve/40 mb-1.5">Nombre *</label>
                        <input
                          type="text"
                          required
                          placeholder="Tu nombre"
                          value={form.name}
                          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-nieve/40 mb-1.5">Email *</label>
                        <input
                          type="email"
                          required
                          placeholder="tu@email.com"
                          value={form.email}
                          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-nieve/40 mb-1.5">Teléfono (opcional)</label>
                      <input
                        type="tel"
                        placeholder="+34 600 000 000"
                        value={form.phone}
                        onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-nieve/40 mb-1.5">Cuéntanos más</label>
                      <textarea
                        rows={4}
                        placeholder="Describe tu proyecto o lo que necesitas..."
                        value={form.message}
                        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                        className={`${inputClass} resize-none`}
                      />
                    </div>

                    {/* Legal consent */}
                    <div className="flex items-start gap-3 pt-1">
                      <input
                        id="legal-services"
                        type="checkbox"
                        checked={accepted}
                        onChange={e => setAccepted(e.target.checked)}
                        className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-oro"
                      />
                      <label htmlFor="legal-services" className="text-xs text-nieve/35 leading-relaxed cursor-pointer">
                        Al enviar acepto los{' '}
                        <button
                          type="button"
                          onClick={() => document.getElementById('footer-btn-tyc')?.click()}
                          className="text-nieve/55 underline underline-offset-2 hover:text-oro transition-colors duration-200"
                        >
                          Términos y Condiciones
                        </button>
                        {' '}y la{' '}
                        <button
                          type="button"
                          onClick={() => document.getElementById('footer-btn-privacidad')?.click()}
                          className="text-nieve/55 underline underline-offset-2 hover:text-oro transition-colors duration-200"
                        >
                          Política de Privacidad
                        </button>
                        {' '}de STRUCT9 Design.
                      </label>
                    </div>

                    {status === 'error' && (
                      <p className="text-sm text-red-400 bg-red-900/20 rounded-lg px-4 py-3">
                        Ha ocurrido un error. Inténtalo de nuevo.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'sending' || !accepted}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-oro px-6 py-4 text-sm font-bold text-grafito hover:bg-oro/85 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-[0_0_24px_rgba(201,162,39,0.3)]"
                    >
                      {status === 'sending' ? (
                        'Enviando...'
                      ) : (
                        <><Send className="h-4 w-4" /> Solicitar presupuesto</>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
