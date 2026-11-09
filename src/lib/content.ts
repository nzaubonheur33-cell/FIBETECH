// Lecture des contenus du site public depuis MySQL.
// Chaque fonction est mise en cache le temps d'une requête (React `cache`).
// Si la base est injoignable, le site reste affiché avec les contenus par défaut
// (src/content) et l'erreur est écrite dans les journaux du serveur.

import type { FaqItem, Post, PricingPlan, Project, Service, TeamMember, Testimonial, Training } from '@prisma/client'
import { unstable_cache } from 'next/cache'
import { connection } from 'next/server'
import { cache } from 'react'
import { blockDefaults, type BlockData, type BlockKey } from '@/content/blocks'
import { faqData, postsData, pricingPlansData, projectsData, servicesData, teamData, testimonialsData, trainingsData } from '@/content/collections-data'
import type { FaqEntry, PostItem, PricingPlanItem, ProjectItem, ServiceItem, TeamMemberItem, TestimonialItem, TrainingItem } from '@/content/types'
import { prisma } from './db'
import { conform, objectList, stringList } from './shape'

const staticFrontend = process.env.FIBETECH_STATIC_FRONTEND === '1'

let lastLog = 0
async function safe<T>(label: string, query: () => Promise<T>, fallback: () => T): Promise<T> {
  try {
    return await query()
  } catch (error) {
    // Une seule ligne par minute, pour ne pas inonder les journaux si MySQL est arrêté.
    if (Date.now() - lastLog > 60_000) {
      lastLog = Date.now()
      console.error(`[contenu] Base de données indisponible (${label}), contenus par défaut affichés :`, error instanceof Error ? error.message : error)
    }
    return fallback()
  }
}

const order = [{ position: 'asc' as const }, { id: 'asc' as const }]
export const PUBLIC_CONTENT_CACHE_TAG = 'fibetech-public-content'

// Public pages are dynamic so admin edits can appear without a redeploy, but
// their database reads should be shared between requests. Admin mutations
// invalidate this tag; the one-minute TTL also recovers cleanly after a DB outage.
function cachedContent<T>(key: string, query: () => Promise<T>) {
  return unstable_cache(query, ['fibetech-public-content-v1', key], {
    revalidate: 60,
    tags: [PUBLIC_CONTENT_CACHE_TAG],
  })()
}

// ---------------------------------------------------------------------------
// Blocs de texte (pages, menu, coordonnées)
// ---------------------------------------------------------------------------

const loadBlock = cache(async (key: BlockKey): Promise<unknown> => {
  await connection()
  return cachedContent(`block:${key}`, async () => {
    const row = await safe(`bloc ${key}`, () => prisma.contentBlock.findUnique({ where: { key } }), () => null)
    return conform(blockDefaults[key], row?.data)
  })
})

export async function getBlock<K extends BlockKey>(key: K): Promise<BlockData<K>> {
  if (staticFrontend) return blockDefaults[key] as BlockData<K>
  return (await loadBlock(key)) as BlockData<K>
}

export const getSite = () => getBlock('site')

// ---------------------------------------------------------------------------
// Conversion des lignes de la base
// ---------------------------------------------------------------------------

export const toService = (row: Service): ServiceItem => ({
  key: row.key,
  short: row.short,
  title: row.title,
  text: row.text,
  tags: stringList(row.tags),
  icon: row.icon,
  href: row.href,
  features: stringList(row.features),
  pageEyebrow: row.pageEyebrow,
  pageTitle: row.pageTitle,
  pageText: row.pageText,
  idealFor: row.idealFor,
  ctaLabel: row.ctaLabel,
  secondaryLabel: row.secondaryLabel,
  tone: row.tone,
  visual: row.visual,
  published: row.published,
})

export const toProject = (row: Project): ProjectItem => ({
  slug: row.slug,
  title: row.title,
  filter: row.filter,
  category: row.category,
  sector: row.sector,
  text: row.text,
  image: row.image,
  kicker: row.kicker,
  summary: row.summary,
  challenge: row.challenge,
  approach: row.approach,
  features: objectList(row.features, { title: '', text: '' }),
  stages: stringList(row.stages),
  gallery: objectList(row.gallery, { image: '', caption: '' }),
  published: row.published,
})

export const toPost = (row: Post): PostItem => ({
  slug: row.slug,
  title: row.title,
  category: row.category,
  excerpt: row.excerpt,
  image: row.image,
  body: row.body,
  readTime: row.readTime,
  publishedAt: row.publishedAt ? row.publishedAt.toISOString().slice(0, 10) : null,
  featured: row.featured,
  published: row.published,
})

