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

/** Sevilla y Andalucía en persona; el resto de España en remoto. */
export function areaServedLd() {
  return [
    { "@type": "City", name: site.ciudad },
    { "@type": "AdministrativeArea", name: site.region },
    { "@type": "Country", name: "España" },
  ];
}

export function organizationLd() {
  return {
    "@type": "ProfessionalService",
    "@id": `${site.url}/#organizacion`,
    name: site.name,
    alternateName: site.alternateNames,
    url: site.url,
    logo: `${site.url}/logo.svg`,
    description: site.tagline,
    address: { "@type": "PostalAddress", addressLocality: site.ciudad, addressRegion: site.region, addressCountry: "ES" },
    areaServed: areaServedLd(),
    knowsLanguage: "es",
    ...(site.email ? { email: site.email } : {}),
    ...(site.telefono ? { telephone: site.telefono } : {}),
  };
}

/** Nombre del sitio para Google: nombre preferido y variantes de la marca. */
export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#web`,
    name: site.name,
    alternateName: site.alternateNames,
    url: site.url,
    inLanguage: "es",
    publisher: { "@id": `${site.url}/#organizacion` },
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
