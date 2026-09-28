import React, { createContext, useContext, useState, useEffect } from 'react'
import { en } from './en'
import { ar } from './ar'

export type Lang = 'en' | 'ar'
export type Dir = 'ltr' | 'rtl'
export type TranslationKey = keyof typeof en

interface LangContextType {
  lang: Lang
  dir: Dir
  setLang: (lang: Lang) => void
  toggleLang: () => void
  t: (key: TranslationKey, params?: Record<string, string | number>) => string
}

const LangContext = createContext<LangContextType | null>(null)

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem('layali.lang')
    if (saved === 'ar' || saved === 'en') return saved
    return 'en'
  })

  const dir: Dir = lang === 'ar' ? 'rtl' : 'ltr'

  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('lang', lang)
    root.setAttribute('dir', dir)
    localStorage.setItem('layali.lang', lang)
  }, [lang, dir])

  const setLang = (newLang: Lang) => {
    // Add quick transition class to body
    document.body.classList.add('lang-crossfade')
    setLangState(newLang)
    setTimeout(() => {
      document.body.classList.remove('lang-crossfade')
    }, 260)
  }

  const toggleLang = () => {
    setLang(lang === 'en' ? 'ar' : 'en')
  }

  const t = (key: TranslationKey, params?: Record<string, string | number>): string => {
    const dict = lang === 'ar' ? ar : en
    let str = dict[key] || en[key] || key
    if (params) {
      Object.entries(params).forEach(([paramKey, val]) => {
        str = str.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(val))
      })
    }
    return str
  }

  return (
    <LangContext.Provider value={{ lang, dir, setLang, toggleLang, t }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  const context = useContext(LangContext)
  if (!context) {
    throw new Error('useLang must be used within a LangProvider')
  }
  return context
}
