'use client'

import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { translateLocal, type Locale } from '@/lib/i18n/translations'

const STORAGE_KEY = 'fibetech-site-language'
const SiteLanguageContext = createContext<{ locale: Locale; setLocale: (locale: Locale) => void } | null>(null)
const translatableAttributes = ['aria-label', 'aria-description', 'title', 'placeholder', 'alt', 'content'] as const

export function SiteLanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('fr')
  const lastAppliedLocale = useRef<Locale>('fr')
  const textState = useRef({ original: new WeakMap<Text, string>(), last: new WeakMap<Text, string>() })
  const attributeState = useRef({ original: new WeakMap<Element, Map<string, string>>(), last: new WeakMap<Element, Map<string, string>>() })

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (saved === 'fr' || saved === 'en' || saved === 'ln' || saved === 'sw') setLocaleState(saved)
    } catch {
      // The selector remains usable when browser storage is disabled.
    }
  }, [])

  useEffect(() => {
    const root = document.getElementById('site-language-root')
    if (!root) return

    document.documentElement.lang = locale
    // French is the server-rendered source language. Avoid scanning the whole
    // document and installing a MutationObserver on every normal page visit.
    if (locale === 'fr' && lastAppliedLocale.current === 'fr') return

    const { original: originalText, last: lastText } = textState.current
    const { original: originalAttributes, last: lastAttributes } = attributeState.current

    const localizeText = (node: Text) => {
      const parent = node.parentElement
      if (!parent || parent.closest('[data-no-translate],script,style,noscript,textarea,svg')) return

      let source = originalText.get(node)
      const current = node.data
      const previous = lastText.get(node)
      if (source === undefined || (previous !== undefined && current !== previous)) {
        source = current
        originalText.set(node, source)
      }
      const translated = translateLocal(source, locale)
      if (translated !== current) node.data = translated
      lastText.set(node, translated)
    }

    const localizeElement = (element: Element) => {
      if (element.closest('[data-no-translate]')) return
      const original = originalAttributes.get(element) ?? new Map<string, string>()
      const last = lastAttributes.get(element) ?? new Map<string, string>()
      for (const attribute of translatableAttributes) {
        const current = element.getAttribute(attribute)
        if (current === null) continue
        let source = original.get(attribute)
        const previous = last.get(attribute)
        if (source === undefined || (previous !== undefined && current !== previous)) {
          source = current
          original.set(attribute, source)
        }
        const translated = translateLocal(source, locale)
        if (translated !== current) element.setAttribute(attribute, translated)
        last.set(attribute, translated)
      }
      originalAttributes.set(element, original)
      lastAttributes.set(element, last)
    }

    const localizeTree = (scope: ParentNode) => {
      const walker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT)
      let node: Node | null
      while ((node = walker.nextNode())) localizeText(node as Text)
      if (scope instanceof Element) localizeElement(scope)
      scope.querySelectorAll('*').forEach(localizeElement)
    }

    localizeTree(root)
    localizeTree(document.head)
    lastAppliedLocale.current = locale
    // When switching back to French, restore text once and leave React free
    // from the observer; new pages are already rendered in French.
    if (locale === 'fr') return

    const observer = new MutationObserver((records) => {
      for (const record of records) {
        if (record.type === 'characterData' && record.target instanceof Text) localizeText(record.target)
        if (record.type === 'attributes' && record.target instanceof Element) localizeElement(record.target)
        record.addedNodes.forEach((node) => {
          if (node instanceof Text) localizeText(node)
          else if (node instanceof Element) localizeTree(node)
        })
      }
    })
    const config = { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: [...translatableAttributes] }
    observer.observe(root, config)
    observer.observe(document.head, config)

    return () => observer.disconnect()
  }, [locale])

  const setLocale = (next: Locale) => {
    setLocaleState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // The selection is still applied for the current page view.
    }
  }

  const context = useMemo(() => ({ locale, setLocale }), [locale])
  return (
    <SiteLanguageContext.Provider value={context}>
      <div id="site-language-root" className="contents">
        {children}
      </div>
    </SiteLanguageContext.Provider>
  )
}

export function useSiteLanguage() {
  const value = useContext(SiteLanguageContext)
  if (!value) throw new Error('useSiteLanguage doit être utilisé dans SiteLanguageProvider.')
  return value
}

export function SiteLanguageSelect() {
  const { locale, setLocale } = useSiteLanguage()
  const labels: Record<Locale, string> = { fr: 'Langue du site', en: 'Site language', ln: 'Lokota ya site', sw: 'Lugha ya tovuti' }
  return (
    <div className="flex items-center">
      <label className="sr-only" htmlFor="site-language-select">{labels[locale]}</label>
      <select
        id="site-language-select"
        aria-label={labels[locale]}
        data-no-translate="true"
        value={locale}
        onChange={(event) => setLocale(event.target.value as Locale)}
        className="h-10 rounded-full border border-line bg-white px-3 text-sm font-semibold text-ink outline-none focus:border-copper"
      >
        <option value="fr">FR</option>
        <option value="en">EN</option>
        <option value="ln">LN</option>
        <option value="sw">SW</option>
      </select>
    </div>
  )
}
