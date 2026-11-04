export const routes = {
  home: '/',
  services: '/services',
  web: '/services/web-et-mobile',
  reseau: '/services/reseau',
  ia: '/services/ia-automatisation',
  training: '/formations',
  pricing: '/tarifs',
  work: '/realisations',
  projectSchool: '/realisations/gestion-ecole',
  projectRentals: '/realisations/gestion-locataires',
  caseStudy: '/realisations/ecommerce-rdc',
  about: '/a-propos',
  blog: '/blog',
  contact: '/contact',
  faq: '/faq',
  legal: '/mentions-legales',
  privacy: '/confidentialite',
  terms: '/conditions-generales',
} as const

export const knownPaths: string[] = Object.values(routes)
