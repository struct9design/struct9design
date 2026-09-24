import type { Metadata } from "next";
import type { Faq } from "@/content/faqs";
import { site } from "@/content/site";

const defaultOgImage = [{ url: "/opengraph-image", width: 1200, height: 630, alt: "struct9 · Del caos al sistema" }];

/** Metadata de página con canonical y Open Graph coherentes. */
export function pageMetadata({
  title,
  description,
  path,
  noindex = false,
  ownImage = false,
}: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  /** La página tiene su propio opengraph-image (servicios, artículos). */
  ownImage?: boolean;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    // Al definir openGraph se pierde la imagen del layout, así que se vuelve a poner la general
    // salvo en las páginas que tienen la suya.
    openGraph: { title: `${title} · struct9`, description, url: path, ...(!ownImage && { images: defaultOgImage }) },
    ...(noindex && { robots: { index: false, follow: true } }),
  };
}

/** Inserta datos estructurados JSON-LD escapando "<" para evitar inyecciones. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function organizationLd() {
  return {
    "@type": "ProfessionalService",
    "@id": `${site.url}/#organizacion`,
    name: site.name,
    url: site.url,
    logo: `${site.url}/logo.svg`,
    description: site.tagline,
    areaServed: "ES",
    knowsLanguage: "es",
    ...(site.email ? { email: site.email } : {}),
    ...(site.telefono ? { telephone: site.telefono } : {}),
  };
}

export function faqLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
