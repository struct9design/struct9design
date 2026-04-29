import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  if (!supabaseAdmin) return NextResponse.json(null, { status: 404 })
  const { data, error } = await supabaseAdmin
    .from('clients')
    .select('*')
    .eq('id', id)
    .single()
  if (error) return NextResponse.json(null, { status: 404 })
  return NextResponse.json(data)
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await request.json()
  if (!supabaseAdmin) return NextResponse.json({ error: 'Supabase no configurado' }, { status: 503 })
  const { data, error } = await supabaseAdmin
    .from('clients')
    .update(body)
    .eq('id', id)
    .select()
    .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
