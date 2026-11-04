import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Accordion } from '@/components/ui/accordion'
import { ButtonLink } from '@/components/ui/button'
import { SearchIcon } from '@/components/ui/icons'
import { faq, faqCategories, type FaqCategory } from '@/data/faq'
import { usePageMeta } from '@/hooks/usePageMeta'
import { routes } from '@/lib/routes'
import { site } from '@/lib/site'

// Recherche sans tenir compte des accents ni des majuscules.
const normalize = (text: string) => text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

export default function Faq() {
  usePageMeta('Questions fréquentes', 'Réponses aux questions fréquentes sur les projets web, l’assistance IT, le paiement et la sécurité chez Fibetech.')
  const [category, setCategory] = useState<'Tout' | FaqCategory>('Tout')
  const [query, setQuery] = useState('')

  const items = useMemo(() => {
    const q = normalize(query.trim())
    return faq.filter((item) => (category === 'Tout' || item.cat === category) && (!q || normalize(`${item.q} ${item.a}`).includes(q)))
  }, [category, query])

  return (
    <>
      <section aria-labelledby="page-title" className="border-b-[1.5px] border-ink bg-stone pb-12 pt-24">
        <div className="wrap flex flex-col items-center gap-[26px] text-center">
          <span className="eyebrow rise text-copper">Aide</span>
          <h1 id="page-title" className="rise d1 text-[clamp(44px,6.4vw,92px)] font-extrabold leading-[0.95] tracking-[-0.045em]">
            Questions fréquentes
          </h1>
          <div className="rise d2 relative mt-2 w-[min(100%,680px)]">
            <label htmlFor="faq-search" className="sr-only-label">
              Rechercher une question
            </label>
            <SearchIcon className="pointer-events-none absolute left-6 top-[21px] text-ink" />
            <input
              id="faq-search"
              type="search"
              autoComplete="off"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Rechercher : délai, paiement, Wi-Fi…"
              className="min-h-16 w-full rounded-full border-[1.5px] border-ink bg-white pl-[60px] pr-6 text-lg text-ink transition-[box-shadow,transform] duration-200 placeholder:text-[#6B7570] focus:-translate-x-0.5 focus:-translate-y-0.5 focus:shadow-[6px_6px_0_#B4532A] focus:outline-none"
            />
          </div>
          <div className="rise d3 flex flex-wrap justify-center gap-2.5" role="group" aria-label="Thèmes">
            {faqCategories.map((cat) => (
              <button key={cat} type="button" className="chipbtn" aria-pressed={category === cat} onClick={() => setCategory(cat)}>
                {cat}
              </button>
            ))}
          </div>
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
              <p className="font-display text-[26px] font-bold">Aucune réponse pour cette recherche.</p>
              <p className="text-ink-soft">Essayez un autre mot, ou posez directement votre question à l’équipe.</p>
              <Link to={routes.contact} className="font-semibold">
                Poser ma question
              </Link>
            </div>
          )}
        </div>
      </section>

      <section aria-labelledby="cta-title" className="bg-mal-deep py-[100px] text-white">
        <div className="wrap flex flex-wrap items-center justify-between gap-8">
          <div className="flex max-w-[700px] flex-col gap-3">
            <h2 id="cta-title" className="text-[clamp(32px,4.2vw,56px)] font-extrabold">
              Vous n’avez pas trouvé ?
            </h2>
            <p className="text-lg text-mal-fog">
              Appelez le <span className="font-mono">{site.phone}</span> ou écrivez-nous. On complète cette page avec vos questions.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink to={routes.contact} variant="light-cu">
              Nous écrire
            </ButtonLink>
            <ButtonLink href={site.phoneHref} variant="line">
              Appeler
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  )
}
