import { Link } from 'react-router-dom'
import { InkCta } from '@/components/layout/CtaBand'
import { NetworkGraph, ClinicChat } from '@/components/illustrations/mocks'
import { ButtonLink } from '@/components/ui/button'
import { Check, PathIcon, type IconName } from '@/components/ui/icons'
import { usePageMeta } from '@/hooks/usePageMeta'
import { routes } from '@/lib/routes'

type Kind = 'reseau' | 'ia'
const content: Record<Kind, { title: string; heading: string; intro: string; eyebrow: string; included: string; items: string[]; types: {title:string;text:string; details:string[]}[]; stages: {title:string;text:string}[]; outcomes: string[]; faqs:{question:string;answer:string}[]; icon: IconName }> = {
  reseau: {
    title: 'Réseaux et infrastructures', heading: 'Un réseau fiable pour votre activité.',
    intro: 'Nous concevons et installons des réseaux adaptés à vos locaux, vos équipes et vos usages, avec un accompagnement local à Lubumbashi.',
    eyebrow: 'Réseaux', included: 'Une infrastructure conçue pour durer.', icon: 'reseaux',
    items: ['Audit et conception de réseau', 'Câblage structuré et installation', 'Wi-Fi professionnel et accès invités', 'Serveurs et solutions de stockage', 'Sauvegardes et protection électrique', 'Sécurisation de votre infrastructure'],
    types: [
      {title:'Wi-Fi professionnel',text:'Une couverture pensée selon vos bâtiments, vos usages et le nombre de connexions.',details:['Étude de couverture et emplacement des bornes','Réseau séparé pour visiteurs et équipes','Configuration et documentation des accès']},
      {title:'Câblage et équipements',text:'Une infrastructure claire, organisée et adaptée aux évolutions de votre activité.',details:['Câblage structuré et baie réseau','Routeurs, commutateurs et points d’accès','Repérage des prises et schéma de l’installation']},
      {title:'Serveurs et protection',text:'Des données et services accessibles aux bonnes personnes et protégés des incidents.',details:['Serveur local ou environnement cloud','Sauvegardes planifiées et vérification de restauration','Onduleurs, pare-feu et droits d’accès']},
    ],
    stages:[{title:'Visite et diagnostic',text:'Nous examinons vos locaux, l’installation existante, les usages et les problèmes rencontrés.'},{title:'Plan et devis détaillé',text:'Vous recevez une proposition qui précise les équipements, le câblage, le calendrier et les limites du projet.'},{title:'Installation et configuration',text:'Nous installons les équipements, organisons les accès et vérifions la couverture avec vos équipes.'},{title:'Documentation et suivi',text:'Vous récupérez le schéma réseau, les consignes utiles et les recommandations de maintenance.'}],
    outcomes:['Une couverture Wi-Fi adaptée à vos espaces','Des accès séparés et contrôlables','Une infrastructure documentée','Un plan de sauvegarde et de continuité'],
    faqs:[{question:'Pouvez-vous améliorer un réseau déjà installé ?',answer:'Oui. Nous commençons par diagnostiquer l’existant afin de réutiliser ce qui convient et de cibler les améliorations nécessaires.'},{question:'Installez-vous le Wi-Fi dans plusieurs bâtiments ?',answer:'Oui. Nous étudions la couverture et les contraintes de chaque bâtiment puis proposons une architecture adaptée.'},{question:'Le devis comprend-il les équipements ?',answer:'Le devis précise séparément les équipements, l’installation et les prestations de configuration afin que le périmètre soit clair.'}],
  },
  ia: {
    title: 'IA et automatisation', heading: 'Moins de tâches répétitives, plus de temps pour vos clients.',
    intro: 'Nous intégrons l’intelligence artificielle et l’automatisation à vos processus pour simplifier les demandes, les documents et le travail quotidien.',
    eyebrow: 'IA et automatisation', included: 'Des outils utiles, intégrés à vos méthodes.', icon: 'ia',
    items: ['Assistants sur WhatsApp et votre site', 'Réponses automatiques aux clients', 'Lecture et tri de documents', 'Automatisation des tâches répétitives', 'Connexion entre vos outils existants', 'Formation de vos équipes aux nouveaux outils'],
    types: [
      {title:'Assistants clients',text:'Un assistant sur WhatsApp ou votre site aide à traiter les demandes fréquentes.',details:['Réponses fondées sur les informations de votre activité','Collecte des demandes et orientation vers la bonne équipe','Transfert à une personne pour les cas particuliers']},
      {title:'Automatisation de processus',text:'Les tâches répétées passent d’un outil à l’autre sans ressaisie manuelle.',details:['Transmission de formulaires et notifications','Suivi des demandes et rappels automatiques','Connexion aux outils déjà utilisés par vos équipes']},
      {title:'Documents et information',text:'Facilitez le classement, l’extraction et la recherche dans vos documents.',details:['Extraction de champs et classement assisté','Synthèse et préparation de brouillons','Validation humaine avant toute action sensible']},
    ],
    stages:[{title:'Repérer les tâches utiles à automatiser',text:'Nous cartographions le processus, les outils utilisés, le volume et les exceptions.'},{title:'Définir les règles et les limites',text:'Nous décidons ce qui peut être automatisé, les données accessibles et les cas qui nécessitent une validation humaine.'},{title:'Construire un prototype',text:'Un premier scénario est testé avec des exemples réels et les personnes qui l’utiliseront.'},{title:'Déployer et mesurer',text:'Après validation, nous documentons la solution, formons les équipes et suivons son fonctionnement.'}],
    outcomes:['Des étapes répétitives réduites','Des demandes mieux orientées','Des règles de validation explicites','Des outils documentés et transférables'],
    faqs:[{question:'Faut-il déjà utiliser l’intelligence artificielle ?',answer:'Non. Nous commençons par votre besoin et vos outils actuels, puis déterminons si l’IA apporte une réelle valeur.'},{question:'Une automatisation peut-elle fonctionner avec nos outils actuels ?',answer:'Souvent oui, si les outils offrent des intégrations adaptées. Nous vérifions cela pendant le diagnostic.'},{question:'Les réponses automatiques sont-elles vérifiées ?',answer:'Le périmètre prévoit des règles de contrôle et une possibilité de transfert à un membre de votre équipe pour les demandes sensibles ou incertaines.'}],
  },
}

