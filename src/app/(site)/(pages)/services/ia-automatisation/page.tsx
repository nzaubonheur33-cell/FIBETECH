import { getBlock, getFaq } from '@/lib/content'
import { pageMetadata } from '@/lib/format'
import ServiceDetail from '@/views/ServiceDetail'

export async function generateMetadata() {
  return pageMetadata((await getBlock('service-ia')).meta)
}

export default async function IaPage() {
  const [c, faq] = await Promise.all([getBlock('service-ia'), getFaq('ia')])
  return <ServiceDetail kind="ia" c={c} faq={faq} />
}
