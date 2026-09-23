import { z } from "zod";
import { areaOptions, type ContactArea } from "@/content/contact";

/** Campo trampa: los humanos no lo ven; si llega relleno, es un bot. */
export const HONEYPOT_FIELD = "website";

const areas = areaOptions.map((o) => o.value) as [ContactArea, ...ContactArea[]];

/** Validación compartida por el formulario (cliente) y la Server Action (servidor). */
export const contactSchema = z.object({
  nombre: z.string().trim().min(2, { error: "Escribe tu nombre y apellidos." }).max(120),
  negocio: z.string().trim().min(2, { error: "Escribe el nombre de tu negocio." }).max(160),
  email: z.email({ error: "Escribe un correo válido, por ejemplo maria@tunegocio.es." }).max(200),
  telefono: z
    .string()
    .trim()
    .max(30)
    .refine((v) => v === "" || /^[+\d][\d\s().-]{6,}$/.test(v), { error: "Revisa el teléfono o déjalo en blanco." }),
  area: z.enum(areas, { error: "Elige una opción." }),
  mensaje: z
    .string()
    .trim()
    .min(10, { error: "Cuéntanos un poco más (mínimo 10 caracteres)." })
    .max(4000, { error: "El mensaje es demasiado largo." }),
  privacidad: z.literal("on", { error: "Necesitamos que aceptes la política de privacidad." }),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = keyof ContactInput;
export type ContactErrors = Partial<Record<ContactField, string>>;

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

export function flattenErrors(error: z.ZodError): ContactErrors {
  const out: ContactErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as ContactField;
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}
