import { getBlock, getFaqAccordion, getSite } from '@/lib/content'
import { pageMetadata } from '@/lib/format'
import Faq from '@/views/Faq'

export async function generateMetadata() {
  return pageMetadata((await getBlock('faq')).meta)
}

export default async function FaqPage() {
  const [c, site, items] = await Promise.all([getBlock('faq'), getSite(), getFaqAccordion('general')])
  return <Faq c={c} site={site} items={items} />
}
