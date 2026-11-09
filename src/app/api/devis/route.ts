import { HttpError, ok, readJson, route } from '@/lib/api'
import { prisma } from '@/lib/db'
import { escapeHtml, sendEmailNotice } from '@/lib/email'
import { EMAIL, guard, isPhone, text } from '@/lib/forms'
import { isPlainObject } from '@/lib/shape'
import { getSite } from '@/lib/content'

/** Demande de devis envoyée depuis la page Contact. */
export const POST = route(async (request: Request) => {
  const body = await readJson(request, 50_000)
  if (!isPlainObject(body)) throw new HttpError(400, 'Données invalides.')
  guard(request, body, 'devis')

  const name = text(body.name, 160)
  const phone = text(body.phone, 40)
  const email = text(body.email, 191)
  const message = text(body.message, 5000)
  const errors: Record<string, string> = {}
  if (!name) errors.name = 'Indiquez votre nom.'
  if (!phone) errors.phone = 'Indiquez un numéro pour vous rappeler.'
  else if (!isPhone(phone)) errors.phone = 'Ce numéro semble incomplet. Exemple : +243 997 978 888.'
  if (email && !EMAIL.test(email)) errors.email = 'Adresse e-mail invalide.'
  if (message.length < 10) errors.message = 'Décrivez votre projet en une ou deux phrases.'
  if (body.consent !== true) errors.consent = 'Cochez la case pour que nous puissions vous répondre.'
  if (Object.keys(errors).length) throw new HttpError(422, 'Certains champs sont à corriger.', errors)

  const services = Array.isArray(body.services) ? body.services.map((s) => text(s, 80)).filter(Boolean).slice(0, 20) : []
  const organisation = text(body.organisation, 191)
  const budget = text(body.budget, 80)
  const contactPreference = text(body.contactPreference, 40)
  await prisma.quoteRequest.create({
    data: {
      name,
      organisation,
      phone,
      email,
      message,
      services,
      budget,
      contactPreference,
    },
  })

  const recipient = (await getSite()).email
  const fields: [string, string][] = [
    ['Nom', name],
    ['Organisation', organisation || 'Non précisée'],
    ['Téléphone', phone],
    ['E-mail', email || 'Non renseigné'],
    ['Services', services.join(', ') || 'À préciser'],
    ['Budget', budget || 'À préciser'],
    ['Préférence de contact', contactPreference || 'Non précisée'],
    ['Projet', message],
  ]
  await sendEmailNotice({
    to: recipient,
    replyTo: email || undefined,
    subject: `Nouvelle demande de devis — ${name}`,
    text: fields.map(([label, value]) => `${label} : ${value}`).join('\n\n'),
    html: `<h2>Nouvelle demande de devis</h2><dl>${fields.map(([label, value]) => `<dt><strong>${escapeHtml(label)}</strong></dt><dd>${escapeHtml(value).replace(/\n/g, '<br>')}</dd>`).join('')}</dl>`,
  })
  return ok({}, 201)
})
