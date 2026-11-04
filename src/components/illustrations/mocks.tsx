import type { CSSProperties, ReactNode } from 'react'
import { cn } from '@/lib/utils'

/** Motifs « pagne » (wax) dessinés en CSS, sans image. */
export const wax = {
  copper: { background: 'radial-gradient(circle at 30% 30%, #E0A93B 0 18%, transparent 19%) 0 0/22px 22px, #B4532A' },
  malachite: { background: 'radial-gradient(circle, #FFFFFF 0 16%, transparent 17%) 0 0/18px 18px, #0E5A45' },
  mustard: { background: 'radial-gradient(circle at 60% 40%, #121614 0 14%, transparent 15%) 0 0/20px 20px, #E0A93B' },
  stripes: { background: 'repeating-linear-gradient(45deg, #D9654B 0 10px, #2B3A55 10px 20px)' },
} satisfies Record<string, CSSProperties>

function Dots({ size = 9 }: { size?: number }) {
  return (
    <>
      <span className="rounded-full bg-copper" style={{ width: size, height: size }} />
      <span className="rounded-full bg-mustard" style={{ width: size, height: size }} />
      <span className="rounded-full bg-mal-glow" style={{ width: size, height: size }} />
    </>
  )
}

export function BrowserFrame({ children, url, className, style }: { children: ReactNode; url?: string; className?: string; style?: CSSProperties }) {
  return (
    <div className={cn('overflow-hidden rounded-[14px] border-[1.5px] border-ink bg-white', className)} style={style}>
      <div className="flex items-center gap-1.5 border-b-[1.5px] border-ink px-3 py-2.5">
        <Dots />
        {url && <span className="ml-2.5 rounded-full bg-stone px-2.5 py-0.5 font-mono text-[11px] text-ink-soft">{url}</span>}
      </div>
      {children}
    </div>
  )
}

export function PhoneFrame({ children, className, style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <div className={cn('flex flex-col gap-2.5 rounded-[26px] border-2 border-ink bg-white px-3 pb-3 pt-6', className)} style={style}>
      {children}
    </div>
  )
}

export function MobileMoneyPill({ className }: { className?: string }) {
  return <span className={cn('rounded-full bg-ink px-2.5 py-1.5 font-mono text-[10px] text-white', className)}>Payer · Mobile Money</span>
}

/** Boutique en ligne (pagnes) dans une fenêtre de navigateur. */
export function ShopScreen({ className }: { className?: string }) {
  return (
    <BrowserFrame className={cn('float w-[80%]', className)}>
      <div className="grid grid-cols-3 gap-2.5 p-3.5">
        <div className="aspect-square rounded-lg" style={wax.copper} />
        <div className="aspect-square rounded-lg" style={wax.malachite} />
        <div className="aspect-square rounded-lg" style={wax.mustard} />
      </div>
      <div className="flex items-center justify-between px-3.5 pb-3.5">
        <span className="h-[9px] w-[40%] rounded-full bg-line" />
        <MobileMoneyPill />
      </div>
    </BrowserFrame>
  )
}

/** Application de gestion de stock sur téléphone. */
export function StockPhone({ className }: { className?: string }) {
  return (
    <PhoneFrame className={cn('float h-[250px] w-[150px] translate-y-[26px] gap-[9px]', className)}>
      <span className="h-[9px] w-[52%] rounded-full bg-ink" />
      <div className="flex h-[70px] items-end gap-1.5 rounded-[10px] bg-stone p-2">
        <span className="h-[40%] flex-1 rounded-[3px] bg-mal" />
        <span className="h-[70%] flex-1 rounded-[3px] bg-mal" />
        <span className="h-[55%] flex-1 rounded-[3px] bg-mal" />
        <span className="h-[92%] flex-1 rounded-[3px] bg-copper" />
      </div>
      <span className="h-[26px] rounded-lg border-[1.5px] border-line" />
      <span className="h-[26px] rounded-lg border-[1.5px] border-line" />
      <span className="h-[26px] rounded-lg border-[1.5px] border-line" />
    </PhoneFrame>
  )
}

