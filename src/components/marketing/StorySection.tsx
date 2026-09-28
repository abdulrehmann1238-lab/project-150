import React, { useState } from 'react'
import { CheckCircle2, Lock, Play, Sparkles, ArrowRight } from 'lucide-react'
import { useLang } from '../../i18n'
import { GameCover } from '../game/GameCover'

export const StorySection: React.FC = () => {
  const { t } = useLang()
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1)

  return (
    <section className="py-16 sm:py-24 bg-[var(--sand-100)] border-y border-[var(--sand-200)]">
      <div className="layali-container">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--saffron-600)]">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-[var(--ink-900)] mt-1 mb-3">
            {t('storyTitle')}
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-2)] leading-relaxed">
            {t('storySubtitle')}
          </p>
        </div>

        {/* 2 Columns: Steps Left, Live Interactive Mock Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Steps List (Left) */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            {/* Step 1 */}
            <div
              onClick={() => setActiveStep(1)}
              className={`p-5 rounded-2xl border cursor-pointer transition-all duration-200 ${
                activeStep === 1
                  ? 'bg-[var(--sand-50)] border-[var(--ink-700)] shadow-md'
                  : 'bg-transparent border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-colors ${
                    activeStep === 1
                      ? 'bg-[var(--ink-900)] text-[var(--sand-50)]'
                      : 'bg-[var(--sand-200)] text-[var(--text-2)]'
                  }`}
                >
                  01
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-[var(--ink-900)] mb-1">
                    {t('step1Title')}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-2)] leading-relaxed">
                    {t('step1Desc')}
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div
              onClick={() => setActiveStep(2)}
              className={`p-5 rounded-2xl border cursor-pointer transition-all duration-200 ${
                activeStep === 2
                  ? 'bg-[var(--sand-50)] border-[var(--saffron-500)] shadow-md'
                  : 'bg-transparent border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-colors ${
                    activeStep === 2
                      ? 'bg-[var(--saffron-500)] text-[var(--night-900)]'
                      : 'bg-[var(--sand-200)] text-[var(--text-2)]'
                  }`}
                >
                  02
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-[var(--ink-900)] mb-1">
                    {t('step2Title')}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-2)] leading-relaxed">
                    {t('step2Desc')}
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div
              onClick={() => setActiveStep(3)}
              className={`p-5 rounded-2xl border cursor-pointer transition-all duration-200 ${
                activeStep === 3
                  ? 'bg-[var(--sand-50)] border-[var(--success)] shadow-md'
                  : 'bg-transparent border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-colors ${
                    activeStep === 3
                      ? 'bg-[var(--success)] text-white'
                      : 'bg-[var(--sand-200)] text-[var(--text-2)]'
                  }`}
                >
                  03
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-[var(--ink-900)] mb-1">
                    {t('step3Title')}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-2)] leading-relaxed">
                    {t('step3Desc')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Interactive Mock Component (Right) */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-[380px] bg-[var(--sand-50)] rounded-2xl p-6 border border-[var(--sand-300)] shadow-xl transition-all duration-300">
              {activeStep === 1 && (
                <div className="flex flex-col gap-4 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between text-xs text-[var(--text-3)]">
                    <span className="font-semibold text-[var(--ink-900)]">Free Instant Play</span>
                    <span>No registration</span>
                  </div>
                  <div className="aspect-[4/3] rounded-xl overflow-hidden border border-[var(--sand-200)]">
                    <GameCover slug="falcon-flight" title="Falcon Flight" />
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <h4 className="font-semibold text-sm text-[var(--text-1)]">Falcon Flight</h4>
                      <span className="text-xs text-[var(--text-3)]">340K plays</span>
                    </div>
                    <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[var(--ink-900)] text-[var(--sand-50)] text-xs font-semibold">
                      <Play size={13} fill="currentColor" />
                      <span>Play Now</span>
                    </button>
                  </div>
                </div>
              )}

              {activeStep === 2 && (
                <div className="flex flex-col gap-4 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between text-xs text-[var(--text-3)]">
                    <span className="font-semibold text-[var(--saffron-600)]">Razer Gold Gateway</span>
                    <span>30-Day Pass</span>
                  </div>
                  <div className="p-4 rounded-xl bg-[var(--sand-100)] border border-[var(--saffron-500)]/40 flex flex-col gap-3">
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs font-bold text-[var(--ink-900)]">Premium Pass</span>
                      <span className="font-mono text-lg font-bold text-[var(--saffron-600)]">RG 10</span>
                    </div>
                    <div className="grid grid-cols-4 gap-1.5 force-ltr">
                      {['A7K2', 'M9Q4', 'X1P8', 'L3ZD'].map((chunk, i) => (
                        <div key={i} className="py-2 text-center font-mono text-xs font-bold bg-[var(--sand-50)] rounded border border-[var(--saffron-500)]/40 text-[var(--ink-900)]">
                          {chunk}
                        </div>
                      ))}
                    </div>
                    <div className="text-[11px] text-[var(--success)] font-medium flex items-center gap-1">
                      <CheckCircle2 size={13} />
                      <span>Valid PIN confirmed • 10.00 RG</span>
                    </div>
                  </div>
                  <button className="w-full py-2.5 rounded-xl bg-[var(--ink-900)] text-[var(--sand-50)] text-xs font-semibold flex items-center justify-center gap-2">
                    <span>Redeem RG 10</span>
                    <ArrowRight size={13} className="icon-dir" />
                  </button>
                </div>
              )}

              {activeStep === 3 && (
                <div className="flex flex-col gap-4 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between text-xs text-[var(--text-3)]">
                    <span className="font-semibold text-[var(--success)]">Webhook Confirmed</span>
                    <span>2.2s latency</span>
                  </div>
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-[var(--success)] shadow-sm">
                    <GameCover slug="gulf-grand-prix" title="Gulf Grand Prix" />
                    <div className="absolute top-2 end-2 px-2.5 py-0.5 rounded-full bg-[var(--success)] text-white text-[11px] font-semibold flex items-center gap-1">
                      <Sparkles size={11} />
                      <span>UNLOCKED</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <h4 className="font-semibold text-sm text-[var(--text-1)]">Gulf Grand Prix</h4>
                      <span className="text-xs text-[var(--text-3)]">Premium • 29 days left</span>
                    </div>
                    <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[var(--success)] text-white text-xs font-semibold shadow-sm">
                      <Play size={13} fill="currentColor" />
                      <span>Play Now</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
