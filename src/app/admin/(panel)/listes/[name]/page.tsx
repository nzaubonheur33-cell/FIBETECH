import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import CollectionList from '@/components/admin/CollectionList'
import { PageHeader } from '@/components/admin/ui'
import { getCollection } from '@/lib/admin/collections'
import { delegate, serializeRow } from '@/lib/admin/models'

type Props = { params: Promise<{ name: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return { title: getCollection((await params).name)?.label ?? 'Liste' }
}

export default async function CollectionPage({ params }: Props) {
  const def = getCollection((await params).name)
  if (!def) notFound()
  const rows = await delegate(def.model).findMany({ orderBy: [{ position: 'asc' }, { id: 'asc' }] })
  const items = rows.map(serializeRow) as (Record<string, unknown> & { id: number })[]

  return (
    <>
      <PageHeader
        title={def.label}
        description={def.description}
        actions={
          <Link href={`/admin/listes/${def.name}/nouveau`} className="btn btn-cu min-h-11 px-5 text-[15px] no-underline">
            + Ajouter
          </Link>
        }
      />
      <CollectionList collection={def.name} items={items} />
    </>
  )
}
