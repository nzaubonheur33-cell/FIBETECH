import Link from 'next/link'
import { RichInline, RichText } from '@/components/rich'
import { ButtonLink } from '@/components/ui/button'
import { HorizonDot } from '@/components/ui/icons'
import type { BlockData } from '@/content/blocks'
import type { PostItem } from '@/content/types'
import { formatDate, type Tokens } from '@/lib/format'
import { imageUrl } from '@/lib/images'

export default function BlogArticle({ post, c, tokens }: { post: PostItem; c: BlockData<'blog'>; tokens: Tokens }) {
  const cover = imageUrl(post.image, { w: 1800 })
  const meta = [formatDate(post.publishedAt), post.readTime].filter(Boolean)

  return (
    <article>
      <header className="pb-12 pt-[72px]">
        <div className="wrap flex max-w-[980px] flex-col gap-6">
          <nav aria-label="Fil d’Ariane" className="flex flex-wrap gap-2 font-mono text-[13px] text-ink-muted">
            <Link href="/blog" className="text-ink-muted">
              {c.hero.eyebrow}
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-ink">
              {post.category || post.title}
            </span>
          </nav>
          <div className="flex flex-wrap items-center gap-2">
            {post.category && <span className="chip bg-copper-soft text-copper-deep">{post.category}</span>}
            {meta.length > 0 && (
              <span className="font-mono text-[13px] text-ink-muted">
                {meta.map((part, i) => (
                  <span key={i}>
                    {i > 0 && ' · '}
                    <RichInline text={part} />
                  </span>
                ))}
              </span>
            )}
          </div>
          <h1 className="text-[clamp(38px,5.4vw,72px)] font-extrabold leading-[1] tracking-[-0.04em]">{post.title}</h1>
          <p className="text-xl text-ink-soft">{post.excerpt}</p>
        </div>
      </header>

      {cover && (
        <figure className="wrap m-0">
          <img src={cover} alt={`Illustration : ${post.title}`} className="h-[min(56vw,560px)] min-h-[260px] w-full rounded-[26px] border-[1.5px] border-ink object-cover" />
        </figure>
      )}

      <div className="wrap max-w-[780px] py-[80px]">
        {post.body.trim() ? (
          <RichText text={post.body} tokens={tokens} className="legal-copy flex flex-col gap-5 text-[18px] leading-8 text-ink-soft" />
        ) : (
          <p className="rounded-2xl border border-copper/40 bg-copper-soft p-5 text-ink">{c.article.draftNote}</p>
        )}
      </div>

      <section className="border-t-[1.5px] border-ink bg-stone py-[72px]">
        <div className="wrap flex flex-wrap items-center justify-between gap-6">
          <p className="font-display text-[clamp(24px,2.6vw,34px)] font-bold">{c.article.ctaTitle}</p>
          <div className="flex flex-wrap items-center gap-5">
            <Link className="link" href="/blog">
              <HorizonDot className="mr-2" />
              {c.article.back}
            </Link>
            <ButtonLink to="/contact" arrow>
              {c.article.ctaButton}
            </ButtonLink>
          </div>
        </div>
      </section>
    </article>
  )
}
