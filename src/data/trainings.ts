import type { AccordionItem } from '@/components/ui/accordion'
import type { IconName } from '@/components/ui/icons'

// Catalogue de formations proposé à titre d'exemple : ajustez les titres, les
// programmes et le public, puis remplacez les valeurs entre crochets (durée, tarif).

export type TrainingDomain = 'Bureautique' | 'Développement web' | 'Réseaux et maintenance' | 'Cybersécurité' | 'IA et numérique'
export type TrainingLevel = 'Débutant' | 'Intermédiaire' | 'Avancé'
export type TrainingFormat = 'Session ouverte' | 'En entreprise' | 'En ligne'

export type Training = {
  slug: string
  domain: TrainingDomain
  level: TrainingLevel
  title: string
  text: string
  audience: string
  modules: string[]
  formats: TrainingFormat[]
  icon: IconName
  duration: string
  price: string
}

export const trainings: Training[] = [
  {
    slug: 'bureautique',
    domain: 'Bureautique',
    level: 'Débutant',
    title: 'Word, Excel et PowerPoint au bureau',
    text: 'Les gestes qui font gagner du temps chaque jour : documents propres, tableaux justes, présentations claires.',
    audience: 'Assistants, secrétaires, agents administratifs',
    modules: ['Mise en page de documents professionnels', 'Tableaux et calculs simples dans Excel', 'Présentations claires avec PowerPoint', 'Classer et partager ses fichiers'],
    formats: ['Session ouverte', 'En entreprise'],
    icon: 'book',
    duration: '[X] jours',
    price: '[X] $',
  },
  {
    slug: 'excel-gestion',
    domain: 'Bureautique',
    level: 'Intermédiaire',
    title: 'Excel pour la gestion',
    text: 'Suivre sa caisse, son stock et ses factures avec des tableaux qui se mettent à jour tout seuls.',
    audience: 'Comptables, gestionnaires, commerçants',
    modules: ['Formules utiles : SI, SOMME.SI, RECHERCHEX', 'Tableaux croisés dynamiques', 'Graphiques et tableaux de bord', 'Modèles de suivi de stock et de caisse'],
    formats: ['Session ouverte', 'En entreprise', 'En ligne'],
    icon: 'sheet',
    duration: '[X] jours',
    price: '[X] $',
  },
  {
    slug: 'site-web',
    domain: 'Développement web',
    level: 'Débutant',
    title: 'Créer un site web : HTML, CSS et JavaScript',
    text: 'De la page blanche au site en ligne, en comprenant chaque ligne de code écrite.',
    audience: 'Étudiants, curieux, entrepreneurs',
    modules: ['Structurer une page en HTML', 'Mise en forme et affichage mobile avec CSS', 'Premiers scripts en JavaScript', 'Mettre son site en ligne'],
    formats: ['Session ouverte', 'En ligne'],
    icon: 'web',
    duration: '[X] semaines',
    price: '[X] $',
  },
  {
    slug: 'react',
    domain: 'Développement web',
    level: 'Intermédiaire',
    title: 'Applications web avec React et TypeScript',
    text: 'Les outils utilisés sur nos projets clients, appris sur une application complète.',
    audience: 'Étudiants en informatique, développeurs juniors',
    modules: ['Composants, état et propriétés', 'TypeScript au quotidien', 'Formulaires et appels d’API', 'Déployer une application'],
    formats: ['Session ouverte', 'En ligne'],
    icon: 'bolt',
    duration: '[X] semaines',
    price: '[X] $',
  },
  {
    slug: 'reseaux',
    domain: 'Réseaux et maintenance',
    level: 'Intermédiaire',
    title: 'Installer et dépanner un réseau d’entreprise',
    text: 'Câbles, Wi-Fi, imprimantes partagées : ce qu’il faut savoir pour que le bureau reste connecté.',
    audience: 'Techniciens, responsables informatiques',
    modules: ['Adressage IP et matériel réseau', 'Câblage, Wi-Fi et points d’accès', 'Partage de fichiers et d’imprimantes', 'Diagnostiquer les pannes courantes'],
    formats: ['Session ouverte', 'En entreprise'],
    icon: 'reseaux',
    duration: '[X] jours',
    price: '[X] $',
  },
  {
    slug: 'maintenance',
    domain: 'Réseaux et maintenance',
    level: 'Débutant',
    title: 'Maintenance des ordinateurs',
    text: 'Remettre en état un PC lent, installer proprement Windows et protéger le matériel des coupures.',
    audience: 'Futurs techniciens, étudiants, agents IT',
    modules: ['Diagnostic matériel et logiciel', 'Installation et mises à jour de Windows', 'Virus, lenteurs et nettoyage', 'Onduleurs et coupures de courant'],
    formats: ['Session ouverte', 'En entreprise'],
    icon: 'wrench',
    duration: '[X] jours',
    price: '[X] $',
  },
  {
    slug: 'cybersecurite',
    domain: 'Cybersécurité',
    level: 'Débutant',
    title: 'Cybersécurité au quotidien',
    text: 'Les réflexes qui évitent la plupart des piratages, expliqués sans jargon à toute l’équipe.',
    audience: 'Tout le personnel',
    modules: ['Mots de passe et double authentification', 'Reconnaître les arnaques et l’hameçonnage', 'Sauvegarder et protéger ses données', 'Bons réflexes sur téléphone et WhatsApp'],
    formats: ['En entreprise', 'En ligne'],
    icon: 'shield',
    duration: '[X] jour',
    price: '[X] $',
  },
  {
    slug: 'ia-travail',
    domain: 'IA et numérique',
    level: 'Débutant',
    title: 'L’IA générative au travail',
    text: 'Rédiger, résumer et traduire plus vite avec les assistants IA, en gardant vos données à l’abri.',
    audience: 'Dirigeants, équipes administratives et commerciales',
    modules: ['Ce que l’IA sait faire, et ses limites', 'Bien formuler ses demandes', 'Rédiger, résumer et traduire', 'Règles de confidentialité en entreprise'],
    formats: ['Session ouverte', 'En entreprise', 'En ligne'],
    icon: 'ia',
    duration: '[X] jour',
    price: '[X] $',
  },
  {
    slug: 'presence-en-ligne',
    domain: 'IA et numérique',
    level: 'Débutant',
    title: 'Présence en ligne pour les PME',
    text: 'Être trouvé sur Google, rassurer sur Facebook et vendre sur WhatsApp Business.',
    audience: 'Commerçants, PME, ONG',
    modules: ['Fiche Google et visibilité locale', 'Page Facebook et WhatsApp Business', 'Photos et messages qui donnent envie', 'Mesurer ce qui fonctionne'],
    formats: ['Session ouverte', 'En ligne'],
    icon: 'globe',
    duration: '[X] jours',
    price: '[X] $',
  },
]

