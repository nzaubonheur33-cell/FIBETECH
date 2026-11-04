import type { ProjectKind } from '@/components/illustrations/mocks'
import { routes } from '@/lib/routes'

export type ProjectFilter = 'web' | 'mobile' | 'ia' | 'reseaux' | 'it'

export type Project = {
  slug: string
  filter: ProjectFilter
  cat: string
  kind: ProjectKind
  sector: string
  title: string
  text: string
  href: string
  image: string
}

export const projects: Project[] = [
  { slug: 'gestion-ecole', filter: 'web', cat: 'Plateforme web', kind: 'form', sector: 'Enseignement', title: 'Gestion complète d’une école', text: 'Inscriptions, suivi des élèves et gestion scolaire réunis dans une plateforme.', href: routes.projectSchool, image: 'photo-1509062522246-3755977927d7' },
  { slug: 'gestion-locataires', filter: 'web', cat: 'Plateforme web', kind: 'dash', sector: 'Immobilier · RDC et Rwanda', title: 'Gestion des locataires en RDC et au Rwanda', text: 'Une plateforme pour centraliser les locataires, leurs dossiers et le suivi locatif.', href: routes.projectRentals, image: 'photo-1560518883-ce09059eeffa' },
  { slug: 'ecommerce-rdc', filter: 'web', cat: 'E-commerce', kind: 'shop', sector: 'Commerce · RDC', title: 'Une plateforme e-commerce en RDC', text: 'Un espace de vente en ligne pensé pour présenter des produits et recevoir des commandes partout au pays.', href: routes.caseStudy, image: 'photo-1556742049-0cfed4f6a45d' },
]

export const projectFilters: { key: ProjectFilter | 'tous'; label: string }[] = [
  { key: 'tous', label: 'Tous' },
  { key: 'web', label: 'Web' },
  { key: 'mobile', label: 'Mobile' },
  { key: 'ia', label: 'IA' },
  { key: 'reseaux', label: 'Réseaux' },
  { key: 'it', label: 'Assistance IT' },
]
