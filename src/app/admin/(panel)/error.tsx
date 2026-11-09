'use client'

export default function AdminError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const database = /prisma|database|connect|ECONNREFUSED|P10\d\d/i.test(error.message)
  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-[#B42318]/30 bg-white p-8">
      <h1 className="text-2xl font-extrabold">Un problème est survenu</h1>
      <p className="mt-3 text-ink-soft">
        {database
          ? 'La base de données ne répond pas. Vérifiez que MySQL est démarré et que DATABASE_URL est correct dans le fichier .env.'
          : 'La page n’a pas pu être affichée. Réessayez ; si le problème continue, consultez les journaux du serveur.'}
      </p>
      {error.digest && <p className="mt-2 font-mono text-xs text-ink-muted">Référence : {error.digest}</p>}
      <button type="button" onClick={reset} className="btn btn-cu mt-6 min-h-11 px-5 text-[15px]">
        Réessayer
      </button>
    </div>
  )
}