export const trainingDomains: ('Tous' | TrainingDomain)[] = ['Tous', 'Bureautique', 'Développement web', 'Réseaux et maintenance', 'Cybersécurité', 'IA et numérique']
export const trainingLevels: ('Tous niveaux' | TrainingLevel)[] = ['Tous niveaux', 'Débutant', 'Intermédiaire']
export const levelRank: Record<TrainingLevel, number> = { Débutant: 1, Intermédiaire: 2, Avancé: 3 }

/** Couleur de la vignette d'icône, par domaine. */
export const domainTone: Record<TrainingDomain, string> = {
  Bureautique: 'bg-mustard text-ink',
  'Développement web': 'bg-copper text-white',
  'Réseaux et maintenance': 'bg-mal text-white',
  Cybersécurité: 'bg-ink text-white',
  'IA et numérique': 'bg-copper-soft text-copper-deep',
}

export const formats: { title: TrainingFormat; text: string; points: string[]; icon: IconName }[] = [
  {
    title: 'Session ouverte',
    text: 'Rejoignez un petit groupe dans nos locaux de Lubumbashi.',
    points: ['Groupes de [X] personnes au maximum', 'Exercices pratiques à chaque séance', 'Supports remis à la fin de la formation'],
    icon: 'pin',
  },
  {
    title: 'En entreprise',
    text: 'On vient former votre équipe dans vos bureaux, sur vos outils.',
    points: ['Programme adapté à vos fichiers et logiciels', 'Dates et horaires fixés avec vous', 'Bilan transmis au responsable'],
    icon: 'bag',
  },
  {
    title: 'En ligne',
    text: 'Des classes virtuelles en direct, pour suivre de partout.',
    points: ['Séances courtes, pensées pour les connexions lentes', 'Exercices à faire entre les séances', 'Questions par WhatsApp entre les cours'],
    icon: 'globe',
  },
]

