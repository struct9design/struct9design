"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { normalizeArea } from "@/content/contact";
import { services } from "@/content/services";
import { ContactForm } from "./ContactForm";

/**
 * Formulario de /contacto. Lee `?area=` (acepta "presencia" o "presencia-digital")
 * en el cliente para que la página siga siendo estática.
 */
export function ContactPageForm() {
  return (
    <Suspense fallback={<ContactForm variant="page" />}>
      <WithArea />
    </Suspense>
  );
}

function WithArea() {
  const area = normalizeArea(useSearchParams().get("area") ?? undefined);
  const placeholder = services.find((s) => s.area === area)?.placeholder;
  return <ContactForm key={area} variant="page" defaultArea={area} placeholder={placeholder} />;
}
