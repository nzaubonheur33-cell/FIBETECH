import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import RecordForm from '@/components/admin/RecordForm'
import { PageHeader } from '@/components/admin/ui'
import { getCollection } from '@/lib/admin/collections'
import { emptyValue } from '@/lib/admin/fields'
import { delegate, serializeRow } from '@/lib/admin/models'

type Props = { params: Promise<{ name: string; id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { name, id } = await params
  const def = getCollection(name)
  return { title: def ? (id === 'nouveau' ? `Nouveau ${def.singular}` : def.label) : 'Élément' }
}

export default async function RecordPage({ params }: Props) {
  const { name, id } = await params
  const def = getCollection(name)
  if (!def) notFound()

  let initial: Record<string, unknown>
  let recordId: number | null = null
  if (id === 'nouveau') {
    initial = Object.fromEntries(def.fields.map((f) => [f.name, f.name === 'published' ? true : emptyValue(f)]))
  } else {
    recordId = Number(id)
    if (!Number.isInteger(recordId) || recordId <= 0) notFound()
    const row = await delegate(def.model).findUnique({ where: { id: recordId } })
    if (!row) notFound()
    const data = serializeRow(row)
    // Seuls les champs du formulaire sont transmis à l'éditeur.
    initial = Object.fromEntries(def.fields.map((f) => [f.name, data[f.name] ?? emptyValue(f)]))
  }

  const title = id === 'nouveau' ? `Nouveau ${def.singular}` : String(initial[def.titleField] || def.singular)

  return (
    <>
      <PageHeader title={title} back={{ href: `/admin/listes/${def.name}`, label: def.label }} />
      <RecordForm key={recordId ?? 'new'} collection={def.name} id={recordId} initial={initial} />
    </>
  )
}
