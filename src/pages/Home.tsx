import React, { useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Play, Sparkles, ChevronDown, ArrowRight, ShieldCheck, Smartphone, Globe2, CreditCard } from 'lucide-react'
import { useLang } from '../i18n'
import { useUI } from '../contexts/UIContext'
import { useEntitlement } from '../contexts/EntitlementContext'
import { GAMES, type Game } from '../data/games'
import { LivingShelf } from '../components/marketing/LivingShelf'
import { Carousel } from '../components/game/Carousel'
import { StorySection } from '../components/marketing/StorySection'
import { RtlShowcase } from '../components/marketing/RtlShowcase'
import { Counters } from '../components/marketing/Counters'
import { ClosingCta } from '../components/marketing/ClosingCta'
import { GameCard } from '../components/game/GameCard'

export const Home: React.FC = () => {
  const { lang, t } = useLang()
  const navigate = useNavigate()
  const { openPaywall } = useUI()
  const { isUnlocked } = useEntitlement()

  const freeGames = useMemo(() => GAMES.filter((g) => g.tier === 'free').slice(0, 8), [])
  const premiumPreviewGames = useMemo(() => GAMES.filter((g) => g.tier === 'premium').slice(0, 4), [])

  const categories = [
    { name: t('categoryPuzzle'), filter: 'Puzzle', count: '6 games' },
    { name: t('categoryArcade'), filter: 'Arcade', count: '5 games' },
    { name: t('categoryCards'), filter: 'Cards', count: '4 games' },
    { name: t('categoryRacing'), filter: 'Racing', count: '3 games' },
    { name: t('categoryWord'), filter: 'Word', count: '3 games' },
    { name: t('categoryFamily'), filter: 'Family', count: '3 games' },
  ]

  return (
    <div className="flex flex-col">
      {/* --- HERO (100svh, min 640px) §8 --- */}
      <section className="relative min-h-[90vh] lg:min-h-screen bg-[var(--night-900)] text-[var(--sand-50)] flex flex-col justify-between overflow-hidden pt-6 pb-8">
        {/* Soft Radial Warm Light (The ONLY gradient allowed §4, §8) */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full opacity-10 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, var(--saffron-500) 0%, transparent 65%)',
          }}
        />

        {/* Hero Top & Copy */}
        <div className="layali-container relative z-10 flex flex-col items-center text-center mt-6 sm:mt-10 max-w-4xl mx-auto">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--ink-800)] border border-[var(--ink-700)] text-xs text-[var(--saffron-500)] font-medium mb-5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--saffron-500)]" />
            <span>{t('heroEyebrow')}</span>
          </div>

          {/* H1 */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-medium tracking-tight text-[var(--sand-50)] mb-5 leading-[1.08]">
            {t('heroTitle')}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[var(--sand-200)] max-w-2xl leading-relaxed mb-8">
            {t('heroSubtitle')}
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
            <Link
              to="/games?tab=free"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[var(--sand-50)] text-[var(--ink-900)] font-semibold text-sm hover:bg-white shadow-xl transition flex items-center justify-center gap-2.5 active:scale-95"
            >
              <Play size={18} fill="currentColor" />
              <span>{t('heroCtaPlayFree')}</span>
            </Link>

            <button
              onClick={() => openPaywall()}
              className="w-full sm:w-auto px-8 py-4 rounded-xl border border-[var(--saffron-500)] text-[var(--saffron-500)] hover:bg-[var(--saffron-100)] hover:text-[var(--night-900)] font-semibold text-sm transition flex items-center justify-center gap-2"
            >
              <Sparkles size={18} />
              <span>{t('heroCtaSeePremium')}</span>
            </button>
          </div>
        </div>

        {/* Living Shelf Drifting Tiles (Center Visual) */}
        <div className="relative z-10 w-full my-6">
          <LivingShelf />
        </div>

        {/* Hero Trust Strip & Scroll Cue (Bottom) */}
        <div className="layali-container relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[rgba(255,255,255,0.06)] text-xs text-[var(--sand-300)]">
          <div className="flex items-center gap-2 text-center sm:text-start">
            <ShieldCheck size={15} className="text-[var(--saffron-500)] flex-shrink-0" />
            <span>{t('heroTrustStrip')}</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 opacity-60">
            <span>{t('heroScrollCue')}</span>
            <ChevronDown size={14} className="animate-bounce" />
          </div>
        </div>
      </section>

      {/* --- SECTION 2: "Play something now" (Free snap carousel) §8 --- */}
      <section className="py-16 sm:py-24 bg-[var(--sand-50)] overflow-hidden">
        <div className="layali-container">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-xs uppercase font-semibold tracking-wider text-[var(--saffron-600)] block mb-1">
                Instant Access
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif text-[var(--ink-900)]">
                {t('sectionFreeTitle')}
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-2)] mt-1">
                {t('sectionFreeSubtitle')}
              </p>
            </div>

            <Link
              to="/games?tab=free"
              className="hidden sm:flex items-center gap-1 text-xs font-semibold text-[var(--ink-900)] hover:text-[var(--saffron-600)] transition"
            >
              <span>{t('viewAllFree')}</span>
              <ArrowRight size={14} className="icon-dir" />
            </Link>
          </div>

          {/* Carousel */}
          <Carousel games={freeGames} />

          <div className="sm:hidden text-center mt-6">
            <Link
              to="/games?tab=free"
              className="text-xs font-semibold text-[var(--ink-900)] underline"
            >
              {t('viewAllFree')} →
            </Link>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: "Free and Premium, explained" §8 --- */}
      <StorySection />

      {/* --- SECTION 4: "Built for both languages" (RTL Showcase) §8 --- */}
      <RtlShowcase />

      {/* --- SECTION 5: Premium Preview §8 --- */}
      <section className="py-16 sm:py-24 bg-[var(--sand-100)] border-b border-[var(--sand-200)]">
        <div className="layali-container">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs uppercase font-semibold tracking-wider text-[var(--saffron-600)] block mb-1">
                Exclusive Content
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif text-[var(--ink-900)]">
                {t('premiumPreviewTitle')}
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-2)] mt-1">
                {t('premiumPreviewSubtitle')}
              </p>
            </div>

            <button
              onClick={() => openPaywall()}
              className="self-start sm:self-auto px-5 py-2.5 rounded-xl bg-[var(--saffron-500)] text-[var(--night-900)] font-semibold text-xs hover:bg-[var(--saffron-600)] shadow-sm transition flex items-center gap-1.5"
            >
              <Sparkles size={14} />
              <span>{t('unlockPremiumPrice')}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {premiumPreviewGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 6: Categories §8 --- */}
      <section className="py-16 bg-[var(--sand-50)]">
        <div className="layali-container">
          <h2 className="text-xl sm:text-2xl font-serif text-[var(--ink-900)] mb-6 text-center sm:text-start">
            {t('categoriesTitle')}
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {categories.map((cat) => (
              <div
                key={cat.filter}
                onClick={() => navigate(`/games?category=${cat.filter}`)}
                className="p-4 rounded-2xl bg-[var(--sand-100)] border border-[var(--sand-200)] hover:border-[var(--sand-300)] hover:shadow-sm cursor-pointer transition text-center flex flex-col items-center justify-center gap-1"
              >
                <span className="text-sm font-semibold text-[var(--ink-900)]">
                  {cat.name}
                </span>
                <span className="text-[11px] text-[var(--text-3)] font-mono">
                  {cat.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 7: Numbers / Counters §8 --- */}
      <Counters />

      {/* --- SECTION 8: Closing CTA §8 --- */}
      <ClosingCta />
    </div>
  )
}
