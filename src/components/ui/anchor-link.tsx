'use client'

import type { ReactNode } from 'react'
import { scrollToId } from '@/lib/utils'

/** Lien vers une section de la même page, avec un défilement doux. */
export function AnchorLink({ target, className, children }: { target: string; className?: string; children: ReactNode }) {
  return (
    <a
      href={`#${target}`}
      className={className}
      onClick={(event) => {
        event.preventDefault()
        scrollToId(target)
      }}
    >
      {children}
    </a>
  )
}
