import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getBlock, getPost, getPosts, getSite } from '@/lib/content'
import { siteTokens } from '@/lib/format'
import BlogArticle from '@/views/BlogArticle'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export async function generateStaticParams() {
  return (await getPosts()).map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost((await params).slug)
  if (!post) return { title: 'Article introuvable' }
  return { title: post.title, description: post.excerpt }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const [post, c, site] = await Promise.all([getPost(slug), getBlock('blog'), getSite()])
  if (!post) notFound()
  return <BlogArticle post={post} c={c} tokens={siteTokens(site)} />
}
