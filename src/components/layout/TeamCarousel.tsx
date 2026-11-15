'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { TeamMemberItem } from '@/content/types'
import { imageUrl } from '@/lib/images'

const PAGE_SIZE = 3

export default function TeamCarousel({ team }: { team: TeamMemberItem[] }) {
  const [page, setPage] = useState(0)
  const [selected, setSelected] = useState<TeamMemberItem | null>(null)
  const closeDialog = useCallback(() => setSelected(null), [])
  const pageCount = Math.ceil(team.length / PAGE_SIZE)
  const members = team.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE)
  const firstVisible = team.length ? page * PAGE_SIZE + 1 : 0
  const lastVisible = Math.min((page + 1) * PAGE_SIZE, team.length)

  return (
    <div className="flex flex-col gap-6">
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {members.map((member) => (
          <li key={member.name} className="card lift flex flex-col overflow-hidden">
            <button
              type="button"
              onClick={() => setSelected(member)}
              aria-label={`Voir la présentation de ${member.name}`}
              className="group flex h-full flex-col bg-transparent p-0 text-left text-inherit focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-copper"
            >
              <div className="relative h-[280px] w-full overflow-hidden border-b-[1.5px] border-ink bg-stone">
                {imageUrl(member.image) ? (
                  <img src={imageUrl(member.image, { w: 800, h: 700 })} alt={'Portrait de ' + member.name} loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]" />
                ) : (
                  <span aria-hidden="true" className="grid h-full w-full place-items-center font-display text-[96px] font-extrabold text-copper/40">
                    {member.name.charAt(0)}
                  </span>
                )}
              </div>
              <div className="flex min-h-[112px] w-full flex-col gap-1 px-6 pb-[26px] pt-[22px]">
                <h3 className="text-[22px] font-bold">{member.name}</h3>
                <p className="text-ink-soft">{member.role}</p>
                <span className="mt-2 text-sm font-semibold text-copper group-hover:underline">Voir la présentation →</span>
              </div>
            </button>
          </li>
        ))}
      </ul>
      {pageCount > 1 && (
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p aria-live="polite" className="m-0 font-mono text-sm text-ink-soft">
            Membres {firstVisible}–{lastVisible} sur {team.length}
          </p>
          <div className="flex items-center gap-2">
            <button type="button" aria-label="Afficher le groupe précédent" disabled={page === 0} onClick={() => setPage((value) => Math.max(0, value - 1))} className="grid h-11 w-11 place-items-center rounded-full border-[1.5px] border-ink bg-white transition hover:bg-stone disabled:cursor-not-allowed disabled:opacity-40">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m16 5-7 7 7 7" />
              </svg>
            </button>
            <button type="button" aria-label="Afficher le groupe suivant" disabled={page >= pageCount - 1} onClick={() => setPage((value) => Math.min(pageCount - 1, value + 1))} className="grid h-11 w-11 place-items-center rounded-full border-[1.5px] border-ink bg-white transition hover:bg-stone disabled:cursor-not-allowed disabled:opacity-40">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m8 5 7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}
      <MemberDialog member={selected} onClose={closeDialog} />
    </div>
  )
}

/**
 * Fenêtre de présentation d'un membre. Fenêtre « maison » (et non <dialog>) pour fonctionner
 * aussi sur les téléphones anciens : Échap, clic sur le fond et bouton × la ferment,
 * le défilement de la page est bloqué pendant l'ouverture et le focus revient sur la carte.
 */
function MemberDialog({ member, onClose }: { member: TeamMemberItem | null; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!member) return
    const trigger = document.activeElement as HTMLElement | null
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
      trigger?.focus?.()
    }
  }, [member, onClose])

  if (!member) return null
  const photo = imageUrl(member.image, { w: 900, h: 1100 })
  const paragraphs = member.bio.split(/\n\s*\n/).map((text) => text.trim()).filter(Boolean)

  // Rendue à la racine du site (au même niveau que l'en-tête, dans la zone traduite) :
  // sinon l'en-tête passe par-dessus la fenêtre.
  return createPortal(
    <div
      className="team-dialog-backdrop fixed inset-0 z-[200] flex items-center justify-center bg-ink/60 p-4"
      onClick={(event) => {
        // Un toucher ou un clic sur le fond (en dehors de la fenêtre) la ferme.
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="member-dialog-name"
        className="team-dialog relative w-full max-w-[860px] overflow-hidden rounded-[22px] border-[1.5px] border-ink bg-white text-ink shadow-[12px_12px_0_#121614]"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Fermer la présentation"
          className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full border-[1.5px] border-ink bg-white text-ink shadow-[2px_2px_0_#121614] transition hover:bg-stone"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
        <div className="team-dialog-scroll grid overflow-y-auto overscroll-contain md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
          <div className="relative h-[46vh] max-h-[420px] w-full overflow-hidden border-b-[1.5px] border-ink bg-stone md:h-auto md:max-h-none md:min-h-[460px] md:border-b-0 md:border-r-[1.5px]">
            {photo ? (
              <img src={photo} alt={'Portrait de ' + member.name} className="absolute inset-0 h-full w-full object-cover object-top" />
            ) : (
              <span aria-hidden="true" className="absolute inset-0 grid place-items-center font-display text-[140px] font-extrabold text-copper/40">
                {member.name.charAt(0)}
              </span>
            )}
          </div>
          <div className="flex min-w-0 flex-col gap-5 p-7 md:p-9">
            <span className="eyebrow pr-12 text-copper">L’équipe Fibetech</span>
            <div className="flex flex-col gap-1.5">
              <h3 id="member-dialog-name" className="text-[clamp(26px,3.2vw,36px)] font-extrabold leading-tight">
                {member.name}
              </h3>
              <p className="text-lg font-medium text-copper-deep">{member.role}</p>
            </div>
            {paragraphs.length > 0 && (
              <div className="flex flex-col gap-3 text-base leading-relaxed text-ink-soft">
                {paragraphs.map((text, i) => (
                  <p key={i} className="m-0">
                    {text}
                  </p>
                ))}
              </div>
            )}
            {member.email && (
              <p className="m-0 mt-auto border-t border-line pt-4 text-sm text-ink-muted">
                Écrire à {member.name.split(' ')[0]} :{' '}
                <a className="link font-medium" href={`mailto:${member.email}`}>
                  {member.email}
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('site-language-root') ?? document.body,
  )
}
