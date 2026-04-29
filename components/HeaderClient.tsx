'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function HeaderClient({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || mobileOpen
            ? 'bg-grafito/90 backdrop-blur-xl border-b border-white/[0.06]'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 flex h-16 items-center justify-between">
          {children}

          {/* Mobile right side */}
          <div className="md:hidden flex items-center gap-3">
            <Link
              href="/contacto"
              className="rounded-lg bg-oro px-3 py-1.5 text-xs font-semibold text-grafito"
              onClick={() => setMobileOpen(false)}
            >
              Contactar
            </Link>
            <button
              onClick={() => setMobileOpen(v => !v)}
              className="flex flex-col justify-center items-center h-8 w-8 gap-1.5 text-nieve/60 hover:text-nieve transition-colors"
              aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              <span
                className={`block h-px w-5 bg-current transition-all duration-300 origin-center ${
                  mobileOpen ? 'rotate-45 translate-y-[3.5px]' : ''
                }`}
              />
              <span
                className={`block h-px w-5 bg-current transition-all duration-300 ${
                  mobileOpen ? 'opacity-0 scale-x-0' : ''
                }`}
              />
              <span
                className={`block h-px w-5 bg-current transition-all duration-300 origin-center ${
                  mobileOpen ? '-rotate-45 -translate-y-[3.5px]' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-grafito/98 backdrop-blur-xl pt-16 flex flex-col">
          <nav className="flex flex-col items-center justify-center flex-1 gap-10 pb-20">
            <Link
              href="/servicios"
              onClick={() => setMobileOpen(false)}
              className="text-2xl font-bold text-nieve/60 hover:text-nieve transition-colors duration-200"
            >
              Servicios
            </Link>
            <Link
              href="/#proceso"
              onClick={() => setMobileOpen(false)}
              className="text-2xl font-bold text-nieve/60 hover:text-nieve transition-colors duration-200"
            >
              Proceso
            </Link>
            <Link
              href="/blog"
              onClick={() => setMobileOpen(false)}
              className="text-2xl font-bold text-nieve/60 hover:text-nieve transition-colors duration-200"
            >
              Blog
            </Link>
            <Link
              href="/contacto"
              onClick={() => setMobileOpen(false)}
              className="mt-4 rounded-xl bg-oro px-10 py-4 text-base font-bold text-grafito"
            >
              Contactar
            </Link>
          </nav>
        </div>
      )}
    </>
  )
}
