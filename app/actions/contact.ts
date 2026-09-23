"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Resend } from "resend";
import { services } from "@/content/services";
import { site } from "@/content/site";
import {
  contactSchema,
  flattenErrors,
  formDataToObject,
  HONEYPOT_FIELD,
  type ContactInput,
  type ContactState,
} from "@/lib/contact-schema";
import { supabase, supabaseAdmin } from "@/lib/supabase";

// Límite sencillo por IP: 3 envíos por minuto (como el antiguo /api/contacto)
const ipMap = new Map<string, { count: number; reset: number }>();
function allowed(ip: string) {
  const now = Date.now();
  const entry = ipMap.get(ip);
  if (!entry || entry.reset < now) {
    ipMap.set(ip, { count: 1, reset: now + 60_000 });
    return true;
  }
  if (entry.count >= 3) return false;
  entry.count++;
  return true;
}

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: fingimos éxito para no dar pistas al bot
  if (String(formData.get(HONEYPOT_FIELD) ?? "") !== "") redirect("/gracias");

  const raw = formDataToObject(formData);
  const values = { ...raw, privacidad: raw.privacidad ?? "" };
  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) return { errors: flattenErrors(parsed.error), values };

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0].trim() ?? "local";
  if (!allowed(ip)) {
    return { values, message: "Has enviado varios mensajes seguidos. Espera un minuto y vuelve a intentarlo." };
  }

  try {
    await saveLead(parsed.data);
  } catch (err) {
    console.error("[contacto] Error al guardar el lead:", err);
    return {
      values,
      message: `No hemos podido enviar tu mensaje. Inténtalo de nuevo o escríbenos a ${site.email}.`,
    };
  }

  // El lead ya está guardado: si el aviso por correo falla, no se lo hacemos notar a la persona
  await notify(parsed.data).catch((err) => console.error("[contacto] Error al enviar el aviso:", err));

  redirect("/gracias");
}

function serviceName(data: ContactInput) {
  return services.find((s) => s.area === data.area)?.name ?? "Todavía no lo sé";
}

/** Guarda el lead en la tabla `contacts` del CRM (visible en /panel/leads). */
async function saveLead(data: ContactInput) {
  const db = supabaseAdmin ?? supabase;
  if (!db) {
    if (process.env.NODE_ENV === "production") throw new Error("Supabase no está configurado");
    console.info("[contacto] Supabase sin configurar. Lead que se habría guardado:", data);
    return;
  }
  const { error } = await db.from("contacts").insert({
    name: data.nombre,
    email: data.email,
    phone: data.telefono || null,
    service: serviceName(data),
    // La tabla no tiene columna para el negocio: va al principio del mensaje
    message: `Negocio: ${data.negocio}\n\n${data.mensaje}`,
    lead_status: "nuevo",
  });
  if (error) throw new Error(error.message);
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");

/** Aviso por correo al equipo con el lead y un enlace al panel. */
async function notify(data: ContactInput) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const to = process.env.ADMIN_EMAIL || site.email;
  const from = process.env.CONTACT_FROM_EMAIL || "struct9 <noreply@struct9design.com>";
  const service = serviceName(data);
  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 0;color:#5B6675;width:110px">${label}</td><td style="color:#1A1F26">${value}</td></tr>`;

  const { error } = await new Resend(apiKey).emails.send({
    from,
    to,
    replyTo: data.email,
    subject: `Nuevo lead: ${data.nombre} · ${data.negocio} (${service})`,
    html: `
      <div style="font-family:Inter,Arial,sans-serif;max-width:540px;padding:28px;background:#FFFFFF;border:1px solid #D9DEE5;border-radius:16px;color:#1A1F26">
        <p style="margin:0;font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#2F6BFF">Nuevo lead</p>
        <h2 style="margin:8px 0 18px;font-size:20px;color:#13294B">${esc(data.nombre)} · ${esc(data.negocio)}</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          ${row("Correo", `<a href="mailto:${esc(data.email)}" style="color:#2F6BFF">${esc(data.email)}</a>`)}
          ${data.telefono ? row("Teléfono", esc(data.telefono)) : ""}
          ${row("Área", esc(service))}
        </table>
        <div style="margin-top:16px;padding:14px 16px;background:#F5F7FA;border-radius:10px;font-size:14px;line-height:1.6;white-space:pre-wrap">${esc(data.mensaje)}</div>
        <a href="${site.url}/panel/leads" style="display:inline-block;margin-top:20px;background:#2F6BFF;color:#FFFFFF;padding:11px 20px;border-radius:9px;font-weight:600;text-decoration:none;font-size:14px">Ver lead en el panel →</a>
      </div>`,
    text: [
      `Nombre: ${data.nombre}`,
      `Negocio: ${data.negocio}`,
      `Correo: ${data.email}`,
      `Teléfono: ${data.telefono || "—"}`,
      `Área: ${service}`,
      "",
      data.mensaje,
      "",
      `${site.url}/panel/leads`,
    ].join("\n"),
  });
  if (error) throw new Error(error.message);
}
