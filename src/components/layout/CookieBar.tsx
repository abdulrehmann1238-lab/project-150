import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Cookie, X } from 'lucide-react'
import { useLang } from '../../i18n'

export const CookieBar: React.FC = () => {
  const { t } = useLang()
  const [dismissed, setDismissed] = useState(() => {
    return localStorage.getItem('layali.cookieDismissed') === 'true'
  })

  if (dismissed) return null

  const handleDismiss = () => {
    localStorage.setItem('layali.cookieDismissed', 'true')
    setDismissed(true)
  }

  return (
    <div className="fixed bottom-16 sm:bottom-4 start-4 z-[400] max-w-md p-4 rounded-2xl bg-[var(--sand-50)] text-[var(--text-1)] border border-[var(--sand-300)] shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-xl bg-[var(--sand-200)] text-[var(--ink-900)] flex-shrink-0">
          <Cookie size={18} />
        </div>
        <div className="flex-1 text-xs">
          <p className="font-semibold mb-1 text-[var(--ink-900)]">
            Essential Local Preferences
          </p>
          <p className="text-[var(--text-2)] leading-relaxed mb-3">
            We store your chosen language and active pass status locally. No cross-site ads or marketing trackers.{' '}
            <Link to="/legal/cookies" className="text-[var(--ink-700)] underline font-medium">
              Read Policy
            </Link>
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDismiss}
              className="px-3.5 py-1.5 rounded-lg bg-[var(--ink-900)] text-white font-semibold hover:bg-[var(--ink-700)] transition"
            >
              Acknowledge
            </button>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="text-[var(--text-3)] hover:text-[var(--text-1)] p-1"
        >
          <X size={15} />
        </button>
      </div>
    </div>
  )
}
