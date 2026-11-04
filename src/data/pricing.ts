export type Plan = {
  name: string
  pitch: string
  /** `null` : prix sur devis. Sinon, prix à remplacer (affiché comme [PRIX]). */
  price: string | null
  unit?: string
  recommended?: boolean
  cta: string
  features: string[]
}

export const creationPlans: Plan[] = [
  { name: 'Site vitrine', pitch: 'Un site professionnel pour présenter votre activité.', price: '500', cta: 'Contacter', features: ['Site vitrine personnalisé', 'Design adapté à votre marque', 'Version mobile soignée', 'Bouton WhatsApp et formulaire', 'Référencement local', 'Accompagnement à la mise en ligne'] },
  { name: 'Site e-commerce', pitch: 'Une boutique en ligne pour présenter et vendre.', price: '1 500', recommended: true, cta: 'Contacter', features: ['Boutique en ligne complète', 'Catalogue et gestion des produits', 'Commandes et paiement mobile', 'Design adapté à votre marque', 'Version mobile soignée', 'Accompagnement à la mise en ligne'] },
  { name: 'Autres sites web', pitch: 'Applications, plateformes et projets web spécifiques.', price: null, cta: 'Contacter', features: ['Plateformes web sur mesure', 'Applications web et mobile', 'Espace client et comptes', 'Intégrations personnalisées', 'Conseil technique', 'Proposition adaptée à votre besoin'] },
]

export const assistancePlans: Plan[] = [
  { name: 'Réseau', pitch: 'Installation et accompagnement selon votre infrastructure.', price: null, cta: 'Contacter', features: ['Audit de vos besoins', 'Wi-Fi et réseau d’entreprise', 'Câblage et équipements', 'Sécurité et sauvegardes', 'Proposition personnalisée'] },
  { name: 'IA et automatisation', pitch: 'Des outils adaptés aux processus de votre activité.', price: null, cta: 'Contacter', features: ['Automatisation des tâches', 'Assistants et chatbots', 'Connexion entre vos outils', 'Atelier de définition du besoin', 'Proposition personnalisée'] },
]

export const paymentMethods = ['M-Pesa', 'Airtel Money', 'Orange Money', 'Virement bancaire', 'Espèces (USD ou CDF)']
