import { Prisma } from '@prisma/client'
import { NextResponse } from 'next/server'
import { getAdminSession, type AdminSession } from './auth'

export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
    public errors?: Record<string, string>,
  ) {
    super(message)
  }
}

export const ok = <T extends Record<string, unknown>>(data: T, status = 200) => NextResponse.json({ ok: true, ...data }, { status })

export function fail(status: number, message: string, errors?: Record<string, string>) {
  return NextResponse.json({ ok: false, message, errors }, { status })
}

/** Lit un corps JSON en limitant sa taille. */
export async function readJson(request: Request, maxBytes = 2_000_000): Promise<unknown> {
  const declared = Number(request.headers.get('content-length') || 0)
  if (declared > maxBytes) throw new HttpError(413, 'Les données envoyées sont trop volumineuses.')
  const text = await request.text()
  if (text.length > maxBytes) throw new HttpError(413, 'Les données envoyées sont trop volumineuses.')
  try {
    return JSON.parse(text) as unknown
  } catch {
    throw new HttpError(400, 'Données invalides.')
  }
}

export async function requireAdmin(): Promise<AdminSession> {
  const session = await getAdminSession()
  if (!session) throw new HttpError(401, 'Votre session a expiré. Reconnectez-vous.')
  return session
}

export function parseId(value: string): number {
  const id = Number(value)
  if (!Number.isInteger(id) || id <= 0) throw new HttpError(404, 'Élément introuvable.')
  return id
}

/** Transforme les erreurs connues (validation, base de données) en réponses JSON lisibles. */
export function handleError(error: unknown) {
  if (error instanceof HttpError) return fail(error.status, error.message, error.errors)
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') return fail(409, 'Cette valeur est déjà utilisée par un autre élément (identifiant ou adresse en double).')
    if (error.code === 'P2025') return fail(404, 'Élément introuvable. Il a peut-être été supprimé.')
  }
  // P1xxx : serveur MySQL injoignable, délai dépassé, connexion coupée…
  const unreachable = error instanceof Prisma.PrismaClientKnownRequestError && error.code.startsWith('P1')
  if (unreachable || error instanceof Prisma.PrismaClientInitializationError) {
    console.error('[api] Base de données injoignable :', error instanceof Error ? error.message : error)
    return fail(503, 'Le service est momentanément indisponible (base de données injoignable). Réessayez dans quelques minutes.')
  }
  console.error('[api]', error)
  return fail(500, 'Une erreur inattendue est survenue.')
}

/** Enveloppe un gestionnaire de route : toute erreur devient une réponse JSON. */
export function route<A extends unknown[]>(handler: (...args: A) => Promise<Response>) {
  return async (...args: A): Promise<Response> => {
    try {
      return await handler(...args)
    } catch (error) {
      return handleError(error)
    }
  }
}
