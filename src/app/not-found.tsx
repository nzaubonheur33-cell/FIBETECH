import type { Metadata } from 'next'
import SiteChrome from '@/components/layout/SiteChrome'
import { getBlock } from '@/lib/content'
import NotFound from '@/views/NotFound'

export const metadata: Metadata = { title: 'Page introuvable' }

// Adresse inconnue : même en-tête que le site, sans le pied de page.
export default async function RootNotFound() {
  const c = await getBlock('not-found')
  return (
    <SiteChrome footer={false}>
      <NotFound c={c} />
    </SiteChrome>
  )
}
