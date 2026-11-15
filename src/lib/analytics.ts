// Mesure d'audience Google Analytics 4, chargée uniquement après l'accord du visiteur.

export const ANALYTICS_CONSENT_KEY = 'fibetech-analytics-consent'
export const CONSENT_CHANGED_EVENT = 'fibetech-analytics-consent-changed'
export const OPEN_COOKIE_SETTINGS_EVENT = 'fibetech-open-cookie-settings'

export type AnalyticsConsent = 'granted' | 'denied'

/** Ne garde qu'un identifiant GA4 bien formé (« G-XXXXXXX ») : rien d'autre n'est injecté dans la page. */
export function cleanAnalyticsId(value: string | null | undefined): string {
  const id = (value ?? '').trim().toUpperCase()
  return /^G-[A-Z0-9]{4,20}$/.test(id) ? id : ''
}

export function readConsent(): AnalyticsConsent | null {
  try {
    const value = window.localStorage.getItem(ANALYTICS_CONSENT_KEY)
    return value === 'granted' || value === 'denied' ? value : null
  } catch {
    return null
  }
}

export function saveConsent(value: AnalyticsConsent) {
  try {
    window.localStorage.setItem(ANALYTICS_CONSENT_KEY, value)
  } catch {
    // Stockage bloqué : le choix vaut pour cette page seulement.
  }
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGED_EVENT, { detail: value }))
}

/** Supprime les cookies Google Analytics (_ga, _ga_XXXX) après un refus. */
export function clearAnalyticsCookies() {
  const host = window.location.hostname
  const domains = ['', host, `.${host}`, `.${host.split('.').slice(-2).join('.')}`]
  for (const entry of document.cookie.split(';')) {
    const name = entry.split('=')[0]?.trim()
    if (!name || !/^_ga(_|$)/.test(name)) continue
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ''}`
    }
  }
}
