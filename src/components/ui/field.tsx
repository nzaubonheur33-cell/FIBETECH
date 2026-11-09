import type { ReactNode } from 'react'

/** Libellé + champ + message d'erreur. L'erreur porte l'id `${id}-err` (à relier via aria-describedby). */
export function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="label" htmlFor={id}>
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} className="text-sm font-semibold text-[#B42318]">
          {error}
        </p>
      )}
    </div>
  )
}

/** Accepte +243…, 0…, avec ou sans espaces (9 à 15 chiffres). */
export const isPhone = (value: string) => /^\+?\d{9,15}$/.test(value.replace(/[\s.-]/g, ''))

/** Champ invisible : les robots le remplissent, les humains ne le voient pas. Le serveur rejette l'envoi s'il est rempli. */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
      <label>
        Ne pas remplir
        <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  )
}
