import React, { useState, useEffect } from 'react'
import { Terminal, Settings, Database, Trash2, Copy, Check, RotateCcw, X, ExternalLink, ShieldAlert } from 'lucide-react'
import { inspectorStore, type InspectorLog } from '../../mock/inspector'
import { webhookEmitter } from '../../mock/webhook'
import { TEST_PINS } from '../../mock/pins'
import { setSimulateFeedError, getSimulateFeedError } from '../../mock/api'
import { useUI } from '../../contexts/UIContext'
import { useEntitlement } from '../../contexts/EntitlementContext'
import { useLang } from '../../i18n'

export const DevInspector: React.FC = () => {
  const { lang, t } = useLang()
  const { devInspectorOpen, setDevInspectorOpen, addToast } = useUI()
  const { resetEntitlement } = useEntitlement()

  const [activeTab, setActiveTab] = useState<'events' | 'controls' | 'testData'>('events')
  const [logs, setLogs] = useState<InspectorLog[]>([])
  const [webhookDelay, setWebhookDelay] = useState<number>(2.2)
  const [feedErrorEnabled, setFeedErrorEnabled] = useState<boolean>(getSimulateFeedError())
  const [copiedPin, setCopiedPin] = useState<string | null>(null)

  useEffect(() => {
    const unsub = inspectorStore.subscribe((newLogs) => {
      setLogs([...newLogs])
    })
    return () => unsub()
  }, [])

  const handleCopy = (pin: string) => {
    navigator.clipboard.writeText(pin)
    setCopiedPin(pin)
    addToast(t('copied'), 'success')
    setTimeout(() => setCopiedPin(null), 2000)
  }

  const handleDelayChange = (val: number) => {
    setWebhookDelay(val)
    webhookEmitter.currentDelaySeconds = val
    inspectorStore.addLog({
      level: 'info',
      endpoint: 'CONFIG_UPDATE',
      details: `Webhook arrival latency configured to ${val === -1 ? 'Never (Timeout)' : `${val}s`}`,
    })
  }

  const handleFeedErrorToggle = () => {
    const next = !feedErrorEnabled
    setFeedErrorEnabled(next)
    setSimulateFeedError(next)
    inspectorStore.addLog({
      level: next ? 'warn' : 'info',
      endpoint: 'CONFIG_UPDATE',
      details: `Simulate Feed API error flag set to: ${next}`,
    })
  }

  const handleReplayWebhook = () => {
    webhookEmitter.replayWebhook()
    addToast('Replayed webhook event', 'info')
  }

  const handleTamperedWebhook = () => {
    webhookEmitter.sendTamperedWebhook()
    addToast('Tampered webhook sent (Rejected)', 'error')
  }

  const handleResetDemo = () => {
    resetEntitlement()
    inspectorStore.clear()
    inspectorStore.addLog({
      level: 'info',
      endpoint: 'SYSTEM_RESET',
      details: 'Demo state and local storage wiped. Platform reset to fresh initial state.',
    })
    addToast('Demo state reset', 'info')
  }

  return (
    <>
      {/* Floating Toggle Chip (Bottom-end) */}
      <div className="fixed bottom-4 end-4 z-[450] print:hidden">
        <button
          onClick={() => setDevInspectorOpen(!devInspectorOpen)}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-full font-mono text-xs font-semibold shadow-lg transition-all duration-200 border ${
            devInspectorOpen
              ? 'bg-[var(--saffron-500)] text-[var(--night-900)] border-[var(--saffron-600)] scale-105'
              : 'bg-[var(--night-900)] text-[var(--sand-50)] border-[var(--ink-700)] hover:border-[var(--saffron-500)]'
          }`}
          aria-label="Toggle Dev Inspector"
        >
          <Terminal size={14} />
          <span>Dev Inspector</span>
          <span className="w-2 h-2 rounded-full bg-[var(--success)] animate-pulse" />
        </button>
      </div>

      {/* Docked Inspector Panel */}
      {devInspectorOpen && (
        <div className="fixed bottom-16 end-4 z-[450] w-[95vw] sm:w-[500px] h-[360px] bg-[var(--night-900)] text-[var(--sand-50)] rounded-2xl shadow-2xl border border-[var(--ink-700)] flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200 print:hidden font-mono">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--night-800)] border-b border-[var(--ink-700)] text-xs">
            <div className="flex items-center gap-2">
              <Terminal size={14} className="text-[var(--saffron-500)]" />
              <span className="font-bold text-[var(--sand-50)]">
                {t('inspectorTitle')}
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--ink-900)] text-[var(--sand-300)]">
                SIMULATION RUNTIME
              </span>
            </div>
            <button
              onClick={() => setDevInspectorOpen(false)}
              className="text-[var(--sand-300)] hover:text-white transition p-1"
            >
              <X size={15} />
            </button>
          </div>

          {/* Sub-header Context Banner */}
          <div className="px-4 py-1.5 bg-[var(--ink-900)] text-[10px] text-[var(--sand-300)] border-b border-[var(--ink-700)]/60 flex items-center justify-between">
            <span className="truncate">{t('inspectorNote')}</span>
          </div>

          {/* Tabs Bar */}
          <div className="flex items-center px-2 bg-[var(--night-900)] border-b border-[var(--ink-700)] text-xs">
            <button
              onClick={() => setActiveTab('events')}
              className={`flex items-center gap-1.5 px-3 py-2 border-b-2 font-medium transition ${
                activeTab === 'events'
                  ? 'border-[var(--saffron-500)] text-[var(--saffron-500)]'
                  : 'border-transparent text-[var(--sand-300)] hover:text-white'
              }`}
            >
              <Terminal size={12} />
              <span>{t('tabEvents')}</span>
              <span className="text-[10px] opacity-60 font-sans">({logs.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('controls')}
              className={`flex items-center gap-1.5 px-3 py-2 border-b-2 font-medium transition ${
                activeTab === 'controls'
                  ? 'border-[var(--saffron-500)] text-[var(--saffron-500)]'
                  : 'border-transparent text-[var(--sand-300)] hover:text-white'
              }`}
            >
              <Settings size={12} />
              <span>{t('tabControls')}</span>
            </button>
            <button
              onClick={() => setActiveTab('testData')}
              className={`flex items-center gap-1.5 px-3 py-2 border-b-2 font-medium transition ${
                activeTab === 'testData'
                  ? 'border-[var(--saffron-500)] text-[var(--saffron-500)]'
                  : 'border-transparent text-[var(--sand-300)] hover:text-white'
              }`}
            >
              <Database size={12} />
              <span>{t('tabTestData')}</span>
            </button>

            {activeTab === 'events' && (
              <button
                onClick={() => inspectorStore.clear()}
                className="ms-auto p-1.5 text-[var(--sand-300)] hover:text-white hover:bg-[var(--ink-700)] rounded transition"
                title={t('clearLogs')}
              >
                <Trash2 size={13} />
              </button>
            )}
          </div>

          {/* Tab Body */}
          <div className="flex-1 overflow-y-auto p-3 text-xs leading-relaxed select-text">
            {activeTab === 'events' && (
              <div className="flex flex-col gap-2">
                {logs.length === 0 ? (
                  <div className="text-center py-10 text-[var(--text-3)] font-sans text-xs">
                    No events logged yet. Trigger a payment or PIN check to see real-time events.
                  </div>
                ) : (
                  logs.map((log) => (
                    <div
                      key={log.id}
                      className="p-2 rounded bg-[var(--night-800)]/70 border border-[var(--ink-700)]/60 flex flex-col gap-1"
                    >
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-[var(--text-3)] font-mono">{log.timestamp}</span>
                        {log.endpoint && (
                          <span
                            className={`font-bold px-1.5 py-0.5 rounded text-[10px] ${
                              log.level === 'success'
                                ? 'bg-[var(--success)]/20 text-[var(--success)]'
                                : log.level === 'error'
                                ? 'bg-[var(--error)]/20 text-[var(--error)]'
                                : log.level === 'warn'
                                ? 'bg-[var(--warning)]/20 text-[var(--warning)]'
                                : 'bg-[var(--ink-700)] text-[var(--sand-200)]'
                            }`}
                          >
                            {log.endpoint}
                          </span>
                        )}
                      </div>
                      <div
                        className={`text-[11px] break-all ${
                          log.level === 'success'
                            ? 'text-[#6ee7b7]'
                            : log.level === 'error'
                            ? 'text-[#fca5a5]'
                            : log.level === 'warn'
                            ? 'text-[#fde047]'
                            : 'text-[var(--sand-100)]'
                        }`}
                      >
                        {log.details}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'controls' && (
              <div className="flex flex-col gap-4 py-1">
                {/* Latency config */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-semibold text-[var(--sand-200)]">
                    {t('webhookDelayLabel')}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: t('delay2s'), val: 2.2 },
                      { label: t('delay8s'), val: 8.0 },
                      { label: t('delayNever'), val: -1 },
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        onClick={() => handleDelayChange(opt.val)}
                        className={`py-2 px-2 rounded-lg text-[11px] font-sans font-medium border text-center transition ${
                          webhookDelay === opt.val
                            ? 'bg-[var(--saffron-500)] text-[var(--night-900)] border-[var(--saffron-600)] font-bold'
                            : 'bg-[var(--night-800)] text-[var(--sand-200)] border-[var(--ink-700)] hover:bg-[var(--ink-700)]'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Feed error toggle */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[var(--night-800)] border border-[var(--ink-700)]">
                  <span className="text-[11px] font-sans text-[var(--sand-100)]">
                    {t('simulateFeedErrorToggle')}
                  </span>
                  <input
                    type="checkbox"
                    checked={feedErrorEnabled}
                    onChange={handleFeedErrorToggle}
                    className="w-4 h-4 accent-[var(--saffron-500)] cursor-pointer"
                  />
                </div>

                {/* Idempotency & Tamper Webhook Triggers */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleReplayWebhook}
                    className="py-2 px-3 rounded-lg bg-[var(--ink-700)] hover:bg-[var(--ink-500)] text-[var(--sand-50)] text-[11px] font-sans font-medium transition flex items-center justify-center gap-1.5"
                  >
                    <RotateCcw size={12} />
                    <span>{t('btnReplayWebhook')}</span>
                  </button>

                  <button
                    onClick={handleTamperedWebhook}
                    className="py-2 px-3 rounded-lg bg-[var(--error)]/30 border border-[var(--error)]/60 text-[#fca5a5] hover:bg-[var(--error)]/40 text-[11px] font-sans font-medium transition flex items-center justify-center gap-1.5"
                  >
                    <ShieldAlert size={12} />
                    <span>{t('btnTamperWebhook')}</span>
                  </button>
                </div>

                {/* Reset All */}
                <div className="pt-2 border-t border-[var(--ink-700)]">
                  <button
                    onClick={handleResetDemo}
                    className="w-full py-2 px-3 rounded-lg bg-[var(--night-800)] hover:bg-[var(--rose-500)]/30 text-[var(--sand-300)] hover:text-white border border-[var(--ink-700)] text-[11px] font-sans font-medium transition flex items-center justify-center gap-1.5"
                  >
                    <Trash2 size={12} />
                    <span>{t('btnResetAll')}</span>
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'testData' && (
              <div className="flex flex-col gap-2.5">
                <span className="text-[11px] font-sans text-[var(--sand-200)]">
                  {t('testPinsTitle')}
                </span>
                {TEST_PINS.map((item) => (
                  <div
                    key={item.pin}
                    className="p-2 rounded-xl bg-[var(--night-800)] border border-[var(--ink-700)] flex items-center justify-between gap-2"
                  >
                    <div>
                      <div className="font-mono text-xs font-bold text-[var(--saffron-500)] tracking-wider">
                        {item.formatted}
                      </div>
                      <div className="text-[10px] text-[var(--text-3)] font-sans">
                        {lang === 'ar' ? item.labelAr : item.labelEn}
                      </div>
                    </div>
                    <button
                      onClick={() => handleCopy(item.pin)}
                      className="px-2.5 py-1 rounded bg-[var(--ink-900)] hover:bg-[var(--ink-700)] text-[10px] text-[var(--sand-100)] flex items-center gap-1 border border-[var(--ink-700)] transition"
                    >
                      {copiedPin === item.pin ? (
                        <>
                          <Check size={10} className="text-[var(--success)]" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy size={10} />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
