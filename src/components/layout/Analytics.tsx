'use client'

import { useEffect } from 'react'
import { CONSENT_CHANGED_EVENT, clearAnalyticsCookies, readConsent, type AnalyticsConsent } from '@/lib/analytics'

type Gtag = (...args: unknown[]) => void
declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: Gtag
    [key: `ga-disable-${string}`]: boolean | undefined
  }
}

/**
 * Charge Google Analytics 4 seulement si le visiteur a accepté.
 * Les changements de page sont mesurés par GA4 lui-même (mesure améliorée,
 * « changements de page basés sur l'historique du navigateur »).
 */
export default function Analytics({ id }: { id: string }) {
  useEffect(() => {
    if (!id) return

    const start = () => {
      window[`ga-disable-${id}`] = false
      if (window.gtag) return
      window.dataLayer = window.dataLayer || []
      window.gtag = function gtag() {
        // gtag.js attend l'objet « arguments » tel quel.
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer!.push(arguments)
      }
      window.gtag('js', new Date())
      window.gtag('config', id)
      const script = document.createElement('script')
      script.async = true
      script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`
      document.head.appendChild(script)
    }

    const stop = () => {
      window[`ga-disable-${id}`] = true
      clearAnalyticsCookies()
    }

    const apply = (consent: AnalyticsConsent | null) => (consent === 'granted' ? start() : consent === 'denied' ? stop() : undefined)
    apply(readConsent())

    const onChange = (event: Event) => apply((event as CustomEvent<AnalyticsConsent>).detail)
    window.addEventListener(CONSENT_CHANGED_EVENT, onChange)
    return () => window.removeEventListener(CONSENT_CHANGED_EVENT, onChange)
  }, [id])

  return null
}
