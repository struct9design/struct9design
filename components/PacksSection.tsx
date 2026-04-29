'use client'

import { useState } from 'react'
import { Package, X, Send, CheckCircle2 } from 'lucide-react'

const packs = [
  {
    name: 'DIAGNÓSTICO TOTAL',
    includes: 'SEO + Meta Ads + 360°',
    price: 1699,
    saving: 294,
    ideal: 'Negocios que quieren saber exactamente dónde están antes de invertir un solo euro más en marketing.',
    services: [
      'Diagnóstico SEO — auditoría técnica completa + plan de acción',
      'Diagnóstico Meta Ads — análisis de campañas y hoja de ruta de optimización',
      'Diagnóstico 360° Negocio — radiografía completa: web, redes, oferta y competencia',
    ],
    desc: 'Antes de gastar en publicidad, en una web nueva o en cualquier otra inversión digital, necesitas saber exactamente en qué punto estás. Este pack te da la visión completa: tu posición en Google, el rendimiento de tus anuncios y el estado global de tu negocio digital frente a la competencia. Todo en un único encargo, coordinado y entregado en 72 horas.',
  },
  {
    name: 'PRESENCIA DIGITAL',
    includes: 'Web Express + SEO',
    price: 1295,
    saving: 199,
    ideal: 'Negocios sin web o con web obsoleta que quieren empezar a aparecer en Google desde el primer día.',
    services: [
      'Web Express — landing profesional lista para publicar, diseñada a tu medida',
      'Diagnóstico SEO — auditoría técnica + keywords + plan de posicionamiento',
    ],
    desc: 'La combinación perfecta para empezar con buen pie: una web profesional que convierte y una hoja de ruta clara para que Google te encuentre. Lanzas con presencia sólida y sabes exactamente qué hacer para crecer en buscadores desde el primer mes.',
  },
  {
    name: 'AUTOMATIZACIÓN STARTER',
    includes: 'Dashboard Financiero + n8n',
    price: 2099,
    saving: 199,
    ideal: 'Negocios que pierden horas semanales en tareas manuales y quieren recuperar ese tiempo con IA.',
    services: [
      'Dashboard Financiero — claridad total sobre ingresos, gastos y márgenes reales',
      'Automatización n8n — un flujo automatizado a medida para eliminar trabajo repetitivo',
    ],
    desc: 'Dos herramientas que trabajan juntas: sabes exactamente cuánto ganas (dashboard) y eliminas las tareas que te quitan tiempo para ganarlo (automatización). El resultado es un negocio más ágil, más rentable y con menos fricción operativa.',
  },
  {
    name: 'TRANSFORMACIÓN DIGITAL',
    includes: '360° + Web Express + n8n',
    price: 2995,
    saving: 400,
    ideal: 'Negocios que quieren dar el salto digital completo — diagnóstico, presencia y automatización — de una sola vez.',
    services: [
      'Diagnóstico 360° Negocio — radiografía completa de web, redes, oferta y competencia',
      'Web Express — landing profesional diseñada a tu medida y lista para publicar',
      'Automatización n8n — flujo automatizado a medida para eliminar trabajo repetitivo',
    ],
    desc: 'El pack más completo del catálogo. Empezamos con un diagnóstico exhaustivo de tu situación actual, construimos la presencia digital que necesitas y automatizamos los procesos que te frenan. Tres servicios coordinados, un único interlocutor, entrega escalonada y un ahorro significativo sobre el precio individual.',
  },
]

type Pack = typeof packs[0]
type FormState = { name: string; email: string; phone: string; message: string }

const inputClass =
  'w-full rounded-xl border border-white/[0.07] bg-grafito px-4 py-3 text-sm text-nieve placeholder-nieve/20 focus:border-oro/40 focus:outline-none focus:ring-1 focus:ring-oro/20 transition-all duration-200'

export default function PacksSection() {
  const [active, setActive] = useState<Pack | null>(null)
  const [form, setForm] = useState<FormState>({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [accepted, setAccepted] = useState(false)

  function openPack(pack: Pack) {
    setActive(pack)
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
        {packs.map((pack) => (
          <div
            key={pack.name}
            className="reveal rounded-2xl border border-oro/[0.12] bg-oro/[0.04] p-6 flex flex-col
              hover:border-oro/25 hover:bg-oro/[0.07] transition-all duration-300"
          >
            <div className="inline-flex items-center gap-1.5 rounded-full border border-oro/20 bg-oro/[0.06] px-2.5 py-0.5 text-[10px] font-bold text-oro mb-3 w-fit tracking-widest">
              <Package className="h-2.5 w-2.5" /> Pack especial
            </div>
            <h3 className="font-bold text-[11px] text-nieve tracking-[0.12em] uppercase mb-2">{pack.name}</h3>
            <p className="text-xs text-nieve/35 leading-relaxed flex-1">{pack.includes}</p>
            <div className="mt-4 mb-3">
              <span className="text-base font-bold text-oro">Bajo presupuesto</span>
            </div>
            <button
              onClick={() => openPack(pack)}
              className="block w-full text-center rounded-xl bg-oro px-4 py-2.5 text-xs font-bold text-grafito hover:bg-oro/85 transition-all duration-200"
            >
              Solicitar
            </button>
          </div>
        ))}
      </div>

      {/* ─── Modal ─── */}
      {active && (
        <>
          <div
            className="fixed inset-0 z-50 bg-grafito/80 backdrop-blur-sm"
            onClick={closeModal}
          />

          <div className="fixed inset-y-0 right-0 z-50 w-full max-w-xl bg-pizarra border-l border-white/[0.06] overflow-y-auto flex flex-col">

            {/* Sticky header */}
            <div className="sticky top-0 bg-pizarra/95 backdrop-blur-sm border-b border-white/[0.05] px-8 py-5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-oro/10">
                  <Package className="h-4 w-4 text-oro" />
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

              {/* Price + saving */}
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-oro/20 bg-oro/[0.06] px-3 py-1 text-[10px] font-bold text-oro mb-4 tracking-widest">
                  <Package className="h-2.5 w-2.5" /> Pack combinado
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-bold text-oro">Bajo presupuesto</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-nieve/55 leading-relaxed">{active.desc}</p>

              {/* Services included */}
              <div>
                <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-oro mb-4">Incluye</p>
                <ul className="space-y-3">
                  {active.services.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-nieve/55">
                      <span className="mt-1 h-4 w-4 rounded-full bg-oro/10 flex items-center justify-center shrink-0">
                        <span className="h-1.5 w-1.5 rounded-full bg-oro" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Ideal for */}
              <div className="rounded-xl border border-white/[0.05] bg-white/[0.02] px-5 py-4">
                <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-nieve/30 mb-1.5">Ideal para</p>
                <p className="text-sm text-nieve/50 leading-relaxed">{active.ideal}</p>
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
                        id="legal-packs"
                        type="checkbox"
                        checked={accepted}
                        onChange={e => setAccepted(e.target.checked)}
                        className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-oro"
                      />
                      <label htmlFor="legal-packs" className="text-xs text-nieve/35 leading-relaxed cursor-pointer">
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
