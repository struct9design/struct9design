import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET() {
  if (!supabaseAdmin) return NextResponse.json([])
  const { data, error } = await supabaseAdmin
    .from('clients')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const body = await request.json()
  if (!supabaseAdmin) return NextResponse.json({ error: 'Supabase no configurado' }, { status: 503 })
  const { data, error } = await supabaseAdmin.from('clients').insert(body).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function DELETE(request: Request) {
  const { id } = await request.json()
  if (!supabaseAdmin) return NextResponse.json({ error: 'Supabase no configurado' }, { status: 503 })
  const { error } = await supabaseAdmin.from('clients').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
