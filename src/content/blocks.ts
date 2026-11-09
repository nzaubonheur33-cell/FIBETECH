// Textes par défaut de chaque page, du menu et des coordonnées.
//
// - Ces valeurs remplissent la base de données au premier `npm run db:seed`.
// - Ensuite, tout se modifie depuis l'admin (/admin/contenus).
// - La forme de chaque objet sert aussi de modèle au formulaire de l'admin :
//   ajouter une clé ici ajoute un champ dans l'admin.
//
// Conventions dans les textes :
// - *mots* entre astérisques : mis en couleur dans les titres ;
// - **mots** : en gras dans les paragraphes ;
// - [texte](https://lien) : lien ;
// - [texte] seul : valeur à compléter (surlignée en cuivre pâle) ;
// - {phone}, {email}, {whatsapp}, {address}, {fullAddress}, {city}, {name}, {hours} :
//   remplacés par les coordonnées de la page « Coordonnées ».

const link = (label: string, href: string) => ({ label, href })

export const site = {
  name: 'Fibetech',
  phone: '+243 997 978 888',
  whatsapp: '+243 997 978 888',
  email: 'fibetech1@gmail.com',
  address: 'Église, avenue Kalombo n° 25',
  city: 'Lubumbashi',
  region: 'Haut-Katanga, RDC',
  fullAddress: 'Église, avenue Kalombo n° 25, Lubumbashi, Haut-Katanga, RDC',
  mapQuery: 'Église, avenue Kalombo n° 25, Lubumbashi, Haut-Katanga, République démocratique du Congo',
  hours: 'Lun–Ven, 8 h–17 h',
  coords: '',
  socials: [
    link('Instagram', 'https://www.instagram.com/'),
    link('LinkedIn', 'https://www.linkedin.com/'),
    link('Facebook', 'https://www.facebook.com/'),
    link('YouTube', 'https://www.youtube.com/'),
    link('WhatsApp', 'https://wa.me/243997978888'),
  ],
}

export const layout = {
  header: {
    links: [
      link('Accueil', '/'),
      link('Services', '/services'),
      link('Formations', '/formations'),
      link('Tarifs', '/tarifs'),
      link('Réalisations', '/realisations'),
      link('À propos', '/a-propos'),
      link('Blog', '/blog'),
      link('Contact', '/contact'),
    ],
    cta: 'Demander un devis',
    ctaShort: 'Devis',
  },
  footer: {
    description: 'Startup informatique basée à Lubumbashi. Sites web, applications, IA, réseaux et assistance pour les entreprises du Haut-Katanga.',
    newsletterLabel: 'Nos conseils numériques, par e-mail',
    newsletterButton: 'S’inscrire',
    newsletterSuccess: 'Merci ! Notre équipe a bien reçu votre adresse et pourra vous recontacter.',
    columns: [
      {
        title: 'Services',
        links: [link('Web et mobile', '/services/web-et-mobile'), link('IA et automatisation', '/services/ia-automatisation'), link('Réseaux', '/services/reseau'), link('Formations', '/formations')],
      },
      { title: 'Entreprise', links: [link('À propos', '/a-propos'), link('Réalisations', '/realisations'), link('Blog', '/blog')] },
      { title: 'Aide', links: [link('Tarifs', '/tarifs'), link('Questions fréquentes', '/faq'), link('Demander un devis', '/contact')] },
    ],
    contactTitle: 'Contact',
    copyright: 'Fibetech. Tous droits réservés.',
    legalLinks: [link('Mentions légales', '/mentions-legales'), link('Confidentialité', '/confidentialite'), link('Conditions générales', '/conditions-generales')],
  },
  cookie: {
    title: 'Cookies et confidentialité',
    text: 'Ce site n’utilise pas de cookies publicitaires ou de mesure d’audience. Seul votre choix de fermeture de ce message est mémorisé sur cet appareil.',
    link: 'Lire la politique de confidentialité',
    button: 'J’ai compris',
  },
}

export const shared = {
  sectors: [
    { title: 'Mines et sous-traitance', text: 'Suivi des équipements, rapports de terrain et réseaux pour sites isolés.' },
    { title: 'Commerce et distribution', text: 'Caisse, stock, boutique en ligne et paiement mobile.' },
    { title: 'Écoles et universités', text: 'Inscriptions en ligne, Wi-Fi de campus et salles informatiques.' },
    { title: 'Santé', text: 'Rendez-vous, dossiers patients et sauvegardes sécurisées.' },
    { title: 'ONG et associations', text: 'Collecte de données sur le terrain, rapports et outils collaboratifs.' },
    { title: 'Hôtellerie et restauration', text: 'Réservations, Wi-Fi clients, menus et commandes en ligne.' },
    { title: 'Transport et logistique', text: 'Suivi des livraisons, gestion de flotte et applications chauffeurs.' },
    { title: 'PME et startups', text: 'Site, e-mail professionnel et outils de gestion pour démarrer vite.' },
  ],
  steps: [
    { title: 'Écoute', text: 'On découvre votre activité, vos clients et vos contraintes, chez vous ou en visio.' },
    { title: 'Proposition', text: 'Un devis clair, un planning et des priorités. Sans jargon.' },
    { title: 'Conception', text: 'Maquettes, prototypes et points réguliers : vous validez chaque étape.' },
    { title: 'Lancement', text: 'Mise en ligne, installation sur site et formation de vos équipes.' },
    { title: 'Suivi', text: 'Maintenance, mises à jour et assistance quand vous en avez besoin.' },
  ],
  technologies: ['React', 'Next.js', 'Node.js', 'Laravel', 'Flutter', 'WordPress', 'PostgreSQL', 'MySQL', 'Python', 'Microsoft 365', 'Google Workspace', 'MikroTik', 'Ubiquiti UniFi', 'API WhatsApp Business'],
  paymentMethods: ['M-Pesa', 'Airtel Money', 'Orange Money', 'Virement bancaire', 'Espèces (USD ou CDF)'],
}

