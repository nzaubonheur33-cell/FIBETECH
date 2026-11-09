import type { Metadata } from 'next'
import AccountsPanel from '@/components/admin/AccountsPanel'
import { PageHeader } from '@/components/admin/ui'
import { requireAdminPage } from '@/lib/auth'
import { prisma } from '@/lib/db'

export const metadata: Metadata = { title: 'Comptes' }

export default async function AccountsPage() {
  const me = await requireAdminPage()
  const rows = await prisma.adminUser.findMany({ orderBy: { createdAt: 'asc' }, select: { id: true, name: true, email: true, createdAt: true, lastLoginAt: true } })
  const users = rows.map((u) => ({ ...u, createdAt: u.createdAt.toISOString(), lastLoginAt: u.lastLoginAt?.toISOString() ?? null }))
  return (
    <>
      <PageHeader title="Comptes et mot de passe" description="Les personnes qui peuvent se connecter à l’administration." />
      <AccountsPanel users={users} me={{ id: me.id, name: me.name }} />
    </>
  )
}
