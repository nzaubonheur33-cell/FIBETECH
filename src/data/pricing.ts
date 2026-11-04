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

// Les prix sont à définir : ils s'affichent sous la forme [PRIX] tant qu'ils ne sont pas renseignés.
export const creationPlans: Plan[] = [
  { name: 'Essentiel', pitch: 'Pour être visible et joignable en ligne.', price: '[PRIX]', cta: 'Choisir Essentiel', features: ['Site vitrine jusqu’à 5 pages', 'Design adapté à votre marque', 'Version mobile soignée', 'Bouton WhatsApp et formulaire', 'Fiche Google Maps', 'Une séance de formation'] },
  { name: 'Business', pitch: 'Pour attirer des clients et vendre.', price: '[PRIX]', recommended: true, cta: 'Choisir Business', features: ['Jusqu’à 12 pages et un blog', 'Paiement M-Pesa, Airtel Money, Orange Money', 'Référencement local avancé', 'Statistiques de visite', 'E-mails professionnels', 'Maintenance incluse au lancement'] },
  { name: 'Sur mesure', pitch: 'Applications, plateformes et e-commerce.', price: null, cta: 'Décrire mon projet', features: ['Application web ou mobile', 'Boutique en ligne complète', 'Espace client et comptes', 'Intégrations : SMS, ERP, banque', 'IA et automatisation', 'Chef de projet dédié'] },
]

export const assistancePlans: Plan[] = [
  { name: 'Veille', pitch: 'Votre site et vos sauvegardes sous contrôle.', price: '[PRIX]', unit: ' / mois', cta: 'Choisir Veille', features: ['Mises à jour et sécurité du site', 'Sauvegardes automatiques', 'Surveillance de disponibilité', 'Assistance à distance', 'Rapport mensuel'] },
  { name: 'Sérénité', pitch: 'Votre service informatique externalisé.', price: '[PRIX]', unit: ' / mois', recommended: true, cta: 'Choisir Sérénité', features: ['Tout le contenu de Veille', 'Interventions sur site', 'Maintenance du parc informatique', 'Gestion du réseau Wi-Fi', 'Délai d’intervention garanti'] },
  { name: 'Partenaire IT', pitch: 'Pour les structures multi-sites.', price: null, cta: 'Nous contacter', features: ['Technicien dédié', 'Serveurs et infrastructure', 'Cybersécurité et audits', 'Comité de pilotage trimestriel', 'Astreinte selon vos horaires'] },
]

type Cell = boolean | string

export const comparison: { label: string; cells: [Cell, Cell, Cell] }[] = [
  { label: 'Nombre de pages', cells: ['jusqu’à 5', 'jusqu’à 12', 'sur mesure'] },
  { label: 'Design sur mesure', cells: [true, true, true] },
  { label: 'Version mobile soignée', cells: [true, true, true] },
  { label: 'WhatsApp et formulaire de contact', cells: [true, true, true] },
  { label: 'Fiche Google Maps', cells: [true, true, true] },
  { label: 'Blog et actualités', cells: [false, true, true] },
  { label: 'Paiement mobile', cells: [false, true, true] },
  { label: 'Référencement local avancé', cells: [false, true, true] },
  { label: 'Statistiques de visite', cells: [false, true, true] },
  { label: 'Espace client et comptes', cells: [false, false, true] },
  { label: 'Application mobile', cells: [false, false, true] },
  { label: 'Intégrations (SMS, ERP, banque)', cells: [false, false, true] },
  { label: 'Maintenance incluse', cells: ['[X] mois', '[X] mois', 'sur mesure'] },
  { label: 'Séances de formation', cells: ['[X]', '[X]', 'sur mesure'] },
]

export const paymentMethods = ['M-Pesa', 'Airtel Money', 'Orange Money', 'Virement bancaire', 'Espèces (USD ou CDF)']
