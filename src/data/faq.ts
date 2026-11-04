import type { AccordionItem } from '@/components/ui/accordion'

export type FaqCategory = 'Général' | 'Projets web' | 'Assistance IT' | 'Paiement' | 'Sécurité'

export const faq: (AccordionItem & { cat: FaqCategory })[] = [
  { id: 'g1', cat: 'Général', q: 'Avec quels types de clients travaillez-vous ?', a: 'PME, commerces, écoles, cliniques, ONG, sous-traitants miniers et indépendants. La taille compte moins que l’envie d’avancer.' },
  { id: 'g2', cat: 'Général', q: 'Où intervenez-vous ?', a: 'À Lubumbashi sur place, et à distance partout en RDC. Les déplacements hors de la ville se prévoient dans le devis.' },
  { id: 'g3', cat: 'Général', q: 'Le premier rendez-vous est-il payant ?', a: 'Le premier échange sert à comprendre votre besoin et à savoir si on peut vous aider. Ses conditions sont : [à définir].' },
  { id: 'w1', cat: 'Projets web', q: 'Combien de temps pour créer un site ?', a: 'Un site vitrine prend en général [X] semaines, une boutique en ligne [Y] semaines. Le planning exact figure dans le devis.' },
  { id: 'w2', cat: 'Projets web', q: 'Est-ce que je pourrai modifier mon site moi-même ?', a: 'Oui. Vous recevez un espace d’administration simple et une formation pour changer textes, images, produits et prix.' },
  { id: 'w3', cat: 'Projets web', q: 'Mon site fonctionnera-t-il avec une connexion lente ?', a: 'C’est une priorité : images optimisées, pages légères et tests en 3G avant chaque mise en ligne.' },
  { id: 'i1', cat: 'Assistance IT', q: 'Intervenez-vous en urgence ?', a: 'Oui, selon votre formule d’assistance. Les délais d’intervention garantis sont précisés dans le contrat.' },
  { id: 'i2', cat: 'Assistance IT', q: 'Pouvez-vous reprendre un parc installé par quelqu’un d’autre ?', a: 'Oui. On commence par un inventaire et un état des lieux, puis on vous dit ce qui doit être corrigé en priorité.' },
  { id: 'p1', cat: 'Paiement', q: 'Quels moyens de paiement acceptez-vous ?', a: 'M-Pesa, Airtel Money, Orange Money, virement bancaire et espèces en dollars ou en francs congolais.' },
  { id: 'p2', cat: 'Paiement', q: 'Peut-on payer en plusieurs fois ?', a: 'Oui pour les projets de création : acompte, étape intermédiaire et solde à la mise en ligne.' },
  { id: 's1', cat: 'Sécurité', q: 'Mes données sont-elles en sécurité ?', a: 'Accès protégés, sauvegardes régulières et documentation de tout ce qu’on installe. Vous gardez la propriété de vos données et de vos accès.' },
  { id: 's2', cat: 'Sécurité', q: 'Que se passe-t-il pendant une coupure de courant ?', a: 'Avec onduleur et arrêt automatique, les serveurs s’éteignent proprement et redémarrent seuls. Les sauvegardes protègent le reste.' },
]

export const faqCategories: ('Tout' | FaqCategory)[] = ['Tout', 'Général', 'Projets web', 'Assistance IT', 'Paiement', 'Sécurité']

export const webFaq: AccordionItem[] = [
  { id: 'wf1', q: 'Combien de temps faut-il pour créer un site ?', a: 'Un site vitrine prend en général [X] semaines, une boutique en ligne [Y] semaines. Le planning exact figure dans le devis, avec une date de mise en ligne.' },
  { id: 'wf2', q: 'Puis-je modifier mon site moi-même ?', a: 'Oui. Vous recevez un espace d’administration simple et une formation. Vous changez textes, photos et produits sans nous appeler.' },
  { id: 'wf3', q: 'Le paiement mobile fonctionne-t-il vraiment ?', a: 'Oui, nous intégrons les solutions de paiement mobile utilisées en RDC. Les frais de transaction dépendent de l’opérateur et de votre contrat avec lui.' },
  { id: 'wf4', q: 'Qui est propriétaire du site ?', a: 'Vous. Le nom de domaine, l’hébergement et le code sont à votre nom. Vous pouvez changer de prestataire quand vous le souhaitez.' },
]

export const pricingFaq: AccordionItem[] = [
  { id: 'pf1', q: 'Pourquoi des prix « à partir de » ?', a: 'Chaque entreprise est différente : nombre de pages, contenus à rédiger, fonctions particulières. Le devis fixe un prix ferme après notre premier échange.' },
  { id: 'pf2', q: 'Puis-je payer en plusieurs fois ?', a: 'Oui. En général : un acompte au démarrage, une étape intermédiaire et le solde à la mise en ligne. L’échéancier figure dans le devis.' },
  { id: 'pf3', q: 'Le nom de domaine et l’hébergement sont-ils inclus ?', a: 'Selon la formule, la première année est incluse ou facturée à part : c’est précisé dans le devis. Ensuite, le renouvellement est facturé au prix coûtant ou intégré à un abonnement.' },
  { id: 'pf4', q: 'Que se passe-t-il après la mise en ligne ?', a: 'Vous êtes formés et autonomes. Si vous le souhaitez, un abonnement d’assistance prend le relais pour les mises à jour et la sécurité.' },
  { id: 'pf5', q: 'Travaillez-vous en dehors de Lubumbashi ?', a: 'Oui, à distance partout en RDC. Les déplacements sur site hors de Lubumbashi se prévoient dans le devis, selon le projet.' },
]
