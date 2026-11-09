'use client'

import { useState } from 'react'
import { sendJson } from '@/lib/client-api'
import { cn } from '@/lib/utils'
import { Icon, smallButton } from './inputs'

type Subscriber = { id: number; email: string; source: string; createdAt: string }

const dateFormat = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium', timeZone: 'Africa/Lubumbashi' })

export default function NewsletterList({ items: initial }: { items: Subscriber[] }) {
  const [items, setItems] = useState(initial)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const remove = async (item: Subscriber) => {
    if (!window.confirm(`Retirer ${item.email} de la liste ?`)) return
    const result = await sendJson(`/api/admin/submissions/newsletter/${item.id}`, undefined, 'DELETE')
    if (result.ok) setItems((list) => list.filter((x) => x.id !== item.id))
    else setError(result.message)
  }

  const copyAll = async () => {
    try {
      await navigator.clipboard.writeText(items.map((i) => i.email).join(', '))
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2500)
    } catch {
      setError('Copie impossible dans ce navigateur. Utilisez l’export.')
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <button type="button" className={smallButton} onClick={copyAll} disabled={!items.length}>
          {copied ? 'Adresses copiées ✓' : 'Copier toutes les adresses'}
        </button>
        <a href="/api/admin/submissions/newsletter/export" className={cn(smallButton, 'no-underline')}>
          Exporter (Excel / CSV)
        </a>
      </div>
      {error && (
        <p role="alert" className="text-sm font-semibold text-[#B42318]">
          {error}
        </p>
      )}
      <div className="overflow-hidden rounded-2xl border border-line bg-white">
        {items.length === 0 ? (
          <p className="p-8 text-center text-ink-muted">Aucune inscription pour le moment.</p>
        ) : (
          <table className="w-full border-collapse text-left text-[15px]">
            <thead className="bg-stone text-sm text-ink-muted">
              <tr>
                <th className="px-4 py-3 font-semibold">E-mail</th>
                <th className="hidden px-4 py-3 font-semibold sm:table-cell">Formulaire</th>
                <th className="hidden px-4 py-3 font-semibold sm:table-cell">Date</th>
                <th className="px-4 py-3" aria-label="Actions" />
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="break-all px-4 py-3">{item.email}</td>
                  <td className="hidden px-4 py-3 text-ink-soft sm:table-cell">{item.source === 'blog' ? 'Blog' : 'Pied de page'}</td>
                  <td className="hidden px-4 py-3 font-mono text-xs text-ink-muted sm:table-cell">{dateFormat.format(new Date(item.createdAt))}</td>
                  <td className="px-4 py-3 text-right">
                    <button type="button" className={cn(smallButton, 'px-2 hover:border-[#B42318] hover:text-[#B42318]')} onClick={() => remove(item)} aria-label={`Retirer ${item.email}`}>
                      <Icon name="trash" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
