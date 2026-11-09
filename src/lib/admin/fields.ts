// Description des champs d'un formulaire de l'admin.
// La même description sert à afficher le formulaire et à valider les données côté serveur.
import { iconNames } from '@/components/ui/icons'
import { isSafeImage } from '@/lib/images'

export type Option = { value: string; label: string }

export type FieldType =
  | 'text' // ligne de texte
  | 'textarea' // texte long
  | 'slug' // identifiant d'URL : lettres minuscules, chiffres et tirets
  | 'image' // identifiant Unsplash, URL ou image envoyée
  | 'icon' // nom d'icône
  | 'select' // liste de choix
  | 'boolean' // case à cocher
  | 'number' // nombre entier
  | 'date' // date AAAA-MM-JJ
  | 'strings' // liste de textes
  | 'objects' // liste d'éléments composés (sous-champs)

export type FieldDef = {
  name: string
  label: string
  type: FieldType
  required?: boolean
  help?: string
  placeholder?: string
  /** Longueur maximale (texte). */
  max?: number
  rows?: number
  options?: Option[]
  /** Sous-champs d'une liste d'éléments (`objects`). */
  fields?: FieldDef[]
  /** Champ vide enregistré comme NULL (ex. prix « sur devis »). */
  nullable?: boolean
  min?: number
  maxValue?: number
  /** Occupe toute la largeur du formulaire. */
  wide?: boolean
}

export const iconOptions: Option[] = iconNames.map((name) => ({ value: name, label: name }))

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

const asString = (value: unknown) => (typeof value === 'string' ? value.replace(/\r\n/g, '\n').trim() : typeof value === 'number' ? String(value) : '')

function defaultMax(field: FieldDef) {
  if (field.max) return field.max
  if (field.type === 'textarea') return 20_000
  if (field.type === 'image') return 512
  return 191
}

function validateValue(field: FieldDef, raw: unknown, path: string, errors: Record<string, string>): unknown {
  switch (field.type) {
    case 'boolean':
      return raw === true || raw === 'true' || raw === 'on' || raw === 1
    case 'number': {
      const n = typeof raw === 'number' ? raw : Number(asString(raw))
      if (!Number.isFinite(n)) {
        if (field.required) errors[path] = 'Indiquez un nombre.'
        return field.min ?? 0
      }
      let value = Math.round(n)
      if (field.min !== undefined && value < field.min) value = field.min
      if (field.maxValue !== undefined && value > field.maxValue) value = field.maxValue
      return value
    }
    case 'date': {
      const s = asString(raw)
      if (!s) {
        if (field.required) errors[path] = 'Choisissez une date.'
        return null
      }
      if (!/^\d{4}-\d{2}-\d{2}/.test(s) || Number.isNaN(new Date(`${s.slice(0, 10)}T12:00:00Z`).getTime())) {
        errors[path] = 'Date invalide (format AAAA-MM-JJ).'
        return null
      }
      return new Date(`${s.slice(0, 10)}T12:00:00Z`)
    }
    case 'strings': {
      const list = Array.isArray(raw) ? raw : []
      const values = list.map(asString).filter(Boolean)
      if (values.some((v) => v.length > defaultMax(field))) errors[path] = `Chaque élément doit faire moins de ${defaultMax(field)} caractères.`
      if (field.required && !values.length) errors[path] = 'Ajoutez au moins un élément.'
      return values.slice(0, 100)
    }
    case 'objects': {
      const list = Array.isArray(raw) ? raw : []
      const sub = field.fields ?? []
      const items = list
        .filter((item): item is Record<string, unknown> => typeof item === 'object' && item !== null && !Array.isArray(item))
        .slice(0, 100)
        .map((item, index) => {
          const out: Record<string, unknown> = {}
          for (const f of sub) out[f.name] = validateValue(f, item[f.name], `${path}.${index}.${f.name}`, errors)
          return out
        })
        // Un élément entièrement vide est ignoré.
        .filter((item) => Object.values(item).some((v) => (typeof v === 'string' ? v !== '' : Array.isArray(v) ? v.length > 0 : v !== null && v !== false)))
      if (field.required && !items.length) errors[path] = 'Ajoutez au moins un élément.'
      return items
    }
    case 'select': {
      const s = asString(raw)
      const options = field.options ?? []
      if (options.some((o) => o.value === s)) return s
      if (field.required || s) errors[path] = 'Choisissez une valeur dans la liste.'
      return options[0]?.value ?? ''
    }
    default: {
      const s = asString(raw)
      if (!s) {
        if (field.required) errors[path] = 'Ce champ est obligatoire.'
        return field.nullable ? null : ''
      }
      if (s.length > defaultMax(field)) errors[path] = `${defaultMax(field)} caractères maximum (actuellement ${s.length}).`
      if (field.type === 'slug' && !SLUG.test(s)) errors[path] = 'Uniquement des lettres minuscules sans accent, des chiffres et des tirets (ex. : mon-projet).'
      if (field.type === 'image' && !isSafeImage(s)) errors[path] = 'Indiquez une adresse commençant par https:// ou /uploads/, ou un identifiant Unsplash « photo-… ».'
      if (field.type === 'icon' && !iconNames.includes(s as (typeof iconNames)[number])) errors[path] = 'Icône inconnue.'
      return s
    }
  }
}

/**
 * Valide et nettoie des données envoyées par l'admin.
 * `partial` : seuls les champs présents sont validés (ex. bascule « publié »).
 */
export function validateRecord(fields: FieldDef[], input: unknown, partial = false) {
  const source = typeof input === 'object' && input !== null && !Array.isArray(input) ? (input as Record<string, unknown>) : {}
  const data: Record<string, unknown> = {}
  const errors: Record<string, string> = {}
  for (const field of fields) {
    if (partial && !(field.name in source)) continue
    data[field.name] = validateValue(field, source[field.name], field.name, errors)
  }
  return { data, errors, valid: Object.keys(errors).length === 0 }
}

/** Valeur vide d'un champ (nouvel élément). */
export function emptyValue(field: FieldDef): unknown {
  switch (field.type) {
    case 'boolean':
      return false
    case 'number':
      return field.min ?? 0
    case 'strings':
    case 'objects':
      return []
    case 'select':
      return field.options?.[0]?.value ?? ''
    case 'date':
      return ''
    default:
      return ''
  }
}

/** Mot-clé d'URL à partir d'un titre : « Gestion d'école » → « gestion-d-ecole ». */
export function slugify(text: string) {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 100)
}
