import React, { useState } from 'react'
import { ChevronDown, ChevronUp, FileDown, CheckCircle2, Wrench, Search } from 'lucide-react'
import { TEST_CASES, type TestCase } from '../../data/testCases'
import { useLang } from '../../i18n'
import { useUI } from '../../contexts/UIContext'

export const CaseTable: React.FC = () => {
  const { lang, t } = useLang()
  const { addToast } = useUI()

  const [selectedArea, setSelectedArea] = useState<string>('all')
  const [expandedId, setExpandedId] = useState<string | null>('PIN-001')
  const [searchQuery, setSearchQuery] = useState('')

  const areas = ['all', 'PIN', 'Wallet', 'Webhook', 'RTL', 'Mobile', 'Legal', 'SSL']

  const filteredCases = TEST_CASES.filter((c) => {
    const matchesArea = selectedArea === 'all' || c.area === selectedArea
    const query = searchQuery.toLowerCase()
    const matchesQuery =
      !query ||
      c.id.toLowerCase().includes(query) ||
      c.scenarioEn.toLowerCase().includes(query) ||
      c.scenarioAr.toLowerCase().includes(query) ||
      c.device.toLowerCase().includes(query)
    return matchesArea && matchesQuery
  })

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id))
  }

  const handleExportPdf = () => {
    addToast('Demo: PDF export is part of the real deliverable', 'info')
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Control Bar: Area Filter Chips + Search + PDF Export */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Area Chips */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {areas.map((area) => (
            <button
              key={area}
              onClick={() => setSelectedArea(area)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                selectedArea === area
                  ? 'bg-[var(--ink-900)] text-white shadow-sm'
                  : 'bg-[var(--sand-50)] text-[var(--text-2)] border border-[var(--sand-200)] hover:border-[var(--sand-300)]'
              }`}
            >
              {area === 'all' ? t('allAreas') : area}
            </button>
          ))}
        </div>

        {/* Search & Export CTA */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 md:w-56">
            <Search size={14} className="absolute start-3 top-1/2 -translate-y-1/2 text-[var(--text-3)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search test cases..."
              className="w-full ps-8 pe-3 py-1.5 rounded-xl border border-[var(--sand-200)] bg-[var(--sand-50)] text-xs text-[var(--text-1)] outline-none focus:border-[var(--ink-500)]"
            />
          </div>

          <button
            onClick={handleExportPdf}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[var(--ink-900)] text-white text-xs font-semibold hover:bg-[var(--ink-700)] transition flex-shrink-0 shadow-sm"
          >
            <FileDown size={14} />
            <span className="hidden sm:inline">{t('downloadPdf')}</span>
            <span className="sm:hidden">PDF</span>
          </button>
        </div>
      </div>

      {/* Test Matrix Table (Desktop) / Cards (Mobile) */}
      <div className="rounded-2xl border border-[var(--sand-200)] bg-[var(--sand-50)] overflow-hidden shadow-sm">
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-xs text-start border-collapse">
            <thead>
              <tr className="bg-[var(--sand-100)] border-b border-[var(--sand-200)] text-[var(--text-2)] font-semibold">
                <th className="py-3 px-4 text-start w-24 font-mono">{t('colId')}</th>
                <th className="py-3 px-4 text-start w-28">{t('colArea')}</th>
                <th className="py-3 px-4 text-start">{t('colScenario')}</th>
                <th className="py-3 px-4 text-start w-32">{t('colDevice')}</th>
                <th className="py-3 px-4 text-center w-28">{t('colResult')}</th>
                <th className="py-3 px-4 text-end w-20"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--sand-200)]">
              {filteredCases.map((c) => {
                const isExpanded = expandedId === c.id
                const scenario = lang === 'ar' ? c.scenarioAr : c.scenarioEn
                return (
                  <React.Fragment key={c.id}>
                    <tr
                      onClick={() => toggleExpand(c.id)}
                      className="hover:bg-[var(--sand-100)]/60 cursor-pointer transition-colors"
                    >
                      <td className="py-3.5 px-4 font-mono font-bold text-[var(--ink-700)]">
                        {c.id}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-[var(--text-2)]">
                        <span className="px-2 py-0.5 rounded bg-[var(--sand-200)]/60 text-[var(--ink-900)]">
                          {c.area}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-medium text-[var(--text-1)]">
                        {scenario}
                      </td>
                      <td className="py-3.5 px-4 text-[var(--text-3)] font-mono text-[11px]">
                        {c.device}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-semibold text-[11px] ${
                            c.result === 'passed'
                              ? 'bg-[var(--success)]/10 text-[var(--success)]'
                              : 'bg-[var(--saffron-100)] text-[var(--saffron-600)]'
                          }`}
                        >
                          {c.result === 'passed' ? (
                            <CheckCircle2 size={12} />
                          ) : (
                            <Wrench size={12} />
                          )}
                          <span>{c.result === 'passed' ? 'PASSED' : 'FIXED'}</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-end text-[var(--text-3)]">
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </td>
                    </tr>

                    {/* Expanded Detail Accordion */}
                    {isExpanded && (
                      <tr className="bg-[var(--sand-100)]/50">
                        <td colSpan={6} className="p-4 sm:p-6 border-b border-[var(--sand-200)]">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                            <div className="flex flex-col gap-2">
                              <span className="font-semibold text-[var(--text-1)] uppercase tracking-wider text-[11px]">
                                Execution Steps
                              </span>
                              <ul className="list-decimal list-inside flex flex-col gap-1 text-[var(--text-2)]">
                                {(lang === 'ar' ? c.stepsAr : c.stepsEn).map((step, i) => (
                                  <li key={i}>{step}</li>
                                ))}
                              </ul>
                              <div className="mt-2">
                                <span className="font-semibold text-[var(--text-1)] block mb-1">
                                  {t('expectedResult')}:
                                </span>
                                <p className="text-[var(--text-2)] leading-relaxed">
                                  {lang === 'ar' ? c.expectedAr : c.expectedEn}
                                </p>
                              </div>
                            </div>

                            <div className="flex flex-col gap-2">
                              <div>
                                <span className="font-semibold text-[var(--text-1)] block mb-1">
                                  {t('actualResult')}:
                                </span>
                                <p className="text-[var(--success)] font-medium leading-relaxed">
                                  {lang === 'ar' ? c.actualAr : c.actualEn}
                                </p>
                              </div>
                              <div className="mt-2">
                                <span className="font-semibold text-[var(--text-1)] block mb-1">
                                  {t('logTrace')}:
                                </span>
                                <pre className="p-2.5 rounded-lg bg-[var(--night-900)] text-[var(--sand-50)] font-mono text-[11px] overflow-x-auto whitespace-pre-wrap">
                                  {c.logExcerpt}
                                </pre>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Stacked Cards View (<768px) */}
        <div className="md:hidden divide-y divide-[var(--sand-200)]">
          {filteredCases.map((c) => {
            const isExpanded = expandedId === c.id
            const scenario = lang === 'ar' ? c.scenarioAr : c.scenarioEn
            return (
              <div key={c.id} className="p-4 flex flex-col gap-2">
                <div
                  onClick={() => toggleExpand(c.id)}
                  className="flex items-start justify-between gap-3 cursor-pointer"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs font-bold text-[var(--ink-700)]">
                        {c.id}
                      </span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-[var(--sand-200)] text-[var(--ink-900)] font-semibold">
                        {c.area}
                      </span>
                    </div>
                    <h4 className="text-xs font-semibold text-[var(--text-1)] leading-snug">
                      {scenario}
                    </h4>
                  </div>
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        c.result === 'passed'
                          ? 'bg-[var(--success)]/10 text-[var(--success)]'
                          : 'bg-[var(--saffron-100)] text-[var(--saffron-600)]'
                      }`}
                    >
                      {c.result.toUpperCase()}
                    </span>
                    {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </div>
                </div>

                {isExpanded && (
                  <div className="pt-3 mt-2 border-t border-[var(--sand-200)] text-xs flex flex-col gap-3">
                    <div>
                      <span className="font-semibold text-[var(--text-2)] block mb-1">
                        Device: {c.device}
                      </span>
                      <span className="font-semibold text-[var(--text-1)] block mb-0.5">
                        {t('actualResult')}:
                      </span>
                      <p className="text-[var(--success)] font-medium">
                        {lang === 'ar' ? c.actualAr : c.actualEn}
                      </p>
                    </div>
                    <pre className="p-2 rounded bg-[var(--night-900)] text-[var(--sand-50)] font-mono text-[10px] overflow-x-auto whitespace-pre-wrap">
                      {c.logExcerpt}
                    </pre>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
