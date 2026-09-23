import { services, type ServiceArea } from "./services";

export type ContactArea = ServiceArea | "nolose";

/** Opciones del select "¿Qué te interesa?". */
export const areaOptions: { value: ContactArea; label: string }[] = [
  { value: "presencia", label: "Presencia digital: web y captación" },
  { value: "automatizacion", label: "Automatización: WhatsApp, reservas, CRM" },
  { value: "diagnostico", label: "Diagnóstico: oportunidades y seguridad" },
  { value: "contenido", label: "Contenido visual: vídeos a partir de fotos" },
  { value: "nolose", label: "Todavía no lo sé, necesito orientación" },
];

export const defaultPlaceholder = "A qué te dedicas, qué te gustaría mejorar y en qué plazo.";

/** Acepta tanto el valor del select ("presencia") como el slug del servicio ("presencia-digital"). */
export function normalizeArea(value: string | string[] | undefined): ContactArea {
  const v = Array.isArray(value) ? value[0] : value;
  if (!v) return "nolose";
  if (areaOptions.some((o) => o.value === v)) return v as ContactArea;
  return services.find((s) => s.slug === v)?.area ?? "nolose";
}

/** Textos de "Qué pasa después" en la página de contacto. */
export const contactSteps = [
  { t: "Te respondemos", d: "En menos de 24 horas laborables, por correo o teléfono." },
  { t: "Hablamos 30 minutos", d: "Para entender tu negocio y lo que te está frenando." },
  { t: "Recibes tu presupuesto", d: "Cerrado y por escrito: alcance, plazos y precio." },
];
