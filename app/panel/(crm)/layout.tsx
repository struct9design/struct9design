import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import LogoutButton from '@/components/LogoutButton'
import { SidebarNav, BottomNav } from '@/components/PanelNav'

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-tinta flex">
      {/* Sidebar — desktop only */}
      <aside className="hidden md:flex w-56 shrink-0 border-r border-white/5 flex-col">
        <div className="h-16 flex items-center px-6 border-b border-white/5">
          <Link href="/" className="flex items-center gap-1">
            <span className="text-base font-bold text-humo">STRUCT</span>
            <span className="text-base font-bold text-oro">9</span>
          </Link>
        </div>

        <SidebarNav />

        <div className="p-3 border-t border-white/5 space-y-0.5">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs text-humo/40 hover:text-humo/60 transition-colors"
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
