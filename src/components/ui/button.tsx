import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { ArrowRight } from './icons'

export type ButtonVariant = 'cu' | 'ink' | 'ghost' | 'light' | 'light-cu' | 'cu-light' | 'line'

const variantClass: Record<ButtonVariant, string> = {
  cu: 'btn-cu',
  ink: 'btn-ink',
  ghost: 'btn-ghost',
  light: 'btn-light',
  'light-cu': 'btn-light-cu',
  'cu-light': 'btn-cu-light',
  line: 'btn-line',
}

type CommonProps = {
  variant?: ButtonVariant
  arrow?: boolean
  className?: string
  children: ReactNode
}

type LinkButtonProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'> & {
    /** Lien interne (React Router). */
    to?: string
    /** Lien externe ou tel:. */
    href?: string
  }

export function ButtonLink({ variant = 'cu', arrow = false, className, children, to, href, ...rest }: LinkButtonProps) {
  const cls = cn('btn', variantClass[variant], className)
  const content = (
    <>
      {children}
      {arrow && <ArrowRight />}
    </>
  )
  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {content}
      </Link>
    )
  }
  return (
    <a href={href} className={cls} {...rest}>
      {content}
    </a>
  )
}

type ButtonProps = CommonProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>

export function Button({ variant = 'cu', arrow = false, className, children, type = 'button', ...rest }: ButtonProps) {
  return (
    <button type={type} className={cn('btn', variantClass[variant], className)} {...rest}>
      {children}
      {arrow && <ArrowRight />}
    </button>
  )
}
