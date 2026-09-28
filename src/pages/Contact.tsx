import React, { useState } from 'react'
import { Send, CheckCircle2, MessageSquare, Mail, MapPin } from 'lucide-react'
import { useLang } from '../i18n'
import { useUI } from '../contexts/UIContext'
import { submitContactApi } from '../mock/api'

export const Contact: React.FC = () => {
  const { t } = useLang()
  const { addToast } = useUI()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'general',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
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

  return (
    <div className="py-12 sm:py-20 bg-[var(--sand-50)] min-h-screen">
      <div className="layali-container max-w-4xl">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--sand-200)] text-xs font-semibold text-[var(--ink-700)] mb-3">
            <Mail size={14} />
            <span>Support & Inquiries</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[var(--ink-900)] mb-3">
            {t('contactTitle')}
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-2)] leading-relaxed">
            {t('contactSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Contact Details (5 cols) */}
          <div className="md:col-span-5 p-6 rounded-3xl bg-[var(--sand-100)] border border-[var(--sand-200)] flex flex-col gap-6">
            <div>
              <h3 className="text-base font-bold text-[var(--ink-900)] mb-2">
                Layali Games Operations
              </h3>
              <p className="text-xs text-[var(--text-2)] leading-relaxed">
                Casual HTML5 games platform targeting Gulf markets (KSA, UAE, Kuwait, Qatar, Bahrain, Oman).
              </p>
            </div>

            <div className="flex flex-col gap-3 text-xs text-[var(--text-2)]">
              <div className="flex items-center gap-2.5">
                <Mail size={16} className="text-[var(--ink-500)] flex-shrink-0" />
                <span>support@layaligames.example</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin size={16} className="text-[var(--ink-500)] flex-shrink-0" />
                <span>Riyadh & Dubai Digital Hubs</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--sand-200)] text-xs text-[var(--text-3)] leading-relaxed">
              Response SLA: within one business day for general queries, immediate webhook validation for Razer Gold transactions.
            </div>
          </div>

          {/* Form (7 cols) */}
          <div className="md:col-span-7 p-6 sm:p-8 rounded-3xl bg-[var(--sand-50)] border border-[var(--sand-300)] shadow-sm">
            {isSubmitted ? (
              <div className="text-center py-10 flex flex-col items-center gap-3 animate-in fade-in duration-200">
                <div className="w-14 h-14 rounded-full bg-[var(--success)]/10 text-[var(--success)] flex items-center justify-center">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-xl font-serif font-bold text-[var(--ink-900)]">
                  {t('contactSuccessTitle')}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-2)] max-w-sm leading-relaxed">
                  {t('contactSuccessDesc')}
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 px-5 py-2 rounded-xl bg-[var(--ink-900)] text-white text-xs font-semibold hover:bg-[var(--ink-700)] transition"
                >
                  {t('sendAnother')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-1)] mb-1">
                    {t('contactName')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--sand-100)] border border-[var(--sand-300)] text-sm text-[var(--text-1)] outline-none focus:border-[var(--ink-500)] focus:ring-1 focus:ring-[var(--ink-500)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--text-1)] mb-1">
                    {t('contactEmail')} *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--sand-100)] border border-[var(--sand-300)] text-sm text-[var(--text-1)] outline-none focus:border-[var(--ink-500)] focus:ring-1 focus:ring-[var(--ink-500)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--text-1)] mb-1">
                    {t('contactTopic')}
                  </label>
                  <select
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--sand-100)] border border-[var(--sand-300)] text-sm text-[var(--text-1)] outline-none focus:border-[var(--ink-500)] cursor-pointer"
                  >
                    <option value="general">{t('contactTopicGeneral')}</option>
                    <option value="payment">{t('contactTopicPayment')}</option>
                    <option value="partnership">{t('contactTopicPartnership')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--text-1)] mb-1">
                    {t('contactMessage')} *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--sand-100)] border border-[var(--sand-300)] text-sm text-[var(--text-1)] outline-none focus:border-[var(--ink-500)] focus:ring-1 focus:ring-[var(--ink-500)] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 py-3.5 px-6 rounded-xl bg-[var(--ink-900)] text-[var(--sand-50)] font-semibold text-sm hover:bg-[var(--ink-700)] transition flex items-center justify-center gap-2 shadow-md"
                >
                  <Send size={15} className="icon-dir" />
                  <span>{isSubmitting ? 'Sending...' : t('contactSubmit')}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
