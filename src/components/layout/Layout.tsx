import { Suspense, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { knownPaths } from '@/lib/routes'
import { scrollToId } from '@/lib/utils'
import Footer from './Footer'
import Header from './Header'

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
      <main id="contenu" className="overflow-x-hidden">
        <Suspense fallback={<div className="min-h-[70vh]" aria-busy="true" />}>
          <Outlet />
        </Suspense>
      </main>
      {showFooter && <Footer />}
    </>
  )
}
