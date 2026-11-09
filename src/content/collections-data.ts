// Contenus en liste par défaut. Ils remplissent la base au premier `npm run db:seed`
// et servent de secours si la base de données est injoignable.
// Les images peuvent être une image envoyée depuis l'admin (« /uploads/… »), une URL complète
// ou un identifiant Unsplash (« photo-… »). Sans image, l'équipe affiche les initiales.

import type { FaqEntry, PostItem, PricingPlanItem, ProjectItem, ServiceItem, TeamMemberItem, TestimonialItem, TrainingItem } from './types'

export const servicesData: ServiceItem[] = [
  {
    key: 'web',
    short: 'Web et mobile',
    title: 'Développement web et mobile',
    text: 'Sites vitrines, boutiques en ligne, applications Android et iOS, plateformes sur mesure. Rapides, même en 3G.',
    tags: ['Sites web', 'E-commerce', 'Applications'],
    icon: 'web',
    href: '/services/web-et-mobile',
    features: ['Sites vitrines et institutionnels', 'Boutiques en ligne', 'Applications Android et iOS', 'Paiement M-Pesa, Airtel Money, Orange Money', 'Référencement local sur Google', 'Hébergement et nom de domaine .cd'],
    pageEyebrow: 'Web et mobile',
    pageTitle: 'Des sites et des applications qui travaillent pour vous.',
    pageText: 'Un site rapide qui donne confiance, une boutique qui encaisse par mobile money, une application que vos équipes utilisent vraiment.',
    idealFor: 'commerces, PME, écoles, cliniques et startups.',
    ctaLabel: 'Voir le détail',
    secondaryLabel: 'Demander un devis',
    tone: 'white',
    visual: 'web',
    published: true,
  },
  {
    key: 'ia',
    short: 'IA et automatisation',
    title: 'IA et automatisation',
    text: 'Assistants WhatsApp, réponses automatiques, tri de documents, tableaux de bord : l’IA prend en charge les tâches répétitives.',
    tags: ['Chatbots', 'Automatisation', 'Données'],
    icon: 'ia',
    href: '/services/ia-automatisation',
    features: ['Assistant WhatsApp et site web', 'Réponses automatiques aux clients', 'Lecture et tri de documents', 'Tableaux de bord automatiques', 'Connexion entre vos outils', 'Formation à l’IA pour vos équipes'],
    pageEyebrow: 'IA et automatisation',
    pageTitle: 'L’IA qui répond à vos clients pendant que vous dormez.',
    pageText: 'Un assistant sur WhatsApp ou sur votre site répond aux questions fréquentes, prend les commandes et vous transmet les cas importants. Le reste de l’automatisation suit la même logique : moins de saisie, plus de temps utile.',
    idealFor: '',
    ctaLabel: 'Voir le détail',
    secondaryLabel: '',
    tone: 'dark',
    visual: 'ia',
    published: true,
  },
  {
    key: 'reseaux',
    short: 'Réseaux',
    title: 'Réseaux et infrastructures',
    text: 'Câblage, Wi-Fi d’entreprise, serveurs, sauvegardes et onduleurs. Un réseau stable, même quand le courant ne l’est pas.',
    tags: ['Wi-Fi', 'Serveurs', 'Sécurité'],
    icon: 'reseaux',
    href: '/services/reseau',
    features: ['Câblage structuré', 'Wi-Fi d’entreprise et invités', 'Serveurs et stockage', 'Onduleurs et protection électrique', 'Sauvegardes automatiques', 'Pare-feu et vidéosurveillance'],
    pageEyebrow: 'Réseaux et infrastructures',
    pageTitle: 'Un réseau stable, même quand le courant ne l’est pas.',
    pageText: 'Câblage propre, Wi-Fi qui couvre tout le bâtiment, serveurs protégés par onduleur et sauvegardes automatiques. On documente tout, pour que vous ne dépendiez de personne.',
    idealFor: 'bureaux, entrepôts, hôtels, campus et sites miniers.',
    ctaLabel: 'Voir le détail',
    secondaryLabel: '',
    tone: 'white',
    visual: 'reseaux',
    published: true,
  },
  {
    key: 'formation',
    short: 'Formations',
    title: 'Formations numériques',
    text: 'Des formations pratiques pour rendre vos équipes autonomes avec les outils numériques, le web et l’intelligence artificielle.',
    tags: ['Pratique', 'Équipes', 'Sur mesure'],
    icon: 'book',
    href: '/formations',
    features: ['Bureautique et outils collaboratifs', 'Création et gestion de sites web', 'Intelligence artificielle au quotidien', 'Automatisation des tâches', 'Cybersécurité et bonnes pratiques', 'Sessions adaptées à vos équipes'],
    pageEyebrow: 'Formations numériques',
    pageTitle: 'Des compétences numériques utiles au quotidien.',
    pageText: 'Nous accompagnons vos équipes avec des formations pratiques en bureautique, outils numériques, création web et intelligence artificielle.',
    idealFor: 'entreprises, associations, écoles et équipes en développement.',
    ctaLabel: 'Découvrir les formations',
    secondaryLabel: '',
    tone: 'stone',
    visual: 'formation',
    published: true,
  },
]

