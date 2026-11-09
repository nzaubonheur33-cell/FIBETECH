import { getBlock, getProjects, getServices, getSite, getTestimonials } from '@/lib/content'
import { pageMetadata } from '@/lib/format'
import Home from '@/views/Home'

export async function generateMetadata() {
  return pageMetadata((await getBlock('home')).meta)
}

export default async function HomePage() {
  const [c, shared, site, services, projects, testimonials] = await Promise.all([getBlock('home'), getBlock('shared'), getSite(), getServices(), getProjects(), getTestimonials()])
  return <Home c={c} shared={shared} site={site} services={services} projects={projects} testimonials={testimonials} />
}
