import { RichTitle } from '@/components/rich'
import { ButtonLink } from '@/components/ui/button'
import { phoneHref } from '@/lib/format'

type CtaBandProps = {
  title: string
  text: string
  eyebrow?: string
  cta?: string
  /** Numéro affiché sur le second bouton. */
  phone: string
}

/** Bandeau cuivre avec un soleil qui se lève derrière le texte. */
export function CtaBand({ title, text, eyebrow, cta = 'Demander un devis', phone }: CtaBandProps) {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden bg-copper pb-[150px] pt-[120px] text-white">
      <div aria-hidden="true" className="sunrise absolute bottom-[-560px] left-1/2 h-[820px] w-[820px] rounded-full bg-copper-dark" />
      <div aria-hidden="true" className="absolute bottom-16 left-0 right-0 h-[1.5px] bg-white/45" />
      <div className="wrap relative flex flex-col items-center gap-6 text-center">
        {eyebrow && <span className="eyebrow text-[#FFE6D6]">{eyebrow}</span>}
        <h2 id="cta-title" className="max-w-[900px] text-[clamp(38px,5.4vw,76px)] font-extrabold">
          <RichTitle text={title} accentClassName="text-[#FFE6D6]" />
        </h2>
        <p className="max-w-[560px] text-[19px] text-[#FFF1E8]">{text}</p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <ButtonLink to="/contact" variant="light" arrow>
            {cta}
          </ButtonLink>
          <ButtonLink href={phoneHref(phone)} variant="line">
            {phone}
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}

type InkCtaProps = {
  /** Titre : les *mots* entre astérisques sont mis en couleur. */
  title: string
  text?: string
  cta: string
  to?: string
  tone?: 'ink' | 'copper' | 'malachite'
}

/** Bandeau sombre avec un titre et un bouton. */
export function InkCta({ title, text, cta, to = '/contact', tone = 'ink' }: InkCtaProps) {
  const bg = tone === 'copper' ? 'bg-copper' : tone === 'malachite' ? 'bg-mal-deep' : 'bg-ink'
  return (
    <section aria-labelledby="ink-cta-title" className={`${bg} py-[110px] text-white`}>
      <div className="wrap flex flex-wrap items-center justify-between gap-8">
        <div className="flex max-w-[760px] flex-col gap-3.5">
          <h2 id="ink-cta-title" className="text-[clamp(36px,4.8vw,66px)] font-extrabold">
            <RichTitle text={title} accentClassName="text-copper-light" />
          </h2>
          {text && <p className="text-lg text-mal-fog">{text}</p>}
        </div>
        <ButtonLink to={to} variant="light-cu" arrow>
          {cta}
        </ButtonLink>
      </div>
    </section>
  )
}
