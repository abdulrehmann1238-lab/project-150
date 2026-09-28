import React, { useMemo } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Play, Lock, CheckCircle2, Star, Smartphone, Tablet, Monitor, ArrowLeft, ArrowRight } from 'lucide-react'
import { GAMES, type Game } from '../data/games'
import { GameCover } from '../components/game/GameCover'
import { GameCard } from '../components/game/GameCard'
import { useLang } from '../i18n'
import { useEntitlement } from '../contexts/EntitlementContext'
import { useUI } from '../contexts/UIContext'
import { formatPlays } from '../lib/format'

export const GameDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { lang, t } = useLang()
  const { isUnlocked, daysRemaining } = useEntitlement()
  const { openPaywall, openPlayer } = useUI()

  const game = useMemo(() => GAMES.find((g) => g.slug === slug), [slug])

  const isPremium = game?.tier === 'premium'
  const isAccessible = !isPremium || isUnlocked

  const moreGames = useMemo(() => {
    if (!game) return []
    return GAMES.filter((g) => g.id !== game.id && g.category === game.category).slice(0, 4)
  }, [game])

  if (!game) {
    return (
      <div className="py-20 layali-container text-center">
        <h2 className="text-2xl font-serif text-[var(--ink-900)] mb-3">Game Not Found</h2>
        <Link to="/games" className="text-xs font-semibold text-[var(--saffron-600)] underline">
          Back to Catalogue
        </Link>
      </div>
    )
  }

  const title = lang === 'ar' ? game.titleAr : game.titleEn
  const blurb = lang === 'ar' ? game.blurbAr : game.blurbEn
  const howToPlay = lang === 'ar' ? game.howToPlayAr : game.howToPlayEn

  const handlePrimaryAction = () => {
    if (isAccessible) {
      openPlayer(game)
    } else {
      openPaywall()
    }
  }

  return (
    <div className="py-8 sm:py-14 bg-[var(--sand-50)] min-h-screen">
      <div className="layali-container">
        {/* Back navigation */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs text-[var(--text-3)] hover:text-[var(--text-1)] mb-6 transition"
        >
          <ArrowLeft size={14} className="icon-dir" />
          <span>Back</span>
        </button>

        {/* 2-Column Hero Detail (§11.3) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
          {/* Media (Left 6 cols) */}
          <div className="lg:col-span-6 relative aspect-[4/3] rounded-3xl overflow-hidden border border-[var(--sand-300)] shadow-lg bg-[var(--night-900)] group">
            <div className={!isAccessible ? 'opacity-70' : ''}>
              <GameCover slug={game.slug} title={title} />
            </div>

            {/* Locked Badge Overlay */}
            {!isAccessible && (
              <div className="absolute top-4 end-4 px-3 py-1 rounded-full bg-[var(--saffron-500)] text-[var(--night-900)] font-bold text-xs flex items-center gap-1.5 shadow-md">
                <Lock size={14} />
                <span>PREMIUM ONLY</span>
              </div>
            )}

            {/* Play Overlay Button */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
              <button
                onClick={handlePrimaryAction}
                className={`p-5 rounded-full shadow-2xl transition-transform hover:scale-110 active:scale-95 flex items-center justify-center ${
                  isAccessible
                    ? 'bg-[var(--sand-50)] text-[var(--ink-900)]'
                    : 'bg-[var(--saffron-500)] text-[var(--night-900)]'
                }`}
              >
                {isAccessible ? <Play size={28} fill="currentColor" /> : <Lock size={26} />}
              </button>
            </div>
          </div>

          {/* Details (Right 6 cols) */}
          <div className="lg:col-span-6 flex flex-col gap-5">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="px-3 py-1 rounded-lg bg-[var(--sand-200)] text-xs font-semibold text-[var(--ink-900)]">
                  {game.category}
                </span>
                <div className="flex items-center gap-1 text-xs font-semibold text-[var(--saffron-600)]">
                  <Star size={14} fill="currentColor" />
                  <span className="font-mono text-sm">{game.rating.toFixed(1)}</span>
                  <span className="text-[var(--text-3)] font-normal ms-1">
                    ({formatPlays(game.plays, lang)} {t('playsCount')})
                  </span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[var(--ink-900)] mb-3 leading-tight">
                {title}
              </h1>

              {/* Blurb */}
              <p className="text-sm sm:text-base text-[var(--text-2)] leading-relaxed">
                {blurb}
              </p>
            </div>

            {/* How to Play Bullets */}
            <div className="p-4 rounded-2xl bg-[var(--sand-100)] border border-[var(--sand-200)] flex flex-col gap-2.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-1)]">
                {t('howToPlay')}
              </h3>
              <ul className="flex flex-col gap-1.5 text-xs text-[var(--text-2)]">
                {howToPlay.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--saffron-500)] mt-1.5 flex-shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Device Support Chips */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-[var(--text-3)] me-2 font-medium">
                {t('supportedDevices')}:
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[var(--sand-200)] text-[11px] font-semibold text-[var(--text-2)]">
                <Smartphone size={12} />
                <span>{t('devicePhone')}</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[var(--sand-200)] text-[11px] font-semibold text-[var(--text-2)]">
                <Tablet size={12} />
                <span>{t('deviceTablet')}</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[var(--sand-200)] text-[11px] font-semibold text-[var(--text-2)]">
                <Monitor size={12} />
                <span>{t('deviceDesktop')}</span>
              </span>
            </div>

            {/* Desktop Action CTA */}
            <div className="pt-2">
              {isAccessible ? (
                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePrimaryAction}
                    className="px-8 py-3.5 rounded-xl bg-[var(--ink-900)] text-white font-semibold text-sm hover:bg-[var(--ink-700)] shadow-md transition flex items-center gap-2"
                  >
                    <Play size={16} fill="currentColor" />
                    <span>{t('playNow')}</span>
                  </button>
                  {isPremium && (
                    <span className="text-xs text-[var(--success)] font-semibold flex items-center gap-1">
                      <CheckCircle2 size={14} />
                      <span>{t('unlockedActiveBadge', { days: daysRemaining })}</span>
                    </span>
                  )}
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <button
                    onClick={handlePrimaryAction}
                    className="px-8 py-3.5 rounded-xl bg-[var(--saffron-500)] text-[var(--night-900)] font-bold text-sm hover:bg-[var(--saffron-600)] shadow-md transition flex items-center justify-center sm:justify-start gap-2"
                  >
                    <Lock size={16} />
                    <span>{t('unlockWithPremium')}</span>
                  </button>
                  <p className="text-xs text-[var(--text-3)]">
                    {t('lockedPreviewNotice')} Instant access with Razer Gold (RG 10 / 30 days).
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* "More like this" row */}
        {moreGames.length > 0 && (
          <div className="pt-10 border-t border-[var(--sand-200)]">
            <h2 className="text-xl font-serif font-bold text-[var(--ink-900)] mb-6">
              {t('moreLikeThis')}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {moreGames.map((mg) => (
                <GameCard key={mg.id} game={mg} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Sticky CTA Bar (§11.3) */}
      <div className="lg:hidden fixed bottom-14 inset-x-0 z-40 p-3 bg-[var(--sand-50)] border-t border-[var(--sand-200)] shadow-lg">
        <button
          onClick={handlePrimaryAction}
          className={`w-full py-3 px-4 rounded-xl font-semibold text-sm shadow-md transition flex items-center justify-center gap-2 ${
            isAccessible
              ? 'bg-[var(--ink-900)] text-white hover:bg-[var(--ink-700)]'
              : 'bg-[var(--saffron-500)] text-[var(--night-900)] hover:bg-[var(--saffron-600)]'
          }`}
        >
          {isAccessible ? (
            <>
              <Play size={16} fill="currentColor" />
              <span>{t('playNow')}</span>
            </>
          ) : (
            <>
              <Lock size={15} />
              <span>{t('unlockWithPremium')}</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}
