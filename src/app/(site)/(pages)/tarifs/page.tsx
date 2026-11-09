import { getBlock, getFaqAccordion, getPricingPlans } from '@/lib/content'
import { pageMetadata } from '@/lib/format'
import Pricing from '@/views/Pricing'

export async function generateMetadata() {
  return pageMetadata((await getBlock('pricing')).meta)
}

export default async function PricingPage() {
  const [c, shared, plans, faq] = await Promise.all([getBlock('pricing'), getBlock('shared'), getPricingPlans(), getFaqAccordion('pricing')])
  return <Pricing c={c} plans={plans} paymentMethods={shared.paymentMethods} faq={faq} />
}
