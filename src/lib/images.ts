// Une image peut être :
// - un identifiant Unsplash (« photo-1509062522246-3755977927d7 ») ;
// - une URL complète (https://…) ;
// - une image envoyée depuis l'admin (« /uploads/2026/11/xxxx.webp »).

const SAFE_IMAGE = /^(https?:\/\/[^\s"'()<>\\]+|\/[^\s"'()<>\\]*|photo-[\w-]+)$/

export function isSafeImage(value: string) {
  return SAFE_IMAGE.test(value)
}

export function imageUrl(src: string | null | undefined, opts: { w?: number; h?: number; q?: number } = {}): string {
  const value = (src ?? '').trim()
  if (!value || !isSafeImage(value)) return ''
  if (value.startsWith('photo-')) {
    const params = new URLSearchParams({ auto: 'format', fit: 'crop' })
    if (opts.w) params.set('w', String(opts.w))
    if (opts.h) params.set('h', String(opts.h))
    params.set('q', String(opts.q ?? 85))
    return `https://images.unsplash.com/${value}?${params.toString()}`
  }
  return value
}
