import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck, Lock, Send, CheckCircle2, RotateCcw } from 'lucide-react'
import { useLang } from '../../i18n'
import { useUI } from '../../contexts/UIContext'
import { useEntitlement } from '../../contexts/EntitlementContext'
import { submitContactApi } from '../../mock/api'

export const Footer: React.FC = () => {
  const { lang, toggleLang, t } = useLang()
  const { openPaywall, addToast } = useUI()
  const { resetEntitlement } = useEntitlement()

  // Contact form state (§11.11, §18)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'general',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return

    setIsSubmitting(true)
    try {
      await submitContactApi(formData)
      setIsSubmitting(false)
      setIsSubmitted(true)
      addToast(t('contactSuccessTitle'), 'success')
    } catch {
      setIsSubmitting(false)
    }
  }

  const handleResetDemo = (e: React.MouseEvent) => {
    e.preventDefault()
    resetEntitlement()
    addToast('Demo state and entitlement reset', 'info')
  }

  return (
    <footer className="bg-[var(--night-900)] text-[var(--sand-50)] border-t border-[rgba(255,255,255,0.08)] pt-16 pb-24 md:pb-12">
      <div className="layali-container">
        {/* Main Grid: 4 Links Columns + Contact Mini Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-[rgba(255,255,255,0.08)]">
          {/* Links Section (8 cols) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-8 text-xs">
            {/* Column 1: Play */}
            <div className="flex flex-col gap-3">
              <span className="font-semibold text-[var(--saffron-500)] uppercase tracking-wider text-[11px]">
                {t('footerPlayCol')}
              </span>
              <ul className="flex flex-col gap-2 text-[var(--sand-200)]">
                <li>
                  <Link to="/games?tab=free" className="hover:text-white transition">
                    Free Games
                  </Link>
                </li>
                <li>
                  <Link to="/games" className="hover:text-white transition">
                    Complete Catalog
                  </Link>
                </li>
                <li>
                  <Link to="/play/memory-lanterns" className="hover:text-white transition">
                    Memory Match Demo
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Premium */}
            <div className="flex flex-col gap-3">
              <span className="font-semibold text-[var(--saffron-500)] uppercase tracking-wider text-[11px]">
                {t('footerPremiumCol')}
              </span>
              <ul className="flex flex-col gap-2 text-[var(--sand-200)]">
                <li>
                  <Link to="/premium" className="hover:text-white transition">
                    Premium Pass (RG 10)
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => openPaywall('pin')}
                    className="hover:text-white transition text-start"
                  >
                    Redeem PIN
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => openPaywall('wallet')}
                    className="hover:text-white transition text-start"
                  >
                    Wallet Payment
                  </button>
                </li>
                <li>
                  <Link to="/library" className="hover:text-white transition">
                    My Library
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: For Project Team */}
            <div className="flex flex-col gap-3">
              <span className="font-semibold text-[var(--saffron-500)] uppercase tracking-wider text-[11px]">
                {t('footerProjectCol')}
              </span>
              <ul className="flex flex-col gap-2 text-[var(--sand-200)]">
                <li>
                  <Link to="/project" className="hover:text-white transition">
                    Under the Hood (WP)
                  </Link>
                </li>
                <li>
                  <Link to="/project#timeline" className="hover:text-white transition">
                    3-Week Timeline
                  </Link>
                </li>
                <li>
                  <Link to="/project#estimate" className="hover:text-white transition">
                    Deliverables Table
                  </Link>
                </li>
                <li>
                  <Link to="/test-report" className="hover:text-white transition">
                    Sandbox Test Report
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Legal */}
            <div className="flex flex-col gap-3">
              <span className="font-semibold text-[var(--saffron-500)] uppercase tracking-wider text-[11px]">
                {t('footerLegalCol')}
              </span>
              <ul className="flex flex-col gap-2 text-[var(--sand-200)]">
                <li>
                  <Link to="/legal/terms" className="hover:text-white transition">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/legal/privacy" className="hover:text-white transition">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/legal/refunds" className="hover:text-white transition">
                    Refund Policy
                  </Link>
                </li>
                <li>
                  <Link to="/legal/cookies" className="hover:text-white transition">
                    Cookie Storage
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Mini Form (5 cols) §11.11 */}
          <div className="lg:col-span-5 bg-[var(--night-800)] p-5 sm:p-6 rounded-2xl border border-[var(--ink-700)]">
            <h4 className="text-base font-serif font-bold text-[var(--sand-50)] mb-1">
              {t('contactTitle')}
            </h4>
            <p className="text-xs text-[var(--sand-200)] mb-4">
              {t('contactSubtitle')}
            </p>

            {isSubmitted ? (
              <div className="p-4 rounded-xl bg-[var(--ink-900)] border border-[var(--success)]/40 text-center flex flex-col items-center gap-2 animate-in fade-in duration-200">
                <CheckCircle2 size={24} className="text-[var(--success)]" />
                <span className="text-xs font-semibold text-[var(--sand-50)]">
                  {t('contactSuccessTitle')}
                </span>
                <p className="text-[11px] text-[var(--sand-200)]">
                  {t('contactSuccessDesc')}
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-2 text-xs text-[var(--saffron-500)] hover:underline"
                >
                  {t('sendAnother')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="flex flex-col gap-3 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <input
                    type="text"
                    required
                    placeholder={t('contactName')}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="px-3 py-2 rounded-xl bg-[var(--night-900)] border border-[var(--ink-700)] text-[var(--sand-50)] placeholder-[var(--text-3)] outline-none focus:border-[var(--saffron-500)]"
                  />
                  <input
                    type="email"
                    required
                    placeholder={t('contactEmail')}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="px-3 py-2 rounded-xl bg-[var(--night-900)] border border-[var(--ink-700)] text-[var(--sand-50)] placeholder-[var(--text-3)] outline-none focus:border-[var(--saffron-500)]"
                  />
                </div>

                <textarea
                  required
                  rows={2}
                  placeholder={t('contactMessage')}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[var(--night-900)] border border-[var(--ink-700)] text-[var(--sand-50)] placeholder-[var(--text-3)] outline-none focus:border-[var(--saffron-500)] resize-none"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="py-2.5 px-4 rounded-xl bg-[var(--sand-50)] text-[var(--ink-900)] font-semibold hover:bg-white transition flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Send size={13} className="icon-dir" />
                  <span>{isSubmitting ? 'Sending...' : t('contactSubmit')}</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar: Copyright, Language, SSL Chip, Reset Demo */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-3)]">
          <div className="flex items-center gap-3">
            <span>© {new Date().getFullYear()} Layali Games. {t('allRightsReserved')}</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline italic text-[var(--sand-300)]">
              {t('footerTagline')}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Secure Connection Chip (§1, §18) */}
            <div
              className="flex items-center gap-1.5 text-[var(--sand-200)] hover:text-white cursor-help transition"
              title={t('secureConnectionTooltip')}
            >
              <Lock size={13} className="text-[var(--success)]" />
              <span>{t('secureConnection')}</span>
            </div>

            {/* Language Switch */}
            <button
              onClick={toggleLang}
              className="text-[var(--sand-200)] hover:text-white transition underline"
            >
              {lang === 'en' ? 'العربية' : 'English'}
            </button>

            {/* Reset Demo Link (§3, §18) */}
            <button
              onClick={handleResetDemo}
              className="text-[var(--rose-500)] hover:underline flex items-center gap-1 font-medium"
            >
              <RotateCcw size={11} />
              <span>{t('resetDemo')}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
