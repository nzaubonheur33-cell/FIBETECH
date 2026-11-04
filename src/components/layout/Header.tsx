import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
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
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setMobileOpen(false), [pathname])

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 text-ink shadow-sm backdrop-blur">
      <div className="mx-auto flex min-h-[76px] max-w-[1320px] flex-wrap items-center justify-between gap-x-7 gap-y-2.5 py-3 max-[760px]:gap-x-2 max-[760px]:py-2 pl-[max(20px,env(safe-area-inset-left,0px))] pr-[max(20px,env(safe-area-inset-right,0px))]">
        <Link to={routes.home} aria-label="Fibetech, retour à l’accueil" className="logo inline-flex min-h-[44px] items-center text-ink no-underline hover:text-ink">
          <Logo size={34} />
        </Link>

        {/* Sous 1100 px, le menu passe sur sa propre ligne (défilante sous 760 px). */}
        <nav className="nav-links flex flex-auto justify-center max-[1099px]:order-3 max-[1099px]:basis-full max-[760px]:hidden" aria-label="Navigation principale">
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
          <ButtonLink to={routes.contact} className="min-h-[46px] px-5 text-[15px] max-[760px]:min-h-10 max-[760px]:px-3 max-[760px]:text-sm">
            <span className="max-[760px]:hidden">Demander un devis</span><span className="min-[761px]:hidden">Devis</span>
          </ButtonLink>
          <button type="button" aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={mobileOpen} aria-controls="mobile-navigation" onClick={() => setMobileOpen((open) => !open)} className="mobile-menu-toggle hidden h-10 w-10 place-items-center rounded-full border-[1.5px] border-ink bg-white text-ink max-[760px]:grid">
            {mobileOpen ? <svg aria-hidden="true" viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m6 6 12 12M18 6 6 18" /></svg> : <svg aria-hidden="true" viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>}
          </button>
        </div>
        <nav id="mobile-navigation" className={`${mobileOpen ? 'grid' : 'hidden'} mobile-navigation order-4 basis-full pb-2 min-[761px]:hidden`} aria-label="Navigation mobile" aria-hidden={!mobileOpen}><ul className="m-0 grid list-none grid-cols-2 gap-2 border-t border-line pt-3 pl-0">{links.map((link) => <li key={link.to}><NavLink to={link.to} end={link.end} onClick={() => setMobileOpen(false)} className="mobile-navlink">{link.label}<svg aria-hidden="true" viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10h12m-5-5 5 5-5 5" /></svg></NavLink></li>)}</ul></nav>
      </div>
    </header>
  )
}
