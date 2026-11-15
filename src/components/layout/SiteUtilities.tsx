'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState, type ReactNode } from 'react'
import type { LayoutContent } from '@/content/blocks'
import { OPEN_COOKIE_SETTINGS_EVENT, readConsent, saveConsent, type AnalyticsConsent } from '@/lib/analytics'

const CONSENT_KEY = 'fibetech-cookie-notice-dismissed'
const COOKIE_BANNER_EVENT = 'fibetech-cookie-banner-change'

export function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight
        setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0)
      })
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return <div className="scroll-progress" role="progressbar" aria-label="Progression de lecture" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress * 100)}><span style={{ transform: `scaleX(${progress})` }} /></div>
}

export function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  const [cookieNoticeVisible, setCookieNoticeVisible] = useState(false)

  useEffect(() => {
    const update = () => setVisible(window.scrollY > 420)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  useEffect(() => {
    // Le bandeau cookies publie son état sur <html data-cookie-banner> et par un événement.
    const sync = () => setCookieNoticeVisible(document.documentElement.dataset.cookieBanner === 'open')
    sync()
    window.addEventListener(COOKIE_BANNER_EVENT, sync)
    return () => window.removeEventListener(COOKIE_BANNER_EVENT, sync)
  }, [])

  if (!visible) return null
  return <button type="button" aria-label="Remonter en haut de la page" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={`scroll-top ${cookieNoticeVisible ? 'scroll-top-raised' : ''}`}><svg aria-hidden="true" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 7-7 7 7M12 5v14"/></svg></button>
}

/**
 * Bandeau cookies.
 * - Sans Google Analytics : simple information, fermée une fois pour toutes.
 * - Avec Google Analytics : demande l'accord (Accepter / Refuser) avant toute mesure,
 *   et se rouvre depuis le lien « Cookies » du pied de page.
 */
export function CookieBanner({ cookie, analytics }: { cookie: LayoutContent['cookie']; analytics: boolean }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (analytics) {
      setVisible(readConsent() === null)
    } else {
      try {
        setVisible(!window.localStorage.getItem(CONSENT_KEY))
      } catch {
        setVisible(true)
      }
    }
    const reopen = () => setVisible(true)
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, reopen)
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, reopen)
  }, [analytics])

  useEffect(() => {
    document.documentElement.dataset.cookieBanner = visible ? 'open' : 'closed'
    window.dispatchEvent(new Event(COOKIE_BANNER_EVENT))
  }, [visible])

  const dismiss = () => {
    try {
      window.localStorage.setItem(CONSENT_KEY, 'true')
    } catch {
      // The notice can still be dismissed for this page view if storage is blocked.
    }
    setVisible(false)
  }

  const choose = (value: AnalyticsConsent) => {
    saveConsent(value)
    setVisible(false)
  }

  if (!visible) return null
  return <aside className="cookie-banner" aria-label="Information sur les cookies" aria-live="polite">
    <div className="flex flex-col gap-2">
      <strong className="font-display text-lg">{cookie.title}</strong>
      <p className="m-0 text-sm leading-relaxed text-ink-soft">{analytics ? cookie.analyticsText : cookie.text}</p>
      <Link href="/confidentialite" className="link self-start text-sm">{cookie.link}</Link>
    </div>
    {analytics ? (
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" className="btn btn-ink min-h-10 px-5 text-sm" onClick={() => choose('granted')}>{cookie.accept}</button>
        <button type="button" className="btn btn-ghost min-h-10 px-5 text-sm" onClick={() => choose('denied')}>{cookie.refuse}</button>
      </div>
    ) : (
      <button type="button" className="btn btn-ink mt-4 min-h-10 self-start px-5 text-sm" onClick={dismiss}>{cookie.button}</button>
    )}
  </aside>
}

/** Petite animation d'entrée à chaque changement de page. */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  return (
    <div key={pathname} className="page-enter">
      {children}
    </div>
  )
}

export function PageLoader() {
  return (
    <div className="grid min-h-[70vh] place-items-center" role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-5">
        <span className="loader-mark" aria-hidden="true" />
        <span className="font-mono text-sm text-ink-muted">Chargement de la page…</span>
        <span className="loader-track" aria-hidden="true">
          <span />
        </span>
      </div>
    </div>
  )
}
