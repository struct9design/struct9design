'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Plus,
  TrendingUp,
  FolderKanban,
  Users,
  AlertCircle,
  Inbox,
  ArrowRight,
  Clock,
  GripVertical,
} from 'lucide-react'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core'
import type { Project, Client, ContactSubmission } from '@/lib/types'
import { STATUS_LABELS, STATUS_COLORS, LEAD_STATUS_LABELS, LEAD_STATUS_COLORS } from '@/lib/types'
import NewProjectModal from '@/components/NewProjectModal'

type Period = 'mes' | 'trimestre' | 'año' | 'todo'

const PERIOD_LABELS: Record<Period, string> = {
  mes:       'Este mes',
  trimestre: 'Trimestre',
  año:       'Este año',
  todo:      'Todo',
}

const DROPZONE_ID = 'projects-dropzone'

function DraggableLeadRow({ lead, children }: { lead: ContactSubmission; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `lead-${lead.id}`,
    data: { lead },
  })
  return (
    <tr
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{ touchAction: 'none', WebkitUserSelect: 'none', userSelect: 'none' }}
      className={`border-b border-white/5 hover:bg-white/[0.02] transition-colors ${isDragging ? 'opacity-30 cursor-grabbing' : 'cursor-grab'}`}
    >
      {children}
    </tr>
  )
}

function ProjectsDropZone({ children }: { children: React.ReactNode }) {
  const { setNodeRef, isOver } = useDroppable({ id: DROPZONE_ID })
  return (
    <div
      ref={setNodeRef}
      className={`rounded-xl border overflow-hidden transition-all ${
        isOver
          ? 'border-oro/60 bg-oro/5 ring-2 ring-oro/30'
          : 'border-white/5 bg-pizarra/10'
      }`}
    >
      {children}
    </div>
  )
}

