import React from 'react'
import { Gamepad2, Languages, Zap, Smartphone } from 'lucide-react'
import { useLang } from '../../i18n'

export const Counters: React.FC = () => {
  const { t } = useLang()

  const stats = [
    {
      icon: Gamepad2,
      metric: t('counterGames'),
      sub: t('counterGamesSub'),
    },
    {
      icon: Languages,
      metric: t('counterLanguages'),
      sub: t('counterLanguagesSub'),
    },
    {
      icon: Zap,
      metric: t('counterSpeed'),
      sub: t('counterSpeedSub'),
    },
    {
      icon: Smartphone,
      metric: t('counterDevices'),
      sub: t('counterDevicesSub'),
    },
  ]

  return (
    <section className="py-14 sm:py-16 bg-[var(--sand-100)] border-y border-[var(--sand-200)]">
      <div className="layali-container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-5 rounded-2xl bg-[var(--sand-50)] border border-[var(--sand-200)] shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-[var(--sand-200)] text-[var(--ink-700)] flex items-center justify-center mb-3">
                  <Icon size={20} />
                </div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-[var(--ink-900)] mb-1">
                  {item.metric}
                </div>
                <p className="text-xs text-[var(--text-3)] max-w-[180px]">
                  {item.sub}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
