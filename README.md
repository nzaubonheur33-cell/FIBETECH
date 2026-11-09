# Fibetech

Site de Fibetech, startup informatique de Lubumbashi, avec son **espace d'administration**. Tout le contenu du site (textes des pages, menu, coordonnées, services, réalisations, articles, formations, tarifs, FAQ, témoignages, équipe) se modifie depuis `/admin`, sans toucher au code. Les formulaires du site (devis, inscription aux formations, lettre d'information) enregistrent les demandes dans la base de données ; elles se consultent dans l'admin.

**Stack :** Next.js 15 (App Router) et React 19, TypeScript strict, Tailwind CSS 3, **MySQL** via Prisma 6, GSAP pour l'animation de foule du hero. Le site public, l'API et l'admin tournent dans une seule application Node.js.

## Installation

Il faut **Node.js 20.12 ou plus récent** et **MySQL 8** (ou MariaDB 10.5+).

1. Créez une base de données vide et un utilisateur MySQL :

   ```sql
   CREATE DATABASE fibetech CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   CREATE USER 'fibetech'@'localhost' IDENTIFIED BY 'un-mot-de-passe-solide';
   GRANT ALL PRIVILEGES ON fibetech.* TO 'fibetech'@'localhost';
   ```

2. Copiez `.env.example` en `.env` et remplissez au minimum `DATABASE_URL`, `AUTH_SECRET`, `ADMIN_EMAIL` et `ADMIN_PASSWORD`.

3. Installez, créez les tables et remplissez-les avec les contenus actuels du site :

   ```bash
   npm install
   npm run db:deploy    # crée les tables
   npm run db:seed      # contenus actuels + premier compte admin
   npm run dev          # http://localhost:3000
   ```

4. Connectez-vous sur **http://localhost:3000/admin** avec `ADMIN_EMAIL` / `ADMIN_PASSWORD`, puis retirez `ADMIN_PASSWORD` du fichier `.env`.

`npm run db:seed` peut être relancé sans risque : il n'ajoute que ce qui manque et n'écrase jamais vos modifications.

| Script                 | Rôle                                                                     |
| ---------------------- | ------------------------------------------------------------------------ |
| `npm run dev`          | Serveur de développement                                                 |
| `npm run build`        | Build de production                                                      |
| `npm start`            | Lance le site en production (après `build`)                              |
| `npm run typecheck`    | Vérification TypeScript                                                  |
| `npm run db:deploy`    | Applique les migrations (création ou mise à jour des tables)             |
| `npm run db:migrate`   | Développement : crée une migration après une modification du schéma      |
| `npm run db:seed`      | Remplit la base avec les contenus par défaut et crée le premier compte   |
| `npm run db:studio`    | Explorateur visuel de la base (Prisma Studio)                            |
| `npm run admin:create` | Crée un compte admin, ou **change le mot de passe** d'un compte existant |

Mot de passe oublié : `npm run admin:create -- --email vous@fibetech.cd`, puis saisissez le nouveau mot de passe.

## L'administration

| Menu                         | Ce qu'on y fait                                                                                                                                            |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Tableau de bord**          | Nouvelles demandes, inscriptions et abonnés en un coup d'œil                                                                                               |
| **Textes des pages**         | Chaque page section par section (titres, paragraphes, boutons, listes), plus les coordonnées, le menu, le pied de page et le bandeau cookies |
| **Listes**                   | Services, réalisations, articles du blog, formations, formules de prix, FAQ, témoignages, équipe : ajouter, modifier, masquer, supprimer, réordonner      |
| **Demandes reçues**          | Devis et inscriptions avec statut (nouvelle, en cours, traitée, archivée), notes internes et export Excel/CSV ; liste de la lettre d'information          |
| **Comptes et mot de passe**  | Ajouter ou retirer des administrateurs, changer son mot de passe                                                                                           |

Les modifications sont visibles sur le site **dès l'enregistrement**. « Rétablir les textes d'origine » remet une page dans son état initial.

### Mise en forme des textes

| Écrire                          | Résultat                                                                  |
| ------------------------------- | ------------------------------------------------------------------------- |
| `*mots*` dans un titre          | mots en couleur (cuivre)                                                  |
| `**mots**`                      | gras                                                                      |
| `[texte](https://…)` ou `[texte](/contact)` | lien                                                          |
| `[à compléter]`                 | surligné en cuivre pâle : valeur qui reste à remplir                      |
| `{phone}`, `{email}`, `{fullAddress}`, `{name}`… | remplacé par les coordonnées saisies dans « Coordonnées »  |
| ligne vide (articles, pages légales) | nouveau paragraphe ; `- ` en début de ligne pour une liste           |

### Images

Un champ image accepte une image envoyée depuis l'ordinateur (PNG, JPEG, WebP, GIF ou AVIF, 5 Mo maximum), une adresse `https://…`, ou un identifiant Unsplash (`photo-…`). Les images envoyées sont enregistrées dans le dossier `uploads/` (modifiable avec `UPLOAD_DIR`), qui **doit être sauvegardé et conservé** entre deux déploiements.

