import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ButtonLink } from '@/components/ui/button'
import { usePageMeta } from '@/hooks/usePageMeta'
import { routes } from '@/lib/routes'
import { site } from '@/lib/site'

type Kind = 'legal' | 'privacy' | 'terms'

const pageText: Record<Kind, { title: string; eyebrow: string; intro: string; sections: { title: string; body: ReactNode }[] }> = {
  legal: {
    title: 'Mentions légales', eyebrow: 'Informations du site',
    intro: 'Informations relatives à l’éditeur et à l’hébergement du site Fibetech.',
    sections: [
      { title: 'Éditeur du site', body: <><p><strong>Nom commercial :</strong> {site.name}</p><p><strong>Dénomination légale et forme juridique :</strong> à compléter</p><p><strong>Adresse :</strong> {site.fullAddress}</p><p><strong>E-mail :</strong> <a className="link" href={`mailto:${site.email}`}>{site.email}</a></p><p><strong>Téléphone :</strong> {site.phone}</p><p><strong>RCCM, ID. Nat. et NIF :</strong> à compléter</p><p><strong>Directeur ou responsable de publication :</strong> à compléter</p></> },
      { title: 'Hébergement', body: <p>Hébergeur du site : à compléter avec le nom légal, l’adresse et les coordonnées de l’hébergeur effectivement utilisé.</p> },
      { title: 'Propriété intellectuelle', body: <p>Sauf mention contraire, les textes, éléments graphiques, marques et contenus publiés sur ce site sont protégés par les règles applicables de propriété intellectuelle. Toute réutilisation substantielle nécessite l’autorisation préalable de leur titulaire. Les images provenant de banques d’images restent soumises aux licences de leurs auteurs.</p> },
      { title: 'Contact', body: <p>Pour toute question relative au site ou à son contenu, écrivez à <a className="link" href={`mailto:${site.email}`}>{site.email}</a>.</p> },
    ],
  },
  privacy: {
    title: 'Politique de confidentialité', eyebrow: 'Données personnelles',
    intro: 'Cette page décrit les données que les formulaires du site demandent et la configuration actuelle de leur envoi.',
    sections: [
      { title: 'Responsable du traitement', body: <p>Responsable : {site.name}, {site.fullAddress}. Contact : <a className="link" href={`mailto:${site.email}`}>{site.email}</a>. Identité juridique complète et coordonnées du responsable : à compléter.</p> },
      { title: 'Données demandées', body: <p>Les formulaires de contact et de demande de formation peuvent demander un nom, un numéro de téléphone, une adresse e-mail, une organisation, le sujet de la demande, un budget indicatif, un format de formation et un message. Les champs obligatoires sont signalés dans le formulaire.</p> },
      { title: 'Envoi et conservation', body: <p>Dans la version actuelle du site, les formulaires affichent une confirmation locale dans le navigateur et ne sont pas reliés à un service d’envoi ou à une base de données. Les formulaires de lettre d’information affichent également une confirmation locale, sans inscription persistante. Le choix de fermeture du bandeau cookies est mémorisé dans le stockage local du navigateur. N’envoyez pas d’information sensible par ces formulaires. Si un service de collecte ou d’envoi est raccordé ultérieurement, cette politique devra être mise à jour avant sa mise en service pour préciser les destinataires, la durée de conservation et les mesures de sécurité.</p> },
      { title: 'Cookies et mesure d’audience', body: <p>Le site n’intègre actuellement aucun outil de mesure d’audience ou de publicité configuré dans son code applicatif. L’hébergeur et les services tiers chargés pour afficher certaines cartes, polices ou images peuvent toutefois recevoir des informations techniques selon leurs propres politiques.</p> },
      { title: 'Vos demandes', body: <p>Pour toute question ou demande concernant vos données, contactez Fibetech à <a className="link" href={`mailto:${site.email}`}>{site.email}</a>. Les demandes sont traitées sous réserve des règles applicables en République démocratique du Congo.</p> },
      { title: 'Référence légale', body: <p>Le cadre applicable comprend notamment le Code du numérique de la République démocratique du Congo, issu de l’ordonnance-loi n° 23/010 du 13 mars 2023. <a className="link" href="https://are.gouv.cd/download/ordonnance-loi-23-010-du-13-mars-portant-code-du-numerique/" target="_blank" rel="noreferrer">Consulter le texte publié par l’ARE</a>.</p> },
    ],
  },
  terms: {
    title: 'Conditions générales', eyebrow: 'Prestations Fibetech',
    intro: 'Principes applicables aux demandes et prestations de Fibetech. Le devis accepté ou le contrat signé précise le périmètre convenu pour chaque projet.',
    sections: [
      { title: 'Prestations et devis', body: <p>Fibetech propose notamment la conception de sites et plateformes web, le développement mobile, les réseaux, l’intelligence artificielle, l’automatisation et les formations. Le devis précise les livrables, le prix, les délais estimatifs, les modalités de paiement et les éventuelles prestations récurrentes. Aucun travail spécifique ne commence avant acceptation du devis ou signature du contrat correspondant.</p> },
      { title: 'Prix et paiement', body: <p>Les tarifs affichés sur le site sont des prix de départ lorsque cela est indiqué. Les autres projets sont évalués sur devis. Les échéances, acomptes, taxes applicables et modes de paiement sont précisés dans le devis accepté. Toute modification du périmètre peut entraîner une révision du prix et du calendrier, soumise à l’accord des parties.</p> },
      { title: 'Délais et collaboration', body: <p>Les délais sont estimatifs sauf engagement écrit contraire. Le client fournit les contenus, accès, validations et informations nécessaires au projet. Un retard de transmission ou de validation peut modifier le calendrier de livraison.</p> },
      { title: 'Validation et corrections', body: <p>Le devis ou cahier des charges définit les étapes de validation et les éléments inclus. Les demandes qui dépassent le périmètre approuvé peuvent faire l’objet d’un devis complémentaire avant leur réalisation.</p> },
      { title: 'Propriété et accès', body: <p>Les livrables, licences de logiciels tiers, accès aux comptes et conditions de transfert sont précisés dans le devis ou le contrat. Les éléments tiers restent soumis à leurs propres licences. Les modalités de remise des codes sources, identifiants, fichiers et droits d’utilisation doivent être convenues par écrit.</p> },
      { title: 'Maintenance et tiers', body: <p>L’hébergement, le nom de domaine, la maintenance, les mises à jour et l’assistance après livraison ne sont inclus que s’ils figurent dans le devis ou le contrat. Les services de paiement, opérateurs, hébergeurs et autres fournisseurs tiers restent soumis à leurs propres conditions.</p> },
      { title: 'Annulation et règlement des différends', body: <p>Les conditions d’annulation, les conséquences financières d’un arrêt de projet et les modalités de règlement des différends doivent être précisées dans le devis ou le contrat signé. Les parties s’efforcent d’abord de rechercher une solution amiable. Le droit applicable et la juridiction compétente sont à confirmer dans les documents contractuels selon la situation juridique de Fibetech.</p> },
      { title: 'Contact', body: <p>Pour toute demande liée à une prestation, contactez Fibetech à <a className="link" href={`mailto:${site.email}`}>{site.email}</a> ou au {site.phone}.</p> },
    ],
  },
}

