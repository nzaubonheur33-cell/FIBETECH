'use client'

import { useState } from 'react'
import { ProjectCard } from '@/components/ProjectCard'
import { RichTitle } from '@/components/rich'
import { ButtonLink } from '@/components/ui/button'
import type { BlockData } from '@/content/blocks'
import type { ProjectItem } from '@/content/types'

export default function Work({ c, projects }: { c: BlockData<'work'>; projects: ProjectItem[] }) {
  const [filter, setFilter] = useState('tous')
  const visible = projects.filter((project) => filter === 'tous' || project.filter === filter)
  // Un filtre sans projet n'est pas affiché (sauf « Tous »).
  const filters = c.filters.filter((item) => item.value === 'tous' || projects.some((p) => p.filter === item.value))

  return (
    <>
      <section aria-labelledby="page-title" className="pb-12 pt-24">
        <div className="wrap flex flex-col gap-[26px]">
          <span className="eyebrow rise text-copper">{c.hero.eyebrow}</span>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h1 id="page-title" className="rise d1 max-w-[860px] text-[clamp(42px,6vw,86px)] font-extrabold leading-[0.96] tracking-[-0.04em]">
              <RichTitle text={c.hero.title} />
            </h1>
            <p className="rise d2 max-w-[380px] text-lg text-ink-soft">{c.hero.text}</p>
          </div>
          {filters.length > 1 && (
            <div className="rise d3 flex flex-wrap gap-2.5 pt-4" role="group" aria-label="Filtrer par type de projet">
              {filters.map((item) => {
                const count = item.value === 'tous' ? projects.length : projects.filter((p) => p.filter === item.value).length
                return (
                  <button key={item.value} type="button" className="chipbtn" aria-pressed={filter === item.value} onClick={() => setFilter(item.value)}>
                    {item.label} <span className="font-mono text-xs opacity-70">{count}</span>
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </section>

      <section aria-label="Liste des projets" className="pb-[120px] pt-6">
        <div className="wrap">
          <p role="status" className="sr-only-label">
            {visible.length} projet{visible.length > 1 ? 's' : ''} affiché{visible.length > 1 ? 's' : ''}
          </p>
          {projects.length === 0 && (
            <p className="rounded-[22px] border-[1.5px] border-dashed border-ink p-10 text-lg text-ink-soft">{c.empty}</p>
          )}
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,360px),1fr))] gap-7">
            {visible.map((project) => (
              <li key={project.slug} className="pop-in">
                <ProjectCard project={project} headingLevel="h2" showSector />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="cta-title" className="bg-copper py-[110px] text-white">
        <div className="wrap flex flex-wrap items-center justify-between gap-8">
          <h2 id="cta-title" className="max-w-[760px] text-[clamp(36px,4.8vw,66px)] font-extrabold">
            <RichTitle text={c.cta.title} accentClassName="text-[#FFE6D6]" />
          </h2>
          <ButtonLink to="/contact" variant="light" arrow>
            {c.cta.button}
          </ButtonLink>
        </div>
      </section>
    </>
  )
}
