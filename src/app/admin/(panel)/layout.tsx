import type { ReactNode } from 'react'
import AdminShell from '@/components/admin/AdminShell'
import { requireAdminPage } from '@/lib/auth'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function PanelLayout({ children }: { children: ReactNode }) {
  const user = await requireAdminPage()
  const [devis, inscriptions] = await Promise.all([
    prisma.quoteRequest.count({ where: { status: 'nouveau' } }),
    prisma.trainingEnrollment.count({ where: { status: 'nouveau' } }),
  ])
  return (
    <AdminShell user={{ name: user.name, email: user.email }} counts={{ devis, inscriptions }}>
      {children}
    </AdminShell>
  )
}
