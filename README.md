# Fibetech — site vitrine (frontend)

Site de Fibetech, startup informatique de Lubumbashi. Il compte 13 pages : accueil, services, détail web et mobile, formations, tarifs, réalisations, étude de cas, à propos, blog, contact et devis, carrières, FAQ et page 404. Toutes suivent les maquettes validées, sauf la page Formations, ajoutée ensuite dans le même style.

**Stack :** React 18, TypeScript (strict), Vite 5, Tailwind CSS 3, React Router 6 et GSAP pour l'animation de foule du hero. Le projet ne dépend d'aucun service externe : les polices et les illustrations sont servies par le site lui-même.

## Démarrer

Il faut Node.js 18 ou plus récent.

```bash
npm install
npm run dev          # http://localhost:5173
```

| Script | Rôle |
| --- | --- |
| `npm run dev` | Serveur de développement avec rechargement à chaud |
| `npm run typecheck` | Vérification TypeScript sans compiler |
| `npm run build` | Build de production dans `dist/` (URL propres : `/tarifs`, `/contact`…) |
| `npm run build:demo` | Build « démo » avec des URL en `#/tarifs`, qui fonctionne sur n'importe quel hébergement statique sans configuration |
| `npm run preview` | Sert le dossier `dist/` pour le tester en local |

## Structure

```
src/
  pages/              une page par fichier (chargées à la demande, sauf l'accueil)
  components/
    layout/           Header, Footer, Layout, bandeaux d'appel à l'action
    ui/               boutons, logo, accordéon, défilant, icônes, CrowdCanvas (skiper39.tsx)
    illustrations/    maquettes d'écrans en CSS/SVG (boutique, stock, réseau…)
  data/               contenus éditables : services, tarifs, projets, articles, FAQ
  lib/site.ts         coordonnées de l'entreprise (téléphone, e-mail, adresse…)
  lib/routes.ts       toutes les URL du site
  index.css           styles de base, composants et animations
  fonts.css           polices auto-hébergées (latin et latin étendu uniquement)
public/               favicon, robots.txt, règles de redirection
```

L'arborescence suit la convention shadcn/ui (`components.json`, `src/components/ui`, alias `@/`), ce qui permet d'ajouter des composants shadcn plus tard avec `npx shadcn add …`.

## Contenus à remplacer avant la mise en ligne

Le site ne contient aucune information inventée. Tout ce qui reste à compléter est écrit **entre crochets**, sur fond cuivre pâle (composant `Ph`). Pour tous les retrouver :

```bash
grep -rn "\[" src/lib src/data src/pages
```

Les principaux contenus à compléter :

- **`src/lib/site.ts`** : numéro WhatsApp, e-mail, adresse, horaires et liens des réseaux sociaux. Le téléphone `+243 975 079 756` est déjà renseigné.
- **`src/data/pricing.ts`** : les prix (`[X] $`) et les détails des formules.
- **`src/data/projects.ts`** : les six projets sont des **exemples**, signalés par la mention « Projet exemple ». Remplacez-les par vos vraies réalisations, avec l'accord de vos clients.
- **`src/data/trainings.ts`** : le catalogue des formations, les formats, le calendrier des sessions et la FAQ de la page Formations. Les neuf formations sont **proposées en exemple**, comme l'indique la mention « Catalogue donné en exemple ». Remplacez-les par vos formations réelles, avec leurs durées et leurs tarifs. Les dates des sessions et le nombre de places sont aussi à remplir. Une fois le contenu réel en place, retirez les mentions « … donné en exemple » dans `src/pages/Training.tsx`.
- **Accueil** : le témoignage client, à ajouter seulement quand vous aurez un vrai avis signé.
- **À propos** : l'histoire de l'équipe, l'origine du nom, les noms et les photos de l'équipe.
- **Blog** (`src/data/posts.ts`) : les dates, les durées de lecture et le contenu des articles. Il n'existe pas encore de page article ; chaque carte renvoie pour l'instant au blog.
- **Carrières** : les postes affichés sont donnés en exemple.
- **`index.html`** : complétez les balises Open Graph avec votre domaine et une image de partage de 1200 × 630.

