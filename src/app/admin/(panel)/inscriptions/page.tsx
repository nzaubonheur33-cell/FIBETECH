import type { Metadata } from 'next'
import SubmissionList, { type Submission } from '@/components/admin/SubmissionList'
import { PageHeader } from '@/components/admin/ui'
import { prisma } from '@/lib/db'

export const metadata: Metadata = { title: 'Inscriptions aux formations' }

export default async function EnrollmentsPage() {
  const rows = await prisma.trainingEnrollment.findMany({ orderBy: { createdAt: 'desc' }, take: 1000 })
  const items: Submission[] = rows.map((r) => ({
    id: r.id,
    createdAt: r.createdAt.toISOString(),
    status: r.status,
    notes: r.notes,
    name: r.name,
    phone: r.phone,
    email: r.email,
    organisation: r.organisation,
    message: r.message,
    title: `${r.trainingTitle}${r.format ? ` · ${r.format}` : ''} · ${r.participants} participant${r.participants > 1 ? 's' : ''}`,
    details: [
      { label: 'Formation', value: r.trainingTitle },
      { label: 'Format', value: r.format },
      { label: 'Participants', value: String(r.participants) },
    ],
  }))

  return (
    <>
      <PageHeader title="Inscriptions aux formations" description="Les demandes envoyées depuis le formulaire de la page Formations." />
      <SubmissionList type="inscriptions" items={items} />
    </>
  )
}
