'use client'

import { useId, useRef, useState, type ReactNode } from 'react'
import { iconNames, PathIcon } from '@/components/ui/icons'
import type { Option } from '@/lib/admin/fields'
import { imageUrl } from '@/lib/images'
import { cn } from '@/lib/utils'

export const inputClass =
  'w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-[15px] leading-normal text-ink shadow-[0_1px_0_rgba(18,22,20,0.03)] outline-none transition placeholder:text-ink-muted/70 focus:border-copper focus:ring-2 focus:ring-copper/20 aria-[invalid=true]:border-[#B42318]'

export const smallButton =
  'inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg border border-line bg-white px-3 text-sm font-semibold text-ink transition hover:border-ink disabled:cursor-not-allowed disabled:opacity-40'

export function Icon({ name, size = 16 }: { name: 'up' | 'down' | 'trash' | 'plus' | 'upload' | 'x' | 'external' | 'grip'; size?: number }) {
  const paths: Record<typeof name, string> = {
    up: 'M12 19V5M5 12l7-7 7 7',
    down: 'M12 5v14M19 12l-7 7-7-7',
    trash: 'M4 7h16M10 11v6M14 11v6M5 7l1 13h12l1-13M9 7V4h6v3',
    plus: 'M12 5v14M5 12h14',
    upload: 'M12 16V4M7 9l5-5 5 5M4 20h16',
    x: 'M6 6l12 12M18 6L6 18',
    external: 'M14 4h6v6M20 4l-9 9M18 14v6H4V6h6',
    grip: 'M9 6h.01M15 6h.01M9 12h.01M15 12h.01M9 18h.01M15 18h.01',
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  )
}

