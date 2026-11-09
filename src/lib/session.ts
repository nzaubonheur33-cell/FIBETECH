// Jeton de session de l'admin (JWT signé, stocké dans un cookie httpOnly).
// Ce fichier n'utilise que `jose` : il fonctionne aussi dans le middleware.
import { jwtVerify, SignJWT } from 'jose'

export const SESSION_COOKIE = 'fibetech_admin'
export const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7 // 7 jours

export type SessionPayload = { userId: number; email: string; name: string }

function secretKey(): Uint8Array | null {
  const secret = process.env.AUTH_SECRET
  if (!secret || secret.length < 32) return null
  return new TextEncoder().encode(secret)
}

export function hasAuthSecret() {
  return secretKey() !== null
}

export async function createSessionToken(payload: SessionPayload): Promise<string> {
  const key = secretKey()
  if (!key) throw new Error('AUTH_SECRET manquant ou trop court (32 caractères minimum) dans le fichier .env')
  return new SignJWT({ email: payload.email, name: payload.name })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(String(payload.userId))
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(key)
}

export async function verifySessionToken(token: string | undefined | null): Promise<SessionPayload | null> {
  const key = secretKey()
  if (!token || !key) return null
  try {
    const { payload } = await jwtVerify(token, key, { algorithms: ['HS256'] })
    const userId = Number(payload.sub)
    if (!Number.isInteger(userId) || userId <= 0) return null
    return { userId, email: String(payload.email ?? ''), name: String(payload.name ?? '') }
  } catch {
    return null
  }
}

export function sessionCookieOptions(maxAge = SESSION_DURATION_SECONDS) {
  return {
    httpOnly: true,
    sameSite: 'lax' as const,
    // Mettre COOKIE_SECURE=false uniquement si le site est servi sans HTTPS.
    secure: process.env.NODE_ENV === 'production' && process.env.COOKIE_SECURE !== 'false',
    path: '/',
    maxAge,
  }
}
