import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { translations, Lang, TranslationKey } from '../i18n/translations'
import { supabase } from '../lib/supabase'

interface LanguageContextValue {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: TranslationKey) => string
  dir: 'ltr' | 'rtl'
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

const STORAGE_KEY = 'pg_lang'

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored === 'ar' ? 'ar' : 'en'
  })

  const dir = lang === 'ar' ? 'rtl' : 'ltr'

  useEffect(() => {
    document.documentElement.setAttribute('dir', dir)
    document.documentElement.setAttribute('lang', lang)
    if (lang === 'ar') {
      document.documentElement.style.fontFamily = "'IBM Plex Sans Arabic', 'Noto Sans Arabic', sans-serif"
    } else {
      document.documentElement.style.fontFamily = ''
    }
  }, [lang, dir])

  function setLang(l: Lang) {
    setLangState(l)
    localStorage.setItem(STORAGE_KEY, l)
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        supabase.from('profiles').update({ language: l }).eq('id', data.user.id).then(() => {})
      }
    })
  }

  function t(key: TranslationKey): string {
    return translations[lang][key] ?? translations['en'][key] ?? key
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, dir }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used within LanguageProvider')
  return ctx
}
