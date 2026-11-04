import { Link } from 'react-router-dom'
import { AnchorLink } from '@/components/ui/anchor-link'
import { ButtonLink } from '@/components/ui/button'
import { ArrowRight, PathIcon, type IconName } from '@/components/ui/icons'
import { Marquee } from '@/components/ui/marquee'
import { usePageMeta } from '@/hooks/usePageMeta'
import { routes } from '@/lib/routes'

const reasons: { title: string; text: string; icon: IconName }[] = [
  { title: 'Des projets variés', text: 'Un site un jour, un réseau d’entrepôt le lendemain, un assistant IA la semaine suivante.', icon: 'bolt' },
  { title: 'Formation continue', text: 'Binôme avec un membre expérimenté, temps dédié pour se former et préparer des certifications.', icon: 'cap' },
  { title: 'Un impact visible', text: 'Vos outils sont utilisés par des commerces, des écoles et des cliniques que vous croisez en ville.', icon: 'pin' },
]

// Postes donnés en exemple : à remplacer par vos offres réelles.
const jobs = [
  { title: 'Développeur·se web (stage)', text: 'React, Node.js, bases de données. Vous travaillez sur des sites et applications clients.', type: 'Stage' },
  { title: 'Technicien·ne réseau et support', text: 'Installations, dépannages et maintenance chez nos clients, avec déplacements en ville.', type: 'Temps plein' },
  { title: 'Chargé·e de relation client', text: 'Premier contact des entreprises, devis et suivi de la satisfaction.', type: 'Temps plein' },
  { title: 'Designer UI (freelance)', text: 'Maquettes de sites et d’applications, en lien avec les développeurs.', type: 'Mission' },
]

const hiring = [
  { n: '01', title: 'Candidature', text: 'CV ou lien GitHub, et quelques lignes sur ce qui vous motive.' },
  { n: '02', title: 'Premier échange', text: '30 minutes pour faire connaissance, au bureau ou en visio.' },
  { n: '03', title: 'Cas pratique', text: 'Un petit exercice proche du quotidien, puis on en discute ensemble.' },
  { n: '04', title: 'Réponse', text: 'Une réponse dans tous les cas, avec un retour si ce n’est pas oui.' },
]

