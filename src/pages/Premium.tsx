import React, { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sparkles, Check, Wallet, KeyRound, ChevronDown, ShieldCheck, ArrowRight } from 'lucide-react'
import { useLang } from '../i18n'
import { useUI } from '../contexts/UIContext'
import { useEntitlement } from '../contexts/EntitlementContext'
import { GAMES } from '../data/games'
import { FAQ_ITEMS } from '../data/faq'
import { GameCard } from '../components/game/GameCard'
import { formatDate } from '../lib/format'

export const Premium: React.FC = () => {
  const { lang, t } = useLang()
  const navigate = useNavigate()
  const { openPaywall } = useUI()
  const { isUnlocked, unlockedUntil, unlockWithDuration } = useEntitlement()

  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1')

  const samplePremiumGames = useMemo(
    () => GAMES.filter((g) => g.tier === 'premium').slice(0, 6),
    []
  )

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id))
  }

  const handleExtend = () => {
    unlockWithDuration(30, 'Razer Gold Wallet', 'LYL-EXT-30')
  }

  const formattedExpiry = unlockedUntil ? formatDate(unlockedUntil, lang) : ''

  return (
    <div className="py-10 sm:py-16 bg-[var(--sand-50)] min-h-screen">
      <div className="layali-container">
        {/* Split Hero (§11.5) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center pb-16 border-b border-[var(--sand-200)]">
          {/* Left Column: Copy + Price Card (6 cols) */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--saffron-100)] text-[var(--saffron-600)] text-xs font-semibold mb-3">
                <Sparkles size={14} />
                <span>Razer Gold Powered Entitlement</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[var(--ink-900)] mb-3 leading-tight">
                {t('premiumHeroTitle')}
              </h1>
              <p className="text-sm sm:text-base text-[var(--text-2)] leading-relaxed">
                {t('premiumHeroSubtitle')}
              </p>
            </div>

            {/* Price Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[var(--sand-100)] border-2 border-[var(--saffron-500)] shadow-xl flex flex-col gap-6 relative overflow-hidden">
              {/* Corner Badge */}
              <div className="absolute top-0 end-0 bg-[var(--saffron-500)] text-[var(--night-900)] text-[10px] font-bold px-4 py-1 rounded-bl-xl uppercase tracking-wider font-mono">
                Gulf Regional Pass
              </div>

              <div className="flex items-baseline justify-between border-b border-[var(--sand-200)] pb-4">
                <div>
                  <h3 className="text-lg font-bold text-[var(--ink-900)]">
                    {t('priceCardTitle')}
                  </h3>
                  <span className="text-xs text-[var(--text-3)] font-mono">
                    {t('priceCardDuration')}
                  </span>
                </div>
                <div className="text-end">
                  <span className="font-mono text-3xl font-bold text-[var(--ink-900)]">
                    {t('priceCardCost')}
                  </span>
                  <span className="block text-[11px] text-[var(--text-3)] font-sans">
                    One-time payment
                  </span>
                </div>
              </div>

              {/* Benefits list */}
              <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-[var(--text-1)]">
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-[var(--success)] flex-shrink-0" />
                  <span>{t('benefit1')}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-[var(--success)] flex-shrink-0" />
                  <span>{t('benefit2')}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-[var(--success)] flex-shrink-0" />
                  <span>{t('benefit3')}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={16} className="text-[var(--success)] flex-shrink-0" />
                  <span>{t('benefit4')}</span>
                </li>
              </ul>

              {/* Payment Buttons or Active State */}
              {isUnlocked ? (
                <div className="pt-2 flex flex-col gap-3">
                  <div className="p-3.5 rounded-xl bg-[var(--success)]/10 border border-[var(--success)]/30 text-xs text-[var(--success)] font-semibold flex items-center justify-between">
                    <span>{t('alreadyActiveTitle')}</span>
                    <span>{t('alreadyActiveUntil', { date: formattedExpiry })}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={handleExtend}
                      className="py-2.5 px-3 rounded-xl border border-[var(--sand-300)] text-xs font-semibold text-[var(--text-1)] hover:bg-[var(--sand-50)] transition"
                    >
                      {t('extendPass')}
                    </button>
                    <button
                      onClick={() => navigate('/library')}
                      className="py-2.5 px-3 rounded-xl bg-[var(--ink-900)] text-white text-xs font-semibold hover:bg-[var(--ink-700)] transition"
                    >
                      {t('goToLibrary')}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="pt-2 flex flex-col gap-3">
                  <button
                    onClick={() => openPaywall('wallet')}
                    className="w-full py-3.5 px-4 rounded-xl bg-[var(--ink-900)] text-[var(--sand-50)] font-semibold text-sm hover:bg-[var(--ink-700)] shadow-md transition flex items-center justify-center gap-2"
                  >
                    <Wallet size={18} />
                    <span>{t('payWithWallet')}</span>
                  </button>

                  <button
                    onClick={() => openPaywall('pin')}
                    className="w-full py-2.5 text-xs text-[var(--ink-700)] hover:text-[var(--ink-900)] font-semibold hover:underline transition flex items-center justify-center gap-1.5"
                  >
                    <KeyRound size={14} />
                    <span>{t('havePin')}</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Sample 6 Premium Games 2x3 Grid (6 cols) */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <span className="text-xs uppercase font-semibold tracking-wider text-[var(--text-3)]">
              Included in the 30-Day Premium Pass:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
              {samplePremiumGames.map((game) => (
                <GameCard key={game.id} game={game} compact />
              ))}
            </div>
          </div>
        </div>

        {/* 3-Step "How Razer Gold Payment Works" Diagram (§11.5) */}
        <div className="py-16 border-b border-[var(--sand-200)]">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-serif text-[var(--ink-900)] mb-2">
              {t('howItWorksTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-2)]">
              Designed for Gulf casual gaming players: no international card requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[var(--sand-100)] border border-[var(--sand-200)] flex flex-col gap-2">
              <span className="font-mono text-xs font-bold text-[var(--saffron-600)]">01</span>
              <h3 className="text-base font-bold text-[var(--ink-900)]">
                {t('howStep1Title')}
              </h3>
              <p className="text-xs text-[var(--text-2)] leading-relaxed">
                {t('howStep1Desc')}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--sand-100)] border border-[var(--sand-200)] flex flex-col gap-2">
              <span className="font-mono text-xs font-bold text-[var(--saffron-600)]">02</span>
              <h3 className="text-base font-bold text-[var(--ink-900)]">
                {t('howStep2Title')}
              </h3>
              <p className="text-xs text-[var(--text-2)] leading-relaxed">
                {t('howStep2Desc')}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--sand-100)] border border-[var(--sand-200)] flex flex-col gap-2">
              <span className="font-mono text-xs font-bold text-[var(--success)]">03</span>
              <h3 className="text-base font-bold text-[var(--ink-900)]">
                {t('howStep3Title')}
              </h3>
              <p className="text-xs text-[var(--text-2)] leading-relaxed">
                {t('howStep3Desc')}
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Accordion Section (§11.5) */}
        <div className="py-16 max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-serif text-[var(--ink-900)] text-center mb-10">
            {t('faqTitle')}
          </h2>

          <div className="flex flex-col gap-3">
            {FAQ_ITEMS.map((item) => {
              const isOpen = openFaqId === item.id
              const question = lang === 'ar' ? item.questionAr : item.questionEn
              const answer = lang === 'ar' ? item.answerAr : item.answerEn

              return (
                <div
                  key={item.id}
                  className="rounded-2xl border border-[var(--sand-200)] bg-[var(--sand-100)] overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => toggleFaq(item.id)}
                    className="w-full p-4 sm:p-5 text-start font-semibold text-sm sm:text-base text-[var(--ink-900)] flex items-center justify-between gap-4"
                  >
                    <span>{question}</span>
                    <ChevronDown
                      size={18}
                      className={`text-[var(--text-3)] transition-transform duration-200 flex-shrink-0 ${
                        isOpen ? 'rotate-180 transform' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-[var(--text-2)] leading-relaxed border-t border-[var(--sand-200)]/60 pt-3 animate-in fade-in duration-200">
                      {answer}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