## Structure

```
prisma/
  schema.prisma       tables MySQL
  migrations/         historique des changements de tables
  seed.ts             remplissage initial
src/
  app/
    (site)/           pages publiques (une route par page)
    admin/            pages de l'administration
    api/              API : formulaires publics (devis, inscriptions, newsletter), auth, admin
    uploads/          service des images envoyées
  content/
    blocks.ts         textes par défaut de chaque page (et modèle des formulaires de l'admin)
    collections-data.ts  contenus en liste par défaut
  views/              mise en page de chaque page publique
  components/
    layout/           en-tête, pied de page, bandeaux
    admin/            interface de l'administration
    ui/               boutons, logo, accordéon, icônes, CrowdCanvas (skiper39.tsx)
    illustrations/    maquettes d'écrans en CSS/SVG
  lib/
    content.ts        lecture des contenus en base
    admin/            description des listes et des champs, validation
    auth.ts, session.ts  connexion à l'admin
  middleware.ts       protection de /admin et de l'API
  app.css, fonts.css  styles et polices auto-hébergées
```

Ajouter un texte modifiable à une page : ajoutez la clé dans `src/content/blocks.ts` puis utilisez-la dans la vue correspondante (`src/views/…`). Le champ apparaît automatiquement dans l'admin, avec la valeur par défaut tant qu'il n'a pas été modifié.

## Si la base de données est indisponible

Le site public reste en ligne et affiche les contenus par défaut (`src/content/`) ; l'erreur est écrite dans les journaux du serveur. Les formulaires répondent « service momentanément indisponible » et l'admin n'est pas accessible tant que MySQL ne répond pas.

## Sécurité

- Mots de passe chiffrés (bcrypt), session signée dans un cookie `httpOnly` valable 7 jours.
- Connexion limitée à 8 essais par adresse et par quart d'heure.
- Requêtes d'écriture venant d'un autre site refusées ; champs invisibles anti-robots et limitation du nombre d'envois sur les formulaires publics.
- Toutes les données de l'admin sont validées côté serveur ; les textes saisis ne peuvent pas injecter de code dans les pages.
- Les images envoyées sont vérifiées d'après leur contenu réel (pas seulement leur nom) ; le SVG est refusé.
- L'admin est exclu des moteurs de recherche.

`npm audit` signale des failles dans des outils de build (PostCSS embarqué par Next.js, dépendance de la CLI Prisma). Elles ne concernent que la compilation de fichiers du projet et se corrigeront en passant à Next.js 16 et Prisma 7.

## Mise en ligne

Le site a besoin d'un **hébergement Node.js** avec accès à MySQL (VPS, hébergement Node de Hostinger, o2switch, Railway, etc.) :

```bash
npm ci
npm run db:deploy
npm run db:seed        # la première fois seulement
npm run build
npm start              # port 3000 par défaut ; PORT=8080 npm start pour en changer
```

Placez le site derrière HTTPS avec un certificat valide (par exemple via Caddy/Let's Encrypt ou le certificat de votre hébergeur), puis lancez-le avec un gestionnaire de processus (PM2, systemd…). Le proxy doit transmettre `X-Forwarded-Proto`; en production, l’application redirige alors les requêtes HTTP vers HTTPS. Renseignez `SITE_URL` avec l’adresse HTTPS publique pour les balises de partage. Le domaine doit pointer vers l’hébergement avant d’obtenir son certificat. En développement local, `http://localhost` reste en HTTP.

Vercel ou Netlify fonctionnent aussi pour le site et l'admin, mais leurs serveurs ne conservent pas les fichiers : utilisez alors des adresses d'images (`https://…`) plutôt que l'envoi d'images, et une base MySQL hébergée.

Avant la mise en ligne, pensez à :

- choisir le nom de domaine définitif ;
- compléter les pages Mentions légales et Confidentialité (admin → Textes des pages) ;
- ajouter vos réalisations, vos articles et les photos de l'équipe, et remplacer les témoignages d'exemple ;
- ajouter un `sitemap.xml`.

## Accessibilité et performance

- Lien d'évitement vers le contenu, focus visible au clavier, attributs ARIA sur les accordéons, filtres et formulaires.
- Les erreurs des formulaires sont annoncées et placent le focus sur le premier champ à corriger.
- Toutes les animations respectent `prefers-reduced-motion`.
- Les pages sont rendues sur le serveur : seul le JavaScript des parties interactives est envoyé au navigateur.

## Crédits et licences

- **Animation du hero** : d'après [Skiper39 – Skiper UI](https://skiper-ui.com/v1/skiper39). La version gratuite de Skiper UI demande de créditer l'auteur ; ce crédit figure dans l'en-tête de `skiper39.tsx`. Gardez-le.
- **Illustrations** : [Open Peeps](https://www.openpeeps.com/) de Pablo Stanley, sous licence CC0 (domaine public).
- **Polices** : Bricolage Grotesque, Figtree et JetBrains Mono, sous licence SIL Open Font License, via Fontsource.
