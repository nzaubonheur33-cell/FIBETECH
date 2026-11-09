import { getBlock, getSite } from '@/lib/content'
import { pageMetadata } from '@/lib/format'
import Contact from '@/views/Contact'

export async function generateMetadata() {
  return pageMetadata((await getBlock('contact')).meta)
}

export default async function ContactPage() {
  const [c, site] = await Promise.all([getBlock('contact'), getSite()])
  return <Contact c={c} site={site} />
}
