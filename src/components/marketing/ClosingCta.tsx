import React from 'react'
import { Link } from 'react-router-dom'
import { Play, Sparkles, ArrowRight } from 'lucide-react'
import { useLang } from '../../i18n'
import { useUI } from '../../contexts/UIContext'

export const ClosingCta: React.FC = () => {
  const { t } = useLang()
  const { openPaywall } = useUI()

  return (
    <section className="py-20 sm:py-28 bg-[var(--night-900)] text-[var(--sand-50)] relative overflow-hidden">
      {/* Subtle Warm Backlight */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full opacity-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, var(--saffron-500) 0%, transparent 70%)',
        }}
      />

      <div className="layali-container relative z-10 text-center max-w-3xl mx-auto">
        <span className="text-xs uppercase font-semibold tracking-widest text-[var(--saffron-500)] mb-3 inline-block">
          Layali Games Portal
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif font-medium text-[var(--sand-50)] mb-4 leading-tight">
          Ready when you are.
        </h2>
        <p className="text-sm sm:text-base text-[var(--sand-200)] max-w-xl mx-auto mb-8 leading-relaxed">
          {t('heroSubtitle')}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <Link
            to="/games?tab=free"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[var(--sand-50)] text-[var(--ink-900)] font-semibold text-sm hover:bg-white shadow-lg transition flex items-center justify-center gap-2"
          >
            <Play size={16} fill="currentColor" />
            <span>{t('heroCtaPlayFree')}</span>
          </Link>

          <button
            onClick={() => openPaywall()}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl border border-[var(--saffron-500)] text-[var(--saffron-500)] hover:bg-[var(--saffron-500)] hover:text-[var(--night-900)] font-semibold text-sm transition flex items-center justify-center gap-2"
          >
            <Sparkles size={16} />
            <span>{t('goPremium')}</span>
          </button>
        </div>
      </div>
    </section>
  )
}
