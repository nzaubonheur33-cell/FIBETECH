'use client'

import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { getCollection } from '@/lib/admin/collections'
import { emptyValue, slugify, type FieldDef } from '@/lib/admin/fields'
import { sendJson } from '@/lib/client-api'
import { cn } from '@/lib/utils'
import { FieldShell, Icon, IconSelect, ImageInput, inputClass, ObjectList, SaveBar, SelectInput, smallButton, StringList, TextArea, TextInput, Toggle } from './inputs'
import { useUnsavedWarning } from './useUnsaved'

type Values = Record<string, unknown>

const str = (v: unknown) => (typeof v === 'string' ? v : v === null || v === undefined ? '' : String(v))

function FieldControl({ field, value, onChange, error, idPrefix }: { field: FieldDef; value: unknown; onChange: (v: unknown) => void; error?: string; idPrefix: string }) {
  const id = `${idPrefix}-${field.name}`
  const invalid = Boolean(error)
  switch (field.type) {
    case 'boolean':
      return (
        <div className="flex flex-col gap-1">
          <Toggle id={id} checked={Boolean(value)} onChange={onChange} label={field.label} />
          {field.help && <p className="text-[13px] text-ink-muted">{field.help}</p>}
        </div>
      )
    case 'textarea':
      return (
        <FieldShell id={id} label={field.label} hint={field.help} error={error}>
          <TextArea id={id} value={str(value)} onChange={onChange} rows={field.rows ?? 4} maxLength={field.max} placeholder={field.placeholder} invalid={invalid} />
        </FieldShell>
      )
    case 'select':
      return (
        <FieldShell id={id} label={field.label} hint={field.help} error={error}>
          <SelectInput id={id} value={str(value)} onChange={onChange} options={field.options ?? []} />
        </FieldShell>
      )
    case 'icon':
      return (
        <FieldShell id={id} label={field.label} hint={field.help} error={error}>
          <IconSelect id={id} value={str(value)} onChange={onChange} />
        </FieldShell>
      )
    case 'image':
      return (
        <FieldShell id={id} label={field.label} hint={field.help} error={error}>
          <ImageInput id={id} value={str(value)} onChange={onChange} />
        </FieldShell>
      )
    case 'number':
      return (
        <FieldShell id={id} label={field.label} hint={field.help} error={error}>
          <input id={id} type="number" className={cn(inputClass, 'w-32')} min={field.min} max={field.maxValue} value={str(value)} onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))} />
        </FieldShell>
      )
    case 'date':
      return (
        <FieldShell id={id} label={field.label} hint={field.help} error={error}>
          <TextInput id={id} type="date" value={str(value).slice(0, 10)} onChange={onChange} invalid={invalid} />
        </FieldShell>
      )
    case 'strings':
      return (
        <FieldShell id={id} label={field.label} hint={field.help} error={error}>
          <StringList id={id} value={Array.isArray(value) ? value.map(str) : []} onChange={onChange} maxLength={field.max} />
        </FieldShell>
      )
    case 'objects': {
      const sub = field.fields ?? []
      const items = (Array.isArray(value) ? value : []) as Values[]
      return (
        <FieldShell label={field.label} hint={field.help} error={error}>
          <ObjectList<Values>
            value={items}
            onChange={onChange}
            template={() => Object.fromEntries(sub.map((f) => [f.name, emptyValue(f)]))}
            itemTitle={(item) => str(item[sub[0]?.name ?? '']) || 'Nouvel élément'}
            renderItem={(item, update, index) =>
              sub.map((f) => <FieldControl key={f.name} field={f} value={item[f.name]} idPrefix={`${idPrefix}-${field.name}-${index}`} onChange={(v) => update({ ...item, [f.name]: v })} />)
            }
          />
        </FieldShell>
      )
    }
    default:
      return (
        <FieldShell id={id} label={field.label} hint={field.help} error={error}>
          <TextInput id={id} value={str(value)} onChange={onChange} maxLength={field.max} placeholder={field.placeholder} invalid={invalid} />
        </FieldShell>
      )
  }
}

