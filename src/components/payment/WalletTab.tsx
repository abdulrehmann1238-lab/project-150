import React, { useState } from 'react'
import { Wallet, AlertCircle, Info, ArrowRight } from 'lucide-react'
import { useLang } from '../../i18n'
import { PaymentWindowSim } from './PaymentWindowSim'

interface WalletTabProps {
  onApproved: () => void
  onSwitchToPin: () => void
}

export const WalletTab: React.FC<WalletTabProps> = ({ onApproved, onSwitchToPin }) => {
  const { t } = useLang()
  const [isWindowOpen, setIsWindowOpen] = useState(false)
  const [outcomeNotice, setOutcomeNotice] = useState<'cancelled' | 'insufficient' | 'timeout' | null>(null)

  const handleOutcome = (outcome: 'approved' | 'insufficient' | 'cancelled' | 'timeout') => {
    setIsWindowOpen(false)
    if (outcome === 'approved') {
      setOutcomeNotice(null)
      onApproved()
    } else {
      setOutcomeNotice(outcome)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Informative Block */}
      <div className="p-4 rounded-xl bg-[var(--sand-100)] border border-[var(--sand-200)] flex items-start gap-3">
        <div className="p-2 rounded-lg bg-[var(--sand-200)] text-[var(--ink-900)] flex-shrink-0">
          <Wallet size={20} />
        </div>
        <div className="text-xs text-[var(--text-2)] leading-relaxed">
          <p className="font-semibold text-[var(--text-1)] mb-1">
            {t('tabWallet')} Checkout
          </p>
          <p>{t('walletDesc')}</p>
        </div>
      </div>

      {/* Outcome Notices */}
      {outcomeNotice === 'cancelled' && (
        <div className="p-3.5 rounded-xl bg-[var(--info)]/10 border border-[var(--info)]/30 text-xs text-[var(--ink-900)] flex flex-col gap-2 animate-in fade-in duration-200">
          <div className="flex items-center gap-2 font-medium text-[var(--info)]">
            <Info size={16} />
            <span>{t('walletCancelledNotice')}</span>
          </div>
          <button
            onClick={() => setIsWindowOpen(true)}
            className="text-xs font-semibold text-[var(--ink-900)] hover:underline self-start"
          >
            {t('walletTryAgain')}
          </button>
        </div>
      )}

      {outcomeNotice === 'insufficient' && (
        <div className="p-3.5 rounded-xl bg-[var(--error)]/10 border border-[var(--error)]/30 text-xs text-[var(--ink-900)] flex flex-col gap-2.5 animate-in fade-in duration-200">
          <div className="flex items-center gap-2 font-medium text-[var(--error)]">
            <AlertCircle size={16} />
            <span>{t('walletInsufficientError')}</span>
          </div>
          <button
            onClick={onSwitchToPin}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--ink-900)] bg-[var(--sand-50)] px-3 py-1.5 rounded-lg border border-[var(--sand-300)] hover:bg-white transition self-start shadow-sm"
          >
            <span>{t('usePinInstead')}</span>
            <ArrowRight size={13} className="icon-dir" />
          </button>
        </div>
      )}

      {outcomeNotice === 'timeout' && (
        <div className="p-3.5 rounded-xl bg-[var(--warning)]/10 border border-[var(--warning)]/30 text-xs text-[var(--ink-900)] flex flex-col gap-2 animate-in fade-in duration-200">
          <div className="flex items-center gap-2 font-medium text-[var(--warning)]">
            <AlertCircle size={16} />
            <span>{t('walletTimeoutError')}</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsWindowOpen(true)}
              className="text-xs font-semibold hover:underline"
            >
              {t('walletTryAgain')}
            </button>
            <span className="text-[var(--text-3)]">•</span>
            <button
              onClick={onApproved}
              className="text-xs font-semibold hover:underline text-[var(--ink-700)]"
            >
              {t('checkStatusBtn')}
            </button>
          </div>
        </div>
      )}

      {/* Main Trigger Button */}
      <button
        type="button"
        onClick={() => setIsWindowOpen(true)}
        className="w-full py-3.5 px-4 rounded-xl bg-[var(--ink-900)] text-[var(--sand-50)] font-semibold hover:bg-[var(--ink-700)] shadow-md transition flex items-center justify-center gap-2.5"
      >
        <Wallet size={18} />
        <span>{t('btnPayWallet')}</span>
      </button>

      {/* Secondary option hint */}
      <div className="text-center pt-2">
        <button
          type="button"
          onClick={onSwitchToPin}
          className="text-xs text-[var(--ink-500)] hover:text-[var(--ink-900)] font-medium hover:underline transition"
        >
          {t('havePin')}
        </button>
      </div>

      {/* Simulated Window Modal */}
      <PaymentWindowSim
        isOpen={isWindowOpen}
        onClose={() => setIsWindowOpen(false)}
        onOutcome={handleOutcome}
      />
    </div>
  )
}