export const home = {
  meta: {
    title: '',
    description: 'Sites web, applications, IA, réseaux et assistance informatique à Lubumbashi. Une équipe d’ici qui conçoit vos outils, les installe et reste à vos côtés.',
  },
  hero: {
    eyebrow: 'Startup tech',
    title: 'Le numérique au service de ceux qui *font bouger* Lubumbashi.',
    text: 'Sites web, applications, intelligence artificielle, réseaux et assistance informatique. Une équipe d’ici qui conçoit vos outils, les installe et reste à vos côtés après la mise en ligne.',
    primaryCta: 'Demander un devis',
    secondaryCta: 'Découvrir nos services',
    badge: 'DEVIS · CONSEIL · SUPPORT · LUBUMBASHI · ',
  },
  services: {
    eyebrow: 'Nos services',
    title: 'Quatre expertises, un seul interlocuteur.',
    text: 'Développement web et mobile, réseaux, intelligence artificielle et formations : des solutions adaptées à vos besoins.',
    link: 'Voir le détail des services',
    more: 'En savoir plus',
  },
  why: {
    eyebrow: 'Pourquoi nous',
    title: 'Pensé pour le terrain, pas pour une brochure.',
    items: [
      { title: 'Une équipe sur place', text: 'Basés à Lubumbashi, joignables par téléphone et WhatsApp, et capables de passer vous voir.' },
      { title: 'Connexion lente ? C’est prévu.', text: 'Des sites et applications légers, rapides en 3G, avec un mode hors ligne quand l’activité l’exige.' },
      { title: 'Le paiement mobile, intégré', text: 'M-Pesa, Airtel Money, Orange Money : vos clients paient comme ils en ont l’habitude.' },
      { title: 'Les coupures de courant aussi', text: 'Onduleurs, sauvegardes automatiques et serveurs pensés pour tenir quand le réseau électrique lâche.' },
      { title: 'Français, swahili, anglais', text: 'Des interfaces et des formations dans la langue de vos équipes et de vos clients.' },
    ],
  },
  process: {
    eyebrow: 'Notre méthode',
    title: 'Cinq étapes, zéro mystère.',
    text: 'Vous savez toujours où en est votre projet, ce qui a été fait et ce qui arrive ensuite.',
  },
  work: {
    eyebrow: 'Réalisations',
    title: 'Des outils qui servent tous les jours.',
    link: 'Voir tous les projets',
  },
  testimonials: {
    title: 'Ils en parlent',
    note: 'Retours illustratifs ; les portraits sont des photos d’étudiants utilisées à titre d’exemple, sans lien avec les noms affichés.',
  },
  pricing: {
    eyebrow: 'Tarifs',
    title: 'Des prix clairs, pensés pour les PME.',
    link: 'Comparer les formules',
    from: 'À partir de',
    plans: [
      { name: 'Site vitrine', text: 'Un site professionnel pour présenter votre activité.', price: '500 $' },
      { name: 'Site e-commerce', text: 'Une boutique en ligne pour présenter et vendre vos produits.', price: '1 500 $' },
      { name: 'Réseau, IA et projets sur mesure', text: 'Parlons de vos besoins pour préparer une proposition adaptée.', price: 'Sur devis' },
    ],
  },
  cta: {
    eyebrow: 'Prochaine étape',
    title: 'Votre projet commence par une conversation.',
    text: 'Expliquez-nous votre besoin en quelques lignes. On revient vers vous avec des questions, puis une proposition claire.',
    button: 'Demander un devis',
  },
}

export const services = {
  meta: {
    title: 'Services',
    description: 'Développement web et mobile, assistance IT, transformation numérique, IA, réseaux et conseil digital à Lubumbashi.',
  },
  hero: {
    eyebrow: 'Services',
    title: 'Tout ce qu’il faut pour faire tourner votre entreprise *en numérique.*',
    text: 'Quatre expertises complémentaires : le web et mobile, les réseaux, l’IA et les formations numériques.',
  },
  idealForLabel: 'Idéal pour',
  sectors: { eyebrow: 'Secteurs', title: 'On parle le langage de votre métier.' },
  cta: {
    title: 'Pas sûr du service qu’il vous faut ?',
    text: 'Décrivez votre situation. On vous oriente vers la solution la plus simple, même si c’est la moins chère.',
    button: 'Nous écrire',
  },
}

export const serviceWeb = {
  meta: {
    title: 'Web et mobile',
    description: 'Sites web, boutiques en ligne et applications mobiles rapides en 3G, avec paiement mobile, à Lubumbashi.',
  },
  hero: {
    breadcrumb: 'Web et mobile',
    title: 'Des sites et des applications qui travaillent pour vous, *même en 3G.*',
    text: 'On conçoit, on développe, on met en ligne et on forme vos équipes. Le code, les accès et le nom de domaine restent à votre nom.',
    primaryCta: 'Demander un devis',
    secondaryCta: 'Voir les tarifs',
  },
  deliverables: {
    eyebrow: 'Inclus dans chaque projet',
    title: 'Ce que vous recevez, noir sur blanc.',
    items: [
      { title: 'Design sur mesure', text: 'Une identité qui vous ressemble, pas un modèle vu partout.', icon: 'star' },
      { title: 'Pensé pour le mobile', text: 'La majorité de vos visiteurs arrive depuis un téléphone.', icon: 'phone' },
      { title: 'Paiement mobile', text: 'M-Pesa, Airtel Money, Orange Money, ou paiement à la livraison.', icon: 'card' },
      { title: 'WhatsApp et formulaires', text: 'Vos clients vous écrivent en un clic, vous recevez tout au même endroit.', icon: 'chat' },
      { title: 'Référencement local', text: 'Fiche Google Maps et pages pensées pour les recherches à Lubumbashi.', icon: 'pin' },
      { title: 'Domaine et hébergement', text: 'Adresse en .cd ou .com, e-mails professionnels, certificat de sécurité.', icon: 'globe' },
      { title: 'Espace d’administration', text: 'Modifiez textes, photos, produits et prix sans compétence technique.', icon: 'admin' },
      { title: 'Formation et guide', text: 'Une séance avec vos équipes et un guide en français.', icon: 'book' },
    ],
  },
  types: {
    eyebrow: 'Types de projets',
    title: 'Quel projet vous ressemble ?',
    durationLabel: 'Délai indicatif',
    budgetLabel: 'Budget',
    link: 'Choisir ce projet',
    items: [
      { title: 'Site vitrine', text: 'Présenter votre activité, rassurer et recevoir des demandes.', price: 'À partir de 500 $', duration: '2 semaines' },
      { title: 'Boutique en ligne', text: 'Catalogue, panier, paiement mobile et suivi des commandes.', price: 'À partir de 1 500 $', duration: '3 à 4 mois' },
      { title: 'Application mobile', text: 'Android et iOS, avec mode hors ligne pour le terrain.', price: 'Sur devis', duration: 'Sur devis' },
      { title: 'Plateforme sur mesure', text: 'Gestion interne, portail client, inscriptions, réservations.', price: 'Sur devis', duration: 'Sur devis' },
    ],
  },
  timeline: {
    eyebrow: 'Déroulé',
    title: 'Comment se passe un projet web.',
    text: 'Une démonstration à chaque étape. Vous ne découvrez jamais le résultat le jour de la livraison.',
    items: [
      { title: 'Atelier de cadrage', text: 'Une séance pour fixer les objectifs, les pages, les fonctions et le budget.' },
      { title: 'Maquettes', text: 'Vous voyez le site avant qu’une seule ligne de code soit écrite, et vous le corrigez.' },
      { title: 'Développement', text: 'Démonstration régulière sur un lien de test que vous pouvez partager en interne.' },
      { title: 'Tests sur vrais téléphones', text: 'Petits écrans, connexion lente, différents navigateurs : on vérifie tout.' },
      { title: 'Mise en ligne', text: 'Domaine, hébergement, e-mails et fiche Google configurés.' },
      { title: 'Formation et suivi', text: 'Vos équipes prennent la main, et on reste joignables pour la suite.' },
    ],
  },
  faq: { eyebrow: 'Questions', title: 'Ce qu’on nous demande souvent.', link: 'Toutes les questions' },
  cta: { title: 'Votre site peut être en ligne *plus vite que vous ne le pensez.*', button: 'Lancer mon projet' },
}

