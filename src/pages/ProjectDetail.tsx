import { Link, useParams } from 'react-router-dom'
import { CtaBand } from '@/components/layout/CtaBand'
import { ButtonLink } from '@/components/ui/button'
import { Check, HorizonDot } from '@/components/ui/icons'
import { projects } from '@/data/projects'
import { usePageMeta } from '@/hooks/usePageMeta'
import { routes } from '@/lib/routes'

const details = {
  'gestion-ecole': {
    kicker: 'Éducation · Plateforme de gestion scolaire',
    summary: 'Une plateforme centralise le suivi administratif et pédagogique d’un établissement afin que l’administration et les enseignants retrouvent les informations utiles au même endroit.',
    challenge: 'Les inscriptions, les dossiers des élèves, les listes de classes et les résultats sont souvent suivis dans plusieurs cahiers et fichiers. Il devient difficile de retrouver une information à jour et de partager le bon suivi avec les bonnes personnes.',
    approach: 'Concevoir un espace de gestion structuré autour des rôles de l’établissement : administration, enseignants et responsables autorisés. Chaque étape du parcours scolaire s’appuie sur des informations cohérentes.',
    features: [
      ['Inscriptions et dossiers', 'Collecte des informations d’inscription, pièces du dossier et état de complétude.'],
      ['Élèves et classes', 'Organisation des élèves par année, classe et groupe, avec accès aux informations principales.'],
      ['Suivi pédagogique', 'Saisie et consultation des notes, matières, présences et appréciations selon les besoins définis.'],
      ['Frais et reçus', 'Suivi administratif des frais et paiements enregistrés par l’établissement.'],
      ['Communication', 'Informations et avis organisés pour faciliter les échanges entre l’école et les familles.'],
      ['Tableaux de bord', 'Vue synthétique sur les inscriptions, effectifs, classes et tâches à traiter.'],
    ],
    stages: ['Cadrage des niveaux, rôles et règles de gestion', 'Maquettes des principaux parcours de l’administration', 'Développement et import des données convenues', 'Prise en main avec les équipes et accompagnement'],
    gallery: ['photo-1427504494785-3a9ca7044f45', 'photo-1503676260728-1c00da094a0b', 'photo-1497633762265-9d179a990aa6'],
    captions: ['Environnement d’apprentissage', 'Accompagnement des élèves', 'Ressources et documents scolaires'],
  },
  'gestion-locataires': {
    kicker: 'Immobilier · Gestion locative multi-pays',
    summary: 'Une plateforme de gestion locative aide à suivre les immeubles, les logements, les locataires, les contrats et les paiements pour des opérations en RDC et au Rwanda.',
    challenge: 'Lorsque les informations sont dispersées entre différents fichiers, agences ou pays, le suivi des contrats, échéances et demandes devient plus lourd. Les équipes ont besoin d’une vue commune, tout en gardant une séparation claire par portefeuille et par rôle.',
    approach: 'Structurer l’outil par portefeuille immobilier et par étapes du cycle locatif. Prévoir des accès adaptés aux gestionnaires, aux propriétaires et aux utilisateurs concernés, selon le périmètre retenu.',
    features: [
      ['Biens et logements', 'Répertoire des immeubles, unités, caractéristiques et statuts de disponibilité.'],
      ['Dossiers des locataires', 'Informations et documents liés à chaque location, regroupés dans une fiche consultable.'],
      ['Contrats et échéances', 'Dates de contrat, renouvellements et rappels pour les événements importants.'],
      ['Loyers et paiements', 'Suivi des montants attendus, reçus et restant à régulariser.'],
      ['Demandes et interventions', 'Enregistrement des demandes des occupants et suivi de leur traitement.'],
      ['Vue par pays et portefeuille', 'Filtres et rapports pour distinguer les activités en RDC et au Rwanda.'],
    ],
    stages: ['Cartographie des biens, rôles et pratiques existantes', 'Définition des informations et règles de suivi locatif', 'Construction de l’interface et des vues par portefeuille', 'Import des données, formation et démarrage progressif'],
    gallery: ['photo-1560518883-ce09059eeffa', 'photo-1564013799919-ab600027ffc6', 'photo-1554469384-e58fac16e23a'],
    captions: ['Portefeuille immobilier', 'Fiches de biens et logements', 'Suivi de gestion locative'],
  },
  'ecommerce-rdc': {
    kicker: 'Commerce · Plateforme e-commerce en RDC',
    summary: 'Une boutique en ligne présente les produits, reçoit les commandes et permet à l’équipe commerciale de suivre leur préparation et leur livraison à travers la RDC.',
    challenge: 'Les ventes uniquement en boutique ou par messages rendent la découverte du catalogue et le suivi des commandes difficiles. Les clients ont besoin d’informations claires sur les produits et les étapes de leur commande.',
    approach: 'Créer une expérience légère d’abord pensée pour le téléphone et les connexions variables. Donner à l’équipe un espace simple pour tenir le catalogue à jour et traiter les commandes.',
    features: [
      ['Catalogue et catégories', 'Produits organisés avec photos, descriptions, variantes et prix.'],
      ['Recherche et découverte', 'Navigation par catégories et filtres pour trouver plus facilement un article.'],
      ['Panier et commande', 'Parcours de commande adapté au mobile, avec coordonnées et destination de livraison.'],
      ['Paiement et confirmation', 'Configuration des options de paiement retenues et confirmation claire de la commande.'],
      ['Gestion des commandes', 'Espace d’administration pour consulter les commandes et suivre leurs statuts.'],
      ['Livraison et assistance', 'Informations de livraison et accès rapide au contact client, notamment via WhatsApp.'],
    ],
    stages: ['Organisation du catalogue et des zones de livraison', 'Maquette du parcours client et de la fiche produit', 'Mise en place du catalogue et du suivi de commande', 'Formation de l’équipe et ouverture progressive de la boutique'],
    gallery: ['photo-1556742049-0cfed4f6a45d', 'photo-1556740738-b6a63e27c4df', 'photo-1563013544-824ae1b704d3'],
    captions: ['Parcours d’achat en ligne', 'Commande depuis un téléphone', 'Paiement et gestion des commandes'],
  },
} as const

