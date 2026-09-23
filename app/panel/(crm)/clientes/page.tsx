'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, Trash2, X, Download, Search, Pencil } from 'lucide-react'
import type { Client } from '@/lib/types'

const ITEMS_PER_PAGE = 25

function matchesSearch(c: Client, q: string) {
  if (!q) return true
  const s = q.toLowerCase()
  return (
    c.name.toLowerCase().includes(s) ||
    (c.email ?? '').toLowerCase().includes(s) ||
    (c.company ?? '').toLowerCase().includes(s)
  )
}

function downloadCSV(rows: Record<string, unknown>[], filename: string) {
  if (!rows.length) return
  const headers = Object.keys(rows[0])
  const lines = [
    headers.join(','),
    ...rows.map(r => headers.map(h => JSON.stringify(r[h] ?? '')).join(',')),
  ]
  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = Object.assign(document.createElement('a'), { href: url, download: filename })
  a.click()
  URL.revokeObjectURL(url)
}

export default function Clientes() {
  const [clients, setClients]   = useState<Client[]>([])
  const [loading, setLoading]   = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm]         = useState({ name: '', email: '', phone: '', company: '', notes: '' })
  const [saving, setSaving]     = useState(false)
  const [search, setSearch]     = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    fetch('/api/clientes')
      .then(r => r.json())
      .then(d => { setClients(Array.isArray(d) ? d : []); setLoading(false) })
  }, [])

  useEffect(() => { setCurrentPage(1) }, [search])

  async function addClient(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const res = await fetch('/api/clientes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        email:   form.email   || null,
        phone:   form.phone   || null,
        company: form.company || null,
        notes:   form.notes   || null,
      }),
    })
    if (res.ok) {
      const newClient = await res.json()
      setClients(prev => [newClient, ...prev])
      setForm({ name: '', email: '', phone: '', company: '', notes: '' })
      setShowForm(false)
    }
    setSaving(false)
  }

  async function deleteClient(id: string) {
    if (!confirm('¿Eliminar este cliente?')) return
    await fetch('/api/clientes', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    setClients(prev => prev.filter(c => c.id !== id))
  }

  const inputClass = 'w-full rounded-lg border border-niebla bg-white px-3 py-2 text-sm text-tinta placeholder-pizarra/70 focus:border-senal focus:outline-none transition-colors'

  const searched   = clients.filter(c => matchesSearch(c, search))
  const totalPages = Math.max(1, Math.ceil(searched.length / ITEMS_PER_PAGE))
  const paginated  = searched.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center justify-between mb-6 gap-3">
        <h1 className="font-display text-xl md:text-2xl font-bold text-tinta">Clientes</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => downloadCSV(searched as unknown as Record<string, unknown>[], 'clientes.csv')}
            className="inline-flex items-center justify-center rounded-lg border border-niebla p-2 text-pizarra hover:text-tinta transition-colors"
            title="Exportar CSV"
            aria-label="Exportar CSV"
          >
            <Download className="h-4 w-4" />
          </button>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 rounded-lg bg-senal px-4 py-2 text-sm font-bold text-white hover:bg-tinta transition-colors"
          >
            <Plus className="h-4 w-4" /> Añadir cliente
          </button>
        </div>
      </div>

      {/* Inline form */}
      {showForm && (
        <div className="rounded-xl border border-senal/20 bg-senal/5 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-sm font-semibold text-tinta">Nuevo cliente</h2>
            <button onClick={() => setShowForm(false)} className="text-pizarra hover:text-tinta">
              <X className="h-4 w-4" />
            </button>
          </div>
          <form onSubmit={addClient} className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-pizarra mb-1">Nombre *</label>
              <input type="text" required placeholder="Nombre completo"
                value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className={inputClass} />
            </div>
            <div>
              <label className="block text-xs text-pizarra mb-1">Empresa</label>
              <input type="text" placeholder="Nombre de la empresa"
                value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                className={inputClass} />
            </div>
            <div>
              <label className="block text-xs text-pizarra mb-1">Email</label>
              <input type="email" placeholder="email@ejemplo.com"
                value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className={inputClass} />
            </div>
            <div>
              <label className="block text-xs text-pizarra mb-1">Teléfono</label>
              <input type="tel" placeholder="+34 600 000 000"
                value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                className={inputClass} />
            </div>
            <div className="col-span-2">
              <label className="block text-xs text-pizarra mb-1">Notas</label>
              <input type="text" placeholder="Notas internas..."
                value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                className={inputClass} />
            </div>
            <div className="col-span-2 flex gap-3">
              <button type="submit" disabled={saving}
                className="rounded-lg bg-senal px-4 py-2 text-xs font-bold text-white hover:bg-tinta disabled:opacity-60 transition-colors">
                {saving ? 'Guardando...' : 'Guardar cliente'}
              </button>
              <button type="button" onClick={() => setShowForm(false)}
                className="rounded-lg border border-niebla px-4 py-2 text-xs text-pizarra hover:text-tinta transition-colors">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-pizarra/70 pointer-events-none" />
        <input
          type="text"
          placeholder="Buscar por nombre, email o empresa..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full rounded-lg border border-niebla bg-white pl-9 pr-4 py-2 text-sm text-tinta placeholder-pizarra/70 focus:border-senal focus:outline-none transition-colors"
        />
      </div>

      <div className="rounded-xl border border-niebla bg-white overflow-hidden">
        {loading ? (
          <div className="py-12 text-center text-sm text-pizarra/70">Cargando clientes...</div>
        ) : searched.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-sm text-pizarra/70">
              {clients.length === 0 ? 'No hay clientes todavía.' : 'No hay clientes que coincidan.'}
            </p>
            {clients.length === 0 && (
              <button onClick={() => setShowForm(true)} className="mt-2 text-xs text-senal hover:text-tinta">
                Añadir el primero
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="border-b border-niebla">
                  {['Nombre', 'Empresa', 'Email', 'Teléfono', 'Desde', ''].map(h => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-medium text-pizarra">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.map(c => (
                  <tr key={c.id} className="border-b border-niebla hover:bg-nieve/70 transition-colors">
                    <td className="px-5 py-3">
                      <Link
                        href={`/panel/clientes/${c.id}`}
                        className="font-medium text-tinta hover:text-tinta transition-colors duration-200"
                      >
                        {c.name}
                      </Link>
                    </td>
                    <td className="px-5 py-3 text-pizarra">{c.company ?? '—'}</td>
                    <td className="px-5 py-3 text-pizarra text-xs">{c.email ?? '—'}</td>
                    <td className="px-5 py-3 text-pizarra text-xs">{c.phone ?? '—'}</td>
                    <td className="px-5 py-3 text-xs text-pizarra">
                      {new Date(c.created_at).toLocaleDateString('es-ES')}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2.5">
                        <Link
                          href={`/panel/clientes/${c.id}`}
                          className="text-pizarra/70 hover:text-tinta transition-colors"
                          title="Editar"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Link>
                        <button onClick={() => deleteClient(c.id)}
                          className="text-pizarra/70 hover:text-red-700 transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-5 py-3 border-t border-niebla">
                <span className="text-xs text-pizarra/70">
                  {searched.length} clientes · página {currentPage} de {totalPages}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="rounded px-3 py-1 text-xs text-pizarra hover:text-tinta disabled:opacity-30 transition-colors"
                  >
                    ← Anterior
                  </button>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="rounded px-3 py-1 text-xs text-pizarra hover:text-tinta disabled:opacity-30 transition-colors"
                  >
                    Siguiente →
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
