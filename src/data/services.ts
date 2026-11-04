import type { IconName } from '@/components/ui/icons'
import { routes } from '@/lib/routes'

export type Service = {
  id: 'web' | 'it' | 'transfo' | 'ia' | 'reseaux' | 'conseil'
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
    id: 'it',
    short: 'Assistance IT',
    title: 'Solutions IT et assistance',
    text: 'Installation, maintenance et dépannage de vos ordinateurs, imprimantes et logiciels. Un technicien qui répond quand ça bloque.',
    tags: ['Helpdesk', 'Maintenance', 'Parc informatique'],
    icon: 'it',
    href: `${routes.services}?s=it`,
  },
  {
    id: 'transfo',
    short: 'Transformation numérique',
    title: 'Transformation numérique',
    text: 'On remplace les cahiers et les fichiers éparpillés par des outils simples, partagés et sécurisés. Et on forme vos équipes.',
    tags: ['Processus', 'Cloud', 'Formation'],
    icon: 'transfo',
    href: `${routes.services}?s=transfo`,
  },
  {
    id: 'ia',
    short: 'IA et automatisation',
    title: 'IA et automatisation',
    text: 'Assistants WhatsApp, réponses automatiques, tri de documents, tableaux de bord : l’IA prend en charge les tâches répétitives.',
    tags: ['Chatbots', 'Automatisation', 'Données'],
    icon: 'ia',
    href: `${routes.services}?s=ia`,
  },
  {
    id: 'reseaux',
    short: 'Réseaux',
    title: 'Réseaux et infrastructures',
    text: 'Câblage, Wi-Fi d’entreprise, serveurs, sauvegardes et onduleurs. Un réseau stable, même quand le courant ne l’est pas.',
    tags: ['Wi-Fi', 'Serveurs', 'Sécurité'],
    icon: 'reseaux',
    href: `${routes.services}?s=reseaux`,
  },
  {
    id: 'conseil',
    short: 'Conseil digital',
    title: 'Conseil digital',
    text: 'Audit, choix des outils, stratégie de présence en ligne et cybersécurité. On vous aide à décider avant de dépenser.',
    tags: ['Audit', 'Stratégie', 'Cybersécurité'],
    icon: 'conseil',
    href: `${routes.services}?s=conseil`,
  },
]

/** Ce que comprend chaque service (page Services). */
export const serviceLists: Record<Service['id'], string[]> = {
  web: ['Sites vitrines et institutionnels', 'Boutiques en ligne', 'Applications Android et iOS', 'Paiement M-Pesa, Airtel Money, Orange Money', 'Référencement local sur Google', 'Hébergement et nom de domaine .cd'],
  it: ['Dépannage à distance et sur site', 'Maintenance préventive du parc', 'Installation de postes et logiciels', 'Messagerie professionnelle', 'Antivirus et mises à jour', 'Inventaire du matériel'],
  transfo: ['Diagnostic de vos processus', 'Outils de gestion sur mesure', 'Passage au cloud', 'Numérisation des archives', 'Formation des équipes', 'Accompagnement au changement'],
  ia: ['Assistant WhatsApp et site web', 'Réponses automatiques aux clients', 'Lecture et tri de documents', 'Tableaux de bord automatiques', 'Connexion entre vos outils', 'Formation à l’IA pour vos équipes'],
  reseaux: ['Câblage structuré', 'Wi-Fi d’entreprise et invités', 'Serveurs et stockage', 'Onduleurs et protection électrique', 'Sauvegardes automatiques', 'Pare-feu et vidéosurveillance'],
  conseil: ['Audit informatique', 'Choix des outils et des fournisseurs', 'Stratégie de présence en ligne', 'Cybersécurité et bonnes pratiques', 'Cahier des charges', 'Feuille de route chiffrée'],
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