export const serviceReseau = {
  meta: {
    title: 'Réseaux et infrastructures',
    description: 'Nous concevons et installons des réseaux adaptés à vos locaux, vos équipes et vos usages, avec un accompagnement local à Lubumbashi.',
  },
  hero: {
    breadcrumb: 'Réseaux et infrastructures',
    eyebrow: 'Réseaux',
    title: 'Un réseau fiable pour votre activité.',
    text: 'Nous concevons et installons des réseaux adaptés à vos locaux, vos équipes et vos usages, avec un accompagnement local à Lubumbashi.',
    primaryCta: 'Demander un devis',
    secondaryCta: 'Voir les tarifs',
  },
  included: {
    eyebrow: 'Notre accompagnement',
    title: 'Une infrastructure conçue pour durer.',
    items: ['Audit et conception de réseau', 'Câblage structuré et installation', 'Wi-Fi professionnel et accès invités', 'Serveurs et solutions de stockage', 'Sauvegardes et protection électrique', 'Sécurisation de votre infrastructure'],
  },
  types: {
    eyebrow: 'Nos solutions',
    title: 'Des interventions adaptées à votre organisation.',
    items: [
      { title: 'Wi-Fi professionnel', text: 'Une couverture pensée selon vos bâtiments, vos usages et le nombre de connexions.', details: ['Étude de couverture et emplacement des bornes', 'Réseau séparé pour visiteurs et équipes', 'Configuration et documentation des accès'] },
      { title: 'Câblage et équipements', text: 'Une infrastructure claire, organisée et adaptée aux évolutions de votre activité.', details: ['Câblage structuré et baie réseau', 'Routeurs, commutateurs et points d’accès', 'Repérage des prises et schéma de l’installation'] },
      { title: 'Serveurs et protection', text: 'Des données et services accessibles aux bonnes personnes et protégés des incidents.', details: ['Serveur local ou environnement cloud', 'Sauvegardes planifiées et vérification de restauration', 'Onduleurs, pare-feu et droits d’accès'] },
    ],
  },
  outcomes: {
    eyebrow: 'Résultats visés',
    title: 'Une solution que votre équipe peut vraiment utiliser.',
    items: ['Une couverture Wi-Fi adaptée à vos espaces', 'Des accès séparés et contrôlables', 'Une infrastructure documentée', 'Un plan de sauvegarde et de continuité'],
  },
  method: {
    eyebrow: 'Méthode',
    title: 'Un déroulement clair, de l’étude au suivi.',
    items: [
      { title: 'Visite et diagnostic', text: 'Nous examinons vos locaux, l’installation existante, les usages et les problèmes rencontrés.' },
      { title: 'Plan et devis détaillé', text: 'Vous recevez une proposition qui précise les équipements, le câblage, le calendrier et les limites du projet.' },
      { title: 'Installation et configuration', text: 'Nous installons les équipements, organisons les accès et vérifions la couverture avec vos équipes.' },
      { title: 'Documentation et suivi', text: 'Vous récupérez le schéma réseau, les consignes utiles et les recommandations de maintenance.' },
    ],
    note: 'Le prix dépend du périmètre, des équipements ou intégrations nécessaires et du niveau d’accompagnement. Chaque proposition est établie après échange et diagnostic.',
    button: 'Obtenir un devis sur mesure',
  },
  faq: { eyebrow: 'Questions fréquentes', title: 'Avant de démarrer.' },
  cta: {
    title: 'Faisons avancer votre activité *avec les bons outils.*',
    text: 'Décrivez-nous votre besoin et recevez une proposition adaptée.',
    button: 'Demander un devis',
  },
}

