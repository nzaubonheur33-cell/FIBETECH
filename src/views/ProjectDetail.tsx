import Link from 'next/link'
import { CtaBand } from '@/components/layout/CtaBand'
import { RichTitle } from '@/components/rich'
import { ButtonLink } from '@/components/ui/button'
import { Check, HorizonDot } from '@/components/ui/icons'
import type { BlockData } from '@/content/blocks'
import type { ProjectItem } from '@/content/types'
import { imageUrl } from '@/lib/images'

export default function ProjectDetail({ project, c, phone }: { project: ProjectItem; c: BlockData<'project'>; phone: string }) {
  const cover = imageUrl(project.image, { w: 1800 })
  const gallery = project.gallery.filter((item) => imageUrl(item.image))

  return (
    <>
      <article>
        <header className="py-[72px]">
          <div className="wrap flex flex-col gap-7">
            <nav aria-label="Fil d’Ariane" className="flex flex-wrap gap-2 font-mono text-[13px] text-ink-muted">
              <Link href="/realisations" className="text-ink-muted">
                {c.breadcrumb}
              </Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page" className="text-ink">
                {project.title}
              </span>
            </nav>
            <div className="flex flex-wrap gap-2">
              <span className="chip bg-copper-soft text-copper-deep">{c.badge}</span>
              {project.category && <span className="chip bg-stone text-[#2F3833]">{project.category}</span>}
              {project.sector && <span className="chip bg-stone text-[#2F3833]">{project.sector}</span>}
            </div>
            <h1 className="max-w-[1040px] text-[clamp(42px,6vw,88px)] font-extrabold leading-[0.96] tracking-[-0.04em]">{project.title}</h1>
            <p className="max-w-[780px] text-xl text-ink-soft">{project.summary || project.text}</p>
            <ButtonLink to="/contact" arrow>
              {c.cta}
            </ButtonLink>
          </div>
        </header>

        {cover && (
          <figure className="wrap m-0">
            <img src={cover} alt={`${project.title} — illustration du secteur ${project.sector}`} className="h-[min(62vw,620px)] min-h-[300px] w-full rounded-[26px] border-[1.5px] border-ink object-cover" />
            {c.imageCaption && <figcaption className="py-3 text-sm text-ink-muted">{c.imageCaption}</figcaption>}
          </figure>
        )}

        {project.challenge && (
          <section aria-labelledby="challenge-title" className="py-[90px]">
            <div className="wrap flex flex-wrap gap-10">
              <h2 id="challenge-title" className="eyebrow min-w-[190px] text-copper">
                {c.challenge.eyebrow}
              </h2>
              <div className="max-w-[800px]">
                <p className="font-display text-[clamp(25px,3vw,38px)] font-semibold leading-tight">{project.challenge}</p>
                {c.challenge.note && <p className="mt-5 text-lg text-ink-soft">{c.challenge.note}</p>}
              </div>
            </div>
          </section>
        )}

        {(project.approach || project.features.length > 0) && (
          <section aria-labelledby="approach-title" className="border-y-[1.5px] border-ink bg-stone py-[100px]">
            <div className="wrap flex flex-wrap items-start gap-12">
              <div className="min-w-0 flex-[1_1_330px]">
                <span className="eyebrow text-copper">{c.approach.eyebrow}</span>
                <h2 id="approach-title" className="mt-4 text-[clamp(34px,4.2vw,56px)] font-extrabold">
                  <RichTitle text={c.approach.title} />
                </h2>
                <p className="mt-5 text-lg text-ink-soft">{project.approach}</p>
              </div>
              <ul className="grid min-w-0 flex-[1.4_1_550px] grid-cols-[repeat(auto-fit,minmax(min(100%,230px),1fr))] gap-4">
                {project.features.map((feature) => (
                  <li key={feature.title} className="card flex flex-col gap-3 p-6">
                    <Check className="text-mal" />
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                    <p className="text-sm text-ink-soft">{feature.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {project.stages.length > 0 && (
          <section aria-labelledby="steps-title" className="py-[100px]">
            <div className="wrap flex flex-col gap-10">
              <div className="max-w-[700px]">
                <span className="eyebrow text-copper">{c.stages.eyebrow}</span>
                <h2 id="steps-title" className="mt-4 text-[clamp(34px,4.2vw,56px)] font-extrabold">
                  <RichTitle text={c.stages.title} />
                </h2>
              </div>
              <ol className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-5">
                {project.stages.map((stage, index) => (
                  <li key={stage} className="border-t-[1.5px] border-ink pt-5">
                    <span className="font-mono text-sm text-copper">{String(index + 1).padStart(2, '0')}</span>
                    <p className="mt-3 text-lg font-semibold">{stage}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}

        {gallery.length > 0 && (
          <section aria-labelledby="gallery-title" className="bg-ink py-[100px] text-white">
            <div className="wrap flex flex-col gap-9">
              <div>
                <span className="eyebrow text-copper-light">{c.gallery.eyebrow}</span>
                <h2 id="gallery-title" className="mt-4 text-[clamp(34px,4.2vw,56px)] font-extrabold">
                  <RichTitle text={c.gallery.title} accentClassName="text-copper-light" />
                </h2>
              </div>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-5">
                {gallery.map((item, index) => (
                  <figure key={`${item.image}-${index}`} className="m-0 overflow-hidden rounded-2xl border border-white/15">
                    <img src={imageUrl(item.image, { w: 900 })} alt={`${project.title} — ${item.caption}`} loading="lazy" className="h-[260px] w-full object-cover transition-transform duration-500 hover:scale-[1.03]" />
                    {item.caption && <figcaption className="px-4 py-3 text-sm text-mal-fog">{item.caption}</figcaption>}
                  </figure>
                ))}
              </div>
              {c.gallery.note && <p className="text-sm text-mal-mist">{c.gallery.note}</p>}
            </div>
          </section>
        )}

        <section aria-labelledby="next-title" className="py-[90px]">
          <div className="wrap flex flex-wrap items-center justify-between gap-7">
            <div>
              <span className="eyebrow text-copper">{c.next.eyebrow}</span>
              <h2 id="next-title" className="mt-3 max-w-3xl text-[clamp(32px,4vw,52px)] font-extrabold">
                <RichTitle text={c.next.title} />
              </h2>
            </div>
            <ButtonLink to="/contact" arrow>
              {c.next.button}
            </ButtonLink>
          </div>
        </section>
      </article>
      <CtaBand eyebrow={c.band.eyebrow} title={c.band.title} text={c.band.text} cta={c.band.button} phone={phone} />
      <nav aria-label="Retour aux réalisations" className="border-t-[1.5px] border-ink py-6">
        <div className="wrap">
          <Link className="link" href="/realisations">
            <HorizonDot className="mr-2" />
            {c.back}
          </Link>
        </div>
      </nav>
    </>
  )
}
