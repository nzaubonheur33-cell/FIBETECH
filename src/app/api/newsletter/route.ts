import { HttpError, ok, readJson, route } from '@/lib/api'
import { getSite } from '@/lib/content'
import { prisma } from '@/lib/db'
import { escapeHtml, sendEmailNotice } from '@/lib/email'
import { EMAIL, guard, text } from '@/lib/forms'
import { isPlainObject } from '@/lib/shape'

/** Inscription à la lettre d'information (pied de page et blog). */
export const POST = route(async (request: Request) => {
  const body = await readJson(request, 5_000)
  if (!isPlainObject(body)) throw new HttpError(400, 'Données invalides.')
  guard(request, body, 'newsletter', 5)

  const email = text(body.email, 191).toLowerCase()
  if (!EMAIL.test(email)) throw new HttpError(422, 'Adresse e-mail invalide.', { email: 'Adresse e-mail invalide.' })
  const source = body.source === 'blog' ? 'blog' : 'footer'

  // La liste est enregistrée même si le fournisseur d'e-mail n'est pas configuré.
  // Une adresse déjà inscrite reçoit la même réponse et ne déclenche pas une seconde alerte.
  const inserted = await prisma.newsletterSubscriber.createMany({ data: { email, source }, skipDuplicates: true })
  if (inserted.count > 0) {
    const recipient = (await getSite()).email
    const sourceLabel = source === 'blog' ? 'Blog' : 'Pied de page'
    const message = [
      'Une nouvelle personne souhaite recevoir les conseils numériques de Fibetech.',
      '',
      'Adresse e-mail : ' + email,
      'Formulaire : ' + sourceLabel,
      '',
      'Pour la contacter, répondez directement à cet e-mail.',
    ].join('\n')
    const html = '<p>Une nouvelle personne souhaite recevoir les conseils numériques de Fibetech.</p>' +
      '<p><strong>Adresse e-mail :</strong> <a href="mailto:' + escapeHtml(email) + '">' + escapeHtml(email) + '</a></p>' +
      '<p><strong>Formulaire :</strong> ' + sourceLabel + '</p>' +
      '<p>Pour la contacter, répondez directement à cet e-mail.</p>'

    await sendEmailNotice({
      to: recipient,
      replyTo: email,
      subject: 'Nouvelle inscription aux conseils numériques Fibetech',
      text: message,
      html,
    })
  }

  return ok({}, 201)
})
