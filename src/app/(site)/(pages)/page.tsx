import { getBlock, getServices, getSite } from '@/lib/content'
import { pageMetadata } from '@/lib/format'
import Home from '@/views/Home'

export async function generateMetadata() {
  return pageMetadata((await getBlock('home')).meta)
}

export default async function HomePage() {
  const [c, shared, site, services] = await Promise.all([getBlock('home'), getBlock('shared'), getSite(), getServices()])
  return <Home c={c} shared={shared} site={site} services={services} />
}
