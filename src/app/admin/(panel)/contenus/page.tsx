import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader } from '@/components/admin/ui'
import { blockRegistry } from '@/content/blocks'
import { prisma } from '@/lib/db'

export const metadata: Metadata = { title: 'Textes des pages' }

const dateFormat = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Africa/Lubumbashi' })

export default async function ContentsPage() {
  const rows = await prisma.contentBlock.findMany({ select: { key: true, updatedAt: true } })
  const updated = new Map(rows.map((r) => [r.key, r.updatedAt]))
  const groups = Array.from(new Set(blockRegistry.map((b) => b.group)))

  return (
    <>
      <PageHeader
        title="Textes des pages"
        description={
          <>
            Chaque page du site, section par section. Dans les titres, mettez des <code>*mots*</code> entre astérisques pour les colorer ; un texte entre <code>[crochets]</code> est surligné comme « à compléter ».
          </>
        }
      />
      {groups.map((group) => (
        <section key={group} className="mb-8">
          <h2 className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.14em] text-copper">{group}</h2>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {blockRegistry
              .filter((b) => b.group === group)
              .map((block) => {
                const at = updated.get(block.key)
                return (
                  <Link key={block.key} href={`/admin/contenus/${block.key}`} className="flex flex-col gap-1.5 rounded-2xl border border-line bg-white p-5 text-ink no-underline transition hover:-translate-y-0.5 hover:border-ink hover:text-ink">
                    <span className="flex items-center justify-between gap-2">
                      <span className="text-lg font-bold">{block.label}</span>
                      {block.path && <span className="font-mono text-xs text-ink-muted">{block.path}</span>}
                    </span>
                    <span className="text-sm text-ink-soft">{block.description}</span>
                    <span className="mt-1 text-xs text-ink-muted">{at ? `Modifié le ${dateFormat.format(at)}` : 'Textes d’origine'}</span>
                  </Link>
                )
              })}
          </div>
        </section>
      ))}
    </>
  )
}
