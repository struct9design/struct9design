import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { articles } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Blog",
  description: "Artículos sobre inteligencia artificial, automatización y productividad digital para pymes españolas.",
  path: "/blog",
});

const up = (delay: number) => ({ style: { animationDelay: `${delay}ms` } });

export default function Blog() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="gutter border-b border-niebla bg-nieve pt-[clamp(48px,7vw,92px)] pb-[clamp(40px,5vw,64px)]">
          <div className="wrap">
            <div {...up(0)} className="animate-s9-up">
              <Eyebrow tone="tinta">Blog</Eyebrow>
            </div>
            <h1
              {...up(100)}
              className="animate-s9-up mt-4 max-w-[20ch] font-display text-[clamp(2.1rem,4.8vw,3.4rem)] leading-[1.06] font-extrabold tracking-[-.03em] text-pretty text-tinta"
            >
              Ideas para crecer más rápido.
            </h1>
            <p
              {...up(200)}
              className="animate-s9-up mt-[18px] max-w-[52ch] text-[clamp(1.02rem,1.4vw,1.15rem)] leading-[1.65] text-pizarra"
            >
              IA, automatización y productividad digital para empresas que no quieren esperar.
            </p>
          </div>
        </section>

        <section className="gutter py-[clamp(48px,7vw,88px)]">
          <ul className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-5">
            {articles.map((a, i) => (
              <Reveal as="li" key={a.slug} delay={i * 70} className="flex">
                <Link
                  href={`/blog/${a.slug}`}
                  className="group flex flex-1 flex-col rounded-2xl border border-niebla bg-white p-[clamp(24px,2.6vw,32px)] transition-[transform,box-shadow,border-color] duration-[350ms] ease-s9 hover:-translate-y-[5px] hover:border-senal hover:shadow-[0_16px_40px_rgba(19,41,75,.1)]"
                >
                  <span className="flex items-center gap-3 text-[13px]">
                    <span className="font-display font-bold tracking-[.06em] text-senal uppercase">{a.category}</span>
                    <span aria-hidden="true" className="h-px flex-1 bg-niebla" />
                    <span aria-hidden="true" className="size-2 rounded-full bg-senal" />
                  </span>
                  <h2 className="mt-5 font-display text-[1.28rem] leading-[1.3] font-bold tracking-[-.01em] text-pretty text-tinta">
                    {a.title}
                  </h2>
                  <p className="mt-3 line-clamp-3 text-[15px] leading-[1.65] text-pizarra">{a.excerpt}</p>
                  <span className="mt-auto flex items-center justify-between gap-3 pt-[22px] text-[13.5px]">
                    <span className="text-pizarra">
                      <time dateTime={a.date}>
                        {new Date(a.date).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}
                      </time>{" "}
                      · {a.readTime} min
                    </span>
                    <span className="font-semibold text-senal">Leer →</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </section>
      </main>
      <Footer
        agency={[
          { href: "/", label: "Inicio" },
          { href: "/blog", label: "Blog" },
          { href: "/contacto", label: "Contacto" },
        ]}
      />
    </>
  );
}
