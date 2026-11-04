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
}

// Projets présentés en exemple, à remplacer par vos cas clients réels.
export const projects: Project[] = [
  { slug: 'boutique', filter: 'web', cat: 'Web · E-commerce', kind: 'shop', sector: 'Commerce', title: 'Une boutique de pagnes qui vend aussi en ligne', text: 'Catalogue photo, commandes par WhatsApp et paiement mobile à la livraison.', href: routes.caseStudy },
  { slug: 'stock', filter: 'mobile', cat: 'Application mobile', kind: 'stock', sector: 'Distribution', title: 'Le stock d’un grossiste, suivi depuis un téléphone', text: 'Entrées, sorties et alertes de rupture, même sans connexion.', href: routes.work },
  { slug: 'clinique', filter: 'ia', cat: 'IA', kind: 'chat', sector: 'Santé', title: 'Un assistant qui prend les rendez-vous d’une clinique', text: 'Disponible jour et nuit sur WhatsApp, il remplit l’agenda de l’accueil.', href: routes.work },
  { slug: 'campus', filter: 'reseaux', cat: 'Réseaux', kind: 'network', sector: 'Enseignement', title: 'Un Wi-Fi qui couvre enfin tout le campus', text: 'Audit, câblage, bornes et accès séparés pour étudiants et personnel.', href: routes.work },
  { slug: 'cabinet', filter: 'it', cat: 'Assistance IT', kind: 'dash', sector: 'Services', title: 'Le parc informatique d’un cabinet comptable', text: 'Maintenance mensuelle, sauvegardes et postes remis à neuf.', href: routes.work },
  { slug: 'ecole', filter: 'web', cat: 'Web', kind: 'form', sector: 'Enseignement', title: 'Les inscriptions d’une école, sans file d’attente', text: 'Formulaire en ligne, pièces jointes et suivi des dossiers par l’administration.', href: routes.work },
]

export const projectFilters: { key: ProjectFilter | 'tous'; label: string }[] = [
  { key: 'tous', label: 'Tous' },
  { key: 'web', label: 'Web' },
  { key: 'mobile', label: 'Mobile' },
  { key: 'ia', label: 'IA' },
  { key: 'reseaux', label: 'Réseaux' },
  { key: 'it', label: 'Assistance IT' },
]
