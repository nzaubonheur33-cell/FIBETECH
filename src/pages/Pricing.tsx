import { useState } from 'react'
import { InkCta } from '@/components/layout/CtaBand'
import { Accordion } from '@/components/ui/accordion'
import { ButtonLink } from '@/components/ui/button'
import { Check } from '@/components/ui/icons'
import { Ph } from '@/components/ui/placeholder'
import { pricingFaq } from '@/data/faq'
import { assistancePlans, comparison, creationPlans, paymentMethods, type Plan } from '@/data/pricing'
import { usePageMeta } from '@/hooks/usePageMeta'
import { routes } from '@/lib/routes'
import { cn } from '@/lib/utils'

type Tab = 'creation' | 'assistance'

function PlanCard({ plan }: { plan: Plan }) {
  const dark = !!plan.recommended
  return (
    <article className={cn('card lift pop-in relative flex flex-col gap-5 px-8 py-9', dark && 'bg-ink text-white')}>
      {plan.recommended && <span className="chip absolute -top-4 left-7 bg-copper text-white">Recommandé</span>}
      <div className="flex flex-col gap-1.5">
        <h2 className="text-[32px] font-extrabold">{plan.name}</h2>
        <p className={dark ? 'text-mal-fog' : 'text-ink-soft'}>{plan.pitch}</p>
      </div>
      <div className={cn('flex flex-col gap-0.5 border-y py-[18px]', dark ? 'border-[#33403B]' : 'border-line')}>
        <span className={cn('text-sm', dark ? 'text-mal-fog' : 'text-ink-soft')}>{plan.price ? 'à partir de' : 'prix'}</span>
        <span className="font-display text-5xl font-extrabold leading-[1.05] tracking-[-0.03em]">
          {plan.price ? (
            <>
              <Ph dark={dark} className="text-[0.45em]">
                {plan.price}
              </Ph>{' '}
              ${plan.unit && <span className="text-[0.4em] font-semibold">{plan.unit}</span>}
            </>
          ) : (
            'Sur devis'
          )}
        </span>
      </div>
      <ul className="flex flex-grow flex-col gap-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <Check className={cn('mt-1 flex-none', dark ? 'text-mal-glow' : 'text-mal')} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <ButtonLink to={routes.contact} variant={dark ? 'light-cu' : 'ghost'} className="w-full">
        {plan.cta}
      </ButtonLink>
    </article>
  )
}

