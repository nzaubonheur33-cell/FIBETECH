import type { IconName } from '@/components/ui/icons'
import { routes } from '@/lib/routes'

export type Service = {
  id: 'web' | 'reseaux' | 'ia' | 'formation'
  short: string
  title: string
  text: string
  tags: string[]
  icon: IconName
  href: string
}

export const services: Service[] = [
  {
    id: 'web',
    short: 'Web et mobile',
    title: 'Développement web et mobile',
    text: 'Sites vitrines, boutiques en ligne, applications Android et iOS, plateformes sur mesure. Rapides, même en 3G.',
    tags: ['Sites web', 'E-commerce', 'Applications'],
    icon: 'web',
    href: routes.web,
  },
  {
    id: 'ia',
    short: 'IA et automatisation',
    title: 'IA et automatisation',
    text: 'Assistants WhatsApp, réponses automatiques, tri de documents, tableaux de bord : l’IA prend en charge les tâches répétitives.',
    tags: ['Chatbots', 'Automatisation', 'Données'],
    icon: 'ia',
    href: routes.ia,
  },
  {
    id: 'reseaux',
    short: 'Réseaux',
    title: 'Réseaux et infrastructures',
    text: 'Câblage, Wi-Fi d’entreprise, serveurs, sauvegardes et onduleurs. Un réseau stable, même quand le courant ne l’est pas.',
    tags: ['Wi-Fi', 'Serveurs', 'Sécurité'],
    icon: 'reseaux',
    href: routes.reseau,
  },
  {
    id: 'formation', short: 'Formations', title: 'Formations numériques',
    text: 'Des formations pratiques pour rendre vos équipes autonomes avec les outils numériques, le web et l’intelligence artificielle.',
    tags: ['Pratique', 'Équipes', 'Sur mesure'], icon: 'book', href: routes.training,
  },
]

/** Ce que comprend chaque service (page Services). */
export const serviceLists: Record<Service['id'], string[]> = {
  web: ['Sites vitrines et institutionnels', 'Boutiques en ligne', 'Applications Android et iOS', 'Paiement M-Pesa, Airtel Money, Orange Money', 'Référencement local sur Google', 'Hébergement et nom de domaine .cd'],
  ia: ['Assistant WhatsApp et site web', 'Réponses automatiques aux clients', 'Lecture et tri de documents', 'Tableaux de bord automatiques', 'Connexion entre vos outils', 'Formation à l’IA pour vos équipes'],
  reseaux: ['Câblage structuré', 'Wi-Fi d’entreprise et invités', 'Serveurs et stockage', 'Onduleurs et protection électrique', 'Sauvegardes automatiques', 'Pare-feu et vidéosurveillance'],
  formation: ['Bureautique et outils collaboratifs', 'Création et gestion de sites web', 'Intelligence artificielle au quotidien', 'Automatisation des tâches', 'Cybersécurité et bonnes pratiques', 'Sessions adaptées à vos équipes'],
}

export const sectors = [
  { title: 'Mines et sous-traitance', text: 'Suivi des équipements, rapports de terrain et réseaux pour sites isolés.' },
  { title: 'Commerce et distribution', text: 'Caisse, stock, boutique en ligne et paiement mobile.' },
  { title: 'Écoles et universités', text: 'Inscriptions en ligne, Wi-Fi de campus et salles informatiques.' },
  { title: 'Santé', text: 'Rendez-vous, dossiers patients et sauvegardes sécurisées.' },
  { title: 'ONG et associations', text: 'Collecte de données sur le terrain, rapports et outils collaboratifs.' },
  { title: 'Hôtellerie et restauration', text: 'Réservations, Wi-Fi clients, menus et commandes en ligne.' },
  { title: 'Transport et logistique', text: 'Suivi des livraisons, gestion de flotte et applications chauffeurs.' },
  { title: 'PME et startups', text: 'Site, e-mail professionnel et outils de gestion pour démarrer vite.' },
]

export const technologies = ['React', 'Next.js', 'Node.js', 'Laravel', 'Flutter', 'WordPress', 'PostgreSQL', 'MySQL', 'Python', 'Microsoft 365', 'Google Workspace', 'MikroTik', 'Ubiquiti UniFi', 'API WhatsApp Business']

export const steps = [
  { n: '01', title: 'Écoute', text: 'On découvre votre activité, vos clients et vos contraintes, chez vous ou en visio.' },
  { n: '02', title: 'Proposition', text: 'Un devis clair, un planning et des priorités. Sans jargon.' },
  { n: '03', title: 'Conception', text: 'Maquettes, prototypes et points réguliers : vous validez chaque étape.' },
  { n: '04', title: 'Lancement', text: 'Mise en ligne, installation sur site et formation de vos équipes.' },
  { n: '05', title: 'Suivi', text: 'Maintenance, mises à jour et assistance quand vous en avez besoin.' },
]
