import React, { useState } from 'react'
import { ArrowRight, Star, Globe2, ShieldCheck, Play } from 'lucide-react'
import { useLang } from '../../i18n'
import { GameCover } from '../game/GameCover'

export const RtlShowcase: React.FC = () => {
  const { t } = useLang()
  const [demoLang, setDemoLang] = useState<'ar' | 'en'>('ar')

  const isAr = demoLang === 'ar'

  return (
    <section className="py-16 sm:py-24 bg-[var(--sand-50)]">
      <div className="layali-container">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--sand-200)] text-xs font-semibold text-[var(--ink-700)] mb-3">
            <Globe2 size={14} />
            <span>Scope Deliverable #3: Full Arabic & RTL Parity</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-[var(--ink-900)] mb-3">
            {t('rtlShowcaseTitle')}
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-2)] leading-relaxed">
            {t('rtlShowcaseSubtitle')}
          </p>

          {/* In-Section Toggle Pill */}
          <div className="mt-6 inline-flex p-1 rounded-full bg-[var(--sand-200)] border border-[var(--sand-300)] shadow-inner">
            <button
              onClick={() => setDemoLang('ar')}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                isAr
                  ? 'bg-[var(--ink-900)] text-[var(--sand-50)] shadow'
                  : 'text-[var(--text-2)] hover:text-[var(--text-1)]'
              }`}
            >
              عربي (RTL Mirror)
            </button>
            <button
              onClick={() => setDemoLang('en')}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                !isAr
                  ? 'bg-[var(--ink-900)] text-[var(--sand-50)] shadow'
                  : 'text-[var(--text-2)] hover:text-[var(--text-1)]'
              }`}
            >
              English (LTR)
            </button>
          </div>
        </div>

        {/* Live Interactive Mirrored Card Demo */}
        <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl bg-[var(--sand-100)] border border-[var(--sand-300)] shadow-lg transition-all duration-300">
          <div
            dir={isAr ? 'rtl' : 'ltr'}
            lang={isAr ? 'ar' : 'en'}
            className="flex flex-col sm:flex-row gap-6 items-center transition-all duration-300"
          >
            {/* Media */}
            <div className="w-full sm:w-48 aspect-[4/3] rounded-2xl overflow-hidden border border-[var(--sand-300)] flex-shrink-0 shadow-sm">
              <GameCover slug="falcon-flight" title={isAr ? 'رحلة الصقر' : 'Falcon Flight'} />
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col justify-between w-full">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs px-2.5 py-0.5 rounded-md bg-[var(--sand-200)] text-[var(--ink-700)] font-semibold">
                    {isAr ? 'آركيد وحركة' : 'Arcade & Action'}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-[var(--saffron-600)] font-semibold">
                    <Star size={13} fill="currentColor" />
                    <span className="font-mono">4.8</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[var(--ink-900)] mb-1.5">
                  {isAr ? 'رحلة الصقر' : 'Falcon Flight'}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-2)] leading-relaxed mb-4">
                  {isAr
                    ? 'حلّق في أجواء الصحراء وتفادَ التضاريس الجبلية بتحكم لمسي سلس ومتقن.'
                    : 'Soar through desert thermals and navigate canyon gaps with intuitive tap controls.'}
                </p>
              </div>

              {/* Bottom Details Row */}
              <div className="flex items-center justify-between pt-3 border-t border-[var(--sand-200)] text-xs">
                <span className="text-[var(--text-3)] font-mono">
                  {isAr ? '٣٤٠ ألف مرة لعب' : '340,000 plays'}
                </span>

                <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--ink-900)] text-[var(--sand-50)] text-xs font-semibold hover:bg-[var(--ink-700)] transition">
                  <Play size={13} fill="currentColor" />
                  <span>{isAr ? 'العب الآن' : 'Play Now'}</span>
                  <ArrowRight
                    size={14}
                    className={isAr ? 'rotate-180 transform' : ''}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Technical Parity Callout */}
          <div
            dir={isAr ? 'rtl' : 'ltr'}
            className="mt-6 pt-4 border-t border-[var(--sand-200)] flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--text-3)]"
          >
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-[var(--success)]" />
              <span>
                {isAr
                  ? 'خواص CSS المنطقية (margin-inline / padding-inline)'
                  : 'CSS Logical Properties (inline-start / inline-end)'}
              </span>
            </div>
            <span className="font-mono text-[11px] text-[var(--saffron-600)]">
              {isAr ? 'خط Readex Pro و IBM Plex' : 'Fraunces & Hanken Grotesk'}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
