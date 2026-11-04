import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type MarqueeProps<T> = {
  items: T[]
  render: (item: T) => ReactNode
  label?: string
  className?: string
  trackClassName?: string
  /** Nombre de copies de la liste (2 suffit pour une boucle sans à-coup). */
  copies?: number
  pauseOnHover?: boolean
}

/** Bandeau qui défile en boucle. Seule la première copie est lue par les lecteurs d'écran. */
export function Marquee<T>({ items, render, label, className, trackClassName, copies = 2, pauseOnHover = true }: MarqueeProps<T>) {
  const all = Array.from({ length: copies }, () => items).flat()
  return (
    <div className={cn('overflow-hidden', pauseOnHover && 'marquee-wrap', className)} aria-label={label} role={label ? 'region' : undefined}>
      <div className={cn('marquee', trackClassName)}>
        {all.map((item, i) => (
          <span key={i} aria-hidden={i >= items.length ? true : undefined} className="inline-flex">
            {render(item)}
          </span>
        ))}
      </div>
    </div>
  )
}
