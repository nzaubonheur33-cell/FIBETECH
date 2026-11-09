import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import '../fonts.css'
import '../app.css'

const siteUrl = process.env.SITE_URL

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: {
    default: 'Fibetech · Startup informatique à Lubumbashi',
    template: 'Fibetech · %s',
  },
  description: 'Sites web, applications, IA, réseaux et assistance informatique à Lubumbashi. Une équipe d’ici qui conçoit vos outils, les installe et reste à vos côtés.',
  icons: { icon: '/favicon.svg' },
  openGraph: {
    type: 'website',
    locale: 'fr_CD',
    siteName: 'Fibetech',
    title: 'Fibetech · Le numérique au service de ceux qui font bouger Lubumbashi',
    description: 'Sites web, applications, IA, réseaux et assistance informatique. Une équipe locale, à Lubumbashi.',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#121614',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
