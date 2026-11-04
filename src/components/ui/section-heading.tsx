import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type SectionHeadingProps = {
  id: string
  eyebrow: string
  title: ReactNode
  text?: ReactNode
  dark?: boolean
  size?: 'lg' | 'md'
  className?: string
}

/** Surtitre + titre + texte d'introduction, utilisé en tête de nombreuses sections. */
export function SectionHeading({ id, eyebrow, title, text, dark = false, size = 'lg', className }: SectionHeadingProps) {
  return (
    <div className={cn('flex max-w-[740px] flex-col gap-[18px]', className)}>
      <span className={cn('eyebrow', dark ? 'text-copper-light' : 'text-copper')}>{eyebrow}</span>
      <h2 id={id} className={cn('font-extrabold', size === 'lg' ? 'text-[clamp(36px,4.6vw,64px)]' : 'text-[clamp(36px,4.4vw,58px)]')}>
        {title}
      </h2>
      {text && <p className={cn('max-w-[600px] text-[19px]', dark ? 'text-mal-fog' : 'text-ink-soft')}>{text}</p>}
    </div>
  )
}