// Calendrier donné en exemple : remplacez les dates et le nombre de places.
export const sessions: { slug: string; day: string; month: string; format: TrainingFormat; place: string; seats: string }[] = [
  { slug: 'excel-gestion', day: '[JJ]', month: '[Mois]', format: 'Session ouverte', place: 'Lubumbashi', seats: '[X] places' },
  { slug: 'ia-travail', day: '[JJ]', month: '[Mois]', format: 'En ligne', place: 'Classe virtuelle', seats: '[X] places' },
  { slug: 'site-web', day: '[JJ]', month: '[Mois]', format: 'Session ouverte', place: 'Lubumbashi', seats: '[X] places' },
  { slug: 'reseaux', day: '[JJ]', month: '[Mois]', format: 'Session ouverte', place: 'Lubumbashi', seats: '[X] places' },
]

export const trainingSteps = [
  { title: 'Choisir', text: 'On vous aide à trouver le bon niveau, par téléphone ou sur WhatsApp.' },
  { title: 'S’inscrire', text: 'Remplissez le formulaire : on vous rappelle pour confirmer la date et le paiement.' },
  { title: 'Se former', text: 'En petit groupe, sur des cas réels, avec un formateur qui pratique le métier.' },
  { title: 'Recevoir son attestation', text: 'Une attestation de fin de formation, et la possibilité de poser vos questions après.' },
]

export const customExamples = ['Excel pour le service comptable', 'Cybersécurité pour tout le personnel', 'IA pour l’équipe commerciale', 'Prise en main d’un nouveau logiciel', 'Maintenance pour l’équipe technique']

export const trainingFaq: AccordionItem[] = [
  { id: 't1', q: 'Faut-il apporter son ordinateur ?', a: 'Pour les sessions ouvertes, venez de préférence avec votre ordinateur portable. Si vous n’en avez pas, signalez-le à l’inscription et on cherche une solution avec vous.' },
  { id: 't2', q: 'Dans quelle langue se déroulent les formations ?', a: 'En français. Les explications peuvent aussi être données en swahili ou en anglais si le groupe le souhaite.' },
  { id: 't3', q: 'Comment payer ma formation ?', a: 'Par M-Pesa, Airtel Money, Orange Money, virement ou en espèces. Les modalités vous sont envoyées avec la confirmation d’inscription.' },
  { id: 't4', q: 'Recevrai-je une attestation ?', a: 'Oui, une attestation de fin de formation Fibetech est remise à chaque participant qui a suivi l’ensemble des séances.' },
  { id: 't5', q: 'Pouvez-vous adapter une formation à notre entreprise ?', a: 'Oui. On part de vos outils, de vos fichiers et du niveau de l’équipe, puis on vous envoie un programme et un devis.' },
  { id: 't6', q: 'Y a-t-il des conditions pour les étudiants ?', a: '[Précisez vos conditions pour les étudiants, par exemple un tarif réduit sur présentation de la carte d’étudiant.]' },
]
