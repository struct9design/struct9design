import { NextResponse } from 'next/server'
import PDFDocument from 'pdfkit'
import { stripe } from '@/lib/stripe'
import { supabaseAdmin } from '@/lib/supabase'

const GOLD  = '#C9A227'
const DARK  = '#141414'
const GRAY  = '#444444'
const MID   = '#666666'

const SERVICE_INCLUDES: Record<string, string[]> = {
  'Diseño & Desarrollo Web': [
    'Diseño personalizado con tu identidad de marca',
    'Responsive y optimizada para móvil, tablet y escritorio',
    'CRM o panel de gestión a medida (si aplica)',
    'Optimización SEO on-page incluida',
    'Diseño + desarrollo en un único equipo',
  ],
  'Chatbot WhatsApp 24/7': [
    'Asistente entrenado con la información de tu negocio',
    'Atención automática 24/7 en WhatsApp',
    'Gestión de reservas y citas',
    'Gestión de consultas y preguntas frecuentes',
    'Derivación a humano cuando sea necesario',
    'Actualizaciones y mantenimiento incluidos',
  ],
  'Asistente de Voz IA': [
    'Asistente de voz entrenado con tu negocio',
    'Atención telefónica automática 24/7',
    'Gestión de reservas y citas',
    'Registro de solicitudes y mensajes',
    'Actualizaciones y mantenimiento incluidos',
  ],
}

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
  additionalInfo?: string
  extras?: { descripcion: string; importe: string }[]
}): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', margin: 60, info: { Title: 'Presupuesto Struct9 Design' } })
    const chunks: Buffer[] = []
    doc.on('data', c => chunks.push(c))
    doc.on('end',  () => resolve(Buffer.concat(chunks)))
    doc.on('error', reject)

    const L = 60          // left margin
    const R = 535         // right margin (595 - 60)
    const W = R - L       // content width = 475
    // Amount column: right edge at R-14 = 521 (14 px breathing room, € never clips)
    const AMT_W = W - 14
    // Concept column: width to avoid overlap with amount column
    const CONCEPT_W = W - 160

    // ── Header ──────────────────────────────────────────────────────────────
    doc.rect(L, 40, W, 68).fillColor(DARK).fill()
    doc.font('Helvetica-Bold').fontSize(20).fillColor('#FFFFFF')
       .text('STRUCT9 DESIGN', L, 54, { align: 'center', width: W })
    doc.font('Helvetica').fontSize(8).fillColor(GOLD)
       .text('AGENCIA WEB · SEVILLA', L, 78, { align: 'center', width: W })
    doc.font('Helvetica').fontSize(7.5).fillColor('#AAAAAA')
       .text('hola@struct9design.com  ·  struct9design.com', L, 91, { align: 'center', width: W })

    // Gold bar
    doc.rect(L, 108, W, 3).fillColor(GOLD).fill()

    // ── Document title + meta ────────────────────────────────────────────────
    doc.font('Helvetica-Bold').fontSize(15).fillColor(DARK)
       .text('PRESUPUESTO', L, 124)
    doc.font('Helvetica').fontSize(9).fillColor(GRAY)
       .text(`Fecha: ${opts.date}`, L, 147)
    doc.font('Helvetica').fontSize(8).fillColor(MID)
       .text('Este documento no constituye una factura fiscal.', L, 159)

    // ── Client box ──────────────────────────────────────────────────────────
    doc.roundedRect(L, 178, W, 58, 4).fillColor('#F4F4F4').fill()
    doc.moveTo(L, 178).lineTo(L + 3, 178).lineTo(L + 3, 236).lineTo(L, 236)
    doc.rect(L, 178, 3, 58).fillColor(GOLD).fill()
    doc.font('Helvetica-Bold').fontSize(7.5).fillColor(MID)
       .text('DESTINATARIO', L + 14, 190)
    doc.font('Helvetica-Bold').fontSize(11).fillColor(DARK)
       .text(opts.clientName, L + 14, 203)
    doc.font('Helvetica').fontSize(9).fillColor(GRAY)
       .text(opts.clientEmail, L + 14, 218)

    // ── Table ────────────────────────────────────────────────────────────────
    const tableY = 258
    const includes = SERVICE_INCLUDES[opts.service] ?? []
    const baseRowH = Math.max(44, 40 + includes.length * 12)
    const extras   = (opts.extras ?? []).filter(e => e.descripcion && e.importe)
    const extraRowH = 34

    // Pre-calculate total table height so we can draw outer border
    const totalTableH = 28 + baseRowH + extras.length * extraRowH + 40

    // Outer table border
    doc.rect(L, tableY, W, totalTableH).lineWidth(0.5).strokeColor('#D0D0D0').stroke()

    // Header row
    doc.rect(L, tableY, W, 28).fillColor(DARK).fill()
    doc.font('Helvetica-Bold').fontSize(8.5).fillColor('#FFFFFF')
       .text('CONCEPTO', L + 14, tableY + 9)
       .text('IMPORTE', L, tableY + 9, { align: 'right', width: AMT_W })

    // Base service row
    const rowY = tableY + 28
    const baseAmount = extras.length > 0
      ? opts.amount - extras.reduce((s, e) => s + (parseFloat(e.importe) || 0), 0)
      : opts.amount
    doc.rect(L, rowY, W, baseRowH).fillColor('#FAFAFA').fill()
    doc.font('Helvetica-Bold').fontSize(9.5).fillColor(DARK)
       .text(opts.service, L + 14, rowY + 12, { width: CONCEPT_W })
    doc.font('Helvetica-Bold').fontSize(9.5).fillColor(DARK)
       .text(`${baseAmount.toFixed(2)} €`, L, rowY + 12, { align: 'right', width: AMT_W })

    if (includes.length > 0) {
      let bY = rowY + 28
      for (const item of includes) {
        doc.font('Helvetica').fontSize(8).fillColor(MID)
           .text(`• ${item}`, L + 22, bY, { width: CONCEPT_W - 12 })
        bY += 12
      }
    }

    // Extra rows
    let extraOffset = 0
    for (const extra of extras) {
      const eY = rowY + baseRowH + extraOffset
      doc.rect(L, eY, W, extraRowH).fillColor('#F6F6F6').fill()
      // thin divider above each extra row
      doc.moveTo(L, eY).lineTo(R, eY).lineWidth(0.5).strokeColor('#E0E0E0').stroke()
      doc.font('Helvetica').fontSize(9).fillColor(DARK)
         .text(extra.descripcion, L + 14, eY + 12, { width: CONCEPT_W })
      doc.font('Helvetica-Bold').fontSize(9).fillColor(DARK)
         .text(`${parseFloat(extra.importe).toFixed(2)} €`, L, eY + 12, { align: 'right', width: AMT_W })
      extraOffset += extraRowH
    }

    // Total row (gold)
    const totalRowY = rowY + baseRowH + extraOffset
    doc.moveTo(L, totalRowY).lineTo(R, totalRowY).lineWidth(1).strokeColor(GOLD).stroke()
    doc.rect(L, totalRowY, W, 40).fillColor(GOLD).fill()
    doc.font('Helvetica-Bold').fontSize(11.5).fillColor('#080808')
       .text('TOTAL', L + 14, totalRowY + 13)
       .text(`${opts.amount.toFixed(2)} €`, L, totalRowY + 13, { align: 'right', width: AMT_W })

    // ── Below table ──────────────────────────────────────────────────────────
    const belowY = tableY + totalTableH

    doc.font('Helvetica').fontSize(8).fillColor(MID)
       .text('* Precio acordado. No incluye IVA.',
             L, belowY + 10, { align: 'center', width: W })

    // Validity strip
    const alertY = belowY + 28
    doc.rect(L, alertY, W, 28).fillColor('#FFFBEB').fill()
    doc.rect(L, alertY, 3, 28).fillColor(GOLD).fill()
    doc.font('Helvetica-Bold').fontSize(8.5).fillColor('#78350F')
       .text('VALIDEZ 24 H — Este presupuesto caduca 24 horas después de su emisión.',
             L + 12, alertY + 9, { width: W - 20 })

    // Payment note
    const payY = alertY + 44
    doc.roundedRect(L, payY, W, 50, 4).fillColor('#FFF8E7').fill()
    doc.font('Helvetica-Bold').fontSize(9).fillColor(DARK)
       .text('¿Cómo pagar?', L + 14, payY + 12)
    doc.font('Helvetica').fontSize(8.5).fillColor(GRAY)
       .text('Actualmente aceptamos pago mediante Bizum o en efectivo. Una vez aceptado este presupuesto, te facilitaremos los datos necesarios para completar el pago.',
             L + 14, payY + 26, { width: W - 28 })

    // Additional notes
    if (opts.additionalInfo) {
      const notesY = doc.y + 20
      doc.moveTo(L, notesY).lineTo(R, notesY).lineWidth(0.5).strokeColor('#DDDDDD').stroke()
      doc.font('Helvetica-Bold').fontSize(8).fillColor(GRAY)
         .text('NOTAS ADICIONALES', L, notesY + 12, { width: W })
      doc.font('Helvetica').fontSize(9).fillColor(DARK)
         .text(opts.additionalInfo, L, notesY + 26, { width: W })
    }

    // ── Footer ───────────────────────────────────────────────────────────────
    doc.moveTo(L, 750).lineTo(R, 750).lineWidth(0.5).strokeColor('#DDDDDD').stroke()
    doc.font('Helvetica').fontSize(8).fillColor(MID)
       .text('Struct9 Design  ·  hola@struct9design.com  ·  struct9design.com',
             L, 758, { align: 'center', width: W })

    doc.end()
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { project_id, amount, service, client_name, client_email, additional_info, extras } = body

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
      success_url: 'https://struct9design.com/?pago=ok',
      cancel_url:  'https://struct9design.com/?pago=cancelado',
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
      clientName:     client_name,
      clientEmail:    client_email,
      service,
      amount:         amountNum,
      date:           today,
      additionalInfo: additional_info || undefined,
      extras:         extras || [],
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
            Struct9 Design · Sevilla<br>
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
