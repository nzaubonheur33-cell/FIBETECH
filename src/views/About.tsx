import { RichInline, RichTitle } from '@/components/rich'
import { ButtonLink } from '@/components/ui/button'
import { Wordmark } from '@/components/ui/logo'
import TeamCarousel from '@/components/layout/TeamCarousel'
import type { BlockData, SiteInfo } from '@/content/blocks'
import type { TeamMemberItem } from '@/content/types'

export default function About({ c, site, team }: { c: BlockData<'about'>; site: SiteInfo; team: TeamMemberItem[] }) {

  return (
    <>
      <section aria-labelledby="page-title" className="overflow-hidden border-b-[1.5px] border-ink pt-[88px]">
        <div className="wrap flex flex-wrap items-end gap-10">
          <div className="flex min-w-0 flex-[1_1_560px] flex-col gap-[26px] pb-[88px]">
            <span className="eyebrow rise text-copper">{c.hero.eyebrow}</span>
            <h1 id="page-title" className="rise d1 text-[clamp(42px,6vw,88px)] font-extrabold leading-[0.96] tracking-[-0.04em]">
              <RichTitle text={c.hero.title} />
            </h1>
            <p className="rise d2 max-w-[560px] text-xl text-ink-soft">
              {c.hero.text}
            </p>
          </div>
          <div aria-hidden="true" className="relative flex min-h-[420px] min-w-0 flex-[1_1_420px] items-center justify-center py-10 max-[760px]:min-h-[310px]">
            <div className="absolute inset-[8%] rounded-[38%] border border-mal/20" />
            <div className="absolute inset-[18%] rounded-[34%] border border-dashed border-copper/35" />
            <div className="relative w-[88%] max-w-[460px] -rotate-2 rounded-[22px] border-[1.5px] border-ink bg-white p-5 shadow-[12px_12px_0_#121614]">
              <div className="flex items-center gap-2 border-b border-line pb-4"><span className="h-2.5 w-2.5 rounded-full bg-copper"/><span className="h-2.5 w-2.5 rounded-full bg-mustard"/><span className="h-2.5 w-2.5 rounded-full bg-mal"/><span className="ml-auto rounded-full bg-stone px-3 py-1 font-mono text-[11px] text-ink-soft">fibetech.cd</span></div>
              <div className="grid grid-cols-[1fr_0.8fr] gap-4 py-5"><div className="flex flex-col justify-center gap-3"><span className="h-3 w-4/5 rounded-full bg-ink"/><span className="h-3 w-full rounded-full bg-line"/><span className="h-3 w-3/4 rounded-full bg-line"/><span className="mt-2 h-9 w-28 rounded-full bg-copper"/></div><div className="grid aspect-square place-items-center rounded-2xl bg-mal-deep"><svg viewBox="0 0 100 100" className="w-3/4"><path d="M20 25h60M20 50h60M20 75h60M30 20v60M50 20v60M70 20v60" stroke="#3FBF8E" strokeWidth="2" opacity=".55"/><circle cx="50" cy="50" r="10" fill="#E8A07A"/><circle cx="50" cy="50" r="20" fill="none" stroke="#E8A07A" strokeWidth="2"/></svg></div></div>
            </div>
            <span className="absolute bottom-[13%] left-[3%] rounded-full border border-ink bg-copper-soft px-4 py-2 font-mono text-xs text-copper-deep">Solutions numériques locales</span>
            <span className="absolute right-[3%] top-[12%] rounded-full border border-ink bg-mal-deep px-4 py-2 font-mono text-xs text-white">RDC · Lubumbashi</span>
          </div>
        </div>
      </section>

      <section aria-labelledby="story-title" className="py-[110px]">
        <div className="wrap flex flex-wrap gap-12">
          <h2 id="story-title" className="eyebrow flex-[1_1_240px] font-mono text-copper">
            {c.story.eyebrow}
          </h2>
          <div className="flex min-w-0 flex-[3_1_620px] flex-col gap-6">
            <p className="font-display text-[clamp(26px,2.8vw,38px)] font-semibold leading-[1.2] tracking-[-0.02em]">
              <RichInline text={c.story.lead} />
            </p>
            {c.story.paragraphs.map((paragraph, i) => (
              <p key={i} className="max-w-[720px] text-lg text-ink-soft">
                <RichInline text={paragraph} />
              </p>
            ))}
          </div>
        </div>
      </section>

      <section aria-label="Mission et vision" className="pb-[110px]">
        <div className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-6">
          <div className="card lift flex flex-col gap-[18px] p-11 max-[760px]:p-7">
            <span className="eyebrow text-copper">{c.mission.eyebrow}</span>
            <h2 className="text-[clamp(28px,3vw,40px)] font-extrabold">
              <RichTitle text={c.mission.title} />
            </h2>
            <p className="text-ink-soft">{c.mission.text}</p>
          </div>
          <div className="card lift flex flex-col gap-[18px] bg-mal-deep p-11 text-white max-[760px]:p-7">
            <span className="eyebrow text-copper-light">{c.vision.eyebrow}</span>
            <h2 className="text-[clamp(28px,3vw,40px)] font-extrabold">
              <RichTitle text={c.vision.title} accentClassName="text-copper-light" />
            </h2>
            <p className="text-mal-fog">{c.vision.text}</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="values-title" className="border-y-[1.5px] border-ink bg-stone py-[110px]">
        <div className="wrap flex flex-col gap-10">
          <div className="flex max-w-[720px] flex-col gap-[18px]">
            <span className="eyebrow text-copper">{c.values.eyebrow}</span>
            <h2 id="values-title" className="text-[clamp(36px,4.4vw,58px)] font-extrabold">
              <RichTitle text={c.values.title} />
            </h2>
          </div>
          <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] overflow-hidden rounded-[22px] border-[1.5px] border-ink bg-white">
            {c.values.items.map((value, i) => (
              <li key={value.title} className={`value flex min-h-[240px] flex-col gap-3 p-8 ${i < c.values.items.length - 1 ? 'border-ink min-[1100px]:border-r-[1.5px] max-[1099px]:border-b-[1.5px]' : ''}`}>
                <h3 className="text-[30px] font-extrabold">{value.title}</h3>
                <p className="text-ink-soft">{value.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="name-title" className="overflow-hidden bg-ink py-[120px] text-white">
        <div className="wrap flex flex-wrap items-center gap-14">
          <div className="flex min-w-0 flex-[1_1_460px] flex-col gap-2.5">
            <h2 id="name-title" className="eyebrow font-mono text-copper-light">
              {c.name.eyebrow}
            </h2>
            <p aria-hidden="true" className="text-outline-glow flex whitespace-nowrap font-display" style={{ fontSize: 'clamp(60px, 8.5vw, 120px)', fontWeight: 800, lineHeight: 0.85, letterSpacing: '-0.06em' }}>
              <Wordmark dot="#E8A07A" dotTop="0.001em" />
            </p>
            <p className="font-mono text-[15px] text-mal-mist">{c.name.caption}</p>
          </div>
          <div className="flex min-w-0 flex-[1_1_460px] flex-col gap-5">
            <p className="font-display text-[clamp(22px,2.2vw,30px)] font-semibold leading-[1.25]">
              <RichInline text={c.name.story} dark />
            </p>
            <p className="text-lg text-mal-fog">{c.name.note}</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="team-title" className="py-[120px]">
        <div className="wrap flex flex-col gap-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="flex max-w-[720px] flex-col gap-[18px]">
              <span className="eyebrow text-copper">{c.team.eyebrow}</span>
              <h2 id="team-title" className="text-[clamp(36px,4.4vw,58px)] font-extrabold">
                <RichTitle text={c.team.title} />
              </h2>
            </div>
          </div>
          <TeamCarousel team={team} />
        </div>
      </section>

      <section aria-labelledby="where-title" className="pb-[120px]">
        <div className="wrap">
          <div className="flex flex-wrap overflow-hidden rounded-[28px] border-[1.5px] border-ink">
            <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-[22px] p-12 max-[760px]:p-7">
              <span className="eyebrow text-copper">{c.where.eyebrow}</span>
              <h2 id="where-title" className="text-[clamp(34px,4vw,54px)] font-extrabold">
                <RichTitle text={c.where.title} />
              </h2>
              {site.coords && <p className="font-mono text-[clamp(20px,2.4vw,30px)] tracking-[0.02em]">{site.coords}</p>}
              <dl className="m-0 grid gap-3">
                <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                  <dt className="min-w-[90px] text-ink-muted">{c.where.addressLabel}</dt>
                  <dd className="m-0 text-ink">
                    {site.fullAddress}
                  </dd>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                  <dt className="min-w-[90px] text-ink-muted">{c.where.hoursLabel}</dt>
                  <dd className="m-0 text-ink">
                    <RichInline text={site.hours} />
                  </dd>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                  <dt className="min-w-[90px] text-ink-muted">{c.where.phoneLabel}</dt>
                  <dd className="m-0 font-mono">{site.phone}</dd>
                </div>
              </dl>
              <ButtonLink to="/contact" className="self-start">
                {c.where.button}
              </ButtonLink>
            </div>
            <MapCard site={site} />
          </div>
        </div>
      </section>
    </>
  )
}

function MapCard({ site }: { site: SiteInfo }) {
  const mapQuery = encodeURIComponent(site.mapQuery || site.fullAddress)
  return (
    <div className="relative min-h-[420px] min-w-0 flex-[1_1_420px] overflow-hidden border-ink min-[900px]:border-l-[1.5px] max-[899px]:border-t-[1.5px]">
      <iframe title={`Carte de localisation : ${site.fullAddress}`} src={`https://maps.google.com/maps?q=${mapQuery}&z=17&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 h-full min-h-[420px] w-full border-0 grayscale-[15%]" />
    </div>
  )
}
