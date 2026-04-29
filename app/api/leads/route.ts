import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET() {
  if (!supabaseAdmin) return NextResponse.json([])
  const { data, error } = await supabaseAdmin
    .from('contacts')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function PATCH(request: Request) {
  const body = await request.json()
  const { id, ...updates } = body
  if (!supabaseAdmin) return NextResponse.json({ error: 'Supabase no configurado' }, { status: 503 })
  const { data, error } = await supabaseAdmin
    .from('contacts')
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
  const { error } = await supabaseAdmin.from('contacts').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
