"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { normalizeArea, type ContactArea } from "@/content/contact";
import { ContactForm } from "./ContactForm";

/**
 * Formulario de /contacto. Lee `?area=` (acepta "presencia" o "presencia-digital")
 * en el cliente para que la página siga siendo estática.
 */
type Placeholders = Partial<Record<ContactArea, string>>;

/** `placeholders`: texto de ejemplo del mensaje para cada área (llega del servidor). */
export function ContactPageForm({ placeholders }: { placeholders: Placeholders }) {
  return (
    <Suspense fallback={<ContactForm variant="page" />}>
      <WithArea placeholders={placeholders} />
    </Suspense>
  );
}

function WithArea({ placeholders }: { placeholders: Placeholders }) {
  const area = normalizeArea(useSearchParams().get("area") ?? undefined);
  const placeholder = placeholders[area];
  return <ContactForm key={area} variant="page" defaultArea={area} placeholder={placeholder} />;
}
