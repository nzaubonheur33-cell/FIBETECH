import { getBlock, getPosts } from '@/lib/content'
import { pageMetadata } from '@/lib/format'
import Blog from '@/views/Blog'

export async function generateMetadata() {
  return pageMetadata((await getBlock('blog')).meta)
}

export default async function BlogPage() {
  const [c, posts] = await Promise.all([getBlock('blog'), getPosts()])
  return <Blog c={c} posts={posts} />
}
