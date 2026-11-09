import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import LoginForm from '@/components/admin/LoginForm'
import { Logo } from '@/components/ui/logo'
import { getAdminSession } from '@/lib/auth'
import { hasAuthSecret } from '@/lib/session'

export const metadata: Metadata = { title: 'Connexion' }
export const dynamic = 'force-dynamic'

export default async function LoginPage() {
  if (await getAdminSession()) redirect('/admin')

  return (
    <div className="grid min-h-screen place-items-center bg-mal-deep px-4 py-12">
      <div className="w-full max-w-[420px]">
        <div className="mb-6 flex flex-col items-center gap-2 text-white">
          <Logo tone="dark" size={36} animatedDot={false} />
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-mal-mist">Administration du site</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white p-7 shadow-[10px_10px_0_#B4532A] sm:p-8">
          <h1 className="mb-1 text-[28px] font-extrabold">Connexion</h1>
          <p className="mb-6 text-[15px] text-ink-muted">Accès réservé à l’équipe Fibetech.</p>
          {!hasAuthSecret() && (
            <p className="mb-4 rounded-xl border border-copper/40 bg-copper-soft p-3 text-sm text-ink">
              <strong>Configuration incomplète :</strong> ajoutez <code>AUTH_SECRET</code> (32 caractères minimum) dans le fichier <code>.env</code>, puis redémarrez le serveur.
            </p>
          )}
          <Suspense>
            <LoginForm />
          </Suspense>
        </div>
        <p className="mt-6 text-center text-sm">
          <a href="/" className="text-mal-mist hover:text-white">
            ← Retour au site
          </a>
        </p>
      </div>
    </div>
  )
}
