import Link from 'next/link'
import { RichTitle } from '@/components/rich'
import { ButtonLink } from '@/components/ui/button'
import type { BlockData } from '@/content/blocks'

export default function NotFound({ c }: { c: BlockData<'not-found'> }) {
  return (
    <section aria-labelledby="page-title" className="pb-24 pt-[72px]">
      <div className="wrap flex flex-col items-center gap-7 text-center">
        <div role="img" aria-label="Erreur 404" className="flex items-end justify-center gap-[clamp(6px,2vw,24px)] font-display text-[clamp(130px,22vw,300px)] font-extrabold leading-[0.8] tracking-[-0.06em]">
          <span className="wobble inline-block">4</span>
          <svg viewBox="0 0 200 200" className="h-[0.74em] w-[0.74em] overflow-hidden" aria-hidden="true">
            <circle cx={100} cy={150} r={96} fill="none" stroke="#121614" strokeWidth={4} strokeDasharray="6 14" />
            <g className="sunup-fast">
              <circle cx={100} cy={150} r={64} fill="#B4532A" />
            </g>
            <rect x={0} y={150} width={200} height={50} fill="#FFFFFF" />
            <path d="M0 150h200" stroke="#121614" strokeWidth={8} strokeLinecap="round" />
            <path d="M50 172h100M76 192h48" stroke="#121614" strokeWidth={5} strokeLinecap="round" />
          </svg>
          <span className="wobble inline-block [animation-delay:-2s]">4</span>
        </div>
        <h1 id="page-title" className="rise max-w-[760px] text-[clamp(32px,4.4vw,60px)] font-extrabold">
          <RichTitle text={c.title} />
        </h1>
        <p className="rise d1 max-w-[520px] text-[19px] text-ink-soft">{c.text}</p>
        <div className="rise d2 flex flex-wrap justify-center gap-3">
          <ButtonLink to="/">{c.homeButton}</ButtonLink>
          <ButtonLink to="/contact" variant="ghost">
            {c.reportButton}
          </ButtonLink>
        </div>
        {c.links.length > 0 && (
          <nav aria-label="Pages utiles" className="flex flex-col items-center gap-3.5 pt-6">
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-ink-muted">{c.usefulTitle}</span>
            <ul className="flex flex-wrap justify-center gap-2.5">
              {c.links.map((page) => (
                <li key={page.href}>
                  <Link className="pill" href={page.href}>
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </section>
  )
}
