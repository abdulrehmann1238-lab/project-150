import React, { useState, useEffect } from 'react'
import { useLang } from '../../i18n'

export const EntryLoader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const { lang } = useLang()
  const [phase, setPhase] = useState<'initial' | 'hairline' | 'mark' | 'exit' | 'done'>('initial')

  useEffect(() => {
    // Check if visited in this session
    const hasVisited = sessionStorage.getItem('layali.loaderShown')
    if (hasVisited) {
      setPhase('done')
      onComplete()
      return
    }

    sessionStorage.setItem('layali.loaderShown', 'true')

    // Timeline per §7
    const t1 = setTimeout(() => setPhase('hairline'), 120)
    const t2 = setTimeout(() => setPhase('mark'), 450)
    const t3 = setTimeout(() => setPhase('exit'), 1000)
    const t4 = setTimeout(() => {
      setPhase('done')
      onComplete()
    }, 1550)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }, [onComplete])

  if (phase === 'done') return null

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-[1000] pointer-events-none select-none overflow-hidden"
    >
      {/* Top Split Half */}
      <div
        className={`absolute inset-x-0 top-0 h-1/2 bg-[var(--night-900)] transition-transform duration-500 ease-[cubic-bezier(0.3,0,0,1)] ${
          phase === 'exit' ? '-translate-y-full' : 'translate-y-0'
        }`}
      />

      {/* Bottom Split Half */}
      <div
        className={`absolute inset-x-0 bottom-0 h-1/2 bg-[var(--night-900)] transition-transform duration-500 ease-[cubic-bezier(0.3,0,0,1)] ${
          phase === 'exit' ? 'translate-y-full' : 'translate-y-0'
        }`}
      />

      {/* Center Branding Content */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300 ${
          phase === 'exit' ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {/* Crescent & Dot SVG Symbol */}
        <div
          className={`w-12 h-12 mb-4 text-[var(--saffron-500)] transition-all duration-500 transform ${
            phase === 'mark' || phase === 'exit'
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-75'
          }`}
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
            <path
              d="M14 6C10.5 7.5 9 11.5 10.5 15C12 18.5 16 20 19 18.5C14 21 8 19 6.5 14C5 9 8 4 14 6Z"
              fill="currentColor"
            />
            <circle cx="17.5" cy="8.5" r="1.5" fill="#FAF7F2" />
          </svg>
        </div>

        {/* Wordmark */}
        <h1
          className={`font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[var(--sand-50)] transition-all duration-500 transform ${
            phase !== 'initial'
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-2'
          }`}
        >
          {lang === 'ar' ? 'ليالي للألعاب' : 'Layali Games'}
        </h1>

        {/* Hairline 1px Progress Indicator */}
        <div className="w-[140px] h-[1px] bg-[var(--ink-700)] mt-4 overflow-hidden relative">
          <div
            className={`h-full bg-[var(--saffron-500)] transition-all duration-700 ease-out ${
              phase === 'mark' || phase === 'exit'
                ? 'w-full'
                : phase === 'hairline'
                ? 'w-1/2'
                : 'w-0'
            }`}
          />
        </div>
      </div>
    </div>
  )
}
