import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { articles, getArticle } from '@/lib/blog'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return articles.map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) return {}
  return {
    title: `${article.title} — STRUCT9 Design`,
    description: article.excerpt,
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) notFound()

  return (
    <>
      <Header />
      <main className="flex-1 pt-24 pb-24 px-6">
        <div className="mx-auto max-w-2xl">

          {/* Breadcrumb */}
          <div className="pt-4 mb-10">
            <Link href="/blog" className="text-xs text-nieve/30 hover:text-oro transition-colors duration-200">
              ← Blog
            </Link>
          </div>

          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <span className="inline-block rounded-full bg-oro/10 px-2.5 py-0.5 text-[10px] font-semibold text-oro">
                {article.category}
              </span>
              <span className="text-xs text-nieve/25">
                {new Date(article.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
              <span className="text-xs text-nieve/20">{article.readTime} min de lectura</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-nieve leading-tight mb-5">
              {article.title}
            </h1>
            <p className="text-nieve/45 text-base leading-relaxed border-l-2 border-oro/30 pl-4">
              {article.excerpt}
            </p>
          </div>

          {/* Content */}
          <article className="space-y-8">
            {article.sections.map((section, i) => (
              <div key={i}>
                {section.heading && (
                  <h2 className="text-xl font-bold text-nieve mb-3">{section.heading}</h2>
                )}
                <div className="space-y-4">
                  {section.content.split('\n\n').map((para, j) => (
                    <p key={j} className="text-nieve/55 leading-[1.85] text-[15px]">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </article>

          {/* CTA */}
          <div className="mt-16 rounded-2xl border border-oro/20 bg-oro/5 px-8 py-8">
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-oro mb-2">¿Te ha resultado útil?</p>
            <h3 className="text-xl font-bold text-nieve mb-3">
              Hablamos de tu negocio sin compromiso
            </h3>
            <p className="text-sm text-nieve/40 leading-relaxed mb-5">
              En struct9design implementamos lo que describes en este artículo. Dinos qué necesitas y te damos un presupuesto en menos de 24 horas.
            </p>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 rounded-xl bg-oro px-5 py-2.5 text-sm font-bold text-grafito hover:bg-oro/85 transition-all duration-200"
            >
              Solicitar presupuesto gratuito
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Back */}
          <div className="mt-10 pt-6 border-t border-white/[0.05]">
            <Link href="/blog" className="text-sm text-nieve/30 hover:text-oro transition-colors duration-200">
              ← Ver todos los artículos
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
