import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { prisma } from './db'
import { SESSION_COOKIE, verifySessionToken } from './session'

export type AdminSession = { id: number; email: string; name: string }

export const hashPassword = (password: string) => bcrypt.hash(password, 12)
export const checkPassword = (password: string, hash: string) => bcrypt.compare(password, hash)

/** Règle commune pour tous les mots de passe de l'admin. */
export function passwordProblem(password: string): string | null {
  if (password.length < 10) return 'Le mot de passe doit contenir au moins 10 caractères.'
  if (password.length > 200) return 'Le mot de passe est trop long.'
  return null
}

/** Session de l'admin connecté, vérifiée en base (un compte supprimé perd l'accès aussitôt). */
export async function getAdminSession(): Promise<AdminSession | null> {
  const store = await cookies()
  const payload = await verifySessionToken(store.get(SESSION_COOKIE)?.value)
  if (!payload) return null
  try {
    const user = await prisma.adminUser.findUnique({ where: { id: payload.userId }, select: { id: true, email: true, name: true } })
    return user
  } catch (error) {
    console.error('[auth] Lecture du compte impossible :', error)
    return null
  }
}

/** Pour les pages de l'admin : renvoie vers la connexion si la session n'est pas valide. */
export async function requireAdminPage(): Promise<AdminSession> {
  const session = await getAdminSession()
  if (!session) redirect('/admin/login')
  return session
}
