import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { NodeTick } from "@/components/motif/NodeLine";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/content/site";
import { articles, getArticle } from "@/lib/blog";
import { JsonLd, organizationLd, pageMetadata } from "@/lib/seo";
import { WhatsAppFloat } from "@/components/ui/WhatsAppLink";

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const article = getArticle((await params).slug);
  if (!article) return {};
  return {
    ...pageMetadata({ title: article.title, description: article.excerpt, path: `/blog/${article.slug}` }),
    openGraph: { type: "article", title: article.title, description: article.excerpt, publishedTime: article.date },
  };
}

const up = (delay: number) => ({ style: { animationDelay: `${delay}ms` } });

export default async function ArticlePage({ params }: PageProps<"/blog/[slug]">) {
  const article = getArticle((await params).slug);
  if (!article) notFound();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: article.title,
          description: article.excerpt,
          datePublished: article.date,
          articleSection: article.category,
          inLanguage: "es",
          mainEntityOfPage: `${site.url}/blog/${article.slug}`,
          author: organizationLd(),
          publisher: organizationLd(),
        }}
      />
      <SiteHeader />
      <main>
        <header className="gutter border-b border-niebla bg-nieve pt-[clamp(40px,6vw,72px)] pb-[clamp(40px,5vw,60px)]">
          <div className="mx-auto max-w-[760px]">
            <Link href="/blog" className="text-sm font-semibold !text-tinta hover:!text-senal">
              ← Blog
            </Link>
            <p {...up(0)} className="animate-s9-up mt-7 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13.5px] text-pizarra">
              <span className="font-display font-bold tracking-[.08em] text-tinta uppercase">{article.category}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={article.date}>
                {new Date(article.date).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}
              </time>
              <span aria-hidden="true">·</span>
              <span>{article.readTime} min de lectura</span>
            </p>
            <h1
              {...up(100)}
              className="animate-s9-up mt-4 font-display text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.1] font-extrabold tracking-[-.025em] text-pretty text-tinta"
            >
              {article.title}
            </h1>
            <p
              {...up(200)}
              className="animate-s9-up mt-5 border-l-2 border-senal pl-4 text-[clamp(1.02rem,1.4vw,1.12rem)] leading-[1.65] text-pizarra"
            >
              {article.excerpt}
            </p>
          </div>
        </header>

        <div className="gutter py-[clamp(40px,6vw,72px)]">
          <article className="mx-auto grid max-w-[760px] gap-9">
            {article.sections.map((section, i) => (
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

            <aside className="mt-6 rounded-2xl bg-tinta p-[clamp(24px,3vw,36px)] text-white">
              <div className="flex items-center gap-2.5">
                <NodeTick />
                <p className="font-display text-[12.5px] font-bold tracking-[.12em] uppercase">¿Te ha resultado útil?</p>
              </div>
              <h2 className="mt-3 font-display text-[clamp(1.35rem,2.4vw,1.7rem)] leading-[1.2] font-extrabold">
                Hablamos de tu negocio sin compromiso.
              </h2>
              <p className="mt-3 max-w-[52ch] text-[15px] leading-[1.65] text-niebla">
                En struct9 aplicamos lo que cuenta este artículo. Dinos qué necesitas y te damos un presupuesto en menos
                de 24 horas.
              </p>
              <ButtonLink href="/contacto" className="mt-6">
                Pide tu presupuesto
              </ButtonLink>
            </aside>

            <Link href="/blog" className="border-t border-niebla pt-6 text-sm font-semibold !text-tinta hover:!text-senal">
              ← Ver todos los artículos
            </Link>
          </article>
        </div>
      </main>
      <WhatsAppFloat mobile />
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
