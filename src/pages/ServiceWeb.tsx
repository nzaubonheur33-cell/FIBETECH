import { Link } from 'react-router-dom'
import { InkCta } from '@/components/layout/CtaBand'
import { BrowserFrame, MobileMoneyPill, PhoneFrame, wax } from '@/components/illustrations/mocks'
import { Accordion } from '@/components/ui/accordion'
import { ButtonLink } from '@/components/ui/button'
import { Check, PathIcon, type IconName } from '@/components/ui/icons'
import { Ph } from '@/components/ui/placeholder'
import { webFaq } from '@/data/faq'
import { usePageMeta } from '@/hooks/usePageMeta'
import { routes } from '@/lib/routes'

const deliverables: { title: string; text: string; icon: IconName }[] = [
  { title: 'Design sur mesure', text: 'Une identité qui vous ressemble, pas un modèle vu partout.', icon: 'star' },
  { title: 'Pensé pour le mobile', text: 'La majorité de vos visiteurs arrive depuis un téléphone.', icon: 'phone' },
  { title: 'Paiement mobile', text: 'M-Pesa, Airtel Money, Orange Money, ou paiement à la livraison.', icon: 'card' },
  { title: 'WhatsApp et formulaires', text: 'Vos clients vous écrivent en un clic, vous recevez tout au même endroit.', icon: 'chat' },
  { title: 'Référencement local', text: 'Fiche Google Maps et pages pensées pour les recherches à Lubumbashi.', icon: 'pin' },
  { title: 'Domaine et hébergement', text: 'Adresse en .cd ou .com, e-mails professionnels, certificat de sécurité.', icon: 'globe' },
  { title: 'Espace d’administration', text: 'Modifiez textes, photos, produits et prix sans compétence technique.', icon: 'admin' },
  { title: 'Formation et guide', text: 'Une séance avec vos équipes et un guide en français.', icon: 'book' },
]

const projectTypes = [
  { title: 'Site vitrine', text: 'Présenter votre activité, rassurer et recevoir des demandes.' },
  { title: 'Boutique en ligne', text: 'Catalogue, panier, paiement mobile et suivi des commandes.' },
  { title: 'Application mobile', text: 'Android et iOS, avec mode hors ligne pour le terrain.' },
  { title: 'Plateforme sur mesure', text: 'Gestion interne, portail client, inscriptions, réservations.' },
]

const phases = [
  { n: '01', title: 'Atelier de cadrage', text: 'Une séance pour fixer les objectifs, les pages, les fonctions et le budget.' },
  { n: '02', title: 'Maquettes', text: 'Vous voyez le site avant qu’une seule ligne de code soit écrite, et vous le corrigez.' },
  { n: '03', title: 'Développement', text: 'Démonstration régulière sur un lien de test que vous pouvez partager en interne.' },
  { n: '04', title: 'Tests sur vrais téléphones', text: 'Petits écrans, connexion lente, différents navigateurs : on vérifie tout.' },
  { n: '05', title: 'Mise en ligne', text: 'Domaine, hébergement, e-mails et fiche Google configurés.' },
  { n: '06', title: 'Formation et suivi', text: 'Vos équipes prennent la main, et on reste joignables pour la suite.' },
]