type ProjectSlug = keyof typeof details

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const project = projects.find((item) => item.slug === slug)
  const detail = slug && slug in details ? details[slug as ProjectSlug] : undefined

  usePageMeta(project?.title ?? 'Projet introuvable', project?.text ?? 'Découvrez les projets Fibetech.')

  if (!project || !detail) {
    return <section className="wrap py-24"><h1 className="text-4xl font-extrabold">Projet introuvable</h1><Link className="link mt-6 inline-block" to={routes.work}>Retour aux réalisations</Link></section>
  }

  const img = (id: string, width = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`

  return <>
    <article>
      <header className="py-[72px]">
        <div className="wrap flex flex-col gap-7">
          <nav aria-label="Fil d’Ariane" className="flex flex-wrap gap-2 font-mono text-[13px] text-ink-muted"><Link to={routes.work} className="text-ink-muted">Réalisations</Link><span aria-hidden="true">/</span><span aria-current="page" className="text-ink">{project.title}</span></nav>
          <div className="flex flex-wrap gap-2"><span className="chip bg-copper-soft text-copper-deep">Étude de projet</span><span className="chip bg-stone text-[#2F3833]">{project.cat}</span><span className="chip bg-stone text-[#2F3833]">{project.sector}</span></div>
          <h1 className="max-w-[1040px] text-[clamp(42px,6vw,88px)] font-extrabold leading-[0.96] tracking-[-0.04em]">{project.title}</h1>
          <p className="max-w-[780px] text-xl text-ink-soft">{detail.summary}</p>
          <ButtonLink to={routes.contact} arrow>Parler d’un projet similaire</ButtonLink>
        </div>
      </header>

      <figure className="wrap m-0"><img src={img(project.image, 1800)} alt={`${project.title} — illustration du secteur ${project.sector}`} className="h-[min(62vw,620px)] min-h-[300px] w-full rounded-[26px] border-[1.5px] border-ink object-cover" /><figcaption className="py-3 text-sm text-ink-muted">Illustration du domaine du projet.</figcaption></figure>

      <section aria-labelledby="challenge-title" className="py-[90px]"><div className="wrap flex flex-wrap gap-10"><h2 id="challenge-title" className="eyebrow min-w-[190px] text-copper">Le besoin</h2><div className="max-w-[800px]"><p className="font-display text-[clamp(25px,3vw,38px)] font-semibold leading-tight">{detail.challenge}</p><p className="mt-5 text-lg text-ink-soft">Le projet décrit une solution fonctionnelle, à ajuster avec le client selon son organisation, ses utilisateurs et les outils déjà en place.</p></div></div></section>

      <section aria-labelledby="approach-title" className="border-y-[1.5px] border-ink bg-stone py-[100px]"><div className="wrap flex flex-wrap items-start gap-12"><div className="min-w-0 flex-[1_1_330px]"><span className="eyebrow text-copper">Conception</span><h2 id="approach-title" className="mt-4 text-[clamp(34px,4.2vw,56px)] font-extrabold">Une réponse construite autour des usages.</h2><p className="mt-5 text-lg text-ink-soft">{detail.approach}</p></div><ul className="grid min-w-0 flex-[1.4_1_550px] grid-cols-[repeat(auto-fit,minmax(min(100%,230px),1fr))] gap-4">{detail.features.map(([title, text])=><li key={title} className="card flex flex-col gap-3 p-6"><Check className="text-mal"/><h3 className="text-xl font-bold">{title}</h3><p className="text-sm text-ink-soft">{text}</p></li>)}</ul></div></section>

      <section aria-labelledby="steps-title" className="py-[100px]"><div className="wrap flex flex-col gap-10"><div className="max-w-[700px]"><span className="eyebrow text-copper">Déroulement</span><h2 id="steps-title" className="mt-4 text-[clamp(34px,4.2vw,56px)] font-extrabold">Les étapes du projet.</h2></div><ol className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-5">{detail.stages.map((stage,index)=><li key={stage} className="border-t-[1.5px] border-ink pt-5"><span className="font-mono text-sm text-copper">0{index+1}</span><p className="mt-3 text-lg font-semibold">{stage}</p></li>)}</ol></div></section>

      <section aria-labelledby="gallery-title" className="bg-ink py-[100px] text-white"><div className="wrap flex flex-col gap-9"><div><span className="eyebrow text-copper-light">Galerie</span><h2 id="gallery-title" className="mt-4 text-[clamp(34px,4.2vw,56px)] font-extrabold">Images du secteur et des usages.</h2></div><div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-5">{detail.gallery.map((image,index)=><figure key={image} className="m-0 overflow-hidden rounded-2xl border border-white/15"><img src={img(image, 900)} alt={`${project.title} — ${detail.captions[index]}`} loading="lazy" className="h-[260px] w-full object-cover transition-transform duration-500 hover:scale-[1.03]"/><figcaption className="px-4 py-3 text-sm text-mal-fog">{detail.captions[index]}</figcaption></figure>)}</div><p className="text-sm text-mal-mist">Images d’illustration. Elles ne représentent pas des captures réelles de la plateforme.</p></div></section>

      <section aria-labelledby="next-title" className="py-[90px]"><div className="wrap flex flex-wrap items-center justify-between gap-7"><div><span className="eyebrow text-copper">Votre projet</span><h2 id="next-title" className="mt-3 max-w-3xl text-[clamp(32px,4vw,52px)] font-extrabold">Vous avez un besoin similaire ?</h2></div><ButtonLink to={routes.contact} arrow>Demander un devis</ButtonLink></div></section>
    </article>
    <CtaBand eyebrow="Parlons de votre idée" title="Construisons un outil adapté à votre activité." text="Présentez-nous votre besoin et nous préparerons une proposition adaptée à vos priorités." />
    <nav aria-label="Retour aux réalisations" className="border-t-[1.5px] border-ink py-6"><div className="wrap"><Link className="link" to={routes.work}><HorizonDot className="mr-2"/>Toutes les réalisations</Link></div></nav>
  </>
}