export const projectsData: ProjectItem[] = [
  {
    slug: 'zuri-e-commerce',
    title: 'Vogue Congo Shop — ZURI',
    filter: 'web',
    category: 'E-commerce',
    sector: 'Mode · Marketplace en RDC',
    text: 'Une marketplace bilingue qui aide les boutiques congolaises à présenter leurs collections, recevoir des commandes et suivre leur activité en ligne.',
    image: '/images/projects/zuri-vogue-congo.jpg',
    kicker: 'La mode congolaise en ligne',
    summary: 'Vogue Congo Shop, aussi appelé ZURI, est une marketplace dédiée aux boutiques de la RDC. Le site réunit catalogue bilingue français/anglais, pages boutique, panier, commandes et suivi.',
    challenge: 'Créer un parcours d’achat accessible aux clients et des outils adaptés aux boutiques qui vendent leurs produits en ligne en RDC.',
    approach: 'Nous avons développé une application e-commerce bilingue avec un catalogue de produits, des pages pour les boutiques, un parcours de commande avec Mobile Money et des espaces de gestion pour vendeurs et administrateurs.',
    features: [
      { title: 'Marketplace bilingue', text: 'Un catalogue en français et en anglais pour découvrir les boutiques et leurs articles.' },
      { title: 'Commande en ligne', text: 'Un panier, un parcours de commande avec paiement Mobile Money et le suivi des commandes.' },
      { title: 'Espace vendeur', text: 'Des outils pour gérer les boutiques et leur catalogue, avec une administration de la plateforme.' },
    ],
    stages: [
      'Concevoir le catalogue et les pages boutique bilingues.',
      'Développer le panier, la commande et le suivi des achats.',
      'Intégrer les espaces de gestion pour vendeurs et administrateurs.',
    ],
    gallery: [{ image: '/images/projects/zuri-kente.jpg', caption: 'Un aperçu des visuels de mode utilisés par ZURI.' }],
    published: true,
  },
]

