import React, { useState } from 'react'
import { Sparkles, X, ChevronRight, Check } from 'lucide-react'
import { useLang } from '../../i18n'
import { useUI } from '../../contexts/UIContext'
import { GAMES } from '../../data/games'

export const TourChip: React.FC = () => {
  const { toggleLang, t } = useLang()
  const { tourVisible, dismissTour, openPlayer, openPaywall, toggleDevInspector } = useUI()
  const [isOpen, setIsOpen] = useState(false)

  if (!tourVisible) return null

  const steps = [
    {
      text: t('tourStep1'),
      action: () => toggleLang(),
      label: 'Switch EN ⇄ AR',
    },
    {
      text: t('tourStep2'),
      action: () => {
        const game = GAMES.find((g) => g.slug === 'memory-lanterns') || GAMES[0]
        openPlayer(game)
      },
      label: 'Play Memory Match',
    },
    {
      text: t('tourStep3'),
      action: () => openPaywall('pin'),
      label: 'Open PIN Paywall',
    },
    {
      text: t('tourStep4'),
      action: () => toggleDevInspector(),
      label: 'Open Inspector',
    },
  ]

  return (
    <div className="fixed bottom-16 sm:bottom-4 start-4 z-[350] print:hidden">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[var(--ink-900)] text-[var(--sand-50)] text-xs font-semibold shadow-lg hover:bg-[var(--ink-700)] transition border border-[var(--ink-700)] animate-bounce"
        >
          <Sparkles size={14} className="text-[var(--saffron-500)]" />
          <span>{t('takeTourChip')}</span>
        </button>
      ) : (
        <div className="w-[320px] p-4 rounded-2xl bg-[var(--sand-50)] text-[var(--text-1)] border border-[var(--sand-300)] shadow-2xl animate-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-[var(--sand-200)]">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--ink-900)]">
              <Sparkles size={14} className="text-[var(--saffron-600)]" />
              <span>Interactive Demo Guide</span>
            </div>
            <button
              onClick={dismissTour}
              className="text-[var(--text-3)] hover:text-[var(--text-1)] p-0.5"
            >
              <X size={15} />
            </button>
          </div>

          <div className="flex flex-col gap-2.5">
            {steps.map((st, i) => (
              <div
                key={i}
                className="p-2.5 rounded-xl bg-[var(--sand-100)] border border-[var(--sand-200)] flex flex-col gap-1.5"
              >
                <p className="text-xs text-[var(--text-2)] leading-snug">
                  {st.text}
                </p>
                <button
                  onClick={st.action}
                  className="self-start text-[11px] font-semibold text-[var(--ink-900)] bg-[var(--sand-50)] px-2.5 py-1 rounded-md border border-[var(--sand-300)] hover:bg-white flex items-center gap-1 transition"
                >
                  <span>{st.label}</span>
                  <ChevronRight size={12} className="icon-dir" />
                </button>
              </div>
            ))}
          </div>

          <div className="pt-3 mt-2 flex justify-between items-center text-[11px] text-[var(--text-3)]">
            <span>2-minute verification tour</span>
            <button
              onClick={dismissTour}
              className="text-[var(--rose-500)] hover:underline font-medium"
            >
              {t('dismissTour')}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
