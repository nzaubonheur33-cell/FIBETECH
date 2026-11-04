import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { size?: number }

export function ArrowRight({ size = 18, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

export function Check({ size = 20, strokeWidth = 2.2, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M4 12.5l5 5L20 6.5" />
    </svg>
  )
}

export function Plus({ size = 16, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" aria-hidden="true" {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

export function SearchIcon({ size = 22, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true" {...props}>
      <path d="M10.5 18a7.5 7.5 0 1 0 0-15a7.5 7.5 0 0 0 0 15z M16 16l5 5" />
    </svg>
  )
}

/** Petit soleil sur l'horizon, utilisé comme séparateur et puce. */
export function HorizonDot({ fill = '#B4532A', line = '#3FBF8E', width = 26, height = 18, ...props }: IconProps & { fill?: string; line?: string }) {
  return (
    <svg width={width} height={height} viewBox="0 0 26 18" aria-hidden="true" {...props}>
      <path d="M5 13a8 8 0 0 1 16 0z" fill={fill} />
      <path d="M1 13h24" stroke={line} strokeWidth={2} strokeLinecap="round" />
    </svg>
  )
}

/** Tracés d'icônes au trait (24 × 24). */
export const iconPaths = {
  web: 'M2.5 4.5h14v10h-14z M2.5 7.5h14 M5 6h.01 M7 6h.01 M18 8.5h3.5v11H18z M19.75 17.5h.01',
  it: 'M4 13v-1a8 8 0 0 1 16 0v1 M4 13h3v5H5a1 1 0 0 1-1-1z M20 13h-3v5h2a1 1 0 0 0 1-1z M17 18c0 1.7-1.8 2.5-4 2.5',
  transfo: 'M4 7h11 M12 4l3 3-3 3 M20 17H9 M12 14l-3 3 3 3',
  ia: 'M7 7h10v10H7z M10 3v4 M14 3v4 M10 17v4 M14 17v4 M3 10h4 M3 14h4 M17 10h4 M17 14h4 M10.5 12h3',
  reseaux: 'M14 5a2 2 0 1 1-4 0a2 2 0 1 1 4 0 M7 18a2 2 0 1 1-4 0a2 2 0 1 1 4 0 M21 18a2 2 0 1 1-4 0a2 2 0 1 1 4 0 M12 7v4 M12 11l-6.5 5.4 M12 11l6.5 5.4',
  conseil: 'M21 12a9 9 0 1 1-18 0a9 9 0 1 1 18 0 M15.5 8.5l-2 5-5 2 2-5z',
  star: 'M12 3l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5z',
  phone: 'M7 2.5h10v19H7z M11 18.5h2',
  card: 'M3 7h18v11H3z M3 11h18 M7 15h3',
  chat: 'M4 5h16v11H9l-5 4z M8 10h8',
  pin: 'M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z M14.5 9.5a2.5 2.5 0 1 1-5 0a2.5 2.5 0 1 1 5 0',
  globe: 'M21 12a9 9 0 1 1-18 0a9 9 0 1 1 18 0 M3 12h18 M12 3c2.5 2.7 3.5 5.7 3.5 9s-1 6.3-3.5 9c-2.5-2.7-3.5-5.7-3.5-9s1-6.3 3.5-9',
  admin: 'M4 4h16v16H4z M4 9h16 M9 9v11',
  book: 'M4 5h7a2 2 0 0 1 2 2v12a2 2 0 0 0-2-2H4z M20 5h-7a2 2 0 0 0-2 2v12a2 2 0 0 1 2-2h7z',
  bolt: 'M13 2L4 14h7l-1 8 9-12h-7z',
  cap: 'M2 8l10-5 10 5-10 5z M6 10v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5',
  headset: 'M4 13v-1a8 8 0 0 1 16 0v1 M4 13h3v5H5a1 1 0 0 1-1-1z M20 13h-3v5h2a1 1 0 0 0 1-1z',
  bag: 'M5 8h14l-1.2 12H6.2z M9 8V6.5a3 3 0 0 1 6 0V8',
  sheet: 'M4 4h16v16H4z M4 9.5h16 M4 15h16 M10 4v16',
  shield: 'M12 3l7 3v5.5c0 4.3-3 7.8-7 9.5-4-1.7-7-5.2-7-9.5V6z M9 12l2.2 2.2L15.5 10',
  wrench: 'M14.5 6.5l3 3 3.2-3.2a5 5 0 0 1-6.6 6.6L7 20a2.1 2.1 0 0 1-3-3l7.1-7.1a5 5 0 0 1 6.6-6.6z',
} as const

export type IconName = keyof typeof iconPaths

export function PathIcon({ name, size = 30, strokeWidth = 1.6, className, ...props }: IconProps & { name: IconName }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...props}>
      <path d={iconPaths[name]} />
    </svg>
  )
}
