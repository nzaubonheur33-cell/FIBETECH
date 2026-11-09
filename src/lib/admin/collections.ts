// Contenus en liste modifiables dans l'admin. Chaque entrée correspond à une table MySQL
// (prisma/schema.prisma) : les noms de champs sont ceux des colonnes.
import { iconOptions, type FieldDef, type Option } from './fields'

export type ModelName = 'service' | 'project' | 'post' | 'training' | 'pricingPlan' | 'faqItem' | 'testimonial' | 'teamMember'

export type CollectionDef = {
  /** Segment d'URL dans l'admin : /admin/listes/{name} */
  name: string
  model: ModelName
  label: string
  singular: string
  description: string
  fields: FieldDef[]
  /** Champ affiché comme titre dans la liste. */
  titleField: string
  subtitleField?: string
  imageField?: string
  /** Onglets de filtre dans la liste (ex. FAQ par page). */
  groupField?: string
  /** Champ « slug » à générer depuis le titre. */
  slugFrom?: { slug: string; source: string }
  /** Adresse publique d'un élément, pour le lien « Voir sur le site ». */
  publicPath?: (item: Record<string, unknown>) => string | null
}

const published: FieldDef = { name: 'published', label: 'Publié sur le site', type: 'boolean', help: 'Décochez pour masquer cet élément sans le supprimer.' }

const imageHelp = 'Envoyez une image, collez une adresse https://…, ou un identifiant Unsplash (« photo-… »).'

export const faqGroups: Option[] = [
  { value: 'general', label: 'Page FAQ' },
  { value: 'web', label: 'Service Web et mobile' },
  { value: 'pricing', label: 'Page Tarifs' },
  { value: 'training', label: 'Page Formations' },
  { value: 'reseau', label: 'Service Réseaux' },
  { value: 'ia', label: 'Service IA' },
]

export const pricingGroups: Option[] = [
  { value: 'creation', label: 'Création de site et d’app' },
  { value: 'assistance', label: 'Réseaux, IA et automatisation' },
]

export const projectFilters: Option[] = [
  { value: 'web', label: 'Web' },
  { value: 'mobile', label: 'Mobile' },
  { value: 'ia', label: 'IA' },
  { value: 'reseaux', label: 'Réseaux' },
  { value: 'it', label: 'Assistance IT' },
]

