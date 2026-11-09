// Affichage des textes saisis dans l'admin, avec une mise en forme légère :
//   *mots*          mis en couleur (titres uniquement)
//   **mots**        gras
//   [texte](lien)   lien (interne « /contact », externe « https://… », « mailto: », « tel: »)
//   [texte]         valeur à compléter, surlignée en cuivre pâle
//   {phone}…        coordonnées du site
// Aucun HTML n'est interprété : le texte saisi ne peut pas injecter de code dans la page.
import Link from 'next/link'
import type { ReactNode } from 'react'
import { Ph } from '@/components/ui/placeholder'
import { fill, type Tokens } from '@/lib/format'

const WITH_ACCENT = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)\s]+)\)|\[([^\]]+)\]|\*([^*]+)\*/g
const WITHOUT_ACCENT = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)\s]+)\)|\[([^\]]+)\]/g

type InlineOptions = {
  tokens?: Tokens
  /** Rendu des *mots* : sans cette option, les astérisques simples restent du texte. */
  accent?: (text: string, key: string) => ReactNode
  /** Placeholders sur fond sombre. */
  dark?: boolean
  linkClassName?: string
}

function SafeLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  if (href.startsWith('/') && !href.startsWith('//')) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    )
  }
  if (href.startsWith('#') || /^(mailto|tel):/i.test(href)) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    )
  }
  if (/^https?:\/\//i.test(href)) {
    return (
      <a href={href} className={className} target="_blank" rel="noreferrer">
        {children}
      </a>
    )
  }
  return <>{children}</>
}

export function renderInline(text: string, options: InlineOptions = {}, prefix = 'r'): ReactNode[] {
  const source = fill(text, options.tokens)
  const pattern = new RegExp((options.accent ? WITH_ACCENT : WITHOUT_ACCENT).source, 'g')
  const nodes: ReactNode[] = []
  let last = 0
  let index = 0
  for (const match of source.matchAll(pattern)) {
    const at = match.index ?? 0
    if (at > last) nodes.push(source.slice(last, at))
    const key = `${prefix}-${index++}`
    const [, bold, label, href, placeholder, accent] = match
    if (bold !== undefined) nodes.push(<strong key={key}>{bold}</strong>)
    else if (label !== undefined && href !== undefined)
      nodes.push(
        <SafeLink key={key} href={href} className={options.linkClassName ?? 'link'}>
          {label}
        </SafeLink>,
      )
    else if (placeholder !== undefined)
      nodes.push(
        <Ph key={key} dark={options.dark} wrap>
          [{placeholder}]
        </Ph>,
      )
    else if (accent !== undefined && options.accent) nodes.push(options.accent(accent, key))
    last = at + match[0].length
  }
  if (last < source.length) nodes.push(source.slice(last))
  return nodes
}

/** Titre avec des *mots* mis en couleur. */
export function RichTitle({
  text,
  accentClassName = 'text-copper',
  renderAccent,
  tokens,
}: {
  text: string
  accentClassName?: string
  renderAccent?: (text: string, key: string) => ReactNode
  tokens?: Tokens
}) {
  const accent =
    renderAccent ??
    ((value: string, key: string) => (
      <span key={key} className={accentClassName}>
        {value}
      </span>
    ))
  return <>{renderInline(text, { tokens, accent })}</>
}

/** Texte sur une ligne (gras, liens, valeurs à compléter). */
export function RichInline({ text, tokens, dark, linkClassName }: { text: string; tokens?: Tokens; dark?: boolean; linkClassName?: string }) {
  return <>{renderInline(text, { tokens, dark, linkClassName })}</>
}

/** Texte long : une ligne vide sépare les paragraphes, « - » en début de ligne crée une liste. */
export function RichText({ text, tokens, dark, className, paragraphClassName }: { text: string; tokens?: Tokens; dark?: boolean; className?: string; paragraphClassName?: string }) {
  const blocks = text
    .replace(/\r\n/g, '\n')
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
  return (
    <div className={className}>
      {blocks.map((block, b) => {
        const lines = block.split('\n')
        if (lines.every((line) => /^\s*[-•]\s+/.test(line))) {
          return (
            <ul key={b} className="my-3 list-disc pl-6">
              {lines.map((line, l) => (
                <li key={l}>{renderInline(line.replace(/^\s*[-•]\s+/, ''), { tokens, dark }, `l${b}-${l}`)}</li>
              ))}
            </ul>
          )
        }
        return (
          <p key={b} className={paragraphClassName}>
            {lines.map((line, l) => (
              <span key={l}>
                {l > 0 && <br />}
                {renderInline(line, { tokens, dark }, `p${b}-${l}`)}
              </span>
            ))}
          </p>
        )
      })}
    </div>
  )
}
