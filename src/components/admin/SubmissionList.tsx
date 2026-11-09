'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { statuses, type Status } from '@/lib/admin/submissions'
import { sendJson } from '@/lib/client-api'
import { cn } from '@/lib/utils'
import { Icon, inputClass, smallButton } from './inputs'

export type Submission = {
  id: number
  createdAt: string
  status: string
  notes: string | null
  name: string
  phone: string
  email: string
  organisation: string
  message: string
  /** Lignes « libellé : valeur » propres au type de demande. */
  details: { label: string; value: string }[]
  title: string
}

const dateFormat = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Africa/Lubumbashi' })

function whatsappLink(phone: string) {
  const digits = phone.replace(/\D/g, '')
  return digits ? `https://wa.me/${digits.startsWith('0') ? `243${digits.slice(1)}` : digits}` : null
}

export default function SubmissionList({ type, items: initial }: { type: 'devis' | 'inscriptions'; items: Submission[] }) {
  const router = useRouter()
  const [items, setItems] = useState(initial)
  const [filter, setFilter] = useState<'' | Status>('')
  const [open, setOpen] = useState<number | null>(initial[0]?.status === 'nouveau' ? initial[0].id : null)
  const [notes, setNotes] = useState<Record<number, string>>({})
  const [error, setError] = useState('')

  const visible = items.filter((item) => !filter || item.status === filter)

  const update = async (item: Submission, data: { status?: Status; notes?: string }) => {
    setError('')
    const result = await sendJson<{ item: { status: string; notes: string | null } }>(`/api/admin/submissions/${type}/${item.id}`, data, 'PATCH')
    if (!result.ok) {
      setError(result.message)
      return
    }
    setItems((list) => list.map((x) => (x.id === item.id ? { ...x, status: result.item.status, notes: result.item.notes } : x)))
    router.refresh()
  }

  const remove = async (item: Submission) => {
    if (!window.confirm(`Supprimer définitivement la demande de ${item.name} ?`)) return
    const result = await sendJson(`/api/admin/submissions/${type}/${item.id}`, undefined, 'DELETE')
    if (!result.ok) {
      setError(result.message)
      return
    }
    setItems((list) => list.filter((x) => x.id !== item.id))
    router.refresh()
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filtrer par statut">
          {[{ value: '' as const, label: 'Toutes' }, ...statuses].map((s) => {
            const count = s.value ? items.filter((i) => i.status === s.value).length : items.length
            return (
              <button key={s.value} type="button" aria-pressed={filter === s.value} onClick={() => setFilter(s.value)} className={cn('rounded-full border px-3 py-1.5 text-sm font-semibold transition', filter === s.value ? 'border-ink bg-ink text-white' : 'border-line bg-white text-ink-soft hover:border-ink')}>
                {s.label} <span className="font-mono text-xs opacity-70">{count}</span>
              </button>
            )
          })}
        </div>
        <a href={`/api/admin/submissions/${type}/export`} className={cn(smallButton, 'no-underline')}>
          Exporter (Excel / CSV)
        </a>
      </div>

      {error && (
        <p role="alert" className="rounded-xl border border-[#B42318]/30 bg-[#FEF3F2] px-4 py-3 text-sm font-semibold text-[#B42318]">
          {error}
        </p>
      )}

      {visible.length === 0 && <p className="rounded-2xl border border-dashed border-line bg-white p-8 text-center text-ink-muted">Aucune demande pour le moment.</p>}

      <ul className="m-0 flex list-none flex-col gap-3 p-0">
        {visible.map((item) => {
          const status = statuses.find((s) => s.value === item.status) ?? statuses[0]
          const expanded = open === item.id
          const wa = whatsappLink(item.phone)
          return (
            <li key={item.id} className={cn('overflow-hidden rounded-2xl border bg-white shadow-[0_1px_2px_rgba(18,22,20,0.04)]', item.status === 'nouveau' ? 'border-copper/50' : 'border-line')}>
              <button type="button" onClick={() => setOpen(expanded ? null : item.id)} aria-expanded={expanded} className="flex w-full flex-wrap items-center gap-x-4 gap-y-1 px-5 py-4 text-left">
                <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-bold', status.tone)}>{status.label}</span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-semibold">
                    {item.name}
                    {item.organisation && <span className="font-normal text-ink-muted"> · {item.organisation}</span>}
                  </span>
                  <span className="block truncate text-sm text-ink-muted">{item.title}</span>
                </span>
                <span className="font-mono text-xs text-ink-muted">{dateFormat.format(new Date(item.createdAt))}</span>
              </button>
              {expanded && (
                <div className="grid gap-6 border-t border-line px-5 pb-5 pt-4 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
                  <div className="flex flex-col gap-3 text-[15px]">
                    <dl className="m-0 grid grid-cols-[130px_minmax(0,1fr)] gap-x-3 gap-y-1.5">
                      <dt className="text-ink-muted">Téléphone</dt>
                      <dd className="m-0 flex flex-wrap gap-x-3 font-mono">
                        <a href={`tel:${item.phone.replace(/[^\d+]/g, '')}`}>{item.phone}</a>
                        {wa && (
                          <a href={wa} target="_blank" rel="noreferrer" className="font-sans text-sm">
                            WhatsApp
                          </a>
                        )}
                      </dd>
                      {item.email && (
                        <>
                          <dt className="text-ink-muted">E-mail</dt>
                          <dd className="m-0 break-all">
                            <a href={`mailto:${item.email}`}>{item.email}</a>
                          </dd>
                        </>
                      )}
                      {item.details
                        .filter((d) => d.value)
                        .map((d) => (
                          <div key={d.label} className="contents">
                            <dt className="text-ink-muted">{d.label}</dt>
                            <dd className="m-0">{d.value}</dd>
                          </div>
                        ))}
                    </dl>
                    {item.message && <p className="whitespace-pre-wrap rounded-xl bg-stone p-4 text-ink-soft">{item.message}</p>}
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="flex flex-col gap-1.5 text-sm font-semibold">
                      Statut
                      <select className={inputClass} value={item.status} onChange={(e) => update(item, { status: e.target.value as Status })}>
                        {statuses.map((s) => (
                          <option key={s.value} value={s.value}>
                            {s.label}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="flex flex-col gap-1.5 text-sm font-semibold">
                      Notes internes
                      <textarea className={cn(inputClass, 'font-normal')} rows={4} value={notes[item.id] ?? item.notes ?? ''} onChange={(e) => setNotes((n) => ({ ...n, [item.id]: e.target.value }))} placeholder="Rappelé le…, devis envoyé…" />
                    </label>
                    <div className="flex flex-wrap gap-2">
                      <button type="button" className={smallButton} disabled={(notes[item.id] ?? item.notes ?? '') === (item.notes ?? '')} onClick={() => update(item, { notes: notes[item.id] ?? '' })}>
                        Enregistrer les notes
                      </button>
                      <button type="button" className={cn(smallButton, 'ml-auto hover:border-[#B42318] hover:text-[#B42318]')} onClick={() => remove(item)}>
                        <Icon name="trash" /> Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
