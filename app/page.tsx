import type { Metadata } from "next";
import Link from "next/link";
import { HeroCircuit } from "@/components/hero/HeroCircuit";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { ProcessTimelineHorizontal } from "@/components/motif/ProcessTimeline";
import { ContactCta } from "@/components/sections/ContactCta";
import { ServiceCards } from "@/components/sections/ServiceCards";
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
import { WhatsAppFloat, WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { faqLd, JsonLd, organizationLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Diseño web y automatización para negocios · struct9" },
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
          { href: "/servicios", label: "Servicios" },
          { href: "/#proceso", label: "Cómo trabajamos" },
          { href: "/#faq", label: "Preguntas frecuentes" },
          { href: "/contacto", label: "Contacto" },
        ]}
      />

      <main id="top" className="overflow-hidden">
        {/* Hero */}
        <section className="gutter relative pt-[clamp(28px,8vw,104px)] pb-[clamp(44px,8vw,110px)]">
          <div className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] items-center gap-[clamp(24px,5vw,72px)]">
            <div>
              <div {...up(0)} className="animate-s9-up">
                <Pill pulse>{hero.pill}</Pill>
              </div>
              <h1
                {...up(90)}
                className="animate-s9-up mt-[18px] nav:mt-[22px] font-display text-[clamp(2.2rem,5.2vw,3.9rem)] leading-[1.04] font-extrabold tracking-[-.03em] text-pretty text-tinta"
              >
                {hero.h1}
              </h1>
              <p
                {...up(180)}
                className="animate-s9-up mt-4 max-w-[52ch] text-[clamp(1rem,1.4vw,1.2rem)] leading-[1.6] text-pizarra nav:mt-[22px] nav:leading-[1.65]"
              >
                {hero.sub}
              </p>
              <div
                {...up(260)}
                className="animate-s9-up mt-7 flex flex-wrap items-center gap-3.5 max-nav:gap-x-5 nav:mt-[34px]"
              >
                <ButtonLink href="/#contacto" className="max-nav:w-full">
                  {hero.primary}
                </ButtonLink>
                <ButtonLink href="/#servicios" variant="secondary" className="px-[26px] max-nav:hidden">
                  {hero.secondary}
                </ButtonLink>
                <Link href="/#servicios" className="mx-auto py-1 text-[15px] font-semibold nav:hidden">
                  {hero.secondary} ↓
                </Link>
              </div>
              <p {...up(340)} className="animate-s9-up mt-[26px] text-sm text-pizarra max-nav:hidden">
                {hero.note}
              </p>
              <ul {...up(340)} className="animate-s9-up mt-5 flex flex-wrap gap-2 nav:hidden">
                {hero.note.split(" · ").map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-niebla bg-nieve px-3 py-1.5 text-[12.5px] font-medium text-pizarra"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div {...up(200)} className="animate-s9-up relative mx-auto w-full max-nav:max-w-[340px]">
              <HeroCircuit />
            </div>
          </div>
        </section>

        {/* El punto de partida */}
        <section className="gutter border-y border-niebla bg-nieve py-[clamp(40px,8vw,104px)]">
          <div className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(100%,290px),1fr))] items-start gap-[clamp(24px,5vw,64px)]">
            <Reveal>
              <SectionHeading eyebrow={problem.eyebrow} title={problem.title} size="md" tone="tinta" />
              <p className="mt-[18px] max-w-[46ch] text-[1.02rem] leading-[1.68] text-pizarra">{problem.intro}</p>
            </Reveal>
            <ul className="grid gap-3.5 max-nav:gap-0 max-nav:border-t max-nav:border-niebla">
              {problem.items.map((item, i) => (
                <Reveal as="li" key={item.t} delay={60 * (i + 1)}>
                  <Card
                    hover="border"
                    className="flex items-start gap-4 rounded-xl px-[22px] py-5 max-nav:gap-3 max-nav:rounded-none max-nav:border-0 max-nav:border-b max-nav:bg-transparent max-nav:px-0 max-nav:py-4 max-nav:hover:shadow-none"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[7px] size-[9px] flex-none rounded-full bg-niebla max-nav:size-2 max-nav:bg-senal"
                    />
                    <p className="text-[15.5px] leading-[1.6] text-grafito max-nav:text-[15px] max-nav:leading-[1.55]">
                      <strong className="text-tinta">{item.t}</strong> {item.d}
                    </p>
                  </Card>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* Servicios */}
        <section id="servicios" className="gutter scroll-mt-20 py-[clamp(44px,9vw,112px)]">
          <div className="wrap">
            <Reveal className="max-w-[62ch]">
              <SectionHeading {...servicesIntro} />
            </Reveal>
            <ServiceCards className="mt-[clamp(24px,4vw,54px)]" />
          </div>
        </section>

        {/* Cómo trabajamos */}
        <section id="proceso" className="gutter scroll-mt-20 border-y border-niebla bg-nieve py-[clamp(44px,9vw,112px)]">
          <div className="wrap">
            <Reveal className="max-w-[58ch]">
              <SectionHeading eyebrow={process.eyebrow} title={process.title} intro={process.intro} tone="tinta" />
            </Reveal>
            <div className="mt-[clamp(24px,4.5vw,60px)]">
              <ProcessTimelineHorizontal steps={process.steps} />
            </div>
          </div>
        </section>

        {/* Preguntas frecuentes */}
        <section id="faq" className="gutter scroll-mt-20 py-[clamp(44px,9vw,112px)]">
          <div className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] items-start gap-[clamp(24px,5vw,64px)]">
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
            {site.whatsapp && (
              <p>
                Por WhatsApp:{" "}
                <WhatsAppLink className={ctaLink}>{site.whatsapp}</WhatsAppLink>
              </p>
            )}
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

      <MobileActionBar />

      <WhatsAppFloat />
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
