import { HttpError, requireAdmin, route } from '@/lib/api'
import { isSubmissionType, statuses } from '@/lib/admin/submissions'
import { prisma } from '@/lib/db'
import { stringList } from '@/lib/shape'

type Ctx = { params: Promise<{ type: string }> }

// Échappe une cellule CSV ; neutralise les formules (=, +, -, @) à l'ouverture dans un tableur.
function cell(value: unknown): string {
  let text = value === null || value === undefined ? '' : value instanceof Date ? value.toISOString().replace('T', ' ').slice(0, 16) : String(value)
  if (/^[=+\-@\t\r]/.test(text)) text = `'${text}`
  return `"${text.replace(/"/g, '""')}"`
}

const statusLabel = (value: string) => statuses.find((s) => s.value === value)?.label ?? value

/** Export CSV (séparateur « ; », ouvrable dans Excel). */
export const GET = route(async (_request: Request, ctx: Ctx) => {
  await requireAdmin()
  const { type } = await ctx.params
  if (!isSubmissionType(type)) throw new HttpError(404, 'Type de demande inconnu.')

  let rows: unknown[][]
  if (type === 'devis') {
    const items = await prisma.quoteRequest.findMany({ orderBy: { createdAt: 'desc' } })
    rows = [
      ['Date', 'Statut', 'Nom', 'Organisation', 'Téléphone', 'E-mail', 'Services', 'Budget', 'Recontacter par', 'Message', 'Notes'],
      ...items.map((i) => [i.createdAt, statusLabel(i.status), i.name, i.organisation, i.phone, i.email, stringList(i.services).join(', '), i.budget, i.contactPreference, i.message, i.notes]),
    ]
  } else if (type === 'inscriptions') {
    const items = await prisma.trainingEnrollment.findMany({ orderBy: { createdAt: 'desc' } })
    rows = [
      ['Date', 'Statut', 'Formation', 'Format', 'Participants', 'Nom', 'Téléphone', 'E-mail', 'Organisation', 'Message', 'Notes'],
      ...items.map((i) => [i.createdAt, statusLabel(i.status), i.trainingTitle, i.format, i.participants, i.name, i.phone, i.email, i.organisation, i.message, i.notes]),
    ]
  } else {
    const items = await prisma.newsletterSubscriber.findMany({ orderBy: { createdAt: 'desc' } })
    rows = [['Date', 'E-mail', 'Formulaire'], ...items.map((i) => [i.createdAt, i.email, i.source])]
  }

  const csv = '﻿' + rows.map((row) => row.map(cell).join(';')).join('\r\n')
  const date = new Date().toISOString().slice(0, 10)
  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="fibetech-${type}-${date}.csv"`,
      'Cache-Control': 'no-store',
    },
  })
})