export const postsData: PostItem[] = [
  {
    slug: 'un-site-rapide-sur-mobile',
    title: 'Un site rapide sur mobile se construit à chaque étape',
    category: 'Web et performance',
    excerpt: 'Sur smartphone, chaque image et chaque étape de chargement compte. Voici des gestes concrets pour rendre un site plus agréable à consulter.',
    image: 'photo-1460925895917-afdab827c52f',
    body: `Un site peut être beau et pourtant frustrant si son contenu arrive trop tard ou si les boutons répondent mal. Pour une entreprise, cela peut suffire à faire abandonner une demande de devis ou une inscription.

**Commencez par mesurer l’expérience.** Google recommande de suivre trois indicateurs Core Web Vitals : le chargement du contenu principal (LCP), la rapidité de réaction après une interaction (INP) et la stabilité visuelle (CLS). Les seuils de référence sont respectivement 2,5 secondes, 200 millisecondes et 0,1 au 75e percentile. Consultez le [guide des Core Web Vitals](https://web.dev/articles/vitals) pour comprendre ces mesures.

**Réduisez le poids des images.** Les photos trop grandes consomment les données mobiles sans améliorer l’affichage sur un petit écran. Préparez des tailles adaptées, compressez les fichiers et chargez les images qui se trouvent plus bas dans la page seulement quand elles deviennent utiles. Le guide de [web.dev sur les images responsives](https://web.dev/articles/responsive-images) explique comment adapter les images aux appareils.

**Gardez l’essentiel visible.** Un visiteur doit pouvoir comprendre l’offre, trouver le numéro ou le formulaire et passer à l’action sans parcourir des animations interminables. Des titres clairs et des boutons faciles à toucher rendent aussi le parcours plus simple.

**Vérifiez sur un vrai téléphone.** Testez les pages avec une connexion mobile ordinaire, ouvrez les menus, remplissez les formulaires et vérifiez qu’aucun élément ne déborde. Un site rapide se juge sur l’expérience réelle, pas seulement sur son apparence sur un ordinateur.

La bonne première étape consiste à mesurer une page importante, alléger ses images, puis vérifier à nouveau son chargement et ses interactions.`,
    readTime: '4 min',
    publishedAt: '2026-11-09',
    featured: true,
    published: true,
  },
  {
    slug: 'securiser-les-comptes-de-son-entreprise',
    title: 'Sécuriser les comptes de son entreprise : quatre gestes utiles',
    category: 'Cybersécurité',
    excerpt: 'La sécurité numérique commence par quelques habitudes applicables aux comptes de messagerie, aux outils de travail et aux données clients.',
    image: 'photo-1550751827-4bd374c3f58b',
    body: `Une petite équipe n’a pas besoin d’une grande infrastructure pour réduire les risques les plus courants. Elle a surtout besoin de comptes bien protégés, de logiciels à jour et d’une copie récupérable de ses informations importantes.

**Activez l’authentification multifacteur.** Ajoutez une seconde vérification aux comptes de messagerie, d’administration et de stockage de fichiers. Quand un service propose une clé d’accès (passkey), elle peut aussi simplifier la connexion. Le [guide de cybersécurité pour les petites entreprises](https://www.cyber.gov.au/publication/small-business-cyber-security-handbook/implement-fundamental-cyber-security-controls) détaille ces protections.

**Utilisez des mots de passe uniques.** Réutiliser le même mot de passe sur plusieurs services permet à un incident sur un compte d’en toucher d’autres. Un gestionnaire de mots de passe aide l’équipe à créer et conserver des identifiants différents.

**Installez les mises à jour.** Téléphones, ordinateurs, applications et sites web doivent recevoir les correctifs de sécurité proposés par leurs éditeurs. Activez les mises à jour automatiques quand c’est possible et remplacez les logiciels qui ne sont plus maintenus.

**Sauvegardez et testez la restauration.** Une sauvegarde régulière est utile seulement si les fichiers peuvent réellement être récupérés. Décidez quelles données protéger, où conserver les copies, qui en est responsable et testez périodiquement une restauration. Le [manuel officiel pour les petites entreprises](https://www.cyber.gov.au/publication/small-business-cyber-security-handbook) recommande ces gestes pour protéger les comptes, les appareils et les données.

Commencez par les comptes qui donnent accès à la messagerie et à l’administration. Ensuite, consignez les responsables des mises à jour et des sauvegardes pour que ces habitudes continuent même quand l’équipe change.`,
    readTime: '5 min',
    publishedAt: '2026-11-09',
    featured: false,
    published: true,
  },
]

const both = ['Présentielle', 'En ligne']
const onRequest = { duration: 'À définir selon le programme', price: 'Sur devis', published: true }

