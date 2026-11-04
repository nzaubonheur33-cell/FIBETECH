import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { CtaBand } from '@/components/layout/CtaBand'
import { BrowserFrame, PhoneFrame } from '@/components/illustrations/mocks'
import { AnchorLink } from '@/components/ui/anchor-link'
import { ButtonLink } from '@/components/ui/button'
import { Check, PathIcon } from '@/components/ui/icons'
import { Marquee } from '@/components/ui/marquee'
import { sectors, serviceLists, services, technologies, type Service } from '@/data/services'
import { usePageMeta } from '@/hooks/usePageMeta'
import { routes } from '@/lib/routes'
import { cn } from '@/lib/utils'

type RowProps = {
  id: Service['id']
  eyebrow: string
  title: string
  text: string
  idealFor?: string
  cta: { label: string; to: string }
  secondary?: { label: string; to: string }
  visual: ReactNode
  reverse?: boolean
  tone?: 'white' | 'stone' | 'dark'
}

function ServiceRow({ id, eyebrow, title, text, idealFor, cta, secondary, visual, reverse, tone = 'white' }: RowProps) {
  const dark = tone === 'dark'
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn('border-t-[1.5px] border-ink py-24', tone === 'stone' && 'bg-stone', dark && 'bg-mal-deep text-white')}>
      <div className={cn('wrap flex flex-wrap items-center gap-14', reverse && 'flex-row-reverse flex-wrap-reverse')}>
        <div className="flex min-w-0 flex-[1_1_480px] flex-col gap-[22px]">
          <span className={cn('eyebrow', dark ? 'text-copper-light' : 'text-copper')}>{eyebrow}</span>
          <h2 id={`${id}-title`} className="text-[clamp(34px,3.8vw,54px)] font-extrabold">
            {title}
          </h2>
          <p className={cn('text-lg', dark ? 'text-mal-fog' : 'text-ink-soft')}>{text}</p>
          <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,230px),1fr))] gap-x-6 gap-y-3">
            {serviceLists[id].map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <Check className={cn('mt-1 flex-none', dark ? 'text-mal-glow' : 'text-mal')} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          {idealFor && (
            <p className="text-[15px] text-ink-muted">
              <strong className="text-ink">Idéal pour</strong> {idealFor}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-3 pt-1.5">
            <ButtonLink to={cta.to} variant={dark ? 'light-cu' : 'ink'} arrow>
              {cta.label}
            </ButtonLink>
            {secondary && (
              <Link className="link" to={secondary.to}>
                {secondary.label}
              </Link>
            )}
          </div>
        </div>
        <div aria-hidden="true" className="min-w-0 flex-[1_1_460px]">
          {visual}
        </div>
      </div>
    </section>
  )
}

function WebVisual() {
  return (
    <div className="relative h-[460px] overflow-hidden rounded-[28px] border-[1.5px] border-ink bg-mal">
      <BrowserFrame className="float absolute left-[7%] top-[12%] w-[70%]">
        <div className="flex flex-col gap-3 p-[18px]">
          <span className="h-4 w-[70%] rounded-md bg-ink" />
          <span className="h-2 w-[90%] rounded-md bg-line" />
          <span className="h-2 w-[76%] rounded-md bg-line" />
          <span className="mt-1 h-[30px] w-[120px] rounded-full bg-copper" />
          <div className="grid grid-cols-3 gap-2 pt-1.5">
            <span className="h-[60px] rounded-lg bg-stone" />
            <span className="h-[60px] rounded-lg bg-copper-soft" />
            <span className="h-[60px] rounded-lg bg-stone" />
          </div>
        </div>
      </BrowserFrame>
      <PhoneFrame className="float-2 absolute bottom-[-30px] right-[7%] h-[280px] w-[150px] gap-[9px]">
        <span className="h-[9px] w-1/2 rounded-full bg-ink" />
        <span className="h-[70px] rounded-[10px] bg-copper-soft" />
        <span className="h-[7px] w-4/5 rounded-full bg-line" />
        <span className="h-[7px] w-3/5 rounded-full bg-line" />
        <span className="mt-auto h-[30px] rounded-full bg-ink" />
      </PhoneFrame>
      <span className="chip absolute bottom-[14%] left-[6%] border-[1.5px] border-ink bg-white text-ink">Rapide en 3G</span>
      <span className="chip absolute right-[30%] top-[6%] border-[1.5px] border-ink bg-mustard text-ink">Paiement mobile</span>
    </div>
  )
}

function ItVisual() {
  const tickets = [
    { title: 'Imprimante de l’accueil bloquée', sub: 'Intervention à distance', status: 'Résolu', cls: 'bg-mal-soft text-[#0B4A39]', strong: true },
    { title: 'Nouveau poste pour la comptabilité', sub: 'Installation sur site', status: 'En cours', cls: 'bg-copper-soft text-copper-deep' },
    { title: 'Mise à jour antivirus', sub: 'Tous les postes', status: 'Planifié', cls: 'bg-[#EEF0EF] text-ink-soft' },
  ]
  return (
    <div className="flex flex-col gap-3.5 rounded-[28px] border-[1.5px] border-ink bg-white p-7">
      <div className="flex items-center justify-between gap-3">
        <strong className="font-display text-[22px]">Demandes d’assistance</strong>
        <span className="chip bg-ink font-mono font-medium text-white">Aujourd’hui</span>
      </div>
      {tickets.map((ticket) => (
        <div key={ticket.title} className={cn('flex items-center justify-between gap-3 rounded-2xl px-[18px] py-4', ticket.strong ? 'float border-[1.5px] border-ink' : 'border-[1.5px] border-line')}>
          <div className="flex flex-col">
            <strong>{ticket.title}</strong>
            <span className="text-sm text-ink-muted">{ticket.sub}</span>
          </div>
          <span className={cn('chip', ticket.cls)}>{ticket.status}</span>
        </div>
      ))}
      <div className="flex items-center gap-3 pt-1.5">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-copper-soft text-copper">
          <PathIcon name="headset" size={22} strokeWidth={1.8} />
        </span>
        <span className="text-[15px] text-ink-soft">Un technicien dédié suit votre dossier</span>
      </div>
    </div>
  )
}

function TransfoVisual() {
  const lined = { backgroundImage: 'repeating-linear-gradient(#FFFFFF 0 17px, #DCE3DE 17px 18px)' }
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_56px_minmax(0,1.2fr)] items-center gap-2 rounded-[28px] border-[1.5px] border-ink bg-copper-soft p-7">
      <div className="flex flex-col gap-2.5">
        <span className="eyebrow text-[11px] text-copper-deep">Avant</span>
        <div className="-rotate-[4deg] rounded-md border-[1.5px] border-ink bg-white p-3.5" style={lined}>
          <span className="block h-[70px]" />
        </div>
        <div className="rotate-[3deg] rounded-md border-[1.5px] border-ink bg-white p-3.5" style={lined}>
          <span className="block h-[50px]" />
        </div>
      </div>
      <svg width="56" height="24" viewBox="0 0 56 24">
        <path className="dash-flow" d="M2 12h44" stroke="#121614" strokeWidth={2} fill="none" />
        <path d="M42 5l9 7-9 7" stroke="#121614" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div className="float flex flex-col gap-2.5 rounded-2xl border-[1.5px] border-ink bg-white p-4">
        <span className="eyebrow text-[11px] text-mal">Après</span>
        <div className="grid grid-cols-2 gap-2">
          <span className="h-11 rounded-lg bg-mal-soft" />
          <span className="h-11 rounded-lg bg-stone" />
        </div>
        <svg viewBox="0 0 200 70" className="w-full">
          <polyline points="0,60 30,48 60,52 90,34 120,38 150,20 200,12" fill="none" stroke="#0E5A45" strokeWidth={3} strokeLinejoin="round" />
          <circle cx={200} cy={12} r={5} fill="#B4532A" />
        </svg>
      </div>
    </div>
  )
}

