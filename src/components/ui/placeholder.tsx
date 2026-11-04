import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * Valeur à remplacer avant la mise en ligne (prix, nom de client, témoignage…).
 * Rechercher « <Ph » dans le projet pour toutes les retrouver.
 */
export function Ph({ children, dark = false, wrap = false, className }: { children: ReactNode; dark?: boolean; wrap?: boolean; className?: string }) {
  return <span className={cn(dark ? 'ph-d' : 'ph', wrap && 'whitespace-normal', className)}>{children}</span>
}