export const serviceIa: typeof serviceReseau = {
  meta: {
    title: 'IA et automatisation',
    description: 'Nous intégrons l’intelligence artificielle et l’automatisation à vos processus pour simplifier les demandes, les documents et le travail quotidien.',
  },
  hero: {
    breadcrumb: 'IA et automatisation',
    eyebrow: 'IA et automatisation',
    title: 'Moins de tâches répétitives, plus de temps pour vos clients.',
    text: 'Nous intégrons l’intelligence artificielle et l’automatisation à vos processus pour simplifier les demandes, les documents et le travail quotidien.',
    primaryCta: 'Demander un devis',
    secondaryCta: 'Voir les tarifs',
  },
  included: {
    eyebrow: 'Notre accompagnement',
    title: 'Des outils utiles, intégrés à vos méthodes.',
    items: ['Assistants sur WhatsApp et votre site', 'Réponses automatiques aux clients', 'Lecture et tri de documents', 'Automatisation des tâches répétitives', 'Connexion entre vos outils existants', 'Formation de vos équipes aux nouveaux outils'],
  },
  types: {
    eyebrow: 'Nos solutions',
    title: 'Des interventions adaptées à votre organisation.',
    items: [
      { title: 'Assistants clients', text: 'Un assistant sur WhatsApp ou votre site aide à traiter les demandes fréquentes.', details: ['Réponses fondées sur les informations de votre activité', 'Collecte des demandes et orientation vers la bonne équipe', 'Transfert à une personne pour les cas particuliers'] },
      { title: 'Automatisation de processus', text: 'Les tâches répétées passent d’un outil à l’autre sans ressaisie manuelle.', details: ['Transmission de formulaires et notifications', 'Suivi des demandes et rappels automatiques', 'Connexion aux outils déjà utilisés par vos équipes'] },
      { title: 'Documents et information', text: 'Facilitez le classement, l’extraction et la recherche dans vos documents.', details: ['Extraction de champs et classement assisté', 'Synthèse et préparation de brouillons', 'Validation humaine avant toute action sensible'] },
    ],
  },
  outcomes: {
    eyebrow: 'Résultats visés',
    title: 'Une solution que votre équipe peut vraiment utiliser.',
    items: ['Des étapes répétitives réduites', 'Des demandes mieux orientées', 'Des règles de validation explicites', 'Des outils documentés et transférables'],
  },
  method: {
    eyebrow: 'Méthode',
    title: 'Un déroulement clair, de l’étude au suivi.',
    items: [
      { title: 'Repérer les tâches utiles à automatiser', text: 'Nous cartographions le processus, les outils utilisés, le volume et les exceptions.' },
      { title: 'Définir les règles et les limites', text: 'Nous décidons ce qui peut être automatisé, les données accessibles et les cas qui nécessitent une validation humaine.' },
      { title: 'Construire un prototype', text: 'Un premier scénario est testé avec des exemples réels et les personnes qui l’utiliseront.' },
      { title: 'Déployer et mesurer', text: 'Après validation, nous documentons la solution, formons les équipes et suivons son fonctionnement.' },
    ],
    note: 'Le prix dépend du périmètre, des équipements ou intégrations nécessaires et du niveau d’accompagnement. Chaque proposition est établie après échange et diagnostic.',
    button: 'Obtenir un devis sur mesure',
  },
  faq: { eyebrow: 'Questions fréquentes', title: 'Avant de démarrer.' },
  cta: {
    title: 'Faisons avancer votre activité *avec les bons outils.*',
    text: 'Décrivez-nous votre besoin et recevez une proposition adaptée.',
    button: 'Demander un devis',
  },
}

export const training = {
  meta: {
    title: 'Formations',
    description: 'Formations en développement web et mobile, bureautique, IA générative et réseaux, en présentiel ou en ligne, sur devis.',
  },
  hero: {
    eyebrow: 'Formations',
    title: 'Apprenez le numérique avec ceux *qui le pratiquent.*',
    text: 'Développement web et mobile, bureautique, IA générative et réseaux : cinq formations pratiques en présentiel ou en ligne.',
    primaryCta: 'Voir les formations',
    secondaryCta: 'Former mon équipe',
    highlights: ['{count} formations au catalogue', 'Sur place, en entreprise ou en ligne', 'Attestation de fin de formation'],
  },
  catalogue: {
    eyebrow: 'Catalogue',
    title: 'Choisissez votre formation.',
    audienceLabel: 'Pour :',
    programLabel: 'Au programme',
    durationLabel: 'Durée',
    priceLabel: 'Tarif',
    button: 'Demander un devis',
    emptyTitle: 'Aucune formation pour ce choix.',
    emptyText: 'Choisissez une autre formation ou contactez-nous pour préciser votre besoin.',
  },
  formats: {
    eyebrow: 'Formats',
    title: 'Deux façons de se former.',
    items: [
      { title: 'Présentielle', text: 'Apprenez avec un formateur, en salle ou dans vos locaux.', points: ['Exercices pratiques accompagnés', 'Échanges directs avec le formateur', 'Programme et lieu convenus avec vous'], icon: 'pin' },
      { title: 'En ligne', text: 'Suivez la formation à distance, où que vous soyez.', points: ['Séances à distance avec un formateur', 'Supports et exercices pratiques', 'Dates convenues après échange'], icon: 'globe' },
    ],
  },
  steps: {
    title: 'Comment se passe une formation',
    items: [
      { title: 'Choisir', text: 'Choisissez un sujet et le format présentiel ou en ligne.' },
      { title: 'Demander un devis', text: 'Indiquez vos objectifs et le nombre de participants pour recevoir une proposition.' },
      { title: 'Se former', text: 'Suivez un programme pratique adapté à vos besoins.' },
      { title: 'Progresser', text: 'Repartez avec les compétences et supports convenus.' },
    ],
  },
  teams: {
    eyebrow: 'Entreprises et organisations',
    title: 'Formez toute votre équipe, *sur vos propres outils.*',
    text: 'On part de vos objectifs et de vos outils. Vous recevez un programme et un devis, puis nous convenons du format et des dates avec vous.',
    button: 'Demander un programme sur mesure',
    callLabel: 'Appeler le {phone}',
    examplesTitle: 'Exemples de programmes sur mesure',
    examples: ['Développement web pour débutants', 'Développement mobile', 'Bureautique pour une équipe', 'IA générative au travail', 'Initiation aux réseaux informatiques'],
  },
  faq: {
    eyebrow: 'Questions',
    title: 'Avant de vous inscrire.',
    text: 'Une autre question ? Appelez le {phone}.',
  },
  enrollment: {
    eyebrow: 'Inscription',
    title: 'Demandez votre devis.',
    text: 'Toutes nos formations sont sur devis. Nous vous recontactons pour préciser le programme, le format et les modalités.',
    adviceOption: 'Je ne sais pas encore, conseillez-moi',
    adviceTitle: 'On vous aide à choisir.',
    adviceText: 'Décrivez vos objectifs dans le formulaire : nous vous proposerons un programme adapté.',
    emptyTitle: 'Aucune formation choisie',
    emptyText: 'Sélectionnez-en une dans le formulaire, ou cliquez sur « Demander un devis » dans le catalogue.',
    phoneLabel: 'Par téléphone',
    whatsappLabel: 'Par WhatsApp',
    formTitle: 'Demande d’inscription',
    consent: 'J’accepte que mes informations soient utilisées pour traiter mon inscription.',
    submit: 'Envoyer ma demande',
    note: 'Aucun paiement à cette étape.',
    successTitle: 'Merci, votre demande d’inscription est bien partie.',
    successText: 'On vous rappelle pour confirmer la date et le paiement.',
    again: 'Faire une autre inscription',
  },
}

