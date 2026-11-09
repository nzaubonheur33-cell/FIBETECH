'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useNewsletter } from '@/components/layout/useNewsletter'
import { RichInline, RichTitle } from '@/components/rich'
import { Honeypot } from '@/components/ui/field'
import { ArrowRight } from '@/components/ui/icons'
import type { BlockData } from '@/content/blocks'
import type { PostItem } from '@/content/types'
import { formatDate } from '@/lib/format'
import { imageUrl } from '@/lib/images'

function PostMeta({ post, small = false }: { post: PostItem; small?: boolean }) {
  const parts = [formatDate(post.publishedAt), post.readTime].filter(Boolean)
  if (!parts.length) return null
  return (
    <span className={small ? 'font-mono text-xs text-ink-muted' : 'font-mono text-[13px] text-ink-muted'}>
      {parts.map((part, i) => (
        <span key={i}>
          {i > 0 && ' · '}
          <RichInline text={part} />
        </span>
      ))}
    </span>
  )
}

export default function Blog({ c, posts }: { c: BlockData<'blog'>; posts: PostItem[] }) {
  const [category, setCategory] = useState(c.allLabel)
  const newsletter = useNewsletter('blog')
  const categories = [c.allLabel, ...Array.from(new Set(posts.map((post) => post.category).filter(Boolean)))]
  const featured = posts.find((post) => post.featured)
  const others = posts.filter((post) => post !== featured)
  const visible = others.filter((post) => category === c.allLabel || post.category === category)
  const showFeatured = featured && (category === c.allLabel || category === featured.category)

  return (
    <>
      <section aria-labelledby="page-title" className="pb-10 pt-24">
        <div className="wrap flex flex-col gap-[26px]">
          <span className="eyebrow rise text-copper">{c.hero.eyebrow}</span>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h1 id="page-title" className="rise d1 max-w-[900px] text-[clamp(42px,6vw,86px)] font-extrabold leading-[0.96] tracking-[-0.04em]">
              <RichTitle text={c.hero.title} />
            </h1>
            <p className="rise d2 max-w-[360px] text-lg text-ink-soft">{c.hero.text}</p>
          </div>
          {categories.length > 2 && (
            <div className="rise d3 flex flex-wrap gap-2.5 pt-3" role="group" aria-label="Filtrer les articles">
              {categories.map((cat) => (
                <button key={cat} type="button" className="chipbtn" aria-pressed={category === cat} onClick={() => setCategory(cat)}>
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {showFeatured && featured && (
        <section aria-label="Article à la une" className="pb-14 pt-6">
          <div className="wrap">
            <Link href={`/blog/${featured.slug}`} className="card lift flex flex-wrap overflow-hidden text-ink no-underline hover:text-ink">
              <div aria-hidden="true" className="relative min-h-[420px] min-w-0 flex-[1_1_520px] overflow-hidden border-ink bg-mal min-[1000px]:border-r-[1.5px] max-[999px]:border-b-[1.5px] max-[760px]:min-h-[280px]">
                {imageUrl(featured.image) && <img src={imageUrl(featured.image, { w: 1200 })} alt="" className="absolute inset-0 h-full w-full object-cover" />}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
                <span className="absolute left-6 top-6 rounded-full bg-white px-3 py-1.5 font-mono text-xs">{c.featuredBadge}</span>
              </div>
              <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-[18px] p-11 max-[760px]:p-7">
                <div className="flex flex-wrap items-center gap-2">
                  {featured.category && <span className="chip bg-copper-soft text-copper-deep">{featured.category}</span>}
                  <PostMeta post={featured} />
                </div>
                <h2 className="title-hover text-[clamp(30px,3.2vw,46px)] font-extrabold">{featured.title}</h2>
                <p className="text-lg text-ink-soft">{featured.excerpt}</p>
                <span className="mt-auto inline-flex items-center gap-2 font-semibold">
                  {c.readMore} <ArrowRight />
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      <section aria-label="Tous les articles" className="pb-[120px] pt-6">
        <div className="wrap">
          {!posts.length && <p className="text-lg text-ink-soft">{c.empty}</p>}
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,340px),1fr))] gap-7">
            {visible.map((post) => (
              <li key={post.slug} className="pop-in">
                <Link href={`/blog/${post.slug}`} className="card lift flex h-full flex-col overflow-hidden text-ink no-underline hover:text-ink">
                  <div className="h-[210px] overflow-hidden border-b-[1.5px] border-ink bg-stone">
                    {imageUrl(post.image) && (
                      <img src={imageUrl(post.image, { w: 900, h: 600, q: 80 })} alt={`Illustration : ${post.title}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.04]" />
                    )}
                  </div>
                  <div className="flex flex-grow flex-col gap-3 px-[26px] pb-7 pt-6">
                    <div className="flex flex-wrap items-center gap-2">
                      {post.category && <span className="chip bg-stone text-[#2F3833]">{post.category}</span>}
                      <PostMeta post={post} small />
                    </div>
                    <h2 className="title-hover text-2xl font-bold">{post.title}</h2>
                    <p className="flex-grow text-base text-ink-soft">{post.excerpt}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="nl-title" className="bg-mal-deep py-[110px] text-white">
        <div className="wrap flex flex-wrap items-center justify-between gap-10">
          <div className="flex min-w-0 flex-[1_1_460px] flex-col gap-3.5">
            <span className="eyebrow text-copper-light">{c.newsletter.eyebrow}</span>
            <h2 id="nl-title" className="text-[clamp(34px,4.2vw,58px)] font-extrabold">
              <RichTitle text={c.newsletter.title} accentClassName="text-copper-light" />
            </h2>
            <p className="text-lg text-mal-fog">{c.newsletter.text}</p>
          </div>
          {process.env.NEXT_PUBLIC_FIBETECH_STATIC === '1' ? (
            <p className="max-w-[420px] text-sm text-mal-mist">
              Inscription à la lettre indisponible sur cette version statique. <Link className="underline underline-offset-4" href="/contact">Contactez-nous</Link> pour recevoir nos conseils.
            </p>
          ) : (
          <form aria-label="Inscription à la lettre" className="relative flex min-w-0 flex-[1_1_420px] flex-col gap-2.5" onSubmit={newsletter.onSubmit}>
            <label htmlFor="blog-email" className="font-semibold">
              {c.newsletter.label}
            </label>
            {newsletter.state === 'done' ? (
              <p role="status" className="reveal text-lg text-mal-glow">
                {c.newsletter.success}
              </p>
            ) : (
              <>
                <div className="flex flex-wrap gap-2.5">
                  <input
                    id="blog-email"
                    name="email"
                    type="email"
                    required
                    maxLength={191}
                    placeholder="vous@entreprise.cd"
                    autoComplete="email"
                    className="min-h-14 min-w-0 flex-[1_1_220px] rounded-full border-[1.5px] border-[#3D5A50] bg-mal-panel px-5 text-base text-white placeholder:text-mal-mist"
                  />
                  <button type="submit" className="btn btn-cu-light min-h-14" disabled={newsletter.state === 'sending'}>
                    {c.newsletter.button}
                  </button>
                </div>
                <Honeypot />
                {newsletter.error && (
                  <p role="alert" className="text-sm font-semibold text-copper-light">
                    {newsletter.error}
                  </p>
                )}
              </>
            )}
          </form>
          )}
        </div>
      </section>
    </>
  )
}
