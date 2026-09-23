'use client'

import { useEffect, useState, Fragment } from 'react'
import { useRouter } from 'next/navigation'
import { Inbox, Trash2, ArrowRight, ChevronDown, MessageSquare } from 'lucide-react'
import type { ContactSubmission, LeadStatus } from '@/lib/types'
import { LEAD_STATUS_LABELS, LEAD_STATUS_COLORS } from '@/lib/types'

const STATUSES: LeadStatus[] = ['nuevo', 'contactado', 'presupuesto_enviado', 'ganado', 'perdido']

export default function Leads() {
  const router = useRouter()
  const [leads, setLeads]         = useState<ContactSubmission[]>([])
  const [loading, setLoading]     = useState(true)
  const [filter, setFilter]       = useState<LeadStatus | 'todos'>('todos')
  const [expanded, setExpanded]   = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/leads')
      .then(r => r.json())
      .then(d => { setLeads(Array.isArray(d) ? d : []); setLoading(false) })
  }, [])

  async function updateStatus(id: string, status: LeadStatus) {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, lead_status: status } : l))
    await fetch('/api/leads', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, lead_status: status }),
    })
  }

  async function deleteLead(id: string) {
    if (!confirm('¿Eliminar este lead?')) return
    setLeads(prev => prev.filter(l => l.id !== id))
    await fetch('/api/leads', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
  }

  function convertToProject(lead: ContactSubmission) {
    const params = new URLSearchParams()
    params.set('name', lead.name)
    params.set('email', lead.email)
    params.set('lead_id', lead.id)
    if (lead.service) params.set('service', lead.service)
    router.push(`/panel/proyectos/nuevo?${params.toString()}`)
  }

  const filtered = filter === 'todos'
    ? leads
    : leads.filter(l => (l.lead_status ?? 'nuevo') === filter)

  function countFor(s: LeadStatus | 'todos') {
    if (s === 'todos') return leads.length
    return leads.filter(l => (l.lead_status ?? 'nuevo') === s).length
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-tinta">Leads</h1>
          <p className="text-xs text-pizarra mt-1">Solicitudes entrantes del formulario web</p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {(['todos', ...STATUSES] as const).map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              filter === s
                ? 'bg-senal text-white'
                : 'bg-nieve text-pizarra hover:text-tinta'
            }`}
          >
            {s === 'todos' ? 'Todos' : LEAD_STATUS_LABELS[s]}
            <span className="ml-1.5 opacity-60">{countFor(s)}</span>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-xl border border-niebla bg-white overflow-hidden">
        {loading ? (
          <div className="py-12 text-center text-sm text-pizarra/70">Cargando leads...</div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center">
            <Inbox className="h-8 w-8 text-pizarra/70 mx-auto mb-3" />
            <p className="text-sm text-pizarra/70">
              {filter === 'todos' ? 'Aún no hay leads. Cuando alguien rellene el formulario aparecerá aquí.' : 'No hay leads en esta categoría.'}
            </p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-niebla">
                {['Fecha', 'Nombre', 'Servicio', 'Estado', 'Acciones'].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-medium text-pizarra">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(lead => {
                const status = (lead.lead_status ?? 'nuevo') as LeadStatus
                const isExpanded = expanded === lead.id
                return (
                  <Fragment key={lead.id}>
                    <tr
                      className="border-b border-niebla hover:bg-nieve/70 transition-colors"
                    >
                      {/* Date */}
                      <td className="px-5 py-3 text-xs text-pizarra whitespace-nowrap">
                        {new Date(lead.created_at).toLocaleDateString('es-ES', {
                          day: '2-digit', month: 'short', year: '2-digit',
                        })}
                      </td>

                      {/* Name + email */}
                      <td className="px-5 py-3">
                        <div className="font-medium text-tinta">{lead.name}</div>
                        <a
                          href={`mailto:${lead.email}`}
                          className="text-xs text-pizarra hover:text-tinta transition-colors"
                        >
                          {lead.email}
                        </a>
                        {lead.phone && (
                          <div className="text-xs text-pizarra/70 mt-0.5">{lead.phone}</div>
                        )}
                      </td>

                      {/* Service */}
                      <td className="px-5 py-3 text-pizarra text-xs">{lead.service ?? '—'}</td>

                      {/* Status dropdown */}
                      <td className="px-5 py-3">
                        <div className="relative inline-block">
                          <select
                            value={status}
                            onChange={e => updateStatus(lead.id, e.target.value as LeadStatus)}
                            className={`rounded-full pl-2.5 pr-6 py-0.5 text-xs font-medium border-0 cursor-pointer appearance-none ${LEAD_STATUS_COLORS[status]}`}
                          >
                            {STATUSES.map(s => (
                              <option key={s} value={s}>{LEAD_STATUS_LABELS[s]}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 h-3 w-3 pointer-events-none opacity-60" />
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          {lead.message && (
                            <button
                              onClick={() => setExpanded(isExpanded ? null : lead.id)}
                              className="text-pizarra/70 hover:text-tinta transition-colors"
                              title="Ver mensaje"
                            >
                              <MessageSquare className="h-3.5 w-3.5" />
                            </button>
                          )}
                          <button
                            onClick={() => convertToProject(lead)}
                            className="flex items-center gap-1 text-[10px] font-semibold text-senal/70 hover:text-tinta transition-colors whitespace-nowrap"
                            title="Convertir en proyecto"
                          >
                            Proyecto <ArrowRight className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => deleteLead(lead.id)}
                            className="text-pizarra/70 hover:text-red-700 transition-colors"
                            title="Eliminar"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Expandable message row */}
                    {isExpanded && lead.message && (
                      <tr className="border-b border-niebla bg-nieve/60">
                        <td colSpan={5} className="px-5 py-3">
                          <p className="text-xs text-pizarra leading-relaxed whitespace-pre-wrap">{lead.message}</p>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
