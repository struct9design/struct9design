import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { NodeTick } from "@/components/motif/NodeLine";
import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppFloat } from "@/components/ui/WhatsAppLink";
import { getLanding, type LandingSlug } from "@/content/landings";
import { getService } from "@/content/services";
import { site } from "@/content/site";
import { articles } from "@/lib/blog";
import { areaServedLd, faqLd, JsonLd, organizationLd, pageMetadata } from "@/lib/seo";

export function landingMetadata(slug: LandingSlug): Metadata {
  const l = getLanding(slug);
  return pageMetadata({ title: l.seoTitle, description: l.metaDescription, path: `/${l.slug}` });
}

const up = (delay: number) => ({ style: { animationDelay: `${delay}ms` } });

/** Página de aterrizaje (SEO local o de nicho) con la misma maqueta que los artículos. */
export function LandingPage({ slug }: { slug: LandingSlug }) {
  const l = getLanding(slug);
  const service = getService(l.service)!;
  const related = articles.filter((a) => l.articles.includes(a.slug));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: l.h1,
          serviceType: service.keyword,
          description: l.metaDescription,
          url: `${site.url}/${l.slug}`,
          areaServed: areaServedLd(),
          provider: organizationLd(),
        }}
      />
      <JsonLd data={faqLd(l.faqs)} />
      <SiteHeader />
      <main>
        <header className="gutter border-b border-niebla bg-nieve pt-[clamp(40px,6vw,72px)] pb-[clamp(40px,5vw,60px)]">
          <div className="mx-auto max-w-[760px]">
            <p
              {...up(0)}
              className="animate-s9-up font-display text-[13.5px] font-bold tracking-[.08em] text-tinta uppercase"
            >
              {l.eyebrow}
            </p>
            <h1
              {...up(100)}
              className="animate-s9-up mt-4 font-display text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.1] font-extrabold tracking-[-.025em] text-pretty text-tinta"
            >
              {l.h1}
            </h1>
            <p
              {...up(200)}
              className="animate-s9-up mt-5 border-l-2 border-senal pl-4 text-[clamp(1.02rem,1.4vw,1.12rem)] leading-[1.65] text-pizarra"
            >
              {l.intro}
            </p>
            <div {...up(300)} className="animate-s9-up mt-7 flex flex-wrap items-center gap-3.5">
              <ButtonLink href="/contacto" className="max-nav:w-full">
                Pide tu presupuesto
              </ButtonLink>
              <Link href={`/servicios/${service.slug}`} className="text-[15px] font-semibold !text-tinta hover:!text-senal">
                Ver el servicio de {service.keyword.toLowerCase()} →
              </Link>
            </div>
          </div>
        </header>

        <div className="gutter py-[clamp(40px,6vw,72px)]">
          <article className="mx-auto grid max-w-[760px] gap-9">
            {l.sections.map((section, i) => (
              <section key={i}>
                {section.heading && (
                  <h2 className="mb-3.5 font-display text-[clamp(1.25rem,2vw,1.5rem)] leading-[1.25] font-bold text-tinta">
                    {section.heading}
                  </h2>
                )}
                <div className="grid gap-4">
                  {section.content.split("\n\n").map((para, j) => (
                    <p key={j} className="text-[16px] leading-[1.8] whitespace-pre-line text-grafito">
                      {para}
                    </p>
                  ))}
                </div>
              </section>
            ))}

            <section>
              <h2 className="mb-5 font-display text-[clamp(1.25rem,2vw,1.5rem)] leading-[1.25] font-bold text-tinta">
                Preguntas frecuentes
              </h2>
              <Accordion items={l.faqs} />
            </section>

            <aside className="mt-6 rounded-2xl bg-tinta p-[clamp(24px,3vw,36px)] text-white">
              <div className="flex items-center gap-2.5">
                <NodeTick />
                <p className="font-display text-[12.5px] font-bold tracking-[.12em] uppercase">Presupuesto gratuito</p>
              </div>
              <h2 className="mt-3 font-display text-[clamp(1.35rem,2.4vw,1.7rem)] leading-[1.2] font-extrabold">
                {l.ctaTitle}
              </h2>
              <p className="mt-3 max-w-[52ch] text-[15px] leading-[1.65] text-niebla">
                Primera conversación sin compromiso y presupuesto cerrado por escrito, con alcance, plazo y precio.
              </p>
              <ButtonLink href="/contacto" className="mt-6">
                Pide tu presupuesto
              </ButtonLink>
            </aside>

            {related.length > 0 && (
              <nav aria-label="Artículos relacionados" className="border-t border-niebla pt-6">
                <p className="mb-3 font-display text-[12.5px] font-bold tracking-[.1em] text-tinta uppercase">
                  Del blog
                </p>
                <ul className="grid gap-2.5">
                  {related.map((a) => (
                    <li key={a.slug}>
                      <Link href={`/blog/${a.slug}`} className="text-[15px] font-semibold !text-tinta hover:!text-senal">
                        {a.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </article>
        </div>
      </main>
      <WhatsAppFloat mobile />
      <Footer
        agency={[
          { href: "/", label: "Inicio" },
          { href: "/servicios", label: "Servicios" },
          { href: "/blog", label: "Blog" },
          { href: "/contacto", label: "Contacto" },
        ]}
      />
    </>
  );
}
