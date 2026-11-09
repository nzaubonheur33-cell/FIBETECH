import { getBlock } from '@/lib/content'
import NotFound from '@/views/NotFound'

// Élément introuvable (projet ou article supprimé) : affiché avec le menu et le pied de page.
export default async function SiteNotFound() {
  return <NotFound c={await getBlock('not-found')} />
}
