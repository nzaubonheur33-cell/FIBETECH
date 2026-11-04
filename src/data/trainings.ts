import type { AccordionItem } from '@/components/ui/accordion'
import type { IconName } from '@/components/ui/icons'

export type TrainingDomain = 'Développement web' | 'Développement mobile' | 'Bureautique' | 'IA générative' | 'Réseaux'
export type TrainingFormat = 'Présentielle' | 'En ligne'

export type Training = {
  slug: string
  domain: TrainingDomain
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
  { slug: 'developpement-web', domain: 'Développement web', title: 'Développement web', text: 'Apprenez à concevoir et réaliser des sites et applications web, de la structure des pages à leur mise en ligne.', audience: 'Débutants, étudiants, entrepreneurs et équipes numériques', modules: ['HTML et structure de pages', 'CSS et adaptation mobile', 'JavaScript et interactions', 'Publication et bases de maintenance'], formats: ['Présentielle', 'En ligne'], icon: 'web', duration: 'À définir selon le programme', price: 'Sur devis' },
  { slug: 'developpement-mobile', domain: 'Développement mobile', title: 'Développement mobile', text: 'Découvrez les étapes de conception d’une application mobile et construisez les bases d’un projet Android et iOS.', audience: 'Étudiants, développeurs débutants et porteurs de projets', modules: ['Conception d’interfaces mobiles', 'Bases du développement d’applications', 'Navigation et gestion des données', 'Préparation et publication d’une application'], formats: ['Présentielle', 'En ligne'], icon: 'phone', duration: 'À définir selon le programme', price: 'Sur devis' },
  { slug: 'bureautique', domain: 'Bureautique', title: 'Bureautique', text: 'Gagnez en autonomie avec les outils utilisés pour créer des documents, organiser des données et préparer des présentations.', audience: 'Assistants, étudiants, agents administratifs et équipes', modules: ['Documents professionnels avec Word', 'Tableaux et formules avec Excel', 'Présentations avec PowerPoint', 'Organisation et partage des fichiers'], formats: ['Présentielle', 'En ligne'], icon: 'book', duration: 'À définir selon le programme', price: 'Sur devis' },
  { slug: 'ia-generative', domain: 'IA générative', title: 'IA générative au travail', text: 'Utilisez les assistants d’IA générative pour rédiger, résumer, préparer des idées et accélérer certaines tâches.', audience: 'Dirigeants, équipes administratives et commerciales', modules: ['Comprendre les possibilités et limites de l’IA', 'Formuler des demandes utiles', 'Rédiger, résumer et organiser ses idées', 'Vérifier les réponses et protéger les données'], formats: ['Présentielle', 'En ligne'], icon: 'ia', duration: 'À définir selon le programme', price: 'Sur devis' },
  { slug: 'reseaux', domain: 'Réseaux', title: 'Réseaux informatiques', text: 'Comprenez les bases des réseaux et apprenez à installer, configurer et diagnostiquer une infrastructure informatique.', audience: 'Étudiants, techniciens et responsables informatiques', modules: ['Adressage IP et équipements réseau', 'Câblage, Wi-Fi et points d’accès', 'Partage des ressources et configuration', 'Diagnostic des pannes courantes'], formats: ['Présentielle', 'En ligne'], icon: 'reseaux', duration: 'À définir selon le programme', price: 'Sur devis' },
]

export const trainingDomains: ('Tous' | TrainingDomain)[] = ['Tous', ...trainings.map((item) => item.domain)]

export const domainTone: Record<TrainingDomain, string> = {
  Bureautique: 'bg-mustard text-ink',
  'Développement web': 'bg-copper text-white',
  'Développement mobile': 'bg-mal text-white',
  'Réseaux': 'bg-ink text-white',
  'IA générative': 'bg-copper-soft text-copper-deep',
}

export const formats: { title: TrainingFormat; text: string; points: string[]; icon: IconName }[] = [
  { title: 'Présentielle', text: 'Apprenez avec un formateur, en salle ou dans vos locaux.', points: ['Exercices pratiques accompagnés', 'Échanges directs avec le formateur', 'Programme et lieu convenus avec vous'], icon: 'pin' },
  { title: 'En ligne', text: 'Suivez la formation à distance, où que vous soyez.', points: ['Séances à distance avec un formateur', 'Supports et exercices pratiques', 'Dates convenues après échange'], icon: 'globe' },
]

export const trainingSteps = [
  { title: 'Choisir', text: 'Choisissez un sujet et le format présentiel ou en ligne.' },
  { title: 'Demander un devis', text: 'Indiquez vos objectifs et le nombre de participants pour recevoir une proposition.' },
  { title: 'Se former', text: 'Suivez un programme pratique adapté à vos besoins.' },
  { title: 'Progresser', text: 'Repartez avec les compétences et supports convenus.' },
]

export const customExamples = ['Développement web pour débutants', 'Développement mobile', 'Bureautique pour une équipe', 'IA générative au travail', 'Initiation aux réseaux informatiques']

export const trainingFaq: AccordionItem[] = [
  { id: 't1', q: 'Quels sont les formats proposés ?', a: 'Toutes les formations peuvent être organisées en présentiel ou en ligne. Le format est choisi lors de votre demande.' },
  { id: 't2', q: 'Combien coûte une formation ?', a: 'Toutes les formations sont proposées sur devis. Le tarif dépend du programme, du format et du nombre de participants.' },
  { id: 't3', q: 'Dans quelle langue se déroulent les formations ?', a: 'Les formations se déroulent en français. Les modalités linguistiques peuvent être précisées lors de la demande.' },
  { id: 't4', q: 'Pouvez-vous adapter le programme à notre équipe ?', a: 'Oui. Nous définissons le contenu avec vous selon vos objectifs, vos outils et le nombre de participants, puis nous préparons un devis.' },
]
