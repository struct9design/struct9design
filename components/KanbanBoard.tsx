'use client'

import { useState } from 'react'
import Link from 'next/link'
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
import { Pencil, Trash2, ExternalLink, Clock, AlertCircle } from 'lucide-react'
import type { Project, ProjectStatus } from '@/lib/types'
import { STATUS_LABELS, STATUS_COLORS } from '@/lib/types'

const COLUMNS: ProjectStatus[] = ['pendiente', 'en_proceso', 'entregado', 'facturado', 'cobrado']

function ProjectCard({ project, dragging = false }: { project: Project; dragging?: boolean }) {
  const now = new Date()
  const overdue =
    project.deadline_at &&
    new Date(project.deadline_at) < now &&
    project.status !== 'entregado' &&
    project.status !== 'facturado' &&
    project.status !== 'cobrado'

  return (
    <div
      className={`rounded-lg border bg-pizarra/30 p-3 ${
        dragging ? 'border-oro/50 shadow-2xl rotate-1' : 'border-white/10'
      } transition-colors`}
    >
      <div className="font-medium text-humo text-xs mb-1 leading-tight">{project.client_name}</div>
      {project.client_email && (
        <div className="text-[10px] text-humo/35 mb-1.5 truncate">{project.client_email}</div>
      )}
      <div className="text-[10px] text-humo/50 mb-2">{project.service}</div>
      <div className="flex items-center justify-between text-[10px]">
        <span className="text-oro font-medium">
          {project.price ? `€${project.price.toLocaleString('es')}` : '—'}
        </span>
        {project.deadline_at && (
          <span className={`flex items-center gap-1 ${overdue ? 'text-red-400 font-medium' : 'text-humo/40'}`}>
            {overdue && <AlertCircle className="h-2.5 w-2.5" />}
            <Clock className="h-2.5 w-2.5" />
            {new Date(project.deadline_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
          </span>
        )}
      </div>
    </div>
  )
}

function DraggableCard({
  project,
  onDelete,
}: {
  project: Project
  onDelete: (id: string) => void
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: project.id,
    data: { project },
  })

  return (
    <div className="group relative">
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={{ touchAction: 'none', userSelect: 'none', WebkitUserSelect: 'none' }}
        className={isDragging ? 'opacity-30 cursor-grabbing' : 'cursor-grab'}
      >
        <ProjectCard project={project} />
      </div>
      <div className="absolute top-2 right-2 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-pizarra/90 backdrop-blur rounded px-1.5 py-1">
        {project.deliverable_url && (
          <a
            href={project.deliverable_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-humo/50 hover:text-oro transition-colors"
            onPointerDown={e => e.stopPropagation()}
            onClick={e => e.stopPropagation()}
            title="Ver entregable"
          >
            <ExternalLink className="h-3 w-3" />
          </a>
        )}
        <Link
          href={`/panel/proyectos/${project.id}`}
          className="text-humo/50 hover:text-humo transition-colors"
          onPointerDown={e => e.stopPropagation()}
          onClick={e => e.stopPropagation()}
          title="Editar"
        >
          <Pencil className="h-3 w-3" />
        </Link>
        <button
          onPointerDown={e => e.stopPropagation()}
          onClick={e => {
            e.stopPropagation()
            onDelete(project.id)
          }}
          className="text-humo/50 hover:text-red-400 transition-colors"
          title="Eliminar"
        >
          <Trash2 className="h-3 w-3" />
        </button>
      </div>
    </div>
  )
}

function Column({
  status,
  projects,
  onDelete,
}: {
  status: ProjectStatus
  projects: Project[]
  onDelete: (id: string) => void
}) {
  const { setNodeRef, isOver } = useDroppable({ id: status })
  return (
    <div className="flex flex-col gap-3 min-w-0">
      <div
        className={`rounded-lg px-3 py-2 text-xs font-semibold flex items-center justify-between ${STATUS_COLORS[status]}`}
      >
        <span>{STATUS_LABELS[status]}</span>
        <span className="opacity-70 tabular-nums">{projects.length}</span>
      </div>
      <div
        ref={setNodeRef}
        className={`flex-1 min-h-[240px] rounded-lg p-2 space-y-2 transition-colors border ${
          isOver
            ? 'bg-oro/5 border-oro/40 ring-2 ring-oro/30'
            : 'bg-pizarra/10 border-white/5'
        }`}
      >
        {projects.length === 0 ? (
          <div className="py-10 text-center text-[10px] text-humo/25">Sin proyectos</div>
        ) : (
          projects.map(p => <DraggableCard key={p.id} project={p} onDelete={onDelete} />)
        )}
      </div>
    </div>
  )
}

export default function KanbanBoard({
  projects,
  onStatusChange,
  onDelete,
}: {
  projects: Project[]
  onStatusChange: (id: string, status: ProjectStatus) => void
  onDelete: (id: string) => void
}) {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }))
  const [activeProject, setActiveProject] = useState<Project | null>(null)

  function handleDragStart(e: DragStartEvent) {
    const p = e.active.data.current?.project as Project | undefined
    if (p) setActiveProject(p)
  }

  function handleDragEnd(e: DragEndEvent) {
    setActiveProject(null)
    if (!e.over) return
    const newStatus = e.over.id as ProjectStatus
    const p = e.active.data.current?.project as Project | undefined
    if (!p || p.status === newStatus) return
    onStatusChange(p.id, newStatus)
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActiveProject(null)}
    >
      <div className="grid grid-cols-5 gap-3 xl:gap-4">
        {COLUMNS.map(status => (
          <Column
            key={status}
            status={status}
            projects={projects.filter(p => p.status === status)}
            onDelete={onDelete}
          />
        ))}
      </div>
      <DragOverlay dropAnimation={null}>
        {activeProject ? <ProjectCard project={activeProject} dragging /> : null}
      </DragOverlay>
    </DndContext>
  )
}
