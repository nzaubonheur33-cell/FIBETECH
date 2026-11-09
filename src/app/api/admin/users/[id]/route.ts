import { HttpError, ok, parseId, requireAdmin, route } from '@/lib/api'
import { prisma } from '@/lib/db'

type Ctx = { params: Promise<{ id: string }> }

export const DELETE = route(async (_request: Request, ctx: Ctx) => {
  const session = await requireAdmin()
  const id = parseId((await ctx.params).id)
  if (id === session.id) throw new HttpError(400, 'Vous ne pouvez pas supprimer votre propre compte.')
  if ((await prisma.adminUser.count()) <= 1) throw new HttpError(400, 'Il doit rester au moins un compte administrateur.')
  await prisma.adminUser.delete({ where: { id } })
  return ok({})
})
