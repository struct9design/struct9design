'use client'

import { useState } from 'react'
import { Monitor, MessageSquare, Phone, ArrowRight, X, Send, CheckCircle2 } from 'lucide-react'

const services = [
  {
    icon: Monitor,
    name: 'Diseño & Desarrollo Web',
    tag: 'Presupuesto a medida',
    shortDesc: 'Desde una landing page rápida hasta un CRM personalizado. Diseño, desarrollo y SEO en un solo equipo.',
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
    shortDesc: 'Tu negocio atendiendo clientes mientras duermes. Un asistente entrenado con la información de tu negocio.',
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
    shortDesc: 'Nunca más una llamada sin respuesta. IA que atiende, gestiona reservas y da información las 24h.',
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {services.map((service) => {
          const { icon: Icon, name, shortDesc, tag } = service
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
                  <span className="text-[10px] text-nieve/25">{tag}</span>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* ─── Modal ─── */}
      {active && (
        <>
          <div
            className="fixed inset-0 z-50 bg-grafito/80 backdrop-blur-sm"
            onClick={closeModal}
          />

          <div className="fixed inset-y-0 right-0 z-50 w-full max-w-xl bg-pizarra border-l border-white/[0.06] overflow-y-auto flex flex-col">

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

            <div className="px-8 py-8 space-y-8 flex-1">

              <div>
                <h2 className="text-2xl font-bold text-nieve leading-snug mb-3">{active.headline}</h2>
                <span className="text-sm font-semibold text-oro/70">{active.tag}</span>
              </div>

              <p className="text-sm text-nieve/55 leading-relaxed">{active.desc}</p>

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

              <div className="border-t border-white/[0.05] pt-8">
                <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-oro mb-6">
                  Solicitar información
                </p>

                {status === 'success' ? (
                  <div className="text-center py-10">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-oro/10 mb-5">
                      <CheckCircle2 className="h-7 w-7 text-oro" />
                    </div>
                    <p className="font-semibold text-nieve mb-2">¡Mensaje recibido!</p>
                    <p className="text-sm text-nieve/40 leading-relaxed">
                      Te respondemos en menos de 24h con toda la información.
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
                        placeholder="Describe tu negocio o lo que necesitas..."
                        value={form.message}
                        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                        className={`${inputClass} resize-none`}
                      />
                    </div>

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
                        <><Send className="h-4 w-4" /> Solicitar información</>
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
