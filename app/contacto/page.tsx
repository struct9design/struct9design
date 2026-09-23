import { ContactPageForm } from "@/components/forms/ContactPageForm";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { contactSteps } from "@/content/contact";
import { site, telHref } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

const intro =
  "Sin compromiso y sin tecnicismos. Dos líneas nos bastan para darte una primera orientación y decirte con honestidad si podemos ayudarte.";

export const metadata = pageMetadata({
  title: "Contacto",
  description: `Cuéntanos tu caso y te respondemos en 24 horas. ${intro}`,
  path: "/contacto",
});

/** Aparición al cargar, con los retrasos del diseño. */
const up = (delay: number) => ({ style: { animationDelay: `${delay}ms` } });

// Sobre fondo nieve el azul señal no llega a AA en texto pequeño: enlaces en tinta subrayados en señal
const link = "font-semibold !text-tinta underline decoration-senal underline-offset-4 hover:decoration-tinta";

export default function ContactoPage() {
  return (
    <>
      <Header
        nav={[
          { href: "/", label: "Inicio" },
          { href: "/servicios", label: "Servicios" },
          { href: "/contacto", label: "Contacto" },
        ]}
        navAlways
      />

      <main id="top" className="gutter bg-nieve pt-[clamp(48px,7vw,92px)] pb-[clamp(64px,8vw,104px)]">
        <div className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-start gap-[clamp(36px,5vw,72px)]">
          <div>
            <div {...up(0)} className="animate-s9-up">
              <Eyebrow tone="tinta">Contacto</Eyebrow>
            </div>
            <h1
              {...up(100)}
              className="animate-s9-up mt-4 font-display text-[clamp(2.1rem,4.8vw,3.4rem)] leading-[1.06] font-extrabold tracking-[-.03em] text-pretty text-tinta"
            >
              Cuéntanos tu caso. Te respondemos en 24 horas.
            </h1>
            <p
              {...up(200)}
              className="animate-s9-up mt-[18px] max-w-[48ch] text-[clamp(1.02rem,1.4vw,1.15rem)] leading-[1.65] text-pizarra"
            >
              {intro}
            </p>

            <section {...up(300)} aria-labelledby="despues" className="animate-s9-up mt-[38px]">
              <h2
                id="despues"
                className="font-display text-[12.5px] font-bold tracking-[.12em] text-tinta uppercase"
              >
                Qué pasa después
              </h2>
              <div className="relative mt-5 pl-9">
                <span
                  aria-hidden="true"
                  className="animate-s9-grow absolute top-2 bottom-2 left-1.5 w-px origin-top bg-senal opacity-40"
                />
                <ol className="grid gap-[22px]">
                  {contactSteps.map((s) => (
                    <li key={s.t} className="relative">
                      <span
                        aria-hidden="true"
                        className="absolute top-1 -left-9 size-[13px] rounded-full bg-senal shadow-[0_0_0_5px_var(--color-nieve)]"
                      />
                      <p className="font-display font-bold text-tinta">{s.t}</p>
                      <p className="mt-1 text-[15px] leading-[1.6] text-pizarra">{s.d}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </section>

            <div {...up(400)} className="animate-s9-up mt-[38px] grid gap-2.5 border-t border-niebla pt-6 text-[15px] text-pizarra">
              <p>
                Correo:{" "}
                <a href={`mailto:${site.email}`} className={link}>
                  {site.email}
                </a>
              </p>
              {site.telefono && (
                <p>
                  Teléfono:{" "}
                  <a href={telHref(site.telefono)} className={link}>
                    {site.telefono}
                  </a>
                </p>
              )}
              {site.horario && <p>Horario: {site.horario}</p>}
            </div>
          </div>

          <div {...up(200)} className="animate-s9-up">
            <ContactPageForm />
          </div>
        </div>
      </main>

      <Footer variant="compact" />
    </>
  );
}
