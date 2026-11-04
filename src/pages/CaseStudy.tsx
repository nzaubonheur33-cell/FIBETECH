import { Link } from 'react-router-dom'
import { BrowserFrame, MobileMoneyPill, PhoneFrame, wax } from '@/components/illustrations/mocks'
import { ArrowRight } from '@/components/ui/icons'
import { Ph } from '@/components/ui/placeholder'
import { usePageMeta } from '@/hooks/usePageMeta'
import { routes } from '@/lib/routes'

const meta = [
  { dt: 'Client', dd: <Ph>[Nom du client]</Ph> },
  { dt: 'Secteur', dd: 'Commerce de détail' },
  { dt: 'Services', dd: 'Boutique en ligne, paiement mobile, formation' },
  { dt: 'Durée', dd: <Ph>[X] semaines</Ph> },
]

const approach = [
  { n: '01', title: 'Photographier et organiser', text: 'Une journée en boutique pour photographier les pagnes et classer le catalogue par motif, prix et métrage.' },
  { n: '02', title: 'Une boutique légère', text: 'Des pages qui chargent vite en 3G, un panier simple et le paiement mobile ou à la livraison.' },
  { n: '03', title: 'Former l’équipe', text: 'Deux vendeuses formées à ajouter des produits, suivre les commandes et répondre en ligne.' },
]

