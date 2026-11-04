export type PostCategory = 'Web' | 'IA' | 'Réseaux' | 'Paiement'

export type Post = {
  slug: string
  cat: PostCategory
  title: string
  text: string
  cover: string
  image: string
}

// Idées d'articles pour le blog (contenu à rédiger).
export const featuredPost = {
  cat: 'Paiement' as PostCategory,
  title: 'Accepter M-Pesa, Airtel Money et Orange Money sur votre site : le guide complet',
  text: 'Ce qu’il faut prévoir avec les opérateurs, les frais à connaître et comment présenter le paiement pour rassurer vos clients.',
  image: 'photo-1556742049-0cfed4f6a45d',
}

export const posts: Post[] = [
  { slug: 'ia-pme', cat: 'IA', title: 'Cinq façons d’utiliser l’IA dans une PME, sans gros budget', text: 'Réponses clients, tri de factures, comptes rendus : des usages qu’on peut lancer en une semaine.', cover: '#0A1F19', image: 'photo-1677442136019-21780ecad995' },
  { slug: 'coupures', cat: 'Réseaux', title: 'Coupures de courant : protéger vos données et vos serveurs', text: 'Onduleurs, sauvegardes, arrêt propre des machines : la liste de vérification à afficher au bureau.', cover: '#E0A93B', image: 'photo-1473341304170-971dccb5ac1e' },
  { slug: 'site-ou-facebook', cat: 'Web', title: 'Site web ou page Facebook : que choisir pour démarrer ?', text: 'Les avantages de chaque option, et pourquoi la bonne réponse est souvent « les deux, dans cet ordre ».', cover: '#B4532A', image: 'photo-1460925895917-afdab827c52f' },
  { slug: 'wifi', cat: 'Réseaux', title: 'Sécuriser le Wi-Fi de votre entreprise en un après-midi', text: 'Mot de passe, réseau invité, mises à jour de la borne : six réglages qui changent tout.', cover: '#0E5A45', image: 'photo-1558494949-ef010cbdcc31' },
  { slug: 'devis-whatsapp', cat: 'IA', title: 'Automatiser vos devis avec WhatsApp et un tableur', text: 'Un exemple pas à pas pour arrêter de recopier les mêmes informations trois fois.', cover: '#8DB7C9', image: 'photo-1556761175-b413da4baf72' },
  { slug: 'site-3g', cat: 'Web', title: 'Les sept erreurs qui ralentissent un site en 3G', text: 'Images trop lourdes, polices inutiles, vidéos en fond : comment les repérer et les corriger.', cover: '#FCEBDD', image: 'photo-1519389950473-47ba0277781c' },
  { slug: 'usd-cdf', cat: 'Paiement', title: 'Payer en dollars ou en francs congolais : bien afficher vos prix', text: 'Taux de change, arrondis et mentions utiles pour éviter les malentendus à la caisse en ligne.', cover: '#121614', image: 'photo-1556740749-887f6717d7e4' },
]

export const postCategories: ('Tous' | PostCategory)[] = ['Tous', 'Web', 'IA', 'Réseaux', 'Paiement']
