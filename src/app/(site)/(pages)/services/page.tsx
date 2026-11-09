import { getBlock, getServices, getSite } from '@/lib/content'
import { pageMetadata } from '@/lib/format'
import Services from '@/views/Services'

export async function generateMetadata() {
  return pageMetadata((await getBlock('services')).meta)
}

export default async function ServicesPage() {
  const [c, shared, site, services] = await Promise.all([getBlock('services'), getBlock('shared'), getSite(), getServices()])
  return <Services c={c} shared={shared} site={site} services={services} />
}
