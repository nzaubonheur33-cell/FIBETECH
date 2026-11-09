import Link from 'next/link'
import peepsSheet from '@/assets/open-peeps-sheet.png'
import { CtaBand } from '@/components/layout/CtaBand'
import { ProjectCard } from '@/components/ProjectCard'
import { RichInline, RichTitle } from '@/components/rich'
import { ButtonLink } from '@/components/ui/button'
import { HorizonDot, PathIcon } from '@/components/ui/icons'
import { LogoMark } from '@/components/ui/logo'
import { Marquee } from '@/components/ui/marquee'
import { SectionHeading } from '@/components/ui/section-heading'
import { CrowdCanvas } from '@/components/ui/skiper39'
import type { BlockData, SiteInfo } from '@/content/blocks'
import type { ProjectItem, ServiceItem, TestimonialItem } from '@/content/types'
import { imageUrl } from '@/lib/images'

type HomeProps = {
  c: BlockData<'home'>
  shared: BlockData<'shared'>
  site: SiteInfo
  services: ServiceItem[]
  projects: ProjectItem[]
  testimonials: TestimonialItem[]
}

export default function Home({ c, shared, site, services, projects, testimonials }: HomeProps) {
  return (
    <>
      <Hero c={c.hero} site={site} />

      <Marquee
        label="Secteurs que nous accompagnons"
        items={shared.sectors.map((s) => s.title)}
        className="bg-ink py-6 text-white"
        render={(sector) => (
          <span className="inline-flex items-center gap-7 whitespace-nowrap pr-7 font-display text-[clamp(22px,2.4vw,32px)] font-semibold tracking-[-0.02em]">
            {sector}
            <HorizonDot />
          </span>
        )}
      />

      <section id="services" aria-labelledby="services-title" className="bg-white py-[120px]">
        <div className="wrap flex flex-col gap-14">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading id="services-title" eyebrow={c.services.eyebrow} title={<RichTitle text={c.services.title} />} text={c.services.text} />
            <Link className="link" href="/services">
              {c.services.link}
            </Link>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,330px),1fr))] gap-6">
            {services.map((service) => (
              <article key={service.key} className="card lift flex flex-col gap-[18px] p-[30px]">
                <div className="grid h-16 w-16 place-items-center rounded-full bg-copper-soft text-copper">
                  <PathIcon name={service.icon} className="draw-icon" />
                </div>
                <h3 className="text-[26px] font-bold">{service.title}</h3>
                <p className="flex-grow text-base text-ink-soft">{service.text}</p>
                <ul aria-label="Exemples" className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <li key={tag} className="chip bg-stone text-[#2F3833]">
                      {tag}
                    </li>
                  ))}
                </ul>
                <Link className="link self-start" href={service.href}>
                  {c.services.more}
                  <span className="sr-only-label"> : {service.title}</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="why-title" className="overflow-hidden bg-mal-deep py-[120px] text-white">
        <div className="wrap flex flex-wrap items-center gap-16">
          <div className="flex min-w-0 flex-[1_1_520px] flex-col gap-10">
            <div className="flex flex-col gap-[18px]">
              <span className="eyebrow text-copper-light">{c.why.eyebrow}</span>
              <h2 id="why-title" className="text-[clamp(36px,4.4vw,62px)] font-extrabold">
                <RichTitle text={c.why.title} accentClassName="text-copper-light" />
              </h2>
            </div>
            <ul className="flex flex-col gap-[26px]">
              {c.why.items.map((item) => (
                <li key={item.title} className="flex items-start gap-[18px]">
                  <HorizonDot fill="#E8A07A" width={30} height={22} className="mt-1 flex-none" />
                  <div className="flex flex-col gap-1">
                    <h3 className="text-[22px] font-bold">{item.title}</h3>
                    <p className="text-mal-mist">
                      <RichInline text={item.text} dark />
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div aria-hidden="true" className="flex min-w-0 flex-[1_1_420px] justify-center">
            <Orbit />
          </div>
        </div>
      </section>

      <section aria-labelledby="process-title" className="bg-stone py-[120px]">
        <div className="wrap flex flex-col gap-14">
          <SectionHeading id="process-title" eyebrow={c.process.eyebrow} title={<RichTitle text={c.process.title} />} text={c.process.text} />
          <div className="relative">
            <div aria-hidden="true" className="absolute left-7 right-7 top-[27px] h-[1.5px] bg-ink max-[760px]:hidden">
              <span className="travel absolute -top-[5px] h-3 w-3 rounded-full bg-copper" />
            </div>
            <ol className="relative grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-8">
              {shared.steps.map((step, i) => (
                <li key={step.title} className="flex flex-col gap-3.5">
                  <span className="grid h-14 w-14 place-items-center rounded-full border-[1.5px] border-ink bg-white font-mono text-[15px] font-medium">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="text-[23px] font-bold">{step.title}</h3>
                  <p className="text-base text-ink-soft">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {projects.length > 0 && (
        <section aria-labelledby="work-title" className="bg-white py-[120px]">
          <div className="wrap flex flex-col gap-14">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading id="work-title" eyebrow={c.work.eyebrow} title={<RichTitle text={c.work.title} />} />
              <Link className="link" href="/realisations">
                {c.work.link}
              </Link>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-6">
              {projects.slice(0, 3).map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </div>
        </section>
      )}

      {testimonials.length > 0 && (
        <section aria-labelledby="quote-title" className="border-y-[1.5px] border-ink bg-stone py-[120px]">
          <div className="wrap flex flex-col items-center gap-[34px] text-center">
            <h2 id="quote-title" className="eyebrow text-copper">
              {c.testimonials.title}
            </h2>
            {c.testimonials.note && <p className="max-w-2xl text-sm text-ink-muted">{c.testimonials.note}</p>}
            <div className="testimonial-window w-full" aria-label="Témoignages de clients" role="region">
              <div className="testimonial-track">
                {[...testimonials, ...testimonials].map((item, index) => {
                  const avatar = imageUrl(item.avatar, { w: 160, h: 160, q: 80 })
                  const stars = Math.min(5, Math.max(0, item.rating))
                  return (
                    <article key={`${item.name}-${index}`} aria-hidden={index >= testimonials.length} className="testimonial-card">
                      <div className="flex items-center gap-3.5">
                        {avatar ? (
                          <img src={avatar} alt="" className="h-[66px] w-[66px] shrink-0 rounded-full border-[3px] border-coral object-cover" />
                        ) : (
                          <span className="grid h-[66px] w-[66px] shrink-0 place-items-center rounded-full border-[3px] border-coral bg-copper-soft font-display text-2xl font-bold text-copper-deep">
                            {item.name.charAt(0)}
                          </span>
                        )}
                        <div className="min-w-0 flex-1 text-left">
                          <strong className="block text-lg">{item.name}</strong>
                          <span className="text-sm text-ink-muted">{item.role}</span>
                        </div>
                        {stars > 0 && (
                          <span className="shrink-0 text-[18px] tracking-[2px] text-[#F26464]" aria-label={`${stars} étoile${stars > 1 ? 's' : ''}`}>
                            {'★'.repeat(stars)}
                          </span>
                        )}
                      </div>
                      <blockquote className="mt-5 text-left text-[15px] leading-[1.8] text-ink-soft">{item.quote}</blockquote>
                      <span aria-hidden="true" className="absolute -bottom-5 left-7 font-display text-[76px] font-bold leading-none text-[#F26464]">
                        “
                      </span>
                    </article>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      <section aria-labelledby="price-title" className="bg-white py-[120px]">
        <div className="wrap flex flex-col gap-14">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading id="price-title" eyebrow={c.pricing.eyebrow} title={<RichTitle text={c.pricing.title} />} />
            <Link className="link" href="/tarifs">
              {c.pricing.link}
            </Link>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-6">
            {c.pricing.plans.map((plan) => (
              <Link key={plan.name} href="/tarifs" className="card lift relative flex flex-col gap-4 p-8 text-ink no-underline hover:text-ink">
                <h3 className="text-[28px] font-bold">{plan.name}</h3>
                <p className="text-ink-soft">{plan.text}</p>
                <p className="font-display text-[44px] font-extrabold leading-none text-ink">{plan.price}</p>
                <span className="text-ink-muted">{c.pricing.from}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand eyebrow={c.cta.eyebrow} title={c.cta.title} text={c.cta.text} cta={c.cta.button} phone={site.phone} />
    </>
  )
}

function Hero({ c, site }: { c: BlockData<'home'>['hero']; site: SiteInfo }) {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden border-b-[1.5px] border-ink bg-white">
      <div className="absolute left-[max(20px,4vw)] top-9 z-[3] font-mono text-xs leading-[1.8] tracking-[0.06em] text-ink-muted max-[760px]:hidden">
        <div>{site.city} · RDC</div>
      </div>

      <div aria-hidden="true" className="absolute right-[max(20px,6vw)] top-24 z-[3] h-[150px] w-[150px] max-[960px]:hidden">
        <svg viewBox="0 0 160 160" width="150" height="150">
          <defs>
            <path id="hero-badge-circle" d="M80,80 m-63,0 a63,63 0 1,1 126,0 a63,63 0 1,1 -126,0" />
          </defs>
          <g className="spin-slow" style={{ transformOrigin: '80px 80px' }}>
            <text fontFamily="JetBrains Mono, ui-monospace, monospace" fontSize={11} fontWeight={500} fill="#121614">
              <textPath href="#hero-badge-circle" textLength={392} lengthAdjust="spacing">
                {c.badge}
              </textPath>
            </text>
          </g>
          <circle cx={80} cy={80} r={40} fill="#121614" />
        </svg>
        <LogoMark tone="ink" className="absolute left-[56px] top-[56px] h-12 w-12" />
      </div>

      <div className="wrap relative z-[2] flex flex-col items-center gap-[26px] pt-[52px] text-center">
        <div className="flex flex-col items-center gap-3.5">
          <span className="eyebrow rise text-ink-muted">{c.eyebrow}</span>
          <span aria-hidden="true" className="block h-14 w-px bg-gradient-to-b from-white to-ink" />
        </div>
        <h1 id="hero-title" className="rise d1 max-w-[1060px] text-[clamp(44px,6.2vw,92px)] font-extrabold leading-[0.95] tracking-[-0.045em]">
          <RichTitle
            text={c.title}
            renderAccent={(text, key) => (
              <span key={key} className="relative inline-block text-copper">
                {text}
                <svg aria-hidden="true" viewBox="0 0 300 24" preserveAspectRatio="none" className="absolute bottom-[-0.16em] left-0 h-[0.24em] w-full overflow-visible">
                  <path className="squiggle" d="M3 15 C 40 4, 70 22, 110 12 S 180 4, 215 13 S 270 20, 297 8" fill="none" stroke="#B4532A" strokeWidth={5} strokeLinecap="round" />
                </svg>
              </span>
            )}
          />
        </h1>
        <p className="rise d2 max-w-[620px] text-[clamp(17px,1.4vw,20px)] text-ink-soft">{c.text}</p>
        <div className="rise d3 flex flex-wrap justify-center gap-3">
          <ButtonLink to="/contact" arrow>
            {c.primaryCta}
          </ButtonLink>
          <ButtonLink to="/services" variant="ghost">
            {c.secondaryCta}
          </ButtonLink>
        </div>
      </div>

      {/* Foule animée (Skiper39 + Open Peeps) */}
      <div className="relative mt-2 h-[330px] min-[761px]:mt-10 min-[761px]:h-[470px]">
        <CrowdCanvas src={peepsSheet.src} rows={15} cols={7} className="inset-0 h-full w-full" />
      </div>
    </section>
  )
}

function Orbit() {
  const outer = [
    { label: 'Web', style: { top: -18, left: 'calc(50% - 50px)' } },
    { label: 'Cloud', style: { top: 'calc(100% - 18px)', left: 'calc(50% - 50px)' } },
    { label: 'Réseau', style: { top: 'calc(50% - 18px)', left: -50 } },
    { label: 'Support', style: { top: 'calc(50% - 18px)', left: 'calc(100% - 50px)' } },
  ]
  const inner = [
    { label: 'IA', style: { top: '4%', left: 'calc(14% - 46px)' } },
    { label: 'Mobile', style: { top: '4%', left: 'calc(86% - 46px)' } },
    { label: 'Données', style: { top: 'calc(100% - 17px)', left: 'calc(50% - 46px)' } },
  ]
  return (
    <div className="relative aspect-square w-[min(100%,500px)] max-w-full">
      <div className="absolute inset-0 rounded-full border border-mal-glow/35" />
      <div className="absolute inset-[17%] rounded-full border border-dashed border-mal-glow/50" />
      <div className="absolute inset-[34%] rounded-full border border-copper-light/55" />
      <div className="orbit-a absolute inset-0">
        {outer.map((item) => (
          <div key={item.label} className="absolute flex w-[100px] justify-center" style={item.style}>
            <span className="orbit-a-rev inline-flex min-h-9 items-center rounded-full border border-mal-glow bg-mal-deep px-3.5 font-mono text-[13px] text-mal-glow">{item.label}</span>
          </div>
        ))}
      </div>
      <div className="orbit-b absolute inset-[17%]">
        {inner.map((item) => (
          <div key={item.label} className="absolute flex w-[92px] justify-center" style={item.style}>
            <span className="orbit-b-rev inline-flex min-h-[34px] items-center rounded-full border border-copper-light bg-mal-deep px-3 font-mono text-[13px] text-copper-light">{item.label}</span>
          </div>
        ))}
      </div>
      <div className="absolute inset-[39%]">
        <div className="ping-soft absolute inset-0 rounded-full border-2 border-copper-light" />
        <div className="absolute inset-0 grid place-items-center rounded-full border-[1.5px] border-copper-light bg-ink">
          <LogoMark tone="ink" className="w-[56%]" />
        </div>
      </div>
    </div>
  )
}
