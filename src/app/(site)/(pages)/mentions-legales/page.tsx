import { getBlock, getSite } from '@/lib/content'
import { pageMetadata, siteTokens } from '@/lib/format'
import LegalPage from '@/views/LegalPage'

export async function generateMetadata() {
  return pageMetadata((await getBlock('legal')).meta)
}

export default async function LegalNoticePage() {
  const [page, site] = await Promise.all([getBlock('legal'), getSite()])
  return <LegalPage page={page} tokens={siteTokens(site)} />
}
