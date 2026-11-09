import { HttpError, ok, parseId, readJson, requireAdmin, route } from '@/lib/api'
import { getCollection } from '@/lib/admin/collections'
import { validateRecord } from '@/lib/admin/fields'
import { delegate, serializeRow } from '@/lib/admin/models'
import { revalidatePublicSite } from '@/lib/admin/revalidate-site'

type Ctx = { params: Promise<{ name: string; id: string }> }

async function target(ctx: Ctx) {
  const { name, id } = await ctx.params
  const def = getCollection(name)
  if (!def) throw new HttpError(404, 'Liste inconnue.')
  return { def, id: parseId(id), model: delegate(def.model) }
}

export const GET = route(async (_request: Request, ctx: Ctx) => {
  await requireAdmin()
  const { id, model } = await target(ctx)
  const item = await model.findUnique({ where: { id } })
  if (!item) throw new HttpError(404, 'Élément introuvable.')
  return ok({ item: serializeRow(item) })
})

/** Remplace toutes les valeurs de l'élément. */
export const PUT = route(async (request: Request, ctx: Ctx) => {
  await requireAdmin()
  const { def, id, model } = await target(ctx)
  const { data, errors, valid } = validateRecord(def.fields, await readJson(request))
  if (!valid) throw new HttpError(422, 'Certains champs sont à corriger.', errors)
  const item = await model.update({ where: { id }, data })
  revalidatePublicSite()
  return ok({ item: serializeRow(item) })
})

/** Modifie seulement les champs envoyés (ex. publier / masquer). */
export const PATCH = route(async (request: Request, ctx: Ctx) => {
  await requireAdmin()
  const { def, id, model } = await target(ctx)
  const { data, errors, valid } = validateRecord(def.fields, await readJson(request), true)
  if (!valid) throw new HttpError(422, 'Certains champs sont à corriger.', errors)
  if (!Object.keys(data).length) throw new HttpError(400, 'Aucune modification envoyée.')
  const item = await model.update({ where: { id }, data })
  revalidatePublicSite()
  return ok({ item: serializeRow(item) })
})

export const DELETE = route(async (_request: Request, ctx: Ctx) => {
  await requireAdmin()
  const { id, model } = await target(ctx)
  await model.delete({ where: { id } })
  revalidatePublicSite()
  return ok({})
})
