import { Link } from 'react-router-dom'
import peepsSheet from '@/assets/open-peeps-sheet.png'
import { CtaBand } from '@/components/layout/CtaBand'
import { ProjectCard } from '@/components/ProjectCard'
import { ButtonLink } from '@/components/ui/button'
import { HorizonDot, PathIcon } from '@/components/ui/icons'
import { LogoMark } from '@/components/ui/logo'
import { Marquee } from '@/components/ui/marquee'
import { Ph } from '@/components/ui/placeholder'
import { SectionHeading } from '@/components/ui/section-heading'
import { CrowdCanvas } from '@/components/ui/skiper39'
import { projects } from '@/data/projects'
import { sectors, services, steps } from '@/data/services'
import { usePageMeta } from '@/hooks/usePageMeta'
import { routes } from '@/lib/routes'
import { site } from '@/lib/site'

const why = [
  { title: 'Une équipe sur place', text: 'Basés à Lubumbashi, joignables par téléphone et WhatsApp, et capables de passer vous voir.' },
  { title: 'Connexion lente ? C’est prévu.', text: 'Des sites et applications légers, rapides en 3G, avec un mode hors ligne quand l’activité l’exige.' },
  { title: 'Le paiement mobile, intégré', text: 'M-Pesa, Airtel Money, Orange Money : vos clients paient comme ils en ont l’habitude.' },
  { title: 'Les coupures de courant aussi', text: 'Onduleurs, sauvegardes automatiques et serveurs pensés pour tenir quand le réseau électrique lâche.' },
  { title: 'Français, swahili, anglais', text: 'Des interfaces et des formations dans la langue de vos équipes et de vos clients.' },
]

const teaserPlans = [
  { name: 'Essentiel', text: 'Un site vitrine pour être trouvé et contacté.', from: 'à partir de', price: true, dark: false },
  { name: 'Business', text: 'Un site complet avec paiement mobile et référencement local.', from: 'à partir de', price: true, dark: true },
  { name: 'Sur mesure', text: 'Application, plateforme ou e-commerce complet.', from: 'prix', price: false, dark: false },
]

