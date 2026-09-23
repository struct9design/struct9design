import Link from 'next/link'
import { Logo } from '@/components/layout/Logo'
import { ExternalLink } from 'lucide-react'
import LogoutButton from '@/components/panel/LogoutButton'
import { SidebarNav, BottomNav } from '@/components/panel/PanelNav'

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-nieve flex">
      {/* Sidebar — desktop only */}
      <aside className="sticky top-0 hidden h-screen md:flex w-56 shrink-0 border-r border-niebla bg-white flex-col">
        <div className="h-16 flex items-center px-6 border-b border-niebla">
          <Link href="/panel" aria-label="struct9, panel" className="flex items-center gap-2.5">
            <Logo className="w-[78px]" />
            <span className="rounded-full border border-niebla bg-nieve px-2 py-0.5 text-[10.5px] font-semibold tracking-[.06em] text-pizarra uppercase">Panel</span>
          </Link>
        </div>

        <SidebarNav />

        <div className="p-3 border-t border-niebla space-y-0.5">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs text-pizarra hover:text-tinta transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5" /> Ver web
          </Link>
          <LogoutButton />
        </div>
      </aside>

      {/* Main — padding bottom en móvil para la barra inferior */}
      <main className="flex-1 overflow-auto pb-16 md:pb-0">
        {children}
      </main>

      {/* Bottom nav — móvil only */}
      <BottomNav />
    </div>
  )
}
