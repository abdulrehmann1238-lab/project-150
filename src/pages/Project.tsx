import React from 'react'
import { Server, Calendar, Calculator, Briefcase, ExternalLink, Code } from 'lucide-react'
import { useLang } from '../i18n'
import { AnnotatedMap } from '../components/project/AnnotatedMap'
import { Timeline } from '../components/project/Timeline'
import { EstimateTable } from '../components/project/EstimateTable'

export const Project: React.FC = () => {
  const { lang, t } = useLang()

  return (
    <div className="py-10 sm:py-16 bg-[var(--sand-50)] min-h-screen">
      <div className="layali-container flex flex-col gap-16">
        {/* Page Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--sand-200)] text-xs font-semibold text-[var(--ink-700)] mb-3">
            <Server size={14} />
            <span>Deliverable Strategy & WordPress Translation</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[var(--ink-900)] mb-3 leading-tight">
            {t('underHoodTitle')}
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-2)] leading-relaxed">
            {t('underHoodSubtitle')}
          </p>
        </div>

        {/* Section 1: WordPress Architecture Map */}
        <section id="architecture" className="flex flex-col gap-6">
          <div className="border-b border-[var(--sand-200)] pb-3">
            <h2 className="text-2xl font-serif font-bold text-[var(--ink-900)]">
              1. Interactive WordPress Architecture Blueprint
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-3)] mt-0.5">
              Click each hotspot to inspect the corresponding theme file, custom plugin hook, or REST endpoint.
            </p>
          </div>

          <AnnotatedMap />
        </section>

        {/* Section 2: 3-Week Execution Roadmap */}
        <section id="timeline" className="flex flex-col gap-6">
          <div className="border-b border-[var(--sand-200)] pb-3">
            <h2 className="text-2xl font-serif font-bold text-[var(--ink-900)]">
              2. {t('timelineTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-3)] mt-0.5">
              {t('timelineSubtitle')}
            </p>
          </div>

          <Timeline />
        </section>

        {/* Section 3: Itemised Estimate Table (§11.8) */}
        <section id="estimate" className="flex flex-col gap-6">
          <div className="border-b border-[var(--sand-200)] pb-3">
            <h2 className="text-2xl font-serif font-bold text-[var(--ink-900)]">
              3. {t('estimateTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-3)] mt-0.5">
              {t('estimateSubtitle')}
            </p>
          </div>

          <EstimateTable />
        </section>

        {/* Section 4: Configurable Portfolio Slot (§11.8) */}
        <section id="portfolio" className="flex flex-col gap-4">
          <div className="border-b border-[var(--sand-200)] pb-3">
            <h2 className="text-2xl font-serif font-bold text-[var(--ink-900)]">
              4. Relevant Case Studies & References
            </h2>
          </div>

          <div className="p-8 rounded-3xl bg-[var(--sand-100)] border-2 border-dashed border-[var(--sand-300)] flex flex-col items-center text-center max-w-2xl mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-[var(--sand-200)] text-[var(--ink-700)] flex items-center justify-center mb-3">
              <Briefcase size={22} />
            </div>
            <h3 className="text-lg font-bold text-[var(--ink-900)] mb-1">
              {t('portfolioSlotTitle')}
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-3)] mb-4 max-w-lg leading-relaxed">
              {t('portfolioSlotDesc')}
            </p>
            <div className="text-[11px] font-mono text-[var(--saffron-600)] px-3 py-1 rounded bg-[var(--saffron-100)] border border-[var(--saffron-500)]/30">
              Configurable Slot • Ready for your proposal submission
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