export const pricing = {
  meta: {
    title: 'Tarifs',
    description: 'Tarifs des sites web, applications et abonnements d’assistance informatique de Fibetech à Lubumbashi.',
  },
  hero: {
    eyebrow: 'Tarifs',
    title: 'Des tarifs clairs. *Pas de surprise* sur la facture.',
    text: 'Chaque devis détaille ce qui est inclus, le délai et les conditions de paiement. Les prix ci-dessous sont des points de départ.',
    tabCreation: 'Création de site et d’app',
    tabAssistance: 'Réseaux, IA et automatisation',
  },
  fromLabel: 'à partir de',
  priceLabel: 'prix',
  onQuote: 'Sur devis',
  currency: '$',
  note: 'Les prix affichés sont des prix de départ. Les réseaux, l’IA et l’automatisation sont proposés sur devis.',
  payment: {
    eyebrow: 'Paiement',
    title: 'Payez comme vous voulez.',
    text: 'Acompte au démarrage, solde à la mise en ligne. Les abonnements se règlent chaque mois ou chaque année.',
  },
  faq: { eyebrow: 'Questions sur les prix', title: 'Avant de demander un devis.' },
  cta: {
    title: 'Pas sûr de la formule ? *On vous conseille.*',
    text: 'Un échange de 20 minutes suffit souvent pour savoir ce qu’il vous faut.',
    button: 'Réserver un échange',
  },
}

export const work = {
  meta: {
    title: 'Réalisations',
    description: 'Projets web, mobiles, IA, réseaux et assistance informatique réalisés par Fibetech à Lubumbashi.',
  },
  hero: {
    eyebrow: 'Réalisations',
    title: 'Des projets concrets, *pour des gens d’ici.*',
    text: 'Chaque fiche raconte le problème de départ, la solution et ce qui a changé pour le client.',
  },
  filters: [
    { value: 'tous', label: 'Tous' },
    { value: 'web', label: 'Web' },
    { value: 'mobile', label: 'Mobile' },
    { value: 'ia', label: 'IA' },
    { value: 'reseaux', label: 'Réseaux' },
    { value: 'it', label: 'Assistance IT' },
  ],
  empty: 'Nos réalisations seront présentées ici très bientôt. En attendant, parlez-nous de votre projet.',
  cta: { title: 'Le prochain projet sur cette page pourrait être le vôtre.', button: 'Parler de mon projet' },
}

export const project = {
  badge: 'Étude de projet',
  breadcrumb: 'Réalisations',
  cta: 'Parler d’un projet similaire',
  imageCaption: 'Illustration du domaine du projet.',
  challenge: {
    eyebrow: 'Le besoin',
    note: 'Le projet décrit une solution fonctionnelle, à ajuster avec le client selon son organisation, ses utilisateurs et les outils déjà en place.',
  },
  approach: { eyebrow: 'Conception', title: 'Une réponse construite autour des usages.' },
  stages: { eyebrow: 'Déroulement', title: 'Les étapes du projet.' },
  gallery: {
    eyebrow: 'Galerie',
    title: 'Images du secteur et des usages.',
    note: 'Images d’illustration. Elles ne représentent pas des captures réelles de la plateforme.',
  },
  next: { eyebrow: 'Votre projet', title: 'Vous avez un besoin similaire ?', button: 'Demander un devis' },
  band: {
    eyebrow: 'Parlons de votre idée',
    title: 'Construisons un outil adapté à votre activité.',
    text: 'Présentez-nous votre besoin et nous préparerons une proposition adaptée à vos priorités.',
    button: 'Demander un devis',
  },
  back: 'Toutes les réalisations',
}

export const about = {
  meta: {
    title: 'À propos',
    description: 'Fibetech, startup informatique de Lubumbashi : notre histoire, notre mission, nos valeurs et notre équipe.',
  },
  hero: {
    eyebrow: 'À propos',
    title: 'Une startup de Lubumbashi, *pour Lubumbashi* et au-delà.',
    text: 'On aide les entreprises, les écoles et les organisations du Haut-Katanga à utiliser la technologie sans se perdre dans le jargon ni dépendre de prestataires lointains.',
  },
  story: {
    eyebrow: 'Notre histoire',
    lead: 'Nés d’une rencontre à l’université et d’une même envie : mettre nos compétences au service de notre communauté dès aujourd’hui.',
    paragraphs: [
      'Pendant nos études, nous avons constaté que les personnes et les organisations autour de nous avaient des besoins numériques concrets. Nous avons choisi de passer à l’action sans attendre la fin de notre cursus et de bâtir une startup ancrée à Lubumbashi.',
      'C’est ainsi qu’est née Fibetech : un projet collectif qui transforme nos idées et nos apprentissages en solutions utiles. Nous accompagnons les entreprises, les écoles et les particuliers, du conseil à la réalisation, avec une attention particulière portée à la proximité, à la qualité et au partage des compétences.',
      'Nous continuons à apprendre et à grandir avec notre communauté afin de créer des outils fiables, adaptés aux réalités locales et capables d’ouvrir de nouvelles possibilités.',
    ],
  },
  mission: {
    eyebrow: 'Mission',
    title: 'Rendre la technologie utile et accessible aux organisations du Haut-Katanga.',
    text: 'Des solutions adaptées à la réalité locale : connexion, énergie, paiement, langues. Et un accompagnement qui ne s’arrête pas à la livraison.',
  },
  vision: {
    eyebrow: 'Vision',
    title: 'Que les meilleurs outils numériques de la région soient construits dans la région.',
    text: 'Former des talents locaux, garder la valeur ici et montrer qu’une startup de Lubumbashi peut livrer au niveau international.',
  },
  values: {
    eyebrow: 'Nos valeurs',
    title: 'Ce qui guide chaque décision.',
    items: [
      { title: 'Proximité', text: 'On se déplace, on décroche, on répond. Le support ne passe pas par un formulaire anonyme.' },
      { title: 'Clarté', text: 'Des devis lisibles, des explications simples et des délais réalistes.' },
      { title: 'Fiabilité', text: 'Ce qu’on installe doit tenir : sauvegardes, documentation, tests sur le terrain.' },
      { title: 'Transmission', text: 'On forme vos équipes pour que vous restiez maîtres de vos outils.' },
    ],
  },
  name: {
    eyebrow: 'Pourquoi ce nom',
    caption: 'fibetech · startup informatique · Lubumbashi',
    story: '« Fibe » vient du mot *fibre*, qui évoque la rapidité et la fluidité. Associé à « tech », il exprime notre volonté de proposer des services numériques réactifs, fiables et accessibles.',
    note: 'Un nom qui reflète notre ambition : relier les idées à des solutions concrètes grâce à la technologie.',
  },
  team: { eyebrow: 'L’équipe', title: 'Les visages derrière vos projets.' },
  where: {
    eyebrow: 'Où nous trouver',
    title: 'On est juste à côté.',
    addressLabel: 'Adresse',
    hoursLabel: 'Horaires',
    phoneLabel: 'Téléphone',
    button: 'Planifier une visite',
  },
}

