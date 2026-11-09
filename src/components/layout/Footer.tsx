'use client'

import Link from 'next/link'
import { Honeypot } from '@/components/ui/field'
import { Logo, Wordmark } from '@/components/ui/logo'
import type { LayoutContent, SiteInfo } from '@/content/blocks'
import { useNewsletter } from './useNewsletter'

const columnTitle = 'm-0 font-mono text-xs font-medium uppercase tracking-[0.14em] text-copper-light'

function SmartLink({ href, className, children }: { href: string; className: string; children: string }) {
  if (/^https?:\/\//.test(href))
    return (
      <a className={className} href={href} target="_blank" rel="noreferrer">
        {children}
      </a>
    )
  return (
    <Link className={className} href={href}>
      {children}
    </Link>
  )
}

export default function Footer({ footer, site }: { footer: LayoutContent['footer']; site: SiteInfo }) {
  const newsletter = useNewsletter('footer')

  return (
    <footer className="overflow-hidden bg-mal-deep text-[16px] text-white">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-16 pl-[max(20px,env(safe-area-inset-left,0px))] pr-[max(20px,env(safe-area-inset-right,0px))] pt-24">
        <div className="flex flex-wrap gap-14">
          <div className="flex min-w-0 flex-[1_1_340px] flex-col gap-[22px]">
            <Link href="/" aria-label="Fibetech, retour à l’accueil" className="logo inline-flex min-h-[44px] items-center self-start text-white no-underline hover:text-white">
              <Logo tone="dark" size={34} />
            </Link>
            <p className="max-w-[380px] text-mal-mist">{footer.description}</p>
            {process.env.NEXT_PUBLIC_FIBETECH_STATIC === '1' ? (
              <p className="max-w-[420px] text-sm text-mal-mist">
                Inscription à la lettre indisponible sur cette version statique. <Link className="underline underline-offset-4" href="/contact">Contactez-nous</Link> pour recevoir nos conseils.
              </p>
            ) : (
            <form aria-label="Inscription aux conseils par e-mail" className="relative flex max-w-[420px] flex-col gap-2.5" onSubmit={newsletter.onSubmit}>
              <label htmlFor="footer-email" className="font-semibold">
                {footer.newsletterLabel}
              </label>
              {newsletter.state === 'done' ? (
                <p role="status" className="reveal text-mal-glow">
                  {footer.newsletterSuccess}
                </p>
              ) : (
                <>
                  <div className="flex flex-wrap gap-2">
                    <input
                      id="footer-email"
                      name="email"
                      type="email"
                      required
                      maxLength={191}
                      placeholder="vous@entreprise.cd"
                      autoComplete="email"
                      className="min-h-[50px] min-w-0 flex-[1_1_200px] rounded-full border-[1.5px] border-[#3D5A50] bg-mal-panel px-[18px] text-base text-white placeholder:text-mal-mist"
                    />
                    <button type="submit" className="btn btn-light-cu min-h-[50px] px-[22px]" disabled={newsletter.state === 'sending'}>
                      {footer.newsletterButton}
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

          <div className="grid min-w-0 flex-[2_1_560px] grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-x-7 gap-y-9">
            {footer.columns.map((column) => (
              <div key={column.title} className="flex flex-col gap-3.5">
                <h2 className={columnTitle}>{column.title}</h2>
                <ul className="m-0 flex list-none flex-col gap-2 p-0">
                  {column.links.map((link) => (
                    <li key={`${link.href}-${link.label}`}>
                      <SmartLink className="flink" href={link.href}>
                        {link.label}
                      </SmartLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="flex flex-col gap-3.5">
              <h2 className={columnTitle}>{footer.contactTitle}</h2>
              <ul className="m-0 flex list-none flex-col gap-2 p-0 text-mal-fog">
                <li className="font-mono text-sm">{site.phone}</li>
                <li>
                  <a className="flink" href={`mailto:${site.email}`}>
                    {site.email}
                  </a>
                </li>
                <li className="text-white">
                  <span className="ph-d">{site.address}</span>, {site.city}
                </li>
                <li className="flex flex-wrap gap-3 pt-1.5">
                  {site.socials.map((social) => (
                    <a key={social.label} className="flink" href={social.href} target="_blank" rel="noreferrer">
                      {social.label}
                    </a>
                  ))}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-7 text-sm text-mal-mist">
          <span>
            © {new Date().getFullYear()} {footer.copyright}
          </span>
          <span className="flex flex-wrap gap-[18px]">
            {footer.legalLinks.map((link) => (
              <SmartLink key={link.href} className="flink" href={link.href}>
                {link.label}
              </SmartLink>
            ))}
          </span>
          <span className="font-mono text-xs tracking-[0.06em]">
            {site.city}, {site.region}
          </span>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="text-outline-glow mt-10 flex select-none justify-center whitespace-nowrap font-display"
        style={{ fontSize: 'clamp(90px, 21vw, 300px)', fontWeight: 800, lineHeight: 0.8, letterSpacing: '-0.06em', transform: 'translateY(14%)' }}
      >
        <Wordmark dot="#E8A07A" dotTop="-0.024em" />
      </div>
    </footer>
  )
}
