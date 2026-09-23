import { services } from '@/content/services'

export type ProjectStatus = 'pendiente' | 'en_proceso' | 'entregado' | 'facturado' | 'cobrado'

export type LeadStatus = 'nuevo' | 'contactado' | 'presupuesto_enviado' | 'ganado' | 'perdido'

export interface Project {
  id: string
  created_at: string
  client_name: string
  client_email: string | null
  service: string
  kit: string
  status: ProjectStatus
  price: number | null
  notes: string | null
  deliverable_url: string | null
  deadline_at: string | null
  paid_at: string | null
  amount_paid: number | null
  stripe_session_id: string | null
  stripe_payment_url: string | null
}

export interface Client {
  id: string
  created_at: string
  name: string
  email: string | null
  phone: string | null
  company: string | null
  notes: string | null
}

export interface ContactSubmission {
  id: string
  created_at: string
  name: string
  email: string
  phone: string | null
  service: string | null
  message: string | null
  lead_status: LeadStatus
}

/**
 * Catálogo del CRM: las 4 áreas de la web (content/services.ts).
 * `kit` guarda el slug del servicio. Los proyectos antiguos conservan su texto original.
 */
export const SERVICES = services.map((s) => ({ id: s.area, name: s.name, kit: s.slug, price: 0 }))

export const STATUS_LABELS: Record<ProjectStatus, string> = {
  pendiente:   'Pendiente',
  en_proceso:  'En proceso',
  entregado:   'Entregado',
  facturado:   'Facturado',
  cobrado:     'Cobrado',
}

export const STATUS_COLORS: Record<ProjectStatus, string> = {
  pendiente:   'bg-amber-50 text-amber-800',
  en_proceso:  'bg-blue-50   text-blue-700',
  entregado:   'bg-green-50  text-green-700',
  facturado:   'bg-senal/10        text-senal',
  cobrado:     'bg-emerald-50 text-emerald-700',
}

export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  nuevo:                'Nuevo',
  contactado:           'Contactado',
  presupuesto_enviado:  'Presupuesto enviado',
  ganado:               'Ganado',
  perdido:              'Perdido',
}

export const LEAD_STATUS_COLORS: Record<LeadStatus, string> = {
  nuevo:                'bg-blue-50    text-blue-700',
  contactado:           'bg-amber-50  text-amber-800',
  presupuesto_enviado:  'bg-violet-50  text-violet-700',
  ganado:               'bg-green-50   text-green-700',
  perdido:              'bg-red-50     text-red-700',
}
