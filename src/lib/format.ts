// Petits outils sans dépendance serveur : utilisables partout (pages, composants, admin).
import type { SiteInfo } from '@/content/blocks'

export type Tokens = Record<string, string | number>

/** Valeurs utilisables dans les textes : {phone}, {email}… */
export function siteTokens(site: SiteInfo): Tokens {
  return {
    name: site.name,
    phone: site.phone,
    whatsapp: site.whatsapp,
    email: site.email,
    address: site.address,
    fullAddress: site.fullAddress,
    city: site.city,
    region: site.region,
    hours: site.hours,
  }
}

/** Remplace {cle} par la valeur correspondante. Les clés inconnues restent telles quelles. */
export function fill(text: string, tokens?: Tokens): string {
  if (!tokens) return text
  return text.replace(/\{(\w+)\}/g, (match, key: string) => (key in tokens ? String(tokens[key]) : match))
}

/** Supprime la mise en forme (*accent*, **gras**, [lien](url)) pour les balises meta et les attributs. */
export function plain(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
}

export function phoneHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, '')}`
}

export function pageMetadata(meta: { title: string; description: string }) {
  return {
    ...(meta.title ? { title: meta.title } : {}),
    ...(meta.description ? { description: plain(meta.description) } : {}),
  }
}

export function formatDate(iso: string | null): string {
  if (!iso) return ''
  const date = new Date(`${iso.slice(0, 10)}T12:00:00Z`)
  if (Number.isNaN(date.getTime())) return ''
  return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(date)
}
