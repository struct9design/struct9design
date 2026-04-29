import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

const ipMap = new Map<string, { count: number; reset: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = ipMap.get(ip)
  if (!entry || entry.reset < now) {
    ipMap.set(ip, { count: 1, reset: now + 60_000 })
    return true
  }
  if (entry.count >= 3) return false
  entry.count++
  return true
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? '127.0.0.1'

  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Demasiados intentos. Espera un momento.' }, { status: 429 })
  }

  const body = await request.json()
  const { hp } = body

  // Honeypot: bots fill hidden fields, humans don't
  if (hp) return NextResponse.json({ ok: true })

  const name    = typeof body.name    === 'string' ? body.name.trim().slice(0, 200)    : ''
  const email   = typeof body.email   === 'string' ? body.email.trim().slice(0, 254)   : ''
  const phone   = typeof body.phone   === 'string' ? body.phone.trim().slice(0, 30)    : ''
  const service = typeof body.service === 'string' ? body.service.trim().slice(0, 100) : ''
  const message = typeof body.message === 'string' ? body.message.trim().slice(0, 2000) : ''

  if (!name || !email) {
    return NextResponse.json({ error: 'Nombre y email son obligatorios' }, { status: 400 })
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Email no válido' }, { status: 400 })
  }

  if (supabase) {
    const { error } = await supabase.from('contacts').insert({
      name,
      email,
      phone:   phone   || null,
      service: service || null,
      message: message || null,
      lead_status: 'nuevo',
    })
    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Error al guardar' }, { status: 500 })
    }
  } else {
    console.log('[CONTACTO] Nueva solicitud:', { name, email, phone, service, message })
  }

  const resendKey = process.env.RESEND_API_KEY
  if (resendKey) {
    const adminEmail = process.env.ADMIN_EMAIL || 'hola@struct9design.com'
    const safeName    = escapeHtml(name)
    const safeEmail   = escapeHtml(email)
    const safePhone   = escapeHtml(phone)
    const safeService = escapeHtml(service)
    const safeMessage = escapeHtml(message)

    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from:    'Panel STRUCT9 <noreply@struct9design.com>',
        to:      adminEmail,
        subject: `Nuevo lead: ${safeName} — ${safeService || 'Sin servicio especificado'}`,
        html: `
          <div style="font-family:sans-serif;max-width:520px;padding:24px;background:#141414;color:#F0F0F0;border-radius:12px">
            <h2 style="color:#C9A227;margin:0 0 16px">Nuevo lead en STRUCT9</h2>
            <table style="width:100%;border-collapse:collapse;font-size:14px">
              <tr><td style="padding:6px 0;color:#999;width:110px">Nombre</td><td style="color:#F0F0F0">${safeName}</td></tr>
              <tr><td style="padding:6px 0;color:#999">Email</td><td><a href="mailto:${safeEmail}" style="color:#C9A227">${safeEmail}</a></td></tr>
              ${safePhone   ? `<tr><td style="padding:6px 0;color:#999">Teléfono</td><td style="color:#F0F0F0">${safePhone}</td></tr>` : ''}
              ${safeService ? `<tr><td style="padding:6px 0;color:#999">Servicio</td><td style="color:#F0F0F0">${safeService}</td></tr>` : ''}
            </table>
            ${safeMessage ? `<div style="margin-top:16px;padding:12px;background:#0e0e0e;border-radius:8px;font-size:13px;color:#aaa;line-height:1.6">${safeMessage}</div>` : ''}
            <a href="${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://struct9design.com'}/panel/leads"
               style="display:inline-block;margin-top:20px;background:#C9A227;color:#080808;padding:10px 20px;border-radius:8px;font-weight:700;text-decoration:none;font-size:13px">
              Ver lead en el panel →
            </a>
          </div>
        `,
      }),
    }).catch(err => console.error('[EMAIL] Error al enviar notificación:', err))
  }

  return NextResponse.json({ ok: true })
}
