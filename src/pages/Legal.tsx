import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FileText, AlertCircle, ShieldCheck } from 'lucide-react'
import { LEGAL_DOCS, type LegalDocument } from '../data/legal'
import { useLang } from '../i18n'

export const Legal: React.FC = () => {
  const { doc = 'terms' } = useParams<{ doc?: 'terms' | 'privacy' | 'refunds' | 'cookies' }>()
  const { lang, t } = useLang()

  const currentDocKey = (['terms', 'privacy', 'refunds', 'cookies'].includes(doc)
    ? doc
    : 'terms') as 'terms' | 'privacy' | 'refunds' | 'cookies'

  const activeDoc: LegalDocument = LEGAL_DOCS[currentDocKey]
  const [activeSectionId, setActiveSectionId] = useState<string>(activeDoc.sections[0]?.id || '')

  useEffect(() => {
    setActiveSectionId(activeDoc.sections[0]?.id || '')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [doc, activeDoc])

  const title = lang === 'ar' ? activeDoc.titleAr : activeDoc.titleEn

  return (
    <div className="py-10 sm:py-16 bg-[var(--sand-50)] min-h-screen">
      <div className="layali-container">
        {/* Navigation Tabs between legal documents */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-[var(--sand-200)] text-xs font-semibold">
          {[
            { key: 'terms', label: 'Terms of Service' },
            { key: 'privacy', label: 'Privacy Policy' },
            { key: 'refunds', label: 'Refund Policy' },
            { key: 'cookies', label: 'Cookie Storage' },
          ].map((item) => (
            <Link
              key={item.key}
              to={`/legal/${item.key}`}
              className={`px-4 py-2 rounded-xl border whitespace-nowrap transition ${
                currentDocKey === item.key
                  ? 'bg-[var(--ink-900)] text-white border-[var(--ink-900)] shadow-sm'
                  : 'bg-[var(--sand-100)] text-[var(--text-2)] border-[var(--sand-300)] hover:bg-[var(--sand-200)]'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* 2 Columns: Sticky TOC (Left) + Content (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Sticky Table of Contents (3 cols) */}
          <aside className="lg:col-span-4 sticky top-24 hidden lg:flex flex-col gap-3 p-5 rounded-2xl bg-[var(--sand-100)] border border-[var(--sand-200)]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-3)] mb-1">
              Table of Contents
            </h4>
            <nav className="flex flex-col gap-1.5 text-xs">
              {activeDoc.sections.map((sec) => {
                const secTitle = lang === 'ar' ? sec.titleAr : sec.titleEn
                const isActive = activeSectionId === sec.id
                return (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    onClick={() => setActiveSectionId(sec.id)}
                    className={`py-1.5 px-2.5 rounded-lg transition leading-snug ${
                      isActive
                        ? 'bg-[var(--sand-50)] text-[var(--ink-900)] font-bold shadow-sm'
                        : 'text-[var(--text-2)] hover:text-[var(--text-1)]'
                    }`}
                  >
                    {secTitle}
                  </a>
                )
              })}
            </nav>

            <div className="pt-3 border-t border-[var(--sand-200)] text-[11px] text-[var(--text-3)]">
              {t('lastUpdatedLabel')}: {activeDoc.lastUpdated}
            </div>
          </aside>

          {/* Legal Content Block (8 cols) */}
          <main className="lg:col-span-8 max-w-[720px] flex flex-col gap-8">
            {/* Header */}
            <div>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[var(--ink-900)] mb-2">
                {title}
              </h1>
              <p className="text-xs text-[var(--text-3)] font-mono mb-4">
                {t('lastUpdatedLabel')}: {activeDoc.lastUpdated}
              </p>

              {/* Sample text disclaimer chip (§11.10) */}
              <div className="p-3 rounded-xl bg-[var(--sand-100)] border border-[var(--sand-200)] flex items-start gap-2.5 text-xs text-[var(--text-3)]">
                <AlertCircle size={16} className="text-[var(--saffron-600)] flex-shrink-0 mt-0.5" />
                <span>{t('legalDisclaimer')}</span>
              </div>
            </div>

            {/* Sections */}
            <div className="flex flex-col gap-8">
              {activeDoc.sections.map((sec) => {
                const secTitle = lang === 'ar' ? sec.titleAr : sec.titleEn
                const paragraphs = lang === 'ar' ? sec.contentAr : sec.contentEn

                return (
                  <article
                    key={sec.id}
                    id={sec.id}
                    className="scroll-mt-24 pb-6 border-b border-[var(--sand-200)] last:border-b-0"
                  >
                    <h2 className="text-lg sm:text-xl font-serif font-bold text-[var(--ink-900)] mb-3">
                      {secTitle}
                    </h2>
                    <div className="flex flex-col gap-3 text-xs sm:text-sm text-[var(--text-2)] leading-relaxed">
                      {paragraphs.map((para, i) => (
                        <p key={i}>{para}</p>
                      ))}
                    </div>
                  </article>
                )
              })}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
