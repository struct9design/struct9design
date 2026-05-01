import { NextResponse } from 'next/server'
import PDFDocument from 'pdfkit'
import { stripe } from '@/lib/stripe'
import { supabaseAdmin } from '@/lib/supabase'

const GOLD  = '#C9A227'
const DARK  = '#141414'
const GRAY  = '#888888'

function escapeHtml(str: string) {
  return str
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

async function generatePresupuestoPDF(opts: {
  clientName: string
  clientEmail: string
  service: string
  amount: number
  date: string
}): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', margin: 60, info: { Title: 'Presupuesto Struct9 Design' } })
    const chunks: Buffer[] = []
    doc.on('data', c => chunks.push(c))
    doc.on('end',  () => resolve(Buffer.concat(chunks)))
    doc.on('error', reject)

    const W = 595 - 120 // page width minus margins

    // ── Header ──────────────────────────────────────────────────────────────
    doc.font('Helvetica-Bold').fontSize(22).fillColor(DARK)
       .text('STRUCT9 DESIGN', 60, 60, { align: 'center', width: W })

    doc.font('Helvetica').fontSize(9).fillColor(GRAY)
       .text('hola@struct9design.com  ·  Sanlúcar la Mayor, Sevilla  ·  struct9design.com',
             60, 88, { align: 'center', width: W })

    // Gold separator
    doc.moveTo(60, 108).lineTo(535, 108).lineWidth(1.5).strokeColor(GOLD).stroke()

    // ── Document title ───────────────────────────────────────────────────────
    doc.font('Helvetica-Bold').fontSize(14).fillColor(DARK)
       .text('PRESUPUESTO', 60, 126, { align: 'left' })

    doc.font('Helvetica').fontSize(9).fillColor(GRAY)
       .text(`Fecha: ${opts.date}`, 60, 145)
       .text('Este documento no es una factura fiscal.', 60, 157)

    // ── Client box ──────────────────────────────────────────────────────────
    doc.roundedRect(60, 178, W, 52, 4).fillColor('#F7F7F7').fill()
    doc.font('Helvetica-Bold').fontSize(8).fillColor(GRAY)
       .text('CLIENTE', 76, 190)
    doc.font('Helvetica-Bold').fontSize(10).fillColor(DARK)
       .text(opts.clientName, 76, 202)
    doc.font('Helvetica').fontSize(9).fillColor(GRAY)
       .text(opts.clientEmail, 76, 215)

    // ── Services table ───────────────────────────────────────────────────────
    const tableY = 252

    // Header row
    doc.rect(60, tableY, W, 24).fillColor(DARK).fill()
    doc.font('Helvetica-Bold').fontSize(9).fillColor('#FFFFFF')
       .text('CONCEPTO', 76, tableY + 7)
       .text('IMPORTE', 60, tableY + 7, { align: 'right', width: W })

    // Content row
    doc.rect(60, tableY + 24, W, 40).fillColor('#FAFAFA').fill()
    doc.font('Helvetica').fontSize(9).fillColor(DARK)
       .text(opts.service, 76, tableY + 33, { width: W - 120 })
    doc.font('Helvetica-Bold').fontSize(9).fillColor(DARK)
       .text(`${opts.amount.toFixed(2)} €`, 60, tableY + 33, { align: 'right', width: W })

    // ── Total box ────────────────────────────────────────────────────────────
    const totalY = tableY + 82
    doc.rect(60, totalY, W, 36).fillColor(GOLD).fill()
    doc.font('Helvetica-Bold').fontSize(11).fillColor('#080808')
       .text('TOTAL', 76, totalY + 11)
       .text(`${opts.amount.toFixed(2)} €`, 60, totalY + 11, { align: 'right', width: W })

    doc.font('Helvetica').fontSize(8).fillColor(GRAY)
       .text('* Precio acordado. No incluye IVA — pendiente de constitución de entidad fiscal.',
             60, totalY + 48, { align: 'center', width: W })

    // ── Payment note ─────────────────────────────────────────────────────────
    doc.roundedRect(60, totalY + 68, W, 44, 4).fillColor('#FFF8E7').fill()
    doc.font('Helvetica-Bold').fontSize(8.5).fillColor(DARK)
       .text('¿Cómo pagar?', 76, totalY + 77)
    doc.font('Helvetica').fontSize(8.5).fillColor(DARK)
       .text('Recibirás un enlace de pago seguro junto a este documento. El pago se procesa en segundos mediante tarjeta.',
             76, totalY + 90, { width: W - 32 })

    // ── Footer ───────────────────────────────────────────────────────────────
    doc.moveTo(60, 750).lineTo(535, 750).lineWidth(0.5).strokeColor('#DDDDDD').stroke()
    doc.font('Helvetica').fontSize(8).fillColor(GRAY)
       .text('Struct9 Design  ·  hola@struct9design.com  ·  struct9design.com',
             60, 758, { align: 'center', width: W })

    doc.end()
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { project_id, amount, service, client_name, client_email } = body

    if (!project_id || !amount || !service || !client_email) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 })
    }

    const amountNum = parseFloat(amount)
    if (isNaN(amountNum) || amountNum <= 0) {
      return NextResponse.json({ error: 'Importe inválido' }, { status: 400 })
    }

    // ── Crear sesión de Stripe ───────────────────────────────────────────────
    if (!stripe) {
      return NextResponse.json({ error: 'Stripe no configurado' }, { status: 503 })
    }

    let session
    try {
      session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{
        price_data: {
          currency: 'eur',
          unit_amount: Math.round(amountNum * 100),
          product_data: {
            name: service,
            description: `Struct9 Design — ${client_name}`,
          },
        },
        quantity: 1,
      }],
      metadata: { project_id },
      customer_email: client_email,
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://struct9design.com'}/?pago=ok`,
      cancel_url:  `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://struct9design.com'}/?pago=cancelado`,
    })
    } catch (stripeErr) {
      console.error('[STRIPE] Error creando sesión:', stripeErr)
      return NextResponse.json({ error: `Error Stripe: ${stripeErr instanceof Error ? stripeErr.message : stripeErr}` }, { status: 500 })
    }

    // ── Guardar URL en Supabase ──────────────────────────────────────────────
    if (supabaseAdmin) {
      await supabaseAdmin
        .from('projects')
        .update({ stripe_session_id: session.id, stripe_payment_url: session.url })
        .eq('id', project_id)
    }

    // ── Generar PDF ──────────────────────────────────────────────────────────
    const today = new Date().toLocaleDateString('es-ES', {
      day: 'numeric', month: 'long', year: 'numeric',
    })
    let pdfBuffer: Buffer
    try {
      pdfBuffer = await generatePresupuestoPDF({
      clientName: client_name,
      clientEmail: client_email,
      service,
      amount: amountNum,
      date: today,
    })
    } catch (pdfErr) {
      console.error('[STRIPE] Error generando PDF:', pdfErr)
      return NextResponse.json({ error: `Error PDF: ${pdfErr instanceof Error ? pdfErr.message : pdfErr}` }, { status: 500 })
    }

    // ── Enviar email con Resend ──────────────────────────────────────────────
    const resendKey = process.env.RESEND_API_KEY
    if (!resendKey) {
      return NextResponse.json({ error: 'Resend no configurado' }, { status: 503 })
    }

    const safeClient  = escapeHtml(client_name)
    const safeService = escapeHtml(service)
    const payUrl      = session.url ?? ''

    const emailHtml = `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F4F4F4;font-family:Helvetica,Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F4F4F4;padding:32px 0">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,.08)">

        <!-- Header -->
        <tr><td style="background:#141414;padding:28px 40px;text-align:center">
          <p style="margin:0;font-size:22px;font-weight:700;color:#ffffff;letter-spacing:2px">STRUCT9 DESIGN</p>
          <p style="margin:6px 0 0;font-size:11px;color:#888;letter-spacing:1px">AGENCIA WEB · SEVILLA</p>
        </td></tr>

        <!-- Gold line -->
        <tr><td style="background:#C9A227;height:3px;padding:0"></td></tr>

        <!-- Body -->
        <tr><td style="padding:36px 40px">
          <p style="margin:0 0 8px;font-size:15px;color:#141414">Hola, <strong>${safeClient}</strong>,</p>
          <p style="margin:0 0 24px;font-size:14px;color:#444;line-height:1.6">
            Te enviamos el presupuesto para el servicio <strong>${safeService}</strong>.<br>
            Lo encontrarás adjunto en este correo.
          </p>

          <p style="margin:0 0 12px;font-size:14px;color:#444">
            Para completar el pago de forma segura, haz clic en el botón:
          </p>

          <!-- CTA -->
          <table cellpadding="0" cellspacing="0" style="margin:0 0 28px">
            <tr><td style="background:#C9A227;border-radius:8px">
              <a href="${payUrl}"
                 style="display:inline-block;padding:14px 32px;font-size:14px;font-weight:700;color:#080808;text-decoration:none;letter-spacing:.5px">
                Pagar ahora →
              </a>
            </td></tr>
          </table>

          <p style="margin:0 0 6px;font-size:12px;color:#888;line-height:1.6">
            El pago se procesa de forma segura a través de Stripe.<br>
            Aceptamos todas las tarjetas de crédito y débito.
          </p>

          <hr style="border:none;border-top:1px solid #EEEEEE;margin:28px 0">

          <p style="margin:0;font-size:13px;color:#444;line-height:1.6">
            ¿Tienes alguna pregunta? Escríbenos a
            <a href="mailto:hola@struct9design.com" style="color:#C9A227;text-decoration:none">hola@struct9design.com</a>
          </p>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#F9F9F9;padding:20px 40px;text-align:center;border-top:1px solid #EEEEEE">
          <p style="margin:0;font-size:11px;color:#AAA">
            Struct9 Design · Sanlúcar la Mayor, Sevilla<br>
            <a href="https://struct9design.com" style="color:#AAA">struct9design.com</a>
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`

    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from:    'Struct9 Design <hola@struct9design.com>',
        to:      client_email,
        subject: `Presupuesto: ${service} — Struct9 Design`,
        html:    emailHtml,
        attachments: [{
          filename: 'presupuesto-struct9design.pdf',
          content:  pdfBuffer.toString('base64'),
        }],
      }),
    })

    if (!emailRes.ok) {
      const err = await emailRes.text()
      console.error('[STRIPE] Error enviando email:', err)
      return NextResponse.json({ error: 'Error al enviar el email' }, { status: 500 })
    }

    return NextResponse.json({ ok: true, payment_url: session.url })
  } catch (err) {
    console.error('[STRIPE] Error en create-checkout:', err)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
