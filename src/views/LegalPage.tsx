import Link from 'next/link'
import { RichInline, RichText } from '@/components/rich'
import { ButtonLink } from '@/components/ui/button'
import type { BlockData } from '@/content/blocks'
import type { Tokens } from '@/lib/format'

export default function LegalPage({ page, tokens }: { page: BlockData<'legal'>; tokens: Tokens }) {
  return (
    <>
      <header className="border-b-[1.5px] border-ink bg-stone py-20">
        <div className="wrap flex flex-col gap-5">
          <Link href="/" className="link self-start">
            {page.back}
          </Link>
          <span className="eyebrow text-copper">{page.eyebrow}</span>
          <h1 className="max-w-[980px] text-[clamp(42px,6vw,82px)] font-extrabold leading-[0.96] tracking-[-0.04em]">{page.title}</h1>
          <p className="max-w-[720px] text-xl text-ink-soft">{page.intro}</p>
        </div>
      </header>
      <div className="py-[80px]">
        <div className="wrap flex flex-col gap-5">
          {page.notice && (
            <aside className="rounded-2xl border border-copper/40 bg-copper-soft p-5 text-sm text-ink">
              <RichInline text={page.notice} tokens={tokens} />
            </aside>
          )}
          {page.sections.map((section, index) => (
            <section key={`${section.title}-${index}`} className="grid grid-cols-[minmax(0,1fr)] gap-4 border-b border-line py-7 min-[760px]:grid-cols-[240px_minmax(0,1fr)] min-[760px]:gap-10">
              <div>
                <span className="font-mono text-xs text-copper">{String(index + 1).padStart(2, '0')}</span>
                <h2 className="mt-2 text-2xl font-bold">{section.title}</h2>
              </div>
              <RichText text={section.body} tokens={tokens} className="legal-copy text-[16px] leading-7 text-ink-soft" />
            </section>
          ))}
          <div className="flex flex-wrap items-center justify-between gap-5 pt-6">
            <span className="text-sm text-ink-muted">{page.updated}</span>
            <ButtonLink to="/contact">{page.button}</ButtonLink>
          </div>
        </div>
      </div>
    </>
  )
}
