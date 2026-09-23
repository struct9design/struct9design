'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft, Mail, Phone, Building2, FileText,
  ExternalLink, AlertCircle, Check, X,
} from 'lucide-react'
import type { Client, Project } from '@/lib/types'
import { STATUS_LABELS, STATUS_COLORS } from '@/lib/types'

const inputClass =
  'w-full rounded-lg border border-niebla bg-white px-3 py-2 text-sm text-tinta placeholder-pizarra/70 focus:border-senal focus:outline-none focus:ring-1 focus:ring-senal/20 transition-colors'

export default function ClienteDetalle() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()

  const [client, setClient]     = useState<Client | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading]   = useState(true)
  const [notFound, setNotFound] = useState(false)

  // Notes editing
  const [editingNotes, setEditingNotes] = useState(false)
  const [notes, setNotes]               = useState('')
  const [savingNotes, setSavingNotes]   = useState(false)

  useEffect(() => {
    Promise.all([
      fetch(`/api/clientes/${id}`).then(r => r.ok ? r.json() : null),
      fetch('/api/proyectos').then(r => r.json()),
    ]).then(([c, p]) => {
      if (!c) { setNotFound(true); setLoading(false); return }
      setClient(c)
      setNotes(c.notes ?? '')
      const clientProjects: Project[] = Array.isArray(p)
        ? p.filter((proj: Project) =>
            (c.email && proj.client_email === c.email) ||
            proj.client_name === c.name
          )
        : []
      setProjects(clientProjects)
      setLoading(false)
    })
  }, [id])

  async function saveNotes() {
    if (!client) return
    setSavingNotes(true)
    const res = await fetch(`/api/clientes/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notes: notes || null }),
    })
    if (res.ok) {
      const updated = await res.json()
      setClient(updated)
      setNotes(updated.notes ?? '')
    }
    setSavingNotes(false)
    setEditingNotes(false)
  }

  function cancelNotes() {
    setNotes(client?.notes ?? '')
    setEditingNotes(false)
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="h-6 w-48 bg-nieve rounded animate-pulse mb-8" />
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[1, 2, 3].map(i => <div key={i} className="h-24 bg-nieve rounded-xl animate-pulse" />)}
        </div>
        <div className="h-64 bg-nieve rounded-xl animate-pulse" />
      </div>
    )
  }

  if (notFound || !client) {
    return (
      <div className="p-8 text-center pt-24">
        <p className="text-sm text-pizarra mb-4">Cliente no encontrado.</p>
        <Link href="/panel/clientes" className="text-xs text-senal hover:text-tinta">
          ← Volver a clientes
        </Link>
      </div>
    )
  }

  const now = new Date()
  const activeProjects = projects.filter(p => p.status === 'pendiente' || p.status === 'en_proceso')
  const totalRevenue   = projects
    .filter(p => p.status === 'facturado' || p.status === 'cobrado')
    .reduce((sum, p) => sum + (p.price ?? 0), 0)

  return (
    <div className="p-8">

      {/* Breadcrumb */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => router.back()}
          className="text-pizarra hover:text-tinta transition-colors"
          aria-label="Volver"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2 text-sm">
          <Link href="/panel/clientes" className="text-pizarra hover:text-tinta transition-colors">
            Clientes
          </Link>
          <span className="text-pizarra/70">›</span>
          <span className="text-tinta font-medium">{client.name}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">

        {/* Client info card */}
        <div className="xl:col-span-2 rounded-xl border border-niebla bg-white p-6">
          <div className="flex items-start justify-between mb-5">
            <div>
              <h1 className="font-display text-xl font-bold text-tinta">{client.name}</h1>
              {client.company && (
                <p className="text-sm text-pizarra mt-0.5">{client.company}</p>
              )}
            </div>
            <span className="text-xs text-pizarra/70">
              Cliente desde {new Date(client.created_at).toLocaleDateString('es-ES', {
                day: 'numeric', month: 'long', year: 'numeric',
              })}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
            {client.email && (
              <a
                href={`mailto:${client.email}`}
                className="flex items-center gap-2.5 rounded-lg border border-niebla bg-nieve/60 px-3 py-2.5 text-sm text-pizarra hover:text-tinta transition-colors"
              >
                <Mail className="h-4 w-4 shrink-0 text-pizarra/70" />
                {client.email}
              </a>
            )}
            {client.phone && (
              <a
                href={`tel:${client.phone}`}
                className="flex items-center gap-2.5 rounded-lg border border-niebla bg-nieve/60 px-3 py-2.5 text-sm text-pizarra hover:text-tinta transition-colors"
              >
                <Phone className="h-4 w-4 shrink-0 text-pizarra/70" />
                {client.phone}
              </a>
            )}
            {client.company && (
              <div className="flex items-center gap-2.5 rounded-lg border border-niebla bg-nieve/60 px-3 py-2.5 text-sm text-pizarra">
                <Building2 className="h-4 w-4 shrink-0 text-pizarra/70" />
                {client.company}
              </div>
            )}
          </div>

          {/* Notes */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <FileText className="h-3.5 w-3.5 text-pizarra/70" />
                <span className="text-xs font-medium text-pizarra">Notas internas</span>
              </div>
              {!editingNotes && (
                <button
                  onClick={() => setEditingNotes(true)}
                  className="text-[10px] text-senal/70 hover:text-tinta transition-colors"
                >
                  Editar
                </button>
              )}
            </div>

            {editingNotes ? (
              <div className="space-y-2">
                <textarea
                  rows={3}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Notas internas sobre este cliente..."
                  className={`${inputClass} resize-none`}
                  autoFocus
                />
                <div className="flex gap-2">
                  <button
                    onClick={saveNotes}
                    disabled={savingNotes}
                    className="flex items-center gap-1.5 rounded-lg bg-senal px-3 py-1.5 text-xs font-bold text-white hover:bg-tinta disabled:opacity-60 transition-colors"
                  >
                    <Check className="h-3 w-3" />
                    {savingNotes ? 'Guardando…' : 'Guardar'}
                  </button>
                  <button
                    onClick={cancelNotes}
                    className="flex items-center gap-1.5 rounded-lg border border-niebla px-3 py-1.5 text-xs text-pizarra hover:text-tinta transition-colors"
                  >
                    <X className="h-3 w-3" /> Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-pizarra leading-relaxed min-h-[2rem]">
                {client.notes || <span className="italic text-pizarra/70">Sin notas</span>}
              </p>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-col gap-4">
          {[
            { label: 'Proyectos totales', value: projects.length, color: 'text-tinta' },
            { label: 'Proyectos activos', value: activeProjects.length, color: 'text-blue-700' },
            { label: 'Revenue total',     value: `€${totalRevenue.toLocaleString('es')}`, color: 'text-senal' },
          ].map(({ label, value, color }) => (
            <div key={label} className="rounded-xl border border-niebla bg-white p-5 flex-1">
              <p className="text-xs text-pizarra mb-2">{label}</p>
              <p className={`text-2xl font-bold ${color}`}>{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Projects table */}
      <div className="rounded-xl border border-niebla bg-white overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-niebla">
          <h2 className="font-display text-sm font-semibold text-tinta">Proyectos</h2>
          <Link
            href={`/panel/proyectos/nuevo?name=${encodeURIComponent(client.name)}&email=${encodeURIComponent(client.email ?? '')}`}
            className="text-xs text-senal hover:text-tinta transition-colors"
          >
            + Nuevo proyecto
          </Link>
        </div>

        {projects.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-sm text-pizarra/70">No hay proyectos para este cliente.</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-niebla">
                {['Fecha', 'Servicio', 'Estado', 'Precio', 'Entrega', ''].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-medium text-pizarra">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {projects.map(p => {
                const overdue = p.deadline_at &&
                  new Date(p.deadline_at) < now &&
                  p.status !== 'entregado' && p.status !== 'facturado' && p.status !== 'cobrado'

                return (
                  <tr key={p.id} className="border-b border-niebla hover:bg-nieve/70 transition-colors">
                    <td className="px-5 py-3 text-xs text-pizarra whitespace-nowrap">
                      {new Date(p.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}
                    </td>
                    <td className="px-5 py-3 text-pizarra text-xs">{p.service}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${STATUS_COLORS[p.status]}`}>
                        {STATUS_LABELS[p.status]}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-senal text-xs font-medium">
                      {p.price ? `€${p.price.toLocaleString('es')}` : '—'}
                    </td>
                    <td className="px-5 py-3">
                      {p.deadline_at ? (
                        <span className={`flex items-center gap-1 text-xs ${overdue ? 'text-red-700' : 'text-pizarra'}`}>
                          {overdue && <AlertCircle className="h-3 w-3 shrink-0" />}
                          {new Date(p.deadline_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                        </span>
                      ) : (
                        <span className="text-pizarra/70 text-xs">—</span>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      {p.deliverable_url && (
                        <a
                          href={p.deliverable_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-pizarra/70 hover:text-tinta transition-colors"
                          title="Ver entregable"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
