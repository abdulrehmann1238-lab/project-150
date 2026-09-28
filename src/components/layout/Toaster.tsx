import React from 'react'
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react'
import { useUI } from '../../contexts/UIContext'

export const Toaster: React.FC = () => {
  const { toasts, removeToast } = useUI()

  if (toasts.length === 0) return null

  return (
    <div
      aria-live="polite"
      className="fixed bottom-16 sm:bottom-6 end-6 z-[500] flex flex-col gap-2 pointer-events-none max-w-sm w-full"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto p-3.5 rounded-xl bg-[var(--night-900)] text-[var(--sand-50)] border border-[var(--ink-700)] shadow-xl flex items-center justify-between gap-3 animate-in slide-in-from-bottom-2 duration-200"
        >
          <div className="flex items-center gap-2.5 text-xs font-medium">
            {t.type === 'success' && (
              <CheckCircle2 size={16} className="text-[var(--success)] flex-shrink-0" />
            )}
            {t.type === 'error' && (
              <AlertCircle size={16} className="text-[var(--error)] flex-shrink-0" />
            )}
            {t.type === 'info' && (
              <Info size={16} className="text-[var(--saffron-500)] flex-shrink-0" />
            )}
            <span>{t.message}</span>
          </div>

          <button
            onClick={() => removeToast(t.id)}
            className="text-[var(--sand-300)] hover:text-white transition p-1"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  )
}
