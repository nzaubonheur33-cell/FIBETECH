// Outils communs aux formulaires publics (devis, inscription, lettre d'information).
import { HttpError } from './api'
import { clientIp, rateLimit } from './rate-limit'

export const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const isPhone = (value: string) => /^\+?\d{9,15}$/.test(value.replace(/[\s.-]/g, ''))

export const text = (value: unknown, max: number) => (typeof value === 'string' ? value.replace(/\r\n/g, '\n').trim().slice(0, max) : '')

/** Refuse les envois trop fréquents et ceux des robots (champ caché « website » rempli). */
export function guard(request: Request, body: Record<string, unknown>, name: string, limit = 6) {
  if (text(body.website, 200)) throw new HttpError(400, 'Envoi refusé.')
  if (!rateLimit(`${name}:${clientIp(request)}`, limit, 10 * 60_000)) throw new HttpError(429, 'Trop d’envois en peu de temps. Réessayez dans quelques minutes, ou appelez-nous.')
}
