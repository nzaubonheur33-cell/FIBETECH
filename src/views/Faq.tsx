'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { RichInline, RichTitle } from '@/components/rich'
import { Accordion, type AccordionItem } from '@/components/ui/accordion'
import { ButtonLink } from '@/components/ui/button'
import { SearchIcon } from '@/components/ui/icons'
import type { BlockData, SiteInfo } from '@/content/blocks'
import { phoneHref, siteTokens } from '@/lib/format'

// Recherche sans tenir compte des accents ni des majuscules.
const normalize = (text: string) => text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

export default function Faq({ c, site, items: all }: { c: BlockData<'faq'>; site: SiteInfo; items: (AccordionItem & { cat: string })[] }) {
  const [category, setCategory] = useState(c.hero.allLabel)
  const [query, setQuery] = useState('')
  const categories = [c.hero.allLabel, ...Array.from(new Set(all.map((item) => item.cat).filter(Boolean)))]

  const items = useMemo(() => {
    const q = normalize(query.trim())
    return all.filter((item) => (category === c.hero.allLabel || item.cat === category) && (!q || normalize(`${item.q} ${item.a}`).includes(q)))
  }, [all, c.hero.allLabel, category, query])

  return (
    <>
      <section aria-labelledby="page-title" className="border-b-[1.5px] border-ink bg-stone pb-12 pt-24">
        <div className="wrap flex flex-col items-center gap-[26px] text-center">
          <span className="eyebrow rise text-copper">{c.hero.eyebrow}</span>
          <h1 id="page-title" className="rise d1 text-[clamp(44px,6.4vw,92px)] font-extrabold leading-[0.95] tracking-[-0.045em]">
            <RichTitle text={c.hero.title} />
          </h1>
          <div className="rise d2 relative mt-2 w-[min(100%,680px)]">
            <label htmlFor="faq-search" className="sr-only-label">
              {c.hero.searchLabel}
            </label>
            <SearchIcon className="pointer-events-none absolute left-6 top-[21px] text-ink" />
            <input
              id="faq-search"
              type="search"
              autoComplete="off"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={c.hero.searchPlaceholder}
              className="min-h-16 w-full rounded-full border-[1.5px] border-ink bg-white pl-[60px] pr-6 text-lg text-ink transition-[box-shadow,transform] duration-200 placeholder:text-[#6B7570] focus:-translate-x-0.5 focus:-translate-y-0.5 focus:shadow-[6px_6px_0_#B4532A] focus:outline-none"
            />
          </div>
          {categories.length > 2 && (
            <div className="rise d3 flex flex-wrap justify-center gap-2.5" role="group" aria-label="Thèmes">
              {categories.map((cat) => (
                <button key={cat} type="button" className="chipbtn" aria-pressed={category === cat} onClick={() => setCategory(cat)}>
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <section aria-label="Réponses" className="pb-[120px] pt-[72px]">
        <div className="wrap max-w-[980px]">
          <p role="status" className="mb-[18px] font-mono text-[13px] text-ink-muted">
            {items.length} question{items.length > 1 ? 's' : ''}
          </p>
          {items.length ? (
            <Accordion key={`${category}-${query}`} items={items} headingLevel="h2" />
          ) : (
            <div className="flex flex-col items-start gap-3 rounded-[22px] border-[1.5px] border-dashed border-ink p-10">
              <p className="font-display text-[26px] font-bold">{c.empty.title}</p>
              <p className="text-ink-soft">{c.empty.text}</p>
              <Link href="/contact" className="font-semibold">
                {c.empty.link}
              </Link>
            </div>
          )}
        </div>
      </section>

      <section aria-labelledby="cta-title" className="bg-mal-deep py-[100px] text-white">
        <div className="wrap flex flex-wrap items-center justify-between gap-8">
          <div className="flex max-w-[700px] flex-col gap-3">
            <h2 id="cta-title" className="text-[clamp(32px,4.2vw,56px)] font-extrabold">
              <RichTitle text={c.cta.title} accentClassName="text-copper-light" />
            </h2>
            <p className="text-lg text-mal-fog">
              <RichInline text={c.cta.text} tokens={siteTokens(site)} dark />
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink to="/contact" variant="light-cu">
              {c.cta.button}
            </ButtonLink>
            <ButtonLink href={phoneHref(site.phone)} variant="line">
              {c.cta.callButton}
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  )
}
