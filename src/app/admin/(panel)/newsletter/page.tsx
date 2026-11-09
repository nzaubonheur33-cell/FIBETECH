import type { Metadata } from 'next'
import NewsletterList from '@/components/admin/NewsletterList'
import { PageHeader } from '@/components/admin/ui'
import { prisma } from '@/lib/db'

export const metadata: Metadata = { title: 'Lettre d’information' }

export default async function NewsletterPage() {
  const rows = await prisma.newsletterSubscriber.findMany({ orderBy: { createdAt: 'desc' } })
  const items = rows.map((r) => ({ id: r.id, email: r.email, source: r.source, createdAt: r.createdAt.toISOString() }))
  return (
    <>
      <PageHeader title="Lettre d’information" description={`${items.length} adresse${items.length > 1 ? 's' : ''} inscrite${items.length > 1 ? 's' : ''} depuis le pied de page et le blog. Exportez-les vers votre outil d’envoi (Brevo, Mailchimp…).`} />
      <NewsletterList items={items} />
    </>
  )
}
