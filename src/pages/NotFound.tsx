import React from 'react'
import { Link } from 'react-router-dom'
import { Compass, Home, Gamepad2 } from 'lucide-react'
import { useLang } from '../i18n'

export const NotFound: React.FC = () => {
  const { t } = useLang()

  return (
    <div className="py-24 sm:py-32 bg-[var(--sand-50)] min-h-[70vh] flex items-center justify-center">
      <div className="layali-container text-center max-w-md mx-auto">
        <div className="w-16 h-16 rounded-3xl bg-[var(--sand-200)] text-[var(--ink-700)] flex items-center justify-center mx-auto mb-6 shadow-sm">
          <Compass size={32} className="animate-spin duration-1000" />
        </div>

        <span className="font-mono text-xs font-bold text-[var(--saffron-600)] tracking-widest uppercase mb-1 block">
          Error 404
        </span>

        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[var(--ink-900)] mb-3">
          {t('notFoundTitle')}
        </h1>

        <p className="text-sm text-[var(--text-2)] mb-8 leading-relaxed">
          {t('notFoundDesc')}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[var(--ink-900)] text-[var(--sand-50)] text-xs font-semibold hover:bg-[var(--ink-700)] transition flex items-center justify-center gap-2"
          >
            <Home size={14} />
            <span>{t('backHome')}</span>
          </Link>

          <Link
            to="/games"
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-[var(--sand-300)] text-[var(--ink-900)] text-xs font-semibold hover:bg-[var(--sand-100)] transition flex items-center justify-center gap-2"
          >
            <Gamepad2 size={14} />
            <span>{t('exploreGames')}</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
