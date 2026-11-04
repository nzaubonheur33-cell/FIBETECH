import { Link } from 'react-router-dom'
import { ProjectVisual, projectBackgrounds } from '@/components/illustrations/mocks'
import { Ph } from '@/components/ui/placeholder'
import type { Project } from '@/data/projects'
import { cn } from '@/lib/utils'

type ProjectCardProps = {
  project: Project
  headingLevel?: 'h2' | 'h3'
  showSector?: boolean
  className?: string
}

export function ProjectCard({ project, headingLevel = 'h3', showSector = false, className }: ProjectCardProps) {
  const Heading = headingLevel
  return (
    <Link to={project.href} className={cn('card lift flex h-full flex-col overflow-hidden text-ink no-underline hover:text-ink', className)}>
      <div aria-hidden="true" className="h-[280px] overflow-hidden border-b-[1.5px] border-ink" style={{ background: projectBackgrounds[project.kind] }}>
        <div className="zoom grid h-full w-full place-items-center">
          <ProjectVisual kind={project.kind} />
        </div>
      </div>
      <div className="flex flex-grow flex-col gap-2.5 px-[26px] pb-7 pt-6">
        <div className="flex flex-wrap gap-2">
          <span className="chip bg-copper-soft text-copper-deep">Projet exemple</span>
          <span className="chip bg-stone text-[#2F3833]">{project.cat}</span>
        </div>
        <Heading className="title-hover text-[24px] font-bold">{project.title}</Heading>
        <p className="flex-grow text-base text-ink-soft">
          {project.text}
          {!showSector && (
            <>
              {' '}
              Client : <Ph>[Nom du client]</Ph>
            </>
          )}
        </p>
        {showSector && (
          <p className="text-sm text-ink-muted">
            Client : <Ph>[Nom du client]</Ph> · {project.sector}
          </p>
        )}
      </div>
    </Link>
  )
}
