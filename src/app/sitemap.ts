import type { MetadataRoute } from 'next'
import { getPosts, getProjects, getServices } from '@/lib/content'
import { DEFAULT_SITE_URL, publicSiteUrl } from '@/lib/site-url'

// Plan du site lu par Google (https://…/sitemap.xml). Les articles, réalisations et
// services publiés depuis l'admin y apparaissent automatiquement (lecture en cache, comme les pages).

type Entry = MetadataRoute.Sitemap[number]

const pages: { path: string; priority: number; changeFrequency: Entry['changeFrequency'] }[] = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/formations', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/tarifs', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/realisations', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/blog', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/a-propos', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.7, changeFrequency: 'yearly' },
  { path: '/faq', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/mentions-legales', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/confidentialite', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/conditions-generales', priority: 0.2, changeFrequency: 'yearly' },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = (publicSiteUrl() ?? new URL(DEFAULT_SITE_URL)).origin
  const url = (path: string) => `${base}${path === '/' ? '' : path}`

  const [services, projects, posts] = await Promise.all([getServices(), getProjects(), getPosts()])

  const entries: MetadataRoute.Sitemap = pages.map((page) => ({ url: url(page.path), changeFrequency: page.changeFrequency, priority: page.priority }))

  // Pages détaillées des services (seulement les liens internes vers /services/…).
  for (const service of services) {
    if (/^\/services\/[\w-]+$/.test(service.href) && !entries.some((entry) => entry.url === url(service.href))) {
      entries.push({ url: url(service.href), changeFrequency: 'monthly', priority: 0.8 })
    }
  }
  for (const project of projects) entries.push({ url: url(`/realisations/${project.slug}`), changeFrequency: 'monthly', priority: 0.6 })
  for (const post of posts) {
    entries.push({ url: url(`/blog/${post.slug}`), changeFrequency: 'monthly', priority: 0.6, ...(post.publishedAt ? { lastModified: post.publishedAt } : {}) })
  }
  return entries
}
