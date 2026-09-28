import React, { useState } from 'react'
import { ShieldCheck, Lock, ExternalLink, Loader2, X } from 'lucide-react'
import { useLang } from '../../i18n'
import { startWalletPaymentApi } from '../../mock/api'

interface PaymentWindowSimProps {
  isOpen: boolean
  onClose: () => void
  onOutcome: (outcome: 'approved' | 'insufficient' | 'cancelled' | 'timeout') => void
}

export const PaymentWindowSim: React.FC<PaymentWindowSimProps> = ({
  isOpen,
  onClose,
  onOutcome,
}) => {
  const { t } = useLang()
  const [selectedOutcome, setSelectedOutcome] = useState<'approve' | 'insufficient' | 'cancel' | 'timeout'>('approve')
  const [isProcessing, setIsProcessing] = useState(false)

  if (!isOpen) return null

  const handleAction = async () => {
    setIsProcessing(true)
    try {
      const outcome = await startWalletPaymentApi(selectedOutcome, 'LYL-8F3K29')
      setIsProcessing(false)
      onOutcome(outcome)
    } catch {
      setIsProcessing(false)
      onOutcome('timeout')
    }
  }

  return (
    <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 bg-black/60 backdrop-blur-none animate-in fade-in duration-200">
      <div className="w-full max-w-[440px] bg-[var(--sand-50)] text-[var(--text-1)] rounded-2xl shadow-2xl border border-[var(--sand-300)] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        {/* Fake Browser Title Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--night-900)] text-[var(--sand-200)] text-xs border-b border-[var(--ink-700)]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--rose-500)]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--warning)]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--success)]" />
            <span className="font-sans font-medium text-[var(--sand-50)] ms-1 truncate">
              {t('simTitleBar')}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-[var(--sand-300)] hover:text-white transition"
          >
            <X size={16} />
          </button>
        </div>

        {/* Fake URL Bar */}
        <div className="flex items-center gap-2 px-4 py-2 bg-[var(--night-800)] text-xs text-[var(--sand-300)] font-mono border-b border-[var(--ink-700)]">
          <Lock size={12} className="text-[var(--success)]" />
          <span className="text-[var(--success)]">https://</span>
          <span>{t('simUrl')}</span>
          <span className="ms-auto text-[10px] px-1.5 py-0.5 rounded bg-[var(--ink-900)] text-[var(--saffron-500)]">
            SANDBOX
          </span>
        </div>

        {/* Gateway Body */}
        <div className="p-6 flex flex-col gap-6 flex-1">
          {/* Header Badge */}
          <div className="flex items-center justify-between pb-4 border-b border-[var(--sand-200)]">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[var(--ink-900)] text-[var(--saffron-500)] flex items-center justify-center font-bold font-serif text-lg">
                RG
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[var(--text-1)]">
                  Razer Gold Gateway
                </h4>
                <p className="text-xs text-[var(--text-3)]">
                  {t('simMerchant')}: {t('simMerchantName')}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-[var(--success)] text-xs font-semibold">
              <ShieldCheck size={16} />
              <span>TLS 1.3</span>
            </div>
          </div>

          {/* Amount Due Card */}
          <div className="p-4 rounded-xl bg-[var(--sand-100)] border border-[var(--sand-200)] flex flex-col gap-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--text-2)]">{t('simAmount')}:</span>
              <span className="font-mono text-xl font-bold text-[var(--ink-900)]">
                10.00 RG
              </span>
            </div>
            <div className="flex items-center justify-between text-xs pt-2 border-t border-[var(--sand-200)]">
              <span className="text-[var(--text-3)]">{t('simBalance')}:</span>
              <span className="font-mono font-medium text-[var(--text-1)]">
                42.50 RG
              </span>
            </div>
          </div>

          {/* Simulation Outcome Selector */}
          <div className="p-3.5 rounded-xl bg-[var(--saffron-100)]/70 border border-[var(--saffron-500)]/30 flex flex-col gap-2">
            <label className="text-xs font-semibold text-[var(--ink-900)] flex items-center justify-between">
              <span>{t('simOutcomeLabel')}</span>
              <span className="text-[10px] text-[var(--saffron-600)] font-mono">Dev Test</span>
            </label>
            <select
              value={selectedOutcome}
              onChange={(e) => setSelectedOutcome(e.target.value as 'approve' | 'insufficient' | 'cancel' | 'timeout')}
              className="w-full px-3 py-2 text-xs rounded-lg border border-[var(--saffron-500)]/40 bg-[var(--sand-50)] text-[var(--text-1)] outline-none focus:ring-1 focus:ring-[var(--saffron-500)] cursor-pointer"
            >
              <option value="approve">{t('outcomeApprove')}</option>
              <option value="insufficient">{t('outcomeInsufficient')}</option>
              <option value="cancel">{t('outcomeCancel')}</option>
              <option value="timeout">{t('outcomeTimeout')}</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 pt-2">
            <button
              onClick={handleAction}
              disabled={isProcessing}
              className="w-full py-3.5 px-4 rounded-xl bg-[var(--ink-900)] text-[var(--sand-50)] font-semibold hover:bg-[var(--ink-700)] shadow-md transition flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Processing Hosted Checkout...</span>
                </>
              ) : (
                <span>{t('btnApprove')}</span>
              )}
            </button>
            <button
              onClick={onClose}
              disabled={isProcessing}
              className="w-full py-2.5 text-xs text-[var(--text-3)] hover:text-[var(--text-1)] transition"
            >
              {t('btnCancelPayment')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
