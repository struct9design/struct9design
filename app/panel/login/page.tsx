'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock } from 'lucide-react'

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
    <div className="min-h-screen bg-tinta flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-oro/10 mb-4">
            <Lock className="h-5 w-5 text-oro" />
          </div>
          <h1 className="text-xl font-bold text-humo">
            STRUCT<span className="text-oro">9</span> Panel
          </h1>
          <p className="text-xs text-humo/40 mt-1">Acceso restringido</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            required
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoFocus
            className="w-full rounded-lg border border-white/10 bg-pizarra/20 px-4 py-3 text-sm text-humo placeholder-humo/30 focus:border-oro/50 focus:outline-none focus:ring-1 focus:ring-oro/30 transition-colors"
          />
          {error && <p className="text-xs text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-oro px-4 py-3 text-sm font-bold text-grafito hover:bg-oro/80 disabled:opacity-60 transition-colors"
          >
            {loading ? 'Entrando...' : 'Entrar al panel'}
          </button>
        </form>
      </div>
    </div>
  )
}
