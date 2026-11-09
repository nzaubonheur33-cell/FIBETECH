// Aligne un document JSON (venant de la base ou de l'admin) sur la forme des textes par défaut :
// mêmes clés, mêmes types. Les clés inconnues sont ignorées, les clés absentes reprennent
// la valeur par défaut. Les éléments de liste incomplets reçoivent des valeurs vides.

const MAX_STRING = 50_000
const MAX_ITEMS = 300

export function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export function conform<T>(shape: T, value: unknown, fill: 'default' | 'empty' = 'default'): T {
  if (typeof shape === 'string') {
    if (typeof value === 'string') return value.slice(0, MAX_STRING) as T
    return (fill === 'default' ? shape : '') as T
  }
  if (typeof shape === 'number') {
    if (typeof value === 'number' && Number.isFinite(value)) return value as T
    return (fill === 'default' ? shape : 0) as T
  }
  if (typeof shape === 'boolean') {
    if (typeof value === 'boolean') return value as T
    return (fill === 'default' ? shape : false) as T
  }
  if (Array.isArray(shape)) {
    if (!Array.isArray(value)) return (fill === 'default' ? shape : []) as T
    const template: unknown = shape[0]
    const items = value.slice(0, MAX_ITEMS)
    if (template === undefined || typeof template === 'string') {
      return items.filter((item): item is string => typeof item === 'string').map((item) => item.slice(0, MAX_STRING)) as T
    }
    return items.filter(isPlainObject).map((item) => conform(template, item, 'empty')) as T
  }
  if (isPlainObject(shape)) {
    const source = isPlainObject(value) ? value : {}
    const out: Record<string, unknown> = {}
    for (const key of Object.keys(shape)) out[key] = conform(shape[key], source[key], fill)
    return out as T
  }
  return shape
}

/** Valeur « vide » de même forme (pour ajouter un élément à une liste dans l'admin). */
export function emptyLike<T>(shape: T): T {
  if (typeof shape === 'string') return '' as T
  if (typeof shape === 'number') return 0 as T
  if (typeof shape === 'boolean') return false as T
  if (Array.isArray(shape)) return [] as T
  if (isPlainObject(shape)) {
    const out: Record<string, unknown> = {}
    for (const key of Object.keys(shape)) out[key] = emptyLike(shape[key])
    return out as T
  }
  return shape
}

/** Lit un champ JSON de la base comme une liste de textes. */
export function stringList(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : []
}

/** Lit un champ JSON de la base comme une liste d'objets de même forme que `template`. */
export function objectList<T extends Record<string, unknown>>(value: unknown, template: T): T[] {
  return Array.isArray(value) ? value.filter(isPlainObject).map((item) => conform(template, item, 'empty')) : []
}
