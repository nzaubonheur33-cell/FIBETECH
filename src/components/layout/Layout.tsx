import { Suspense, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { knownPaths } from '@/lib/routes'
import { scrollToId } from '@/lib/utils'
import Footer from './Footer'
import Header from './Header'
import { CookieBanner, ScrollProgress, ScrollToTop } from './SiteUtilities'

function PageLoader() {
  return <div className="grid min-h-[70vh] place-items-center" role="status" aria-live="polite"><div className="flex flex-col items-center gap-5"><span className="loader-mark" aria-hidden="true" /><span className="font-mono text-sm text-ink-muted">Chargement de la page…</span><span className="loader-track" aria-hidden="true"><span /></span></div></div>
}

export default function Layout() {
  const { pathname, search } = useLocation()

  // Remonte en haut à chaque changement de page ; ?s=xxx fait défiler jusqu'à une section.
  useEffect(() => {
    const section = new URLSearchParams(search).get('s')
    if (section) {
      const timer = window.setTimeout(() => scrollToId(section), 60)
      return () => window.clearTimeout(timer)
    }
    window.scrollTo(0, 0)
  }, [pathname, search])

  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
  const showFooter = knownPaths.includes(normalized)

  return (
    <>
      <a
        className="skip-link"
        href="#contenu"
        onClick={(event) => {
          event.preventDefault()
          scrollToId('contenu')
        }}
      >
        Aller au contenu
      </a>
      <Header />
      <ScrollProgress />
      <main id="contenu" className="overflow-x-hidden">
        <Suspense fallback={<PageLoader />}>
          <div key={pathname} className="page-enter"><Outlet /></div>
        </Suspense>
      </main>
      {showFooter && <Footer />}
      <CookieBanner />
      <ScrollToTop />
    </>
  )
}