export default function ServiceWeb() {
  usePageMeta('Web et mobile', 'Sites web, boutiques en ligne et applications mobiles rapides en 3G, avec paiement mobile, à Lubumbashi.')

  return (
    <>
      <section aria-labelledby="page-title" className="border-b-[1.5px] border-ink pb-24 pt-[72px]">
        <div className="wrap flex flex-wrap items-center gap-14">
          <div className="flex min-w-0 flex-[1_1_520px] flex-col gap-[26px]">
            <nav aria-label="Fil d’Ariane" className="flex flex-wrap gap-2 font-mono text-[13px] text-ink-muted">
              <Link to={routes.services} className="text-ink-muted">
                Services
              </Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page" className="text-ink">
                Web et mobile
              </span>
            </nav>
            <h1 id="page-title" className="rise text-[clamp(42px,5.6vw,80px)] font-extrabold leading-[0.96] tracking-[-0.04em]">
              Des sites et des applications qui travaillent pour vous, <span className="text-copper">même en 3G.</span>
            </h1>
            <p className="rise d1 max-w-[560px] text-xl text-ink-soft">
              On conçoit, on développe, on met en ligne et on forme vos équipes. Le code, les accès et le nom de domaine restent à votre nom.
            </p>
            <div className="rise d2 flex flex-wrap gap-3">
              <ButtonLink to={routes.contact} arrow>
                Demander un devis
              </ButtonLink>
              <ButtonLink to={routes.pricing} variant="ghost">
                Voir les tarifs
              </ButtonLink>
            </div>
          </div>

          <div aria-hidden="true" className="relative h-[520px] min-w-0 flex-[1_1_460px]">
            <div className="absolute inset-[6%_0_0_8%] rounded-[32px] border-[1.5px] border-ink bg-copper-soft" />
            <BrowserFrame url="votre-entreprise.cd" className="float absolute left-0 top-[12%] w-[78%] rounded-2xl shadow-[10px_10px_0_#121614]">
              <div className="grid grid-cols-[1.3fr_1fr] gap-3.5 p-5">
                <div className="flex flex-col gap-2.5">
                  <span className="h-[18px] w-[90%] rounded-md bg-ink" />
                  <span className="h-[18px] w-[70%] rounded-md bg-ink" />
                  <span className="mt-1.5 h-2 w-[95%] rounded-md bg-line" />
                  <span className="h-2 w-4/5 rounded-md bg-line" />
                  <span className="mt-2 h-8 w-[110px] rounded-full bg-copper" />
                </div>
                <span className="rounded-xl" style={wax.copper} />
              </div>
            </BrowserFrame>
            <PhoneFrame className="float-2 absolute bottom-0 right-[2%] h-[320px] w-[170px] rounded-[30px] px-3.5 pb-3.5 pt-[26px]">
              <span className="h-[9px] w-1/2 rounded-full bg-ink" />
              <span className="h-[90px] rounded-xl" style={{ background: 'radial-gradient(circle, #FFFFFF 0 16%, transparent 17%) 0 0/18px 18px, #B4532A' }} />
              <span className="h-2 w-4/5 rounded-full bg-line" />
              <span className="h-2 w-3/5 rounded-full bg-line" />
              <MobileMoneyPill className="mt-auto grid h-9 place-items-center text-[11px]" />
            </PhoneFrame>
            <span className="chip absolute bottom-[10%] left-[6%] border-[1.5px] border-ink bg-white text-ink">
              <Check size={14} strokeWidth={3} className="text-mal" />
              Mode hors ligne
            </span>
            <span className="chip float absolute right-[4%] top-[2%] border-[1.5px] border-ink bg-mustard text-ink">Visible sur Google Maps</span>
          </div>
        </div>
      </section>

      <section aria-labelledby="deliver-title" className="py-[120px]">
        <div className="wrap flex flex-col gap-12">
          <div className="flex max-w-[760px] flex-col gap-[18px]">
            <span className="eyebrow text-copper">Inclus dans chaque projet</span>
            <h2 id="deliver-title" className="text-[clamp(36px,4.6vw,62px)] font-extrabold">
              Ce que vous recevez, noir sur blanc.
            </h2>
          </div>
          <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,270px),1fr))] gap-5">
            {deliverables.map((item) => (
              <li key={item.title} className="card lift flex flex-col gap-3 p-[26px]">
                <PathIcon name={item.icon} size={34} className="draw-icon text-copper" />
                <h3 className="text-[21px] font-bold">{item.title}</h3>
                <p className="text-[15px] text-ink-soft">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="types-title" className="border-y-[1.5px] border-ink bg-stone py-[120px]">
        <div className="wrap flex flex-col gap-12">
          <div className="flex max-w-[760px] flex-col gap-[18px]">
            <span className="eyebrow text-copper">Types de projets</span>
            <h2 id="types-title" className="text-[clamp(36px,4.6vw,62px)] font-extrabold">
              Quel projet vous ressemble ?
            </h2>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-5">
            {projectTypes.map((type) => (
              <article key={type.title} className="card lift flex flex-col gap-3.5 p-7">
                <h3 className="text-[26px] font-bold">{type.title}</h3>
                <p className="flex-grow text-base text-ink-soft">{type.text}</p>
                <dl className="m-0 grid gap-2 border-t border-line pt-3.5 text-[15px]">
                  <div className="flex justify-between gap-2.5">
                    <dt className="text-ink-muted">Délai indicatif</dt>
                    <dd className="m-0">
                      <Ph>[X] sem.</Ph>
                    </dd>
                  </div>
                  <div className="flex justify-between gap-2.5">
                    <dt className="text-ink-muted">Budget</dt>
                    <dd className="m-0">
                      dès <Ph>[PRIX] $</Ph>
                    </dd>
                  </div>
                </dl>
                <Link className="link self-start" to={routes.contact}>
                  Choisir ce projet
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="timeline-title" className="py-[120px]">
        <div className="wrap flex flex-wrap gap-14">
          <div className="flex min-w-0 flex-[1_1_360px] flex-col gap-[18px]">
            <span className="eyebrow text-copper">Déroulé</span>
            <h2 id="timeline-title" className="text-[clamp(36px,4.4vw,58px)] font-extrabold">
              Comment se passe un projet web.
            </h2>
            <p className="text-lg text-ink-soft">Une démonstration à chaque étape. Vous ne découvrez jamais le résultat le jour de la livraison.</p>
          </div>
          <ol className="flex min-w-0 flex-[2_1_560px] flex-col">
            {phases.map((phase, i) => (
              <li key={phase.n} className="grid grid-cols-[64px_minmax(0,1fr)] gap-[22px] pb-[34px]">
                <div className="flex flex-col items-center">
                  <span className="grid h-14 w-14 place-items-center rounded-full border-[1.5px] border-ink bg-white font-mono text-[15px]">{phase.n}</span>
                  {i < phases.length - 1 && <span aria-hidden="true" className="mt-1.5 w-[1.5px] flex-1 bg-ink/25" />}
                </div>
                <div className="flex flex-col gap-1.5 pt-3">
                  <h3 className="text-2xl font-bold">{phase.title}</h3>
                  <p className="text-ink-soft">{phase.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="faq-title" className="border-t-[1.5px] border-ink bg-stone py-[120px]">
        <div className="wrap flex flex-wrap gap-14">
          <div className="flex min-w-0 flex-[1_1_320px] flex-col gap-[18px]">
            <span className="eyebrow text-copper">Questions</span>
            <h2 id="faq-title" className="text-[clamp(36px,4.4vw,58px)] font-extrabold">
              Ce qu’on nous demande souvent.
            </h2>
            <Link className="link self-start" to={routes.faq}>
              Toutes les questions
            </Link>
          </div>
          <Accordion items={webFaq} className="min-w-0 flex-[2_1_560px]" />
        </div>
      </section>

      <InkCta
        title={
          <>
            Votre site peut être en ligne <span className="text-copper-light">plus vite que vous ne le pensez.</span>
          </>
        }
        cta="Lancer mon projet"
      />
    </>
  )
}
