import Link from 'next/link'
import { InkCta } from '@/components/layout/CtaBand'
import { ClinicChat, NetworkGraph } from '@/components/illustrations/mocks'
import { RichInline, RichTitle } from '@/components/rich'
import { ButtonLink } from '@/components/ui/button'
import { Check, PathIcon } from '@/components/ui/icons'
import type { BlockData } from '@/content/blocks'
import type { FaqEntry } from '@/content/types'

type Kind = 'reseau' | 'ia'

export default function ServiceDetail({ kind, c: item, faq }: { kind: Kind; c: BlockData<'service-reseau'>; faq: FaqEntry[] }) {
  return <>
    <section aria-labelledby="page-title" className="border-b-[1.5px] border-ink py-20">
      <div className="wrap flex flex-wrap items-center gap-14">
        <div className="flex min-w-0 flex-[1_1_520px] flex-col gap-6">
          <nav aria-label="Fil d’Ariane" className="flex gap-2 font-mono text-[13px] text-ink-muted"><Link href="/services" className="text-ink-muted">Services</Link><span>/</span><span aria-current="page" className="text-ink">{item.hero.breadcrumb}</span></nav>
          <span className="eyebrow text-copper">{item.hero.eyebrow}</span>
          <h1 id="page-title" className="text-[clamp(42px,5.6vw,80px)] font-extrabold leading-[0.96] tracking-[-0.04em]"><RichTitle text={item.hero.title} /></h1>
          <p className="max-w-[560px] text-xl text-ink-soft">{item.hero.text}</p>
          <div className="flex flex-wrap gap-3"><ButtonLink to="/contact" arrow>{item.hero.primaryCta}</ButtonLink><ButtonLink to="/tarifs" variant="ghost">{item.hero.secondaryCta}</ButtonLink></div>
        </div>
        <div aria-hidden="true" className="relative grid min-h-[360px] min-w-0 flex-[1_1_420px] place-items-center overflow-hidden rounded-[28px] border-[1.5px] border-ink bg-mal-deep p-10">
          {kind === 'reseau' ? <NetworkGraph className="w-full max-w-[400px]" /> : <div className="flex w-full flex-col items-center gap-7"><PathIcon name="ia" size={78} className="text-mal-glow" /><ClinicChat className="w-[88%] text-sm" /></div>}
          <span className="absolute bottom-5 right-5 chip border border-mal-glow bg-mal-deep text-mal-glow">{item.hero.eyebrow}</span>
        </div>
      </div>
    </section>
    <section aria-labelledby="included-title" className="py-[120px]"><div className="wrap flex flex-col gap-12"><div className="max-w-[760px]"><span className="eyebrow text-copper">{item.included.eyebrow}</span><h2 id="included-title" className="mt-4 text-[clamp(36px,4.6vw,62px)] font-extrabold"><RichTitle text={item.included.title} /></h2></div><ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,270px),1fr))] gap-5">{item.included.items.map((text) => <li key={text} className="card lift flex items-start gap-3 p-6"><Check className="mt-1 flex-none text-mal" /><span className="font-semibold">{text}</span></li>)}</ul></div></section>
    <section aria-labelledby="types-title" className="border-y-[1.5px] border-ink bg-stone py-[120px]"><div className="wrap flex flex-col gap-12"><div><span className="eyebrow text-copper">{item.types.eyebrow}</span><h2 id="types-title" className="mt-4 text-[clamp(36px,4.6vw,62px)] font-extrabold"><RichTitle text={item.types.title} /></h2></div><div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-5">{item.types.items.map((type) => <article key={type.title} className="card lift flex flex-col gap-4 p-7"><h3 className="text-2xl font-bold">{type.title}</h3><p className="text-ink-soft">{type.text}</p><ul className="mt-auto flex flex-col gap-2 border-t border-line pt-4">{type.details.map(detail=><li key={detail} className="flex gap-2 text-sm text-ink-soft"><Check className="mt-0.5 h-4 w-4 flex-none text-mal"/>{detail}</li>)}</ul></article>)}</div></div></section>
    <section aria-labelledby="outcomes-title" className="bg-mal-deep py-[100px] text-white"><div className="wrap flex flex-wrap items-start gap-12"><div className="min-w-0 flex-[1_1_350px]"><span className="eyebrow text-copper-light">{item.outcomes.eyebrow}</span><h2 id="outcomes-title" className="mt-4 text-[clamp(36px,4.4vw,58px)] font-extrabold"><RichTitle text={item.outcomes.title} accentClassName="text-copper-light" /></h2></div><ul className="flex min-w-0 flex-[1_1_420px] flex-col gap-4">{item.outcomes.items.map(outcome=><li key={outcome} className="flex items-center gap-3 border-b border-white/15 pb-4 text-lg"><Check className="flex-none text-mal-glow"/>{outcome}</li>)}</ul></div></section>
    <section aria-labelledby="steps-title" className="py-[110px]"><div className="wrap flex flex-col gap-12"><div className="max-w-[720px]"><span className="eyebrow text-copper">{item.method.eyebrow}</span><h2 id="steps-title" className="mt-4 text-[clamp(34px,4.2vw,56px)] font-extrabold"><RichTitle text={item.method.title} /></h2></div><ol className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,230px),1fr))] gap-5">{item.method.items.map((stage,index)=><li key={stage.title} className="card flex flex-col gap-3 p-6"><span className="font-mono text-sm text-copper">{String(index + 1).padStart(2, '0')}</span><h3 className="text-xl font-bold">{stage.title}</h3><p className="text-[15px] text-ink-soft">{stage.text}</p></li>)}</ol><div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl border-[1.5px] border-ink bg-stone p-7"><p className="max-w-2xl text-ink-soft"><RichInline text={item.method.note} /></p><ButtonLink to="/contact" arrow>{item.method.button}</ButtonLink></div></div></section>
    <section aria-labelledby="faq-title" className="border-t-[1.5px] border-ink bg-stone py-[100px]"><div className="wrap flex flex-wrap gap-12"><div className="min-w-0 flex-[1_1_300px]"><span className="eyebrow text-copper">{item.faq.eyebrow}</span><h2 id="faq-title" className="mt-4 text-[clamp(34px,4.2vw,54px)] font-extrabold"><RichTitle text={item.faq.title} /></h2></div><div className="min-w-0 flex-[2_1_560px]">{faq.map((entry)=><details key={entry.question} className="border-b border-ink/20 py-5"><summary className="cursor-pointer font-semibold">{entry.question}</summary><p className="mb-0 mt-3 text-ink-soft"><RichInline text={entry.answer} /></p></details>)}</div></div></section>
    <InkCta title={item.cta.title} text={item.cta.text} cta={item.cta.button} />
  </>
}
