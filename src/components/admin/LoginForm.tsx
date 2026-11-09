'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, type FormEvent } from 'react'
import { sendJson } from '@/lib/client-api'
import { FieldShell, TextInput } from './inputs'

/** N'accepte qu'un retour vers une page de l'admin (pas de redirection vers un autre site). */
function safeNext(value: string | null) {
  return value && /^\/admin(\/[\w\-/]*)?$/.test(value) && value !== '/admin/login' ? value : '/admin'
}

export default function LoginForm() {
  const router = useRouter()
  const params = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setBusy(true)
    setError('')
    const result = await sendJson('/api/auth/login', { email, password })
    if (!result.ok) {
      setBusy(false)
      setError(result.message)
      return
    }
    router.replace(safeNext(params.get('next')))
    router.refresh()
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <FieldShell id="login-email" label="E-mail">
        <TextInput id="login-email" type="email" value={email} onChange={setEmail} />
      </FieldShell>
      <FieldShell id="login-password" label="Mot de passe">
        <TextInput id="login-password" type="password" value={password} onChange={setPassword} />
      </FieldShell>
      {error && (
        <p role="alert" className="rounded-xl border border-[#B42318]/30 bg-[#FEF3F2] px-4 py-3 text-sm font-semibold text-[#B42318]">
          {error}
        </p>
      )}
      <button type="submit" disabled={busy} className="btn btn-cu mt-1 min-h-12 justify-center text-[15px]">
        {busy ? 'Connexion…' : 'Se connecter'}
      </button>
    </form>
  )
}
