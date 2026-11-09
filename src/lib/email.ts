type EmailNotice = {
  to: string
  subject: string
  text: string
  html: string
  replyTo?: string
}

export function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    switch (character) {
      case '&': return '&amp;'
      case '<': return '&lt;'
      case '>': return '&gt;'
      case '"': return '&quot;'
      default: return '&#39;'
    }
  })
}

/** Envoie une notification via Resend si les identifiants sont configurés. */
export async function sendEmailNotice({ to, subject, text, html, replyTo }: EmailNotice): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim()
  const from = process.env.RESEND_FROM_EMAIL?.trim()
  if (!apiKey || !from || !to) return

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from, to: [to], ...(replyTo ? { reply_to: replyTo } : {}), subject, text, html }),
      cache: 'no-store',
      signal: AbortSignal.timeout(5_000),
    })
    if (!response.ok) console.error('[email] Échec de la notification Resend :', response.status)
  } catch (error) {
    console.error('[email] Notification indisponible :', error instanceof Error ? error.message : 'erreur inconnue')
  }
}
