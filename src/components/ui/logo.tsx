import type { CSSProperties } from 'react'
import { cn } from '@/lib/utils'

/**
 * Logo Fibetech.
 * Symbole : un « f » formé de trois fibres et d'un point de lumière cuivré.
 * Logotype : « fibetech » en Bricolage Grotesque 800, avec le point du i en cuivre.
 * Les positions du point sont calculées à partir des mesures de la police
 * (hauteur d'x 0,528 em, point du i à 0,754 em de la ligne de base).
 */

export type LogoTone = 'light' | 'dark' | 'ink' | 'copper'

const tones: Record<LogoTone, { text: string; strand: string; knock: string; dot: string }> = {
  light: { text: '#121614', strand: '#121614', knock: '#FFFFFF', dot: '#B4532A' },
  dark: { text: '#FFFFFF', strand: '#FFFFFF', knock: '#0A1F19', dot: '#E8A07A' },
  ink: { text: '#FFFFFF', strand: '#FFFFFF', knock: '#121614', dot: '#E8A07A' },
  copper: { text: '#FFFFFF', strand: '#FFFFFF', knock: '#B4532A', dot: '#121614' },
}

export const STRANDS = [
  'M11 58V32A26 26 0 0 1 37 6H45',
  'M18 58V32A19 19 0 0 1 37 13H45',
  'M25 58V32A12 12 0 0 1 37 20H45',
]

type MarkProps = {
  tone?: LogoTone
  /** Couleur du fond derrière la barre du f (crée l'effet de fil tissé). */
  knock?: string
  className?: string
  style?: CSSProperties
  title?: string
}

export function LogoMark({ tone = 'light', knock, className, style, title }: MarkProps) {
  const t = tones[tone]
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      strokeLinecap="round"
      className={className}
      style={style}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <g transform="translate(3 0)">
        <g stroke={t.strand} strokeWidth={4.5}>
          {STRANDS.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
        <path d="M4 38H33" stroke={knock ?? t.knock} strokeWidth={8} />
        <path d="M4 38H33" stroke={t.strand} strokeWidth={4.5} />
        <circle cx={52.5} cy={13} r={3.6} fill={t.dot} />
      </g>
    </svg>
  )
}

/** Icône d'application : symbole blanc sur carré arrondi. */
export function AppIcon({ bg = '#121614', dot = '#E8A07A', className, style }: { bg?: string; dot?: string; className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 64 64" className={className} style={style} aria-hidden="true">
      <rect width="64" height="64" rx="15" fill={bg} />
      <g transform="translate(32 32) scale(0.68) translate(-32 -32) translate(3 0)" fill="none" strokeLinecap="round">
        <g stroke="#FFFFFF" strokeWidth={4.5}>
          {STRANDS.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
        <path d="M4 38H33" stroke={bg} strokeWidth={8} />
        <path d="M4 38H33" stroke="#FFFFFF" strokeWidth={4.5} />
        <circle cx={52.5} cy={13} r={3.6} fill={dot} />
      </g>
    </svg>
  )
}

type WordmarkProps = {
  dot: string
  /** Position verticale du point (dépend de l'interligne : 0,076 em pour 1, -0,024 em pour 0,8). */
  dotTop?: string
  animatedDot?: boolean
}

export function Wordmark({ dot, dotTop = '0.076em', animatedDot = false }: WordmarkProps) {
  return (
    <span className="inline-flex items-baseline">
      <span style={{ marginRight: '0.04em' }}>f</span>
      <span className="relative inline-block">
        ı
        <span
          className={animatedDot ? 'logo-dot' : undefined}
          style={{
            position: 'absolute',
            left: '0.1425em',
            top: dotTop,
            width: '0.18em',
            height: '0.18em',
            marginLeft: '-0.09em',
            borderRadius: '50%',
            background: dot,
          }}
        />
      </span>
      <span>betech</span>
    </span>
  )
}

type LogoProps = {
  tone?: LogoTone
  /** Taille du texte en pixels ; le symbole suit. */
  size?: number
  knock?: string
  withMark?: boolean
  animatedDot?: boolean
  className?: string
}

/** Logo complet : symbole + logotype. Décoratif : le lien parent porte le nom accessible. */
export function Logo({ tone = 'light', size = 34, knock, withMark = true, animatedDot = true, className }: LogoProps) {
  const t = tones[tone]
  return (
    <span
      aria-hidden="true"
      className={cn('inline-flex items-center whitespace-nowrap font-display', className)}
      style={{ gap: '0.3em', fontSize: size, fontWeight: 800, lineHeight: 1, letterSpacing: '-0.05em', color: t.text }}
    >
      {withMark && (
        <LogoMark
          tone={tone}
          knock={knock}
          style={{ flex: 'none', position: 'relative', top: '-0.085em', width: '0.94em', height: '0.94em' }}
        />
      )}
      <Wordmark dot={t.dot} animatedDot={animatedDot} />
    </span>
  )
}
