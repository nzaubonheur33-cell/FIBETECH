import type { Prisma } from '@prisma/client'
import { blockDefaults, isBlockKey } from '@/content/blocks'
import { HttpError, ok, readJson, requireAdmin, route } from '@/lib/api'
import { prisma } from '@/lib/db'
import { revalidatePublicSite } from '@/lib/admin/revalidate-site'
import { conform, isPlainObject } from '@/lib/shape'

type Ctx = { params: Promise<{ key: string }> }

async function keyFrom(ctx: Ctx) {
  const { key } = await ctx.params
  if (!isBlockKey(key)) throw new HttpError(404, 'Contenu inconnu.')
  return key
}

export const GET = route(async (_request: Request, ctx: Ctx) => {
  await requireAdmin()
  const key = await keyFrom(ctx)
  const row = await prisma.contentBlock.findUnique({ where: { key } })
  return ok({ data: conform(blockDefaults[key], row?.data), updatedAt: row?.updatedAt ?? null })
})

/** Enregistre les textes d'une page. Les clés inconnues sont ignorées. */
export const PUT = route(async (request: Request, ctx: Ctx) => {
  await requireAdmin()
  const key = await keyFrom(ctx)
  const body = await readJson(request)
  if (!isPlainObject(body) || !isPlainObject(body.data)) throw new HttpError(400, 'Données invalides.')
  const data = conform(blockDefaults[key], body.data) as unknown as Prisma.InputJsonValue
  const row = await prisma.contentBlock.upsert({ where: { key }, create: { key, data }, update: { data } })
  revalidatePublicSite()
  return ok({ data: row.data, updatedAt: row.updatedAt })
})

/** Rétablit les textes d'origine. */
export const DELETE = route(async (_request: Request, ctx: Ctx) => {
  await requireAdmin()
  const key = await keyFrom(ctx)
  await prisma.contentBlock.deleteMany({ where: { key } })
  revalidatePublicSite()
  return ok({ data: blockDefaults[key] })
})
