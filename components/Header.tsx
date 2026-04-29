import Link from 'next/link'
import HeaderClient from './HeaderClient'

export default function Header() {
  return (
    <HeaderClient>
      <Link href="/" className="flex items-center gap-1 group">
        <span className="text-xl font-bold tracking-tight text-nieve">STRUCT</span>
        <span className="text-xl font-bold tracking-tight text-oro">9</span>
        <span className="ml-1.5 text-[10px] font-semibold tracking-[0.35em] text-nieve/25 uppercase">
          Design
        </span>
      </Link>

      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-8">
        <Link
          href="/servicios"
          className="text-sm text-nieve/40 hover:text-nieve transition-colors duration-200"
        >
          Servicios
        </Link>
        <Link
          href="/#proceso"
          className="text-sm text-nieve/40 hover:text-nieve transition-colors duration-200"
        >
          Proceso
        </Link>
        <Link
          href="/blog"
          className="text-sm text-nieve/40 hover:text-nieve transition-colors duration-200"
        >
          Blog
        </Link>
        <Link
          href="/contacto"
          className="rounded-lg bg-oro px-4 py-2 text-sm font-semibold text-grafito hover:bg-oro/85 transition-all duration-200 hover:scale-[1.02]"
        >
          Contactar
        </Link>
      </nav>
    </HeaderClient>
  )
}