export default function Pricing() {
  usePageMeta('Tarifs', 'Tarifs des sites web, applications et abonnements d’assistance informatique de Fibetech à Lubumbashi.')
  const [tab, setTab] = useState<Tab>('creation')
  const plans = tab === 'creation' ? creationPlans : assistancePlans

  return (
    <>
      <section aria-labelledby="page-title" className="pb-16 pt-24">
        <div className="wrap flex flex-col items-center gap-[26px] text-center">
          <span className="eyebrow rise text-copper">Tarifs</span>
          <h1 id="page-title" className="rise d1 max-w-[980px] text-[clamp(42px,6vw,86px)] font-extrabold leading-[0.96] tracking-[-0.04em]">
            Des tarifs clairs. <span className="text-copper">Pas de surprise</span> sur la facture.
          </h1>
          <p className="rise d2 max-w-[620px] text-xl text-ink-soft">
            Chaque devis détaille ce qui est inclus, le délai et les conditions de paiement. Les prix ci-dessous sont des points de départ.
          </p>
          <div className="seg rise d3 mt-2.5" role="group" aria-label="Type de formule" data-active={tab === 'assistance' ? '1' : '0'}>
            <span className="seg-pill" aria-hidden="true" />
            <button type="button" aria-pressed={tab === 'creation'} onClick={() => setTab('creation')}>
              Création de site et d’app
            </button>
            <button type="button" aria-pressed={tab === 'assistance'} onClick={() => setTab('assistance')}>
              Assistance mensuelle
            </button>
          </div>
        </div>
      </section>

      <section aria-label="Formules" className="pb-[120px] pt-6">
        <div className="wrap">
          <div key={tab} className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] items-stretch gap-6">
            {plans.map((plan) => (
              <PlanCard key={plan.name} plan={plan} />
            ))}
          </div>
          <p className="mt-7 text-center text-[15px] text-ink-muted">Prix hors taxes. Paiement possible en plusieurs fois pour les projets de création.</p>
        </div>
      </section>

      <section aria-labelledby="compare-title" className="border-t-[1.5px] border-ink bg-stone py-[120px]">
        <div className="wrap flex flex-col gap-10">
          <div className="flex max-w-[760px] flex-col gap-[18px]">
            <span className="eyebrow text-copper">Comparer</span>
            <h2 id="compare-title" className="text-[clamp(36px,4.4vw,58px)] font-extrabold">
              Le détail des formules de création.
            </h2>
          </div>
          <div className="overflow-x-auto rounded-[22px] border-[1.5px] border-ink bg-white">
            <table className="w-full min-w-[720px] border-collapse text-base">
              <caption className="sr-only-label">Comparaison des formules Essentiel, Business et Sur mesure</caption>
              <thead>
                <tr className="bg-ink text-white">
                  <th scope="col" className="px-6 py-5 text-left font-semibold">
                    Inclus
                  </th>
                  <th scope="col" className="px-4 py-5 text-center font-display text-xl">
                    Essentiel
                  </th>
                  <th scope="col" className="bg-copper px-4 py-5 text-center font-display text-xl">
                    Business
                  </th>
                  <th scope="col" className="px-4 py-5 text-center font-display text-xl">
                    Sur mesure
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.label} className="trow">
                    <th scope="row" className="border-t border-line px-6 py-4 text-left font-medium">
                      {row.label}
                    </th>
                    {row.cells.map((cell, i) => (
                      <td key={i} className="border-t border-line p-4 text-center">
                        {cell === true && <Check size={22} strokeWidth={2.4} className="inline text-mal" aria-hidden={false} aria-label="Inclus" role="img" />}
                        {cell === false && (
                          <span aria-label="Non inclus" className="text-[#8A958F]">
                            —
                          </span>
                        )}
                        {typeof cell === 'string' && <Ph>{cell}</Ph>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section aria-labelledby="pay-title" className="border-t-[1.5px] border-ink py-24">
        <div className="wrap flex flex-wrap items-center justify-between gap-8">
          <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-3.5">
            <span className="eyebrow text-copper">Paiement</span>
            <h2 id="pay-title" className="text-[clamp(32px,3.6vw,48px)] font-extrabold">
              Payez comme vous voulez.
            </h2>
            <p className="text-ink-soft">Acompte au démarrage, solde à la mise en ligne. Les abonnements se règlent chaque mois ou chaque année.</p>
          </div>
          <ul className="flex min-w-0 flex-[1_1_520px] flex-wrap gap-3">
            {paymentMethods.map((method) => (
              <li key={method} className="chip min-h-[52px] border-[1.5px] border-ink bg-white px-[22px] text-base">
                {method}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="faq-title" className="border-t-[1.5px] border-ink bg-stone py-[120px]">
        <div className="wrap flex flex-wrap gap-14">
          <div className="flex min-w-0 flex-[1_1_320px] flex-col gap-[18px]">
            <span className="eyebrow text-copper">Questions sur les prix</span>
            <h2 id="faq-title" className="text-[clamp(36px,4.4vw,58px)] font-extrabold">
              Avant de demander un devis.
            </h2>
          </div>
          <Accordion items={pricingFaq} className="min-w-0 flex-[2_1_560px]" />
        </div>
      </section>

      <InkCta
        title={
          <>
            Pas sûr de la formule ? <span className="text-copper-light">On vous conseille.</span>
          </>
        }
        text="Un échange de 20 minutes suffit souvent pour savoir ce qu’il vous faut."
        cta="Réserver un échange"
      />
    </>
  )
}
