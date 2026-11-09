// Accès générique aux tables des contenus en liste (côté serveur uniquement).
import { prisma } from '@/lib/db'
import type { ModelName } from './collections'

type Row = Record<string, unknown> & { id: number }

/** Méthodes Prisma communes à toutes les tables de contenus. */
export type Delegate = {
  findMany(args?: unknown): Promise<Row[]>
  findUnique(args: unknown): Promise<Row | null>
  create(args: unknown): Promise<Row>
  update(args: unknown): Promise<Row>
  delete(args: unknown): Promise<Row>
  aggregate(args: unknown): Promise<{ _max: { position: number | null } }>
  count(args?: unknown): Promise<number>
}

export function delegate(model: ModelName): Delegate {
  const map = {
    service: prisma.service,
    project: prisma.project,
    post: prisma.post,
    training: prisma.training,
    pricingPlan: prisma.pricingPlan,
    faqItem: prisma.faqItem,
    testimonial: prisma.testimonial,
    teamMember: prisma.teamMember,
  }
  return map[model] as unknown as Delegate
}

/** Rend une ligne transmissible au navigateur (dates en texte). */
export function serializeRow(row: Row): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(row)) {
    if (value instanceof Date) out[key] = key === 'publishedAt' ? value.toISOString().slice(0, 10) : value.toISOString()
    else out[key] = value
  }
  return out
}
