// Adresse publique du site (variable SITE_URL), utilisée pour les balises de partage et le plan du site.

/** Accepte aussi une valeur sans « https:// » ; une valeur invalide donne null. */
export function publicSiteUrl(value: string | undefined = process.env.SITE_URL): URL | null {
  const raw = value?.trim()
  if (!raw) return null
  try {
    return new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`)
  } catch {
    return null
  }
}

/** Domaine utilisé si SITE_URL n'est pas renseigné. */
export const DEFAULT_SITE_URL = 'https://fibetech.com'