export const trainingsData: TrainingItem[] = [
  { slug: 'developpement-web', domain: 'Développement web', title: 'Développement web', text: 'Apprenez à concevoir et réaliser des sites et applications web, de la structure des pages à leur mise en ligne.', audience: 'Débutants, étudiants, entrepreneurs et équipes numériques', modules: ['HTML et structure de pages', 'CSS et adaptation mobile', 'JavaScript et interactions', 'Publication et bases de maintenance'], formats: both, icon: 'web', tone: 'copper', ...onRequest },
  { slug: 'developpement-mobile', domain: 'Développement mobile', title: 'Développement mobile', text: 'Découvrez les étapes de conception d’une application mobile et construisez les bases d’un projet Android et iOS.', audience: 'Étudiants, développeurs débutants et porteurs de projets', modules: ['Conception d’interfaces mobiles', 'Bases du développement d’applications', 'Navigation et gestion des données', 'Préparation et publication d’une application'], formats: both, icon: 'phone', tone: 'mal', ...onRequest },
  { slug: 'bureautique', domain: 'Bureautique', title: 'Bureautique', text: 'Gagnez en autonomie avec les outils utilisés pour créer des documents, organiser des données et préparer des présentations.', audience: 'Assistants, étudiants, agents administratifs et équipes', modules: ['Documents professionnels avec Word', 'Tableaux et formules avec Excel', 'Présentations avec PowerPoint', 'Organisation et partage des fichiers'], formats: both, icon: 'book', tone: 'mustard', ...onRequest },
  { slug: 'ia-generative', domain: 'IA générative', title: 'IA générative au travail', text: 'Utilisez les assistants d’IA générative pour rédiger, résumer, préparer des idées et accélérer certaines tâches.', audience: 'Dirigeants, équipes administratives et commerciales', modules: ['Comprendre les possibilités et limites de l’IA', 'Formuler des demandes utiles', 'Rédiger, résumer et organiser ses idées', 'Vérifier les réponses et protéger les données'], formats: both, icon: 'ia', tone: 'soft', ...onRequest },
  { slug: 'reseaux', domain: 'Réseaux', title: 'Réseaux informatiques', text: 'Comprenez les bases des réseaux et apprenez à installer, configurer et diagnostiquer une infrastructure informatique.', audience: 'Étudiants, techniciens et responsables informatiques', modules: ['Adressage IP et équipements réseau', 'Câblage, Wi-Fi et points d’accès', 'Partage des ressources et configuration', 'Diagnostic des pannes courantes'], formats: both, icon: 'reseaux', tone: 'ink', ...onRequest },
]

export const pricingPlansData: PricingPlanItem[] = [
  { group: 'creation', name: 'Site vitrine', pitch: 'Un site professionnel pour présenter votre activité.', price: '500', unit: '', recommended: false, cta: 'Contacter', features: ['Site vitrine personnalisé', 'Design adapté à votre marque', 'Version mobile soignée', 'Bouton WhatsApp et formulaire', 'Référencement local', 'Accompagnement à la mise en ligne'], published: true },
  { group: 'creation', name: 'Site e-commerce', pitch: 'Une boutique en ligne pour présenter et vendre.', price: '1 500', unit: '', recommended: true, cta: 'Contacter', features: ['Boutique en ligne complète', 'Catalogue et gestion des produits', 'Commandes et paiement mobile', 'Design adapté à votre marque', 'Version mobile soignée', 'Accompagnement à la mise en ligne'], published: true },
  { group: 'creation', name: 'Autres sites web', pitch: 'Applications, plateformes et projets web spécifiques.', price: null, unit: '', recommended: false, cta: 'Contacter', features: ['Plateformes web sur mesure', 'Applications web et mobile', 'Espace client et comptes', 'Intégrations personnalisées', 'Conseil technique', 'Proposition adaptée à votre besoin'], published: true },
  { group: 'assistance', name: 'Réseau', pitch: 'Installation et accompagnement selon votre infrastructure.', price: null, unit: '', recommended: false, cta: 'Contacter', features: ['Audit de vos besoins', 'Wi-Fi et réseau d’entreprise', 'Câblage et équipements', 'Sécurité et sauvegardes', 'Proposition personnalisée'], published: true },
  { group: 'assistance', name: 'IA et automatisation', pitch: 'Des outils adaptés aux processus de votre activité.', price: null, unit: '', recommended: false, cta: 'Contacter', features: ['Automatisation des tâches', 'Assistants et chatbots', 'Connexion entre vos outils', 'Atelier de définition du besoin', 'Proposition personnalisée'], published: true },
]

const q = (group: string, category: string, question: string, answer: string): FaqEntry => ({ group, category, question, answer, published: true })

