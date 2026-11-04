import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { routes } from '@/lib/routes'

const CONSENT_KEY = 'fibetech-cookie-notice-dismissed'

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
    try {
      setCookieNoticeVisible(!window.localStorage.getItem(CONSENT_KEY))
    } catch {
      setCookieNoticeVisible(true)
    }
    const onDismiss = () => setCookieNoticeVisible(false)
    window.addEventListener('fibetech-cookie-dismissed', onDismiss)
    return () => window.removeEventListener('fibetech-cookie-dismissed', onDismiss)
  }, [])

  if (!visible) return null
  return <button type="button" aria-label="Remonter en haut de la page" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={`scroll-top ${cookieNoticeVisible ? 'scroll-top-raised' : ''}`}><svg aria-hidden="true" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 7-7 7 7M12 5v14"/></svg></button>
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      setVisible(!window.localStorage.getItem(CONSENT_KEY))
    } catch {
      setVisible(true)
    }
  }, [])

  const dismiss = () => {
    try {
      window.localStorage.setItem(CONSENT_KEY, 'true')
    } catch {
      // The notice can still be dismissed for this page view if storage is blocked.
    }
    setVisible(false)
    window.dispatchEvent(new Event('fibetech-cookie-dismissed'))
  }

  if (!visible) return null
  return <aside className="cookie-banner" aria-label="Information sur les cookies" aria-live="polite">
    <div className="flex flex-col gap-2">
      <strong className="font-display text-lg">Cookies et confidentialité</strong>
      <p className="m-0 text-sm leading-relaxed text-ink-soft">Ce site n’utilise pas de cookies publicitaires ou de mesure d’audience. Seul votre choix de fermeture de ce message est mémorisé sur cet appareil.</p>
      <Link to={routes.privacy} className="link self-start text-sm">Lire la politique de confidentialité</Link>
    </div>
    <button type="button" className="btn btn-ink mt-4 min-h-10 self-start px-5 text-sm" onClick={dismiss}>J’ai compris</button>
  </aside>
}
