import React, { useState, useEffect } from 'react'
import { Check, Loader2, AlertCircle, RefreshCw, Sparkles, ArrowRight } from 'lucide-react'
import { useLang } from '../../i18n'
import { useEntitlement } from '../../contexts/EntitlementContext'
import { useUI } from '../../contexts/UIContext'
import { formatDate } from '../../lib/format'

interface StatusTimelineProps {
  onPlayGame: () => void
  onViewLibrary: () => void
}

export const StatusTimeline: React.FC<StatusTimelineProps> = ({
  onPlayGame,
  onViewLibrary,
}) => {
  const { lang, t } = useLang()
  const { isUnlocked, unlockedUntil, receipt } = useEntitlement()
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [isManualPolling, setIsManualPolling] = useState(false)

  // Track elapsed time
  useEffect(() => {
    if (isUnlocked) return
    const timer = setInterval(() => {
      setElapsedSeconds((s) => s + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [isUnlocked])

  const isLagging = elapsedSeconds >= 6
  const isTimedOut = elapsedSeconds >= 30 && !isUnlocked

  const handleManualCheck = () => {
    setIsManualPolling(true)
    setTimeout(() => {
      setIsManualPolling(false)
    }, 1200)
  }

  // --- SUCCESS STATE (§13.4) ---
  if (isUnlocked) {
    const formattedExpiry = unlockedUntil ? formatDate(unlockedUntil, lang) : ''
    return (
      <div className="flex flex-col items-center text-center p-6 bg-[var(--sand-50)] rounded-2xl animate-in fade-in duration-300">
        {/* Large Animated Checkmark */}
        <div className="w-16 h-16 rounded-full bg-[var(--success)] text-white flex items-center justify-center mb-5 shadow-lg shadow-[var(--success)]/20 animate-in zoom-in-75 duration-300">
          <Check size={36} strokeWidth={3} className="animate-[scaleIn_0.3s_ease-out]" />
        </div>

        <h3 className="text-2xl font-serif text-[var(--ink-900)] mb-1">
          {t('successTitle')}
        </h3>

        <p className="text-sm text-[var(--text-2)] mb-4">
          {t('successSubtitle', { date: formattedExpiry })}
        </p>

        {/* Receipt Chip */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--sand-100)] border border-[var(--sand-200)] text-xs text-[var(--text-3)] font-mono mb-6">
          <span>{t('receiptRef')}:</span>
          <span className="font-semibold text-[var(--text-1)]">
            {receipt?.reference || 'LYL-8F3K29'}
          </span>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col gap-2.5 w-full">
          <button
            onClick={onPlayGame}
            className="w-full py-3.5 px-4 rounded-xl bg-[var(--ink-900)] text-white font-semibold hover:bg-[var(--ink-700)] shadow-md transition flex items-center justify-center gap-2"
          >
            <Sparkles size={16} className="text-[var(--saffron-500)]" />
            <span>{t('playPremiumNow')}</span>
          </button>
          <button
            onClick={onViewLibrary}
            className="w-full py-3 px-4 rounded-xl border border-[var(--sand-300)] text-sm font-semibold text-[var(--text-1)] hover:bg-[var(--sand-100)] transition"
          >
            {t('viewLibraryBtn')}
          </button>
        </div>
      </div>
    )
  }

  // --- TIMED OUT STATE (§13.3) ---
  if (isTimedOut) {
    return (
      <div className="flex flex-col gap-4 p-5 bg-[var(--warning)]/10 border border-[var(--warning)]/30 rounded-2xl animate-in fade-in">
        <div className="flex items-center gap-2.5 text-[var(--warning)] font-semibold text-sm">
          <AlertCircle size={20} />
          <span>{t('timelineTimeoutTitle')}</span>
        </div>
        <p className="text-xs text-[var(--text-2)] leading-relaxed">
          {t('timelineTimeoutCopy', { ref: 'LYL-8F3K29' })}
        </p>
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={handleManualCheck}
            disabled={isManualPolling}
            className="px-4 py-2 rounded-xl bg-[var(--ink-900)] text-white text-xs font-semibold hover:bg-[var(--ink-700)] transition flex items-center gap-1.5"
          >
            <RefreshCw size={13} className={isManualPolling ? 'animate-spin' : ''} />
            <span>{t('checkStatusBtn')}</span>
          </button>
          <a
            href="/contact"
            className="text-xs font-semibold text-[var(--ink-700)] hover:underline"
          >
            {t('contactSupport')}
          </a>
        </div>
      </div>
    )
  }

  // --- PENDING / CONFIRMING STATUS TIMELINE (§13.3) ---
  return (
    <div className="flex flex-col gap-6 py-2">
      {/* 3 Vertical Steps */}
      <div className="relative flex flex-col gap-6 ps-2">
        {/* Connecting Line */}
        <div className="absolute start-5 top-4 bottom-4 w-0.5 bg-[var(--sand-300)]" />

        {/* Step 1: Payment Submitted */}
        <div className="relative flex items-start gap-4">
          <div className="w-6 h-6 rounded-full bg-[var(--success)] text-white flex items-center justify-center flex-shrink-0 z-10 shadow-sm">
            <Check size={14} strokeWidth={2.5} />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[var(--text-1)]">
              {t('timelineStep1')}
            </h4>
            <p className="text-xs text-[var(--text-3)]">
              LYL-8F3K29 • RG 10.00
            </p>
          </div>
        </div>

        {/* Step 2: Waiting for Confirmation (Webhook) */}
        <div className="relative flex items-start gap-4">
          <div className="w-6 h-6 rounded-full bg-[var(--saffron-500)] text-white flex items-center justify-center flex-shrink-0 z-10 shadow-sm animate-pulse">
            <Loader2 size={13} className="animate-spin text-[var(--night-900)]" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-[var(--ink-900)]">
              {t('timelineStep2')}
            </h4>
            <p className="text-xs text-[var(--text-2)] leading-relaxed mt-0.5">
              {isLagging ? t('timelineDelayedCopy') : t('timelinePendingCopy')}
            </p>

            {/* Reassuring Lag Controls */}
            {isLagging && (
              <div className="mt-3 flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleManualCheck}
                  disabled={isManualPolling}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--sand-100)] border border-[var(--sand-300)] text-xs font-semibold text-[var(--text-1)] hover:bg-[var(--sand-200)] transition"
                >
                  <RefreshCw size={12} className={isManualPolling ? 'animate-spin' : ''} />
                  <span>{t('checkStatusBtn')}</span>
                </button>
                <span className="text-[11px] font-mono text-[var(--text-3)]">
                  {elapsedSeconds}s elapsed
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Step 3: Unlocking */}
        <div className="relative flex items-start gap-4 opacity-50">
          <div className="w-6 h-6 rounded-full border-2 border-[var(--sand-300)] bg-[var(--sand-50)] flex items-center justify-center flex-shrink-0 z-10">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--sand-300)]" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[var(--text-2)]">
              {t('timelineStep3')}
            </h4>
            <p className="text-xs text-[var(--text-3)]">
              Catalog access automatic unlock
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