function IaVisual() {
  return (
    <div className="flex justify-center">
      <div className="float flex w-[min(100%,330px)] flex-col overflow-hidden rounded-[34px] border-2 border-mal-glow bg-mal-panel text-white">
        <div className="flex items-center gap-2.5 border-b border-[#23463B] p-[18px]">
          <span className="grid h-[38px] w-[38px] place-items-center rounded-full bg-copper">
            <PathIcon name="bag" size={20} strokeWidth={2} className="text-white" />
          </span>
          <div className="flex flex-col leading-[1.3]">
            <strong className="text-[15px]">Assistant de la boutique</strong>
            <span className="text-xs text-mal-glow">en ligne</span>
          </div>
        </div>
        <div className="flex flex-col gap-2.5 p-[18px] text-sm leading-[1.45]">
          <span className="max-w-[80%] self-end rounded-[16px_16px_4px_16px] bg-mal-glow px-3.5 py-2.5 text-mal-deep">Bonjour, vous livrez à Kolwezi ?</span>
          <span className="max-w-[85%] self-start rounded-[16px_16px_16px_4px] bg-white px-3.5 py-2.5 text-ink">Bonjour ! Oui, nous livrons à Kolwezi. Voulez-vous voir le catalogue ou passer commande ?</span>
          <span className="max-w-[80%] self-end rounded-[16px_16px_4px_16px] bg-mal-glow px-3.5 py-2.5 text-mal-deep">Commander 2 cartons de cahiers</span>
          <span className="typing inline-flex gap-[5px] self-start rounded-[16px_16px_16px_4px] bg-white px-4 py-3.5">
            <span />
            <span />
            <span />
          </span>
        </div>
      </div>
    </div>
  )
}

