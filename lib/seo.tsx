import type { Metadata } from "next";
import type { Faq } from "@/content/faqs";
import { site } from "@/content/site";

/** Metadata de página con canonical y Open Graph coherentes. */
export function pageMetadata({
  title,
  description,
  path,
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${title} · struct9`, description, url: path },
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
