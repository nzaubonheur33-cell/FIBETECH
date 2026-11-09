import { HttpError, ok, readJson, requireAdmin, route } from '@/lib/api'
import { hashPassword, passwordProblem } from '@/lib/auth'
import { prisma } from '@/lib/db'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const GET = route(async () => {
  await requireAdmin()
  const users = await prisma.adminUser.findMany({ orderBy: { createdAt: 'asc' }, select: { id: true, email: true, name: true, createdAt: true, lastLoginAt: true } })
  return ok({ users })
})

/** Crée un compte administrateur. */
export const POST = route(async (request: Request) => {
  await requireAdmin()
  const body = (await readJson(request)) as Record<string, unknown>
  const name = String(body.name ?? '').trim()
  const email = String(body.email ?? '').trim().toLowerCase()
  const password = String(body.password ?? '')
  const errors: Record<string, string> = {}
  if (!name) errors.name = 'Indiquez un nom.'
  else if (name.length > 120) errors.name = '120 caractères maximum.'
  if (!EMAIL.test(email) || email.length > 191) errors.email = 'Adresse e-mail invalide.'
  const problem = passwordProblem(password)
  if (problem) errors.password = problem
  if (Object.keys(errors).length) throw new HttpError(422, 'Certains champs sont à corriger.', errors)

  const user = await prisma.adminUser.create({ data: { name, email, passwordHash: await hashPassword(password) }, select: { id: true, email: true, name: true, createdAt: true, lastLoginAt: true } })
  return ok({ user }, 201)
})
