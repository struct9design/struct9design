import Link from "next/link";
import { CookieSettingsButton } from "@/components/cookies/CookieSettingsButton";
import { Footer } from "@/components/layout/Footer";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ScrollActiveTab } from "@/components/ui/ScrollActiveTab";
import { getLegalDoc, legalDocs, type LegalSlug } from "@/content/legal";
import { site } from "@/content/site";
import { renderLegalDoc } from "@/lib/legal-render";
import { cn } from "@/lib/utils";

/** Plantilla común de /aviso-legal, /privacidad y /cookies. */
export function LegalPage({ slug }: { slug: LegalSlug }) {
  const doc = getLegalDoc(slug);
  const sections = renderLegalDoc(doc);

  return (
    <>
      <SiteHeader />

      <main className="overflow-clip">
        <section className="gutter border-b border-niebla bg-nieve pt-[clamp(36px,6vw,72px)]">
          <div className="wrap">
            <Eyebrow tone="tinta">Información legal</Eyebrow>
            <h1 className="mt-3.5 font-display text-[clamp(2rem,4.2vw,3rem)] leading-[1.08] font-extrabold tracking-[-.025em] text-tinta">
              {doc.title}
            </h1>
            <p className="mt-3.5 text-[14.5px] text-pizarra">Última actualización: {site.legalActualizado}</p>
            <ScrollActiveTab
              label="Documentos legales"
              className="mt-[30px] flex gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {legalDocs.map((d) => {
                const active = d.slug === slug;
                return (
                  <Link
                    key={d.slug}
                    href={`/${d.slug}`}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex-none border-b-2 px-3.5 py-3 text-sm font-semibold whitespace-nowrap transition-colors duration-[250ms] hover:!text-tinta",
                      active ? "border-senal !text-tinta" : "border-transparent !text-pizarra",
                    )}
                  >
                    {d.label}
                  </Link>
                );
              })}
            </ScrollActiveTab>
          </div>
        </section>

        <section className="gutter pt-[clamp(40px,6vw,72px)] pb-[clamp(44px,8vw,100px)]">
          <div className="wrap grid items-start gap-[clamp(24px,5vw,72px)] min-[900px]:grid-cols-[240px_minmax(0,1fr)]">
            <aside className="sticky top-[100px] hidden min-[900px]:block">
              <p className="mb-3.5 font-display text-[12.5px] font-bold tracking-[.1em] text-tinta uppercase">
                En este documento
              </p>
              <nav aria-label="Índice" className="grid gap-0.5 border-l border-niebla">
                {sections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="-ml-px flex items-baseline gap-2.5 border-l border-transparent py-[7px] pl-4 text-sm leading-[1.4] !text-pizarra transition-[color,border-color] duration-200 hover:border-senal hover:!text-tinta"
                  >
                    <span className="font-display text-xs font-bold text-senal">{sec.n}</span>
                    {sec.title}
                  </a>
                ))}
              </nav>
            </aside>

            <article className="max-w-[70ch]">
              {site.documentoProvisional && (
                <div className="flex items-start gap-3.5 rounded-[14px] border border-niebla bg-nieve px-[22px] py-5">
                  <span aria-hidden="true" className="mt-[7px] size-[9px] flex-none rounded-full bg-senal" />
                  <div>
                    <p className="font-display font-bold text-tinta">Documento provisional</p>
                    <p className="mt-1.5 text-[14.5px] leading-[1.65] text-pizarra">
                      struct9 es un proyecto en fase de puesta en marcha que todavía no se ha constituido como empresa.
                      Mientras tanto, la persona responsable de este sitio web es la que figura como titular.
                      Actualizaremos este documento en cuanto la actividad quede dada de alta.
                    </p>
                  </div>
                </div>
              )}

              {sections.map((sec, i) => (
                <section
                  key={sec.id}
                  id={sec.id}
                  aria-labelledby={`${sec.id}-t`}
                  className={cn("scroll-mt-24", (i > 0 || site.documentoProvisional) && "pt-10")}
                >
                  <div aria-hidden="true" className="flex items-center gap-3">
                    <span className="font-display text-[13px] font-bold tracking-[.06em] text-senal">{sec.n}</span>
                    <span className="h-px w-6 bg-niebla" />
                  </div>
                  <h2
                    id={`${sec.id}-t`}
                    className="mt-3 font-display text-[clamp(1.25rem,2vw,1.5rem)] leading-[1.25] font-bold text-tinta"
                  >
                    {sec.title}
                  </h2>
                  <div className="mt-3.5 grid gap-3">
                    {sec.paras.map((p, j) => (
                      <div key={j} className="flex items-start gap-3">
                        {p.bullet && (
                          <span aria-hidden="true" className="mt-2.5 size-1.5 flex-none rounded-full bg-senal" />
                        )}
                        <p className="text-[15.5px] leading-[1.72] text-grafito">
                          {p.segments.map((g, k) =>
                            g.bold ? (
                              <strong key={k} className="font-semibold text-tinta">
                                {g.text}
                              </strong>
                            ) : (
                              <span key={k}>{g.text}</span>
                            ),
                          )}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              ))}

              {slug === "cookies" && <CookieSettingsButton variant="button" className="mt-8" />}

              <div className="mt-12 border-t border-niebla pt-6">
                <p className="text-[14.5px] leading-[1.65] text-pizarra">
                  ¿Alguna duda sobre este documento? Escríbenos a{" "}
                  <a href={`mailto:${site.email}`} className="font-semibold">
                    {site.email}
                  </a>{" "}
                  y te respondemos en lenguaje claro.
                </p>
              </div>
            </article>
          </div>
        </section>
      </main>

      <Footer variant="legal" />
    </>
  );
}
