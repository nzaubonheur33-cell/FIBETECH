'use client'

import { useRouter } from 'next/navigation'
import { useState, type FormEvent } from 'react'
import { sendJson } from '@/lib/client-api'
import { cn } from '@/lib/utils'
import { FieldShell, Icon, smallButton, TextInput } from './inputs'

type User = { id: number; name: string; email: string; createdAt: string; lastLoginAt: string | null }

const dateFormat = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Africa/Lubumbashi' })

function Message({ ok, text }: { ok: boolean; text: string }) {
  if (!text) return null
  return (
    <p role="status" className={cn('text-sm font-semibold', ok ? 'text-mal' : 'text-[#B42318]')}>
      {text}
    </p>
  )
}

export default function AccountsPanel({ users: initial, me }: { users: User[]; me: { id: number; name: string } }) {
  const router = useRouter()
  const [users, setUsers] = useState(initial)

  // Mon compte
  const [myName, setMyName] = useState(me.name)
  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [confirm, setConfirm] = useState('')
  const [accountMsg, setAccountMsg] = useState({ ok: true, text: '' })

  // Nouveau compte
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [createMsg, setCreateMsg] = useState({ ok: true, text: '' })
  const [listMsg, setListMsg] = useState('')

  const saveAccount = async (event: FormEvent) => {
    event.preventDefault()
    if (next && next !== confirm) {
      setAccountMsg({ ok: false, text: 'Les deux nouveaux mots de passe ne sont pas identiques.' })
      return
    }
    const result = await sendJson('/api/admin/account', { currentPassword: current, name: myName, newPassword: next }, 'PUT')
    if (!result.ok) {
      setAccountMsg({ ok: false, text: result.message })
      return
    }
    setCurrent('')
    setNext('')
    setConfirm('')
    setAccountMsg({ ok: true, text: 'Compte mis à jour ✓' })
    router.refresh()
  }

  const createUser = async (event: FormEvent) => {
    event.preventDefault()
    const result = await sendJson<{ user: User }>('/api/admin/users', form)
    if (!result.ok) {
      setFormErrors(result.errors ?? {})
      setCreateMsg({ ok: false, text: result.message })
      return
    }
    setUsers((list) => [...list, { ...result.user, createdAt: String(result.user.createdAt) }])
    setForm({ name: '', email: '', password: '' })
    setFormErrors({})
    setCreateMsg({ ok: true, text: 'Compte créé ✓ Transmettez le mot de passe à la personne par un moyen sûr.' })
  }

  const removeUser = async (user: User) => {
    if (!window.confirm(`Supprimer le compte de ${user.name} (${user.email}) ?`)) return
    const result = await sendJson(`/api/admin/users/${user.id}`, undefined, 'DELETE')
    if (!result.ok) {
      setListMsg(result.message)
      return
    }
    setUsers((list) => list.filter((u) => u.id !== user.id))
  }

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <section className="flex flex-col gap-4 rounded-2xl border border-line bg-white p-5 sm:p-6">
        <h2 className="text-xl font-bold">Mon compte</h2>
        <form className="flex flex-col gap-4" onSubmit={saveAccount}>
          <FieldShell id="me-name" label="Nom affiché">
            <TextInput id="me-name" value={myName} onChange={setMyName} maxLength={120} />
          </FieldShell>
          <FieldShell id="me-next" label="Nouveau mot de passe" hint="10 caractères minimum. Laissez vide pour le garder.">
            <TextInput id="me-next" type="password" value={next} onChange={setNext} />
          </FieldShell>
          {next && (
            <FieldShell id="me-confirm" label="Confirmer le nouveau mot de passe">
              <TextInput id="me-confirm" type="password" value={confirm} onChange={setConfirm} />
            </FieldShell>
          )}
          <FieldShell id="me-current" label="Mot de passe actuel" hint="Obligatoire pour toute modification.">
            <TextInput id="me-current" type="password" value={current} onChange={setCurrent} />
          </FieldShell>
          <div className="flex flex-wrap items-center gap-3">
            <button type="submit" className="btn btn-cu min-h-11 px-5 text-[15px]" disabled={!current}>
              Mettre à jour
            </button>
            <Message {...accountMsg} />
          </div>
        </form>
      </section>

      <section className="flex flex-col gap-4 rounded-2xl border border-line bg-white p-5 sm:p-6">
        <h2 className="text-xl font-bold">Comptes administrateurs</h2>
        <ul className="m-0 flex list-none flex-col divide-y divide-line p-0">
          {users.map((user) => (
            <li key={user.id} className="flex flex-wrap items-center gap-3 py-3">
              <span className="min-w-0 flex-1">
                <span className="block font-semibold">
                  {user.name} {user.id === me.id && <span className="text-sm font-normal text-ink-muted">(vous)</span>}
                </span>
                <span className="block truncate text-sm text-ink-muted">{user.email}</span>
                <span className="block text-xs text-ink-muted">Dernière connexion : {user.lastLoginAt ? dateFormat.format(new Date(user.lastLoginAt)) : 'jamais'}</span>
              </span>
              {user.id !== me.id && (
                <button type="button" className={cn(smallButton, 'px-2 hover:border-[#B42318] hover:text-[#B42318]')} onClick={() => removeUser(user)} aria-label={`Supprimer ${user.name}`}>
                  <Icon name="trash" />
                </button>
              )}
            </li>
          ))}
        </ul>
        {listMsg && <p className="text-sm font-semibold text-[#B42318]">{listMsg}</p>}

        <form className="mt-2 flex flex-col gap-4 rounded-xl border border-dashed border-line p-4" onSubmit={createUser}>
          <h3 className="text-base font-bold">Ajouter un compte</h3>
          <FieldShell id="u-name" label="Nom" error={formErrors.name}>
            <TextInput id="u-name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} maxLength={120} />
          </FieldShell>
          <FieldShell id="u-email" label="E-mail" error={formErrors.email}>
            <TextInput id="u-email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} maxLength={191} />
          </FieldShell>
          <FieldShell id="u-password" label="Mot de passe provisoire" hint="10 caractères minimum." error={formErrors.password}>
            <TextInput id="u-password" type="password" value={form.password} onChange={(v) => setForm({ ...form, password: v })} />
          </FieldShell>
          <div className="flex flex-wrap items-center gap-3">
            <button type="submit" className={smallButton}>
              <Icon name="plus" /> Créer le compte
            </button>
            <Message {...createMsg} />
          </div>
        </form>
      </section>
    </div>
  )
}
