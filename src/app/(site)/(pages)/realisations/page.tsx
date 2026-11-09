import { getBlock, getProjects } from '@/lib/content'
import { pageMetadata } from '@/lib/format'
import Work from '@/views/Work'

export async function generateMetadata() {
  return pageMetadata((await getBlock('work')).meta)
}

export default async function WorkPage() {
  const [c, projects] = await Promise.all([getBlock('work'), getProjects()])
  return <Work c={c} projects={projects} />
}
