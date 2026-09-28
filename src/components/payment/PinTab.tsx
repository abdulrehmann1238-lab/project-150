import React, { useState, useRef, useEffect, useCallback } from 'react'
import { CheckCircle2, AlertCircle, Eye, EyeOff, Loader2, Plus, RefreshCw } from 'lucide-react'
import { validatePinApi, redeemPinApi } from '../../mock/api'
import type { PinValidationResult } from '../../mock/pins'
import { useLang } from '../../i18n'

interface PinTabProps {
  onSuccessSubmitted: () => void
}

export const PinTab: React.FC<PinTabProps> = ({ onSuccessSubmitted }) => {
  const { t } = useLang()

  // 4 segments of 4 chars
  const [segments, setSegments] = useState<string[]>(['', '', '', ''])
  const [isMasked, setIsMasked] = useState(false)
  const [isValidating, setIsValidating] = useState(false)
  const [validationResult, setValidationResult] = useState<PinValidationResult | null>(null)
  const [isShaking, setIsShaking] = useState(false)
  const [isRedeeming, setIsRedeeming] = useState(false)

  // Secondary PIN for combining insufficient cards
  const [showSecondaryPin, setShowSecondaryPin] = useState(false)
  const [secondarySegments, setSecondarySegments] = useState<string[]>(['', '', '', ''])
  const [secondaryResult, setSecondaryResult] = useState<PinValidationResult | null>(null)

  // Rate limiting (5 consecutive failures)
  const [failedAttempts, setFailedAttempts] = useState(0)
  const [rateLimitTimer, setRateLimitTimer] = useState(0)

  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const secondaryRefs = useRef<(HTMLInputElement | null)[]>([])

  // Rate limit countdown
  useEffect(() => {
    if (rateLimitTimer <= 0) return
    const interval = setInterval(() => {
      setRateLimitTimer((t) => Math.max(0, t - 1))
    }, 1000)
    return () => clearInterval(interval)
  }, [rateLimitTimer])

  // Clean full pin string
  const fullPin = segments.join('')
  const secondaryFullPin = secondarySegments.join('')

  // Trigger debounced validation when all 16 characters are entered
  const runValidation = useCallback(async (pinToValidate: string, isSec = false) => {
    if (rateLimitTimer > 0) return

    setIsValidating(true)
    if (!isSec) {
      setValidationResult(null)
    } else {
      setSecondaryResult(null)
    }

    try {
      const result = await validatePinApi(pinToValidate)
      if (!isSec) {
        setValidationResult(result)
        if (result.status === 'invalid') {
          setIsShaking(true)
          setTimeout(() => setIsShaking(false), 500)
          setFailedAttempts((prev) => {
            const next = prev + 1
            if (next >= 5) {
              setRateLimitTimer(30)
              return 0
            }
            return next
          })
        } else if (result.status === 'valid') {
          setFailedAttempts(0)
        }
      } else {
        setSecondaryResult(result)
      }
    } catch {
      if (!isSec) {
        setValidationResult({ status: 'network_error', message: 'Connection error' })
      }
    } finally {
      setIsValidating(false)
    }
  }, [rateLimitTimer])

  useEffect(() => {
    if (fullPin.length === 16) {
      const timer = setTimeout(() => {
        runValidation(fullPin, false)
      }, 400)
      return () => clearTimeout(timer)
    } else {
      setValidationResult(null)
    }
  }, [fullPin, runValidation])

  useEffect(() => {
    if (secondaryFullPin.length === 16 && showSecondaryPin) {
      const timer = setTimeout(() => {
        runValidation(secondaryFullPin, true)
      }, 400)
      return () => clearTimeout(timer)
    } else {
      setSecondaryResult(null)
    }
  }, [secondaryFullPin, showSecondaryPin, runValidation])

  // Handle single segment typing & auto-advance
  const handleSegmentChange = (idx: number, val: string, isSec = false) => {
    const clean = val.replace(/[^A-Za-z0-9]/g, '').toUpperCase().slice(0, 4)
    const current = isSec ? [...secondarySegments] : [...segments]
    current[idx] = clean

    if (isSec) {
      setSecondarySegments(current)
    } else {
      setSegments(current)
    }

    // Auto advance if 4 chars filled
    if (clean.length === 4 && idx < 3) {
      const targetRefs = isSec ? secondaryRefs : inputRefs
      targetRefs.current[idx + 1]?.focus()
    }
  }

  // Handle backspace navigation
  const handleKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>, isSec = false) => {
    const current = isSec ? secondarySegments : segments
    const targetRefs = isSec ? secondaryRefs : inputRefs

    if (e.key === 'Backspace' && !current[idx] && idx > 0) {
      targetRefs.current[idx - 1]?.focus()
    }
  }

  // Handle clipboard paste
  const handlePaste = (e: React.ClipboardEvent, isSec = false) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text')
    const sanitized = pasted.replace(/[^A-Za-z0-9]/g, '').toUpperCase().slice(0, 16)
    if (!sanitized) return

    const chunk1 = sanitized.slice(0, 4)
    const chunk2 = sanitized.slice(4, 8)
    const chunk3 = sanitized.slice(8, 12)
    const chunk4 = sanitized.slice(12, 16)

    const newSegments = [chunk1, chunk2, chunk3, chunk4]
    if (isSec) {
      setSecondarySegments(newSegments)
      secondaryRefs.current[Math.min(3, Math.floor((sanitized.length - 1) / 4))]?.focus()
    } else {
      setSegments(newSegments)
      inputRefs.current[Math.min(3, Math.floor((sanitized.length - 1) / 4))]?.focus()
    }
  }

  // Total balance sum if combining cards
  const totalBalance =
    (validationResult?.amount || 0) + (secondaryResult?.amount || 0)
  const isSufficient =
    (validationResult?.status === 'valid' && (validationResult.amount || 0) >= 10) ||
    totalBalance >= 10

  const handleRedeem = async () => {
    if (!isSufficient || isRedeeming) return
    setIsRedeeming(true)
    try {
      await redeemPinApi('LYL-PIN-' + fullPin.slice(0, 4))
      onSuccessSubmitted()
    } catch {
      setIsRedeeming(false)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Header Info */}
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-[var(--text-1)] uppercase tracking-wider">
          {t('pinLabel')}
        </label>
        <button
          type="button"
          onClick={() => setIsMasked((v) => !v)}
          className="inline-flex items-center gap-1 text-xs text-[var(--ink-500)] hover:text-[var(--ink-900)] transition"
        >
          {isMasked ? <Eye size={14} /> : <EyeOff size={14} />}
          <span>{isMasked ? t('showPin') : t('hidePin')}</span>
        </button>
      </div>

      {/* 4x4 Primary Input Segments */}
      <div
        className={`grid grid-cols-4 gap-2 force-ltr ${
          isShaking ? 'animate-[shake_0.2s_ease-in-out_0s_2]' : ''
        }`}
      >
        {segments.map((seg, idx) => (
          <input
            key={idx}
            ref={(el) => { inputRefs.current[idx] = el; }}
            type={isMasked ? 'password' : 'text'}
            inputMode="text"
            autoCapitalize="characters"
            maxLength={4}
            value={seg}
            disabled={rateLimitTimer > 0 || isRedeeming}
            onChange={(e) => handleSegmentChange(idx, e.target.value)}
            onKeyDown={(e) => handleKeyDown(idx, e)}
            onPaste={(e) => handlePaste(e)}
            placeholder="••••"
            aria-label={`PIN characters ${idx * 4 + 1} to ${idx * 4 + 4} of 16`}
            className={`w-full py-2.5 sm:py-3 text-center font-mono text-base font-bold tracking-widest rounded-xl border bg-[var(--sand-50)] text-[var(--text-1)] transition outline-none ${
              validationResult?.status === 'valid'
                ? 'border-[var(--success)] ring-1 ring-[var(--success)]/30'
                : validationResult?.status === 'invalid'
                ? 'border-[var(--error)] ring-1 ring-[var(--error)]/30'
                : validationResult?.status === 'insufficient'
                ? 'border-[var(--warning)] ring-1 ring-[var(--warning)]/30'
                : 'border-[var(--sand-300)] focus:border-[var(--ink-500)] focus:ring-2 focus:ring-[var(--saffron-500)]/30'
            }`}
          />
        ))}
      </div>

      {/* Validation Feedback Line */}
      <div className="min-h-[24px] text-xs">
        {isValidating && (
          <div className="flex items-center gap-2 text-[var(--ink-500)] animate-pulse">
            <Loader2 size={14} className="animate-spin" />
            <span>{t('checkingPin')}</span>
          </div>
        )}

        {!isValidating && validationResult?.status === 'valid' && (
          <div className="flex items-center gap-2 text-[var(--success)] font-medium">
            <CheckCircle2 size={16} />
            <span>
              {validationResult.amount === 20 ? t('pinValidOverpay') : t('pinValid')}
            </span>
          </div>
        )}

        {!isValidating && validationResult?.status === 'invalid' && (
          <div className="flex items-center gap-2 text-[var(--error)] font-medium">
            <AlertCircle size={16} />
            <span>{t('pinInvalid')}</span>
          </div>
        )}

        {!isValidating && validationResult?.status === 'already_redeemed' && (
          <div className="flex items-center gap-2 text-[var(--warning)] font-medium">
            <AlertCircle size={16} />
            <span>{t('pinAlreadyRedeemed')}</span>
          </div>
        )}

        {!isValidating && validationResult?.status === 'insufficient' && (
          <div className="flex flex-col gap-2 p-2.5 rounded-lg bg-[var(--saffron-100)] border border-[var(--saffron-500)]/30 text-[var(--ink-900)]">
            <div className="flex items-center gap-2 font-medium">
              <AlertCircle size={16} className="text-[var(--warning)]" />
              <span>{t('pinInsufficient')}</span>
            </div>
            {!showSecondaryPin && (
              <button
                type="button"
                onClick={() => setShowSecondaryPin(true)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--saffron-600)] hover:underline self-start"
              >
                <Plus size={14} />
                <span>{t('addAnotherPin')}</span>
              </button>
            )}
          </div>
        )}

        {!isValidating && validationResult?.status === 'network_error' && (
          <div className="flex items-center justify-between text-[var(--error)] font-medium">
            <div className="flex items-center gap-2">
              <AlertCircle size={16} />
              <span>{t('pinNetworkError')}</span>
            </div>
            <button
              type="button"
              onClick={() => runValidation(fullPin, false)}
              className="inline-flex items-center gap-1 text-xs text-[var(--ink-900)] hover:underline"
            >
              <RefreshCw size={12} />
              <span>{t('retryBtn')}</span>
            </button>
          </div>
        )}

        {rateLimitTimer > 0 && (
          <div className="p-2 rounded bg-[var(--error)]/10 text-[var(--error)] font-medium flex items-center gap-2">
            <AlertCircle size={15} />
            <span>{t('rateLimitedNotice', { seconds: rateLimitTimer })}</span>
          </div>
        )}
      </div>

      {/* Secondary PIN Input (if combined) */}
      {showSecondaryPin && (
        <div className="flex flex-col gap-2 p-3 rounded-xl bg-[var(--sand-200)]/60 border border-[var(--sand-300)] mt-1 animate-in fade-in duration-200">
          <label className="text-xs font-semibold text-[var(--text-1)]">
            {t('secondPinLabel')}
          </label>
          <div className="grid grid-cols-4 gap-2 force-ltr">
            {secondarySegments.map((seg, idx) => (
              <input
                key={idx}
                ref={(el) => { secondaryRefs.current[idx] = el; }}
                type={isMasked ? 'password' : 'text'}
                maxLength={4}
                value={seg}
                onChange={(e) => handleSegmentChange(idx, e.target.value, true)}
                onKeyDown={(e) => handleKeyDown(idx, e, true)}
                onPaste={(e) => handlePaste(e, true)}
                placeholder="••••"
                className="w-full py-2 text-center font-mono text-sm font-bold tracking-widest rounded-lg border border-[var(--sand-300)] bg-[var(--sand-50)] text-[var(--text-1)] outline-none focus:border-[var(--ink-500)]"
              />
            ))}
          </div>
          {secondaryResult?.status === 'insufficient' && (
            <div className="text-xs text-[var(--success)] font-medium">
              ✓ Card 1 (RG 5) + Card 2 (RG 5) = RG 10.00 Total. Ready to redeem!
            </div>
          )}
        </div>
      )}

      {/* Submit / Redeem Button */}
      <button
        type="button"
        onClick={handleRedeem}
        disabled={!isSufficient || isRedeeming || isValidating || rateLimitTimer > 0}
        className="w-full py-3.5 px-4 rounded-xl bg-[var(--ink-900)] text-[var(--sand-50)] font-semibold hover:bg-[var(--ink-700)] disabled:opacity-40 disabled:cursor-not-allowed shadow-md transition flex items-center justify-center gap-2"
      >
        {isRedeeming ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            <span>Processing...</span>
          </>
        ) : (
          <span>{t('btnRedeem')}</span>
        )}
      </button>

      {/* Dev helper tip */}
      <p className="text-[11px] text-[var(--text-3)] text-center leading-normal">
        {t('openDevHint')}
      </p>
    </div>
  )
}
