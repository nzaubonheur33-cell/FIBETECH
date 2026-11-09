import { HttpError, ok, readJson, requireAdmin, route } from '@/lib/api'
import { checkPassword, hashPassword, passwordProblem } from '@/lib/auth'
import { prisma } from '@/lib/db'

/** Modifie le nom ou le mot de passe du compte connecté (mot de passe actuel obligatoire). */
export const PUT = route(async (request: Request) => {
  const session = await requireAdmin()
  const body = (await readJson(request)) as Record<string, unknown>
  const current = String(body.currentPassword ?? '')
  const name = String(body.name ?? '').trim()
  const next = String(body.newPassword ?? '')

  const user = await prisma.adminUser.findUnique({ where: { id: session.id } })
  if (!user) throw new HttpError(401, 'Votre session a expiré. Reconnectez-vous.')
  if (!(await checkPassword(current, user.passwordHash))) throw new HttpError(422, 'Le mot de passe actuel est incorrect.', { currentPassword: 'Mot de passe incorrect.' })

  const data: { name?: string; passwordHash?: string } = {}
  if (name && name !== user.name) {
    if (name.length > 120) throw new HttpError(422, 'Nom trop long.', { name: '120 caractères maximum.' })
    data.name = name
  }
  if (next) {
    const problem = passwordProblem(next)
    if (problem) throw new HttpError(422, problem, { newPassword: problem })
    data.passwordHash = await hashPassword(next)
  }
  if (!Object.keys(data).length) throw new HttpError(400, 'Aucune modification.')
  await prisma.adminUser.update({ where: { id: user.id }, data })
  return ok({})
})
