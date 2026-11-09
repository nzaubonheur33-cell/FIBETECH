import { HttpError, ok, parseId, readJson, requireAdmin, route } from '@/lib/api'
import { isStatus, isSubmissionType } from '@/lib/admin/submissions'
import { prisma } from '@/lib/db'

type Ctx = { params: Promise<{ type: string; id: string }> }

async function target(ctx: Ctx) {
  const { type, id } = await ctx.params
  if (!isSubmissionType(type)) throw new HttpError(404, 'Type de demande inconnu.')
  return { type, id: parseId(id) }
}

/** Change le statut ou les notes internes d'une demande. */
export const PATCH = route(async (request: Request, ctx: Ctx) => {
  await requireAdmin()
  const { type, id } = await target(ctx)
  if (type === 'newsletter') throw new HttpError(400, 'Les inscriptions à la lettre n’ont pas de statut.')
  const body = (await readJson(request)) as { status?: unknown; notes?: unknown }
  const data: { status?: string; notes?: string | null } = {}
  if (body.status !== undefined) {
    if (!isStatus(body.status)) throw new HttpError(422, 'Statut inconnu.')
    data.status = body.status
  }
  if (body.notes !== undefined) {
    const notes = typeof body.notes === 'string' ? body.notes.trim().slice(0, 10_000) : ''
    data.notes = notes || null
  }
  const item = type === 'devis' ? await prisma.quoteRequest.update({ where: { id }, data }) : await prisma.trainingEnrollment.update({ where: { id }, data })
  return ok({ item: { id: item.id, status: item.status, notes: item.notes } })
})

export const DELETE = route(async (_request: Request, ctx: Ctx) => {
  await requireAdmin()
  const { type, id } = await target(ctx)
  if (type === 'devis') await prisma.quoteRequest.delete({ where: { id } })
  else if (type === 'inscriptions') await prisma.trainingEnrollment.delete({ where: { id } })
  else await prisma.newsletterSubscriber.delete({ where: { id } })
  return ok({})
})