export default function Home() {
  usePageMeta('', 'Sites web, applications, IA, réseaux et assistance informatique à Lubumbashi. Une équipe d’ici qui conçoit vos outils, les installe et reste à vos côtés.')

  return (
    <>
      <Hero />

      <Marquee
        label="Secteurs que nous accompagnons"
        items={sectors.map((s) => s.title)}
        className="bg-ink py-6 text-white"
        render={(sector) => (
          <span className="inline-flex items-center gap-7 whitespace-nowrap pr-7 font-display text-[clamp(22px,2.4vw,32px)] font-semibold tracking-[-0.02em]">
            {sector}
            <HorizonDot />
          </span>
        )}
      />

      <section id="services" aria-labelledby="services-title" className="bg-white py-[120px]">
        <div className="wrap flex flex-col gap-14">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading id="services-title" eyebrow="Nos services" title="Six métiers, un seul interlocuteur." text="Du site vitrine au réseau de votre entrepôt, on s’occupe de toute la chaîne. Vous gardez un seul contact, qui connaît votre dossier." />
            <Link className="link" to={routes.services}>
              Voir le détail des services
            </Link>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,330px),1fr))] gap-6">
            {services.map((service) => (
              <article key={service.id} className="card lift flex flex-col gap-[18px] p-[30px]">
                <div className="grid h-16 w-16 place-items-center rounded-full bg-copper-soft text-copper">
                  <PathIcon name={service.icon} className="draw-icon" />
                </div>
                <h3 className="text-[26px] font-bold">{service.title}</h3>
                <p className="flex-grow text-base text-ink-soft">{service.text}</p>
                <ul aria-label="Exemples" className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <li key={tag} className="chip bg-stone text-[#2F3833]">
                      {tag}
                    </li>
                  ))}
                </ul>
                <Link className="link self-start" to={service.href}>
                  En savoir plus<span className="sr-only-label"> : {service.title}</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="why-title" className="overflow-hidden bg-mal-deep py-[120px] text-white">
        <div className="wrap flex flex-wrap items-center gap-16">
          <div className="flex min-w-0 flex-[1_1_520px] flex-col gap-10">
            <div className="flex flex-col gap-[18px]">
              <span className="eyebrow text-copper-light">Pourquoi nous</span>
              <h2 id="why-title" className="text-[clamp(36px,4.4vw,62px)] font-extrabold">
                Pensé pour le terrain, pas pour une brochure.
              </h2>
            </div>
            <ul className="flex flex-col gap-[26px]">
              {why.map((item) => (
                <li key={item.title} className="flex items-start gap-[18px]">
                  <HorizonDot fill="#E8A07A" width={30} height={22} className="mt-1 flex-none" />
                  <div className="flex flex-col gap-1">
                    <h3 className="text-[22px] font-bold">{item.title}</h3>
                    <p className="text-mal-mist">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div aria-hidden="true" className="flex min-w-0 flex-[1_1_420px] justify-center">
            <Orbit />
          </div>
        </div>
      </section>

      <section aria-labelledby="process-title" className="bg-stone py-[120px]">
        <div className="wrap flex flex-col gap-14">
          <SectionHeading id="process-title" eyebrow="Notre méthode" title="Cinq étapes, zéro mystère." text="Vous savez toujours où en est votre projet, ce qui a été fait et ce qui arrive ensuite." />
          <div className="relative">
            <div aria-hidden="true" className="absolute left-7 right-7 top-[27px] h-[1.5px] bg-ink max-[760px]:hidden">
              <span className="travel absolute -top-[5px] h-3 w-3 rounded-full bg-copper" />
            </div>
            <ol className="relative grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-8">
              {steps.map((step) => (
                <li key={step.n} className="flex flex-col gap-3.5">
                  <span className="grid h-14 w-14 place-items-center rounded-full border-[1.5px] border-ink bg-white font-mono text-[15px] font-medium">{step.n}</span>
                  <h3 className="text-[23px] font-bold">{step.title}</h3>
                  <p className="text-base text-ink-soft">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section aria-labelledby="work-title" className="bg-white py-[120px]">
        <div className="wrap flex flex-col gap-14">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading id="work-title" eyebrow="Réalisations" title="Des outils qui servent tous les jours." />
            <Link className="link" to={routes.work}>
              Voir tous les projets
            </Link>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-6">
            {[projects[0], projects[1], projects[3]].map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="quote-title" className="border-y-[1.5px] border-ink bg-stone py-[120px]">
        <div className="wrap flex max-w-[1040px] flex-col items-center gap-[34px] text-center">
          <h2 id="quote-title" className="eyebrow text-copper">
            Ils en parlent
          </h2>
          <svg width="64" height="48" viewBox="0 0 64 48" aria-hidden="true">
            <path d="M4 44V26C4 12 12 4 26 2v8c-8 2-11 7-11 14h11v20zM36 44V26C36 12 44 4 58 2v8c-8 2-11 7-11 14h11v20z" fill="#B4532A" />
          </svg>
          <blockquote className="m-0 font-display text-[clamp(26px,3.2vw,42px)] font-semibold leading-[1.2] tracking-[-0.02em]">
            « <Ph wrap className="text-[0.62em] leading-[1.8]">[Ici, la phrase d’un vrai client : le problème de départ et le résultat obtenu, avec un chiffre si possible.]</Ph> »
          </blockquote>
          <div className="flex items-center gap-3.5">
            <span aria-hidden="true" className="grid h-[52px] w-[52px] place-items-center rounded-full border-[1.5px] border-ink bg-white font-bold">
              ?
            </span>
            <div className="flex flex-col text-left leading-[1.4]">
              <strong>
                <Ph>[Prénom Nom]</Ph>
              </strong>
              <span className="text-[15px] text-ink-muted">
                <Ph>[Fonction]</Ph> · <Ph>[Entreprise]</Ph>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="price-title" className="bg-white py-[120px]">
        <div className="wrap flex flex-col gap-14">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading id="price-title" eyebrow="Tarifs" title="Des prix clairs, pensés pour les PME." />
            <Link className="link" to={routes.pricing}>
              Comparer les formules
            </Link>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-6">
            {teaserPlans.map((plan) => (
              <Link
                key={plan.name}
                to={routes.pricing}
                className={`card lift relative flex flex-col gap-4 p-8 no-underline ${plan.dark ? 'bg-ink text-white hover:text-white' : 'text-ink hover:text-ink'}`}
              >
                {plan.dark && <span className="chip absolute -top-4 left-7 bg-copper text-white">Recommandé</span>}
                <h3 className="text-[28px] font-bold">{plan.name}</h3>
                <p className={plan.dark ? 'text-mal-fog' : 'text-ink-soft'}>{plan.text}</p>
                <p className={`mt-auto text-[15px] ${plan.dark ? 'text-mal-mist' : 'text-ink-muted'}`}>{plan.from}</p>
                <p className="font-display text-[44px] font-extrabold leading-none">
                  {plan.price ? (
                    <>
                      <Ph dark={plan.dark} className="text-[0.5em]">
                        [PRIX]
                      </Ph>{' '}
                      $
                    </>
                  ) : (
                    'Sur devis'
                  )}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand eyebrow="Prochaine étape" title="Votre projet commence par une conversation." text="Expliquez-nous votre besoin en quelques lignes. On revient vers vous avec des questions, puis une proposition claire." />
    </>
  )
}

function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden border-b-[1.5px] border-ink bg-white">
      <div className="absolute left-[max(20px,4vw)] top-9 z-[3] font-mono text-xs leading-[1.8] tracking-[0.06em] text-ink-muted max-[760px]:hidden">
        <div>{site.city} · RDC</div>
      </div>

      <div aria-hidden="true" className="absolute right-[max(20px,6vw)] top-24 z-[3] h-[150px] w-[150px] max-[960px]:hidden">
        <svg viewBox="0 0 160 160" width="150" height="150">
          <defs>
            <path id="hero-badge-circle" d="M80,80 m-63,0 a63,63 0 1,1 126,0 a63,63 0 1,1 -126,0" />
          </defs>
          <g className="spin-slow" style={{ transformOrigin: '80px 80px' }}>
            <text fontFamily="JetBrains Mono, ui-monospace, monospace" fontSize={11} fontWeight={500} fill="#121614">
              <textPath href="#hero-badge-circle" textLength={392} lengthAdjust="spacing">
                DEVIS · CONSEIL · SUPPORT · LUBUMBASHI ·{' '}
              </textPath>
            </text>
          </g>
          <circle cx={80} cy={80} r={40} fill="#121614" />
        </svg>
        <LogoMark tone="ink" className="absolute left-[56px] top-[56px] h-12 w-12" />
      </div>

      <div className="wrap relative z-[2] flex flex-col items-center gap-[26px] pt-[52px] text-center">
        <div className="flex flex-col items-center gap-3.5">
          <span className="eyebrow rise text-ink-muted">Startup tech</span>
          <span aria-hidden="true" className="block h-14 w-px bg-gradient-to-b from-white to-ink" />
        </div>
        <h1 id="hero-title" className="rise d1 max-w-[1060px] text-[clamp(44px,6.2vw,92px)] font-extrabold leading-[0.95] tracking-[-0.045em]">
          Le numérique au service de ceux qui{' '}
          <span className="relative inline-block text-copper">
            font bouger
            <svg aria-hidden="true" viewBox="0 0 300 24" preserveAspectRatio="none" className="absolute bottom-[-0.16em] left-0 h-[0.24em] w-full overflow-visible">
              <path className="squiggle" d="M3 15 C 40 4, 70 22, 110 12 S 180 4, 215 13 S 270 20, 297 8" fill="none" stroke="#B4532A" strokeWidth={5} strokeLinecap="round" />
            </svg>
          </span>{' '}
          Lubumbashi.
        </h1>
        <p className="rise d2 max-w-[620px] text-[clamp(17px,1.4vw,20px)] text-ink-soft">
          Sites web, applications, intelligence artificielle, réseaux et assistance informatique. Une équipe d’ici qui conçoit vos outils, les installe et reste à vos côtés après la mise en ligne.
        </p>
        <div className="rise d3 flex flex-wrap justify-center gap-3">
          <ButtonLink to={routes.contact} arrow>
            Demander un devis
          </ButtonLink>
          <ButtonLink to={routes.services} variant="ghost">
            Découvrir nos services
          </ButtonLink>
        </div>
      </div>

      {/* Foule animée (Skiper39 + Open Peeps) */}
      <div className="relative mt-2 h-[330px] min-[761px]:mt-10 min-[761px]:h-[470px]">
        <CrowdCanvas src={peepsSheet} rows={15} cols={7} className="inset-0 h-full w-full" />
      </div>
    </section>
  )
}

function Orbit() {
  const outer = [
    { label: 'Web', style: { top: -18, left: 'calc(50% - 50px)' } },
    { label: 'Cloud', style: { top: 'calc(100% - 18px)', left: 'calc(50% - 50px)' } },
    { label: 'Réseau', style: { top: 'calc(50% - 18px)', left: -50 } },
    { label: 'Support', style: { top: 'calc(50% - 18px)', left: 'calc(100% - 50px)' } },
  ]
  const inner = [
    { label: 'IA', style: { top: '4%', left: 'calc(14% - 46px)' } },
    { label: 'Mobile', style: { top: '4%', left: 'calc(86% - 46px)' } },
    { label: 'Données', style: { top: 'calc(100% - 17px)', left: 'calc(50% - 46px)' } },
  ]
  return (
    <div className="relative aspect-square w-[min(100%,500px)] max-w-full">
      <div className="absolute inset-0 rounded-full border border-mal-glow/35" />
      <div className="absolute inset-[17%] rounded-full border border-dashed border-mal-glow/50" />
      <div className="absolute inset-[34%] rounded-full border border-copper-light/55" />
      <div className="orbit-a absolute inset-0">
        {outer.map((item) => (
          <div key={item.label} className="absolute flex w-[100px] justify-center" style={item.style}>
            <span className="orbit-a-rev inline-flex min-h-9 items-center rounded-full border border-mal-glow bg-mal-deep px-3.5 font-mono text-[13px] text-mal-glow">{item.label}</span>
          </div>
        ))}
      </div>
      <div className="orbit-b absolute inset-[17%]">
        {inner.map((item) => (
          <div key={item.label} className="absolute flex w-[92px] justify-center" style={item.style}>
            <span className="orbit-b-rev inline-flex min-h-[34px] items-center rounded-full border border-copper-light bg-mal-deep px-3 font-mono text-[13px] text-copper-light">{item.label}</span>
          </div>
        ))}
      </div>
      <div className="absolute inset-[39%]">
        <div className="ping-soft absolute inset-0 rounded-full border-2 border-copper-light" />
        <div className="absolute inset-0 grid place-items-center rounded-full border-[1.5px] border-copper-light bg-ink">
          <LogoMark tone="ink" className="w-[56%]" />
        </div>
      </div>
    </div>
  )
}
