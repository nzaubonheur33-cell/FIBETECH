import type { ReactNode } from 'react'
import { getBlock, getSite } from '@/lib/content'
import Footer from './Footer'
import Header from './Header'
import { SiteLanguageProvider } from './SiteLanguage'
import { CookieBanner, PageTransition, ScrollProgress, ScrollToTop } from './SiteUtilities'

/** En-tête, contenu et pied de page communs à toutes les pages publiques. */
export default async function SiteChrome({ children, footer = true }: { children: ReactNode; footer?: boolean }) {
  const [site, layout] = await Promise.all([getSite(), getBlock('layout')])

  return (
    <SiteLanguageProvider>
      <a className="skip-link" href="#contenu">
        Aller au contenu
      </a>
      <Header header={layout.header} phone={site.phone} />
      <ScrollProgress />
      <main id="contenu" tabIndex={-1} className="overflow-x-hidden outline-none">
        <PageTransition>{children}</PageTransition>
      </main>
      {footer && <Footer footer={layout.footer} site={site} />}
      <CookieBanner cookie={layout.cookie} />
      <ScrollToTop />
    </SiteLanguageProvider>
  )
}
