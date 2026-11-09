'use client'

import { useState, type FormEvent } from 'react'
import { sendJson } from '@/lib/client-api'

/** Inscription à la lettre d'information (pied de page et blog). */
export function useNewsletter(source: 'footer' | 'blog') {
  const [state, setState] = useState<'idle' | 'sending' | 'done'>('idle')
  const [error, setError] = useState('')

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    setState('sending')
    setError('')
    const result = await sendJson('/api/newsletter', { email: String(data.get('email') ?? ''), website: String(data.get('website') ?? ''), source })
    if (result.ok) setState('done')
    else {
      setState('idle')
      setError(result.message)
    }
  }

  return { state, error, onSubmit }
}
