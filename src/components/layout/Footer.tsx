import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Logo, Wordmark } from '@/components/ui/logo'
import { routes } from '@/lib/routes'
import { site } from '@/lib/site'

const columns = [
  {
    title: 'Services',
    links: [
      { to: routes.web, label: 'Web et mobile' },
      { to: routes.ia, label: 'IA et automatisation' },
      { to: routes.reseau, label: 'Réseaux' },
      { to: routes.training, label: 'Formations' },
    ],
  },
  {
    title: 'Entreprise',
    links: [
      { to: routes.about, label: 'À propos' },
      { to: routes.work, label: 'Réalisations' },
      { to: routes.blog, label: 'Blog' },
    ],
  },
  {
    title: 'Aide',
    links: [
      { to: routes.pricing, label: 'Tarifs' },
      { to: routes.faq, label: 'Questions fréquentes' },
      { to: routes.contact, label: 'Demander un devis' },
    ],
  },
]

const columnTitle = 'm-0 font-mono text-xs font-medium uppercase tracking-[0.14em] text-copper-light'

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false)

  const onSubscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // À brancher sur votre outil d'e-mailing (Brevo, Resend, Mailchimp…).
    setSubscribed(true)
  }

  return (
    <footer className="overflow-hidden bg-mal-deep text-[16px] text-white">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-16 pl-[max(20px,env(safe-area-inset-left,0px))] pr-[max(20px,env(safe-area-inset-right,0px))] pt-24">
        <div className="flex flex-wrap gap-14">
          <div className="flex min-w-0 flex-[1_1_340px] flex-col gap-[22px]">
            <Link to={routes.home} aria-label="Fibetech, retour à l’accueil" className="logo inline-flex min-h-[44px] items-center self-start text-white no-underline hover:text-white">
              <Logo tone="dark" size={34} />
            </Link>
            <p className="max-w-[380px] text-mal-mist">
              Startup informatique basée à Lubumbashi. Sites web, applications, IA, réseaux et assistance pour les entreprises du Haut-Katanga.
            </p>
            <form aria-label="Inscription aux conseils par e-mail" className="flex max-w-[420px] flex-col gap-2.5" onSubmit={onSubscribe}>
              <label htmlFor="footer-email" className="font-semibold">
                Nos conseils numériques, par e-mail
              </label>
              {subscribed ? (
                <p role="status" className="reveal text-mal-glow">
                  Merci, vous êtes inscrit.
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  <input
                    id="footer-email"
                    type="email"
                    required
                    placeholder="vous@entreprise.cd"
                    autoComplete="email"
                    className="min-h-[50px] min-w-0 flex-[1_1_200px] rounded-full border-[1.5px] border-[#3D5A50] bg-mal-panel px-[18px] text-base text-white placeholder:text-mal-mist"
                  />
                  <button type="submit" className="btn btn-light-cu min-h-[50px] px-[22px]">
                    S’inscrire
                  </button>
                </div>
              )}
            </form>
          </div>

          <div className="grid min-w-0 flex-[2_1_560px] grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-x-7 gap-y-9">
            {columns.map((column) => (
              <div key={column.title} className="flex flex-col gap-3.5">
                <h2 className={columnTitle}>{column.title}</h2>
                <ul className="m-0 flex list-none flex-col gap-2 p-0">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link className="flink" to={link.to}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="flex flex-col gap-3.5">
              <h2 className={columnTitle}>Contact</h2>
              <ul className="m-0 flex list-none flex-col gap-2 p-0 text-mal-fog">
                <li className="font-mono text-sm">{site.phone}</li>
                <li><a className="flink" href={`mailto:${site.email}`}>{site.email}</a></li>
                <li>
                  <span className="ph-d">{site.address}</span>, {site.city}
                </li>
                <li className="flex flex-wrap gap-3 pt-1.5">
                  {site.socials.map((social) => (
                    <a key={social.label} className="flink" href={social.href} target="_blank" rel="noreferrer">
                      {social.label}
                    </a>
                  ))}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-7 text-sm text-mal-mist">
          <span>© {new Date().getFullYear()} Fibetech. Tous droits réservés.</span>
          <span className="flex flex-wrap gap-[18px]">
            <Link className="flink" to={routes.legal}>
              Mentions légales
            </Link>
            <Link className="flink" to={routes.privacy}>
              Confidentialité
            </Link>
            <Link className="flink" to={routes.terms}>
              Conditions générales
            </Link>
          </span>
          <span className="font-mono text-xs tracking-[0.06em]">
            {site.city}, {site.region}
          </span>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="text-outline-glow mt-10 flex select-none justify-center whitespace-nowrap font-display"
        style={{ fontSize: 'clamp(90px, 21vw, 300px)', fontWeight: 800, lineHeight: 0.8, letterSpacing: '-0.06em', transform: 'translateY(14%)' }}
      >
        <Wordmark dot="#E8A07A" dotTop="-0.024em" />
      </div>
    </footer>
  )
}
