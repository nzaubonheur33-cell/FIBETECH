import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from '@/components/ui/icons'
import { Ph } from '@/components/ui/placeholder'
import { featuredPost, postCategories, posts, type PostCategory } from '@/data/posts'
import { usePageMeta } from '@/hooks/usePageMeta'
import { routes } from '@/lib/routes'

export default function Blog() {
  usePageMeta('Blog', 'Conseils numériques pour les entreprises du Katanga : connexion, paiement mobile, sécurité, IA.')
  const [category, setCategory] = useState<'Tous' | PostCategory>('Tous')
  const [subscribed, setSubscribed] = useState(false)
  const visible = posts.filter((post) => category === 'Tous' || post.cat === category)

  const onSubscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubscribed(true)
  }

  return (
    <>
      <section aria-labelledby="page-title" className="pb-10 pt-24">
        <div className="wrap flex flex-col gap-[26px]">
          <span className="eyebrow rise text-copper">Le journal</span>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h1 id="page-title" className="rise d1 max-w-[900px] text-[clamp(42px,6vw,86px)] font-extrabold leading-[0.96] tracking-[-0.04em]">
              Conseils numériques pour les entreprises <span className="text-copper">du Katanga.</span>
            </h1>
            <p className="rise d2 max-w-[360px] text-lg text-ink-soft">Des guides concrets, écrits pour le terrain : connexion, paiement mobile, sécurité, IA.</p>
          </div>
          <div className="rise d3 flex flex-wrap gap-2.5 pt-3" role="group" aria-label="Filtrer les articles">
            {postCategories.map((cat) => (
              <button key={cat} type="button" className="chipbtn" aria-pressed={category === cat} onClick={() => setCategory(cat)}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {(category === 'Tous' || category === featuredPost.cat) && (
        <section aria-label="Article à la une" className="pb-14 pt-6">
          <div className="wrap">
            <Link to={routes.blog} className="card lift flex flex-wrap overflow-hidden text-ink no-underline hover:text-ink">
              <div aria-hidden="true" className="relative min-h-[420px] min-w-0 flex-[1_1_520px] overflow-hidden border-ink bg-mal min-[1000px]:border-r-[1.5px] max-[999px]:border-b-[1.5px] max-[760px]:min-h-[280px]">
                <img src={`https://images.unsplash.com/${featuredPost.image}?auto=format&fit=crop&w=1200&q=85`} alt="" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
                <span className="absolute left-6 top-6 rounded-full bg-white px-3 py-1.5 font-mono text-xs">À la une</span>
              </div>
              <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-[18px] p-11 max-[760px]:p-7">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="chip bg-copper-soft text-copper-deep">{featuredPost.cat}</span>
                  <span className="font-mono text-[13px] text-ink-muted">
                    <Ph>[Date]</Ph> · <Ph>[X] min</Ph>
                  </span>
                </div>
                <h2 className="title-hover text-[clamp(30px,3.2vw,46px)] font-extrabold">{featuredPost.title}</h2>
                <p className="text-lg text-ink-soft">{featuredPost.text}</p>
                <span className="mt-auto inline-flex items-center gap-2 font-semibold">
                  Lire l’article <ArrowRight />
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      <section aria-label="Tous les articles" className="pb-[120px] pt-6">
        <div className="wrap">
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,340px),1fr))] gap-7">
            {visible.map((post) => (
              <li key={post.slug} className="pop-in">
                <Link to={routes.blog} className="card lift flex h-full flex-col overflow-hidden text-ink no-underline hover:text-ink">
                  <div className="h-[210px] overflow-hidden border-b-[1.5px] border-ink"><img src={`https://images.unsplash.com/${post.image}?auto=format&fit=crop&w=900&h=600&q=80`} alt={`Illustration : ${post.title}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.04]" /></div>
                  <div className="flex flex-grow flex-col gap-3 px-[26px] pb-7 pt-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="chip bg-stone text-[#2F3833]">{post.cat}</span>
                      <span className="font-mono text-xs text-ink-muted">[X] min</span>
                    </div>
                    <h2 className="title-hover text-2xl font-bold">{post.title}</h2>
                    <p className="flex-grow text-base text-ink-soft">{post.text}</p>
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
            <span className="eyebrow text-copper-light">Lettre d’information</span>
            <h2 id="nl-title" className="text-[clamp(34px,4.2vw,58px)] font-extrabold">
              Un conseil utile par mois, pas plus.
            </h2>
            <p className="text-lg text-mal-fog">Désinscription en un clic. On ne partage jamais votre adresse.</p>
          </div>
          <form aria-label="Inscription à la lettre" className="flex min-w-0 flex-[1_1_420px] flex-col gap-2.5" onSubmit={onSubscribe}>
            <label htmlFor="blog-email" className="font-semibold">
              Votre e-mail professionnel
            </label>
            {subscribed ? (
              <p role="status" className="reveal text-lg text-mal-glow">
                Merci ! Votre inscription est enregistrée.
              </p>
            ) : (
              <div className="flex flex-wrap gap-2.5">
                <input
                  id="blog-email"
                  type="email"
                  required
                  placeholder="vous@entreprise.cd"
                  autoComplete="email"
                  className="min-h-14 min-w-0 flex-[1_1_220px] rounded-full border-[1.5px] border-[#3D5A50] bg-mal-panel px-5 text-base text-white placeholder:text-mal-mist"
                />
                <button type="submit" className="btn btn-cu-light min-h-14">
                  S’inscrire
                </button>
              </div>
            )}
          </form>
        </div>
      </section>
    </>
  )
}
