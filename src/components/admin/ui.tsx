// Éléments de mise en page de l'admin (utilisables dans les pages serveur et client).
import Link from 'next/link'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function PageHeader({ title, description, actions, back }: { title: string; description?: ReactNode; actions?: ReactNode; back?: { href: string; label: string } }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div className="flex min-w-0 max-w-[760px] flex-col gap-2">
        {back && (
          <Link href={back.href} className="self-start text-sm font-semibold text-ink-muted no-underline hover:text-copper">
            ← {back.label}
          </Link>
        )}
        <h1 className="text-[clamp(28px,3.4vw,40px)] font-extrabold tracking-[-0.03em]">{title}</h1>
        {description && <div className="text-[15px] text-ink-soft">{description}</div>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  )
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('rounded-2xl border border-line bg-white p-5 shadow-[0_1px_2px_rgba(18,22,20,0.04)] sm:p-6', className)}>{children}</div>
}
