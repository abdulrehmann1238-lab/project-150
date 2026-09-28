import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, CheckCircle2, Bookmark, ArrowRight, ShieldCheck, Clock } from 'lucide-react'
import { useLang } from '../i18n'
import { useEntitlement } from '../contexts/EntitlementContext'
import { useUI } from '../contexts/UIContext'
import { GAMES, type Game } from '../data/games'
import { GameCard } from '../components/game/GameCard'
import { formatDate, formatTime } from '../lib/format'

export const Library: React.FC = () => {
  const { lang, t } = useLang()
  const { isUnlocked, unlockedUntil, receipt, daysRemaining } = useEntitlement()
  const { openPaywall } = useUI()

  const premiumGames = useMemo(
    () => GAMES.filter((g) => g.tier === 'premium'),
    []
  )

  const formattedExpiry = unlockedUntil ? formatDate(unlockedUntil, lang) : ''
  const formattedReceiptDate = receipt?.timestamp
    ? `${formatDate(receipt.timestamp, lang)} ${formatTime(receipt.timestamp, lang)}`
    : ''

  // Progress percentage (30 days total)
  const progressPercent = Math.min(100, Math.max(0, (daysRemaining / 30) * 100))

  return (
    <div className="py-8 sm:py-14 bg-[var(--sand-50)] min-h-screen">
      <div className="layali-container">
        {/* Header */}
        <div className="mb-8 pb-4 border-b border-[var(--sand-200)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-serif text-[var(--ink-900)]">
              {t('libraryTitle')}
            </h1>
            <p className="text-xs sm:text-sm text-[var(--text-3)] mt-1">
              {t('librarySubtitle')}
            </p>
          </div>

          {/* User Profile Badge (§14) */}
          <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[var(--sand-100)] border border-[var(--sand-200)] self-start sm:self-auto text-xs">
            <span className="w-2 h-2 rounded-full bg-[var(--success)]" />
            <span className="font-semibold text-[var(--ink-900)]">
              {lang === 'ar' ? 'ليلى المطيري' : 'Layla Al-Mutairi'}
            </span>
          </div>
        </div>

        {/* Locked State (§11.7) */}
        {!isUnlocked ? (
          <div className="max-w-md mx-auto py-16 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-[var(--sand-200)] text-[var(--text-3)] flex items-center justify-center mb-4">
              <Bookmark size={28} />
            </div>
            <h2 className="text-2xl font-serif text-[var(--ink-900)] mb-2">
              {t('emptyLibraryTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-2)] mb-6 leading-relaxed">
              {t('emptyLibraryDesc')}
            </p>
            <button
              onClick={() => openPaywall()}
              className="px-6 py-3 rounded-xl bg-[var(--saffron-500)] text-[var(--night-900)] font-bold text-xs hover:bg-[var(--saffron-600)] shadow-md transition flex items-center gap-2"
            >
              <Sparkles size={16} />
              <span>Unlock Premium — RG 10</span>
            </button>
          </div>
        ) : (
          /* Unlocked Active State */
          <div className="flex flex-col gap-10">
            {/* Active Status Card & Receipt Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Pass Status Card (7 cols) */}
              <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-[var(--sand-100)] border border-[var(--sand-300)] shadow-sm flex flex-col justify-between gap-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--success)]/10 text-[var(--success)] text-xs font-semibold">
                      <CheckCircle2 size={14} />
                      <span>{t('statusActive')}</span>
                    </span>
                    <span className="font-mono text-xs text-[var(--text-3)]">
                      30-Day Entitlement
                    </span>
                  </div>

                  <h3 className="text-2xl font-serif font-bold text-[var(--ink-900)] mb-1">
                    Premium Access Pass
                  </h3>
                  <p className="text-xs text-[var(--text-2)]">
                    {t('expiresOn')} <strong className="text-[var(--text-1)]">{formattedExpiry}</strong>
                  </p>
                </div>

                {/* Days remaining progress bar */}
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold mb-2">
                    <span className="text-[var(--text-2)]">Pass Duration</span>
                    <span className="text-[var(--saffron-600)] font-mono">
                      {t('daysRemaining', { days: daysRemaining })}
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[var(--sand-200)] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[var(--saffron-500)] transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Receipt History (5 cols) §11.7 */}
              <div className="lg:col-span-5 p-6 rounded-3xl bg-[var(--sand-50)] border border-[var(--sand-300)] shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-[var(--sand-200)]">
                    <h4 className="text-sm font-bold text-[var(--ink-900)]">
                      {t('receiptHistory')}
                    </h4>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--success)]/10 text-[var(--success)] font-semibold font-mono">
                      ✓ {t('receiptConfirmed')}
                    </span>
                  </div>

                  <dl className="flex flex-col gap-2.5 text-xs">
                    <div className="flex justify-between">
                      <dt className="text-[var(--text-3)]">{t('referenceCol')}:</dt>
                      <dd className="font-mono font-bold text-[var(--ink-900)]">
                        {receipt?.reference || 'LYL-8F3K29'}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-[var(--text-3)]">{t('methodCol')}:</dt>
                      <dd className="font-medium text-[var(--text-1)]">
                        {receipt?.method || 'Razer Gold Wallet'}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-[var(--text-3)]">{t('amountCol')}:</dt>
                      <dd className="font-mono font-semibold text-[var(--text-1)]">
                        {receipt?.amount || 'RG 10.00'}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-[var(--text-3)]">{t('dateCol')}:</dt>
                      <dd className="text-[var(--text-2)] font-mono text-[11px]">
                        {formattedReceiptDate}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="pt-4 border-t border-[var(--sand-200)] text-[11px] text-[var(--text-3)] flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-[var(--success)]" />
                  <span>Authoritative webhook verified transaction</span>
                </div>
              </div>
            </div>

            {/* Unlocked Premium Games Grid */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-serif font-bold text-[var(--ink-900)]">
                    All Premium Games Unlocked
                  </h2>
                  <p className="text-xs text-[var(--text-3)]">
                    Click any title to launch the HTML5 player instantly.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {premiumGames.map((game) => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
