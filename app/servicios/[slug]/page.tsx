import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { ServiceTabs } from "@/components/layout/ServiceTabs";
import { NodeLine, NodeTick } from "@/components/motif/NodeLine";
import { ProcessTimelineVertical } from "@/components/motif/ProcessTimeline";
import { ContactCta } from "@/components/sections/ContactCta";
import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Eyebrow, Pill } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SwipeRow } from "@/components/ui/SwipeRow";
import { commitments, getService, services } from "@/content/services";
import { site } from "@/content/site";
import { faqLd, JsonLd, organizationLd, pageMetadata } from "@/lib/seo";
import { WhatsAppFloat } from "@/components/ui/WhatsAppLink";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/servicios/[slug]">): Promise<Metadata> {
  const s = getService((await params).slug);
  if (!s) return {};
  return pageMetadata({
    title: s.name,
    description: s.metaDescription ?? s.sub,
    path: `/servicios/${s.slug}`,
    ownImage: true,
  });
}

/** Aparición inmediata (sin esperar a JS) para la primera pantalla. */
const up = (delay: number) => ({ className: "animate-s9-up", style: { animationDelay: `${delay}ms` } });

const grid3 = "grid grid-cols-1 min-[900px]:grid-cols-3";
const grid4 = "grid grid-cols-2 min-[1000px]:grid-cols-4";

