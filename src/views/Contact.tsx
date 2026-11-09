import { useState, type FormEvent } from 'react'
import { ButtonLink, Button } from '@/components/ui/button'
import { Field, isPhone } from '@/components/ui/field'
import { Check } from '@/components/ui/icons'
import { Ph } from '@/components/ui/placeholder'
import { usePageMeta } from '@/hooks/usePageMeta'
import { routes } from '@/lib/routes'
import { site } from '@/lib/site'

const serviceOptions = ['Site web', 'Application mobile', 'Assistance IT', 'Transformation numérique', 'IA et automatisation', 'Réseaux', 'Formation', 'Conseil']
const budgetOptions = ['Moins de 500 $', '500 à 1 499 $', '1 500 à 2 999 $', '3 000 $ et plus', 'À définir sur devis']
const contactOptions = ['Appel', 'WhatsApp', 'E-mail'] as const
const mapQuery = encodeURIComponent('Route Kasapa, Lubumbashi, République démocratique du Congo')

type Errors = Partial<Record<'name' | 'phone' | 'message' | 'consent', string>>

export default function Contact() {
  usePageMeta('Contact et devis', 'Demandez un devis à Fibetech : site web, application, assistance IT, IA ou réseau à Lubumbashi.')

  const [picked, setPicked] = useState<string[]>(['Site web'])
  const [budget, setBudget] = useState('Je ne sais pas encore')
  const [pref, setPref] = useState<(typeof contactOptions)[number]>('WhatsApp')
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState(false)

  const toggleService = (service: string) => setPicked((list) => (list.includes(service) ? list.filter((s) => s !== service) : [...list, service]))

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const next: Errors = {}
    if (!String(data.get('nom') ?? '').trim()) next.name = 'Indiquez votre nom.'
    const phone = String(data.get('telephone') ?? '')
    if (!phone.trim()) next.phone = 'Indiquez un numéro pour vous rappeler.'
    else if (!isPhone(phone)) next.phone = 'Ce numéro semble incomplet. Exemple : +243 975 079 756.'
    if (String(data.get('message') ?? '').trim().length < 10) next.message = 'Décrivez votre projet en une ou deux phrases.'
    if (!data.get('consentement')) next.consent = 'Cochez la case pour que nous puissions vous répondre.'
    setErrors(next)

    // Focus sur le premier champ en erreur (l'attribut aria-invalid n'est pas encore rendu ici).
    const fieldIds: Record<keyof Errors, string> = { name: 'c-nom', phone: 'c-tel', message: 'c-msg', consent: 'c-ok' }
    const firstError = (Object.keys(fieldIds) as (keyof Errors)[]).find((key) => next[key])
    if (firstError) {
      document.getElementById(fieldIds[firstError])?.focus()
      return
    }

    // À brancher sur votre service d'envoi (API, Formspree, e-mail…).
    // Les données disponibles : nom, organisation, telephone, email, message,
    // plus `picked` (services), `budget` et `pref` (canal de contact).
    setSent(true)
  }

  return (
    <>
      <section aria-labelledby="page-title" className="pb-14 pt-[88px]">
        <div className="wrap flex flex-col gap-[22px]">
          <span className="eyebrow rise text-copper">Contact et devis</span>
          <h1 id="page-title" className="rise d1 max-w-[980px] text-[clamp(44px,6.4vw,92px)] font-extrabold leading-[0.95] tracking-[-0.045em]">
            Parlons de <span className="text-copper">votre projet.</span>
          </h1>
          <p className="rise d2 max-w-[600px] text-xl text-ink-soft">Remplissez le formulaire ou appelez-nous. Une personne de l’équipe vous répond, pas un robot.</p>
        </div>
      </section>

      <section aria-label="Formulaire et coordonnées" className="pb-[120px]">
        <div className="wrap flex flex-wrap-reverse items-start gap-8">
          <aside aria-label="Coordonnées" className="flex min-w-0 flex-[1_1_340px] flex-col gap-[18px]">
            <div className="card lift flex flex-col gap-1.5 p-[26px]">
              <span className="eyebrow text-xs text-ink-muted">Téléphone</span>
              <span className="font-mono text-[22px] font-medium">{site.phone}</span>
              <a className="link mt-1.5 self-start" href={site.phoneHref}>
                Appeler
              </a>
            </div>
            <div className="card lift flex flex-col gap-1.5 border-mal bg-mal p-[26px] text-white">
              <span className="eyebrow text-xs text-[#BFE3D4]">WhatsApp</span>
              <span className="text-lg font-semibold">Écrivez-nous, même le soir.</span>
              <span className="text-[15px] text-[#D3E6DE]">
                Numéro : <Ph dark>{site.whatsapp}</Ph>
              </span>
            </div>
            <div className="card lift flex flex-col gap-1.5 p-[26px]">
              <span className="eyebrow text-xs text-ink-muted">E-mail</span>
              <span>
                <Ph>{site.email}</Ph>
              </span>
            </div>
            <div className="card overflow-hidden">
              <div className="relative h-[240px] border-b-[1.5px] border-ink">
                <iframe title={`Carte Google Maps : ${site.fullAddress}`} src={`https://maps.google.com/maps?q=${mapQuery}&z=15&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 h-full w-full border-0" />
              </div>
              <div className="flex flex-col gap-1 px-[26px] py-[22px]">
                <span className="font-semibold">
                  <Ph>{site.address}</Ph>, {site.city}
                </span>
                <span className="text-[15px] text-ink-muted">
                  <Ph>{site.hours}</Ph>
                </span>
                <span className="pt-1.5 font-mono text-xs text-ink-muted">{site.coords}</span>
                <a className="link mt-1 self-start" href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`} target="_blank" rel="noreferrer">Ouvrir dans Google Maps</a>
              </div>
            </div>
          </aside>

          <div className="card min-w-0 flex-[2_1_560px] p-[clamp(24px,4vw,48px)] shadow-[10px_10px_0_#121614]">
            {sent ? (
              <div role="status" className="pop-in flex flex-col items-start gap-5 py-10">
                <span className="grid h-[84px] w-[84px] place-items-center rounded-full bg-mal">
                  <Check size={40} strokeWidth={2.6} className="check-draw text-white" />
                </span>
                <h2 className="text-[clamp(30px,3.4vw,46px)] font-extrabold">Merci, votre demande est bien partie.</h2>
                <p className="max-w-[520px] text-lg text-ink-soft">
                  On vous recontacte par <strong>{pref === 'E-mail' ? 'e-mail' : pref === 'Appel' ? 'téléphone' : 'WhatsApp'}</strong> pour poser quelques questions, puis on vous envoie une proposition.
                </p>
                <p className="text-[15px] text-ink-muted">Services choisis : {picked.length ? picked.join(', ') : 'à préciser ensemble'}</p>
                <Button variant="ghost" onClick={() => setSent(false)}>
                  Faire une autre demande
                </Button>
              </div>
            ) : (
              <form aria-labelledby="form-title" noValidate onSubmit={onSubmit} className="flex flex-col gap-[30px]">
                <div className="flex flex-col gap-1.5">
                  <h2 id="form-title" className="text-[clamp(28px,3vw,40px)] font-extrabold">
                    Demande de devis
                  </h2>
                  <p className="text-[15px] text-ink-muted">Les champs marqués d’un astérisque sont obligatoires.</p>
                </div>

                <fieldset className="m-0 flex min-w-0 flex-col gap-3 border-0 p-0">
                  <legend className="label mb-3 p-0">
                    De quoi avez-vous besoin ? <span className="font-normal text-ink-muted">(plusieurs choix possibles)</span>
                  </legend>
                  <div className="flex flex-wrap gap-2.5">
                    {serviceOptions.map((service) => (
                      <button key={service} type="button" className="chipbtn min-h-11 px-[18px]" aria-pressed={picked.includes(service)} onClick={() => toggleService(service)}>
                        {service}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <fieldset className="m-0 flex min-w-0 flex-col gap-3 border-0 p-0">
                  <legend className="label mb-3 p-0">Budget envisagé</legend>
                  <div className="flex flex-wrap gap-2.5">
                    {budgetOptions.map((option) => (
                      <button key={option} type="button" className="chipbtn min-h-11 px-[18px]" aria-pressed={budget === option} onClick={() => setBudget(option)}>
                        {option}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-[18px]">
                  <Field id="c-nom" label="Nom complet *" error={errors.name}>
                    <input className="input" id="c-nom" name="nom" type="text" autoComplete="name" placeholder="Prénom et nom" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'c-nom-err' : undefined} />
                  </Field>
                  <Field id="c-org" label="Entreprise ou organisation">
                    <input className="input" id="c-org" name="organisation" type="text" autoComplete="organization" placeholder="Nom de la structure" />
                  </Field>
                  <Field id="c-tel" label="Téléphone ou WhatsApp *" error={errors.phone}>
                    <input className="input" id="c-tel" name="telephone" type="tel" autoComplete="tel" placeholder="+243 …" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'c-tel-err' : undefined} />
                  </Field>
                  <Field id="c-mail" label="E-mail">
                    <input className="input" id="c-mail" name="email" type="email" autoComplete="email" placeholder="vous@entreprise.cd" />
                  </Field>
                </div>

                <Field id="c-msg" label="Votre projet en quelques lignes *" error={errors.message}>
                  <textarea className="input resize-y" id="c-msg" name="message" rows={5} placeholder="Ce que vous voulez faire, pour qui, et pour quand." aria-invalid={!!errors.message} aria-describedby={errors.message ? 'c-msg-err' : undefined} />
                </Field>

                <fieldset className="m-0 flex min-w-0 flex-col gap-3 border-0 p-0">
                  <legend className="label mb-3 p-0">Comment préférez-vous être recontacté ?</legend>
                  <div className="flex flex-wrap gap-2.5">
                    {contactOptions.map((option) => (
                      <label key={option} className="radio" htmlFor={`pref-${option}`}>
                        <input type="radio" id={`pref-${option}`} name="preference" value={option} checked={pref === option} onChange={() => setPref(option)} />
                        {option}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="c-ok" className="flex items-start gap-3 text-[15px] text-ink-soft">
                    <input id="c-ok" name="consentement" type="checkbox" className="mt-0.5 h-5 w-5 accent-copper" aria-invalid={!!errors.consent} aria-describedby={errors.consent ? 'c-ok-err' : undefined} />
                    J’accepte que mes informations soient utilisées pour répondre à ma demande.
                  </label>
                  {errors.consent && (
                    <p id="c-ok-err" className="text-sm font-semibold text-[#B42318]">
                      {errors.consent}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <Button type="submit" arrow>
                    Envoyer ma demande
                  </Button>
                  <span className="text-sm text-ink-muted">
                    Recevez le prix et le délai estimé sous 24 heures.
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <section aria-label="Autres questions" className="border-t-[1.5px] border-ink bg-stone py-[72px]">
        <div className="wrap flex flex-wrap items-center justify-between gap-6">
          <p className="font-display text-[clamp(24px,2.6vw,34px)] font-bold">Une question avant de nous écrire ?</p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink to={routes.faq} variant="ghost">
              Lire la FAQ
            </ButtonLink>
            <ButtonLink to={routes.pricing} variant="ghost">
              Voir les tarifs
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  )
}
