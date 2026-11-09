import Link from 'next/link'
import type { ProjectItem } from '@/content/types'
import { imageUrl } from '@/lib/images'
import { cn } from '@/lib/utils'

type ProjectCardProps = {
  project: ProjectItem
  headingLevel?: 'h2' | 'h3'
  showSector?: boolean
  className?: string
}

export function ProjectCard({ project, headingLevel = 'h3', showSector = false, className }: ProjectCardProps) {
  const Heading = headingLevel
  const image = imageUrl(project.image, { w: 1000 })
  return (
    <Link href={`/realisations/${project.slug}`} className={cn('card lift flex h-full flex-col overflow-hidden text-ink no-underline hover:text-ink', className)}>
      <div
        aria-hidden="true"
        className="h-[280px] overflow-hidden border-b-[1.5px] border-ink bg-stone bg-cover bg-center"
        style={image ? { backgroundImage: `linear-gradient(180deg, transparent 45%, rgba(18,22,20,.38)), url("${image}")` } : undefined}
      />
      <div className="flex flex-grow flex-col gap-2.5 px-[26px] pb-7 pt-6">
        <div className="flex flex-wrap gap-2">
          <span className="chip bg-stone text-[#2F3833]">{project.category}</span>
        </div>
        <Heading className="title-hover text-[24px] font-bold">{project.title}</Heading>
        <p className="flex-grow text-base text-ink-soft">
          {project.text}
          {!showSector && project.sector && <> Client : {project.sector}</>}
        </p>
        {showSector && <p className="text-sm text-ink-muted">{project.sector}</p>}
      </div>
    </Link>
  )
}
