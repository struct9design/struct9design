'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Send, CheckCircle2, ChevronDown } from 'lucide-react'

const serviceOptions = [
  'Diseño & Desarrollo Web',
  'Chatbot WhatsApp 24/7',
  'Asistente de Voz IA',
  'Varios servicios',
  'No lo tengo claro aún',
]

export default function Contacto() {
  return (
    <Suspense>
      <ContactoInner />
    </Suspense>
  )
}

function ContactoInner() {
  const searchParams = useSearchParams()
  const [form, setForm] = useState({
    name: '', email: '', phone: '', service: '', message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')
  const [accepted, setAccepted] = useState(false)

  useEffect(() => {
    const s = searchParams.get('servicio')
    if (s) setForm(f => ({ ...f, service: s }))
  }, [searchParams])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    setError('')
    try {
      const hp = (document.querySelector('input[name="hp"]') as HTMLInputElement)?.value ?? ''
      const res = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, hp }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
      setError('Ha ocurrido un error. Por favor intenta de nuevo o escríbenos directamente.')
    }
  }

  const inputClass = 'w-full rounded-xl border border-white/[0.07] bg-pizarra px-4 py-3 text-sm text-nieve placeholder-nieve/20 focus:border-oro/40 focus:outline-none focus:ring-1 focus:ring-oro/20 transition-all duration-200'

  if (status === 'success') {
    return (
      <>
        <Header />
        <main className="flex-1 flex items-center justify-center px-6 pt-24">
          <div className="text-center max-w-md">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-oro/10 mb-6">
              <CheckCircle2 className="h-8 w-8 text-oro" />
            </div>
            <h1 className="text-2xl font-bold text-humo mb-3">¡Mensaje recibido!</h1>
            <p className="text-humo/50 text-sm leading-relaxed">
              Te responderemos en menos de 24 horas con el presupuesto personalizado para tu proyecto.
            </p>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="flex-1 pt-24 pb-24 px-6">
        <div className="mx-auto max-w-2xl">
          <div className="mb-12 pt-4">
            <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-oro mb-3">Contacto</p>
            <h1 className="text-4xl font-bold text-nieve">
              Solicita tu <span className="text-gradient-oro">presupuesto</span>
            </h1>
            <p className="mt-4 text-nieve/35 leading-relaxed">
              Cuéntanos qué necesitas. Respondemos en menos de 24 horas.
            </p>
          </div>

          {/* Honeypot — invisible para humanos, bots lo rellenan */}
          <div className="hidden" aria-hidden="true">
            <input type="text" name="hp" tabIndex={-1} autoComplete="off" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
              <label className="block text-xs font-medium text-nieve/40 mb-1.5">¿Qué servicio te interesa?</label>
              <div className="relative">
                <select
                  value={form.service}
                  onChange={e => setForm(f => ({ ...f, service: e.target.value }))}
                  className={`${inputClass} appearance-none pr-10`}
                >
                  <option value="">Selecciona un servicio</option>
                  {serviceOptions.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-nieve/30 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-nieve/40 mb-1.5">Cuéntanos más</label>
              <textarea
                rows={5}
                placeholder="Describe brevemente tu proyecto, tu negocio y lo que necesitas..."
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* Legal consent */}
            <div className="flex items-start gap-3 pt-1">
              <input
                id="legal-consent"
                type="checkbox"
                checked={accepted}
                onChange={e => setAccepted(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-oro"
              />
              <label htmlFor="legal-consent" className="text-xs text-nieve/35 leading-relaxed cursor-pointer">
                Al enviar este formulario acepto los{' '}
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

            {error && (
              <p className="text-sm text-red-400 bg-red-900/20 rounded-lg px-4 py-3">{error}</p>
            )}

            <button
              type="submit"
              disabled={status === 'sending' || !accepted}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-oro px-6 py-4 text-sm font-bold text-grafito hover:bg-oro/85 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-[0_0_24px_rgba(201,162,39,0.3)]"
            >
              {status === 'sending' ? (
                <>Enviando...</>
              ) : (
                <><Send className="h-4 w-4" /> Enviar solicitud</>
              )}
            </button>
          </form>

          <div className="mt-12 grid grid-cols-3 gap-3 text-center">
            {[
              ['24h', 'Respuesta garantizada'],
              ['€0', 'Presupuesto gratuito'],
              ['48h', 'Entrega media'],
            ].map(([v, l]) => (
              <div key={l} className="rounded-xl border border-white/[0.05] bg-pizarra p-4">
                <div className="text-lg font-bold text-oro">{v}</div>
                <div className="text-[10px] text-nieve/25 mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