/** Réseau Wi-Fi : routeur, relais et bornes, avec des nœuds qui pulsent. */
export function NetworkGraph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 220" className={cn('w-[86%] max-w-full', className)} aria-hidden="true">
      <g stroke="#3FBF8E" strokeWidth={1.5} opacity={0.7}>
        <path d="M160 40 L70 120 M160 40 L250 120 M70 120 L40 190 M70 120 L110 190 M250 120 L210 190 M250 120 L285 190 M160 40 L160 120" />
      </g>
      <circle cx={160} cy={40} r={16} fill="#B4532A" />
      <circle className="pulse-soft" cx={160} cy={40} r={26} fill="none" stroke="#E8A07A" strokeWidth={1.5} />
      <g fill="#0A1F19" stroke="#3FBF8E" strokeWidth={2}>
        <circle cx={70} cy={120} r={11} />
        <circle cx={250} cy={120} r={11} />
        <circle cx={160} cy={120} r={11} />
      </g>
      <g fill="#3FBF8E">
        <circle className="pulse-soft" cx={40} cy={190} r={6} />
        <circle cx={110} cy={190} r={6} />
        <circle className="pulse-soft" cx={210} cy={190} r={6} />
        <circle cx={285} cy={190} r={6} />
      </g>
    </svg>
  )
}

/** Conversation avec l'assistant de rendez-vous d'une clinique. */
export function ClinicChat({ className }: { className?: string }) {
  return (
    <div className={cn('float flex w-[74%] flex-col gap-2 text-[13px] leading-[1.4]', className)}>
      <span className="max-w-[80%] self-end rounded-[14px_14px_4px_14px] bg-mal-glow px-3 py-2 text-mal-deep">Je voudrais un rendez-vous demain matin</span>
      <span className="max-w-[85%] self-start rounded-[14px_14px_14px_4px] bg-white px-3 py-2 text-ink">Bien sûr ! Il reste 9 h 30 ou 11 h. Lequel vous convient ?</span>
      <span className="self-end rounded-[14px_14px_4px_14px] bg-mal-glow px-3 py-2 text-mal-deep">9 h 30</span>
    </div>
  )
}

/** Petit tableau de bord. */
export function DashMini({ className }: { className?: string }) {
  return (
    <div className={cn('float grid w-[80%] grid-cols-3 gap-2.5', className)}>
      <span className="h-16 rounded-xl border-[1.5px] border-ink bg-white" />
      <span className="h-16 rounded-xl border-[1.5px] border-ink bg-mal-soft" />
      <span className="h-16 rounded-xl border-[1.5px] border-ink bg-white" />
      <div className="col-span-3 rounded-xl border-[1.5px] border-ink bg-white p-3">
        <svg viewBox="0 0 200 60" className="w-full">
          <polyline points="0,52 30,40 60,46 90,26 120,32 150,16 200,8" fill="none" stroke="#0E5A45" strokeWidth={3} strokeLinejoin="round" />
          <circle cx={200} cy={8} r={5} fill="#B4532A" />
        </svg>
      </div>
    </div>
  )
}

/** Petit formulaire d'inscription. */
export function FormMini({ className }: { className?: string }) {
  return (
    <div className={cn('float flex w-[70%] flex-col gap-2.5 rounded-2xl border-[1.5px] border-ink bg-white p-[18px]', className)}>
      <span className="h-3 w-[55%] rounded-[5px] bg-ink" />
      <span className="h-[34px] rounded-[10px] border-[1.5px] border-line" />
      <span className="h-[34px] rounded-[10px] border-[1.5px] border-line" />
      <span className="h-9 rounded-full bg-copper" />
    </div>
  )
}

export type ProjectKind = 'shop' | 'stock' | 'chat' | 'network' | 'dash' | 'form'

export const projectBackgrounds: Record<ProjectKind, string> = {
  shop: '#0E5A45',
  stock: '#FCEBDD',
  chat: '#0A1F19',
  network: '#121614',
  dash: '#F1F4F1',
  form: '#E0A93B',
}

export function ProjectVisual({ kind }: { kind: ProjectKind }) {
  switch (kind) {
    case 'shop':
      return <ShopScreen />
    case 'stock':
      return <StockPhone />
    case 'chat':
      return <ClinicChat />
    case 'network':
      return <NetworkGraph />
    case 'dash':
      return <DashMini />
    case 'form':
      return <FormMini />
  }
}
