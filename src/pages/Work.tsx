import { useState } from 'react'
import { ProjectCard } from '@/components/ProjectCard'
import { ButtonLink } from '@/components/ui/button'
import { projectFilters, projects, type ProjectFilter } from '@/data/projects'
import { usePageMeta } from '@/hooks/usePageMeta'
import { routes } from '@/lib/routes'

export default function Work() {
  usePageMeta('Réalisations', 'Projets web, mobiles, IA, réseaux et assistance informatique réalisés par Fibetech à Lubumbashi.')
  const [filter, setFilter] = useState<ProjectFilter | 'tous'>('tous')
  const visible = projects.filter((project) => filter === 'tous' || project.filter === filter)

  return (
    <>
      <section aria-labelledby="page-title" className="pb-12 pt-24">
        <div className="wrap flex flex-col gap-[26px]">
          <span className="eyebrow rise text-copper">Réalisations</span>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h1 id="page-title" className="rise d1 max-w-[860px] text-[clamp(42px,6vw,86px)] font-extrabold leading-[0.96] tracking-[-0.04em]">
              Des projets concrets, <span className="text-copper">pour des gens d’ici.</span>
            </h1>
            <p className="rise d2 max-w-[380px] text-lg text-ink-soft">Chaque fiche raconte le problème de départ, la solution et ce qui a changé pour le client.</p>
          </div>
          <div className="rise d3 flex flex-wrap gap-2.5 pt-4" role="group" aria-label="Filtrer par type de projet">
            {projectFilters.map((item) => {
              const count = item.key === 'tous' ? projects.length : projects.filter((p) => p.filter === item.key).length
              return (
                <button key={item.key} type="button" className="chipbtn" aria-pressed={filter === item.key} onClick={() => setFilter(item.key)}>
                  {item.label} <span className="font-mono text-xs opacity-70">{count}</span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      <section aria-label="Liste des projets" className="pb-[120px] pt-6">
        <div className="wrap">
          <p role="status" className="sr-only-label">
            {visible.length} projet{visible.length > 1 ? 's' : ''} affiché{visible.length > 1 ? 's' : ''}
          </p>
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
            Le prochain projet sur cette page pourrait être le vôtre.
          </h2>
          <ButtonLink to={routes.contact} variant="light" arrow>
            Parler de mon projet
          </ButtonLink>
        </div>
      </section>
    </>
  )
}
