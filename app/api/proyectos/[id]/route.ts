import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

type Params = { params: Promise<{ id: string }> }

export async function GET(_req: Request, { params }: Params) {
  const { id } = await params
  if (!supabaseAdmin) return NextResponse.json({ error: 'Supabase no configurado' }, { status: 503 })
  const { data, error } = await supabaseAdmin.from('projects').select('*').eq('id', id).single()
  if (error) return NextResponse.json({ error: error.message }, { status: 404 })
  return NextResponse.json(data)
}

export async function PATCH(request: Request, { params }: Params) {
  const { id } = await params
  if (!supabaseAdmin) return NextResponse.json({ error: 'Supabase no configurado' }, { status: 503 })

  const updates = await request.json()

  const { data: current } = await supabaseAdmin
    .from('projects')
    .select('status')
    .eq('id', id)
    .single()

  const { data, error } = await supabaseAdmin
    .from('projects')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  if (updates.status && current?.status && updates.status !== current.status) {
    await supabaseAdmin.from('project_events').insert({
      project_id: id,
      type: 'status_change',
      payload: { from: current.status, to: updates.status },
    })
  }

  return NextResponse.json(data)
}
