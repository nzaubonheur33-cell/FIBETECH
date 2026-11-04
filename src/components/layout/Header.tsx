import { Link, NavLink } from 'react-router-dom'
import { ButtonLink } from '@/components/ui/button'
import { Logo } from '@/components/ui/logo'
import { routes } from '@/lib/routes'
import { site } from '@/lib/site'

const links = [
  { to: routes.home, label: 'Accueil', end: true },
  { to: routes.services, label: 'Services' },
  { to: routes.training, label: 'Formations' },
  { to: routes.pricing, label: 'Tarifs' },
  { to: routes.work, label: 'Réalisations' },
  { to: routes.about, label: 'À propos' },
  { to: routes.blog, label: 'Blog' },
  { to: routes.contact, label: 'Contact' },
]

export default function Header() {
  return (
    <header className="border-b border-line bg-white text-ink">
      <div className="mx-auto flex min-h-[84px] max-w-[1320px] flex-wrap items-center justify-between gap-x-7 gap-y-2.5 py-3 max-[760px]:gap-x-3 pl-[max(20px,env(safe-area-inset-left,0px))] pr-[max(20px,env(safe-area-inset-right,0px))]">
        <Link to={routes.home} aria-label="Fibetech, retour à l’accueil" className="logo inline-flex min-h-[44px] items-center text-ink no-underline hover:text-ink">
          <Logo size={34} />
        </Link>

        {/* Sous 1100 px, le menu passe sur sa propre ligne (défilante sous 760 px). */}
        <nav className="nav-links flex flex-auto justify-center max-[1099px]:order-3 max-[1099px]:basis-full max-[760px]:justify-start" aria-label="Navigation principale">
          <ul className="m-0 flex list-none flex-wrap justify-center gap-x-6 gap-y-0.5 p-0 max-[1199px]:gap-x-5 max-[760px]:justify-start">
            {links.map((link) => (
              // Entre 1100 et 1200 px, « Accueil » est masqué : le logo ramène déjà à l'accueil.
              <li key={link.to} className={link.end ? 'whitespace-nowrap min-[1100px]:max-[1199px]:hidden' : 'whitespace-nowrap'}>
                <NavLink to={link.to} end={link.end} className="navlink">
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-[18px]">
          <span className="font-mono text-[13px] text-ink-soft max-[760px]:hidden min-[1100px]:max-[1359px]:hidden">{site.phone}</span>
          <ButtonLink to={routes.contact} className="min-h-[46px] px-5 text-[15px] max-[480px]:px-4 max-[480px]:text-sm">
            Demander un devis
          </ButtonLink>
        </div>
      </div>
    </header>
  )
}
