import React from 'react'
import { ShieldCheck, CheckCircle2 } from 'lucide-react'
import { useLang } from '../i18n'
import { SummaryTiles } from '../components/report/SummaryTiles'
import { CaseTable } from '../components/report/CaseTable'

export const TestReport: React.FC = () => {
  const { t } = useLang()

  return (
    <div className="py-10 sm:py-16 bg-[var(--sand-50)] min-h-screen">
      <div className="layali-container flex flex-col gap-10">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[var(--sand-200)]">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--sand-200)] text-xs font-semibold text-[var(--ink-700)] mb-3">
              <ShieldCheck size={14} className="text-[var(--success)]" />
              <span>Scope Deliverable #9 Verification</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[var(--ink-900)] mb-3 leading-tight">
              {t('testReportTitle')}
            </h1>
            <p className="text-sm sm:text-base text-[var(--text-2)] leading-relaxed">
              {t('testReportSubtitle')}
            </p>
          </div>

          <div className="px-3.5 py-1.5 rounded-full bg-[var(--saffron-100)] text-[var(--saffron-600)] text-xs font-semibold border border-[var(--saffron-500)]/30 self-start sm:self-auto font-mono">
            {t('testSampleBadge')}
          </div>
        </div>

        {/* Summary Overview Metrics */}
        <SummaryTiles />

        {/* Matrix Case Table & Filters */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif font-bold text-[var(--ink-900)]">
              Verification Matrix & Log Traces
            </h2>
            <span className="text-xs text-[var(--text-3)] font-mono">
              Filter by test category
            </span>
          </div>

          <CaseTable />
        </section>
      </div>
    </div>
  )
}
