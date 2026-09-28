import React from 'react'
import { CheckCircle2, Wrench, AlertCircle, Smartphone, ShieldCheck } from 'lucide-react'
import { useLang } from '../../i18n'

export const SummaryTiles: React.FC = () => {
  const { t } = useLang()

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
      {/* Total Cases */}
      <div className="p-4 rounded-2xl bg-[var(--sand-50)] border border-[var(--sand-200)] shadow-sm">
        <span className="text-xs text-[var(--text-3)] font-medium">
          {t('totalCases')}
        </span>
        <div className="text-2xl sm:text-3xl font-mono font-bold text-[var(--ink-900)] mt-1">
          48
        </div>
        <span className="text-[11px] text-[var(--text-3)] font-sans">
          Across 7 functional areas
        </span>
      </div>

      {/* Passed */}
      <div className="p-4 rounded-2xl bg-[var(--sand-50)] border border-[var(--success)]/40 shadow-sm">
        <span className="text-xs text-[var(--success)] font-medium flex items-center gap-1">
          <CheckCircle2 size={13} />
          <span>{t('passedCases')}</span>
        </span>
        <div className="text-2xl sm:text-3xl font-mono font-bold text-[var(--success)] mt-1">
          45
        </div>
        <span className="text-[11px] text-[var(--text-3)] font-sans">
          93.8% First-pass rate
        </span>
      </div>

      {/* Fixed */}
      <div className="p-4 rounded-2xl bg-[var(--sand-50)] border border-[var(--saffron-500)]/40 shadow-sm">
        <span className="text-xs text-[var(--saffron-600)] font-medium flex items-center gap-1">
          <Wrench size={13} />
          <span>{t('fixedCases')}</span>
        </span>
        <div className="text-2xl sm:text-3xl font-mono font-bold text-[var(--saffron-600)] mt-1">
          3
        </div>
        <span className="text-[11px] text-[var(--text-3)] font-sans">
          Resolved during testing
        </span>
      </div>

      {/* Open */}
      <div className="p-4 rounded-2xl bg-[var(--sand-50)] border border-[var(--sand-200)] shadow-sm">
        <span className="text-xs text-[var(--text-3)] font-medium flex items-center gap-1">
          <AlertCircle size={13} />
          <span>{t('openIssues')}</span>
        </span>
        <div className="text-2xl sm:text-3xl font-mono font-bold text-[var(--text-3)] mt-1">
          0
        </div>
        <span className="text-[11px] text-[var(--success)] font-semibold font-sans">
          Zero blocking defects
        </span>
      </div>

      {/* Devices Tested */}
      <div className="col-span-2 lg:col-span-1 p-4 rounded-2xl bg-[var(--sand-50)] border border-[var(--sand-200)] shadow-sm">
        <span className="text-xs text-[var(--ink-700)] font-medium flex items-center gap-1">
          <Smartphone size={13} />
          <span>{t('testedDevices')}</span>
        </span>
        <div className="text-2xl sm:text-3xl font-mono font-bold text-[var(--ink-900)] mt-1">
          6+
        </div>
        <span className="text-[11px] text-[var(--text-3)] font-sans">
          iOS, Android & Desktop
        </span>
      </div>
    </div>
  )
}
