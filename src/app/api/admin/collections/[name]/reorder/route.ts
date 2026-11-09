import type { Prisma } from '@prisma/client'
import { HttpError, ok, readJson, requireAdmin, route } from '@/lib/api'
import { getCollection } from '@/lib/admin/collections'
import { delegate } from '@/lib/admin/models'
import { prisma } from '@/lib/db'
import { revalidatePublicSite } from '@/lib/admin/revalidate-site'

type Ctx = { params: Promise<{ name: string }> }

/** Enregistre un nouvel ordre d'affichage : { ids: [3, 1, 2] }. */
export const POST = route(async (request: Request, ctx: Ctx) => {
  await requireAdmin()
  const def = getCollection((await ctx.params).name)
  if (!def) throw new HttpError(404, 'Liste inconnue.')
  const body = (await readJson(request)) as { ids?: unknown }
  const ids = Array.isArray(body.ids) ? body.ids.map(Number).filter((id) => Number.isInteger(id) && id > 0) : []
  if (!ids.length || ids.length > 1000 || new Set(ids).size !== ids.length) throw new HttpError(400, 'Ordre invalide.')
  const model = delegate(def.model)
  const updates = ids.map((id, index) => model.update({ where: { id }, data: { position: index + 1 } })) as unknown as Prisma.PrismaPromise<unknown>[]
  await prisma.$transaction(updates)
  revalidatePublicSite()
  return ok({})
})
