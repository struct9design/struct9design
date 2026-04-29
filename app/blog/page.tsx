import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { articles } from '@/lib/blog'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog — STRUCT9 Design',
  description: 'Artículos sobre inteligencia artificial, automatización y productividad digital para PYMEs españolas.',
}

export default function Blog() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-24 pb-24 px-6">
        <div className="mx-auto max-w-3xl">

          <div className="mb-14 pt-4">
            <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-oro mb-3">Blog</p>
            <h1 className="text-4xl font-bold text-nieve">
              Ideas para <span className="text-gradient-oro">crecer más rápido</span>
            </h1>
            <p className="mt-4 text-nieve/35 leading-relaxed">
              IA, automatización y productividad digital para empresas que no quieren esperar.
            </p>
          </div>

          <div className="space-y-px">
            {articles.map((article, i) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8 rounded-xl px-0 py-7 border-b border-white/[0.05] hover:bg-white/[0.02] transition-colors -mx-4 px-4 last:border-0"
              >
                <div className="shrink-0 text-right hidden sm:block w-20">
                  <span className="text-xs text-nieve/25">
                    {new Date(article.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-block rounded-full bg-oro/10 px-2.5 py-0.5 text-[10px] font-semibold text-oro">
                      {article.category}
                    </span>
                    <span className="text-[10px] text-nieve/20">{article.readTime} min</span>
                  </div>
                  <h2 className="text-base font-bold text-nieve group-hover:text-oro transition-colors duration-200 leading-snug mb-2">
                    {article.title}
                  </h2>
                  <p className="text-sm text-nieve/40 leading-relaxed line-clamp-2">
                    {article.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1 mt-3 text-xs text-oro opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Leer artículo
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
