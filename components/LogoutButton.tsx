'use client'

import { LogOut } from 'lucide-react'

export default function LogoutButton() {
  return (
    <button
      type="button"
      onClick={async () => {
        await fetch('/api/panel-auth', { method: 'DELETE' })
        window.location.href = '/panel/login'
      }}
      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-xs text-humo/40 hover:text-red-400 transition-colors"
    >
      <LogOut className="h-3.5 w-3.5" /> Cerrar sesión
    </button>
  )
}
