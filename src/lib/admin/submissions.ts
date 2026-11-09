// Demandes reçues depuis les formulaires du site (utilisable dans le navigateur et sur le serveur).

export const statuses = [
  { value: 'nouveau', label: 'Nouvelle', tone: 'bg-copper text-white' },
  { value: 'en_cours', label: 'En cours', tone: 'bg-mustard text-ink' },
  { value: 'traite', label: 'Traitée', tone: 'bg-mal text-white' },
  { value: 'archive', label: 'Archivée', tone: 'bg-line text-ink-soft' },
] as const

export type Status = (typeof statuses)[number]['value']

export const isStatus = (value: unknown): value is Status => statuses.some((s) => s.value === value)

export const submissionTypes = ['devis', 'inscriptions', 'newsletter'] as const
export type SubmissionType = (typeof submissionTypes)[number]
export const isSubmissionType = (value: string): value is SubmissionType => (submissionTypes as readonly string[]).includes(value)
