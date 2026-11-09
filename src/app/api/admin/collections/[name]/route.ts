import { HttpError, ok, readJson, requireAdmin, route } from '@/lib/api'
import { getCollection } from '@/lib/admin/collections'
import { validateRecord } from '@/lib/admin/fields'
import { delegate, serializeRow } from '@/lib/admin/models'
import { revalidatePublicSite } from '@/lib/admin/revalidate-site'

type Ctx = { params: Promise<{ name: string }> }

async function collectionFrom(ctx: Ctx) {
  const def = getCollection((await ctx.params).name)
  if (!def) throw new HttpError(404, 'Liste inconnue.')
  return def
}

/** Tous les éléments d'une liste (publiés ou non), dans l'ordre d'affichage. */
export const GET = route(async (_request: Request, ctx: Ctx) => {
  await requireAdmin()
  const def = await collectionFrom(ctx)
  const rows = await delegate(def.model).findMany({ orderBy: [{ position: 'asc' }, { id: 'asc' }] })
  return ok({ items: rows.map(serializeRow) })
})

/** Ajoute un élément à la fin de la liste. */
export const POST = route(async (request: Request, ctx: Ctx) => {
  await requireAdmin()
  const def = await collectionFrom(ctx)
  const { data, errors, valid } = validateRecord(def.fields, await readJson(request))
  if (!valid) throw new HttpError(422, 'Certains champs sont à corriger.', errors)
  const model = delegate(def.model)
  const max = await model.aggregate({ _max: { position: true } })
  const item = await model.create({ data: { ...data, position: (max._max.position ?? 0) + 1 } })
  revalidatePublicSite()
  return ok({ item: serializeRow(item) }, 201)
})
