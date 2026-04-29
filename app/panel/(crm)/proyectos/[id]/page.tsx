'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Clock } from 'lucide-react'
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

      <form onSubmit={handleSubmit} className="space-y-5 mb-10">
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
    </div>
  )
}