export default function RecordForm({ collection, id, initial }: { collection: string; id: number | null; initial: Values }) {
  const def = getCollection(collection)
  const router = useRouter()
  const [values, setValues] = useState<Values>(initial)
  const [saved, setSaved] = useState<Values>(initial)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [formError, setFormError] = useState('')
  const [slugTouched, setSlugTouched] = useState(id !== null)
  const dirty = useMemo(() => JSON.stringify(values) !== JSON.stringify(saved), [values, saved])
  useUnsavedWarning(dirty)

  if (!def) return null

  const setField = (name: string, value: unknown) => {
    setMessage('')
    setValues((current) => {
      const next = { ...current, [name]: value }
      // Adresse générée automatiquement depuis le titre, tant qu'elle n'a pas été modifiée à la main.
      if (def.slugFrom && name === def.slugFrom.source && !slugTouched) next[def.slugFrom.slug] = slugify(String(value ?? ''))
      return next
    })
    if (def.slugFrom && name === def.slugFrom.slug) setSlugTouched(true)
  }

  const save = async () => {
    setSaving(true)
    setMessage('')
    setFormError('')
    const url = id ? `/api/admin/collections/${def.name}/${id}` : `/api/admin/collections/${def.name}`
    const result = await sendJson<{ item: Values }>(url, values, id ? 'PUT' : 'POST')
    setSaving(false)
    if (!result.ok) {
      setErrors(result.errors ?? {})
      setFormError(result.message)
      return
    }
    setErrors({})
    setSaved(values)
    setSlugTouched(true)
    setMessage('Enregistré ✓')
    if (!id) router.replace(`/admin/listes/${def.name}/${String(result.item.id)}`)
    router.refresh()
  }

  const remove = async () => {
    if (!id || !window.confirm(`Supprimer définitivement ce ${def.singular} ? Cette action est irréversible.`)) return
    const result = await sendJson(`/api/admin/collections/${def.name}/${id}`, undefined, 'DELETE')
    if (!result.ok) {
      setFormError(result.message)
      return
    }
    setSaved(values)
    router.push(`/admin/listes/${def.name}`)
    router.refresh()
  }

  const publicPath = id && saved.published ? def.publicPath?.(saved) : null

  return (
    <div>
      <div className="grid gap-x-6 gap-y-5 rounded-2xl border border-line bg-white p-5 shadow-[0_1px_2px_rgba(18,22,20,0.04)] sm:p-7 md:grid-cols-2">
        {def.fields.map((field) => (
          <div key={field.name} className={cn(field.wide || field.type === 'objects' || field.type === 'strings' || field.type === 'textarea' ? 'md:col-span-2' : '')}>
            <FieldControl field={field} value={values[field.name]} error={errors[field.name]} idPrefix="f" onChange={(v) => setField(field.name, v)} />
            {Object.entries(errors)
              .filter(([key]) => key.startsWith(`${field.name}.`))
              .slice(0, 3)
              .map(([key, text]) => (
                <p key={key} className="mt-1 text-[13px] font-semibold text-[#B42318]">
                  Élément {Number(key.split('.')[1]) + 1} : {text}
                </p>
              ))}
          </div>
        ))}
      </div>
      <SaveBar dirty={dirty} saving={saving} message={message} error={formError} onSave={save}>
        {publicPath && (
          <a href={publicPath} target="_blank" rel="noreferrer" className={smallButton}>
            Voir sur le site <Icon name="external" size={14} />
          </a>
        )}
        {id && (
          <button type="button" className={cn(smallButton, 'ml-auto hover:border-[#B42318] hover:text-[#B42318]')} onClick={remove}>
            <Icon name="trash" /> Supprimer
          </button>
        )}
      </SaveBar>
    </div>
  )
}