export default function CaseStudy() {
  usePageMeta('Étude de cas', 'Étude de cas : une boutique de pagnes de Lubumbashi qui vend aussi en ligne, avec paiement mobile.')

  return (
    <>
      <article aria-labelledby="page-title">
        <header className="py-[72px]">
          <div className="wrap flex flex-col gap-[26px]">
            <nav aria-label="Fil d’Ariane" className="flex flex-wrap gap-2 font-mono text-[13px] text-ink-muted">
              <Link to={routes.work} className="text-ink-muted">
                Réalisations
              </Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page" className="text-ink">
                Étude de cas
              </span>
            </nav>
            <div className="flex flex-wrap gap-2">
              <span className="chip bg-copper-soft text-copper-deep">Étude de cas exemple</span>
              <span className="chip bg-stone text-[#2F3833]">Web · E-commerce</span>
            </div>
            <h1 id="page-title" className="rise max-w-[1000px] text-[clamp(42px,6vw,88px)] font-extrabold leading-[0.96] tracking-[-0.04em]">
              Une boutique de pagnes qui vend <span className="text-copper">aussi en ligne.</span>
            </h1>
            <dl className="rise d1 m-0 grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-5 border-t-[1.5px] border-ink pt-7">
              {meta.map((item) => (
                <div key={item.dt} className="flex flex-col gap-1">
                  <dt className="eyebrow text-xs text-ink-muted">{item.dt}</dt>
                  <dd className="m-0 font-semibold">{item.dd}</dd>
                </div>
              ))}
            </dl>
          </div>
        </header>

        <div aria-hidden="true" className="relative h-[620px] overflow-hidden border-y-[1.5px] border-ink bg-mal max-[760px]:h-[440px]">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(circle, rgba(255,255,255,.08) 0 2px, transparent 3px) 0 0/28px 28px' }} />
          <div className="absolute left-1/2 top-[70px] w-[min(860px,86%)] -translate-x-1/2">
            <BrowserFrame url="boutique-exemple.cd" className="float rounded-[18px] shadow-[14px_14px_0_#121614]">
              <div className="grid grid-cols-4 gap-4 p-[26px] max-[760px]:gap-2 max-[760px]:p-3">
                <div className="col-span-4 flex items-center justify-between">
                  <span className="h-[22px] w-[220px] max-w-[50%] rounded-md bg-ink" />
                  <span className="h-9 w-[110px] rounded-full bg-copper" />
                </div>
                <span className="aspect-[3/4] rounded-xl" style={wax.copper} />
                <span className="aspect-[3/4] rounded-xl" style={wax.malachite} />
                <span className="aspect-[3/4] rounded-xl" style={wax.mustard} />
                <span className="aspect-[3/4] rounded-xl" style={wax.stripes} />
              </div>
            </BrowserFrame>
          </div>
          <PhoneFrame className="float-2 absolute bottom-[-40px] right-[8%] h-[360px] w-[190px] rounded-[32px] px-3.5 pb-3.5 pt-7 max-[760px]:hidden">
            <span className="h-[120px] rounded-[14px]" style={wax.copper} />
            <span className="h-2.5 w-[70%] rounded-full bg-ink" />
            <span className="h-2.5 w-[40%] rounded-full bg-line" />
            <MobileMoneyPill className="mt-auto grid h-10 place-items-center text-[11px]" />
          </PhoneFrame>
        </div>

        <section aria-labelledby="defi-title" className="py-[110px]">
          <div className="wrap flex flex-wrap gap-12">
            <h2 id="defi-title" className="eyebrow flex-[1_1_240px] font-mono text-copper">
              Le défi
            </h2>
            <div className="flex min-w-0 flex-[3_1_620px] flex-col gap-[22px]">
              <p className="font-display text-[clamp(26px,2.8vw,38px)] font-semibold leading-[1.2] tracking-[-0.02em]">
                Les clientes commandaient par messages, les stocks tenaient dans un cahier, et les ventes s’arrêtaient à la fermeture de la boutique.
              </p>
              <p className="max-w-[720px] text-lg text-ink-soft">
                Le client voulait vendre aux clientes de Kolwezi et de Likasi sans multiplier les allers-retours, accepter le paiement mobile et savoir chaque soir ce qui restait en rayon.
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="approche-title" className="border-y-[1.5px] border-ink bg-stone py-[110px]">
          <div className="wrap flex flex-col gap-10">
            <h2 id="approche-title" className="text-[clamp(34px,4.2vw,56px)] font-extrabold">
              Notre approche
            </h2>
            <ol className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-6">
              {approach.map((item) => (
                <li key={item.n} className="card lift flex flex-col gap-3.5 p-[30px]">
                  <span className="font-mono text-sm text-copper">{item.n}</span>
                  <h3 className="text-[25px] font-bold">{item.title}</h3>
                  <p className="text-ink-soft">{item.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section aria-labelledby="result-title" className="py-[110px]">
          <div className="wrap flex flex-col gap-10">
            <h2 id="result-title" className="text-[clamp(34px,4.2vw,56px)] font-extrabold">
              Le résultat
            </h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] overflow-hidden rounded-[22px] border-[1.5px] border-ink">
              <div className="flex flex-col gap-2.5 border-ink p-9 min-[900px]:border-r-[1.5px]">
                <span className="font-display text-[64px] font-extrabold leading-none text-copper">
                  <Ph className="text-[0.4em]">[+XX %]</Ph>
                </span>
                <p className="text-ink-soft">de ventes sur les trois premiers mois</p>
              </div>
              <div className="flex flex-col gap-2.5 bg-ink p-9 text-white">
                <span className="font-display text-[64px] font-extrabold leading-none">
                  <Ph dark className="text-[0.4em]">
                    [XX]
                  </Ph>
                </span>
                <p className="text-mal-fog">commandes payées par mobile money chaque mois</p>
              </div>
              <div className="flex flex-col gap-2.5 p-9">
                <span className="font-display text-[64px] font-extrabold leading-none text-mal">
                  <Ph className="text-[0.4em]">[X] villes</Ph>
                </span>
                <p className="text-ink-soft">livrées depuis la mise en ligne</p>
              </div>
            </div>
            <figure className="m-0 mt-6 flex flex-col gap-[18px] rounded-[22px] border-[1.5px] border-ink bg-copper-soft p-10">
              <blockquote className="m-0 font-display text-[clamp(22px,2.4vw,32px)] font-semibold leading-[1.25]">
                <Ph wrap className="text-[0.62em]">
                  [Citation réelle du client sur ce que le projet a changé pour lui.]
                </Ph>
              </blockquote>
              <figcaption className="text-ink-muted">
                <Ph>[Prénom Nom]</Ph>, gérante · <Ph>[Nom de la boutique]</Ph>
              </figcaption>
            </figure>
          </div>
        </section>

        <section aria-labelledby="gallery-title" className="bg-ink py-[110px] text-white">
          <div className="wrap flex flex-col gap-10">
            <h2 id="gallery-title" className="text-[clamp(34px,4.2vw,56px)] font-extrabold">
              Les écrans clés
            </h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-7">
              <figure className="m-0 flex flex-col gap-3.5">
                <div aria-hidden="true" className="float mx-auto flex h-[420px] w-full max-w-[240px] flex-col gap-2.5 rounded-[34px] border-2 border-mal-glow bg-white px-4 pb-4 pt-[30px]">
                  <span className="h-40 rounded-[14px]" style={wax.malachite} />
                  <span className="h-3 w-[70%] rounded-full bg-ink" />
                  <span className="h-3 w-[35%] rounded-full bg-copper" />
                  <div className="flex gap-1.5">
                    <span className="h-[30px] flex-1 rounded-lg border-[1.5px] border-ink" />
                    <span className="h-[30px] flex-1 rounded-lg border-[1.5px] border-ink bg-ink" />
                    <span className="h-[30px] flex-1 rounded-lg border-[1.5px] border-ink" />
                  </div>
                  <span className="mt-auto h-[42px] rounded-full bg-copper" />
                </div>
                <figcaption className="text-center text-mal-fog">Fiche produit avec choix du métrage</figcaption>
              </figure>
              <figure className="m-0 flex flex-col gap-3.5">
                <div aria-hidden="true" className="float-2 mx-auto flex h-[420px] w-full max-w-[240px] flex-col gap-2.5 rounded-[34px] border-2 border-mal-glow bg-white px-4 pb-4 pt-[30px]">
                  <span className="h-3.5 w-3/5 rounded-full bg-ink" />
                  <span className="h-[52px] rounded-xl border-[1.5px] border-line" />
                  <span className="h-[52px] rounded-xl border-[1.5px] border-line" />
                  <span className="flex h-[52px] items-center justify-between rounded-xl border-2 border-ink px-3 font-mono text-[11px] text-ink">
                    Mobile Money <span className="h-3.5 w-3.5 rounded-full bg-mal" />
                  </span>
                  <span className="flex h-[52px] items-center rounded-xl border-[1.5px] border-line px-3 font-mono text-[11px] text-ink-soft">Paiement à la livraison</span>
                  <span className="mt-auto h-[42px] rounded-full bg-ink" />
                </div>
                <figcaption className="text-center text-mal-fog">Paiement en deux étapes</figcaption>
              </figure>
              <figure className="m-0 flex flex-col gap-3.5">
                <div aria-hidden="true" className="float flex h-[420px] flex-col gap-2.5 rounded-[18px] border-2 border-mal-glow bg-white p-[22px]">
                  <span className="h-3.5 w-1/2 rounded-full bg-ink" />
                  <div className="grid grid-cols-2 gap-2">
                    <span className="h-[60px] rounded-[10px] bg-mal-soft" />
                    <span className="h-[60px] rounded-[10px] bg-copper-soft" />
                  </div>
                  {[0, 1, 2, 3].map((i) => (
                    <span key={i} className="h-[34px] border-b border-line" />
                  ))}
                  <span className="mt-auto h-[38px] w-[120px] self-end rounded-full bg-copper" />
                </div>
                <figcaption className="text-center text-mal-fog">Suivi des commandes côté boutique</figcaption>
              </figure>
            </div>
          </div>
        </section>
      </article>

      <nav aria-label="Projet suivant" className="border-b-[1.5px] border-ink">
        <div className="wrap">
          <Link className="next-link" to={routes.work}>
            <span className="flex flex-col gap-2">
              <span className="eyebrow text-ink-muted">Projet suivant</span>
              <span className="font-display text-[clamp(28px,3.6vw,48px)] font-extrabold leading-[1.05] tracking-[-0.03em]">Le stock d’un grossiste, suivi depuis un téléphone</span>
            </span>
            <ArrowRight size={64} strokeWidth={1.6} className="arrow" />
          </Link>
        </div>
      </nav>
    </>
  )
}
