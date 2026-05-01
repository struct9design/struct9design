import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: Request) {
  if (!stripe) return NextResponse.json({ error: 'Stripe no configurado' }, { status: 503 })

  const body      = await request.text()
  const signature = request.headers.get('stripe-signature') ?? ''
  const secret    = process.env.STRIPE_WEBHOOK_SECRET ?? ''

  let event
  try {
    event = await stripe.webhooks.constructEventAsync(body, signature, secret)
  } catch (err) {
    console.error('[WEBHOOK] Firma inválida:', err)
    return NextResponse.json({ error: 'Webhook inválido' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session    = event.data.object
    const project_id = session.metadata?.project_id
    const amountPaid = session.amount_total ? session.amount_total / 100 : null

    if (project_id && supabaseAdmin) {
      const { error } = await supabaseAdmin
        .from('projects')
        .update({
          paid_at:      new Date().toISOString(),
          amount_paid:  amountPaid,
          status:       'cobrado',
        })
        .eq('id', project_id)

      if (error) {
        console.error('[WEBHOOK] Error actualizando proyecto:', error)
        return NextResponse.json({ error: 'Error en DB' }, { status: 500 })
      }

      console.log(`[WEBHOOK] Proyecto ${project_id} marcado como cobrado — ${amountPaid}€`)
    }
  }

  return NextResponse.json({ received: true })
}