## Brancher les formulaires

Les formulaires valident les champs et affichent un message de confirmation, mais **n'envoient rien pour l'instant**. Chaque endroit à brancher est indiqué par un commentaire dans le code :

- **Devis** : fonction `onSubmit` dans `src/pages/Contact.tsx`. Envoyez les données vers votre API, ou vers un service comme Formspree, Web3Forms ou Resend. Les données sont `nom`, `organisation`, `telephone`, `email`, `message`, plus les services cochés, le budget et le canal de contact préféré.
- **Inscription aux formations** : fonction `onSubmit` du composant `Enrollment` dans `src/pages/Training.tsx`. Les données sont la formation choisie, le format, `nom`, `telephone`, `email`, `organisation`, `participants` et `message`. Dans le catalogue et le calendrier, les boutons « S'inscrire » et « Réserver ma place » présélectionnent la formation et le format dans ce formulaire.
- **Lettre d'information** : `src/components/layout/Footer.tsx` et `src/pages/Blog.tsx`, à relier à votre outil d'e-mailing (Brevo, Mailchimp…).

## Animation du hero (foule)

Le composant `CrowdCanvas` (`src/components/ui/skiper39.tsx`) est adapté de **Skiper39** de Skiper UI. Il dessine sur un `<canvas>` des personnages Open Peeps qui traversent l'écran. Les personnages proviennent de la planche `src/assets/open-peeps-sheet.png` (15 colonnes × 7 lignes).

```tsx
<CrowdCanvas src={peepsSheet} rows={15} cols={7} />
```

Par rapport à l'original, le composant a été adapté :

- la taille des personnages s'ajuste à la hauteur du bloc ;
- les mobiles affichent moins de personnages ;
- l'animation se met en pause quand le hero sort de l'écran ;
- une image fixe remplace l'animation si l'utilisateur a demandé à réduire les animations dans son système.

## Déploiement

- **Vercel** : importez le dépôt. `vercel.json` contient déjà la règle qui renvoie toutes les URL vers `index.html`.
- **Netlify** : le fichier `public/_redirects` fait la même chose. Utilisez la commande de build `npm run build` et le dossier `dist`.
- **Hébergement mutualisé (Apache, cPanel…)** : ajoutez une règle de réécriture vers `index.html` dans un `.htaccess`, ou utilisez `npm run build:demo`, qui ne nécessite aucune configuration.

Avant la mise en ligne, pensez à :

- choisir le nom de domaine définitif ;
- compléter les balises Open Graph ;
- ajouter un `sitemap.xml` ;
- rédiger les pages Mentions légales et Confidentialité, qui renvoient pour l'instant vers la FAQ.

## Accessibilité et performance

- Un lien d'évitement mène au contenu, et le focus est visible au clavier.
- Les accordéons et les filtres utilisent les attributs ARIA (`aria-expanded`, `aria-pressed`, `role="status"`).
- Les erreurs du formulaire sont annoncées et placent le focus sur le premier champ à corriger.
- Toutes les animations respectent la préférence `prefers-reduced-motion`.
- Les pages ont été testées sans débordement horizontal à 390 px (mobile) et à 1440 px (ordinateur), et l’en-tête de 760 à 1440 px.
- Les pages se chargent à la demande, pour un JavaScript initial d'environ 107 ko gzip.

## Crédits et licences

- **Animation du hero** : d'après [Skiper39 – Skiper UI](https://skiper-ui.com/v1/skiper39). La version gratuite de Skiper UI demande de créditer l'auteur ; ce crédit figure dans le pied de page et dans l'en-tête de `skiper39.tsx`. Gardez-les.
- **Illustrations** : [Open Peeps](https://www.openpeeps.com/) de Pablo Stanley, sous licence CC0 (domaine public).
- **Polices** : Bricolage Grotesque, Figtree et JetBrains Mono, sous licence SIL Open Font License, via Fontsource.
