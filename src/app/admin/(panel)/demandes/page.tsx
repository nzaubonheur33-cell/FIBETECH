import type { Metadata } from 'next'
import SubmissionList, { type Submission } from '@/components/admin/SubmissionList'
import { PageHeader } from '@/components/admin/ui'
import { prisma } from '@/lib/db'
import { stringList } from '@/lib/shape'

export const metadata: Metadata = { title: 'Demandes de devis' }

export default async function QuotesPage() {
  const rows = await prisma.quoteRequest.findMany({ orderBy: { createdAt: 'desc' }, take: 1000 })
  const items: Submission[] = rows.map((r) => {
    const services = stringList(r.services)
    return {
      id: r.id,
      createdAt: r.createdAt.toISOString(),
      status: r.status,
      notes: r.notes,
      name: r.name,
      phone: r.phone,
      email: r.email,
      organisation: r.organisation,
      message: r.message,
      title: services.length ? services.join(', ') : 'Services à préciser',
      details: [
        { label: 'Services', value: services.join(', ') },
        { label: 'Budget', value: r.budget },
        { label: 'Recontacter par', value: r.contactPreference },
      ],
    }
  })

  return (
    <>
      <PageHeader title="Demandes de devis" description="Les demandes envoyées depuis la page Contact. Changez le statut pour suivre leur traitement." />
      <SubmissionList type="devis" items={items} />
    </>
  )
}
