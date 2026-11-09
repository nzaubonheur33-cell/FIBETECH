import { revalidatePath, revalidateTag } from 'next/cache'
import { PUBLIC_CONTENT_CACHE_TAG } from '@/lib/content'

/** Invalide les pages publiques après une modification enregistrée dans l’admin. */
export function revalidatePublicSite() {
  revalidateTag(PUBLIC_CONTENT_CACHE_TAG)
  revalidatePath('/', 'layout')
}
