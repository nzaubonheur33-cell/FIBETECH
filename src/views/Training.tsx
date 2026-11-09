'use client'

import { useEffect, useState, type FormEvent } from 'react'
import { RichInline, RichTitle } from '@/components/rich'
import { Accordion, type AccordionItem } from '@/components/ui/accordion'
import { AnchorLink } from '@/components/ui/anchor-link'
import { Button, ButtonLink } from '@/components/ui/button'
import { Field, Honeypot, isPhone } from '@/components/ui/field'
import { ArrowRight, Check, HorizonDot, PathIcon } from '@/components/ui/icons'
import type { BlockData, SiteInfo } from '@/content/blocks'
import type { TrainingItem } from '@/content/types'
import { sendJson } from '@/lib/client-api'
import { fill, phoneHref, siteTokens } from '@/lib/format'
import { cn, scrollToId } from '@/lib/utils'

const ADVICE = 'conseil'
const DEFAULT_FORMATS = ['Présentielle', 'En ligne']

/** Couleur de l'icône de chaque formation (champ « tone » dans l'admin). */
const toneClass: Record<string, string> = {
  copper: 'bg-copper text-white',
  mal: 'bg-mal text-white',
  ink: 'bg-ink text-white',
  mustard: 'bg-mustard text-ink',
  soft: 'bg-copper-soft text-copper-deep',
}

type TrainingProps = {
  c: BlockData<'training'>
  site: SiteInfo
  trainings: TrainingItem[]
  faq: AccordionItem[]
}

export default function Training({ c, site, trainings, faq }: TrainingProps) {
  const [course, setCourse] = useState('')
  const allFormats = Array.from(new Set(trainings.flatMap((t) => t.formats)))
  const formats = allFormats.length ? allFormats : DEFAULT_FORMATS
  const [format, setFormat] = useState(formats[0])
  const bySlug = (slug: string) => trainings.find((t) => t.slug === slug)
  const tokens = { ...siteTokens(site), count: trainings.length }

  const enroll = (slug: string) => {
    const picked = bySlug(slug)
    setCourse(slug)
    if (picked?.formats.length) setFormat(picked.formats.includes(format) ? format : picked.formats[0])
    scrollToId('inscription')
  }

  return (
    <>
      <Hero c={c.hero} site={site} tokens={tokens} />
      <Catalogue c={c.catalogue} trainings={trainings} onEnroll={enroll} />
      <Formats c={c.formats} />
      <Steps c={c.steps} />
      <ForTeams c={c.teams} site={site} tokens={tokens} />
      {faq.length > 0 && (
        <section aria-labelledby="tfaq-title" className="py-[110px]">
          <div className="wrap flex flex-wrap gap-12">
            <div className="flex min-w-0 flex-[1_1_300px] flex-col gap-[18px]">
              <span className="eyebrow text-copper">{c.faq.eyebrow}</span>
              <h2 id="tfaq-title" className="text-[clamp(34px,4vw,52px)] font-extrabold">
                <RichTitle text={c.faq.title} />
              </h2>
              <p className="max-w-[360px] text-ink-soft">
                <RichInline text={c.faq.text} tokens={tokens} />
              </p>
            </div>
            <div className="min-w-0 flex-[2_1_560px]">
              <Accordion items={faq} />
            </div>
          </div>
        </section>
      )}
      <Enrollment c={c.enrollment} site={site} trainings={trainings} formats={formats} course={course} setCourse={setCourse} format={format} setFormat={setFormat} />
    </>
  )
}

/* -------------------------------------------------------------------------- */