export default async function ServicePage({ params }: PageProps<"/servicios/[slug]">) {
  const s = getService((await params).slug);
  if (!s) notFound();

  const others = services.filter((x) => x.slug !== s.slug);
  const url = `${site.url}/servicios/${s.slug}`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: s.name,
          serviceType: s.name,
          description: s.sub,
          url,
          areaServed: "ES",
          provider: organizationLd(),
        }}
      />
      <JsonLd data={faqLd(s.faqs)} />

      <Header
        nav={[
          { href: "/", label: "Inicio" },
          { href: "/servicios", label: "Servicios" },
          { href: "/#proceso", label: "Cómo trabajamos" },
          { href: "/contacto", label: "Contacto" },
        ]}
        cta={{ href: "#contacto", label: "Pide tu presupuesto", short: "Presupuesto" }}
        menu={[
          { href: "/", label: "Inicio" },
          { href: "/#proceso", label: "Cómo trabajamos" },
          { href: "/contacto", label: "Contacto" },
        ]}
      >
        <ServiceTabs current={s.slug} tabs={services.map(({ slug, n, name }) => ({ slug, n, name }))} />
      </Header>

      <main id="top" className="overflow-clip">
        {/* Hero del servicio */}
        <section className="gutter pt-[clamp(28px,7vw,92px)] pb-[clamp(40px,7vw,96px)]">
          <div className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-center gap-[clamp(24px,5vw,72px)]">
            <div>
              <div {...up(60)}>
                <Pill pulse>
                  {s.n} · {s.name}
                </Pill>
              </div>
              <h1
                {...up(120)}
                className="animate-s9-up mt-[18px] font-display text-[clamp(2.1rem,4.8vw,3.6rem)] leading-[1.05] font-extrabold tracking-[-.03em] text-pretty text-tinta"
              >
                {s.h1}
              </h1>
              <p
                {...up(180)}
                className="animate-s9-up mt-4 max-w-[54ch] text-[clamp(1rem,1.4vw,1.18rem)] leading-[1.6] text-pizarra nav:mt-[22px] nav:leading-[1.65]"
              >
                {s.sub}
              </p>
              <div {...up(240)} className="animate-s9-up mt-7 flex flex-wrap items-center gap-3.5 nav:mt-8">
                <ButtonLink href="#contacto" className="max-nav:w-full">
                  Pide tu presupuesto
                </ButtonLink>
                <ButtonLink href="#incluye" variant="secondary" className="px-[26px] max-nav:hidden">
                  Ver qué incluye
                </ButtonLink>
                <a href="#incluye" className="mx-auto py-1 text-[15px] font-semibold nav:hidden">
                  Ver qué incluye ↓
                </a>
              </div>
              <div {...up(300)} className="animate-s9-up mt-5 text-sm text-pizarra max-nav:text-center nav:mt-6">
                <p>
                  Precio: <strong className="font-semibold text-tinta">{s.price}</strong> · Plazo:{" "}
                  <strong className="font-semibold text-tinta">{s.time}</strong>
                </p>
                <p className="mt-1.5 max-w-[60ch] text-[13px] leading-[1.55]">{s.priceNote}</p>
              </div>
            </div>

            {/* Antes / después */}
            <div {...up(160)}>
              <div className="overflow-hidden rounded-[18px] border border-niebla bg-white shadow-[0_24px_60px_rgba(19,41,75,.08)]">
                <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,210px),1fr))]">
                  <div className="bg-nieve p-[clamp(18px,2.6vw,30px)]">
                    <Eyebrow tone="tinta" className="text-[12.5px] !text-pizarra">
                      Hoy
                    </Eyebrow>
                    <ul className="mt-[18px] grid gap-4">
                      {s.before.map((b) => (
                        <li key={b} className="flex items-start gap-3 text-[14.5px] leading-[1.5] text-pizarra">
                          <span
                            aria-hidden="true"
                            className="mt-1.5 size-2 flex-none rounded-full border-[1.5px] border-pizarra"
                          />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-[clamp(18px,2.6vw,30px)]">
                    <Eyebrow className="text-[12.5px]">Con struct9</Eyebrow>
                    <ul className="relative mt-[18px] grid gap-4">
                      <span
                        aria-hidden="true"
                        className="absolute top-2.5 bottom-2.5 left-[3.5px] w-px bg-senal opacity-35"
                      />
                      {s.after.map((a) => (
                        <li
                          key={a}
                          className="relative flex items-start gap-3 text-[14.5px] leading-[1.5] font-medium text-grafito"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-1.5 size-2 flex-none rounded-full bg-senal shadow-[0_0_0_3px_#fff]"
                          />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="flex items-center gap-3 border-t border-niebla px-[clamp(22px,2.6vw,30px)] py-4">
                  <NodeTick />
                  <p className="text-sm text-pizarra">
                    Lo que ganas: <strong className="text-tinta">{s.benefit}</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ¿Te suena? */}
        <section className="gutter border-y border-niebla bg-nieve py-[clamp(40px,8vw,100px)]">
          <div className="wrap">
            <Reveal className="max-w-[60ch]">
              <SectionHeading eyebrow="¿Te suena?" title={s.painTitle} size="md" tone="tinta" />
            </Reveal>
            <SwipeRow label="Situaciones habituales" className={`${grid3} mt-[clamp(24px,4vw,46px)] gap-[18px]`}>
              {s.pains.map((p, i) => (
                <Reveal key={p.t} delay={i * 80} className="flex">
                  <Card hover="border" className="flex-1 rounded-[14px] p-6 max-nav:px-5 max-nav:py-[18px]">
                    <p aria-hidden="true" className="h-5 font-display text-[2.6rem] leading-none font-extrabold text-senal/35">
                      “
                    </p>
                    <h3 className="mt-1 font-display text-[1.12rem] leading-[1.3] font-bold text-pretty text-tinta">
                      {p.t}
                    </h3>
                    <p className="mt-3 text-[15px] leading-[1.62] text-pizarra max-nav:mt-2 max-nav:leading-[1.55]">{p.d}</p>
                  </Card>
                </Reveal>
              ))}
            </SwipeRow>
          </div>
        </section>

        {/* Qué incluye */}
        <section id="incluye" className="gutter scroll-mt-[110px] py-[clamp(44px,9vw,112px)]">
          <div className="wrap">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <Reveal className="max-w-[60ch]">
                <SectionHeading eyebrow="Qué incluye" title="Todo lo que hacemos por ti, sin letra pequeña." />
              </Reveal>
              <Reveal as="p" delay={80} className="max-w-[40ch] text-[15px] leading-[1.6] text-pizarra">
                Cada punto aparece en tu presupuesto. Si algo no lo necesitas, lo quitamos y el precio baja.
              </Reveal>
            </div>
            <ul className="mt-[clamp(24px,4vw,52px)] grid grid-cols-2 gap-x-4 border-t border-niebla min-[640px]:gap-x-0 min-[1000px]:grid-cols-3">
              {s.includes.map((it, i) => (
                <Reveal
                  as="li"
                  key={it.t}
                  delay={i * 60}
                  className="border-b border-niebla pt-5 pb-5 min-[640px]:pt-7 min-[640px]:pr-7 min-[640px]:pb-[30px]"
                >
                  <NodeLine n={String(i + 1).padStart(2, "0")} lineWidth={28} nodeSize={6} />
                  <h3 className="mt-3 font-display text-[1.15rem] leading-[1.25] font-bold text-tinta max-[639px]:text-base min-[640px]:mt-4">
                    {it.t}
                  </h3>
                  <p className="mt-2.5 max-w-[42ch] text-[15px] leading-[1.64] text-pizarra max-[639px]:mt-1.5 max-[639px]:text-[13.5px] max-[639px]:leading-[1.5]">
                    {it.d}
                  </p>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* Para quién es */}
        <section className="gutter border-y border-niebla bg-nieve py-[clamp(44px,9vw,112px)]">
          <div className="wrap">
            <Reveal className="max-w-[60ch]">
              <SectionHeading eyebrow="Para quién es" title="Así funciona en negocios como el tuyo." tone="tinta" />
            </Reveal>
            <SwipeRow
              label="Ejemplos por sector"
              className="mt-[clamp(24px,4vw,46px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-[18px]"
            >
              {s.sectors.map((sc, i) => (
                <Reveal key={sc.s} delay={i * 70} className="flex">
                  <Card as="article" hover="lift-sm" className="flex-1 rounded-2xl p-[clamp(18px,2.6vw,30px)]">
                    <h3 className="font-display text-[1.15rem] font-bold text-tinta">{sc.s}</h3>
                    <dl className="mt-4 grid grid-cols-[auto_1fr] items-start gap-x-3.5 gap-y-2.5">
                      <dt className="pt-0.5 text-xs font-semibold tracking-[.06em] text-pizarra uppercase">Antes</dt>
                      <dd className="text-[15px] leading-[1.55] text-pizarra">{sc.a}</dd>
                      <dt className="pt-0.5 text-xs font-semibold tracking-[.06em] text-senal uppercase">Ahora</dt>
                      <dd className="text-[15px] leading-[1.55] font-medium text-grafito">{sc.b}</dd>
                    </dl>
                  </Card>
                </Reveal>
              ))}
            </SwipeRow>
            <Reveal as="p" className="mt-[26px] text-[15px] text-pizarra max-nav:mt-5">
              ¿Tu sector no aparece?{" "}
              <a
                href="#contacto"
                className="font-semibold !text-tinta underline decoration-senal underline-offset-4 hover:decoration-tinta"
              >
                Cuéntanos tu caso
              </a>{" "}
              y te decimos con honestidad si encaja.
            </Reveal>
          </div>
        </section>

        {/* Qué cambia */}
        <section className="gutter py-[clamp(44px,9vw,112px)]">
          <div className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] items-start gap-[clamp(24px,5vw,72px)]">
            <Reveal className="min-[760px]:sticky min-[760px]:top-[130px]">
              <SectionHeading
                eyebrow="Qué cambia en tu negocio"
                title="No vendemos tecnología. Vendemos lo que consigues con ella."
              />
            </Reveal>
            <ol className="grid">
              {s.outcomes.map((o, i) => (
                <Reveal
                  as="li"
                  key={o.t}
                  delay={i * 90}
                  className="grid grid-cols-[32px_1fr] gap-3 border-t border-niebla py-5 nav:grid-cols-[44px_1fr] nav:gap-[18px] nav:py-[26px]"
                >
                  <span className="pt-1.5 font-display text-sm font-extrabold text-senal">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-[clamp(1.3rem,2.2vw,1.7rem)] leading-[1.2] font-extrabold tracking-[-.015em] text-tinta">
                      {o.t}
                    </h3>
                    <p className="mt-2.5 max-w-[52ch] text-[15.5px] leading-[1.65] text-pizarra">{o.d}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* Paso a paso */}
        <section className="gutter border-y border-niebla bg-nieve py-[clamp(44px,9vw,112px)]">
          <div className="wrap">
            <Reveal className="max-w-[60ch]">
              <SectionHeading
                eyebrow="Paso a paso"
                title="Sabes qué pasa cada semana, desde el primer día."
                tone="tinta"
              />
            </Reveal>
            <div className="mt-[clamp(24px,4.5vw,56px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] items-start gap-[clamp(24px,5vw,64px)]">
              <ProcessTimelineVertical steps={s.steps} />
              <div className="grid gap-[18px]">
                <Reveal delay={100}>
                  <Card className="rounded-2xl p-[clamp(18px,2.6vw,30px)]">
                    <Eyebrow className="text-[12.5px] !text-pizarra">Lo que te pedimos</Eyebrow>
                    <ul className="mt-4 grid gap-3">
                      {s.need.map((n) => (
                        <li key={n} className="flex gap-3 text-[15px] leading-[1.55] text-grafito">
                          <span
                            aria-hidden="true"
                            className="mt-[7px] size-[7px] flex-none rounded-full border-[1.5px] border-tinta"
                          />
                          {n}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </Reveal>
                <Reveal delay={180}>
                  <div className="rounded-2xl border border-senal bg-white p-[clamp(18px,2.6vw,30px)] shadow-[0_16px_40px_rgba(47,107,255,.08)]">
                    <Eyebrow className="text-[12.5px]">Lo que recibes</Eyebrow>
                    <ul className="mt-4 grid gap-3">
                      {s.get.map((g) => (
                        <li key={g} className="flex gap-3 text-[15px] leading-[1.55] font-medium text-grafito">
                          <span aria-hidden="true" className="mt-[7px] size-[7px] flex-none rounded-full bg-senal" />
                          {g}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
                <Reveal as="p" className="mt-1 text-[13.5px] leading-[1.55] text-pizarra">
                  Los plazos son orientativos. En tu presupuesto verás las fechas concretas de cada fase.
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* Nuestros compromisos */}
        <section className="gutter py-[clamp(40px,8vw,100px)]">
          <div className="wrap">
            <Reveal className="max-w-[60ch]">
              <SectionHeading
                eyebrow="Nuestros compromisos"
                title="Lo que nos exigimos en cada proyecto."
                titleClassName="text-[clamp(1.7rem,3.2vw,2.4rem)]"
              />
            </Reveal>
            <div className={`${grid4} mt-[clamp(24px,4vw,44px)] gap-x-4 gap-y-6 nav:gap-[18px]`}>
              {commitments.map((c, i) => (
                <Reveal key={c.t} delay={i * 80} className="border-t-2 border-tinta pt-4 nav:pt-5">
                  <h3 className="font-display text-[1.08rem] leading-[1.25] font-bold text-tinta max-nav:text-base">{c.t}</h3>
                  <p className="mt-2.5 text-[14.5px] leading-[1.62] text-pizarra max-nav:mt-1.5 max-nav:text-[13.5px] max-nav:leading-[1.5]">
                    {c.d}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Preguntas frecuentes */}
        <section id="faq" className="gutter scroll-mt-[110px] border-y border-niebla bg-nieve py-[clamp(44px,9vw,112px)]">
          <div className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] items-start gap-[clamp(24px,5vw,64px)]">
            <Reveal>
              <SectionHeading
                eyebrow="Preguntas frecuentes"
                title="Por si todavía te queda alguna duda."
                intro="Y si no está aquí, pregúntanos. Te respondemos en menos de 24 horas laborables."
                tone="tinta"
                titleClassName="text-[clamp(1.8rem,3.4vw,2.5rem)]"
              />
              <ButtonLink href="#contacto" variant="secondary-light" size="sm" className="mt-6">
                Hacer una pregunta
              </ButtonLink>
            </Reveal>
            <Reveal delay={100}>
              <Accordion key={s.slug} items={s.faqs} />
            </Reveal>
          </div>
        </section>

        {/* Otros servicios */}
        <section className="gutter py-[clamp(40px,8vw,100px)]">
          <div className="wrap">
            <Reveal className="max-w-[56ch]">
              <Eyebrow>Todo encaja</Eyebrow>
              <h2 className="mt-3 font-display text-[clamp(1.6rem,3vw,2.2rem)] leading-[1.15] font-extrabold tracking-[-.02em] text-pretty text-tinta">
                Combínalo con otras áreas y el sistema trabaja completo.
              </h2>
            </Reveal>
            <div className={`${grid3} mt-[clamp(20px,3.5vw,40px)] gap-2.5 nav:gap-[18px]`}>
              {others.map((ot, i) => (
                <Reveal key={ot.slug} delay={i * 80} className="flex">
                  <Card
                    as={Link}
                    href={`/servicios/${ot.slug}`}
                    hover="lift-sm"
                    className="flex flex-1 flex-col gap-2.5 rounded-2xl p-6 max-nav:flex-row max-nav:items-center max-nav:gap-3 max-nav:rounded-xl max-nav:px-[18px] max-nav:py-4"
                  >
                    <NodeLine n={ot.n} fill nodeSize={7} gap={10} className="max-nav:hidden" />
                    <span className="font-display text-xs font-bold text-senal nav:hidden">{ot.n}</span>
                    <span className="font-display text-[1.15rem] font-bold text-tinta max-nav:flex-1 max-nav:text-base">
                      {ot.name}
                    </span>
                    <span className="text-[14.5px] leading-[1.6] text-pizarra max-nav:hidden">{ot.teaser}</span>
                    <span className="mt-1.5 text-sm font-semibold text-senal max-nav:mt-0">
                      <span className="max-nav:hidden">Ver servicio </span>→
                    </span>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <ContactCta
          key={s.slug}
          title={s.ctaTitle}
          intro="Cuéntanos tu situación en dos líneas. En menos de 24 horas laborables te respondemos con una primera orientación y, si encaja, preparamos tu presupuesto cerrado."
          defaultArea={s.area}
          placeholder={s.placeholder}
          minCol={320}
        >
          <ul className="mt-[30px] grid gap-3">
            {[
              "Sin compromiso y sin llamadas comerciales insistentes",
              "Precio cerrado por escrito antes de empezar",
              "Te hablamos claro: si no te conviene, te lo decimos",
            ].map((t) => (
              <li key={t} className="flex gap-3 text-[15px] text-white">
                <span aria-hidden="true" className="mt-[7px] size-[7px] flex-none rounded-full bg-senal" />
                {t}
              </li>
            ))}
          </ul>
        </ContactCta>
      </main>

      <MobileActionBar />

      <WhatsAppFloat />
      <Footer
        agency={[
          { href: "/", label: "Inicio" },
          { href: "/#proceso", label: "Cómo trabajamos" },
          { href: "/blog", label: "Blog" },
          { href: "/contacto", label: "Contacto" },
        ]}
      />
    </>
  );
}