export default function LegalPage({ kind }: { kind: Kind }) {
  const page = pageText[kind]
  usePageMeta(page.title, page.intro)

  return <>
    <header className="border-b-[1.5px] border-ink bg-stone py-20">
      <div className="wrap flex flex-col gap-5">
        <Link to={routes.home} className="link self-start">← Retour à l’accueil</Link>
        <span className="eyebrow text-copper">{page.eyebrow}</span>
        <h1 className="max-w-[980px] text-[clamp(42px,6vw,82px)] font-extrabold leading-[0.96] tracking-[-0.04em]">{page.title}</h1>
        <p className="max-w-[720px] text-xl text-ink-soft">{page.intro}</p>
      </div>
    </header>
    <main className="py-[80px]">
      <div className="wrap flex flex-col gap-5">
        {kind === 'legal' && <aside className="rounded-2xl border border-copper/40 bg-copper-soft p-5 text-sm text-ink"><strong>À compléter avant publication :</strong> identité juridique, numéros d’immatriculation, responsable de publication et hébergeur.</aside>}
        {kind === 'privacy' && <aside className="rounded-2xl border border-copper/40 bg-copper-soft p-5 text-sm text-ink">Les formulaires ne transmettent actuellement pas les informations saisies. Cette page devra être actualisée si un service de collecte est activé.</aside>}
        {page.sections.map((section, index) => <section key={section.title} className="grid grid-cols-[minmax(0,1fr)] gap-4 border-b border-line py-7 min-[760px]:grid-cols-[240px_minmax(0,1fr)] min-[760px]:gap-10">
          <div><span className="font-mono text-xs text-copper">{String(index + 1).padStart(2, '0')}</span><h2 className="mt-2 text-2xl font-bold">{section.title}</h2></div>
          <div className="legal-copy text-[16px] leading-7 text-ink-soft">{section.body}</div>
        </section>)}
        <div className="flex flex-wrap items-center justify-between gap-5 pt-6"><span className="text-sm text-ink-muted">Dernière mise à jour : 4 novembre 2026</span><ButtonLink to={routes.contact}>Contacter Fibetech</ButtonLink></div>
      </div>
    </main>
  </>
}
