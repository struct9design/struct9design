'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Logo } from '@/components/layout/Logo'
import { NodeTick } from '@/components/motif/NodeLine'

export default function PanelLogin() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/panel-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (!res.ok) {
        setError('Contraseña incorrecta')
        setLoading(false)
        return
      }
      router.push('/panel')
      router.refresh()
    } catch {
      setError('Error de conexión')
      setLoading(false)
    }
  }

  return (
    <main className="gutter flex min-h-screen items-center justify-center bg-nieve">
      <div className="w-full max-w-sm">
        <div className="mb-7 flex justify-center">
          <Logo className="w-[120px]" />
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid gap-4 rounded-[18px] border border-niebla bg-white p-7 shadow-[0_24px_60px_rgba(19,41,75,.08)]"
        >
          <div className="flex items-center gap-2.5">
            <NodeTick />
            <h1 className="font-display text-[1.1rem] font-bold text-tinta">Panel de gestión</h1>
          </div>
          <p className="-mt-2 text-sm text-pizarra">Acceso restringido.</p>

          <div className="grid gap-[7px]">
            <label htmlFor="password" className="text-[13.5px] font-semibold text-tinta">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoFocus
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? 'password-error' : undefined}
              className="w-full rounded-[9px] border border-niebla bg-white px-3.5 py-3 text-[15px] text-grafito transition-[border-color,box-shadow] duration-[250ms] focus:border-senal focus:shadow-[0_0_0_3px_rgba(47,107,255,.14)] focus:outline-none aria-[invalid=true]:border-error"
            />
            {error && (
              <p id="password-error" role="alert" className="text-[13px] font-medium text-error">
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="rounded-[10px] bg-senal px-[22px] py-3.5 text-[15px] font-semibold text-white shadow-[0_10px_24px_rgba(47,107,255,.26)] transition-[transform,background-color] duration-[250ms] hover:-translate-y-0.5 hover:bg-tinta disabled:cursor-wait disabled:opacity-80"
          >
            {loading ? 'Entrando…' : 'Entrar al panel'}
          </button>
        </form>
      </div>
    </main>
  )
}
