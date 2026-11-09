'use client'

import { useEffect } from 'react'

/** Demande confirmation avant de quitter la page s'il reste des modifications non enregistrées. */
export function useUnsavedWarning(dirty: boolean) {
  useEffect(() => {
    if (!dirty) return
    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault()
      event.returnValue = ''
    }
    window.addEventListener('beforeunload', onBeforeUnload)
    return () => window.removeEventListener('beforeunload', onBeforeUnload)
  }, [dirty])
}
