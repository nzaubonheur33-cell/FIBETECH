'use client'

import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { blockDefaults, type BlockKey } from '@/content/blocks'
import { hintFor, labelFor, longKeys } from '@/lib/admin/labels'
import { sendJson } from '@/lib/client-api'
import { emptyLike, isPlainObject } from '@/lib/shape'
import { cn } from '@/lib/utils'
import { FieldShell, Icon, IconSelect, ImageInput, ObjectList, SaveBar, smallButton, StringList, TextArea, TextInput } from './inputs'
import { useUnsavedWarning } from './useUnsaved'

type Json = unknown

const isImageKey = (key: string) => key === 'image' || key === 'avatar' || key === 'photo'

/** Titre d'un élément de liste : sa première valeur texte non vide. */
function itemTitle(item: Json): string {
  if (!isPlainObject(item)) return ''
  for (const key of ['title', 'label', 'name', 'question']) if (typeof item[key] === 'string' && item[key]) return String(item[key])
  const first = Object.values(item).find((v) => typeof v === 'string' && v)
  return typeof first === 'string' ? first.slice(0, 80) : 'Nouvel élément'
}

function Node({ name, path, shape, value, onChange, depth }: { name: string; path: string; shape: Json; value: Json; onChange: (v: Json) => void; depth: number }) {
  const id = `c-${path.replace(/\./g, '-')}`

  if (typeof shape === 'string') {
    const text = typeof value === 'string' ? value : ''
    const label = labelFor(name)
    const hint = hintFor(path, name)
    if (name === 'icon')
      return (
        <FieldShell id={id} label={label} hint={hint}>
          <IconSelect id={id} value={text} onChange={onChange} />
        </FieldShell>
      )
    if (isImageKey(name))
      return (
        <FieldShell id={id} label={label} hint={hint}>
          <ImageInput id={id} value={text} onChange={onChange} />
        </FieldShell>
      )
    const long = longKeys.has(name) || shape.length > 110 || text.length > 110
    return (
      <FieldShell id={id} label={label} hint={hint}>
        {long ? <TextArea id={id} value={text} onChange={onChange} rows={name === 'body' ? 8 : Math.min(8, Math.max(2, Math.ceil(text.length / 90)))} /> : <TextInput id={id} value={text} onChange={onChange} />}
      </FieldShell>
    )
  }

  if (Array.isArray(shape)) {
    const template = shape[0]
    const list = Array.isArray(value) ? value : []
    const label = labelFor(name, 'list')
    const hint = hintFor(path, name)
    if (template === undefined || typeof template === 'string') {
      return (
        <FieldShell id={id} label={label} hint={hint}>
          <StringList id={id} value={list.filter((v): v is string => typeof v === 'string')} onChange={onChange} long={name === 'paragraphs'} />
        </FieldShell>
      )
    }
    return (
      <FieldShell label={label} hint={hint}>
        <ObjectList<Json>
          value={list}
          onChange={onChange}
          template={() => emptyLike(template)}
          itemTitle={itemTitle}
          renderItem={(item, update, index) =>
            Object.keys(template as Record<string, unknown>).map((key) => (
              <Node
                key={key}
                name={key}
                path={`${path}.${index}.${key}`}
                shape={(template as Record<string, unknown>)[key]}
                value={isPlainObject(item) ? item[key] : undefined}
                onChange={(v) => update({ ...(isPlainObject(item) ? item : {}), [key]: v })}
                depth={depth + 1}
              />
            ))
          }
        />
      </FieldShell>
    )
  }

  if (isPlainObject(shape)) {
    const current = isPlainObject(value) ? value : {}
    const children = Object.keys(shape).map((key) => (
      <Node key={key} name={key} path={path ? `${path}.${key}` : key} shape={shape[key]} value={current[key]} onChange={(v) => onChange({ ...current, [key]: v })} depth={depth + 1} />
    ))
    if (depth === 0) return <div className="flex flex-col gap-5">{children}</div>
    if (depth === 1)
      return (
        <details open className="group rounded-2xl border border-line bg-white shadow-[0_1px_2px_rgba(18,22,20,0.04)]">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 sm:px-6">
            <span className="font-display text-xl font-bold">{labelFor(name, 'section')}</span>
            <span className="text-sm text-ink-muted group-open:hidden">Afficher</span>
            <span className="hidden text-sm text-ink-muted group-open:inline">Replier</span>
          </summary>
          <div className="flex flex-col gap-5 border-t border-line px-5 pb-6 pt-5 sm:px-6">{children}</div>
        </details>
      )
    return (
      <fieldset className="m-0 flex flex-col gap-4 rounded-xl border border-line bg-white/70 p-4">
        <legend className="px-1 text-sm font-bold text-copper-deep">{labelFor(name, 'section')}</legend>
        {children}
      </fieldset>
    )
  }

  return null
}