export const collections: CollectionDef[] = [
  {
    name: 'services',
    model: 'service',
    label: 'Services',
    singular: 'service',
    description: 'Les expertises présentées sur l’accueil (cartes) et sur la page Services (sections détaillées).',
    titleField: 'title',
    subtitleField: 'short',
    publicPath: () => '/services',
    fields: [
      { name: 'title', label: 'Titre (carte de l’accueil)', type: 'text', required: true, max: 191 },
      { name: 'short', label: 'Nom court (menu de la page Services)', type: 'text', required: true, max: 80 },
      { name: 'key', label: 'Identifiant', type: 'slug', required: true, max: 64, help: 'Ancre de la section sur la page Services (ex. : web).' },
      { name: 'icon', label: 'Icône', type: 'icon', required: true, options: iconOptions },
      { name: 'text', label: 'Texte de la carte', type: 'textarea', required: true, rows: 3, wide: true },
      { name: 'tags', label: 'Étiquettes de la carte', type: 'strings', max: 60, help: 'Trois mots-clés courts.' },
      { name: 'href', label: 'Lien « En savoir plus »', type: 'text', required: true, max: 191, placeholder: '/services/web-et-mobile' },
      { name: 'pageEyebrow', label: 'Surtitre (page Services)', type: 'text', required: true, max: 120 },
      { name: 'pageTitle', label: 'Titre de la section (page Services)', type: 'text', required: true, max: 255, wide: true, help: 'Mettez des *mots* entre astérisques pour les colorer.' },
      { name: 'pageText', label: 'Texte de la section (page Services)', type: 'textarea', required: true, rows: 4, wide: true },
      { name: 'features', label: 'Ce que comprend le service', type: 'strings', max: 191, wide: true },
      { name: 'idealFor', label: 'Idéal pour', type: 'text', max: 255, help: 'Laisser vide pour ne pas afficher la ligne.' },
      { name: 'ctaLabel', label: 'Texte du bouton', type: 'text', max: 80, placeholder: 'Voir le détail' },
      { name: 'secondaryLabel', label: 'Lien secondaire vers le devis', type: 'text', max: 80, help: 'Ex. « Demander un devis ». Laisser vide pour le masquer.' },
      {
        name: 'tone',
        label: 'Fond de la section',
        type: 'select',
        options: [
          { value: 'white', label: 'Blanc' },
          { value: 'stone', label: 'Gris clair' },
          { value: 'dark', label: 'Vert foncé (illustration à gauche)' },
        ],
      },
      {
        name: 'visual',
        label: 'Illustration',
        type: 'select',
        options: [
          { value: 'web', label: 'Site et téléphone' },
          { value: 'formation', label: 'Avant / après' },
          { value: 'ia', label: 'Conversation avec un assistant' },
          { value: 'reseaux', label: 'Schéma réseau' },
          { value: 'aucun', label: 'Grande icône' },
        ],
      },
      published,
    ],
  },
  {
    name: 'realisations',
    model: 'project',
    label: 'Réalisations',
    singular: 'réalisation',
    description: 'Les projets affichés sur l’accueil, la page Réalisations et leur fiche détaillée.',
    titleField: 'title',
    subtitleField: 'category',
    imageField: 'image',
    slugFrom: { slug: 'slug', source: 'title' },
    publicPath: (item) => (item.slug ? `/realisations/${String(item.slug)}` : null),
    fields: [
      { name: 'title', label: 'Titre', type: 'text', required: true, max: 191, wide: true },
      { name: 'slug', label: 'Adresse de la fiche', type: 'slug', required: true, max: 120, help: 'Apparaît dans l’URL : /realisations/adresse-de-la-fiche' },
      { name: 'filter', label: 'Filtre (page Réalisations)', type: 'select', options: projectFilters },
      { name: 'category', label: 'Catégorie', type: 'text', required: true, max: 80, placeholder: 'Plateforme web' },
      { name: 'sector', label: 'Secteur / client', type: 'text', max: 120, placeholder: 'Enseignement' },
      { name: 'image', label: 'Image principale', type: 'image', help: imageHelp, wide: true },
      { name: 'text', label: 'Résumé (carte)', type: 'textarea', required: true, rows: 3, wide: true },
      { name: 'kicker', label: 'Accroche', type: 'text', max: 191, wide: true },
      { name: 'summary', label: 'Introduction de la fiche', type: 'textarea', rows: 3, wide: true },
      { name: 'challenge', label: 'Le besoin', type: 'textarea', rows: 4, wide: true },
      { name: 'approach', label: 'La conception', type: 'textarea', rows: 4, wide: true },
      {
        name: 'features',
        label: 'Fonctionnalités',
        type: 'objects',
        wide: true,
        fields: [
          { name: 'title', label: 'Titre', type: 'text', max: 191 },
          { name: 'text', label: 'Description', type: 'textarea', rows: 2, max: 2000 },
        ],
      },
      { name: 'stages', label: 'Étapes du projet', type: 'strings', max: 255, wide: true },
      {
        name: 'gallery',
        label: 'Galerie',
        type: 'objects',
        wide: true,
        fields: [
          { name: 'image', label: 'Image', type: 'image' },
          { name: 'caption', label: 'Légende', type: 'text', max: 191 },
        ],
      },
      published,
    ],
  },
  {
    name: 'articles',
    model: 'post',
    label: 'Articles du blog',
    singular: 'article',
    description: 'Les articles du blog. Un article « à la une » est mis en avant en haut de la page.',
    titleField: 'title',
    subtitleField: 'category',
    imageField: 'image',
    slugFrom: { slug: 'slug', source: 'title' },
    publicPath: (item) => (item.slug ? `/blog/${String(item.slug)}` : null),
    fields: [
      { name: 'title', label: 'Titre', type: 'text', required: true, max: 255, wide: true },
      { name: 'slug', label: 'Adresse de l’article', type: 'slug', required: true, max: 120, help: 'Apparaît dans l’URL : /blog/adresse-de-l-article' },
      { name: 'category', label: 'Catégorie', type: 'text', required: true, max: 80, placeholder: 'Web, IA, Réseaux…', help: 'Sert de filtre sur la page Blog.' },
      { name: 'image', label: 'Image', type: 'image', help: imageHelp, wide: true },
      { name: 'excerpt', label: 'Résumé', type: 'textarea', required: true, rows: 3, wide: true },
      {
        name: 'body',
        label: 'Contenu de l’article',
        type: 'textarea',
        rows: 18,
        max: 500_000,
        wide: true,
        help: 'Une ligne vide sépare les paragraphes. **gras**, [texte du lien](https://…), « - » en début de ligne pour une liste.',
      },
      { name: 'publishedAt', label: 'Date de publication', type: 'date' },
      { name: 'readTime', label: 'Temps de lecture', type: 'text', max: 40, placeholder: '5 min' },
      { name: 'featured', label: 'À la une', type: 'boolean', help: 'Un seul article à la une est affiché (le premier de la liste).' },
      published,
    ],
  },
  {
    name: 'formations',
    model: 'training',
    label: 'Formations',
    singular: 'formation',
    description: 'Le catalogue de la page Formations et la liste du formulaire d’inscription.',
    titleField: 'title',
    subtitleField: 'domain',
    slugFrom: { slug: 'slug', source: 'title' },
    publicPath: () => '/formations',
    fields: [
      { name: 'title', label: 'Titre', type: 'text', required: true, max: 191, wide: true },
      { name: 'slug', label: 'Identifiant', type: 'slug', required: true, max: 120 },
      { name: 'domain', label: 'Domaine', type: 'text', required: true, max: 80 },
      { name: 'icon', label: 'Icône', type: 'icon', required: true, options: iconOptions },
      {
        name: 'tone',
        label: 'Couleur de l’icône',
        type: 'select',
        options: [
          { value: 'copper', label: 'Cuivre' },
          { value: 'mal', label: 'Malachite' },
          { value: 'ink', label: 'Encre' },
          { value: 'mustard', label: 'Moutarde' },
          { value: 'soft', label: 'Cuivre pâle' },
        ],
      },
      { name: 'text', label: 'Description', type: 'textarea', required: true, rows: 3, wide: true },
      { name: 'audience', label: 'Pour qui', type: 'text', max: 255, wide: true },
      { name: 'modules', label: 'Au programme', type: 'strings', max: 191, wide: true },
      { name: 'formats', label: 'Formats', type: 'strings', max: 40, help: 'Ex. : Présentielle, En ligne.' },
      { name: 'duration', label: 'Durée', type: 'text', max: 120 },
      { name: 'price', label: 'Tarif', type: 'text', max: 120, placeholder: 'Sur devis' },
      published,
    ],
  },
  {
    name: 'tarifs',
    model: 'pricingPlan',
    label: 'Formules de prix',
    singular: 'formule',
    description: 'Les formules de la page Tarifs, réparties en deux onglets.',
    titleField: 'name',
    subtitleField: 'price',
    groupField: 'group',
    publicPath: () => '/tarifs',
    fields: [
      { name: 'name', label: 'Nom', type: 'text', required: true, max: 120 },
      { name: 'group', label: 'Onglet', type: 'select', options: pricingGroups },
      { name: 'pitch', label: 'Accroche', type: 'text', required: true, max: 255, wide: true },
      { name: 'price', label: 'Prix de départ', type: 'text', nullable: true, max: 40, placeholder: '500', help: 'Sans le symbole $. Laisser vide pour afficher « Sur devis ».' },
      { name: 'unit', label: 'Unité', type: 'text', max: 40, placeholder: '/ mois', help: 'Facultatif.' },
      { name: 'features', label: 'Ce qui est inclus', type: 'strings', max: 191, wide: true },
      { name: 'cta', label: 'Texte du bouton', type: 'text', required: true, max: 80 },
      { name: 'recommended', label: 'Formule recommandée', type: 'boolean' },
      published,
    ],
  },
  {
    name: 'faq',
    model: 'faqItem',
    label: 'Questions fréquentes',
    singular: 'question',
    description: 'Les questions de la page FAQ et des encadrés « questions » des autres pages.',
    titleField: 'question',
    subtitleField: 'category',
    groupField: 'group',
    publicPath: () => '/faq',
    fields: [
      { name: 'question', label: 'Question', type: 'text', required: true, max: 512, wide: true },
      { name: 'answer', label: 'Réponse', type: 'textarea', required: true, rows: 5, wide: true },
      { name: 'group', label: 'Page', type: 'select', options: faqGroups },
      { name: 'category', label: 'Thème (page FAQ)', type: 'text', max: 80, placeholder: 'Général', help: 'Uniquement pour la page FAQ : sert de filtre.' },
      published,
    ],
  },
  {
    name: 'temoignages',
    model: 'testimonial',
    label: 'Témoignages',
    singular: 'témoignage',
    description: 'Les avis clients qui défilent sur la page d’accueil.',
    titleField: 'name',
    subtitleField: 'role',
    imageField: 'avatar',
    publicPath: () => '/',
    fields: [
      { name: 'quote', label: 'Témoignage', type: 'textarea', required: true, rows: 4, wide: true },
      { name: 'name', label: 'Nom', type: 'text', required: true, max: 120 },
      { name: 'role', label: 'Fonction et contexte', type: 'text', max: 191 },
      { name: 'avatar', label: 'Photo', type: 'image', help: imageHelp, wide: true },
      { name: 'rating', label: 'Note (0 à 5 étoiles)', type: 'number', min: 0, maxValue: 5 },
      published,
    ],
  },
  {
    name: 'equipe',
    model: 'teamMember',
    label: 'Équipe',
    singular: 'membre',
    description: 'Les membres de l’équipe affichés sur la page À propos.',
    titleField: 'name',
    subtitleField: 'role',
    imageField: 'image',
    publicPath: () => '/a-propos',
    fields: [
      { name: 'name', label: 'Nom', type: 'text', required: true, max: 120 },
      { name: 'role', label: 'Rôle', type: 'text', required: true, max: 191 },
      { name: 'image', label: 'Photo', type: 'image', help: imageHelp, wide: true },
      published,
    ],
  },
]

export function getCollection(name: string): CollectionDef | undefined {
  return collections.find((c) => c.name === name)
}