function NetworkVisual() {
  return (
    <div className="rounded-[28px] border-[1.5px] border-ink bg-ink p-7">
      <svg viewBox="0 0 420 340" className="w-full" fontFamily="JetBrains Mono, ui-monospace, monospace" fontSize={12}>
        <g fill="none" stroke="#3FBF8E" strokeWidth={2}>
          <path className="dash-flow" d="M210 70 V140" />
          <path className="dash-flow" d="M210 160 L90 240" />
          <path className="dash-flow" d="M210 160 L210 240" />
          <path className="dash-flow" d="M210 160 L330 240" />
        </g>
        <rect x={160} y={30} width={100} height={40} rx={10} fill="#B4532A" />
        <text x={210} y={55} fill="#FFFFFF" textAnchor="middle">
          Routeur
        </text>
        <rect x={150} y={140} width={120} height={30} rx={8} fill="#0A1F19" stroke="#3FBF8E" strokeWidth={2} />
        <text x={210} y={160} fill="#3FBF8E" textAnchor="middle">
          Switch
        </text>
        <circle className="pulse-soft" cx={90} cy={252} r={26} fill="none" stroke="#3FBF8E" strokeWidth={1.5} />
        <circle cx={90} cy={252} r={14} fill="#0A1F19" stroke="#3FBF8E" strokeWidth={2} />
        <text x={90} y={300} fill="#C9D6D0" textAnchor="middle">
          Wi-Fi bureau
        </text>
        <rect x={186} y={236} width={48} height={34} rx={6} fill="#0A1F19" stroke="#3FBF8E" strokeWidth={2} />
        <text x={210} y={300} fill="#C9D6D0" textAnchor="middle">
          Serveur
        </text>
        <rect x={306} y={236} width={48} height={34} rx={6} fill="#E0A93B" />
        <text x={330} y={300} fill="#C9D6D0" textAnchor="middle">
          Onduleur
        </text>
        <circle className="pulse-soft" cx={210} cy={50} r={34} fill="none" stroke="#E8A07A" strokeWidth={1.5} />
      </svg>
    </div>
  )
}

