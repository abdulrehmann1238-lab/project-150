import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, Gamepad2, Sparkles, Bookmark } from 'lucide-react'
import { useLang } from '../../i18n'
import { useEntitlement } from '../../contexts/EntitlementContext'

export const BottomNav: React.FC = () => {
  const { t } = useLang()
  const location = useLocation()
  const { isUnlocked } = useEntitlement()

  const tabs = [
    {
      path: '/',
      label: 'Home',
      icon: Home,
      exact: true,
    },
    {
      path: '/games',
      label: t('navGames'),
      icon: Gamepad2,
      exact: false,
    },
    {
      path: '/premium',
      label: t('navPremium'),
      icon: Sparkles,
      exact: false,
      highlight: true,
    },
    {
      path: '/library',
      label: t('navLibrary'),
      icon: Bookmark,
      exact: false,
    },
  ]

  const isActive = (path: string, exact: boolean) => {
    if (exact) return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-[100] bg-[var(--sand-50)] border-t border-[var(--sand-300)] shadow-lg pb-[env(safe-area-inset-bottom)]">
      <div className="h-14 grid grid-cols-4 items-center">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const active = isActive(tab.path, tab.exact)
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={`flex flex-col items-center justify-center h-full gap-0.5 text-[11px] font-semibold transition-colors ${
                active
                  ? tab.highlight
                    ? 'text-[var(--saffron-600)]'
                    : 'text-[var(--ink-900)]'
                  : 'text-[var(--text-3)] hover:text-[var(--text-1)]'
              }`}
            >
              <Icon
                size={20}
                className={active ? 'scale-110 transition-transform' : ''}
                fill={active ? 'currentColor' : 'none'}
              />
              <span className="truncate">{tab.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
