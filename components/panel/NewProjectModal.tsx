'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import type { ContactSubmission, Project } from '@/lib/types'
import { SERVICES } from '@/lib/types'

const inputClass = 'w-full rounded-lg border border-niebla bg-white px-3 py-2 text-sm text-tinta placeholder-pizarra/70 focus:border-senal focus:outline-none transition-colors'

export default function NewProjectModal({
  lead,
  onClose,
  onCreated,
}: {
  lead: ContactSubmission
  onClose: () => void
  onCreated: (project: Project) => void
}) {
  const [selectedServiceId, setSelectedServiceId] = useState('')
  const [form, setForm] = useState({
    client_name: lead.name,
    client_email: lead.email ?? '',
    service: '',
    kit: '',
    status: 'pendiente',
    price: '',
    notes: lead.message ?? '',
    deliverable_url: '',
    deadline_at: '',
    lead_id: lead.id,
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (lead.service) {
      const svc = SERVICES.find(s => s.name === lead.service || s.id === lead.service)
      if (svc) {
        setSelectedServiceId(svc.id)
        setForm(f => ({ ...f, service: svc.name, kit: svc.kit, price: String(svc.price) }))
      }
    }
  }, [lead])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  function handleServiceChange(id: string) {
    setSelectedServiceId(id)
    const svc = SERVICES.find(s => s.id === id)
    if (svc) {
      setForm(f => ({ ...f, service: svc.name, kit: svc.kit, price: String(svc.price) }))
    } else if (id === 'custom') {
      setForm(f => ({ ...f, service: '', kit: '' }))
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
          price: form.price ? parseFloat(form.price) : null,
          client_email: form.client_email || null,
          notes: form.notes || null,
          deliverable_url: form.deliverable_url || null,
          deadline_at: form.deadline_at || null,
          lead_id: form.lead_id || null,
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Error al guardar')
      }
      const project = await res.json()
      onCreated(project)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
      setSaving(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-tinta/40 backdrop-blur-sm p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl border border-niebla bg-white shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between px-5 md:px-6 py-4 border-b border-niebla bg-white">
          <div>
            <h2 className="font-display text-base md:text-lg font-bold text-tinta">Convertir lead a proyecto</h2>
            <p className="text-xs text-pizarra mt-0.5">{lead.name} · {lead.email}</p>
          </div>
          <button
            onClick={onClose}
            className="text-pizarra hover:text-tinta transition-colors"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 md:p-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-pizarra mb-1.5">Servicio *</label>
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
            <div className="rounded-lg bg-senal/5 border border-senal/20 px-3 py-2 text-xs text-senal">
              Kit: <span className="font-mono">{form.kit}</span>
            </div>
          )}

          {selectedServiceId === 'custom' && (
            <div>
              <label className="block text-xs font-medium text-pizarra mb-1.5">Nombre del servicio *</label>
              <input
                type="text"
                required
                placeholder="Servicio personalizado"
                value={form.service}
                onChange={e => setForm(f => ({ ...f, service: e.target.value }))}
                className={inputClass}
              />
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-pizarra mb-1.5">Nombre del cliente *</label>
              <input
                type="text"
                required
                value={form.client_name}
                onChange={e => setForm(f => ({ ...f, client_name: e.target.value }))}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-pizarra mb-1.5">Email del cliente</label>
              <input
                type="email"
                value={form.client_email}
                onChange={e => setForm(f => ({ ...f, client_email: e.target.value }))}
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-pizarra mb-1.5">Precio (€)</label>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={form.price}
                onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-pizarra mb-1.5">Fecha de entrega</label>
              <input
                type="date"
                value={form.deadline_at}
                onChange={e => setForm(f => ({ ...f, deadline_at: e.target.value }))}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-pizarra mb-1.5">Estado inicial</label>
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
            <label className="block text-xs font-medium text-pizarra mb-1.5">Notas internas</label>
            <textarea
              rows={3}
              placeholder="Notas sobre el proyecto..."
              value={form.notes}
              onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
              className={`${inputClass} resize-none`}
            />
          </div>

          {error && (
            <p className="text-xs text-red-700 bg-red-50 rounded-lg px-3 py-2">{error}</p>
          )}

          <div className="flex gap-3 pt-1">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 rounded-lg bg-senal px-4 py-2.5 text-sm font-bold text-white hover:bg-tinta disabled:opacity-60 transition-colors"
            >
              {saving ? 'Creando...' : 'Crear proyecto'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-niebla px-4 py-2.5 text-sm text-pizarra hover:text-tinta transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