export const blog = {
  meta: {
    title: 'Blog',
    description: 'Conseils numériques pour les entreprises du Katanga : connexion, paiement mobile, sécurité, IA.',
  },
  hero: {
    eyebrow: 'Le journal',
    title: 'Conseils numériques pour les entreprises *du Katanga.*',
    text: 'Des guides concrets, écrits pour le terrain : connexion, paiement mobile, sécurité, IA.',
  },
  allLabel: 'Tous',
  featuredBadge: 'À la une',
  readMore: 'Lire l’article',
  empty: 'Aucun article publié pour le moment.',
  article: {
    back: 'Tous les articles',
    draftNote: 'Cet article est en cours de rédaction. Revenez bientôt pour le lire en entier.',
    ctaTitle: 'Une question sur ce sujet ?',
    ctaButton: 'Nous écrire',
  },
  newsletter: {
    eyebrow: 'Lettre d’information',
    title: 'Un conseil utile par mois, pas plus.',
    text: 'Désinscription en un clic. On ne partage jamais votre adresse.',
    label: 'Votre e-mail professionnel',
    button: 'S’inscrire',
    success: 'Merci ! Votre inscription est enregistrée.',
  },
}

export const contact = {
  meta: {
    title: 'Contact et devis',
    description: 'Demandez un devis à Fibetech : site web, application, assistance IT, IA ou réseau à Lubumbashi.',
  },
  hero: {
    eyebrow: 'Contact et devis',
    title: 'Parlons de *votre projet.*',
    text: 'Remplissez le formulaire ou appelez-nous. Une personne de l’équipe vous répond, pas un robot.',
  },
  cards: {
    phoneLabel: 'Téléphone',
    callLabel: 'Appeler',
    whatsappLabel: 'WhatsApp',
    whatsappText: 'Écrivez-nous, même le soir.',
    whatsappNumberLabel: 'Numéro :',
    emailLabel: 'E-mail',
    mapLink: 'Ouvrir dans Google Maps',
  },
  form: {
    title: 'Demande de devis',
    requiredNote: 'Les champs marqués d’un astérisque sont obligatoires.',
    servicesLegend: 'De quoi avez-vous besoin ?',
    servicesHint: '(plusieurs choix possibles)',
    services: ['Site web', 'Application mobile', 'Assistance IT', 'Transformation numérique', 'IA et automatisation', 'Réseaux', 'Formation', 'Conseil'],
    budgetLegend: 'Budget envisagé',
    budgets: ['Moins de 500 $', '500 à 1 499 $', '1 500 à 2 999 $', '3 000 $ et plus', 'À définir sur devis'],
    contactLegend: 'Comment préférez-vous être recontacté ?',
    messageLabel: 'Votre projet en quelques lignes *',
    messagePlaceholder: 'Ce que vous voulez faire, pour qui, et pour quand.',
    consent: 'J’accepte que mes informations soient utilisées pour répondre à ma demande.',
    submit: 'Envoyer ma demande',
    note: 'Recevez le prix et le délai estimé sous 24 heures.',
  },
  success: {
    title: 'Merci, votre demande est bien partie.',
    text: 'On vous recontacte par {channel} pour poser quelques questions, puis on vous envoie une proposition.',
    servicesLabel: 'Services choisis :',
    again: 'Faire une autre demande',
  },
  bottom: { title: 'Une question avant de nous écrire ?', faqButton: 'Lire la FAQ', pricingButton: 'Voir les tarifs' },
}

export const faq = {
  meta: {
    title: 'Questions fréquentes',
    description: 'Réponses aux questions fréquentes sur les projets web, l’assistance IT, le paiement et la sécurité chez Fibetech.',
  },
  hero: {
    eyebrow: 'Aide',
    title: 'Questions fréquentes',
    searchLabel: 'Rechercher une question',
    searchPlaceholder: 'Rechercher : délai, paiement, Wi-Fi…',
    allLabel: 'Tout',
  },
  empty: {
    title: 'Aucune réponse pour cette recherche.',
    text: 'Essayez un autre mot, ou posez directement votre question à l’équipe.',
    link: 'Poser ma question',
  },
  cta: {
    title: 'Vous n’avez pas trouvé ?',
    text: 'Appelez le {phone} ou écrivez-nous. On complète cette page avec vos questions.',
    button: 'Nous écrire',
    callButton: 'Appeler',
  },
}

const legalCommon = {
  back: '← Retour à l’accueil',
  updated: 'Dernière mise à jour : 5 novembre 2026',
  button: 'Contacter Fibetech',
}

