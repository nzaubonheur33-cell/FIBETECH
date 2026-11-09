import { getBlock, getFaq } from '@/lib/content'
import { pageMetadata } from '@/lib/format'
import ServiceDetail from '@/views/ServiceDetail'

export async function generateMetadata() {
  return pageMetadata((await getBlock('service-reseau')).meta)
}

export default async function ReseauPage() {
  const [c, faq] = await Promise.all([getBlock('service-reseau'), getFaq('reseau')])
  return <ServiceDetail kind="reseau" c={c} faq={faq} />
}
