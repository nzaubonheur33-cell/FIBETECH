import { useId, useState } from 'react'
import { cn } from '@/lib/utils'
import { Plus } from './icons'

export type AccordionItem = { id: string; q: string; a: string; cat?: string }

type AccordionProps = {
  items: AccordionItem[]
  /** Identifiant de la question ouverte au départ ; `null` pour tout fermer. */
  defaultOpen?: string | null
  headingLevel?: 'h2' | 'h3'
  className?: string
}

export function Accordion({ items, defaultOpen, headingLevel = 'h3', className }: AccordionProps) {
  const uid = useId()
  const [open, setOpen] = useState<string | null>(defaultOpen === undefined ? (items[0]?.id ?? null) : defaultOpen)
  const Heading = headingLevel

  return (
    <div className={cn('border-b-[1.5px] border-ink', className)}>
      {items.map((item) => {
        const isOpen = open === item.id
        const buttonId = `${uid}-b-${item.id}`
        const panelId = `${uid}-p-${item.id}`
        return (
          <div key={item.id}>
            <Heading className="m-0 text-[length:inherit] tracking-normal">
              <button
                type="button"
                id={buttonId}
                className="acc-btn"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : item.id)}
              >
                <span className="flex flex-col gap-1.5">
                  {item.cat && <span className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-copper">{item.cat}</span>}
                  <span>{item.q}</span>
                </span>
                <span className="acc-icon" aria-hidden="true">
                  <Plus />
                </span>
              </button>
            </Heading>
            <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!isOpen}>
              <p className="reveal max-w-[700px] pb-6 text-[17px] text-ink-soft">{item.a}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
