'use client'

import { useEffect, useRef, useState } from 'react'
import type { TeamMemberItem } from '@/content/types'
import { imageUrl } from '@/lib/images'

const PAGE_SIZE = 3

export default function TeamCarousel({ team }: { team: TeamMemberItem[] }) {
  const [page, setPage] = useState(0)
  const [selected, setSelected] = useState<TeamMemberItem | null>(null)
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
              aria-haspopup="dialog"
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
      <MemberDialog member={selected} onClose={() => setSelected(null)} />
    </div>
  )
}

/** Fenêtre de présentation d'un membre (élément <dialog> natif : Échap, focus et fond gérés par le navigateur). */
function MemberDialog({ member, onClose }: { member: TeamMemberItem | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (member && !dialog.open) dialog.showModal()
    if (!member && dialog.open) dialog.close()
  }, [member])

  const photo = member ? imageUrl(member.image, { w: 900, h: 1100 }) : ''
  const paragraphs = (member?.bio ?? '').split(/\n\s*\n/).map((text) => text.trim()).filter(Boolean)

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(event) => {
        // Un clic sur le fond (en dehors du contenu) ferme la fenêtre.
        if (event.target === event.currentTarget) event.currentTarget.close()
      }}
      aria-labelledby="member-dialog-name"
      className="team-dialog m-auto w-[min(860px,calc(100vw-32px))] max-h-[calc(100dvh-32px)] overflow-hidden rounded-[22px] border-[1.5px] border-ink bg-white p-0 text-ink shadow-[12px_12px_0_#121614] backdrop:bg-ink/60"
    >
      {member && (
        // Toujours visible, même sur téléphone où la photo occupe le haut de la fenêtre.
        <button
          type="button"
          onClick={() => ref.current?.close()}
          aria-label="Fermer la présentation"
          className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full border-[1.5px] border-ink bg-white text-ink shadow-[2px_2px_0_#121614] transition hover:bg-stone"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      )}
      {member && (
        <div className="grid max-h-[calc(100dvh-35px)] overflow-y-auto md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
          <div className="relative aspect-[4/5] w-full overflow-hidden border-b-[1.5px] border-ink bg-stone md:aspect-auto md:min-h-[460px] md:border-b-0 md:border-r-[1.5px]">
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
      )}
    </dialog>
  )
}
