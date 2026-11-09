'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { getCollection } from '@/lib/admin/collections'
import { sendJson } from '@/lib/client-api'
import { imageUrl } from '@/lib/images'
import { cn } from '@/lib/utils'
import { Icon, inputClass, smallButton } from './inputs'

type Row = Record<string, unknown> & { id: number }

const str = (v: unknown) => (typeof v === 'string' ? v : v === null || v === undefined ? '' : String(v))

export default function CollectionList({ collection, items: initial }: { collection: string; items: Row[] }) {
  const def = getCollection(collection)
  const router = useRouter()
  const [items, setItems] = useState(initial)
  const [query, setQuery] = useState('')
  const [group, setGroup] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  if (!def) return null

  const groupOptions = def.groupField ? (def.fields.find((f) => f.name === def.groupField)?.options ?? []) : []
  const q = query.trim().toLowerCase()
  const visible = items.filter(
    (item) => (!group || item[def.groupField ?? ''] === group) && (!q || `${str(item[def.titleField])} ${str(item[def.subtitleField ?? ''])}`.toLowerCase().includes(q)),
  )

  const togglePublished = async (item: Row) => {
    setError('')
    const next = !item.published
    setItems((list) => list.map((x) => (x.id === item.id ? { ...x, published: next } : x)))
    const result = await sendJson(`/api/admin/collections/${def.name}/${item.id}`, { published: next }, 'PATCH')
    if (!result.ok) {
      setError(result.message)
      setItems((list) => list.map((x) => (x.id === item.id ? { ...x, published: !next } : x)))
    } else router.refresh()
  }

  // Échange un élément avec son voisin visible, puis enregistre l'ordre complet.
  const moveItem = async (item: Row, direction: -1 | 1) => {
    const index = visible.findIndex((x) => x.id === item.id)
    const neighbour = visible[index + direction]
    if (!neighbour) return
    const order = items.slice()
    const a = order.findIndex((x) => x.id === item.id)
    const b = order.findIndex((x) => x.id === neighbour.id)
    ;[order[a], order[b]] = [order[b], order[a]]
    const previous = items
    setItems(order)
    setBusy(true)
    const result = await sendJson(`/api/admin/collections/${def.name}/reorder`, { ids: order.map((x) => x.id) })
    setBusy(false)
    if (!result.ok) {
      setError(result.message)
      setItems(previous)
    } else router.refresh()
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <input type="search" className={cn(inputClass, 'max-w-xs')} placeholder="Rechercher…" value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Rechercher dans la liste" />
        {groupOptions.length > 0 && (
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filtrer">
            {[{ value: '', label: 'Tout' }, ...groupOptions].map((option) => (
              <button key={option.value} type="button" aria-pressed={group === option.value} onClick={() => setGroup(option.value)} className={cn('rounded-full border px-3 py-1.5 text-sm font-semibold transition', group === option.value ? 'border-ink bg-ink text-white' : 'border-line bg-white text-ink-soft hover:border-ink')}>
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {error && (
        <p role="alert" className="rounded-xl border border-[#B42318]/30 bg-[#FEF3F2] px-4 py-3 text-sm font-semibold text-[#B42318]">
          {error}
        </p>
      )}

      <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-[0_1px_2px_rgba(18,22,20,0.04)]">
        {visible.length === 0 ? (
          <p className="p-8 text-center text-ink-muted">{items.length ? 'Aucun élément ne correspond à la recherche.' : `Aucun ${def.singular} pour le moment.`}</p>
        ) : (
          <ul className="m-0 list-none divide-y divide-line p-0">
            {visible.map((item, index) => {
              const image = def.imageField ? imageUrl(str(item[def.imageField]), { w: 120, h: 90, q: 60 }) : ''
              const groupLabel = def.groupField ? groupOptions.find((o) => o.value === item[def.groupField ?? ''])?.label : ''
              return (
                <li key={item.id} className="flex flex-wrap items-center gap-3 px-4 py-3 sm:flex-nowrap sm:px-5">
                  <div className="flex shrink-0 flex-col gap-1">
                    <button type="button" className={cn(smallButton, 'min-h-7 px-1.5')} disabled={busy || index === 0} onClick={() => moveItem(item, -1)} aria-label="Monter" title="Monter">
                      <Icon name="up" size={14} />
                    </button>
                    <button type="button" className={cn(smallButton, 'min-h-7 px-1.5')} disabled={busy || index === visible.length - 1} onClick={() => moveItem(item, 1)} aria-label="Descendre" title="Descendre">
                      <Icon name="down" size={14} />
                    </button>
                  </div>
                  {def.imageField && (
                    <span className="grid h-[54px] w-[72px] shrink-0 place-items-center overflow-hidden rounded-lg border border-line bg-stone">
                      {image ? <img src={image} alt="" className="h-full w-full object-cover" /> : <span className="text-[10px] text-ink-muted">—</span>}
                    </span>
                  )}
                  <Link href={`/admin/listes/${def.name}/${item.id}`} className="flex min-w-0 flex-1 flex-col text-ink no-underline hover:text-copper">
                    <span className="truncate font-semibold">{str(item[def.titleField]) || '(sans titre)'}</span>
                    <span className="truncate text-sm text-ink-muted">
                      {[groupLabel, str(item[def.subtitleField ?? ''])].filter(Boolean).join(' · ') || ' '}
                      {item.featured ? ' · À la une' : ''}
                      {item.recommended ? ' · Recommandée' : ''}
                    </span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => togglePublished(item)}
                    className={cn('shrink-0 rounded-full px-3 py-1 text-xs font-bold', item.published ? 'bg-mal-soft text-mal' : 'bg-line text-ink-soft')}
                    title={item.published ? 'Cliquer pour masquer' : 'Cliquer pour publier'}
                  >
                    {item.published ? 'Publié' : 'Masqué'}
                  </button>
                  <Link href={`/admin/listes/${def.name}/${item.id}`} className={cn(smallButton, 'shrink-0 no-underline')}>
                    Modifier
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </div>
      <p className="text-sm text-ink-muted">L’ordre de la liste est celui de l’affichage sur le site. Utilisez les flèches pour le changer.</p>
    </div>
  )
}