export const faqData: FaqEntry[] = [
  q('general', 'Général', 'Avec quels types de clients travaillez-vous ?', 'PME, commerces, écoles, cliniques, ONG, sous-traitants miniers et indépendants. La taille compte moins que l’envie d’avancer.'),
  q('general', 'Général', 'Où intervenez-vous ?', 'À Lubumbashi sur place, et à distance partout en RDC. Les déplacements hors de la ville se prévoient dans le devis.'),
  q('general', 'Général', 'Le premier rendez-vous est-il payant ?', 'Le premier échange sert à comprendre votre besoin et à savoir si on peut vous aider. Ses conditions sont : [à définir].'),
  q('general', 'Projets web', 'Combien de temps pour créer un site ?', 'La création d’un site prend généralement entre 1 et 4 semaines, selon le nombre de pages, les fonctionnalités et la disponibilité des contenus. Le calendrier précis est confirmé dans le devis.'),
  q('general', 'Projets web', 'Est-ce que je pourrai modifier mon site moi-même ?', 'Oui. Vous recevez un espace d’administration simple et une formation pour changer textes, images, produits et prix.'),
  q('general', 'Projets web', 'Mon site fonctionnera-t-il avec une connexion lente ?', 'C’est une priorité : images optimisées, pages légères et tests en 3G avant chaque mise en ligne.'),
  q('general', 'Assistance IT', 'Intervenez-vous en urgence ?', 'Oui, selon votre formule d’assistance. Les délais d’intervention garantis sont précisés dans le contrat.'),
  q('general', 'Assistance IT', 'Pouvez-vous reprendre un parc installé par quelqu’un d’autre ?', 'Oui. On commence par un inventaire et un état des lieux, puis on vous dit ce qui doit être corrigé en priorité.'),
  q('general', 'Paiement', 'Quels moyens de paiement acceptez-vous ?', 'M-Pesa, Airtel Money, Orange Money, virement bancaire et espèces en dollars ou en francs congolais.'),
  q('general', 'Paiement', 'Peut-on payer en plusieurs fois ?', 'Oui pour les projets de création : acompte, étape intermédiaire et solde à la mise en ligne.'),
  q('general', 'Sécurité', 'Mes données sont-elles en sécurité ?', 'Accès protégés, sauvegardes régulières et documentation de tout ce qu’on installe. Vous gardez la propriété de vos données et de vos accès.'),
  q('general', 'Sécurité', 'Que se passe-t-il pendant une coupure de courant ?', 'Avec onduleur et arrêt automatique, les serveurs s’éteignent proprement et redémarrent seuls. Les sauvegardes protègent le reste.'),

  q('web', '', 'Combien de temps faut-il pour créer un site ?', 'La création d’un site prend généralement entre 1 et 4 semaines, selon le nombre de pages, les fonctionnalités et la disponibilité des contenus. Le calendrier précis est confirmé dans le devis, avec une date de mise en ligne.'),
  q('web', '', 'Puis-je modifier mon site moi-même ?', 'Oui. Vous recevez un espace d’administration simple et une formation. Vous changez textes, photos et produits sans nous appeler.'),
  q('web', '', 'Le paiement mobile fonctionne-t-il vraiment ?', 'Oui, nous intégrons les solutions de paiement mobile utilisées en RDC. Les frais de transaction dépendent de l’opérateur et de votre contrat avec lui.'),
  q('web', '', 'Qui est propriétaire du site ?', 'Vous. Le nom de domaine, l’hébergement et le code sont à votre nom. Vous pouvez changer de prestataire quand vous le souhaitez.'),

  q('pricing', '', 'Pourquoi des prix « à partir de » ?', 'Chaque entreprise est différente : nombre de pages, contenus à rédiger, fonctions particulières. Le devis fixe un prix ferme après notre premier échange.'),
  q('pricing', '', 'Puis-je payer en plusieurs fois ?', 'Oui. En général : un acompte au démarrage, une étape intermédiaire et le solde à la mise en ligne. L’échéancier figure dans le devis.'),
  q('pricing', '', 'Le nom de domaine et l’hébergement sont-ils inclus ?', 'Selon la formule, la première année est incluse ou facturée à part : c’est précisé dans le devis. Ensuite, le renouvellement est facturé au prix coûtant ou intégré à un abonnement.'),
  q('pricing', '', 'Que se passe-t-il après la mise en ligne ?', 'Vous êtes formés et autonomes. Si vous le souhaitez, un abonnement d’assistance prend le relais pour les mises à jour et la sécurité.'),
  q('pricing', '', 'Travaillez-vous en dehors de Lubumbashi ?', 'Oui, à distance partout en RDC. Les déplacements sur site hors de Lubumbashi se prévoient dans le devis, selon le projet.'),

  q('training', '', 'Quels sont les formats proposés ?', 'Toutes les formations peuvent être organisées en présentiel ou en ligne. Le format est choisi lors de votre demande.'),
  q('training', '', 'Combien coûte une formation ?', 'Toutes les formations sont proposées sur devis. Le tarif dépend du programme, du format et du nombre de participants.'),
  q('training', '', 'Dans quelle langue se déroulent les formations ?', 'Les formations se déroulent en français. Les modalités linguistiques peuvent être précisées lors de la demande.'),
  q('training', '', 'Pouvez-vous adapter le programme à notre équipe ?', 'Oui. Nous définissons le contenu avec vous selon vos objectifs, vos outils et le nombre de participants, puis nous préparons un devis.'),

  q('reseau', '', 'Pouvez-vous améliorer un réseau déjà installé ?', 'Oui. Nous commençons par diagnostiquer l’existant afin de réutiliser ce qui convient et de cibler les améliorations nécessaires.'),
  q('reseau', '', 'Installez-vous le Wi-Fi dans plusieurs bâtiments ?', 'Oui. Nous étudions la couverture et les contraintes de chaque bâtiment puis proposons une architecture adaptée.'),
  q('reseau', '', 'Le devis comprend-il les équipements ?', 'Le devis précise séparément les équipements, l’installation et les prestations de configuration afin que le périmètre soit clair.'),

  q('ia', '', 'Faut-il déjà utiliser l’intelligence artificielle ?', 'Non. Nous commençons par votre besoin et vos outils actuels, puis déterminons si l’IA apporte une réelle valeur.'),
  q('ia', '', 'Une automatisation peut-elle fonctionner avec nos outils actuels ?', 'Souvent oui, si les outils offrent des intégrations adaptées. Nous vérifions cela pendant le diagnostic.'),
  q('ia', '', 'Les réponses automatiques sont-elles vérifiées ?', 'Le périmètre prévoit des règles de contrôle et une possibilité de transfert à un membre de votre équipe pour les demandes sensibles ou incertaines.'),
]

