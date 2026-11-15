import type { MetadataRoute } from 'next'
import { DEFAULT_SITE_URL, publicSiteUrl } from '@/lib/site-url'

// robots.txt : tout le site est ouvert aux moteurs de recherche, sauf l'administration et l'API.
export default function robots(): MetadataRoute.Robots {
  const base = (publicSiteUrl() ?? new URL(DEFAULT_SITE_URL)).origin
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/admin', '/api/'] },
    sitemap: `${base}/sitemap.xml`,
  }
}