export default function ServiceDetail({ kind }: { kind: Kind }) {
  const item = content[kind]
  usePageMeta(item.title, item.intro)
  return <>
    <section aria-labelledby="page-title" className="border-b-[1.5px] border-ink py-20">
      <div className="wrap flex flex-wrap items-center gap-14">
        <div className="flex min-w-0 flex-[1_1_520px] flex-col gap-6">
          <nav aria-label="Fil d’Ariane" className="flex gap-2 font-mono text-[13px] text-ink-muted"><Link to={routes.services} className="text-ink-muted">Services</Link><span>/</span><span aria-current="page" className="text-ink">{item.title}</span></nav>
          <span className="eyebrow text-copper">{item.eyebrow}</span>
          <h1 id="page-title" className="text-[clamp(42px,5.6vw,80px)] font-extrabold leading-[0.96] tracking-[-0.04em]">{item.heading}</h1>
          <p className="max-w-[560px] text-xl text-ink-soft">{item.intro}</p>
          <div className="flex flex-wrap gap-3"><ButtonLink to={routes.contact} arrow>Demander un devis</ButtonLink><ButtonLink to={routes.pricing} variant="ghost">Voir les tarifs</ButtonLink></div>
        </div>
        <div aria-hidden="true" className="relative grid min-h-[360px] min-w-0 flex-[1_1_420px] place-items-center overflow-hidden rounded-[28px] border-[1.5px] border-ink bg-mal-deep p-10">
          {kind === 'reseau' ? <NetworkGraph className="w-full max-w-[400px]" /> : <div className="flex w-full flex-col items-center gap-7"><PathIcon name="ia" size={78} className="text-mal-glow" /><ClinicChat className="w-[88%] text-sm" /></div>}
          <span className="absolute bottom-5 right-5 chip border border-mal-glow bg-mal-deep text-mal-glow">{item.eyebrow}</span>
        </div>
      </div>
    </section>
    <section aria-labelledby="included-title" className="py-[120px]"><div className="wrap flex flex-col gap-12"><div className="max-w-[760px]"><span className="eyebrow text-copper">Notre accompagnement</span><h2 id="included-title" className="mt-4 text-[clamp(36px,4.6vw,62px)] font-extrabold">{item.included}</h2></div><ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,270px),1fr))] gap-5">{item.items.map((text) => <li key={text} className="card lift flex items-start gap-3 p-6"><Check className="mt-1 flex-none text-mal" /><span className="font-semibold">{text}</span></li>)}</ul></div></section>
    <section aria-labelledby="types-title" className="border-y-[1.5px] border-ink bg-stone py-[120px]"><div className="wrap flex flex-col gap-12"><div><span className="eyebrow text-copper">Nos solutions</span><h2 id="types-title" className="mt-4 text-[clamp(36px,4.6vw,62px)] font-extrabold">Des interventions adaptées à votre organisation.</h2></div><div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-5">{item.types.map((type) => <article key={type.title} className="card lift flex flex-col gap-4 p-7"><h3 className="text-2xl font-bold">{type.title}</h3><p className="text-ink-soft">{type.text}</p><ul className="mt-auto flex flex-col gap-2 border-t border-line pt-4">{type.details.map(detail=><li key={detail} className="flex gap-2 text-sm text-ink-soft"><Check className="mt-0.5 h-4 w-4 flex-none text-mal"/>{detail}</li>)}</ul></article>)}</div></div></section>
    <section aria-labelledby="outcomes-title" className="bg-mal-deep py-[100px] text-white"><div className="wrap flex flex-wrap items-start gap-12"><div className="min-w-0 flex-[1_1_350px]"><span className="eyebrow text-copper-light">Résultats visés</span><h2 id="outcomes-title" className="mt-4 text-[clamp(36px,4.4vw,58px)] font-extrabold">Une solution que votre équipe peut vraiment utiliser.</h2></div><ul className="flex min-w-0 flex-[1_1_420px] flex-col gap-4">{item.outcomes.map(outcome=><li key={outcome} className="flex items-center gap-3 border-b border-white/15 pb-4 text-lg"><Check className="flex-none text-mal-glow"/>{outcome}</li>)}</ul></div></section>
    <section aria-labelledby="steps-title" className="py-[110px]"><div className="wrap flex flex-col gap-12"><div className="max-w-[720px]"><span className="eyebrow text-copper">Méthode</span><h2 id="steps-title" className="mt-4 text-[clamp(34px,4.2vw,56px)] font-extrabold">Un déroulement clair, de l’étude au suivi.</h2></div><ol className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,230px),1fr))] gap-5">{item.stages.map((stage,index)=><li key={stage.title} className="card flex flex-col gap-3 p-6"><span className="font-mono text-sm text-copper">0{index+1}</span><h3 className="text-xl font-bold">{stage.title}</h3><p className="text-[15px] text-ink-soft">{stage.text}</p></li>)}</ol><div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl border-[1.5px] border-ink bg-stone p-7"><p className="max-w-2xl text-ink-soft">Le prix dépend du périmètre, des équipements ou intégrations nécessaires et du niveau d’accompagnement. Chaque proposition est établie après échange et diagnostic.</p><ButtonLink to={routes.contact} arrow>Obtenir un devis sur mesure</ButtonLink></div></div></section>
    <section aria-labelledby="faq-title" className="border-t-[1.5px] border-ink bg-stone py-[100px]"><div className="wrap flex flex-wrap gap-12"><div className="min-w-0 flex-[1_1_300px]"><span className="eyebrow text-copper">Questions fréquentes</span><h2 id="faq-title" className="mt-4 text-[clamp(34px,4.2vw,54px)] font-extrabold">Avant de démarrer.</h2></div><div className="min-w-0 flex-[2_1_560px]">{item.faqs.map((faq)=><details key={faq.question} className="border-b border-ink/20 py-5"><summary className="cursor-pointer font-semibold">{faq.question}</summary><p className="mb-0 mt-3 text-ink-soft">{faq.answer}</p></details>)}</div></div></section>
    <InkCta title={<>Faisons avancer votre activité <span className="text-copper-light">avec les bons outils.</span></>} text="Décrivez-nous votre besoin et recevez une proposition adaptée." cta="Demander un devis" />
  </>
}
