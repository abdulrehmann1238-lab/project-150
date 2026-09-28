import React, { useRef, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Game } from '../../data/games'
import { GameCard } from './GameCard'
import { useLang } from '../../i18n'

interface CarouselProps {
  games: Game[]
}

export const Carousel: React.FC<CarouselProps> = ({ games }) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const { dir } = useLang()
  const [canScrollStart, setCanScrollStart] = useState(false)
  const [canScrollEnd, setCanScrollEnd] = useState(true)

  const updateScrollButtons = () => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    const maxScroll = scrollWidth - clientWidth

    if (dir === 'rtl') {
      // In RTL, scrollLeft can be negative or positive depending on browser implementation
      const absScroll = Math.abs(scrollLeft)
      setCanScrollStart(absScroll > 10)
      setCanScrollEnd(absScroll < maxScroll - 10)
    } else {
      setCanScrollStart(scrollLeft > 10)
      setCanScrollEnd(scrollLeft < maxScroll - 10)
    }
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    updateScrollButtons()
    el.addEventListener('scroll', updateScrollButtons)
    window.addEventListener('resize', updateScrollButtons)
    return () => {
      el.removeEventListener('scroll', updateScrollButtons)
      window.removeEventListener('resize', updateScrollButtons)
    }
  }, [dir, games])

  const scrollBy = (offset: number) => {
    if (!scrollRef.current) return
    const directionMultiplier = dir === 'rtl' ? -1 : 1
    scrollRef.current.scrollBy({
      left: offset * directionMultiplier,
      behavior: 'smooth',
    })
  }

  return (
    <div className="relative group">
      {/* Controls */}
      <div className="hidden sm:flex items-center gap-2 absolute -top-14 end-0">
        <button
          onClick={() => scrollBy(-320)}
          disabled={!canScrollStart}
          aria-label="Previous games"
          className="p-2.5 rounded-full border border-[var(--sand-200)] bg-[var(--sand-50)] text-[var(--ink-900)] hover:bg-[var(--sand-100)] disabled:opacity-30 disabled:cursor-not-allowed shadow-sm transition"
        >
          <ChevronLeft size={18} className="icon-dir" />
        </button>
        <button
          onClick={() => scrollBy(320)}
          disabled={!canScrollEnd}
          aria-label="Next games"
          className="p-2.5 rounded-full border border-[var(--sand-200)] bg-[var(--sand-50)] text-[var(--ink-900)] hover:bg-[var(--sand-100)] disabled:opacity-30 disabled:cursor-not-allowed shadow-sm transition"
        >
          <ChevronRight size={18} className="icon-dir" />
        </button>
      </div>

      {/* Snap Track */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-none scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {games.map((game, idx) => (
          <div
            key={game.id}
            className="flex-shrink-0 w-[240px] sm:w-[280px] snap-start"
          >
            <GameCard game={game} index={idx} />
          </div>
        ))}
      </div>
    </div>
  )
}
