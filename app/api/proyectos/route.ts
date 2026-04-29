import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(request: Request) {
  if (!supabaseAdmin) return NextResponse.json([])

  const { searchParams } = new URL(request.url)
  const clientEmail = searchParams.get('client_email')

  let query = supabaseAdmin
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  if (clientEmail) query = query.eq('client_email', clientEmail)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  if (!supabaseAdmin) return NextResponse.json({ error: 'Supabase no configurado' }, { status: 503 })
  const { lead_id, ...fields } = await request.json()
  const { data, error } = await supabaseAdmin.rpc('create_project_with_client', {
    p_client_name:     fields.client_name,
    p_client_email:    fields.client_email    ?? null,
    p_service:         fields.service,
    p_kit:             fields.kit             ?? '',
    p_status:          fields.status          ?? 'pendiente',
    p_price:           fields.price           ?? null,
    p_notes:           fields.notes           ?? null,
    p_deliverable_url: fields.deliverable_url ?? null,
    p_deadline_at:     fields.deadline_at     ?? null,
    p_lead_id:         lead_id                ?? null,
  })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(Array.isArray(data) ? data[0] : data)
}

export async function PATCH(request: Request) {
  const body = await request.json()
  const { id, ...updates } = body
  if (!supabaseAdmin) return NextResponse.json({ error: 'Supabase no configurado' }, { status: 503 })
  const { data, error } = await supabaseAdmin
    .from('projects')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function DELETE(request: Request) {
  const { id } = await request.json()
  if (!supabaseAdmin) return NextResponse.json({ error: 'Supabase no configurado' }, { status: 503 })
  const { error } = await supabaseAdmin.from('projects').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
