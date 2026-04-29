'use client'

import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { SERVICES } from '@/lib/types'

const inputClass = 'w-full rounded-lg border border-white/10 bg-pizarra/20 px-4 py-3 text-sm text-humo placeholder-humo/30 focus:border-oro/50 focus:outline-none focus:ring-1 focus:ring-oro/30 transition-colors'

function NuevoProyectoForm() {
  const router = useRouter()
  const params = useSearchParams()

  const [selectedServiceId, setSelectedServiceId] = useState('')
  const [form, setForm] = useState({
    client_name: '', client_email: '', service: '', kit: '',
    status: 'pendiente', price: '', notes: '', deliverable_url: '', deadline_at: '', lead_id: '',
  })
  const [saving, setSaving] = useState(false)
  const [error, setError]   = useState('')

  useEffect(() => {
    const name    = params.get('name')
    const email   = params.get('email')
    const service = params.get('service')

    const leadId = params.get('lead_id')
    setForm(f => ({
      ...f,
      client_name:  name   ?? f.client_name,
      client_email: email  ?? f.client_email,
      lead_id:      leadId ?? f.lead_id,
    }))

    if (service) {
      const svc = SERVICES.find(s => s.name === service || s.id === service)
      if (svc) {
        setSelectedServiceId(svc.id)
        setForm(f => ({ ...f, service: svc.name, kit: svc.kit, price: String(svc.price) }))
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleServiceChange(serviceId: string) {
    setSelectedServiceId(serviceId)
    const svc = SERVICES.find(s => s.id === serviceId)
    if (svc) {
      setForm(f => ({ ...f, service: svc.name, kit: svc.kit, price: String(svc.price) }))
    } else {
      setForm(f => ({ ...f, service: '', kit: '' }))
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const res = await fetch('/api/proyectos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          price:           form.price ? parseFloat(form.price) : null,
          client_email:    form.client_email || null,
          notes:           form.notes || null,
          deliverable_url: form.deliverable_url || null,
          deadline_at:     form.deadline_at || null,
          lead_id:         form.lead_id || null,
        }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Error al guardar')
      }
      router.push('/panel/proyectos')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
      setSaving(false)
    }
  }

  return (
    <div className="p-8 max-w-2xl">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/panel/proyectos" className="text-humo/40 hover:text-humo transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-bold text-humo">Nuevo proyecto</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
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

        {form.kit && (
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
            {saving ? 'Guardando...' : 'Crear proyecto'}
          </button>
          <Link
            href="/panel/proyectos"
            className="rounded-lg border border-white/10 px-4 py-3 text-sm text-humo/60 hover:text-humo hover:border-white/20 transition-colors"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  )
}

export default function NuevoProyecto() {
  return (
    <Suspense fallback={<div className="p-8 text-sm text-humo/30">Cargando...</div>}>
      <NuevoProyectoForm />
    </Suspense>
  )
}
