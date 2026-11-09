import { getBlock, getFaqAccordion, getSite, getTrainings } from '@/lib/content'
import { pageMetadata } from '@/lib/format'
import Training from '@/views/Training'

export async function generateMetadata() {
  return pageMetadata((await getBlock('training')).meta)
}

export default async function TrainingPage() {
  const [c, site, trainings, faq] = await Promise.all([getBlock('training'), getSite(), getTrainings(), getFaqAccordion('training')])
  return <Training c={c} site={site} trainings={trainings} faq={faq} />
}
