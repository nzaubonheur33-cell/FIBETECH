export const routes = {
  home: '/',
  services: '/services',
  web: '/services/web-et-mobile',
  training: '/formations',
  pricing: '/tarifs',
  work: '/realisations',
  caseStudy: '/realisations/boutique-de-pagnes',
  about: '/a-propos',
  blog: '/blog',
  contact: '/contact',
  careers: '/carrieres',
  faq: '/faq',
} as const

export const knownPaths: string[] = Object.values(routes)
