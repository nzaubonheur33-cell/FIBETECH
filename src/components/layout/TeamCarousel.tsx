'use client'

import { useState } from 'react'
import type { TeamMemberItem } from '@/content/types'
import { imageUrl } from '@/lib/images'

const PAGE_SIZE = 3

export default function TeamCarousel({ team }: { team: TeamMemberItem[] }) {
  const [page, setPage] = useState(0)
  const pageCount = Math.ceil(team.length / PAGE_SIZE)
  const members = team.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE)
  const firstVisible = team.length ? page * PAGE_SIZE + 1 : 0
  const lastVisible = Math.min((page + 1) * PAGE_SIZE, team.length)

  return (
    <div className="flex flex-col gap-6">
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {members.map((member) => (
          <li key={member.name} className="card lift flex flex-col overflow-hidden">
            <div className="relative h-[280px] overflow-hidden border-b-[1.5px] border-ink bg-stone">
              {imageUrl(member.image) ? (
                <img src={imageUrl(member.image, { w: 800, h: 700 })} alt={'Portrait de ' + member.name} loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-500 hover:scale-[1.04]" />
              ) : (
                <span aria-hidden="true" className="grid h-full w-full place-items-center font-display text-[96px] font-extrabold text-copper/40">
                  {member.name.charAt(0)}
                </span>
              )}
            </div>
            <div className="flex min-h-[112px] flex-col gap-1 px-6 pb-[26px] pt-[22px]">
              <h3 className="text-[22px] font-bold">{member.name}</h3>
              <p className="text-ink-soft">{member.role}</p>
            </div>
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
    </div>
  )
}
