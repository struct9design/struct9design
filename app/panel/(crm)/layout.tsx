import Link from 'next/link'
import { LayoutDashboard, FolderKanban, Users, Inbox, ExternalLink } from 'lucide-react'
import LogoutButton from '@/components/LogoutButton'
import LeadsNotificationBadge from '@/components/LeadsNotificationBadge'

const nav = [
  { href: '/panel',           label: 'Dashboard', icon: LayoutDashboard },
  { href: '/panel/leads',     label: 'Leads',     icon: Inbox },
  { href: '/panel/proyectos', label: 'Proyectos', icon: FolderKanban },
  { href: '/panel/clientes',  label: 'Clientes',  icon: Users },
]

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-tinta flex">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 border-r border-white/5 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-white/5">
          <Link href="/" className="flex items-center gap-1">
            <span className="text-base font-bold text-humo">STRUCT</span>
            <span className="text-base font-bold text-oro">9</span>
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-0.5">
          {nav.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-humo/60 hover:bg-white/5 hover:text-humo transition-colors"
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="flex-1">{label}</span>
              {href === '/panel/leads' && <LeadsNotificationBadge />}
            </Link>
          ))}
        </nav>

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

      {/* Main */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
