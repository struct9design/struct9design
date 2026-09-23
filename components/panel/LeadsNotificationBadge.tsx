'use client'

import { useEffect, useId, useState } from 'react'
import { createClient, type RealtimePostgresChangesPayload } from '@supabase/supabase-js'
import type { ContactSubmission } from '@/lib/types'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const client = url && key ? createClient(url, key) : null

function isNew(status: string | null | undefined) {
  return !status || status === 'nuevo'
}

export default function LeadsNotificationBadge() {
  const id = useId()
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    fetch('/api/leads')
      .then(r => r.json())
      .then((leads: ContactSubmission[]) => {
        if (!Array.isArray(leads)) return
        setCount(leads.filter(l => isNew(l.lead_status)).length)
      })
      .catch(() => {})

    if (!client) return

    const channel = client
      .channel(`leads-notifications-${id}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'contacts' },
        (payload: RealtimePostgresChangesPayload<Record<string, unknown>>) => {
          if (payload.eventType === 'INSERT') {
            if (isNew(payload.new.lead_status as string)) {
              setCount(c => (c ?? 0) + 1)
            }
          } else if (payload.eventType === 'UPDATE') {
            const wasNew = isNew(payload.old.lead_status as string)
            const nowNew = isNew(payload.new.lead_status as string)
            if (wasNew && !nowNew) setCount(c => Math.max(0, (c ?? 0) - 1))
            if (!wasNew && nowNew) setCount(c => (c ?? 0) + 1)
          } else if (payload.eventType === 'DELETE') {
            if (isNew(payload.old.lead_status as string)) {
              setCount(c => Math.max(0, (c ?? 0) - 1))
            }
          }
        }
      )
      .subscribe()

    return () => { client.removeChannel(channel) }
  }, [])

  if (!count) return null

  return (
    <span className="inline-flex items-center justify-center h-4 min-w-4 px-1 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold leading-none">
      {count > 99 ? '99+' : count}
    </span>
  )
}