function Hero({ c, site, tokens }: { c: BlockData<'training'>['hero']; site: SiteInfo; tokens: Record<string, string | number> }) {
  return (
    <section aria-labelledby="page-title" className="overflow-hidden border-b-[1.5px] border-ink pt-[88px] max-[760px]:pt-16">
      <div className="wrap flex flex-wrap items-center gap-x-12 gap-y-14 pb-[96px] max-[760px]:pb-16">
        <div className="flex min-w-0 flex-[1_1_540px] flex-col gap-[26px]">
          <span className="eyebrow rise text-copper">{c.eyebrow}</span>
          <h1 id="page-title" className="rise d1 text-[clamp(42px,5.8vw,84px)] font-extrabold leading-[0.96] tracking-[-0.04em]">
            <RichTitle text={c.title} />
          </h1>
          <p className="rise d2 max-w-[560px] text-xl text-ink-soft">{c.text}</p>
          <div className="rise d3 flex flex-wrap gap-3">
            <AnchorLink target="catalogue" className="btn btn-cu">
              {c.primaryCta} <ArrowRight />
            </AnchorLink>
            <AnchorLink target="entreprises" className="btn btn-ghost">
              {c.secondaryCta}
            </AnchorLink>
          </div>
          {c.highlights.length > 0 && (
            <ul className="rise d3 mt-2 flex flex-wrap gap-x-7 gap-y-3 border-t-[1.5px] border-line pt-6 text-[15px] text-ink-soft">
              {c.highlights.map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <HorizonDot /> {fill(item, tokens)}
                </li>
              ))}
            </ul>
          )}
        </div>
        <CourseVisual city={site.city} />
      </div>
    </section>
  )
}

/** Fiche de session animée : modules cochés un à un, barre de progression, badge d'attestation. */
function CourseVisual({ city }: { city: string }) {
  const modules = ['Formules utiles', 'Tableaux croisés dynamiques', 'Graphiques et tableaux de bord', 'Suivi de stock et de caisse']
  return (
    <div aria-hidden="true" className="relative mx-auto h-[470px] w-full min-w-0 max-w-[540px] flex-[1_1_420px] max-[520px]:h-[520px]">
      <div className="float-2 absolute right-0 top-0 w-[74%]">
        <div className="flex rotate-[5deg] flex-col gap-3 rounded-[22px] border-[1.5px] border-ink bg-mal p-6 pb-24 text-white">
          <span className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.14em] text-[#BFE3D4] max-[520px]:text-[10px] max-[520px]:tracking-[0.06em]">En ligne · classe virtuelle</span>
          <span className="font-display text-[22px] font-bold leading-[1.15]">L’IA générative au travail</span>
          <span className="flex gap-1.5 pt-1">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className={cn('h-1.5 flex-1 rounded-full', i < 2 ? 'bg-mal-glow' : 'bg-white/25')} />
            ))}
          </span>
        </div>
      </div>

      <div className="float absolute bottom-6 left-0 w-[88%] max-[520px]:bottom-2 max-[520px]:w-[96%]">
        <div className="-rotate-2 rounded-[22px] border-[1.5px] border-ink bg-white p-7 shadow-[10px_10px_0_#121614] max-[520px]:p-5">
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">Session · {city}</span>
          </div>
          <p className="mt-3 font-display text-[28px] font-extrabold leading-[1.1] tracking-[-0.02em] max-[520px]:text-[24px]">Excel pour la gestion</p>
          <ul className="mt-5 flex flex-col gap-3">
            {modules.map((label, i) => {
              const done = i < 3
              return (
                <li key={label} className="flex items-center gap-3 text-[15px]">
                  {done ? (
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-mal text-white">
                      <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" className="check-draw">
                        <path d="M4 12.5l5 5L20 6.5" style={{ animationDelay: `${0.5 + i * 0.35}s` }} />
                      </svg>
                    </span>
                  ) : (
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 border-copper">
                      <span className="pulse-soft h-2.5 w-2.5 rounded-full bg-copper" />
                    </span>
                  )}
                  <span className={done ? 'text-ink-soft' : 'font-semibold'}>{label}</span>
                  {!done && <span className="chip ml-auto bg-copper-soft text-copper-deep">En cours</span>}
                </li>
              )
            })}
          </ul>
          <div className="mt-6 flex items-center justify-between font-mono text-xs text-ink-muted">
            <span>Progression</span>
            <span>3 / 4 modules</span>
          </div>
          <div className="mt-2 h-3 overflow-hidden rounded-full border-[1.5px] border-ink bg-stone">
            <div className="fill-bar h-full w-3/4 rounded-full bg-copper" />
          </div>
        </div>
      </div>

      <div className="absolute right-[2%] top-[38%] h-[128px] w-[128px] max-[520px]:hidden">
        <svg viewBox="0 0 160 160" className="h-full w-full">
          <defs>
            <path id="training-badge-circle" d="M80,80 m-63,0 a63,63 0 1,1 126,0 a63,63 0 1,1 -126,0" />
          </defs>
          <circle cx={80} cy={80} r={78} fill="#FFFFFF" stroke="#121614" strokeWidth={1.5} />
          <g className="spin-slow" style={{ transformOrigin: '80px 80px' }}>
            <text fontFamily="JetBrains Mono, ui-monospace, monospace" fontSize={11} fontWeight={500} fill="#121614">
              <textPath href="#training-badge-circle" textLength={392} lengthAdjust="spacing">
                ATTESTATION · FIBETECH · FORMATION ·{' '}
              </textPath>
            </text>
          </g>
          <circle cx={80} cy={80} r={40} fill="#B4532A" />
        </svg>
        <PathIcon name="cap" size={34} strokeWidth={1.8} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white" />
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */

function Catalogue({ c, trainings, onEnroll }: { c: BlockData<'training'>['catalogue']; trainings: TrainingItem[]; onEnroll: (slug: string) => void }) {
  return (
    <section id="catalogue" aria-labelledby="catalogue-title" className="py-[110px]">
      <div className="wrap flex flex-col gap-9">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex max-w-[720px] flex-col gap-[18px]">
            <span className="eyebrow text-copper">{c.eyebrow}</span>
            <h2 id="catalogue-title" className="text-[clamp(36px,4.4vw,58px)] font-extrabold">
              <RichTitle text={c.title} />
            </h2>
          </div>
        </div>

        <p role="status" className="-mb-3 font-mono text-[13px] text-ink-muted">
          {trainings.length} formation{trainings.length > 1 ? 's' : ''}
        </p>

        {trainings.length ? (
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,340px),1fr))] gap-7">
            {trainings.map((t) => (
              <li key={t.slug} className="pop-in">
                <TrainingCard c={c} training={t} onEnroll={onEnroll} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-start gap-3 rounded-[22px] border-[1.5px] border-dashed border-ink p-10">
            <p className="font-display text-[26px] font-bold">{c.emptyTitle}</p>
            <p className="text-ink-soft">{c.emptyText}</p>
          </div>
        )}
      </div>
    </section>
  )
}

