import { useState } from 'react'
import { InkCta } from '@/components/layout/CtaBand'
import { Accordion } from '@/components/ui/accordion'
import { ButtonLink } from '@/components/ui/button'
import { Check } from '@/components/ui/icons'
import { pricingFaq } from '@/data/faq'
import { assistancePlans, creationPlans, paymentMethods, type Plan } from '@/data/pricing'
import { usePageMeta } from '@/hooks/usePageMeta'
import { routes } from '@/lib/routes'

type Tab = 'creation' | 'assistance'

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <article className="card lift pop-in relative flex flex-col gap-5 px-8 py-9">
      <div className="flex flex-col gap-1.5">
        <h2 className="text-[32px] font-extrabold">{plan.name}</h2>
        <p className="text-ink-soft">{plan.pitch}</p>
      </div>
      <div className="flex flex-col gap-0.5 border-y border-line py-[18px]">
        <span className="text-sm text-ink-soft">{plan.price ? 'à partir de' : 'prix'}</span>
        <span className="font-display text-[64px] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink">
          {plan.price ? (
            <>
              <span>{plan.price}</span>{' '}
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
            <Check className="mt-1 flex-none text-mal" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <ButtonLink to={routes.contact} variant="ghost" className="w-full">
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
              Réseaux, IA et automatisation
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
          <p className="mt-7 text-center text-[15px] text-ink-muted">Les prix affichés sont des prix de départ. Les réseaux, l’IA et l’automatisation sont proposés sur devis.</p>
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
