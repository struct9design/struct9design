'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, FolderKanban, Users, Inbox } from 'lucide-react'
import LeadsNotificationBadge from '@/components/panel/LeadsNotificationBadge'

const nav = [
  { href: '/panel',           label: 'Dashboard', icon: LayoutDashboard },
  { href: '/panel/leads',     label: 'Leads',     icon: Inbox },
  { href: '/panel/proyectos', label: 'Proyectos', icon: FolderKanban },
  { href: '/panel/clientes',  label: 'Clientes',  icon: Users },
]

function isActive(pathname: string, href: string) {
  if (href === '/panel') return pathname === '/panel'
  return pathname.startsWith(href)
}

export function SidebarNav() {
  const pathname = usePathname()
  return (
    <nav className="flex-1 p-3 space-y-0.5">
      {nav.map(({ href, label, icon: Icon }) => {
        const active = isActive(pathname, href)
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? 'page' : undefined}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors
              ${active ? 'bg-senal/10 text-tinta' : 'text-pizarra hover:bg-nieve hover:text-tinta'}`}
          >
            <Icon className={`h-4 w-4 shrink-0 ${active ? 'text-senal' : ''}`} />
            <span className="flex-1">{label}</span>
            {href === '/panel/leads' && <LeadsNotificationBadge />}
          </Link>
        )
      })}
    </nav>
  )
}

export function BottomNav() {
  const pathname = usePathname()
  return (
    <nav className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t border-niebla flex z-50">
      {nav.map(({ href, label, icon: Icon }) => {
        const active = isActive(pathname, href)
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? 'page' : undefined}
            className={`flex-1 flex flex-col items-center justify-center py-3 gap-1 transition-colors relative
              ${active ? 'text-tinta' : 'text-pizarra'}`}
          >
            {active && (
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-senal rounded-full" />
            )}
            <div className="relative">
              <Icon className={`h-5 w-5 ${active ? 'text-senal' : ''}`} />
              {href === '/panel/leads' && (
                <span className="absolute -top-1.5 -right-2">
                  <LeadsNotificationBadge />
                </span>
              )}
            </div>
            <span className={`text-[10px] font-medium ${active ? 'text-senal' : ''}`}>{label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
