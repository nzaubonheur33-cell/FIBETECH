import { ButtonLink } from '@/components/ui/button'
import { Wordmark } from '@/components/ui/logo'
import { Ph } from '@/components/ui/placeholder'
import { usePageMeta } from '@/hooks/usePageMeta'
import { routes } from '@/lib/routes'
import { site } from '@/lib/site'

const values = [
  { title: 'Proximité', text: 'On se déplace, on décroche, on répond. Le support ne passe pas par un formulaire anonyme.' },
  { title: 'Clarté', text: 'Des devis lisibles, des explications simples et des délais réalistes.' },
  { title: 'Fiabilité', text: 'Ce qu’on installe doit tenir : sauvegardes, documentation, tests sur le terrain.' },
  { title: 'Transmission', text: 'On forme vos équipes pour que vous restiez maîtres de vos outils.' },
]

// Membres de l'équipe : remplacer les initiales par des photos et compléter les noms.
const team = [
  { name: 'Emmanuel Kayombo', role: 'Développeur full stack et IA', image: 'photo-1500648767791-00dcc994a43e' },
  { name: 'Bonheur Nzau', role: 'Développeur frontend et réseaux', image: 'photo-1506794778202-cad84cf45f1d' },
  { name: 'Jonathan Nathan', role: 'Relation clients et réseaux sociaux', image: 'photo-1507003211169-0a1dd7228f2d' },
  { name: 'Kaleb', role: 'Base de données', image: 'photo-1501196354995-cbb51c65aaea' },
]

