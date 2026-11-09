'use client'

import { useState, type FormEvent } from 'react'
import { RichInline, RichTitle } from '@/components/rich'
import { Button, ButtonLink } from '@/components/ui/button'
import { Field, Honeypot, isPhone } from '@/components/ui/field'
import { Check } from '@/components/ui/icons'
import type { BlockData, SiteInfo } from '@/content/blocks'
import { sendJson } from '@/lib/client-api'
import { fill, phoneHref } from '@/lib/format'

const contactOptions = ['Appel', 'WhatsApp', 'E-mail'] as const
type ContactOption = (typeof contactOptions)[number]

type Errors = Partial<Record<'name' | 'phone' | 'message' | 'consent' | 'form', string>>
const fieldIds: Record<Exclude<keyof Errors, 'form'>, string> = { name: 'c-nom', phone: 'c-tel', message: 'c-msg', consent: 'c-ok' }

export default function Contact({ c, site }: { c: BlockData<'contact'>; site: SiteInfo }) {
  const [picked, setPicked] = useState<string[]>(c.form.services.slice(0, 1))
  const [budget, setBudget] = useState('')
  const [pref, setPref] = useState<ContactOption>('WhatsApp')
  const [errors, setErrors] = useState<Errors>({})
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const mapQuery = encodeURIComponent(site.mapQuery || site.fullAddress)

  const toggleService = (service: string) => setPicked((list) => (list.includes(service) ? list.filter((s) => s !== service) : [...list, service]))

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const next: Errors = {}
    if (!String(data.get('nom') ?? '').trim()) next.name = 'Indiquez votre nom.'
    const phone = String(data.get('telephone') ?? '')
    if (!phone.trim()) next.phone = 'Indiquez un numéro pour vous rappeler.'
    else if (!isPhone(phone)) next.phone = 'Ce numéro semble incomplet. Exemple : +243 997 978 888.'
    if (String(data.get('message') ?? '').trim().length < 10) next.message = 'Décrivez votre projet en une ou deux phrases.'
    if (!data.get('consentement')) next.consent = 'Cochez la case pour que nous puissions vous répondre.'
    setErrors(next)

    // Focus sur le premier champ en erreur.
    const firstError = (Object.keys(fieldIds) as (keyof typeof fieldIds)[]).find((key) => next[key])
    if (firstError) {
      document.getElementById(fieldIds[firstError])?.focus()
      return
    }

    setSending(true)
    const result = await sendJson('/api/devis', {
      name: data.get('nom'),
      organisation: data.get('organisation'),
      phone,
      email: data.get('email'),
      message: data.get('message'),
      services: picked,
      budget,
      contactPreference: pref,
      consent: true,
      website: data.get('website'),
    })
    setSending(false)
    if (!result.ok) {
      setErrors({ ...(result.errors as Errors | undefined), form: result.message })
      return
    }
    setSent(true)
  }

  const channel = pref === 'E-mail' ? 'e-mail' : pref === 'Appel' ? 'téléphone' : 'WhatsApp'

  return (
    <>
      <section aria-labelledby="page-title" className="pb-14 pt-[88px]">
        <div className="wrap flex flex-col gap-[22px]">
          <span className="eyebrow rise text-copper">{c.hero.eyebrow}</span>
          <h1 id="page-title" className="rise d1 max-w-[980px] text-[clamp(44px,6.4vw,92px)] font-extrabold leading-[0.95] tracking-[-0.045em]">
            <RichTitle text={c.hero.title} />
          </h1>
          <p className="rise d2 max-w-[600px] text-xl text-ink-soft">{c.hero.text}</p>
        </div>
      </section>

      <section aria-label="Formulaire et coordonnées" className="pb-[120px]">
        <div className="wrap flex flex-wrap-reverse items-start gap-8">
          <aside aria-label="Coordonnées" className="flex min-w-0 flex-[1_1_340px] flex-col gap-[18px]">
            <div className="card lift flex flex-col gap-1.5 p-[26px]">
              <span className="eyebrow text-xs text-ink-muted">{c.cards.phoneLabel}</span>
              <span className="font-mono text-[22px] font-medium">{site.phone}</span>
              <a className="link mt-1.5 self-start" href={phoneHref(site.phone)}>
                {c.cards.callLabel}
              </a>
            </div>
            <div className="card lift flex flex-col gap-1.5 border-mal bg-mal p-[26px] text-white">
              <span className="eyebrow text-xs text-[#BFE3D4]">{c.cards.whatsappLabel}</span>
              <span className="text-lg font-semibold">{c.cards.whatsappText}</span>
              <span className="text-[15px] text-[#D3E6DE]">
                {c.cards.whatsappNumberLabel} <RichInline text={site.whatsapp} dark />
              </span>
            </div>
            <div className="card lift flex flex-col gap-1.5 p-[26px]">
              <span className="eyebrow text-xs text-ink-muted">{c.cards.emailLabel}</span>
              <a className="link self-start" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </div>
            <div className="card overflow-hidden">
              <div className="relative h-[240px] border-b-[1.5px] border-ink">
                <iframe title={`Carte Google Maps : ${site.fullAddress}`} src={`https://maps.google.com/maps?q=${mapQuery}&z=17&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 h-full w-full border-0" />
              </div>
              <div className="flex flex-col gap-1 px-[26px] py-[22px]">
                <span className="font-semibold">
                  <RichInline text={site.address} />, {site.city}
                </span>
                <span className="text-[15px] text-ink">
                  <RichInline text={site.hours} />
                </span>
                {site.coords && <span className="pt-1.5 font-mono text-xs text-ink-muted">{site.coords}</span>}
                <a className="link mt-1 self-start" href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`} target="_blank" rel="noreferrer">
                  {c.cards.mapLink}
                </a>
              </div>
            </div>
          </aside>

          <div className="card min-w-0 flex-[2_1_560px] p-[clamp(24px,4vw,48px)] shadow-[10px_10px_0_#121614]">
            {process.env.NEXT_PUBLIC_FIBETECH_STATIC === '1' ? (
              <div className="flex flex-col items-start gap-5 py-8">
                <h2 className="text-[clamp(28px,3vw,40px)] font-extrabold">{c.form.title}</h2>
                <p className="max-w-[520px] text-lg text-ink-soft">Le formulaire de devis n’est pas disponible sur cette version statique. Contactez-nous directement par e-mail ou WhatsApp.</p>
                <div className="flex flex-wrap gap-3">
                  <ButtonLink href={`mailto:${site.email}`} arrow>Écrire à Fibetech</ButtonLink>
                  <ButtonLink href={`https://wa.me/${site.whatsapp.replace(/\D/g, '')}`} variant="ghost" target="_blank" rel="noreferrer">WhatsApp</ButtonLink>
                </div>
              </div>
            ) : sent ? (
              <div role="status" className="pop-in flex flex-col items-start gap-5 py-10">
                <span className="grid h-[84px] w-[84px] place-items-center rounded-full bg-mal">
                  <Check size={40} strokeWidth={2.6} className="check-draw text-white" />
                </span>
                <h2 className="text-[clamp(30px,3.4vw,46px)] font-extrabold">{c.success.title}</h2>
                <p className="max-w-[520px] text-lg text-ink-soft">{fill(c.success.text, { channel })}</p>
                <p className="text-[15px] text-ink-muted">
                  {c.success.servicesLabel} {picked.length ? picked.join(', ') : 'à préciser ensemble'}
                </p>
                <Button variant="ghost" onClick={() => setSent(false)}>
                  {c.success.again}
                </Button>
              </div>
            ) : (
              <form aria-labelledby="form-title" noValidate onSubmit={onSubmit} className="relative flex flex-col gap-[30px]">
                <div className="flex flex-col gap-1.5">
                  <h2 id="form-title" className="text-[clamp(28px,3vw,40px)] font-extrabold">
                    {c.form.title}
                  </h2>
                  <p className="text-[15px] text-ink-muted">{c.form.requiredNote}</p>
                </div>

                {c.form.services.length > 0 && (
                  <fieldset className="m-0 flex min-w-0 flex-col gap-3 border-0 p-0">
                    <legend className="label mb-3 p-0">
                      {c.form.servicesLegend} <span className="font-normal text-ink-muted">{c.form.servicesHint}</span>
                    </legend>
                    <div className="flex flex-wrap gap-2.5">
                      {c.form.services.map((service) => (
                        <button key={service} type="button" className="chipbtn min-h-11 px-[18px]" aria-pressed={picked.includes(service)} onClick={() => toggleService(service)}>
                          {service}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                )}

                {c.form.budgets.length > 0 && (
                  <fieldset className="m-0 flex min-w-0 flex-col gap-3 border-0 p-0">
                    <legend className="label mb-3 p-0">{c.form.budgetLegend}</legend>
                    <div className="flex flex-wrap gap-2.5">
                      {c.form.budgets.map((option) => (
                        <button key={option} type="button" className="chipbtn min-h-11 px-[18px]" aria-pressed={budget === option} onClick={() => setBudget(budget === option ? '' : option)}>
                          {option}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                )}

                <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-[18px]">
                  <Field id="c-nom" label="Nom complet *" error={errors.name}>
                    <input className="input" id="c-nom" name="nom" type="text" maxLength={160} autoComplete="name" placeholder="Prénom et nom" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'c-nom-err' : undefined} />
                  </Field>
                  <Field id="c-org" label="Entreprise ou organisation">
                    <input className="input" id="c-org" name="organisation" type="text" maxLength={191} autoComplete="organization" placeholder="Nom de la structure" />
                  </Field>
                  <Field id="c-tel" label="Téléphone ou WhatsApp *" error={errors.phone}>
                    <input className="input" id="c-tel" name="telephone" type="tel" maxLength={40} autoComplete="tel" placeholder="+243 …" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'c-tel-err' : undefined} />
                  </Field>
                  <Field id="c-mail" label="E-mail">
                    <input className="input" id="c-mail" name="email" type="email" maxLength={191} autoComplete="email" placeholder="vous@entreprise.cd" />
                  </Field>
                </div>

                <Field id="c-msg" label={c.form.messageLabel} error={errors.message}>
                  <textarea className="input resize-y" id="c-msg" name="message" rows={5} maxLength={5000} placeholder={c.form.messagePlaceholder} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'c-msg-err' : undefined} />
                </Field>

                <fieldset className="m-0 flex min-w-0 flex-col gap-3 border-0 p-0">
                  <legend className="label mb-3 p-0">{c.form.contactLegend}</legend>
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
                    {c.form.consent}
                  </label>
                  {errors.consent && (
                    <p id="c-ok-err" className="text-sm font-semibold text-[#B42318]">
                      {errors.consent}
                    </p>
                  )}
                </div>

                <Honeypot />

                {errors.form && (
                  <p role="alert" className="rounded-xl border border-[#B42318]/30 bg-[#FEF3F2] px-4 py-3 text-sm font-semibold text-[#B42318]">
                    {errors.form}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-4">
                  <Button type="submit" arrow disabled={sending}>
                    {sending ? 'Envoi…' : c.form.submit}
                  </Button>
                  <span className="text-sm text-ink-muted">{c.form.note}</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <section aria-label="Autres questions" className="border-t-[1.5px] border-ink bg-stone py-[72px]">
        <div className="wrap flex flex-wrap items-center justify-between gap-6">
          <p className="font-display text-[clamp(24px,2.6vw,34px)] font-bold">{c.bottom.title}</p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink to="/faq" variant="ghost">
              {c.bottom.faqButton}
            </ButtonLink>
            <ButtonLink to="/tarifs" variant="ghost">
              {c.bottom.pricingButton}
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  )
}
