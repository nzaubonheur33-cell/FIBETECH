import { getBlock, getFaqAccordion } from '@/lib/content'
import { pageMetadata } from '@/lib/format'
import ServiceWeb from '@/views/ServiceWeb'

export async function generateMetadata() {
  return pageMetadata((await getBlock('service-web')).meta)
}

export default async function ServiceWebPage() {
  const [c, faq] = await Promise.all([getBlock('service-web'), getFaqAccordion('web')])
  return <ServiceWeb c={c} faq={faq} />
}