export const legal = {
  meta: { title: 'Mentions légales', description: 'Informations relatives à l’éditeur et à l’hébergement du site Fibetech.' },
  eyebrow: 'Informations du site',
  title: 'Mentions légales',
  intro: 'Informations relatives à l’éditeur et à l’hébergement du site Fibetech.',
  notice: '**À compléter avant publication :** identité juridique, numéros d’immatriculation, responsable de publication et hébergeur.',
  sections: [
    {
      title: 'Éditeur du site',
      body: '**Nom commercial :** {name}\n\n**Dénomination légale et forme juridique :** [à compléter]\n\n**Adresse :** {fullAddress}\n\n**E-mail :** [{email}](mailto:{email})\n\n**Téléphone :** {phone}\n\n**RCCM, ID. Nat. et NIF :** [à compléter]\n\n**Directeur ou responsable de publication :** [à compléter]',
    },
    { title: 'Hébergement', body: 'Hébergeur du site : [à compléter avec le nom légal, l’adresse et les coordonnées de l’hébergeur effectivement utilisé].' },
    {
      title: 'Propriété intellectuelle',
      body: 'Sauf mention contraire, les textes, éléments graphiques, marques et contenus publiés sur ce site sont protégés par les règles applicables de propriété intellectuelle. Toute réutilisation substantielle nécessite l’autorisation préalable de leur titulaire. Les images provenant de banques d’images restent soumises aux licences de leurs auteurs.',
    },
    { title: 'Contact', body: 'Pour toute question relative au site ou à son contenu, écrivez à [{email}](mailto:{email}).' },
  ],
  ...legalCommon,
}

export const privacy: typeof legal = {
  meta: {
    title: 'Politique de confidentialité',
    description: 'Les données que les formulaires du site demandent, comment elles sont conservées et qui peut les consulter.',
  },
  eyebrow: 'Données personnelles',
  title: 'Politique de confidentialité',
  intro: 'Cette page décrit les données que les formulaires du site demandent, comment elles sont conservées et qui peut les consulter.',
  notice: '**À vérifier avant publication :** durée de conservation des demandes, personnes qui y ont accès et identité juridique du responsable.',
  sections: [
    {
      title: 'Responsable du traitement',
      body: 'Responsable : {name}, {fullAddress}. Contact : [{email}](mailto:{email}). Identité juridique complète et coordonnées du responsable : [à compléter].',
    },
    {
      title: 'Données demandées',
      body: 'Les formulaires de contact et de demande de formation peuvent demander un nom, un numéro de téléphone, une adresse e-mail, une organisation, le sujet de la demande, un budget indicatif, un format de formation et un message. Les champs obligatoires sont signalés dans le formulaire. La lettre d’information demande uniquement une adresse e-mail.',
    },
    {
      title: 'Envoi et conservation',
      body: 'Les demandes envoyées depuis les formulaires du site (devis, inscription à une formation, lettre d’information) sont enregistrées dans la base de données du site. Seules les personnes de l’équipe {name} qui disposent d’un accès à l’espace d’administration peuvent les consulter. Durée de conservation : [à définir].\n\nLe choix de fermeture du bandeau cookies est mémorisé dans le stockage local du navigateur. N’envoyez pas d’information sensible par ces formulaires.',
    },
    {
      title: 'Cookies et mesure d’audience',
      body: 'Le site n’intègre actuellement aucun outil de mesure d’audience ou de publicité. Seul l’espace d’administration, réservé à l’équipe, utilise un cookie de session. L’hébergeur et les services tiers chargés pour afficher certaines cartes, polices ou images peuvent toutefois recevoir des informations techniques selon leurs propres politiques.',
    },
    {
      title: 'Vos demandes',
      body: 'Pour toute question ou demande concernant vos données, notamment pour les consulter ou les faire supprimer, contactez {name} à [{email}](mailto:{email}). Les demandes sont traitées sous réserve des règles applicables en République démocratique du Congo.',
    },
    {
      title: 'Référence légale',
      body: 'Le cadre applicable comprend notamment le Code du numérique de la République démocratique du Congo, issu de l’ordonnance-loi n° 23/010 du 13 mars 2023. [Consulter le texte publié par l’ARE](https://are.gouv.cd/download/ordonnance-loi-23-010-du-13-mars-portant-code-du-numerique/).',
    },
  ],
  ...legalCommon,
}

export const terms: typeof legal = {
  meta: {
    title: 'Conditions générales',
    description: 'Principes applicables aux demandes et prestations de Fibetech.',
  },
  eyebrow: 'Prestations Fibetech',
  title: 'Conditions générales',
  intro: 'Principes applicables aux demandes et prestations de Fibetech. Le devis accepté ou le contrat signé précise le périmètre convenu pour chaque projet.',
  notice: '',
  sections: [
    {
      title: 'Prestations et devis',
      body: 'Fibetech propose notamment la conception de sites et plateformes web, le développement mobile, les réseaux, l’intelligence artificielle, l’automatisation et les formations. Le devis précise les livrables, le prix, les délais estimatifs, les modalités de paiement et les éventuelles prestations récurrentes. Aucun travail spécifique ne commence avant acceptation du devis ou signature du contrat correspondant.',
    },
    {
      title: 'Prix et paiement',
      body: 'Les tarifs affichés sur le site sont des prix de départ lorsque cela est indiqué. Les autres projets sont évalués sur devis. Les échéances, acomptes, taxes applicables et modes de paiement sont précisés dans le devis accepté. Toute modification du périmètre peut entraîner une révision du prix et du calendrier, soumise à l’accord des parties.',
    },
    {
      title: 'Délais et collaboration',
      body: 'Les délais sont estimatifs sauf engagement écrit contraire. Le client fournit les contenus, accès, validations et informations nécessaires au projet. Un retard de transmission ou de validation peut modifier le calendrier de livraison.',
    },
    {
      title: 'Validation et corrections',
      body: 'Le devis ou cahier des charges définit les étapes de validation et les éléments inclus. Les demandes qui dépassent le périmètre approuvé peuvent faire l’objet d’un devis complémentaire avant leur réalisation.',
    },
    {
      title: 'Propriété et accès',
      body: 'Les livrables, licences de logiciels tiers, accès aux comptes et conditions de transfert sont précisés dans le devis ou le contrat. Les éléments tiers restent soumis à leurs propres licences. Les modalités de remise des codes sources, identifiants, fichiers et droits d’utilisation doivent être convenues par écrit.',
    },
    {
      title: 'Maintenance et tiers',
      body: 'L’hébergement, le nom de domaine, la maintenance, les mises à jour et l’assistance après livraison ne sont inclus que s’ils figurent dans le devis ou le contrat. Les services de paiement, opérateurs, hébergeurs et autres fournisseurs tiers restent soumis à leurs propres conditions.',
    },
    {
      title: 'Annulation et règlement des différends',
      body: 'Les conditions d’annulation, les conséquences financières d’un arrêt de projet et les modalités de règlement des différends doivent être précisées dans le devis ou le contrat signé. Les parties s’efforcent d’abord de rechercher une solution amiable. Le droit applicable et la juridiction compétente sont à confirmer dans les documents contractuels selon la situation juridique de Fibetech.',
    },
    { title: 'Contact', body: 'Pour toute demande liée à une prestation, contactez Fibetech à [{email}](mailto:{email}) ou au {phone}.' },
  ],
  ...legalCommon,
}

