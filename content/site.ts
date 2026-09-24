/**
 * Datos del sitio y del titular. Se editan solo aquí.
 *
 * Los campos vacíos no se muestran en la web: si falta el teléfono,
 * desaparece la línea "Teléfono"; si falta el DNI, desaparece del aviso legal.
 */
export const site = {
  name: "struct9",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://struct9design.com").replace(/\/$/, ""),
  tagline: "Del caos al sistema. Digitalización con orden para negocios que quieren crecer.",
  locale: "es_ES",

  // Datos del titular (provisionales hasta dar de alta la actividad)
  titular: "",
  dni: "",
  domicilio: "",
  email: "hola@struct9design.com",
  telefono: "+34 644 32 66 25", // formato visible; el enlace tel: se genera solo
  /** Número con WhatsApp. Si se deja vacío, desaparecen todos los botones de WhatsApp. */
  whatsapp: "+34 644 32 66 25",
  /** Mensaje con el que se abre la conversación. */
  whatsappMensaje: "Hola, vengo de la web de struct9 y me gustaría información.",

  horario: "lunes a viernes, de 9:00 a 18:00",

  /** Muestra el recuadro "Documento provisional" en las páginas legales. */
  documentoProvisional: false,

  /** Fecha de la última revisión de los textos legales. */
  legalActualizado: "23 de septiembre de 2026",
} as const;

/** Convierte "+34 600 000 000" en "tel:+34600000000". */
export function telHref(tel: string) {
  return `tel:${tel.replace(/[^\d+]/g, "")}`;
}

/** Enlace que abre una conversación de WhatsApp con el mensaje inicial ya escrito. */
export function waHref(text: string = site.whatsappMensaje) {
  return `https://wa.me/${site.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
}

/**
 * Herramientas de medición. Cada una se activa solo si tiene su ID en las variables de entorno,
 * y solo se carga después de que la persona la acepte en el aviso de cookies.
 */
export const tracking = {
  /** Google Analytics 4 (categoría "Análisis"), p. ej. "G-XXXXXXX". */
  gaId: process.env.NEXT_PUBLIC_GA_ID || "",
  /** Píxel de Meta (categoría "Publicidad"), p. ej. "123456789012345". */
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || "",
};
export const gaEnabled = tracking.gaId !== "";
export const metaEnabled = tracking.metaPixelId !== "";
/** Si no hay ninguna herramienta, no hay cookies que pedir y el aviso no se muestra. */
export const consentRequired = gaEnabled || metaEnabled;