export default function ContentEditor({ blockKey, initial, publicPath }: { blockKey: BlockKey; initial: Json; publicPath?: string }) {
  const router = useRouter()
  const shape = blockDefaults[blockKey] as Record<string, unknown>
  const [data, setData] = useState<Json>(initial)
  const [saved, setSaved] = useState<Json>(initial)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const dirty = useMemo(() => JSON.stringify(data) !== JSON.stringify(saved), [data, saved])
  useUnsavedWarning(dirty)

  // Les champs simples du premier niveau sont regroupés dans une carte « Général ».
  const topKeys = Object.keys(shape)
  const simpleKeys = topKeys.filter((key) => !isPlainObject(shape[key]))
  const sectionKeys = topKeys.filter((key) => isPlainObject(shape[key]))
  const current = isPlainObject(data) ? data : {}
  const set = (key: string, v: Json) => {
    setMessage('')
    setData({ ...current, [key]: v })
  }

  const save = async () => {
    setSaving(true)
    setError('')
    const result = await sendJson<{ data: Json }>(`/api/admin/content/${blockKey}`, { data }, 'PUT')
    setSaving(false)
    if (!result.ok) {
      setError(result.message)
      return
    }
    setData(result.data)
    setSaved(result.data)
    setMessage('Enregistré ✓ Les changements sont en ligne.')
    router.refresh()
  }

  const reset = async () => {
    if (!window.confirm('Rétablir tous les textes d’origine de cette page ? Vos modifications seront perdues.')) return
    const result = await sendJson<{ data: Json }>(`/api/admin/content/${blockKey}`, undefined, 'DELETE')
    if (!result.ok) {
      setError(result.message)
      return
    }
    setData(result.data)
    setSaved(result.data)
    setMessage('Textes d’origine rétablis.')
    router.refresh()
  }

  return (
    <div className="flex flex-col gap-5">
      {simpleKeys.length > 0 && (
        <div className="flex flex-col gap-5 rounded-2xl border border-line bg-white p-5 shadow-[0_1px_2px_rgba(18,22,20,0.04)] sm:p-6">
          {simpleKeys.map((key) => (
            <Node key={key} name={key} path={key} shape={shape[key]} value={current[key]} onChange={(v) => set(key, v)} depth={1} />
          ))}
        </div>
      )}
      {sectionKeys.map((key) => (
        <Node key={key} name={key} path={key} shape={shape[key]} value={current[key]} onChange={(v) => set(key, v)} depth={1} />
      ))}
      <SaveBar dirty={dirty} saving={saving} message={message} error={error} onSave={save}>
        {publicPath && (
          <a href={publicPath} target="_blank" rel="noreferrer" className={smallButton}>
            Voir la page <Icon name="external" size={14} />
          </a>
        )}
        <button type="button" className={cn(smallButton, 'ml-auto')} onClick={reset}>
          Rétablir les textes d’origine
        </button>
      </SaveBar>
    </div>
  )
}
