import { getBlock, getSite } from '@/lib/content'
import { pageMetadata, siteTokens } from '@/lib/format'
import LegalPage from '@/views/LegalPage'

export async function generateMetadata() {
  return pageMetadata((await getBlock('privacy')).meta)
}

export default async function PrivacyPage() {
  const [page, site] = await Promise.all([getBlock('privacy'), getSite()])
  return <LegalPage page={page} tokens={siteTokens(site)} />
}