export const toTraining = (row: Training): TrainingItem => ({
  slug: row.slug,
  domain: row.domain,
  title: row.title,
  text: row.text,
  audience: row.audience,
  modules: stringList(row.modules),
  formats: stringList(row.formats),
  icon: row.icon,
  tone: row.tone,
  duration: row.duration,
  price: row.price,
  published: row.published,
})

export const toPricingPlan = (row: PricingPlan): PricingPlanItem => ({
  group: row.group,
  name: row.name,
  pitch: row.pitch,
  price: row.price,
  unit: row.unit,
  recommended: row.recommended,
  cta: row.cta,
  features: stringList(row.features),
  published: row.published,
})

export const toFaq = (row: FaqItem): FaqEntry & { id: string } => ({
  id: `faq-${row.id}`,
  group: row.group,
  category: row.category,
  question: row.question,
  answer: row.answer,
  published: row.published,
})

export const toTestimonial = (row: Testimonial): TestimonialItem => ({
  quote: row.quote,
  name: row.name,
  role: row.role,
  avatar: row.avatar,
  rating: row.rating,
  published: row.published,
})

export const toTeamMember = (row: TeamMember): TeamMemberItem => ({ name: row.name, role: row.role, image: row.image, published: row.published })

// ---------------------------------------------------------------------------
// Listes publiées
// ---------------------------------------------------------------------------

export const getServices = cache(async () => {
  if (staticFrontend) return servicesData.filter((item) => item.published)
  await connection()
  return cachedContent('services', () => safe('services', async () => (await prisma.service.findMany({ where: { published: true }, orderBy: order })).map(toService), () => servicesData))
})

export const getProjects = cache(async () => {
  if (staticFrontend) return projectsData.filter((item) => item.published)
  await connection()
  return cachedContent('projects', () => safe('réalisations', async () => (await prisma.project.findMany({ where: { published: true }, orderBy: order })).map(toProject), () => projectsData))
})

export const getProject = cache(async (slug: string) => {
  const projects = await getProjects()
  return projects.find((item) => item.slug === slug) ?? null
})

export const getPosts = cache(async () => {
  if (staticFrontend) return postsData.filter((item) => item.published)
  await connection()
  return cachedContent('posts', () => safe(
    'articles',
    async () => (await prisma.post.findMany({ where: { published: true }, orderBy: [{ featured: 'desc' }, { position: 'asc' }, { id: 'asc' }] })).map(toPost),
    () => postsData,
  ))
})

export const getPost = cache(async (slug: string) => {
  const posts = await getPosts()
  return posts.find((item) => item.slug === slug) ?? null
})

export const getTrainings = cache(async () => {
  if (staticFrontend) return trainingsData.filter((item) => item.published)
  await connection()
  return cachedContent('trainings', () => safe('formations', async () => (await prisma.training.findMany({ where: { published: true }, orderBy: order })).map(toTraining), () => trainingsData))
})

export const getPricingPlans = cache(async () => {
  if (staticFrontend) return pricingPlansData.filter((item) => item.published)
  await connection()
  return cachedContent('pricing-plans', () => safe('tarifs', async () => (await prisma.pricingPlan.findMany({ where: { published: true }, orderBy: order })).map(toPricingPlan), () => pricingPlansData))
})

const getAllFaq = cache(async () => {
  if (staticFrontend) return faqData.filter((item) => item.published).map((item, index) => ({ ...item, id: `faq-${index + 1}` }))
  await connection()
  return cachedContent('faq', () => safe(
    'FAQ',
    async () => (await prisma.faqItem.findMany({ where: { published: true }, orderBy: order })).map(toFaq),
    () => faqData.map((item, index) => ({ ...item, id: `faq-${index + 1}` })),
  ))
})

/** Questions d'une page : general (page FAQ), web, pricing, training, reseau ou ia. */
export async function getFaq(group: string) {
  return (await getAllFaq()).filter((item) => item.group === group)
}

export const getTestimonials = cache(async () => {
  if (staticFrontend) return testimonialsData.filter((item) => item.published)
  await connection()
  return cachedContent('testimonials', () => safe('témoignages', async () => (await prisma.testimonial.findMany({ where: { published: true }, orderBy: order })).map(toTestimonial), () => testimonialsData))
})

export const getTeam = cache(async () => {
  if (staticFrontend) return teamData.filter((item) => item.published)
  await connection()
  return cachedContent('team', () => safe('équipe', async () => (await prisma.teamMember.findMany({ where: { published: true }, orderBy: order })).map(toTeamMember), () => teamData))
})

/** Questions d'une page, au format attendu par l'accordéon. */
export async function getFaqAccordion(group: string) {
  return (await getFaq(group)).map((item) => ({ id: item.id, q: item.question, a: item.answer, cat: item.category }))
}
