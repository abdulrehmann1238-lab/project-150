import React, { useRef, useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Play } from 'lucide-react'
import { GAMES, type Game } from '../../data/games'
import { GameCover } from '../game/GameCover'
import { useLang } from '../../i18n'

export const LivingShelf: React.FC = () => {
  const { lang } = useLang()
  const navigate = useNavigate()
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(true)

  // Pause when offscreen
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Two rows of 6 games each, duplicated for seamless CSS loop
  const row1Games = useMemo(() => GAMES.slice(0, 10), [])
  const row2Games = useMemo(() => GAMES.slice(10, 20), [])

  const renderTile = (game: Game, idx: number) => {
    const title = lang === 'ar' ? game.titleAr : game.titleEn
    return (
      <div
        key={`${game.id}-${idx}`}
        onClick={() => navigate(`/games/${game.slug}`)}
        className="group relative flex-shrink-0 w-[140px] sm:w-[180px] h-[190px] sm:h-[240px] rounded-xl overflow-hidden cursor-pointer border border-[var(--ink-700)] shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:border-[var(--saffron-500)]/80 hover:shadow-2xl"
      >
        <GameCover slug={game.slug} title={title} className="w-full h-full" />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />

        {/* Hover / Lift Play Glyph */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-10 h-10 rounded-full bg-[var(--saffron-500)] text-[var(--night-900)] flex items-center justify-center shadow-lg">
            <Play size={18} fill="currentColor" />
          </div>
        </div>

        {/* Title Tag at Bottom */}
        <div className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-[var(--night-900)] via-[var(--night-900)]/70 to-transparent">
          <span className="block text-[11px] sm:text-xs font-semibold text-[var(--sand-50)] truncate">
            {title}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[320px] sm:h-[460px] overflow-hidden select-none"
      style={{
        maskImage:
          'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
      }}
    >
      {/* Row 1: Left to right / right to left drifting */}
      <div
        className={`flex gap-4 sm:gap-6 py-2 will-change-transform ${
          isVisible ? 'animate-[marquee_45s_linear_infinite]' : ''
        } hover:[animation-play-state:paused]`}
      >
        {[...row1Games, ...row1Games].map((g, i) => renderTile(g, i))}
      </div>

      {/* Row 2: Opposite direction */}
      <div
        className={`flex gap-4 sm:gap-6 py-2 will-change-transform mt-3 ${
          isVisible ? 'animate-[marquee-reverse_55s_linear_infinite]' : ''
        } hover:[animation-play-state:paused]`}
      >
        {[...row2Games, ...row2Games].map((g, i) => renderTile(g, i))}
      </div>
    </div>
  )
}