function TrainingCard({ c, training: t, onEnroll }: { c: BlockData<'training'>['catalogue']; training: TrainingItem; onEnroll: (slug: string) => void }) {
  return (
    <article className="card lift flex h-full flex-col">
      <div className="flex items-start justify-between gap-4 px-7 pt-7">
        <span className={cn('grid h-14 w-14 place-items-center rounded-2xl border-[1.5px] border-ink', toneClass[t.tone] ?? toneClass.copper)}>
          <PathIcon name={t.icon} size={28} strokeWidth={1.7} />
        </span>
      </div>
      <div className="flex flex-col gap-2.5 px-7 pt-5">
        <span className="font-mono text-xs uppercase tracking-[0.12em] text-copper">{t.domain}</span>
        <h3 className="text-[25px] font-bold leading-[1.15]">{t.title}</h3>
        <p className="text-ink-soft">{t.text}</p>
        {t.audience && (
          <p className="text-[15px] text-ink-muted">
            <span className="font-semibold text-ink">{c.audienceLabel} </span>
            {t.audience}
          </p>
        )}
      </div>
      {t.modules.length > 0 && (
        <div className="px-7 pt-6">
          <h4 className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-ink-muted">{c.programLabel}</h4>
          <ul className="mt-3 flex flex-col gap-2">
            {t.modules.map((m) => (
              <li key={m} className="flex gap-2.5 text-[15px] leading-[1.45]">
                <Check size={18} className="mt-[2px] shrink-0 text-mal" />
                {m}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="mt-auto flex flex-col gap-4 px-7 pb-7 pt-6">
        <dl className="m-0 grid grid-cols-2 gap-3 border-t-[1.5px] border-line pt-5">
          <div className="flex flex-col gap-1">
            <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted">{c.durationLabel}</dt>
            <dd className="m-0 font-semibold">{t.duration}</dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted">{c.priceLabel}</dt>
            <dd className="m-0 font-semibold">{t.price}</dd>
          </div>
        </dl>
        <ul className="flex flex-wrap gap-1.5" aria-label="Formats disponibles">
          {t.formats.map((f) => (
            <li key={f} className="chip bg-stone text-[#2F3833]">
              {f}
            </li>
          ))}
        </ul>
        <Button arrow className="w-full justify-center" aria-label={`${c.button} : ${t.title}`} onClick={() => onEnroll(t.slug)}>
          {c.button}
        </Button>
      </div>
    </article>
  )
}

/* -------------------------------------------------------------------------- */

function Formats({ c }: { c: BlockData<'training'>['formats'] }) {
  if (!c.items.length) return null
  return (
    <section aria-labelledby="formats-title" className="border-y-[1.5px] border-ink bg-stone py-[110px]">
      <div className="wrap flex flex-col gap-10">
        <div className="flex max-w-[720px] flex-col gap-[18px]">
          <span className="eyebrow text-copper">{c.eyebrow}</span>
          <h2 id="formats-title" className="text-[clamp(36px,4.4vw,58px)] font-extrabold">
            <RichTitle text={c.title} />
          </h2>
        </div>
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-6">
          {c.items.map((f) => (
            <li key={f.title} className="card lift flex flex-col gap-4 p-8">
              <PathIcon name={f.icon} size={40} className="draw-icon text-copper" />
              <h3 className="text-[26px] font-bold">{f.title}</h3>
              <p className="text-ink-soft">{f.text}</p>
              <ul className="mt-1 flex flex-col gap-2.5 border-t-[1.5px] border-line pt-4">
                {f.points.map((point) => (
                  <li key={point} className="flex gap-2.5 text-[15px]">
                    <Check size={18} className="mt-[3px] shrink-0 text-mal" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Steps({ c }: { c: BlockData<'training'>['steps'] }) {
  if (!c.items.length) return null
  return (
    <section aria-labelledby="steps-title" className="border-t-[1.5px] border-ink bg-stone py-[110px]">
      <div className="wrap flex flex-col gap-10">
        <h2 id="steps-title" className="text-[clamp(34px,4.2vw,54px)] font-extrabold">
          <RichTitle text={c.title} />
        </h2>
        <ol className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,230px),1fr))] gap-6">
          {c.items.map((step, i) => (
            <li key={step.title} className="flex flex-col gap-2.5">
              <span className={cn('grid h-[52px] w-[52px] place-items-center rounded-full border-[1.5px] font-mono', i === c.items.length - 1 ? 'border-copper bg-copper text-white' : 'border-ink bg-white')}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-[22px] font-bold">{step.title}</h3>
              <p className="text-ink-soft">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function ForTeams({ c, site, tokens }: { c: BlockData<'training'>['teams']; site: SiteInfo; tokens: Record<string, string | number> }) {
  return (
    <section id="entreprises" aria-labelledby="teams-title" className="bg-ink py-[110px] text-white">
      <div className="wrap flex flex-wrap items-center gap-12">
        <div className="flex min-w-0 flex-[1_1_480px] flex-col gap-5">
          <span className="eyebrow text-copper-light">{c.eyebrow}</span>
          <h2 id="teams-title" className="text-[clamp(34px,4.4vw,60px)] font-extrabold">
            <RichTitle text={c.title} accentClassName="text-copper-light" />
          </h2>
          <p className="max-w-[560px] text-lg text-mal-fog">{c.text}</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <ButtonLink to="/contact" variant="light-cu" arrow>
              {c.button}
            </ButtonLink>
            <ButtonLink href={phoneHref(site.phone)} variant="line">
              {fill(c.callLabel, tokens)}
            </ButtonLink>
          </div>
        </div>
        {c.examples.length > 0 && (
          <div className="min-w-0 flex-[1_1_380px] rounded-[22px] border-[1.5px] border-[#2F3A35] bg-mal-panel p-8 max-[760px]:p-6">
            <h3 className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-mal-mist">{c.examplesTitle}</h3>
            <ul className="mt-4">
              {c.examples.map((example) => (
                <li key={example} className="flex items-center gap-3 border-b border-[#2F3A35] py-4 text-lg last:border-b-0">
                  <HorizonDot fill="#E8A07A" line="#3FBF8E" />
                  {example}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */

type Errors = Partial<Record<'course' | 'name' | 'phone' | 'consent' | 'form', string>>
const fieldIds: Record<Exclude<keyof Errors, 'form'>, string> = { course: 'i-formation', name: 'i-nom', phone: 'i-tel', consent: 'i-ok' }

type EnrollmentProps = {
  c: BlockData<'training'>['enrollment']
  site: SiteInfo
  trainings: TrainingItem[]
  formats: string[]
  course: string
  setCourse: (slug: string) => void
  format: string
  setFormat: (format: string) => void
}

function Enrollment({ c, site, trainings, formats, course, setCourse, format, setFormat }: EnrollmentProps) {
  const [errors, setErrors] = useState<Errors>({})
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState<{ title: string; format: string; people: number } | null>(null)
  const picked = trainings.find((t) => t.slug === course)

  // Un nouveau choix depuis le catalogue rouvre le formulaire.
  useEffect(() => setSent(null), [course])
  const available = picked?.formats.length ? picked.formats : formats

  const onCourseChange = (slug: string) => {
    setCourse(slug)
    const next = trainings.find((t) => t.slug === slug)
    if (next?.formats.length && !next.formats.includes(format)) setFormat(next.formats[0])
    setErrors((e) => ({ ...e, course: undefined }))
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const next: Errors = {}
    if (!course) next.course = 'Choisissez une formation, ou « Je ne sais pas encore ».'
    if (!String(data.get('nom') ?? '').trim()) next.name = 'Indiquez votre nom.'
    const phone = String(data.get('telephone') ?? '')
    if (!phone.trim()) next.phone = 'Indiquez un numéro pour vous rappeler.'
    else if (!isPhone(phone)) next.phone = 'Ce numéro semble incomplet. Exemple : +243 997 978 888.'
    if (!data.get('consentement')) next.consent = 'Cochez la case pour que nous puissions vous répondre.'
    setErrors(next)

    const firstError = (Object.keys(fieldIds) as (keyof typeof fieldIds)[]).find((key) => next[key])
    if (firstError) {
      document.getElementById(fieldIds[firstError])?.focus()
      return
    }

    const people = Math.min(200, Math.max(1, Number(data.get('participants')) || 1))
    setSending(true)
    const result = await sendJson('/api/inscriptions', {
      training: course,
      format,
      name: data.get('nom'),
      phone,
      email: data.get('email'),
      organisation: data.get('organisation'),
      participants: people,
      message: data.get('message'),
      consent: true,
      website: data.get('website'),
    })
    setSending(false)
    if (!result.ok) {
      setErrors({ ...(result.errors as Errors | undefined), form: result.message })
      return
    }
    setSent({ title: picked ? picked.title : c.adviceOption, format, people })
  }

  return (
    <section id="inscription" aria-labelledby="enroll-title" className="border-t-[1.5px] border-ink bg-stone py-[110px]">
      <div className="wrap flex flex-wrap items-start gap-10">
        <div className="flex min-w-0 flex-[1_1_340px] flex-col gap-5">
          <span className="eyebrow text-copper">{c.eyebrow}</span>
          <h2 id="enroll-title" className="text-[clamp(36px,4.4vw,58px)] font-extrabold">
            <RichTitle text={c.title} />
          </h2>
          <p className="text-lg text-ink-soft">{c.text}</p>

          {course === ADVICE ? (
            <div className="card reveal flex flex-col gap-1.5 p-6 text-[15px] text-ink-soft">
              <span className="font-display text-[22px] font-bold text-ink">{c.adviceTitle}</span>
              {c.adviceText}
            </div>
          ) : picked ? (
            <div key={picked.slug} className="card reveal flex flex-col gap-3 p-6">
              <span className="font-mono text-xs uppercase tracking-[0.12em] text-copper">{picked.domain}</span>
              <p className="font-display text-[22px] font-bold leading-[1.2]">{picked.title}</p>
              <p className="text-[15px] text-ink-muted">
                {picked.duration} · {picked.price} · {format}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-1.5 rounded-[22px] border-[1.5px] border-dashed border-ink p-6 text-[15px] text-ink-soft">
              <span className="font-semibold text-ink">{c.emptyTitle}</span>
              {c.emptyText}
            </div>
          )}

          <div className="flex flex-col gap-1 pt-2 text-[15px]">
            <span className="text-ink-muted">{c.phoneLabel}</span>
            <span className="font-mono text-lg">{site.phone}</span>
            <span className="pt-2 text-ink-muted">{c.whatsappLabel}</span>
            <span>{site.whatsapp}</span>
          </div>
        </div>

        <div className="card min-w-0 flex-[2_1_560px] p-[clamp(24px,4vw,48px)] shadow-[10px_10px_0_#121614]">
          {process.env.NEXT_PUBLIC_FIBETECH_STATIC === '1' ? (
            <div className="flex flex-col items-start gap-5 py-8">
              <h3 className="text-[clamp(26px,2.8vw,36px)] font-extrabold">{c.formTitle}</h3>
              <p className="max-w-[520px] text-lg text-ink-soft">Les inscriptions en ligne ne sont pas disponibles sur cette version statique. Contactez-nous pour choisir une formation et un format.</p>
              <div className="flex flex-wrap gap-3">
                <ButtonLink href={`mailto:${site.email}?subject=${encodeURIComponent('Inscription à une formation Fibetech')}`} arrow>Écrire à Fibetech</ButtonLink>
                <ButtonLink href={`https://wa.me/${site.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent('Bonjour, je souhaite des informations sur les formations Fibetech.')}`} variant="ghost" target="_blank" rel="noreferrer">WhatsApp</ButtonLink>
              </div>
            </div>
          ) : sent ? (
            <div role="status" className="pop-in flex flex-col items-start gap-5 py-8">
              <span className="grid h-[84px] w-[84px] place-items-center rounded-full bg-mal">
                <Check size={40} strokeWidth={2.6} className="check-draw text-white" />
              </span>
              <h3 className="text-[clamp(28px,3.2vw,42px)] font-extrabold">{c.successTitle}</h3>
              <p className="max-w-[520px] text-lg text-ink-soft">{c.successText}</p>
              <dl className="m-0 grid gap-2 text-[15px]">
                <div className="flex flex-wrap gap-x-3">
                  <dt className="text-ink-muted">Formation</dt>
                  <dd className="m-0 font-semibold">{sent.title}</dd>
                </div>
                <div className="flex flex-wrap gap-x-3">
                  <dt className="text-ink-muted">Format</dt>
                  <dd className="m-0 font-semibold">{sent.format}</dd>
                </div>
                <div className="flex flex-wrap gap-x-3">
                  <dt className="text-ink-muted">Participants</dt>
                  <dd className="m-0 font-semibold">{sent.people}</dd>
                </div>
              </dl>
              <Button variant="ghost" onClick={() => setSent(null)}>
                {c.again}
              </Button>
            </div>
          ) : (
            <form aria-labelledby="enroll-form-title" noValidate onSubmit={onSubmit} className="relative flex flex-col gap-[26px]">
              <div className="flex flex-col gap-1.5">
                <h3 id="enroll-form-title" className="text-[clamp(26px,2.8vw,36px)] font-extrabold">
                  {c.formTitle}
                </h3>
                <p className="text-[15px] text-ink-muted">Les champs marqués d’un astérisque sont obligatoires.</p>
              </div>

              <Field id="i-formation" label="Formation *" error={errors.course}>
                <div className="relative">
                  <select
                    id="i-formation"
                    name="formation"
                    className="input w-full cursor-pointer appearance-none pr-12"
                    value={course}
                    onChange={(e) => onCourseChange(e.target.value)}
                    aria-invalid={!!errors.course}
                    aria-describedby={errors.course ? 'i-formation-err' : undefined}
                  >
                    <option value="">Choisir une formation</option>
                    {trainings.map((t) => (
                      <option key={t.slug} value={t.slug}>
                        {t.title}
                      </option>
                    ))}
                    <option value={ADVICE}>{c.adviceOption}</option>
                  </select>
                  <svg aria-hidden="true" viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>
              </Field>

              <fieldset className="m-0 flex min-w-0 flex-col gap-3 border-0 p-0">
                <legend className="label mb-3 p-0">Format souhaité</legend>
                <div className="flex flex-wrap gap-2.5">
                  {available.map((option) => (
                    <label key={option} className="radio" htmlFor={`i-format-${option}`}>
                      <input type="radio" id={`i-format-${option}`} name="format" value={option} checked={format === option} onChange={() => setFormat(option)} />
                      {option}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-[18px]">
                <Field id="i-nom" label="Nom complet *" error={errors.name}>
                  <input className="input" id="i-nom" name="nom" type="text" maxLength={160} autoComplete="name" placeholder="Prénom et nom" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'i-nom-err' : undefined} />
                </Field>
                <Field id="i-tel" label="Téléphone ou WhatsApp *" error={errors.phone}>
                  <input className="input" id="i-tel" name="telephone" type="tel" maxLength={40} autoComplete="tel" placeholder="+243 …" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'i-tel-err' : undefined} />
                </Field>
                <Field id="i-mail" label="E-mail">
                  <input className="input" id="i-mail" name="email" type="email" maxLength={191} autoComplete="email" placeholder="vous@exemple.cd" />
                </Field>
                <Field id="i-org" label="Entreprise ou université">
                  <input className="input" id="i-org" name="organisation" type="text" maxLength={191} autoComplete="organization" placeholder="Facultatif" />
                </Field>
                <Field id="i-nb" label="Nombre de participants">
                  <input className="input" id="i-nb" name="participants" type="number" min={1} max={200} defaultValue={1} inputMode="numeric" />
                </Field>
              </div>

              <Field id="i-msg" label="Vos objectifs et attentes">
                <textarea className="input resize-y" id="i-msg" name="message" rows={4} maxLength={5000} placeholder="Ce que vous savez déjà faire, ce que vous voulez apprendre, vos disponibilités." />
              </Field>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="i-ok" className="flex items-start gap-3 text-[15px] text-ink-soft">
                  <input id="i-ok" name="consentement" type="checkbox" className="mt-0.5 h-5 w-5 accent-copper" aria-invalid={!!errors.consent} aria-describedby={errors.consent ? 'i-ok-err' : undefined} />
                  {c.consent}
                </label>
                {errors.consent && (
                  <p id="i-ok-err" className="text-sm font-semibold text-[#B42318]">
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
                  {sending ? 'Envoi…' : c.submit}
                </Button>
                <span className="text-sm text-ink-muted">{c.note}</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
