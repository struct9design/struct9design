'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Clock, Send, CheckCircle2, ExternalLink } from 'lucide-react'
import { SERVICES, STATUS_LABELS } from '@/lib/types'
import type { Project, ProjectStatus } from '@/lib/types'

interface ProjectEvent {
  id: string
  project_id: string
  type: string
  payload: { from?: string; to?: string } | null
  created_at: string
}

const inputClass = 'w-full rounded-lg border border-white/10 bg-pizarra/20 px-4 py-3 text-sm text-humo placeholder-humo/30 focus:border-oro/50 focus:outline-none focus:ring-1 focus:ring-oro/30 transition-colors'

export default function EditarProyecto() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()

  const [project, setProject] = useState<Project | null>(null)
  const [events, setEvents]   = useState<ProjectEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  const [selectedServiceId, setSelectedServiceId] = useState('')
  const [form, setForm] = useState({
    client_name: '', client_email: '', service: '', kit: '',
    status: 'pendiente', price: '', notes: '', deliverable_url: '', deadline_at: '',
  })
  const [saving, setSaving] = useState(false)
  const [error, setError]   = useState('')

  // Modal de cobro
  const [showCobrarModal, setShowCobrarModal] = useState(false)
  const [cobrarForm, setCobrarForm] = useState({ concepto: '', importe: '', additional_info: '', horas: '', tarifa: '100' })
  const [enviando, setEnviando] = useState(false)
  const [cobrarError, setCobrarError] = useState('')
  const [cobrarOk, setCobrarOk] = useState(false)

  function calcularImporte(horas: string, tarifa: string) {
    const h = parseFloat(horas)
    const t = parseFloat(tarifa)
    if (!isNaN(h) && !isNaN(t) && h > 0 && t > 0) return (h * t).toFixed(2)
    return ''
  }

  useEffect(() => {
    Promise.all([
      fetch(`/api/proyectos/${id}`).then(r => r.ok ? r.json() : null),
      fetch(`/api/proyectos/${id}/events`).then(r => r.json()).catch(() => []),
    ]).then(([p, evts]) => {
      if (!p) { setNotFound(true); setLoading(false); return }
      setProject(p)
      setEvents(Array.isArray(evts) ? evts : [])
      const svc = SERVICES.find(s => s.name === p.service)
      setSelectedServiceId(svc ? svc.id : (p.service ? 'custom' : ''))
      setForm({
        client_name:     p.client_name     ?? '',
        client_email:    p.client_email    ?? '',
        service:         p.service         ?? '',
        kit:             p.kit             ?? '',
        status:          p.status          ?? 'pendiente',
        price:           p.price != null   ? String(p.price) : '',
        notes:           p.notes           ?? '',
        deliverable_url: p.deliverable_url ?? '',
        deadline_at:     p.deadline_at     ? new Date(p.deadline_at).toISOString().split('T')[0] : '',
      })
      setCobrarForm({
        concepto:        p.service ?? '',
        importe:         p.price != null ? String(p.price) : '',
        additional_info: '',
        horas:           '',
        tarifa:          '100',
      })
      setLoading(false)
    })
  }, [id])

  function handleServiceChange(serviceId: string) {
    setSelectedServiceId(serviceId)
    const svc = SERVICES.find(s => s.id === serviceId)
    if (svc) {
      setForm(f => ({ ...f, service: svc.name, kit: svc.kit, price: String(svc.price) }))
    } else {
      setForm(f => ({ ...f, service: serviceId === 'custom' ? f.service : '', kit: '' }))
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const res = await fetch(`/api/proyectos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_name:     form.client_name,
          client_email:    form.client_email    || null,
          service:         form.service,
          kit:             form.kit,
          status:          form.status,
          price:           form.price           ? parseFloat(form.price) : null,
          notes:           form.notes           || null,
          deliverable_url: form.deliverable_url || null,
          deadline_at:     form.deadline_at     || null,
        }),
      })
      if (!res.ok) {
        const d = await res.json()
        throw new Error(d.error || 'Error al guardar')
      }
      router.push('/panel/proyectos')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
      setSaving(false)
    }
  }

  async function handleCobrar(e: React.FormEvent) {
    e.preventDefault()
    if (!project) return
    setCobrarError('')
    setEnviando(true)
    try {
      const res = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          project_id:      project.id,
          amount:          cobrarForm.importe,
          service:         cobrarForm.concepto,
          client_name:     form.client_name,
          client_email:    form.client_email,
          additional_info: cobrarForm.additional_info || undefined,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Error al generar el enlace')
      setCobrarOk(true)
      // Actualizar estado local
      setProject(p => p ? { ...p, stripe_payment_url: data.payment_url } : p)
    } catch (err) {
      setCobrarError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setEnviando(false)
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="h-6 w-48 bg-white/5 rounded animate-pulse mb-8" />
        <div className="h-96 bg-white/5 rounded-xl animate-pulse" />
      </div>
    )
  }

  if (notFound || !project) {
    return (
      <div className="p-8 text-center pt-24">
        <p className="text-sm text-humo/40 mb-4">Proyecto no encontrado.</p>
        <Link href="/panel/proyectos" className="text-xs text-oro hover:text-oro/70">← Volver</Link>
      </div>
    )
  }

  const isPaid = !!project.paid_at

  return (
    <div className="p-8 max-w-2xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => router.back()} className="text-humo/40 hover:text-humo transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2 text-sm">
          <Link href="/panel/proyectos" className="text-humo/40 hover:text-humo transition-colors">
            Proyectos
          </Link>
          <span className="text-humo/20">›</span>
          <span className="text-humo font-medium">{project.client_name} — {project.service}</span>
        </div>
      </div>

      {/* Badge de pago */}
      {isPaid && (
        <div className="flex items-center gap-2 mb-6 rounded-lg bg-emerald-900/30 border border-emerald-500/20 px-4 py-3">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <div className="text-sm text-emerald-300">
            <span className="font-semibold">Cobrado</span>
            {project.amount_paid != null && <span className="text-emerald-400"> — {project.amount_paid.toFixed(2)} €</span>}
            <span className="text-emerald-500 text-xs ml-2">
              {new Date(project.paid_at!).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
            </span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 mb-6">
        <div>
          <label className="block text-xs font-medium text-humo/60 mb-1.5">Servicio *</label>
          <select
            required
            value={selectedServiceId}
            onChange={e => handleServiceChange(e.target.value)}
            className={inputClass}
          >
            <option value="">Selecciona el servicio</option>
            {SERVICES.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
            <option value="custom">Personalizado</option>
          </select>
        </div>

        {selectedServiceId === 'custom' && (
          <div>
            <label className="block text-xs font-medium text-humo/60 mb-1.5">Nombre del servicio</label>
            <input
              type="text" placeholder="Describe el servicio"
              value={form.service}
              onChange={e => setForm(f => ({ ...f, service: e.target.value }))}
              className={inputClass}
            />
          </div>
        )}

        {form.kit && selectedServiceId !== 'custom' && (
          <div className="rounded-lg bg-oro/5 border border-oro/20 px-4 py-2 text-xs text-oro">
            Kit: <span className="font-mono">{form.kit}</span>
          </div>
        )}

        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-medium text-humo/60 mb-1.5">Nombre del cliente *</label>
            <input
              type="text" required placeholder="Empresa o persona"
              value={form.client_name}
              onChange={e => setForm(f => ({ ...f, client_name: e.target.value }))}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-humo/60 mb-1.5">Email del cliente</label>
            <input
              type="email" placeholder="cliente@email.com"
              value={form.client_email}
              onChange={e => setForm(f => ({ ...f, client_email: e.target.value }))}
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-medium text-humo/60 mb-1.5">Precio (€)</label>
            <input
              type="number" placeholder="0.00" step="0.01"
              value={form.price}
              onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-humo/60 mb-1.5">Fecha de entrega</label>
            <input
              type="date"
              value={form.deadline_at}
              onChange={e => setForm(f => ({ ...f, deadline_at: e.target.value }))}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-humo/60 mb-1.5">Estado</label>
          <select
            value={form.status}
            onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
            className={inputClass}
          >
            <option value="pendiente">Pendiente</option>
            <option value="en_proceso">En proceso</option>
            <option value="entregado">Entregado</option>
            <option value="facturado">Facturado</option>
            <option value="cobrado">Cobrado</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-humo/60 mb-1.5">URL del entregable</label>
          <input
            type="url" placeholder="https://..."
            value={form.deliverable_url}
            onChange={e => setForm(f => ({ ...f, deliverable_url: e.target.value }))}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-humo/60 mb-1.5">Notas internas</label>
          <textarea
            rows={3} placeholder="Notas sobre el proyecto..."
            value={form.notes}
            onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
            className={`${inputClass} resize-none`}
          />
        </div>

        {error && (
          <p className="text-xs text-red-400 bg-red-900/20 rounded-lg px-4 py-3">{error}</p>
        )}

        <div className="flex gap-3">
          <button
            type="submit" disabled={saving}
            className="flex-1 rounded-lg bg-oro px-4 py-3 text-sm font-bold text-grafito hover:bg-oro/80 disabled:opacity-60 transition-colors"
          >
            {saving ? 'Guardando...' : 'Guardar cambios'}
          </button>
          <Link
            href="/panel/proyectos"
            className="rounded-lg border border-white/10 px-4 py-3 text-sm text-humo/60 hover:text-humo hover:border-white/20 transition-colors"
          >
            Cancelar
          </Link>
        </div>
      </form>

      {/* Botón Cobrar */}
      {!isPaid && (
        <div className="mb-10">
          <button
            onClick={() => {
              setCobrarForm({ concepto: form.service, importe: form.price, additional_info: '', horas: '', tarifa: '100' })
              setCobrarOk(false)
              setCobrarError('')
              setShowCobrarModal(true)
            }}
            className="w-full flex items-center justify-center gap-2 rounded-lg border border-oro/40 bg-oro/10 px-4 py-3 text-sm font-semibold text-oro hover:bg-oro/20 transition-colors"
          >
            <Send className="h-4 w-4" />
            Enviar presupuesto y cobrar
          </button>

          {project.stripe_payment_url && (
            <a
              href={project.stripe_payment_url}
              target="_blank" rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center gap-1.5 text-xs text-humo/40 hover:text-humo/60 transition-colors"
            >
              <ExternalLink className="h-3 w-3" />
              Ver enlace de pago generado
            </a>
          )}
        </div>
      )}

      {/* Historial de actividad */}
      {events.length > 0 && (
        <div className="rounded-xl border border-white/5 bg-pizarra/10 overflow-hidden">
          <div className="flex items-center gap-2 px-6 py-4 border-b border-white/5">
            <Clock className="h-3.5 w-3.5 text-humo/30" />
            <h2 className="text-sm font-semibold text-humo">Historial</h2>
          </div>
          <div className="divide-y divide-white/5">
            {events.map(ev => (
              <div key={ev.id} className="px-6 py-3 flex items-center justify-between">
                <p className="text-xs text-humo/60">
                  {ev.type === 'status_change' && ev.payload
                    ? <>Estado cambiado de{' '}
                        <span className="text-humo/40">{STATUS_LABELS[ev.payload.from as ProjectStatus] ?? ev.payload.from}</span>
                        {' → '}
                        <span className="text-humo">{STATUS_LABELS[ev.payload.to as ProjectStatus] ?? ev.payload.to}</span>
                      </>
                    : ev.type
                  }
                </p>
                <span className="text-[10px] text-humo/30 whitespace-nowrap ml-4">
                  {new Date(ev.created_at).toLocaleDateString('es-ES', {
                    day: 'numeric', month: 'short', year: '2-digit',
                    hour: '2-digit', minute: '2-digit',
                  })}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Modal de cobro ─────────────────────────────────────────────────── */}
      {showCobrarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-grafito shadow-2xl">
            <div className="px-6 py-5 border-b border-white/10">
              <h2 className="text-base font-semibold text-humo">Enviar presupuesto y enlace de pago</h2>
              <p className="text-xs text-humo/40 mt-1">
                Se enviará un email a <span className="text-humo/60">{form.client_email || '(sin email)'}</span> con el PDF y el enlace de Stripe.
              </p>
            </div>

            {cobrarOk ? (
              <div className="px-6 py-10 text-center">
                <CheckCircle2 className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
                <p className="text-sm font-semibold text-humo mb-1">¡Enviado!</p>
                <p className="text-xs text-humo/40 mb-6">
                  El cliente ha recibido el presupuesto y el enlace de pago por email.
                </p>
                <button
                  onClick={() => setShowCobrarModal(false)}
                  className="rounded-lg bg-oro px-6 py-2.5 text-sm font-bold text-grafito hover:bg-oro/80 transition-colors"
                >
                  Cerrar
                </button>
              </div>
            ) : (
              <form onSubmit={handleCobrar} className="px-6 py-5 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-humo/60 mb-1.5">Concepto</label>
                  <input
                    type="text" required placeholder="Descripción del servicio"
                    value={cobrarForm.concepto}
                    onChange={e => setCobrarForm(f => ({ ...f, concepto: e.target.value }))}
                    className={inputClass}
                  />
                </div>

                {/* Calculadora interna — no aparece en el PDF del cliente */}
                <div className="rounded-lg border border-oro/20 bg-oro/5 p-4 space-y-3">
                  <p className="text-xs font-semibold text-oro/80 uppercase tracking-wide">Calculadora interna</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-humo/60 mb-1.5">Horas de revisión</label>
                      <input
                        type="number" placeholder="0" step="0.5" min="0"
                        value={cobrarForm.horas}
                        onChange={e => {
                          const horas = e.target.value
                          const importe = calcularImporte(horas, cobrarForm.tarifa)
                          setCobrarForm(f => ({ ...f, horas, ...(importe ? { importe } : {}) }))
                        }}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-humo/60 mb-1.5">Tarifa €/h</label>
                      <input
                        type="number" placeholder="100" step="5" min="70"
                        value={cobrarForm.tarifa}
                        onChange={e => {
                          const tarifa = e.target.value
                          const importe = calcularImporte(cobrarForm.horas, tarifa)
                          setCobrarForm(f => ({ ...f, tarifa, ...(importe ? { importe } : {}) }))
                        }}
                        className={inputClass}
                      />
                    </div>
                  </div>
                  {cobrarForm.horas && cobrarForm.tarifa && (
                    <p className="text-xs text-humo/40">
                      Margen efectivo: <span className={parseFloat(cobrarForm.tarifa) >= 70 ? 'text-emerald-400 font-semibold' : 'text-red-400 font-semibold'}>
                        {cobrarForm.tarifa} €/h
                      </span>
                      {parseFloat(cobrarForm.tarifa) < 70 && <span className="text-red-400 ml-1">— por debajo del mínimo (70 €/h)</span>}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-humo/60 mb-1.5">Importe final (€) — aparece en el PDF</label>
                  <input
                    type="number" required placeholder="0.00" step="0.01" min="1"
                    value={cobrarForm.importe}
                    onChange={e => setCobrarForm(f => ({ ...f, importe: e.target.value }))}
                    className={inputClass}
                  />
                  {cobrarForm.importe && !isNaN(parseFloat(cobrarForm.importe)) && (
                    <p className="text-xs text-humo/40 mt-1.5">
                      Total cliente: <span className="text-humo font-semibold">{parseFloat(cobrarForm.importe).toFixed(2)} €</span>
                      <span className="ml-1">(sin IVA)</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-humo/60 mb-1.5">
                    Información adicional <span className="text-humo/30">(opcional)</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Plazo de entrega, condiciones, acuerdos especiales..."
                    value={cobrarForm.additional_info}
                    onChange={e => setCobrarForm(f => ({ ...f, additional_info: e.target.value }))}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {!form.client_email && (
                  <p className="text-xs text-yellow-400 bg-yellow-900/20 rounded-lg px-3 py-2">
                    Este proyecto no tiene email de cliente. Guarda el email antes de cobrar.
                  </p>
                )}

                {cobrarError && (
                  <p className="text-xs text-red-400 bg-red-900/20 rounded-lg px-3 py-2">{cobrarError}</p>
                )}

                <div className="flex gap-3 pt-1">
                  <button
                    type="submit"
                    disabled={enviando || !form.client_email}
                    className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-oro px-4 py-3 text-sm font-bold text-grafito hover:bg-oro/80 disabled:opacity-60 transition-colors"
                  >
                    <Send className="h-3.5 w-3.5" />
                    {enviando ? 'Enviando...' : 'Enviar presupuesto'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCobrarModal(false)}
                    className="rounded-lg border border-white/10 px-4 py-3 text-sm text-humo/60 hover:text-humo hover:border-white/20 transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