export default function Careers() {
  usePageMeta('Carrières', 'Rejoignez Fibetech à Lubumbashi : stages pour étudiants en informatique et postes en développement, réseaux et relation client.')

  return (
    <>
      <section aria-labelledby="page-title" className="overflow-hidden bg-mal-deep pt-[104px] text-white">
        <div className="wrap flex flex-col gap-[26px] pb-20">
          <span className="eyebrow rise text-copper-light">Carrières</span>
          <h1 id="page-title" className="rise d1 max-w-[1040px] text-[clamp(42px,6.2vw,90px)] font-extrabold leading-[0.95] tracking-[-0.045em]">
            Construisez le numérique de demain, <span className="text-copper-light">depuis Lubumbashi.</span>
          </h1>
          <p className="rise d2 max-w-[600px] text-xl text-mal-fog">On cherche des personnes curieuses, fiables et qui aiment expliquer. Le diplôme compte moins que l’envie d’apprendre.</p>
          <div className="rise d3 flex flex-wrap gap-3">
            <AnchorLink target="postes" className="btn btn-cu-light">
              Voir les postes <ArrowRight />
            </AnchorLink>
            <ButtonLink to={routes.contact} variant="line">
              Candidature spontanée
            </ButtonLink>
          </div>
        </div>
        <div aria-hidden="true" className="flex flex-col gap-1.5 border-t border-[#23463B] py-7">
          <Marquee
            items={['Développement', 'Réseaux', 'Support', 'Design']}
            copies={4}
            pauseOnHover={false}
            trackClassName="marquee-fast"
            render={(word) => <span className="text-outline-glow whitespace-nowrap pr-10 font-display text-[clamp(44px,6vw,84px)] font-extrabold tracking-[-0.04em] [-webkit-text-stroke-width:1.2px]">{word}</span>}
          />
          <Marquee
            items={['IA', 'Relation client', 'Cloud', 'Formation']}
            copies={4}
            pauseOnHover={false}
            trackClassName="marquee-rev"
            render={(word) => <span className="whitespace-nowrap pr-10 font-display text-[clamp(44px,6vw,84px)] font-extrabold tracking-[-0.04em] text-copper-light">{word}</span>}
          />
        </div>
      </section>

      <section aria-labelledby="why-title" className="py-[120px]">
        <div className="wrap flex flex-col gap-11">
          <div className="flex max-w-[720px] flex-col gap-[18px]">
            <span className="eyebrow text-copper">Pourquoi nous rejoindre</span>
            <h2 id="why-title" className="text-[clamp(36px,4.4vw,58px)] font-extrabold">
              Une équipe où l’on apprend vite.
            </h2>
          </div>
          <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-6">
            {reasons.map((reason) => (
              <li key={reason.title} className="card lift flex flex-col gap-3.5 p-8">
                <PathIcon name={reason.icon} size={40} className="draw-icon text-copper" />
                <h3 className="text-[26px] font-bold">{reason.title}</h3>
                <p className="text-ink-soft">{reason.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="stage-title" className="bg-copper py-[88px] text-white">
        <div className="wrap flex flex-wrap items-center justify-between gap-8">
          <div className="flex min-w-0 flex-[1_1_560px] flex-col gap-3.5">
            <span className="eyebrow text-[#FFE6D6]">Stages</span>
            <h2 id="stage-title" className="text-[clamp(32px,4vw,54px)] font-extrabold">
              Étudiant en informatique ? Nos stages sont faits pour vous.
            </h2>
            <p className="max-w-[640px] text-lg text-[#FFF1E8]">
              Stages de fin de cycle et stages d’été, sur de vrais projets clients, avec un encadrant qui suit votre progression et signe vos documents de stage.
            </p>
          </div>
          <ButtonLink to={routes.contact} variant="light">
            Proposer ma candidature
          </ButtonLink>
        </div>
      </section>

      <section id="postes" aria-labelledby="jobs-title" className="py-[120px]">
        <div className="wrap flex flex-col gap-8">
          <div className="flex flex-wrap items-end justify-between gap-[18px]">
            <div className="flex flex-col gap-[18px]">
              <span className="eyebrow text-copper">Postes ouverts</span>
              <h2 id="jobs-title" className="text-[clamp(36px,4.4vw,58px)] font-extrabold">
                Rejoignez l’équipe.
              </h2>
            </div>
            <span className="chip bg-copper-soft text-copper-deep">Postes donnés en exemple</span>
          </div>
          <ul className="border-b-[1.5px] border-ink">
            {jobs.map((job) => (
              <li key={job.title}>
                <Link className="job" to={routes.contact}>
                  <span className="flex min-w-0 flex-[1_1_360px] flex-col gap-1">
                    <span className="font-display text-[clamp(24px,2.6vw,34px)] font-bold leading-[1.1]">{job.title}</span>
                    <span className="text-ink-soft">{job.text}</span>
                  </span>
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="chip bg-stone text-[#2F3833]">{job.type}</span>
                    <span className="chip bg-stone text-[#2F3833]">Lubumbashi</span>
                    <ArrowRight size={36} strokeWidth={1.8} className="arrow" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="process-title" className="border-t-[1.5px] border-ink bg-stone py-[110px]">
        <div className="wrap flex flex-col gap-10">
          <h2 id="process-title" className="text-[clamp(34px,4.2vw,54px)] font-extrabold">
            Comment on recrute
          </h2>
          <ol className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,230px),1fr))] gap-6">
            {hiring.map((step, i) => (
              <li key={step.n} className="flex flex-col gap-2.5">
                <span className={`grid h-[52px] w-[52px] place-items-center rounded-full border-[1.5px] font-mono ${i === hiring.length - 1 ? 'border-copper bg-copper text-white' : 'border-ink bg-white'}`}>{step.n}</span>
                <h3 className="text-[22px] font-bold">{step.title}</h3>
                <p className="text-ink-soft">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="cta-title" className="py-[100px]">
        <div className="wrap flex flex-wrap items-center justify-between gap-8">
          <h2 id="cta-title" className="max-w-[760px] text-[clamp(32px,4.2vw,56px)] font-extrabold">
            Aucun poste ne vous correspond ? <span className="text-copper">Écrivez-nous quand même.</span>
          </h2>
          <ButtonLink to={routes.contact} variant="ink" arrow>
            Candidature spontanée
          </ButtonLink>
        </div>
      </section>
    </>
  )
}
