import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ContentEditor from '@/components/admin/ContentEditor'
import { PageHeader } from '@/components/admin/ui'
import { blockDefaults, blockRegistry, isBlockKey } from '@/content/blocks'
import { prisma } from '@/lib/db'
import { conform } from '@/lib/shape'

type Props = { params: Promise<{ key: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { key } = await params
  const block = blockRegistry.find((b) => b.key === key)
  return { title: block?.label ?? 'Contenu' }
}

export default async function EditContentPage({ params }: Props) {
  const { key } = await params
  if (!isBlockKey(key)) notFound()
  const block = blockRegistry.find((b) => b.key === key)
  const row = await prisma.contentBlock.findUnique({ where: { key } })
  const data = conform(blockDefaults[key], row?.data)

  return (
    <>
      <PageHeader title={block?.label ?? key} description={block?.description} back={{ href: '/admin/contenus', label: 'Textes des pages' }} />
      <ContentEditor blockKey={key} initial={data} publicPath={block?.path} />
    </>
  )
}