export function FieldShell({ id, label, hint, error, children, className }: { id?: string; label: string; hint?: string; error?: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn('flex min-w-0 flex-col gap-1.5', className)}>
      <label htmlFor={id} className="text-sm font-semibold text-ink">
        {label}
      </label>
      {children}
      {hint && <p className="text-[13px] leading-snug text-ink-muted">{hint}</p>}
      {error && (
        <p className="text-[13px] font-semibold text-[#B42318]" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

export function TextInput({ id, value, onChange, placeholder, maxLength, invalid, type = 'text' }: { id?: string; value: string; onChange: (v: string) => void; placeholder?: string; maxLength?: number; invalid?: boolean; type?: string }) {
  return <input id={id} type={type} className={inputClass} value={value} placeholder={placeholder} maxLength={maxLength} aria-invalid={invalid || undefined} onChange={(e) => onChange(e.target.value)} />
}

export function TextArea({ id, value, onChange, rows = 3, placeholder, maxLength, invalid }: { id?: string; value: string; onChange: (v: string) => void; rows?: number; placeholder?: string; maxLength?: number; invalid?: boolean }) {
  return <textarea id={id} rows={rows} className={cn(inputClass, 'resize-y')} value={value} placeholder={placeholder} maxLength={maxLength} aria-invalid={invalid || undefined} onChange={(e) => onChange(e.target.value)} />
}

export function SelectInput({ id, value, onChange, options }: { id?: string; value: string; onChange: (v: string) => void; options: Option[] }) {
  return (
    <select id={id} className={cn(inputClass, 'cursor-pointer')} value={value} onChange={(e) => onChange(e.target.value)}>
      {!options.some((o) => o.value === value) && <option value={value}>{value || '—'}</option>}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

export function Toggle({ id, checked, onChange, label }: { id?: string; checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label htmlFor={id} className="inline-flex cursor-pointer select-none items-center gap-3 py-1 text-[15px]">
      <input id={id} type="checkbox" className="peer sr-only" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span className="relative h-6 w-11 rounded-full bg-line transition peer-checked:bg-mal peer-focus-visible:ring-2 peer-focus-visible:ring-copper after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow after:transition peer-checked:after:translate-x-5" />
      <span>{label}</span>
    </label>
  )
}

export function IconSelect({ id, value, onChange }: { id?: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-copper-soft text-copper">
        <PathIcon name={value} size={22} />
      </span>
      <SelectInput id={id} value={value} onChange={onChange} options={iconNames.map((name) => ({ value: name, label: name }))} />
    </div>
  )
}

export function ImageInput({ id, value, onChange }: { id?: string; value: string; onChange: (v: string) => void }) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const preview = imageUrl(value, { w: 320, h: 220, q: 70 })

  const upload = async (file: File) => {
    setBusy(true)
    setError('')
    const body = new FormData()
    body.append('file', file)
    try {
      const response = await fetch('/api/admin/upload', { method: 'POST', body, credentials: 'same-origin' })
      const data = (await response.json().catch(() => null)) as { ok?: boolean; url?: string; message?: string } | null
      if (data?.ok && data.url) onChange(data.url)
      else setError(data?.message ?? 'Envoi impossible.')
    } catch {
      setError('Envoi impossible. Vérifiez la connexion.')
    } finally {
      setBusy(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  return (
    <div className="flex flex-col gap-2.5 sm:flex-row sm:items-start">
      <div className="grid h-[110px] w-full shrink-0 place-items-center overflow-hidden rounded-xl border border-dashed border-line bg-stone sm:w-[160px]">
        {preview ? <img src={preview} alt="" className="h-full w-full object-cover" /> : <span className="px-3 text-center text-xs text-ink-muted">Aucune image</span>}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <TextInput id={id} value={value} onChange={onChange} placeholder="https://… , /uploads/… ou photo-…" maxLength={512} />
        <div className="flex flex-wrap gap-2">
          <button type="button" className={smallButton} onClick={() => fileRef.current?.click()} disabled={busy}>
            <Icon name="upload" /> {busy ? 'Envoi…' : 'Envoyer une image'}
          </button>
          {value && (
            <button type="button" className={smallButton} onClick={() => onChange('')}>
              <Icon name="x" /> Retirer
            </button>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif,image/avif"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) void upload(file)
            }}
          />
        </div>
        {error && <p className="text-[13px] font-semibold text-[#B42318]">{error}</p>}
      </div>
    </div>
  )
}

function move<T>(list: T[], from: number, to: number): T[] {
  if (to < 0 || to >= list.length) return list
  const next = list.slice()
  const [item] = next.splice(from, 1)
  next.splice(to, 0, item)
  return next
}

function RowTools({ index, count, onMove, onRemove, label }: { index: number; count: number; onMove: (to: number) => void; onRemove: () => void; label: string }) {
  return (
    <div className="flex shrink-0 gap-1">
      <button type="button" className={cn(smallButton, 'px-2')} onClick={() => onMove(index - 1)} disabled={index === 0} aria-label={`Monter ${label}`} title="Monter">
        <Icon name="up" />
      </button>
      <button type="button" className={cn(smallButton, 'px-2')} onClick={() => onMove(index + 1)} disabled={index === count - 1} aria-label={`Descendre ${label}`} title="Descendre">
        <Icon name="down" />
      </button>
      <button type="button" className={cn(smallButton, 'px-2 hover:border-[#B42318] hover:text-[#B42318]')} onClick={onRemove} aria-label={`Supprimer ${label}`} title="Supprimer">
        <Icon name="trash" />
      </button>
    </div>
  )
}

/** Liste de textes : une ligne par élément. */
export function StringList({ id, value, onChange, maxLength, long = false }: { id?: string; value: string[]; onChange: (v: string[]) => void; maxLength?: number; long?: boolean }) {
  const uid = useId()
  return (
    <div id={id} className="flex flex-col gap-2">
      {value.map((item, index) => (
        <div key={`${uid}-${index}`} className="flex items-start gap-2">
          <span className="mt-2.5 w-6 shrink-0 text-right font-mono text-xs text-ink-muted">{index + 1}</span>
          {long ? (
            <TextArea value={item} rows={2} maxLength={maxLength} onChange={(v) => onChange(value.map((x, i) => (i === index ? v : x)))} />
          ) : (
            <TextInput value={item} maxLength={maxLength} onChange={(v) => onChange(value.map((x, i) => (i === index ? v : x)))} />
          )}
          <RowTools index={index} count={value.length} label={`la ligne ${index + 1}`} onMove={(to) => onChange(move(value, index, to))} onRemove={() => onChange(value.filter((_, i) => i !== index))} />
        </div>
      ))}
      <button type="button" className={cn(smallButton, 'self-start border-dashed')} onClick={() => onChange([...value, ''])}>
        <Icon name="plus" /> Ajouter une ligne
      </button>
    </div>
  )
}

/** Liste d'éléments composés (titre + texte, image + légende…). */
export function ObjectList<T>({ value, onChange, template, itemTitle, renderItem }: { value: T[]; onChange: (v: T[]) => void; template: () => T; itemTitle: (item: T, index: number) => string; renderItem: (item: T, update: (next: T) => void, index: number) => ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      {value.map((item, index) => (
        <div key={index} className="rounded-2xl border border-line bg-stone/60 p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="min-w-0 truncate text-sm font-semibold text-ink-soft">
              <span className="mr-2 font-mono text-xs text-copper">{String(index + 1).padStart(2, '0')}</span>
              {itemTitle(item, index)}
            </span>
            <RowTools index={index} count={value.length} label={`l’élément ${index + 1}`} onMove={(to) => onChange(move(value, index, to))} onRemove={() => onChange(value.filter((_, i) => i !== index))} />
          </div>
          <div className="flex flex-col gap-4">{renderItem(item, (next) => onChange(value.map((x, i) => (i === index ? next : x))), index)}</div>
        </div>
      ))}
      <button type="button" className={cn(smallButton, 'self-start border-dashed')} onClick={() => onChange([...value, template()])}>
        <Icon name="plus" /> Ajouter un élément
      </button>
    </div>
  )
}

/** Barre d'enregistrement collée en bas de l'écran. */
export function SaveBar({ dirty, saving, message, error, onSave, children }: { dirty: boolean; saving: boolean; message?: string; error?: string; onSave: () => void; children?: ReactNode }) {
  return (
    <div className="sticky bottom-0 z-20 -mx-4 mt-8 border-t border-line bg-white/95 px-4 py-3 backdrop-blur sm:-mx-8 sm:px-8">
      <div className="flex flex-wrap items-center gap-3">
        <button type="button" onClick={onSave} disabled={saving} className="btn btn-cu min-h-11 px-6 text-[15px]">
          {saving ? 'Enregistrement…' : 'Enregistrer'}
        </button>
        {children}
        <span role="status" className="text-sm">
          {error ? <span className="font-semibold text-[#B42318]">{error}</span> : message ? <span className="font-semibold text-mal">{message}</span> : dirty ? <span className="text-ink-muted">Modifications non enregistrées</span> : null}
        </span>
      </div>
    </div>
  )
}
