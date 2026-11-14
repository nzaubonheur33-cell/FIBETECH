import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getBlock, getProject, getProjects, getSite } from '@/lib/content'
import ProjectDetail from '@/views/ProjectDetail'

type Props = { params: Promise<{ slug: string }> }

// Avec le serveur, les pages sont rendues à la demande : un élément ajouté depuis l'admin
// est disponible tout de suite. scripts/build-static.mjs retire `dynamic` et passe `dynamicParams` à false
// pour l'export statique, qui ne connaît que les éléments présents au moment du build.
export const dynamic = 'force-dynamic'
export const dynamicParams = true

export async function generateStaticParams() {
  if (process.env.FIBETECH_STATIC_FRONTEND !== '1') return []
  return (await getProjects()).map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProject((await params).slug)
  if (!project) return { title: 'Projet introuvable' }
  return { title: project.title, description: project.text }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const [project, c, site] = await Promise.all([getProject(slug), getBlock('project'), getSite()])
  if (!project) notFound()
  return <ProjectDetail project={project} c={c} phone={site.phone} />
}
