import { getBlock, getSite, getTeam } from '@/lib/content'
import { pageMetadata } from '@/lib/format'
import About from '@/views/About'

export async function generateMetadata() {
  return pageMetadata((await getBlock('about')).meta)
}

export default async function AboutPage() {
  const [c, site, team] = await Promise.all([getBlock('about'), getSite(), getTeam()])
  return <About c={c} site={site} team={team} />
}
