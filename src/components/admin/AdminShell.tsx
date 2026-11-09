'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState, type ReactNode } from 'react'
import { Logo } from '@/components/ui/logo'
import { collections } from '@/lib/admin/collections'
import { cn } from '@/lib/utils'
import { Icon } from './inputs'

type NavItem = { href: string; label: string; badge?: number }

export default function AdminShell({ user, counts, children }: { user: { name: string; email: string }; counts: { devis: number; inscriptions: number }; children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  useEffect(() => setOpen(false), [pathname])

  const groups: { title: string; items: NavItem[] }[] = [
    { title: 'Général', items: [{ href: '/admin', label: 'Tableau de bord' }, { href: '/admin/contenus', label: 'Textes des pages' }] },
    { title: 'Listes', items: collections.map((c) => ({ href: `/admin/listes/${c.name}`, label: c.label })) },
    {
      title: 'Demandes reçues',
      items: [
        { href: '/admin/demandes', label: 'Demandes de devis', badge: counts.devis },
        { href: '/admin/inscriptions', label: 'Inscriptions formations', badge: counts.inscriptions },
        { href: '/admin/newsletter', label: 'Lettre d’information' },
      ],
    },
    { title: 'Réglages', items: [{ href: '/admin/comptes', label: 'Comptes et mot de passe' }] },
  ]

  const isActive = (href: string) => (href === '/admin' ? pathname === '/admin' : pathname === href || pathname.startsWith(`${href}/`))

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'same-origin' }).catch(() => null)
    router.replace('/admin/login')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-stone text-ink lg:grid lg:grid-cols-[272px_minmax(0,1fr)]">
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-white/10 bg-mal-deep px-4 py-3 text-white lg:hidden">
        <Link href="/admin" className="text-white no-underline hover:text-white" aria-label="Tableau de bord">
          <Logo tone="dark" size={26} animatedDot={false} />
        </Link>
        <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls="admin-nav" className="rounded-lg border border-white/25 px-3 py-1.5 text-sm font-semibold">
          {open ? 'Fermer' : 'Menu'}
        </button>
      </header>

      <aside id="admin-nav" className={cn('z-30 flex-col bg-mal-deep text-white lg:sticky lg:top-0 lg:flex lg:h-screen', open ? 'flex' : 'hidden')}>
        <div className="hidden px-6 pb-4 pt-6 lg:block">
          <Link href="/admin" className="text-white no-underline hover:text-white" aria-label="Tableau de bord">
            <Logo tone="dark" size={28} animatedDot={false} />
          </Link>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-mal-mist">Administration</p>
        </div>
        <nav aria-label="Administration" className="flex-1 overflow-y-auto px-3 pb-4 pt-2">
          {groups.map((group) => (
            <div key={group.title} className="mb-4">
              <p className="px-3 pb-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-copper-light">{group.title}</p>
              <ul className="m-0 flex list-none flex-col gap-0.5 p-0">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? 'page' : undefined}
                      className={cn(
                        'flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-[15px] text-mal-fog no-underline transition hover:bg-white/10 hover:text-white',
                        isActive(item.href) && 'bg-white/[0.14] font-semibold text-white',
                      )}
                    >
                      {item.label}
                      {item.badge ? <span className="rounded-full bg-copper px-2 py-0.5 font-mono text-xs text-white">{item.badge}</span> : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <div className="border-t border-white/10 px-6 py-4 text-sm">
          <p className="truncate font-semibold">{user.name}</p>
          <p className="truncate text-mal-mist">{user.email}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <a href="/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-lg border border-white/25 px-3 py-1.5 text-white no-underline hover:border-white hover:text-white">
              Voir le site <Icon name="external" size={14} />
            </a>
            <button type="button" onClick={logout} className="rounded-lg border border-white/25 px-3 py-1.5 hover:border-white">
              Se déconnecter
            </button>
          </div>
        </div>
      </aside>

      <main className="min-w-0 px-4 pb-16 pt-6 sm:px-8 lg:pt-10">{children}</main>
    </div>
  )
}
