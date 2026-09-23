import type { Metadata } from "next";
import Link from "next/link";
import { HeroCircuit } from "@/components/hero/HeroCircuit";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { NodeLine } from "@/components/motif/NodeLine";
import { ProcessTimelineHorizontal } from "@/components/motif/ProcessTimeline";
import { ContactCta } from "@/components/sections/ContactCta";
import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { homeFaqs } from "@/content/faqs";
import { cta, faqIntro, hero, problem, process, servicesIntro } from "@/content/home";
import { services } from "@/content/services";
import { site, telHref } from "@/content/site";
import { faqLd, JsonLd, organizationLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "struct9 · Del caos al sistema" },
  description: hero.sub,
  alternates: { canonical: "/" },
};

/** Aparición inmediata (sin esperar a JS) para lo que está en la primera pantalla. */
const up = (delay: number) => ({ style: { animationDelay: `${delay}ms` } });

const ctaLink =
  "border-b border-senal/80 !text-white transition-[border-color] duration-[250ms] hover:border-white";

export default function Home() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          ...organizationLd(),
          makesOffer: services.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s.name, url: `${site.url}/servicios/${s.slug}` },
          })),
        }}
      />
      <JsonLd data={faqLd(homeFaqs)} />

      <Header
        nav={[
          { href: "/servicios", label: "Servicios" },
          { href: "/#proceso", label: "Cómo trabajamos" },
          { href: "/#faq", label: "Preguntas" },
          { href: "/contacto", label: "Contacto" },
        ]}
        cta={{ href: "/#contacto", label: "Pide tu presupuesto", short: "Presupuesto" }}
        menu={[
          { href: "/#servicios", label: "Servicios" },
          { href: "/#proceso", label: "Cómo trabajamos" },
          { href: "/#faq", label: "Preguntas frecuentes" },
          { href: "/contacto", label: "Contacto" },
        ]}
      />

      <main id="top" className="overflow-hidden">
        {/* Hero */}
        <section className="gutter relative pt-[clamp(56px,8vw,104px)] pb-[clamp(64px,8vw,110px)]">
          <div className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] items-center gap-[clamp(36px,5vw,72px)]">
            <div>
              <div {...up(0)} className="animate-s9-up">
                <Pill pulse>{hero.pill}</Pill>
              </div>
              <h1
                {...up(90)}
                className="animate-s9-up mt-[22px] font-display text-[clamp(2.2rem,5.2vw,3.9rem)] leading-[1.04] font-extrabold tracking-[-.03em] text-pretty text-tinta"
              >
                {hero.h1}
              </h1>
              <p
                {...up(180)}
                className="animate-s9-up mt-[22px] max-w-[52ch] text-[clamp(1.02rem,1.4vw,1.2rem)] leading-[1.65] text-pizarra"
              >
                {hero.sub}
              </p>
              <div {...up(260)} className="animate-s9-up mt-[34px] flex flex-wrap gap-3.5">
                <ButtonLink href="/#contacto">{hero.primary}</ButtonLink>
                <ButtonLink href="/#servicios" variant="secondary" className="px-[26px]">
                  {hero.secondary}
                </ButtonLink>
              </div>
              <p {...up(340)} className="animate-s9-up mt-[26px] text-sm text-pizarra">
                {hero.note}
              </p>
            </div>
            <div {...up(200)} className="animate-s9-up relative">
              <HeroCircuit />
            </div>
          </div>
        </section>

        {/* El punto de partida */}
        <section className="gutter border-y border-niebla bg-nieve py-[clamp(60px,8vw,104px)]">
          <div className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(100%,290px),1fr))] items-start gap-[clamp(32px,5vw,64px)]">
            <Reveal>
              <SectionHeading eyebrow={problem.eyebrow} title={problem.title} size="md" tone="tinta" />
              <p className="mt-[18px] max-w-[46ch] text-[1.02rem] leading-[1.68] text-pizarra">{problem.intro}</p>
            </Reveal>
            <ul className="grid gap-3.5">
              {problem.items.map((item, i) => (
                <Reveal as="li" key={item.t} delay={60 * (i + 1)}>
                  <Card hover="border" className="flex items-start gap-4 rounded-xl px-[22px] py-5">
                    <span aria-hidden="true" className="mt-[7px] size-[9px] flex-none rounded-full bg-niebla" />
                    <p className="text-[15.5px] leading-[1.6] text-grafito">
                      <strong className="text-tinta">{item.t}</strong> {item.d}
                    </p>
                  </Card>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* Servicios */}
        <section id="servicios" className="gutter scroll-mt-20 py-[clamp(64px,9vw,112px)]">
          <div className="wrap">
            <Reveal className="max-w-[62ch]">
              <SectionHeading {...servicesIntro} />
            </Reveal>
            <div className="mt-[clamp(34px,4vw,54px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-5">
              {services.map((s, i) => (
                <Reveal key={s.slug} delay={[60, 130, 200, 270][i]} className="flex">
                  <Card
                    as="article"
                    hover="lift"
                    className="flex flex-1 flex-col rounded-2xl p-[clamp(24px,2.6vw,32px)]"
                  >
                    <NodeLine n={s.n} fill />
                    <h3 className="mt-5 font-display text-[1.32rem] font-bold tracking-[-.01em] text-tinta">
                      {s.name}
                      {s.brand && <span className="text-[.78em] font-semibold text-pizarra"> {s.brand}</span>}
                    </h3>
                    <p className="mt-3 text-[15.5px] leading-[1.65] text-pizarra">{s.home.summary}</p>
                    <ul className="mt-5 grid gap-[9px]">
                      {s.home.bullets.map((b) => (
                        <li key={b} className="flex gap-2.5 text-[14.5px] text-grafito">
                          <span aria-hidden="true" className="text-senal">
                            ·
                          </span>
                          {b}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-[22px]">
                      <p className="text-[13.5px] font-semibold text-tinta">Beneficio: {s.home.homeBenefit}</p>
                      <Link
                        href={`/servicios/${s.slug}`}
                        aria-label={`Ver servicio: ${s.name}`}
                        className="text-sm font-semibold"
                      >
                        Ver servicio →
                      </Link>
                    </div>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Cómo trabajamos */}
        <section id="proceso" className="gutter scroll-mt-20 border-y border-niebla bg-nieve py-[clamp(64px,9vw,112px)]">
          <div className="wrap">
            <Reveal className="max-w-[58ch]">
              <SectionHeading eyebrow={process.eyebrow} title={process.title} intro={process.intro} tone="tinta" />
            </Reveal>
            <div className="mt-[clamp(38px,4.5vw,60px)]">
              <ProcessTimelineHorizontal steps={process.steps} />
            </div>
          </div>
        </section>

        {/* Preguntas frecuentes */}
        <section id="faq" className="gutter scroll-mt-20 py-[clamp(64px,9vw,112px)]">
          <div className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] items-start gap-[clamp(32px,5vw,64px)]">
            <Reveal>
              <SectionHeading
                eyebrow={faqIntro.eyebrow}
                title={faqIntro.title}
                intro={faqIntro.intro}
                titleClassName="text-[clamp(1.8rem,3.4vw,2.5rem)]"
              />
            </Reveal>
            <Reveal delay={100}>
              <Accordion items={homeFaqs} />
            </Reveal>
          </div>
        </section>

        <ContactCta title={cta.title} intro={cta.intro}>
          <div className="mt-8 grid gap-3 text-[15px] text-niebla">
            {site.telefono && (
              <p>
                Prefieres hablar:{" "}
                <a href={telHref(site.telefono)} className={ctaLink}>
                  {site.telefono}
                </a>
              </p>
            )}
            <p>
              Escribir:{" "}
              <a href={`mailto:${site.email}`} className={ctaLink}>
                {site.email}
              </a>
            </p>
          </div>
        </ContactCta>
      </main>

      <Footer
          agency={[
            { href: "/#proceso", label: "Cómo trabajamos" },
            { href: "/#faq", label: "Preguntas frecuentes" },
          { href: "/blog", label: "Blog" },
          { href: "/contacto", label: "Contacto" },
        ]}
      />
    </>
  );
}
