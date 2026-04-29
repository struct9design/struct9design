'use client'

import { useState } from 'react'
import { Clock, X, Send, CheckCircle2 } from 'lucide-react'

const inputClass =
  'w-full rounded-xl border border-white/[0.07] bg-grafito px-4 py-3 text-sm text-nieve placeholder-nieve/20 focus:border-oro/40 focus:outline-none focus:ring-1 focus:ring-oro/20 transition-all duration-200'

export default function RetainerSection() {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [accepted, setAccepted] = useState(false)

  function openModal() {
    setOpen(true)
    setStatus('idle')
    setForm({ name: '', email: '', phone: '', message: '' })
    setAccepted(false)
    document.body.style.overflow = 'hidden'
  }

  function closeModal() {
    setOpen(false)
    document.body.style.overflow = ''
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, service: 'Retainer mensual' }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      {/* ─── Callout card ─── */}
      <div className="mt-16 rounded-2xl border border-white/[0.05] bg-pizarra/50 p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6 justify-between">
        <div>
          <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-oro mb-2">Retainer mensual</div>
          <p className="text-sm text-nieve/40 max-w-lg leading-relaxed">
            Soporte continuo, mejoras y actualizaciones. Hasta 10h/mes + informes mensuales. Mínimo 3 meses.
          </p>
        </div>
        <div className="shrink-0">
          <button
            onClick={openModal}
            className="rounded-xl border border-oro/25 px-5 py-2 text-xs font-semibold text-oro hover:bg-oro hover:text-grafito transition-all duration-200"
          >
            Saber más
          </button>
        </div>
      </div>

      {/* ─── Modal ─── */}
      {open && (
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
                  <Clock className="h-4 w-4 text-oro" />
                </div>
                <span className="font-semibold text-nieve text-sm">Retainer Mensual</span>
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
                <h2 className="text-2xl font-bold text-nieve leading-snug mb-4">
                  Tu agencia digital siempre disponible.
                </h2>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-oro">395€</span>
                  <span className="text-sm text-nieve/30">/mes · Mínimo 3 meses</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-nieve/55 leading-relaxed">
                Mantener y mejorar una presencia digital requiere trabajo constante, no solo un lanzamiento puntual. El Retainer Mensual te da acceso a un equipo potenciado por IA siempre disponible: actualizamos tu web, ajustamos tu estrategia, implementamos mejoras y te enviamos un informe mensual con todo lo que hemos hecho y sus resultados. Sin reuniones interminables, sin burocracia. Tú nos dices qué necesitas y lo resolvemos.
              </p>

              {/* Includes */}
              <div>
                <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-oro mb-4">Incluye cada mes</p>
                <ul className="space-y-3">
                  {[
                    'Hasta 10 horas de trabajo mensual (web, SEO, contenido, automatizaciones)',
                    'Informe mensual de rendimiento y acciones realizadas',
                    'Respuesta prioritaria en menos de 24 horas',
                    'Mejoras y actualizaciones de web sin coste adicional',
                    'Reunión de seguimiento mensual (opcional, 30 min)',
                  ].map((item) => (
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
                <p className="text-sm text-nieve/50 leading-relaxed">
                  Negocios que ya tienen presencia digital y quieren seguir creciendo sin preocuparse de la gestión técnica ni de quedarse desactualizados.
                </p>
              </div>

              {/* Form */}
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
                      Te respondemos en menos de 24h con todos los detalles del retainer.
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
                        placeholder="¿Qué tipo de soporte necesitas? ¿Tienes web activa?"
                        value={form.message}
                        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                        className={`${inputClass} resize-none`}
                      />
                    </div>

                    {/* Legal consent */}
                    <div className="flex items-start gap-3 pt-1">
                      <input
                        id="legal-retainer"
                        type="checkbox"
                        checked={accepted}
                        onChange={e => setAccepted(e.target.checked)}
                        className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-oro"
                      />
                      <label htmlFor="legal-retainer" className="text-xs text-nieve/35 leading-relaxed cursor-pointer">
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
