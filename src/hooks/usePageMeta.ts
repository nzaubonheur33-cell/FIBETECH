import { useEffect } from 'react'

/** Met à jour le titre de l'onglet et la description de la page (référencement). */
export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    document.title = title ? `Fibetech · ${title}` : 'Fibetech · Startup informatique à Lubumbashi'
    if (description) {
      let tag = document.querySelector<HTMLMetaElement>('meta[name="description"]')
      if (!tag) {
        tag = document.createElement('meta')
        tag.name = 'description'
        document.head.appendChild(tag)
      }
      tag.content = description
    }
  }, [title, description])
}
