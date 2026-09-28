import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Play, Lock, Check } from 'lucide-react'
import type { Game } from '../../data/games'
import { GameCover } from './GameCover'
import { useLang } from '../../i18n'
import { useEntitlement } from '../../contexts/EntitlementContext'
import { useUI } from '../../contexts/UIContext'
import { formatPlays } from '../../lib/format'

interface GameCardProps {
  game: Game
  index?: number
  compact?: boolean
}

export const GameCard: React.FC<GameCardProps> = ({ game, compact = false }) => {
  const { lang, t } = useLang()
  const navigate = useNavigate()
  const { isUnlocked } = useEntitlement()
  const { openPaywall, openPlayer } = useUI()

  const isPremium = game.tier === 'premium'
  const isAccessible = !isPremium || isUnlocked
  const title = lang === 'ar' ? game.titleAr : game.titleEn
  const blurb = lang === 'ar' ? game.blurbAr : game.blurbEn

  const handleAction = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isAccessible) {
      openPlayer(game)
    } else {
      openPaywall()
    }
  }

  return (
    <div
      onClick={() => navigate(`/games/${game.slug}`)}
      className={`group relative flex flex-col bg-[var(--sand-100)] rounded-xl border border-[var(--sand-200)] overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-[var(--sand-300)] hover:shadow-md ${
        isPremium && !isUnlocked
          ? 'border-[var(--saffron-500)]/40 hover:border-[var(--saffron-500)]/80'
          : ''
      }`}
    >
      {/* Cover Media Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--night-900)]">
        <div className="w-full h-full transform transition-transform duration-300 group-hover:scale-105">
          <GameCover slug={game.slug} title={title} />
        </div>

        {/* Locked Overlay or Subtle Tint */}
        {isPremium && !isUnlocked && (
          <div className="absolute inset-0 bg-[var(--night-900)]/30 backdrop-none pointer-events-none" />
        )}

        {/* Badges Overlay */}
        <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between pointer-events-none">
          <div>
            {game.isNew && (
              <span className="inline-block px-2 py-0.5 text-[11px] font-semibold tracking-wider rounded-md bg-[var(--rose-500)] text-white shadow-sm">
                NEW
              </span>
            )}
          </div>

          <div>
            {isPremium && (
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-semibold rounded-full border shadow-sm transition-all duration-300 ${
                  isUnlocked
                    ? 'bg-[var(--success)] text-white border-[var(--success)]'
                    : 'bg-[var(--saffron-500)] text-[var(--night-900)] border-[var(--saffron-600)]'
                }`}
              >
                {isUnlocked ? (
                  <>
                    <Check size={12} strokeWidth={2.5} />
                    <span>PREMIUM</span>
                  </>
                ) : (
                  <>
                    <Lock size={12} strokeWidth={2.5} />
                    <span>PREMIUM</span>
                  </>
                )}
              </span>
            )}
          </div>
        </div>

        {/* Hover / Direct Play Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-[var(--night-900)]/40">
          <button
            onClick={handleAction}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold shadow-lg transform transition-transform active:scale-95 ${
              isAccessible
                ? 'bg-[var(--sand-50)] text-[var(--ink-900)] hover:bg-white'
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

      {/* Info Block */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-baseline justify-between gap-2 mb-1">
            <h3 className="text-base font-semibold text-[var(--text-1)] group-hover:text-[var(--ink-700)] transition truncate">
              {title}
            </h3>
            <span className="text-xs font-mono text-[var(--text-3)] flex-shrink-0">
              ★ {game.rating.toFixed(1)}
            </span>
          </div>

          {!compact && (
            <p className="text-xs text-[var(--text-2)] line-clamp-2 leading-relaxed mb-3">
              {blurb}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-[var(--sand-200)] text-xs text-[var(--text-3)]">
          <span className="px-2 py-0.5 rounded bg-[var(--sand-200)]/70 text-[var(--text-2)]">
            {game.category}
          </span>
          <span className="font-mono">
            {formatPlays(game.plays, lang)} {t('playsCount')}
          </span>
        </div>
      </div>
    </div>
  )
}
