// Types des contenus en liste, tels qu'ils sont utilisés par les pages du site.
// Les tables MySQL correspondantes sont décrites dans prisma/schema.prisma.

export type ServiceItem = {
  key: string
  short: string
  title: string
  text: string
  tags: string[]
  icon: string
  href: string
  features: string[]
  pageEyebrow: string
  pageTitle: string
  pageText: string
  idealFor: string
  ctaLabel: string
  secondaryLabel: string
  /** Fond de la section sur la page Services : white, stone ou dark. */
  tone: string
  /** Illustration de la section sur la page Services : web, formation, ia, reseaux ou aucun. */
  visual: string
  published: boolean
}

export type ProjectItem = {
  slug: string
  title: string
  /** Filtre de la page Réalisations : web, mobile, ia, reseaux ou it. */
  filter: string
  category: string
  sector: string
  text: string
  image: string
  kicker: string
  summary: string
  challenge: string
  approach: string
  features: { title: string; text: string }[]
  stages: string[]
  gallery: { image: string; caption: string }[]
  published: boolean
}

export type PostItem = {
  slug: string
  title: string
  category: string
  excerpt: string
  image: string
  body: string
  readTime: string
  /** Date ISO (AAAA-MM-JJ) ou null. */
  publishedAt: string | null
  featured: boolean
  published: boolean
}

export type TrainingItem = {
  slug: string
  domain: string
  title: string
  text: string
  audience: string
  modules: string[]
  formats: string[]
  icon: string
  /** Couleur de l'icône : copper, mal, ink, mustard ou soft. */
  tone: string
  duration: string
  price: string
  published: boolean
}

export type PricingPlanItem = {
  /** creation ou assistance */
  group: string
  name: string
  pitch: string
  /** null : prix sur devis. */
  price: string | null
  unit: string
  recommended: boolean
  cta: string
  features: string[]
  published: boolean
}

export type FaqEntry = {
  /** general, web, pricing, training, reseau ou ia */
  group: string
  category: string
  question: string
  answer: string
  published: boolean
}

export type TestimonialItem = {
  quote: string
  name: string
  role: string
  avatar: string
  rating: number
  published: boolean
}

export type TeamMemberItem = {
  name: string
  role: string
  image: string
  published: boolean
}
