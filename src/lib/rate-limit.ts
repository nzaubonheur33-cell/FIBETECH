// Limitation simple du nombre de requêtes, en mémoire (suffisant pour un seul serveur Node).

const buckets = new Map<string, { count: number; reset: number }>()

export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now()
  if (buckets.size > 5000) {
    for (const [k, bucket] of buckets) if (bucket.reset < now) buckets.delete(k)
  }
  const bucket = buckets.get(key)
  if (!bucket || bucket.reset < now) {
    buckets.set(key, { count: 1, reset: now + windowMs })
    return true
  }
  if (bucket.count >= limit) return false
  bucket.count += 1
  return true
}

export function resetRateLimit(key: string) {
  buckets.delete(key)
}

export function clientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  return forwarded || request.headers.get('x-real-ip') || 'local'
}