export default function PanelDashboard() {
  const [projects, setProjects]     = useState<Project[]>([])
  const [clients, setClients]       = useState<Client[]>([])
  const [leads, setLeads]           = useState<ContactSubmission[]>([])
  const [loading, setLoading]       = useState(true)
  const [noSupabase, setNoSupabase] = useState(false)
  const [period, setPeriod]         = useState<Period>('mes')

  const [activeLead, setActiveLead] = useState<ContactSubmission | null>(null)
  const [modalLead, setModalLead]   = useState<ContactSubmission | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  )

  useEffect(() => {
    Promise.all([
      fetch('/api/proyectos').then(r => r.json()),
      fetch('/api/clientes').then(r => r.json()),
      fetch('/api/leads').then(r => r.json()),
    ]).then(([p, c, l]) => {
      if (!Array.isArray(p)) setNoSupabase(true)
      setProjects(Array.isArray(p) ? p : [])
      setClients(Array.isArray(c) ? c : [])
      setLeads(Array.isArray(l) ? l : [])
      setLoading(false)
    })
  }, [])

  // suppress unused warning — clients fetched for future use
  void clients

  function refresh() {
    Promise.all([
      fetch('/api/proyectos').then(r => r.json()),
      fetch('/api/leads').then(r => r.json()),
    ]).then(([p, l]) => {
      if (Array.isArray(p)) setProjects(p)
      if (Array.isArray(l)) setLeads(l)
    })
  }

  function handleDragStart(e: DragStartEvent) {
    const lead = e.active.data.current?.lead as ContactSubmission | undefined
    if (lead) setActiveLead(lead)
  }

  function handleDragEnd(e: DragEndEvent) {
    setActiveLead(null)
    if (e.over?.id === DROPZONE_ID) {
      const lead = e.active.data.current?.lead as ContactSubmission | undefined
      if (lead) setModalLead(lead)
    }
  }

  function handleDragCancel() {
    setActiveLead(null)
  }

  const now = new Date()

  function inPeriod(dateStr: string): boolean {
    const d = new Date(dateStr)
    if (period === 'todo') return true
    if (period === 'año') return d.getFullYear() === now.getFullYear()
    if (period === 'mes') return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    if (period === 'trimestre') {
      const q  = Math.floor(now.getMonth() / 3)
      const dq = Math.floor(d.getMonth() / 3)
      return dq === q && d.getFullYear() === now.getFullYear()
    }
    return true
  }

  const activeProjects = projects.filter(p =>
    p.status === 'pendiente' || p.status === 'en_proceso'
  )

  const pipelineValue = activeProjects.reduce((sum, p) => sum + (p.price ?? 0), 0)

  const periodRevenue = projects
    .filter(p =>
      (p.status === 'facturado' || p.status === 'cobrado') &&
      p.price &&
      inPeriod(p.created_at)
    )
    .reduce((sum, p) => sum + (p.price ?? 0), 0)

  const totalRevenue = projects
    .filter(p => (p.status === 'facturado' || p.status === 'cobrado') && p.price)
    .reduce((sum, p) => sum + (p.price ?? 0), 0)

  const newLeads       = leads.filter(l => !l.lead_status || l.lead_status === 'nuevo')
  const recentProjects = projects.slice(0, 5)
  const recentLeads    = leads.slice(0, 5)

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="p-4 md:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 gap-3">
          <div className="min-w-0">
            <h1 className="text-xl md:text-2xl font-bold text-humo">Dashboard</h1>
            <p className="text-xs md:text-sm text-humo/40 mt-1 truncate">
              {now.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <Link
            href="/panel/proyectos/nuevo"
            className="flex items-center gap-2 rounded-lg bg-oro px-3 md:px-4 py-2 text-xs md:text-sm font-bold text-grafito hover:bg-oro/80 transition-colors shrink-0"
          >
            <Plus className="h-4 w-4" /> <span className="hidden sm:inline">Nuevo proyecto</span><span className="sm:hidden">Nuevo</span>
          </Link>
        </div>

        {noSupabase && (
          <div className="mb-6 flex items-start gap-3 rounded-lg border border-yellow-500/30 bg-yellow-900/10 px-4 py-3">
            <AlertCircle className="h-4 w-4 text-yellow-400 shrink-0 mt-0.5" />
            <p className="text-xs text-yellow-300">
              Supabase no configurado. Los datos se mostrarán vacíos hasta que configures las variables de entorno en{' '}
              <code className="font-mono">.env.local</code>.
            </p>
          </div>
        )}

        {/* Period selector */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {(Object.keys(PERIOD_LABELS) as Period[]).map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                period === p
                  ? 'bg-oro text-grafito'
                  : 'bg-white/5 text-humo/50 hover:text-humo'
              }`}
            >
              {PERIOD_LABELS[p]}
            </button>
          ))}
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            {
              icon:  FolderKanban,
              label: 'Proyectos activos',
              value: loading ? '—' : activeProjects.length,
              color: 'text-blue-300',
              href:  '/panel/proyectos',
            },
            {
              icon:  TrendingUp,
              label: 'Pipeline (€)',
              value: loading ? '—' : `€${pipelineValue.toLocaleString('es')}`,
              color: 'text-purple-300',
              href:  '/panel/proyectos',
            },
            {
              icon:  TrendingUp,
              label: `Facturado · ${PERIOD_LABELS[period].toLowerCase()}`,
              value: loading ? '—' : `€${periodRevenue.toLocaleString('es')}`,
              color: 'text-oro',
              href:  '/panel/proyectos',
            },
            {
              icon:  Users,
              label: 'Total acumulado',
              value: loading ? '—' : `€${totalRevenue.toLocaleString('es')}`,
              color: 'text-emerald-300',
              href:  '/panel/proyectos',
            },
          ].map(({ icon: Icon, label, value, color, href }) => (
            <Link
              key={label}
              href={href}
              className="rounded-xl border border-white/5 bg-pizarra/20 p-4 md:p-6 hover:bg-pizarra/30 transition-colors group"
            >
              <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                <Icon className={`h-4 w-4 ${color}`} />
                <span className="text-[10px] md:text-xs text-humo/50 truncate">{label}</span>
              </div>
              <div className={`text-xl md:text-3xl font-bold ${color}`}>{value}</div>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {/* Recent projects — drop zone */}
          <ProjectsDropZone>
            <div className="flex items-center justify-between px-5 md:px-6 py-4 border-b border-white/5">
              <h2 className="text-sm font-semibold text-humo">Proyectos recientes</h2>
              <Link href="/panel/proyectos" className="text-xs text-oro hover:text-oro/70 transition-colors flex items-center gap-1">
                Ver todos <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            {loading ? (
              <div className="px-6 py-8 text-center text-sm text-humo/30">Cargando...</div>
            ) : recentProjects.length === 0 ? (
              <div className="px-6 py-8 text-center">
                <p className="text-sm text-humo/30">No hay proyectos todavía.</p>
                <Link href="/panel/proyectos/nuevo" className="mt-3 inline-block text-xs text-oro hover:text-oro/70">
                  Crear el primero
                </Link>
                <p className="mt-4 text-[10px] text-humo/30">
                  Tip: arrastra un lead aquí para convertirlo en proyecto.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[480px]">
                  <thead>
                    <tr className="border-b border-white/5">
                      {['Cliente', 'Servicio', 'Estado', 'Precio'].map(h => (
                        <th key={h} className="px-5 py-3 text-left text-xs font-medium text-humo/40">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {recentProjects.map(p => (
                      <tr key={p.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                        <td className="px-5 py-3">
                          <div className="font-medium text-humo text-xs">{p.client_name}</div>
                          {p.deadline_at && (
                            <div className="flex items-center gap-1 text-[10px] text-humo/30 mt-0.5">
                              <Clock className="h-2.5 w-2.5" />
                              {new Date(p.deadline_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                            </div>
                          )}
                        </td>
                        <td className="px-5 py-3 text-humo/50 text-xs">{p.service}</td>
                        <td className="px-5 py-3">
                          <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${STATUS_COLORS[p.status]}`}>
                            {STATUS_LABELS[p.status]}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-oro text-xs font-medium whitespace-nowrap">
                          {p.price ? `€${p.price.toLocaleString('es')}` : '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </ProjectsDropZone>

          {/* Recent leads */}
          <div className="rounded-xl border border-white/5 bg-pizarra/10 overflow-hidden">
            <div className="flex items-center justify-between px-5 md:px-6 py-4 border-b border-white/5">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-semibold text-humo">Leads recientes</h2>
                {!loading && newLeads.length > 0 && (
                  <span className="inline-flex items-center justify-center h-4 min-w-4 px-1 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-bold">
                    {newLeads.length}
                  </span>
                )}
              </div>
              <Link href="/panel/leads" className="text-xs text-oro hover:text-oro/70 transition-colors flex items-center gap-1">
                Ver todos <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            {loading ? (
              <div className="px-6 py-8 text-center text-sm text-humo/30">Cargando...</div>
            ) : recentLeads.length === 0 ? (
              <div className="px-6 py-8 text-center">
                <Inbox className="h-6 w-6 text-humo/20 mx-auto mb-2" />
                <p className="text-sm text-humo/30">Sin leads todavía.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[520px]">
                  <thead>
                    <tr className="border-b border-white/5">
                      {['', 'Nombre', 'Servicio', 'Estado', 'Fecha'].map((h, i) => (
                        <th key={i} className="px-3 py-3 text-left text-xs font-medium text-humo/40 first:pl-5 last:pr-5">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {recentLeads.map(l => {
                      const status = l.lead_status ?? 'nuevo'
                      return (
                        <DraggableLeadRow key={l.id} lead={l}>
                          <td className="px-3 py-3 pl-5 w-6">
                            <GripVertical className="h-3.5 w-3.5 text-humo/25" />
                          </td>
                          <td className="px-3 py-3">
                            <div className="font-medium text-humo text-xs">{l.name}</div>
                            <div className="text-[10px] text-humo/40">{l.email}</div>
                          </td>
                          <td className="px-3 py-3 text-humo/50 text-xs">{l.service ?? '—'}</td>
                          <td className="px-3 py-3">
                            <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${LEAD_STATUS_COLORS[status as keyof typeof LEAD_STATUS_COLORS] ?? 'bg-blue-900/40 text-blue-300'}`}>
                              {LEAD_STATUS_LABELS[status as keyof typeof LEAD_STATUS_LABELS] ?? 'Nuevo'}
                            </span>
                          </td>
                          <td className="px-3 py-3 pr-5 text-xs text-humo/40 whitespace-nowrap">
                            {new Date(l.created_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                          </td>
                        </DraggableLeadRow>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
            {!loading && recentLeads.length > 0 && (
              <p className="px-5 md:px-6 py-2 text-[10px] text-humo/30 border-t border-white/5">
                Tip: arrastra un lead a “Proyectos recientes” para convertirlo.
              </p>
            )}
          </div>
        </div>
      </div>

      <DragOverlay dropAnimation={null}>
        {activeLead ? (
          <div className="rounded-lg border border-oro/40 bg-tinta px-4 py-3 shadow-2xl pointer-events-none">
            <div className="text-xs font-medium text-humo">{activeLead.name}</div>
            <div className="text-[10px] text-humo/50">{activeLead.email}</div>
            {activeLead.service && (
              <div className="text-[10px] text-oro mt-0.5">{activeLead.service}</div>
            )}
          </div>
        ) : null}
      </DragOverlay>

      {modalLead && (
        <NewProjectModal
          lead={modalLead}
          onClose={() => setModalLead(null)}
          onCreated={() => {
            setModalLead(null)
            refresh()
          }}
        />
      )}
    </DndContext>
  )
}
