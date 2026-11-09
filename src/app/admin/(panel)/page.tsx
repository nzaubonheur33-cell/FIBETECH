import type { Metadata } from 'next'
import Link from 'next/link'
import { Card, PageHeader } from '@/components/admin/ui'
import { collections } from '@/lib/admin/collections'
import { delegate } from '@/lib/admin/models'
import { requireAdminPage } from '@/lib/auth'
import { prisma } from '@/lib/db'

export const metadata: Metadata = { title: 'Tableau de bord' }

const dateFormat = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Africa/Lubumbashi' })

export default async function Dashboard() {
  const user = await requireAdminPage()
  const [newQuotes, newEnrollments, subscribers, latestQuotes, latestEnrollments, counts] = await Promise.all([
    prisma.quoteRequest.count({ where: { status: 'nouveau' } }),
    prisma.trainingEnrollment.count({ where: { status: 'nouveau' } }),
    prisma.newsletterSubscriber.count(),
    prisma.quoteRequest.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
    prisma.trainingEnrollment.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
    Promise.all(collections.map((c) => delegate(c.model).count())),
  ])

  const stats = [
    { label: 'Nouvelles demandes de devis', value: newQuotes, href: '/admin/demandes', accent: newQuotes > 0 },
    { label: 'Nouvelles inscriptions', value: newEnrollments, href: '/admin/inscriptions', accent: newEnrollments > 0 },
    { label: 'Abonnés à la lettre', value: subscribers, href: '/admin/newsletter', accent: false },
  ]

  return (
    <>
      <PageHeader title={`Bonjour ${user.name.split(' ')[0]}`} description="Modifiez les textes et les listes du site, et suivez les demandes reçues." />

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href} className="rounded-2xl border border-line bg-white p-5 text-ink no-underline transition hover:-translate-y-0.5 hover:border-ink hover:text-ink">
            <span className={`block font-display text-[44px] font-extrabold leading-none ${stat.accent ? 'text-copper' : ''}`}>{stat.value}</span>
            <span className="mt-2 block text-sm text-ink-soft">{stat.label}</span>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <Card>
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-xl font-bold">Dernières demandes de devis</h2>
            <Link href="/admin/demandes" className="text-sm font-semibold">
              Tout voir
            </Link>
          </div>
          {latestQuotes.length ? (
            <ul className="m-0 flex list-none flex-col divide-y divide-line p-0">
              {latestQuotes.map((q) => (
                <li key={q.id} className="flex flex-wrap items-center justify-between gap-2 py-2.5 text-[15px]">
                  <span className="min-w-0">
                    <span className="font-semibold">{q.name}</span> <span className="text-ink-muted">· {q.phone}</span>
                  </span>
                  <span className="font-mono text-xs text-ink-muted">
                    {q.status === 'nouveau' && <span className="mr-2 rounded-full bg-copper px-2 py-0.5 font-sans text-[11px] font-bold text-white">Nouvelle</span>}
                    {dateFormat.format(q.createdAt)}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-ink-muted">Aucune demande pour le moment.</p>
          )}
        </Card>
        <Card>
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-xl font-bold">Dernières inscriptions</h2>
            <Link href="/admin/inscriptions" className="text-sm font-semibold">
              Tout voir
            </Link>
          </div>
          {latestEnrollments.length ? (
            <ul className="m-0 flex list-none flex-col divide-y divide-line p-0">
              {latestEnrollments.map((e) => (
                <li key={e.id} className="flex flex-wrap items-center justify-between gap-2 py-2.5 text-[15px]">
                  <span className="min-w-0">
                    <span className="font-semibold">{e.name}</span> <span className="text-ink-muted">· {e.trainingTitle}</span>
                  </span>
                  <span className="font-mono text-xs text-ink-muted">{dateFormat.format(e.createdAt)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-ink-muted">Aucune inscription pour le moment.</p>
          )}
        </Card>
      </div>

      <h2 className="mb-4 mt-10 text-xl font-bold">Contenus du site</h2>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Link href="/admin/contenus" className="rounded-2xl border border-ink bg-ink p-5 text-white no-underline hover:text-white">
          <span className="block text-lg font-bold">Textes des pages</span>
          <span className="mt-1 block text-sm text-mal-fog">Titres, paragraphes, menus, coordonnées</span>
        </Link>
        {collections.map((c, i) => (
          <Link key={c.name} href={`/admin/listes/${c.name}`} className="rounded-2xl border border-line bg-white p-5 text-ink no-underline transition hover:border-ink hover:text-ink">
            <span className="block text-lg font-bold">{c.label}</span>
            <span className="mt-1 block text-sm text-ink-muted">
              {counts[i]} élément{counts[i] > 1 ? 's' : ''}
            </span>
          </Link>
        ))}
      </div>
    </>
  )
}
