import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Sparkles, Terminal, ChevronDown, Menu, X, ShieldCheck } from 'lucide-react'
import { useLang } from '../../i18n'
import { useUI } from '../../contexts/UIContext'
import { useEntitlement } from '../../contexts/EntitlementContext'

export const Header: React.FC = () => {
  const { lang, toggleLang, t } = useLang()
  const location = useLocation()
  const { openPaywall, toggleDevInspector } = useUI()
  const { isUnlocked } = useEntitlement()

  const [isScrolled, setIsScrolled] = useState(false)
  const [projectMenuOpen, setProjectMenuOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menus on route change
  useEffect(() => {
    setProjectMenuOpen(false)
    setMobileMenuOpen(false)
  }, [location.pathname])

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true
    if (path !== '/' && location.pathname.startsWith(path)) return true
    return false
  }

  return (
    <header
      className={`sticky top-0 z-[100] transition-colors duration-200 ${
        isScrolled
          ? 'bg-[var(--sand-50)]/95 border-b border-[var(--sand-200)] shadow-sm backdrop-blur-none'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="layali-container h-16 sm:h-[72px] flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 text-[var(--ink-900)] group flex-shrink-0"
        >
          {/* Crescent & Dot SVG Symbol */}
          <div className="w-8 h-8 rounded-full bg-[var(--ink-900)] flex items-center justify-center text-[var(--saffron-500)] shadow-sm group-hover:scale-105 transition-transform">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 6C10.5 7.5 9 11.5 10.5 15C12 18.5 16 20 19 18.5C14 21 8 19 6.5 14C5 9 8 4 14 6Z"
                fill="currentColor"
              />
              <circle cx="17.5" cy="8.5" r="1.5" fill="#FAF7F2" />
            </svg>
          </div>

          <div className="flex flex-col">
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight leading-none text-[var(--ink-900)]">
              {lang === 'ar' ? 'ليالي' : 'Layali'}
            </span>
            <span className="text-[10px] uppercase font-sans tracking-widest text-[var(--ink-500)] font-semibold">
              {lang === 'ar' ? 'للألعاب' : 'Games'}
            </span>
          </div>
        </Link>

        {/* Primary Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 text-sm font-medium text-[var(--text-2)]">
          <Link
            to="/games"
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              isActive('/games') && !location.search.includes('free') && !location.search.includes('premium')
                ? 'text-[var(--ink-900)] font-semibold bg-[var(--sand-200)]/60'
                : 'hover:text-[var(--ink-900)]'
            }`}
          >
            {t('navGames')}
          </Link>
          <Link
            to="/games?tab=free"
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              location.search.includes('free')
                ? 'text-[var(--ink-900)] font-semibold bg-[var(--sand-200)]/60'
                : 'hover:text-[var(--ink-900)]'
            }`}
          >
            {t('navFree')}
          </Link>
          <Link
            to="/premium"
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              isActive('/premium')
                ? 'text-[var(--saffron-600)] font-semibold bg-[var(--saffron-100)]'
                : 'hover:text-[var(--ink-900)]'
            }`}
          >
            {t('navPremium')}
          </Link>
          <Link
            to="/library"
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              isActive('/library')
                ? 'text-[var(--ink-900)] font-semibold bg-[var(--sand-200)]/60'
                : 'hover:text-[var(--ink-900)]'
            }`}
          >
            {t('navLibrary')}
          </Link>
        </nav>

        {/* Action Controls & Utilities */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switch Pill */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--sand-300)] bg-[var(--sand-100)] text-xs font-semibold text-[var(--ink-900)] hover:bg-[var(--sand-200)] transition shadow-sm"
            aria-label="Switch language between English and Arabic"
          >
            <span className={lang === 'en' ? 'text-[var(--ink-900)] font-bold' : 'text-[var(--text-3)]'}>
              EN
            </span>
            <span className="text-[var(--sand-300)]">|</span>
            <span className={lang === 'ar' ? 'text-[var(--ink-900)] font-bold font-sans' : 'text-[var(--text-3)]'}>
              عربي
            </span>
          </button>

          {/* "For the Project Team" Dropdown (Recommended Enhancement §5) */}
          <div className="relative hidden lg:block">
            <button
              onClick={() => setProjectMenuOpen(!projectMenuOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-[var(--text-2)] hover:text-[var(--ink-900)] hover:bg-[var(--sand-200)]/60 transition"
            >
              <Terminal size={14} className="text-[var(--ink-500)]" />
              <span>{t('navForTeam')}</span>
              <ChevronDown size={13} className="text-[var(--text-3)]" />
            </button>

            {projectMenuOpen && (
              <div className="absolute end-0 mt-2 w-56 bg-[var(--sand-50)] text-[var(--text-1)] rounded-xl border border-[var(--sand-300)] shadow-xl p-1.5 flex flex-col gap-0.5 z-[200] animate-in fade-in zoom-in-95 duration-150">
                <Link
                  to="/project"
                  onClick={() => setProjectMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-xs font-medium hover:bg-[var(--sand-100)] transition flex items-center justify-between"
                >
                  <span>{t('navProject')}</span>
                  <span className="text-[10px] text-[var(--text-3)] font-mono">WP Map</span>
                </Link>
                <Link
                  to="/test-report"
                  onClick={() => setProjectMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-xs font-medium hover:bg-[var(--sand-100)] transition flex items-center justify-between"
                >
                  <span>{t('navTestReport')}</span>
                  <span className="text-[10px] text-[var(--success)] font-mono font-bold">48 Cases</span>
                </Link>
                <button
                  onClick={() => {
                    setProjectMenuOpen(false)
                    toggleDevInspector()
                  }}
                  className="px-3 py-2 rounded-lg text-xs font-medium hover:bg-[var(--sand-100)] transition flex items-center justify-between text-start"
                >
                  <span>Dev Inspector</span>
                  <span className="text-[10px] text-[var(--saffron-600)] font-mono">Panel</span>
                </button>
              </div>
            )}
          </div>

          {/* Go Premium Accent CTA */}
          <button
            onClick={() => openPaywall()}
            className={`hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border transition ${
              isUnlocked
                ? 'border-[var(--success)] bg-[var(--success)]/10 text-[var(--success)]'
                : 'border-[var(--saffron-500)] text-[var(--saffron-600)] hover:bg-[var(--saffron-100)]'
            }`}
          >
            <Sparkles size={14} />
            <span>{isUnlocked ? 'Premium Active' : t('goPremium')}</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-[var(--text-2)] hover:bg-[var(--sand-200)] transition"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu Sheet */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[var(--sand-50)] border-b border-[var(--sand-300)] p-4 flex flex-col gap-2 shadow-lg animate-in slide-in-from-top-3 duration-200">
          <Link
            to="/games"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2.5 rounded-xl text-sm font-semibold text-[var(--text-1)] hover:bg-[var(--sand-100)]"
          >
            {t('navGames')}
          </Link>
          <Link
            to="/games?tab=free"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2.5 rounded-xl text-sm font-semibold text-[var(--text-1)] hover:bg-[var(--sand-100)]"
          >
            {t('navFree')}
          </Link>
          <Link
            to="/premium"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2.5 rounded-xl text-sm font-semibold text-[var(--saffron-600)] hover:bg-[var(--saffron-100)]"
          >
            {t('navPremium')}
          </Link>
          <Link
            to="/library"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2.5 rounded-xl text-sm font-semibold text-[var(--text-1)] hover:bg-[var(--sand-100)]"
          >
            {t('navLibrary')}
          </Link>

          <div className="pt-2 mt-2 border-t border-[var(--sand-200)] flex flex-col gap-1">
            <span className="text-[11px] font-semibold text-[var(--text-3)] px-3">
              {t('navForTeam')}
            </span>
            <Link
              to="/project"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl text-xs text-[var(--text-2)] hover:bg-[var(--sand-100)]"
            >
              {t('navProject')} (WordPress Architecture)
            </Link>
            <Link
              to="/test-report"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl text-xs text-[var(--text-2)] hover:bg-[var(--sand-100)]"
            >
              {t('navTestReport')} (48 Cases)
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false)
                toggleDevInspector()
              }}
              className="px-3 py-2 rounded-xl text-xs text-[var(--saffron-600)] hover:bg-[var(--saffron-100)] text-start font-medium"
            >
              Dev Inspector Panel
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
