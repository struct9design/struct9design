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

export const SERVICES = [
  { id: 'web',     name: 'Diseño & Desarrollo Web', kit: 'web-development',  price: 0 },
  { id: 'chatbot', name: 'Chatbot WhatsApp 24/7',   kit: 'whatsapp-chatbot', price: 0 },
  { id: 'voz',     name: 'Asistente de Voz IA',     kit: 'voice-assistant',  price: 0 },
] as const

export const STATUS_LABELS: Record<ProjectStatus, string> = {
  pendiente:   'Pendiente',
  en_proceso:  'En proceso',
  entregado:   'Entregado',
  facturado:   'Facturado',
  cobrado:     'Cobrado',
}

export const STATUS_COLORS: Record<ProjectStatus, string> = {
  pendiente:   'bg-yellow-900/40 text-yellow-300',
  en_proceso:  'bg-blue-900/40   text-blue-300',
  entregado:   'bg-green-900/40  text-green-300',
  facturado:   'bg-oro/20        text-oro',
  cobrado:     'bg-emerald-900/40 text-emerald-300',
}

export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  nuevo:                'Nuevo',
  contactado:           'Contactado',
  presupuesto_enviado:  'Presupuesto enviado',
  ganado:               'Ganado',
  perdido:              'Perdido',
}

export const LEAD_STATUS_COLORS: Record<LeadStatus, string> = {
  nuevo:                'bg-blue-900/40    text-blue-300',
  contactado:           'bg-yellow-900/40  text-yellow-300',
  presupuesto_enviado:  'bg-purple-900/40  text-purple-300',
  ganado:               'bg-green-900/40   text-green-300',
  perdido:              'bg-red-900/40     text-red-300',
}
