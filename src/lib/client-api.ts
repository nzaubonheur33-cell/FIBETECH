// Appels JSON vers l'API du site, côté navigateur.

export type ApiResult<T = Record<string, unknown>> =
  | ({ ok: true } & T)
  | { ok: false; message: string; errors?: Record<string, string> }

export async function sendJson<T = Record<string, unknown>>(url: string, body?: unknown, method = 'POST'): Promise<ApiResult<T>> {
  try {
    const response = await fetch(url, {
      method,
      headers: body === undefined ? undefined : { 'Content-Type': 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body),
      credentials: 'same-origin',
    })
    const data = (await response.json().catch(() => null)) as ApiResult<T> | null
    if (data && typeof data === 'object' && 'ok' in data) return data
    return { ok: false, message: response.ok ? 'Réponse inattendue du serveur.' : `Erreur ${response.status}.` }
  } catch {
    return { ok: false, message: 'Connexion impossible. Vérifiez votre accès à Internet et réessayez.' }
  }
}