export const testimonialsData: TestimonialItem[] = [
  { quote: 'La gestion des inscriptions, des élèves et du suivi scolaire est désormais réunie sur une seule plateforme.', name: 'Luna Ngoie Nyota', role: 'Gestion scolaire · Lubumbashi', avatar: 'photo-1711500310968-94016f941fd3', rating: 5, published: true },
  { quote: 'Nous pouvons centraliser les informations de nos locataires et suivre les demandes plus facilement.', name: 'Benita Kapend Mufuk', role: 'Gestion locative · RDC et Rwanda', avatar: 'photo-1685539527395-4417cebc39aa', rating: 5, published: true },
  { quote: 'La boutique en ligne facilite la présentation de nos produits et la prise de commandes partout en RDC.', name: 'Elei Ntambwe Anyasi', role: 'E-commerce · RDC', avatar: 'photo-1717184477790-20f7a77f4dfa', rating: 5, published: true },
]

export const teamData: TeamMemberItem[] = [
  { name: 'Emmanuel Kayombo', role: 'CEO · Direction générale', image: '/images/team/emmanuel.jpg', published: true },
  { name: 'Bonheur Nzau', role: 'Directeur technique (CTO)', image: '/images/team/bonheur.jpg', published: true },
  { name: 'Kaleb', role: 'Directeur général (DG)', image: '/images/team/kaleb.jpg', published: true },
  { name: 'Jonathan Nathan', role: 'Directeur marketing', image: '/images/team/jonathan.jpg', published: true },
  { name: 'Makal Bijika Exaucée', role: 'Rédactrice en chef', image: '/images/team/exaucee.jpg', published: true },
  { name: 'Salima Binti Baruani Allegra', role: 'Responsable communication et réseaux sociaux', image: '/images/team/allegra.jpg', published: true },
]
