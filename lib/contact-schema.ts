import { areaOptions, type ContactArea } from "@/content/contact";

/** Campo trampa: los humanos no lo ven; si llega relleno, es un bot. */
export const HONEYPOT_FIELD = "website";

export type ContactInput = {
  nombre: string;
  negocio: string;
  email: string;
  telefono: string;
  area: ContactArea;
  mensaje: string;
  privacidad: "on";
};
export type ContactField = keyof ContactInput;
export type ContactErrors = Partial<Record<ContactField, string>>;

const EMAIL = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)*\.[^\s@.]{2,}$/;
const PHONE = /^[+\d][\d\s().-]{6,}$/;

/**
 * Validación compartida por el formulario (cliente) y la Server Action (servidor).
 * Sin librerías, para no cargar en el navegador más JavaScript del necesario.
 */
export function validateContact(
  raw: ReturnType<typeof formDataToObject>,
): { success: true; data: ContactInput } | { success: false; errors: ContactErrors } {
  const data = {
    nombre: raw.nombre.trim(),
    negocio: raw.negocio.trim(),
    email: raw.email.trim(),
    telefono: raw.telefono.trim(),
    area: raw.area as ContactArea,
    mensaje: raw.mensaje.trim(),
    privacidad: "on" as const,
  };
  const errors: ContactErrors = {};
  if (data.nombre.length < 2 || data.nombre.length > 120) errors.nombre = "Escribe tu nombre y apellidos.";
  if (data.negocio.length < 2 || data.negocio.length > 160) errors.negocio = "Escribe el nombre de tu negocio.";
  if (!EMAIL.test(data.email) || data.email.length > 200)
    errors.email = "Escribe un correo válido, por ejemplo maria@tunegocio.es.";
  if (data.telefono !== "" && (!PHONE.test(data.telefono) || data.telefono.length > 30))
    errors.telefono = "Revisa el teléfono o déjalo en blanco.";
  if (!areaOptions.some((o) => o.value === data.area)) errors.area = "Elige una opción.";
  if (data.mensaje.length < 10) errors.mensaje = "Cuéntanos un poco más (mínimo 10 caracteres).";
  else if (data.mensaje.length > 4000) errors.mensaje = "El mensaje es demasiado largo.";
  if (raw.privacidad !== "on") errors.privacidad = "Necesitamos que aceptes la política de privacidad.";

  return Object.keys(errors).length ? { success: false, errors } : { success: true, data };
}

export type ContactState = {
  errors?: ContactErrors;
  /** Error general (p. ej. fallo de envío). */
  message?: string;
  /** Valores enviados, para no perderlos si hay un error en servidor. */
  values?: Partial<Record<ContactField, string>>;
};

export function formDataToObject(fd: FormData) {
  return {
    nombre: String(fd.get("nombre") ?? ""),
    negocio: String(fd.get("negocio") ?? ""),
    email: String(fd.get("email") ?? "").trim(),
    telefono: String(fd.get("telefono") ?? ""),
    area: String(fd.get("area") ?? ""),
    mensaje: String(fd.get("mensaje") ?? ""),
    privacidad: fd.get("privacidad") === "on" ? "on" : undefined,
  };
}
