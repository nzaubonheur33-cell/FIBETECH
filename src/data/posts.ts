export type PostCategory = 'Web' | 'IA' | 'Réseaux' | 'Paiement'

export type Post = {
  slug: string
  cat: PostCategory
  title: string
  text: string
  cover: string
}

// Idées d'articles pour le blog (contenu à rédiger).
export const featuredPost = {
  cat: 'Paiement' as PostCategory,
  title: 'Accepter M-Pesa, Airtel Money et Orange Money sur votre site : le guide complet',
  text: 'Ce qu’il faut prévoir avec les opérateurs, les frais à connaître et comment présenter le paiement pour rassurer vos clients.',
}

export const posts: Post[] = [
  { slug: 'ia-pme', cat: 'IA', title: 'Cinq façons d’utiliser l’IA dans une PME, sans gros budget', text: 'Réponses clients, tri de factures, comptes rendus : des usages qu’on peut lancer en une semaine.', cover: 'radial-gradient(circle at 50% 120%, #B4532A 0 38%, transparent 39%), repeating-linear-gradient(90deg, #121614 0 2px, #0A1F19 2px 26px)' },
  { slug: 'coupures', cat: 'Réseaux', title: 'Coupures de courant : protéger vos données et vos serveurs', text: 'Onduleurs, sauvegardes, arrêt propre des machines : la liste de vérification à afficher au bureau.', cover: 'linear-gradient(135deg, transparent 48%, #121614 48% 52%, transparent 52%), #E0A93B' },
  { slug: 'site-ou-facebook', cat: 'Web', title: 'Site web ou page Facebook : que choisir pour démarrer ?', text: 'Les avantages de chaque option, et pourquoi la bonne réponse est souvent « les deux, dans cet ordre ».', cover: 'radial-gradient(circle, #FFFFFF 0 14%, transparent 15%) 0 0/34px 34px, #B4532A' },
  { slug: 'wifi', cat: 'Réseaux', title: 'Sécuriser le Wi-Fi de votre entreprise en un après-midi', text: 'Mot de passe, réseau invité, mises à jour de la borne : six réglages qui changent tout.', cover: 'repeating-radial-gradient(circle at 50% 100%, #0E5A45 0 14px, #DDF2E9 14px 28px)' },
  { slug: 'devis-whatsapp', cat: 'IA', title: 'Automatiser vos devis avec WhatsApp et un tableur', text: 'Un exemple pas à pas pour arrêter de recopier les mêmes informations trois fois.', cover: 'linear-gradient(#121614 0 0) 50% 50%/60% 8px no-repeat, linear-gradient(#121614 0 0) 50% 35%/40% 8px no-repeat, #8DB7C9' },
  { slug: 'site-3g', cat: 'Web', title: 'Les sept erreurs qui ralentissent un site en 3G', text: 'Images trop lourdes, polices inutiles, vidéos en fond : comment les repérer et les corriger.', cover: 'repeating-linear-gradient(45deg, #121614 0 3px, transparent 3px 18px), #FCEBDD' },
  { slug: 'usd-cdf', cat: 'Paiement', title: 'Payer en dollars ou en francs congolais : bien afficher vos prix', text: 'Taux de change, arrondis et mentions utiles pour éviter les malentendus à la caisse en ligne.', cover: 'radial-gradient(circle at 30% 50%, #E0A93B 0 22%, transparent 23%), radial-gradient(circle at 70% 50%, #3FBF8E 0 22%, transparent 23%), #121614' },
]

export const postCategories: ('Tous' | PostCategory)[] = ['Tous', 'Web', 'IA', 'Réseaux', 'Paiement']
