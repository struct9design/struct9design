import { Footer } from "@/components/layout/Footer";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ServiceCards } from "@/components/sections/ServiceCards";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { WhatsAppFloat } from "@/components/ui/WhatsAppLink";
import { servicesIntro } from "@/content/home";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { JsonLd, organizationLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Servicios de digitalización para negocios",
  description:
    "Web, automatización, diagnóstico con IA y vídeo a partir de fotos. Empieza por un área y crece sin rehacer nada. Presupuesto cerrado y sin tecnicismos.",
  path: "/servicios",
});

const up = (delay: number) => ({ style: { animationDelay: `${delay}ms` } });

export default function Servicios() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: services.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Service",
              name: s.name,
              url: `${site.url}/servicios/${s.slug}`,
              provider: { "@id": organizationLd()["@id"] },
            },
          })),
        }}
      />
      <SiteHeader />
      <main>
        <section className="gutter border-b border-niebla bg-nieve pt-[clamp(28px,7vw,92px)] pb-[clamp(40px,5vw,64px)]">
          <div className="wrap">
            <div {...up(0)} className="animate-s9-up">
              <Eyebrow tone="tinta">{servicesIntro.eyebrow}</Eyebrow>
            </div>
            <h1
              {...up(100)}
              className="animate-s9-up mt-4 max-w-[22ch] font-display text-[clamp(2.1rem,4.8vw,3.4rem)] leading-[1.06] font-extrabold tracking-[-.03em] text-pretty text-tinta"
            >
              Servicios de digitalización para tu negocio.
            </h1>
            <p
              {...up(200)}
              className="animate-s9-up mt-[18px] max-w-[56ch] text-[clamp(1.02rem,1.4vw,1.15rem)] leading-[1.65] text-pizarra"
            >
              {servicesIntro.title} {servicesIntro.intro}
            </p>
          </div>
        </section>

        <section className="gutter py-[clamp(36px,7vw,88px)]">
          <div className="wrap">
            <ServiceCards heading="h2" />
            <div className="mt-[clamp(32px,5vw,56px)] flex flex-wrap items-center gap-x-6 gap-y-3">
              <ButtonLink href="/contacto">Pide tu presupuesto</ButtonLink>
              <p className="text-[15px] text-pizarra">¿No sabes por dónde empezar? Cuéntanos tu caso y te orientamos.</p>
            </div>
          </div>
        </section>
      </main>
      <WhatsAppFloat mobile />
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