function ConseilVisual() {
  const columns = [
    { label: 'Maintenant', chips: [{ t: 'Sauvegardes', c: 'bg-ink text-white' }, { t: 'Audit du parc', c: 'bg-ink text-white' }] },
    { label: '3 mois', chips: [{ t: 'Site web', c: 'float bg-copper text-white' }, { t: 'Facturation', c: 'bg-copper-soft text-copper-deep' }] },
    { label: '6 mois', chips: [{ t: 'Assistant IA', c: 'bg-mal-soft text-[#0B4A39]' }, { t: 'Formation', c: 'bg-mal-soft text-[#0B4A39]' }] },
  ]
  return (
    <div className="flex flex-col gap-4 rounded-[28px] border-[1.5px] border-ink bg-white p-7">
      <strong className="font-display text-[22px]">Votre feuille de route</strong>
      <div className="grid grid-cols-3 gap-3">
        {columns.map((col) => (
          <div key={col.label} className="flex flex-col gap-2">
            <span className="eyebrow text-[11px] text-copper">{col.label}</span>
            {col.chips.map((chip) => (
              <span key={chip.t} className={cn('chip justify-center whitespace-normal text-center', chip.c)}>
                {chip.t}
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-stone">
        <span className="block h-full w-[38%] rounded-full bg-mal" />
      </div>
    </div>
  )
}

export default function Services() {
  usePageMeta('Services', 'Développement web et mobile, assistance IT, transformation numérique, IA, réseaux et conseil digital à Lubumbashi.')

  return (
    <>
      <section aria-labelledby="page-title" className="bg-white pb-20 pt-24">
        <div className="wrap flex flex-col gap-8">
          <span className="eyebrow rise text-copper">Services</span>
          <h1 id="page-title" className="rise d1 max-w-[1080px] text-[clamp(42px,6vw,88px)] font-extrabold leading-[0.96] tracking-[-0.04em]">
            Tout ce qu’il faut pour faire tourner votre entreprise <span className="text-copper">en numérique.</span>
          </h1>
          <p className="rise d2 max-w-[640px] text-xl text-ink-soft">
            Six domaines complémentaires. Vous pouvez nous confier un seul chantier ou tout l’écosystème : on s’adapte à votre taille et à votre budget.
          </p>
          <nav aria-label="Aller au service" className="rise d3 flex flex-wrap gap-2.5 pt-2">
            {services.map((service) => (
              <AnchorLink key={service.id} target={service.id} className="anchor">
                {service.short}
              </AnchorLink>
            ))}
          </nav>
        </div>
      </section>

      <ServiceRow
        id="web"
        eyebrow="Web et mobile"
        title="Des sites et des applications qui travaillent pour vous."
        text="Un site rapide qui donne confiance, une boutique qui encaisse par mobile money, une application que vos équipes utilisent vraiment."
        idealFor="commerces, PME, écoles, cliniques et startups."
        cta={{ label: 'Voir le détail', to: routes.web }}
        secondary={{ label: 'Demander un devis', to: routes.contact }}
        visual={<WebVisual />}
      />
      <ServiceRow
        id="it"
        tone="stone"
        reverse
        eyebrow="Solutions IT et assistance"
        title="Un service informatique, sans avoir à le recruter."
        text="Ordinateurs lents, imprimante bloquée, messagerie en panne : on intervient à distance ou sur place, et on prévient les pannes avant qu’elles arrivent."
        idealFor="bureaux, cabinets, agences et écoles de 3 à 100 postes."
        cta={{ label: 'Voir les abonnements', to: routes.pricing }}
        secondary={{ label: 'Signaler un besoin', to: routes.contact }}
        visual={<ItVisual />}
      />
      <ServiceRow
        id="transfo"
        eyebrow="Transformation numérique"
        title="Du cahier au tableau de bord, sans perdre personne en route."
        text="On observe comment vous travaillez aujourd’hui, puis on numérise étape par étape : factures, stock, rendez-vous, rapports. Vos équipes sont formées à chaque changement."
        idealFor="les organisations qui grandissent plus vite que leurs outils."
        cta={{ label: 'Parler de votre organisation', to: routes.contact }}
        visual={<TransfoVisual />}
      />
      <ServiceRow
        id="ia"
        tone="dark"
        reverse
        eyebrow="IA et automatisation"
        title="L’IA qui répond à vos clients pendant que vous dormez."
        text="Un assistant sur WhatsApp ou sur votre site répond aux questions fréquentes, prend les commandes et vous transmet les cas importants. Le reste de l’automatisation suit la même logique : moins de saisie, plus de temps utile."
        cta={{ label: 'Imaginer votre assistant', to: routes.contact }}
        visual={<IaVisual />}
      />
      <ServiceRow
        id="reseaux"
        eyebrow="Réseaux et infrastructures"
        title="Un réseau stable, même quand le courant ne l’est pas."
        text="Câblage propre, Wi-Fi qui couvre tout le bâtiment, serveurs protégés par onduleur et sauvegardes automatiques. On documente tout, pour que vous ne dépendiez de personne."
        idealFor="bureaux, entrepôts, hôtels, campus et sites miniers."
        cta={{ label: 'Demander un audit réseau', to: routes.contact }}
        visual={<NetworkVisual />}
      />
      <ServiceRow
        id="conseil"
        tone="stone"
        reverse
        eyebrow="Conseil digital"
        title="Décider avant de dépenser."
        text="On fait le point sur vos outils, vos risques et vos priorités, puis on vous remet une feuille de route claire. Vous choisissez ensuite ce que vous faites avec nous, seul ou avec un autre prestataire."
        cta={{ label: 'Réserver un diagnostic', to: routes.contact }}
        visual={<ConseilVisual />}
      />

      <Marquee
        label="Technologies utilisées"
        items={technologies}
        className="border-y-[1.5px] border-ink py-[34px]"
        render={(tech) => (
          <span className="inline-flex items-center gap-[22px] whitespace-nowrap pr-[22px] font-mono text-lg text-ink-soft">
            {tech}
            <span className="h-1.5 w-1.5 rounded-full bg-copper" />
          </span>
        )}
      />

      <section aria-labelledby="sectors-title" className="py-[120px]">
        <div className="wrap flex flex-col gap-12">
          <div className="flex max-w-[760px] flex-col gap-[18px]">
            <span className="eyebrow text-copper">Secteurs</span>
            <h2 id="sectors-title" className="text-[clamp(36px,4.6vw,62px)] font-extrabold">
              On parle le langage de votre métier.
            </h2>
          </div>
          <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,270px),1fr))] border-l-[1.5px] border-t-[1.5px] border-ink">
            {sectors.map((sector) => (
              <li key={sector.title} className="tile flex min-h-[200px] flex-col gap-2.5 border-b-[1.5px] border-r-[1.5px] border-ink p-7">
                <h3 className="text-[23px] font-bold">{sector.title}</h3>
                <p className="text-[15px] text-ink-soft">{sector.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand title="Pas sûr du service qu’il vous faut ?" text="Décrivez votre situation. On vous oriente vers la solution la plus simple, même si c’est la moins chère." cta="Nous écrire" />
    </>
  )
}