export const notFound = {
  meta: { title: 'Page introuvable', description: '' },
  title: 'Cette page s’est perdue dans la foule.',
  text: 'Le lien est peut-être ancien, ou l’adresse contient une faute de frappe. Voici de quoi retrouver votre chemin.',
  homeButton: 'Retour à l’accueil',
  reportButton: 'Signaler le lien cassé',
  usefulTitle: 'Pages utiles',
  links: [link('Services', '/services'), link('Formations', '/formations'), link('Tarifs', '/tarifs'), link('Réalisations', '/realisations'), link('Blog', '/blog'), link('FAQ', '/faq')],
}

/** Tous les blocs de contenu, par clé (= colonne `key` de la table content_blocks). */
export const blockDefaults = {
  site,
  layout,
  shared,
  home,
  services,
  'service-web': serviceWeb,
  'service-reseau': serviceReseau,
  'service-ia': serviceIa,
  training,
  pricing,
  work,
  project,
  about,
  blog,
  contact,
  faq,
  legal,
  privacy,
  terms,
  'not-found': notFound,
}

export type BlockKey = keyof typeof blockDefaults
export type BlockData<K extends BlockKey> = (typeof blockDefaults)[K]
export type SiteInfo = typeof site
export type LayoutContent = typeof layout

/** Présentation des blocs dans l'admin (ordre, nom, page publique correspondante). */
export const blockRegistry: { key: BlockKey; label: string; group: string; path?: string; description: string }[] = [
  { key: 'site', label: 'Coordonnées et réseaux sociaux', group: 'Général', description: 'Téléphone, WhatsApp, e-mail, adresse, horaires et liens des réseaux sociaux. Utilisés sur tout le site.' },
  { key: 'layout', label: 'Menu, pied de page et bandeau cookies', group: 'Général', description: 'Liens du menu principal, colonnes du pied de page et texte du bandeau cookies.' },
  { key: 'shared', label: 'Listes communes', group: 'Général', description: 'Secteurs d’activité, étapes de la méthode, technologies et moyens de paiement.' },
  { key: 'home', label: 'Accueil', group: 'Pages', path: '/', description: 'Titre principal, sections et bandeau de fin de la page d’accueil.' },
  { key: 'services', label: 'Services', group: 'Pages', path: '/services', description: 'En-tête et sections fixes de la page Services. Le détail de chaque service se modifie dans « Services ».' },
  { key: 'service-web', label: 'Service · Web et mobile', group: 'Pages', path: '/services/web-et-mobile', description: 'Livrables, types de projets et déroulé d’un projet web.' },
  { key: 'service-reseau', label: 'Service · Réseaux', group: 'Pages', path: '/services/reseau', description: 'Page détaillée du service Réseaux et infrastructures.' },
  { key: 'service-ia', label: 'Service · IA et automatisation', group: 'Pages', path: '/services/ia-automatisation', description: 'Page détaillée du service IA et automatisation.' },
  { key: 'training', label: 'Formations', group: 'Pages', path: '/formations', description: 'Textes de la page Formations et du formulaire d’inscription. Le catalogue se modifie dans « Formations ».' },
  { key: 'pricing', label: 'Tarifs', group: 'Pages', path: '/tarifs', description: 'Textes de la page Tarifs. Les formules se modifient dans « Formules de prix ».' },
  { key: 'work', label: 'Réalisations', group: 'Pages', path: '/realisations', description: 'En-tête, filtres et bandeau de la page Réalisations.' },
  { key: 'project', label: 'Fiche projet (textes communs)', group: 'Pages', path: '/realisations', description: 'Titres de sections communs à toutes les fiches projet.' },
  { key: 'about', label: 'À propos', group: 'Pages', path: '/a-propos', description: 'Histoire, mission, vision, valeurs et localisation.' },
  { key: 'blog', label: 'Blog', group: 'Pages', path: '/blog', description: 'En-tête du blog, page article et lettre d’information.' },
  { key: 'contact', label: 'Contact et devis', group: 'Pages', path: '/contact', description: 'Textes et options du formulaire de devis.' },
  { key: 'faq', label: 'Questions fréquentes', group: 'Pages', path: '/faq', description: 'En-tête et bandeau de la page FAQ. Les questions se modifient dans « FAQ ».' },
  { key: 'legal', label: 'Mentions légales', group: 'Pages légales', path: '/mentions-legales', description: 'Éditeur, hébergeur et propriété intellectuelle.' },
  { key: 'privacy', label: 'Confidentialité', group: 'Pages légales', path: '/confidentialite', description: 'Politique de confidentialité.' },
  { key: 'terms', label: 'Conditions générales', group: 'Pages légales', path: '/conditions-generales', description: 'Conditions générales de prestation.' },
  { key: 'not-found', label: 'Page introuvable (404)', group: 'Pages', description: 'Message affiché quand une adresse n’existe pas.' },
]

export const isBlockKey = (key: string): key is BlockKey => Object.prototype.hasOwnProperty.call(blockDefaults, key)
