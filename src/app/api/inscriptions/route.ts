import { HttpError, ok, readJson, route } from '@/lib/api'
import { prisma } from '@/lib/db'
import { escapeHtml, sendEmailNotice } from '@/lib/email'
import { EMAIL, guard, isPhone, text } from '@/lib/forms'
import { isPlainObject } from '@/lib/shape'
import { getSite } from '@/lib/content'

/** Demande d'inscription à une formation (page Formations). */
export const POST = route(async (request: Request) => {
  const body = await readJson(request, 50_000)
  if (!isPlainObject(body)) throw new HttpError(400, 'Données invalides.')
  guard(request, body, 'inscriptions')

  const slug = text(body.training, 120)
  const name = text(body.name, 160)
  const phone = text(body.phone, 40)
  const email = text(body.email, 191)
  const errors: Record<string, string> = {}
  if (!slug) errors.course = 'Choisissez une formation, ou « Je ne sais pas encore ».'
  if (!name) errors.name = 'Indiquez votre nom.'
  if (!phone) errors.phone = 'Indiquez un numéro pour vous rappeler.'
  else if (!isPhone(phone)) errors.phone = 'Ce numéro semble incomplet. Exemple : +243 997 978 888.'
  if (email && !EMAIL.test(email)) errors.email = 'Adresse e-mail invalide.'
  if (body.consent !== true) errors.consent = 'Cochez la case pour que nous puissions vous répondre.'
  if (Object.keys(errors).length) throw new HttpError(422, 'Certains champs sont à corriger.', errors)

  // Le titre est relu en base : on n'enregistre pas un intitulé envoyé par le navigateur.
  const training = slug === 'conseil' ? null : await prisma.training.findUnique({ where: { slug }, select: { title: true } })
  if (slug !== 'conseil' && !training) throw new HttpError(422, 'Cette formation n’est plus disponible. Choisissez-en une autre.', { course: 'Formation introuvable.' })

  const participants = Math.min(200, Math.max(1, Math.round(Number(body.participants) || 1)))
  const format = text(body.format, 40)
  const organisation = text(body.organisation, 191)
  const message = text(body.message, 5000)
  await prisma.trainingEnrollment.create({
    data: {
      trainingSlug: slug,
      trainingTitle: training?.title ?? 'Conseil pour choisir une formation',
      format,
      name,
      phone,
      email,
      organisation,
      participants,
      message,
    },
  })

  const recipient = (await getSite()).email
  const fields: [string, string][] = [
    ['Formation', training?.title ?? 'Conseil pour choisir une formation'],
    ['Format', format || 'Non précisé'],
    ['Nom', name],
    ['Téléphone', phone],
    ['E-mail', email || 'Non renseigné'],
    ['Organisation', organisation || 'Non précisée'],
    ['Participants', String(participants)],
    ['Message', message || 'Aucun message'],
  ]
  await sendEmailNotice({
    to: recipient,
    replyTo: email || undefined,
    subject: `Nouvelle inscription à une formation — ${name}`,
    text: fields.map(([label, value]) => `${label} : ${value}`).join('\n\n'),
    html: `<h2>Nouvelle inscription à une formation</h2><dl>${fields.map(([label, value]) => `<dt><strong>${escapeHtml(label)}</strong></dt><dd>${escapeHtml(value).replace(/\n/g, '<br>')}</dd>`).join('')}</dl>`,
  })
  return ok({}, 201)
})