export default function About() {
  usePageMeta('À propos', 'Fibetech, startup informatique de Lubumbashi : notre histoire, notre mission, nos valeurs et notre équipe.')

  return (
    <>
      <section aria-labelledby="page-title" className="overflow-hidden border-b-[1.5px] border-ink pt-[88px]">
        <div className="wrap flex flex-wrap items-end gap-10">
          <div className="flex min-w-0 flex-[1_1_560px] flex-col gap-[26px] pb-[88px]">
            <span className="eyebrow rise text-copper">À propos</span>
            <h1 id="page-title" className="rise d1 text-[clamp(42px,6vw,88px)] font-extrabold leading-[0.96] tracking-[-0.04em]">
              Une startup de Lubumbashi, <span className="text-copper">pour Lubumbashi</span> et au-delà.
            </h1>
            <p className="rise d2 max-w-[560px] text-xl text-ink-soft">
              On aide les entreprises, les écoles et les organisations du Haut-Katanga à utiliser la technologie sans se perdre dans le jargon ni dépendre de prestataires lointains.
            </p>
          </div>
          <div aria-hidden="true" className="relative flex min-h-[420px] min-w-0 flex-[1_1_420px] items-center justify-center py-10 max-[760px]:min-h-[310px]">
            <div className="absolute inset-[8%] rounded-[38%] border border-mal/20" />
            <div className="absolute inset-[18%] rounded-[34%] border border-dashed border-copper/35" />
            <div className="relative w-[88%] max-w-[460px] -rotate-2 rounded-[22px] border-[1.5px] border-ink bg-white p-5 shadow-[12px_12px_0_#121614]">
              <div className="flex items-center gap-2 border-b border-line pb-4"><span className="h-2.5 w-2.5 rounded-full bg-copper"/><span className="h-2.5 w-2.5 rounded-full bg-mustard"/><span className="h-2.5 w-2.5 rounded-full bg-mal"/><span className="ml-auto rounded-full bg-stone px-3 py-1 font-mono text-[11px] text-ink-soft">fibetech.cd</span></div>
              <div className="grid grid-cols-[1fr_0.8fr] gap-4 py-5"><div className="flex flex-col justify-center gap-3"><span className="h-3 w-4/5 rounded-full bg-ink"/><span className="h-3 w-full rounded-full bg-line"/><span className="h-3 w-3/4 rounded-full bg-line"/><span className="mt-2 h-9 w-28 rounded-full bg-copper"/></div><div className="grid aspect-square place-items-center rounded-2xl bg-mal-deep"><svg viewBox="0 0 100 100" className="w-3/4"><path d="M20 25h60M20 50h60M20 75h60M30 20v60M50 20v60M70 20v60" stroke="#3FBF8E" strokeWidth="2" opacity=".55"/><circle cx="50" cy="50" r="10" fill="#E8A07A"/><circle cx="50" cy="50" r="20" fill="none" stroke="#E8A07A" strokeWidth="2"/></svg></div></div>
            </div>
            <span className="absolute bottom-[13%] left-[3%] rounded-full border border-ink bg-copper-soft px-4 py-2 font-mono text-xs text-copper-deep">Solutions numériques locales</span>
            <span className="absolute right-[3%] top-[12%] rounded-full border border-ink bg-mal-deep px-4 py-2 font-mono text-xs text-white">RDC · Lubumbashi</span>
          </div>
        </div>
      </section>

      <section aria-labelledby="story-title" className="py-[110px]">
        <div className="wrap flex flex-wrap gap-12">
          <h2 id="story-title" className="eyebrow flex-[1_1_240px] font-mono text-copper">
            Notre histoire
          </h2>
          <div className="flex min-w-0 flex-[3_1_620px] flex-col gap-6">
            <p className="font-display text-[clamp(26px,2.8vw,38px)] font-semibold leading-[1.2] tracking-[-0.02em]">
              Autour de nous, des entreprises solides perdaient du temps avec des outils qui ne leur ressemblaient pas. On a décidé de construire les bons, ici.
            </p>
            <p className="max-w-[720px] text-lg text-ink-soft">
              <Ph wrap>[Racontez en trois ou quatre phrases comment l’équipe est née : la rencontre des fondateurs, le constat de départ, la première mission et ce que vous en avez appris.]</Ph>
            </p>
            <p className="max-w-[720px] text-lg text-ink-soft">
              Aujourd’hui, l’équipe réunit des compétences en développement, en réseaux et en accompagnement. On travaille en français, en swahili et en anglais, au bureau ou chez nos clients.
            </p>
          </div>
        </div>
      </section>

      <section aria-label="Mission et vision" className="pb-[110px]">
        <div className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-6">
          <div className="card lift flex flex-col gap-[18px] p-11 max-[760px]:p-7">
            <span className="eyebrow text-copper">Mission</span>
            <h2 className="text-[clamp(28px,3vw,40px)] font-extrabold">Rendre la technologie utile et accessible aux organisations du Haut-Katanga.</h2>
            <p className="text-ink-soft">Des solutions adaptées à la réalité locale : connexion, énergie, paiement, langues. Et un accompagnement qui ne s’arrête pas à la livraison.</p>
          </div>
          <div className="card lift flex flex-col gap-[18px] bg-mal-deep p-11 text-white max-[760px]:p-7">
            <span className="eyebrow text-copper-light">Vision</span>
            <h2 className="text-[clamp(28px,3vw,40px)] font-extrabold">Que les meilleurs outils numériques de la région soient construits dans la région.</h2>
            <p className="text-mal-fog">Former des talents locaux, garder la valeur ici et montrer qu’une startup de Lubumbashi peut livrer au niveau international.</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="values-title" className="border-y-[1.5px] border-ink bg-stone py-[110px]">
        <div className="wrap flex flex-col gap-10">
          <div className="flex max-w-[720px] flex-col gap-[18px]">
            <span className="eyebrow text-copper">Nos valeurs</span>
            <h2 id="values-title" className="text-[clamp(36px,4.4vw,58px)] font-extrabold">
              Ce qui guide chaque décision.
            </h2>
          </div>
          <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] overflow-hidden rounded-[22px] border-[1.5px] border-ink bg-white">
            {values.map((value, i) => (
              <li key={value.title} className={`value flex min-h-[240px] flex-col gap-3 p-8 ${i < values.length - 1 ? 'border-ink min-[1100px]:border-r-[1.5px] max-[1099px]:border-b-[1.5px]' : ''}`}>
                <h3 className="text-[30px] font-extrabold">{value.title}</h3>
                <p className="text-ink-soft">{value.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="name-title" className="overflow-hidden bg-ink py-[120px] text-white">
        <div className="wrap flex flex-wrap items-center gap-14">
          <div className="flex min-w-0 flex-[1_1_460px] flex-col gap-2.5">
            <h2 id="name-title" className="eyebrow font-mono text-copper-light">
              Pourquoi ce nom
            </h2>
            <p aria-hidden="true" className="text-outline-glow flex whitespace-nowrap font-display" style={{ fontSize: 'clamp(60px, 8.5vw, 120px)', fontWeight: 800, lineHeight: 0.85, letterSpacing: '-0.06em' }}>
              <Wordmark dot="#E8A07A" dotTop="0.001em" />
            </p>
            <p className="font-mono text-[15px] text-mal-mist">fibetech · startup informatique · Lubumbashi</p>
          </div>
          <div className="flex min-w-0 flex-[1_1_460px] flex-col gap-5">
            <p className="font-display text-[clamp(22px,2.2vw,30px)] font-semibold leading-[1.25]">
              <Ph dark wrap className="text-[0.62em]">
                [Racontez ici l’origine du nom Fibetech : ce qu’il évoque pour vous et d’où vient l’idée.]
              </Ph>
            </p>
            <p className="text-lg text-mal-fog">Un nom court, qu’on retient après l’avoir entendu une seule fois au téléphone.</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="team-title" className="py-[120px]">
        <div className="wrap flex flex-col gap-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="flex max-w-[720px] flex-col gap-[18px]">
              <span className="eyebrow text-copper">L’équipe</span>
              <h2 id="team-title" className="text-[clamp(36px,4.4vw,58px)] font-extrabold">
                Les visages derrière vos projets.
              </h2>
            </div>
          </div>
          <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,250px),1fr))] gap-6">
            {team.map((member) => (
              <li key={member.name} className="card lift flex flex-col overflow-hidden">
                <div className="relative h-[280px] overflow-hidden border-b-[1.5px] border-ink bg-stone">
                  <img src={`https://images.unsplash.com/${member.image}?auto=format&fit=crop&w=800&h=700&q=85`} alt={`Portrait de ${member.name}`} loading="lazy" className="h-full w-full object-cover object-center transition-transform duration-500 hover:scale-[1.04]" />
                </div>
                <div className="flex flex-col gap-1 px-6 pb-[26px] pt-[22px]">
                  <h3 className="text-[22px] font-bold">{member.name}</h3>
                  <p className="text-ink-soft">{member.role}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="where-title" className="pb-[120px]">
        <div className="wrap">
          <div className="flex flex-wrap overflow-hidden rounded-[28px] border-[1.5px] border-ink">
            <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-[22px] p-12 max-[760px]:p-7">
              <span className="eyebrow text-copper">Où nous trouver</span>
              <h2 id="where-title" className="text-[clamp(34px,4vw,54px)] font-extrabold">
                On est juste à côté.
              </h2>
              <p className="font-mono text-[clamp(20px,2.4vw,30px)] tracking-[0.02em]">{site.coords}</p>
              <dl className="m-0 grid gap-3">
                <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                  <dt className="min-w-[90px] text-ink-muted">Adresse</dt>
                  <dd className="m-0">
                    {site.fullAddress}
                  </dd>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                  <dt className="min-w-[90px] text-ink-muted">Horaires</dt>
                  <dd className="m-0">
                    <Ph>{site.hours}</Ph>
                  </dd>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                  <dt className="min-w-[90px] text-ink-muted">Téléphone</dt>
                  <dd className="m-0 font-mono">{site.phone}</dd>
                </div>
              </dl>
              <ButtonLink to={routes.contact} className="self-start">
                Planifier une visite
              </ButtonLink>
            </div>
            <MapCard />
          </div>
        </div>
      </section>
    </>
  )
}

function MapCard() {
  const mapQuery = encodeURIComponent('Route Kasapa, Lubumbashi, République démocratique du Congo')
  return (
    <div className="relative min-h-[420px] min-w-0 flex-[1_1_420px] overflow-hidden border-ink min-[900px]:border-l-[1.5px] max-[899px]:border-t-[1.5px]">
      <iframe title={`Carte de localisation : ${site.fullAddress}`} src={`https://maps.google.com/maps?q=${mapQuery}&z=14&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 h-full min-h-[420px] w-full border-0 grayscale-[15%]" />
      <div className="absolute left-[52%] top-[40%]">
        <a href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`} target="_blank" rel="noreferrer" aria-label={`Ouvrir la carte de ${site.fullAddress}`} className="absolute -left-2.5 -top-2.5 grid h-5 w-5 place-items-center rounded-full border-[3px] border-white bg-copper shadow-[0_0_0_2px_#121614]" />
        <a href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`} target="_blank" rel="noreferrer" className="absolute -top-4 left-[18px] whitespace-nowrap rounded-full border-[1.5px] border-ink bg-white px-2.5 py-1 font-mono text-xs text-ink shadow-md">Fibetech · {site.city}</a>
      </div>
    </div>
  )
}
