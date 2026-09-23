'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Plus, Trash2, ExternalLink, AlertCircle, Pencil, Download, Search, LayoutGrid, List } from 'lucide-react'
import type { Project } from '@/lib/types'
import { STATUS_LABELS, STATUS_COLORS } from '@/lib/types'

const KanbanBoard = dynamic(() => import('@/components/panel/KanbanBoard'), { ssr: false })

const ITEMS_PER_PAGE = 25

function matchesSearch(p: Project, q: string) {
  if (!q) return true
  const s = q.toLowerCase()
  return (
    p.client_name.toLowerCase().includes(s) ||
    (p.client_email ?? '').toLowerCase().includes(s) ||
    p.service.toLowerCase().includes(s)
  )
}

function downloadCSV(rows: Record<string, unknown>[], filename: string) {
  if (!rows.length) return
  const headers = Object.keys(rows[0])
  const lines = [
    headers.join(','),
    ...rows.map(r => headers.map(h => JSON.stringify(r[h] ?? '')).join(',')),
  ]
  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = Object.assign(document.createElement('a'), { href: url, download: filename })
  a.click()
  URL.revokeObjectURL(url)
}

export default function Proyectos() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading]   = useState(true)
  const [filter, setFilter]     = useState<string>('todos')
  const [search, setSearch]     = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [view, setView]         = useState<'list' | 'kanban'>('list')
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    fetch('/api/proyectos')
      .then(r => r.json())
      .then(d => { setProjects(Array.isArray(d) ? d : []); setLoading(false) })
  }, [])

  // Detect desktop viewport (≥ 1024px). Kanban only mounts when this is true.
  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(min-width: 1024px)')
    setIsDesktop(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Reset page when filter or search changes
  useEffect(() => { setCurrentPage(1) }, [filter, search])

  async function updateStatus(id: string, status: string) {
    // Optimistic update for snappy Kanban UX
    setProjects(prev => prev.map(p => p.id === id ? { ...p, status: status as Project['status'] } : p))
    await fetch('/api/proyectos', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    })
  }

  async function deleteProject(id: string) {
    if (!confirm('¿Eliminar este proyecto?')) return
    await fetch('/api/proyectos', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    setProjects(prev => prev.filter(p => p.id !== id))
  }

  const statuses = ['todos', 'pendiente', 'en_proceso', 'entregado', 'facturado', 'cobrado']
  const now = new Date()

  const statusFiltered = filter === 'todos' ? projects : projects.filter(p => p.status === filter)
  const searched       = statusFiltered.filter(p => matchesSearch(p, search))
  const totalPages     = Math.max(1, Math.ceil(searched.length / ITEMS_PER_PAGE))
  const paginated      = searched.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center justify-between mb-6 gap-3">
        <h1 className="font-display text-xl md:text-2xl font-bold text-tinta">Proyectos</h1>
        <div className="flex items-center gap-2">
          {isDesktop && (
            <div className="inline-flex items-center rounded-lg border border-niebla bg-white p-0.5" role="tablist" aria-label="Vista de proyectos">
              <button
                role="tab"
                aria-selected={view === 'list'}
                onClick={() => setView('list')}
                className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
                  view === 'list'
                    ? 'bg-senal text-white'
                    : 'text-pizarra hover:text-tinta'
                }`}
              >
                <List className="h-3.5 w-3.5" /> Lista
              </button>
              <button
                role="tab"
                aria-selected={view === 'kanban'}
                onClick={() => setView('kanban')}
                className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
                  view === 'kanban'
                    ? 'bg-senal text-white'
                    : 'text-pizarra hover:text-tinta'
                }`}
              >
                <LayoutGrid className="h-3.5 w-3.5" /> Kanban
              </button>
            </div>
          )}
          <button
            onClick={() => downloadCSV(searched as unknown as Record<string, unknown>[], 'proyectos.csv')}
            className="inline-flex items-center justify-center rounded-lg border border-niebla p-2 text-pizarra hover:text-tinta transition-colors"
            title="Exportar CSV"
            aria-label="Exportar CSV"
          >
            <Download className="h-4 w-4" />
          </button>
          <Link
            href="/panel/proyectos/nuevo"
            className="flex items-center gap-2 rounded-lg bg-senal px-4 py-2 text-sm font-bold text-white hover:bg-tinta transition-colors"
          >
            <Plus className="h-4 w-4" /> Nuevo proyecto
          </Link>
        </div>
      </div>

      {/* Filter tabs — solo en vista lista */}
      {!(isDesktop && view === 'kanban') && (
        <div className="flex gap-2 mb-4 flex-wrap">
          {statuses.map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors capitalize ${
                filter === s
                  ? 'bg-senal text-white'
                  : 'bg-nieve text-pizarra hover:text-tinta'
              }`}
            >
              {s === 'todos' ? 'Todos' : STATUS_LABELS[s as Project['status']]}
              {s !== 'todos' && (
                <span className="ml-1.5 opacity-60">
                  {projects.filter(p => p.status === s).length}
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-pizarra/70 pointer-events-none" />
        <input
          type="text"
          placeholder="Buscar por cliente, email o servicio..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full rounded-lg border border-niebla bg-white pl-9 pr-4 py-2 text-sm text-tinta placeholder-pizarra/70 focus:border-senal focus:outline-none transition-colors"
        />
      </div>

      {isDesktop && view === 'kanban' ? (
        loading ? (
          <div className="py-12 text-center text-sm text-pizarra/70">Cargando proyectos...</div>
        ) : (
          <KanbanBoard
            projects={search ? searched : projects}
            onStatusChange={(id, status) => updateStatus(id, status)}
            onDelete={deleteProject}
          />
        )
      ) : (
      <div className="rounded-xl border border-niebla bg-white overflow-hidden">
        {loading ? (
          <div className="py-12 text-center text-sm text-pizarra/70">Cargando proyectos...</div>
        ) : searched.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-sm text-pizarra/70">No hay proyectos que coincidan.</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[720px]">
              <thead>
                <tr className="border-b border-niebla">
                  {['Fecha', 'Entrega', 'Cliente', 'Servicio', 'Estado', 'Precio', ''].map(h => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-medium text-pizarra">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.map(p => {
                  const overdue = p.deadline_at &&
                    new Date(p.deadline_at) < now &&
                    p.status !== 'entregado' &&
                    p.status !== 'facturado' &&
                    p.status !== 'cobrado'

                  return (
                    <tr key={p.id} className="border-b border-niebla hover:bg-nieve/70 transition-colors">
                      <td className="px-5 py-3 text-xs text-pizarra whitespace-nowrap">
                        {new Date(p.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}
                      </td>
                      <td className="px-5 py-3 whitespace-nowrap">
                        {p.deadline_at ? (
                          <span className={`flex items-center gap-1 text-xs ${overdue ? 'text-red-700 font-medium' : 'text-pizarra'}`}>
                            {overdue && <AlertCircle className="h-3 w-3 shrink-0" />}
                            {new Date(p.deadline_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                          </span>
                        ) : (
                          <span className="text-pizarra/70 text-xs">—</span>
                        )}
                      </td>
                      <td className="px-5 py-3">
                        <div className="font-medium text-tinta text-xs">{p.client_name}</div>
                        {p.client_email && (
                          <div className="text-[10px] text-pizarra">{p.client_email}</div>
                        )}
                      </td>
                      <td className="px-5 py-3 text-pizarra text-xs">{p.service}</td>
                      <td className="px-5 py-3">
                        <select
                          value={p.status}
                          onChange={e => updateStatus(p.id, e.target.value)}
                          className={`rounded-full px-2 py-0.5 text-xs font-medium border-0 cursor-pointer ${STATUS_COLORS[p.status]}`}
                        >
                          {(Object.keys(STATUS_LABELS) as Project['status'][]).map(s => (
                            <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-5 py-3 text-senal font-medium text-xs">
                        {p.price ? `€${p.price.toLocaleString('es')}` : '—'}
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2.5">
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
                          <Link
                            href={`/panel/proyectos/${p.id}`}
                            className="text-pizarra/70 hover:text-tinta transition-colors"
                            title="Editar"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </Link>
                          <button
                            onClick={() => deleteProject(p.id)}
                            className="text-pizarra/70 hover:text-red-700 transition-colors"
                            title="Eliminar"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-5 py-3 border-t border-niebla">
                <span className="text-xs text-pizarra/70">
                  {searched.length} proyectos · página {currentPage} de {totalPages}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="rounded px-3 py-1 text-xs text-pizarra hover:text-tinta disabled:opacity-30 transition-colors"
                  >
                    ← Anterior
                  </button>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="rounded px-3 py-1 text-xs text-pizarra hover:text-tinta disabled:opacity-30 transition-colors"
                  >
                    Siguiente →
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      )}
    </div>
  )
}
