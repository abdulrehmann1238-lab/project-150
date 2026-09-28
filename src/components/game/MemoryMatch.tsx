import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { RotateCcw, Volume2, VolumeX, Maximize2, Minimize2, X, Trophy } from 'lucide-react'
import { useLang } from '../../i18n'

interface MemoryCard {
  id: number
  pairId: number
  symbol: string
  labelEn: string
  labelAr: string
  isFlipped: boolean
  isMatched: boolean
}

const SYMBOLS = [
  { symbol: '✦', labelEn: 'Star', labelAr: 'نجمة' },
  { symbol: '◈', labelEn: 'Diamond', labelAr: 'جوهرة' },
  { symbol: '☾', labelEn: 'Crescent', labelAr: 'هلال' },
  { symbol: '❖', labelEn: 'Mosaic', labelAr: 'فسيفساء' },
  { symbol: '▲', labelEn: 'Dune', labelAr: 'كثيب' },
  { symbol: '◉', labelEn: 'Pearl', labelAr: 'لؤلؤة' },
  { symbol: '✿', labelEn: 'Oasis Palm', labelAr: 'زهرة الواحة' },
  { symbol: '⬟', labelEn: 'Lantern', labelAr: 'فانوس' },
]

export const MemoryMatch: React.FC<{
  title: string
  onClose: () => void
}> = ({ title, onClose }) => {
  const { lang, t } = useLang()
  const [cards, setCards] = useState<MemoryCard[]>([])
  const [flippedIds, setFlippedIds] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [matches, setMatches] = useState(0)
  const [timerSeconds, setTimerSeconds] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Initialize cards
  const initGame = useCallback(() => {
    const deck: MemoryCard[] = []
    let idCounter = 1

    SYMBOLS.forEach((sym, pairIdx) => {
      // 2 cards per symbol
      deck.push({
        id: idCounter++,
        pairId: pairIdx,
        symbol: sym.symbol,
        labelEn: sym.labelEn,
        labelAr: sym.labelAr,
        isFlipped: false,
        isMatched: false,
      })
      deck.push({
        id: idCounter++,
        pairId: pairIdx,
        symbol: sym.symbol,
        labelEn: sym.labelEn,
        labelAr: sym.labelAr,
        isFlipped: false,
        isMatched: false,
      })
    })

    // Shuffle deck
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[deck[i], deck[j]] = [deck[j], deck[i]]
    }

    setCards(deck)
    setFlippedIds([])
    setMoves(0)
    setMatches(0)
    setTimerSeconds(0)
    setIsPlaying(true)
    setIsCompleted(false)
  }, [])

  useEffect(() => {
    initGame()
  }, [initGame])

  // Timer
  useEffect(() => {
    if (!isPlaying || isCompleted) return
    const interval = setInterval(() => {
      setTimerSeconds((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [isPlaying, isCompleted])

  // Play subtle synth audio tone using Web Audio API
  const playTone = useCallback(
    (freq: number, type: OscillatorType = 'sine', duration = 0.15) => {
      if (!soundEnabled) return
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        if (!AudioCtx) return
        const ctx = new AudioCtx()
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = type
        osc.frequency.setValueAtTime(freq, ctx.currentTime)
        gain.gain.setValueAtTime(0.08, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start()
        osc.stop(ctx.currentTime + duration)
      } catch {
        // Audio unavailable
      }
    },
    [soundEnabled]
  )

  // Handle card click
  const handleCardClick = (card: MemoryCard) => {
    if (flippedIds.length === 2 || card.isFlipped || card.isMatched) return

    playTone(340, 'sine', 0.08)

    const nextFlipped = [...flippedIds, card.id]
    setFlippedIds(nextFlipped)

    setCards((prev) =>
      prev.map((c) => (c.id === card.id ? { ...c, isFlipped: true } : c))
    )

    if (nextFlipped.length === 2) {
      setMoves((m) => m + 1)
      const firstCard = cards.find((c) => c.id === nextFlipped[0])!
      const secondCard = card

      if (firstCard.pairId === secondCard.pairId) {
        // Match!
        setTimeout(() => {
          playTone(580, 'triangle', 0.25)
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstCard.id || c.id === secondCard.id
                ? { ...c, isMatched: true }
                : c
            )
          )
          setFlippedIds([])
          setMatches((prev) => {
            const nextMatches = prev + 1
            if (nextMatches === 8) {
              setIsCompleted(true)
              playTone(720, 'triangle', 0.4)
            }
            return nextMatches
          })
        }, 320)
      } else {
        // No match: flip back
        setTimeout(() => {
          playTone(220, 'sine', 0.12)
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstCard.id || c.id === secondCard.id
                ? { ...c, isFlipped: false }
                : c
            )
          )
          setFlippedIds([])
        }, 850)
      }
    }
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {})
      setIsFullscreen(true)
    } else {
      document.exitFullscreen().catch(() => {})
      setIsFullscreen(false)
    }
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto bg-[var(--night-900)] text-[var(--sand-50)] rounded-2xl overflow-hidden shadow-2xl border border-[var(--ink-700)] flex flex-col">
      {/* Top Chrome Header */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-[var(--night-800)] border-b border-[var(--ink-700)]">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--saffron-500)] animate-pulse" />
          <h3 className="text-base sm:text-lg font-medium text-[var(--sand-50)] tracking-tight">
            {title}
          </h3>
          <span className="hidden sm:inline-block text-xs px-2.5 py-0.5 rounded-full bg-[var(--ink-900)] text-[var(--saffron-500)] border border-[var(--ink-700)]">
            HTML5 Canvas / DOM
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoundEnabled((v) => !v)}
            aria-label={soundEnabled ? t('soundOn') : t('soundOff')}
            className="p-2 rounded-lg text-[var(--sand-200)] hover:text-white hover:bg-[var(--ink-700)] transition"
          >
            {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
          <button
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? t('exitFullscreen') : t('enterFullscreen')}
            className="hidden sm:inline-flex p-2 rounded-lg text-[var(--sand-200)] hover:text-white hover:bg-[var(--ink-700)] transition"
          >
            {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
          <button
            onClick={onClose}
            aria-label={t('closePlayer')}
            className="p-2 rounded-lg text-[var(--sand-200)] hover:text-white hover:bg-[var(--error)] transition"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Demo Build Notice Banner */}
      <div className="bg-[var(--ink-900)] px-4 py-1.5 text-center text-xs text-[var(--saffron-500)] border-b border-[var(--ink-700)]">
        {t('demoGameChip')}
      </div>

      {/* Stats Bar */}
      <div className="flex items-center justify-between px-6 py-3 bg-[var(--ink-900)]/60 text-sm border-b border-[var(--ink-700)]/60">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-[var(--text-3)]">{t('movesLabel')}:</span>
            <span className="font-mono text-base font-semibold text-[var(--saffron-500)]">
              {moves}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[var(--text-3)]">{t('timeLabel')}:</span>
            <span className="font-mono text-base font-semibold text-[var(--sand-50)]">
              {Math.floor(timerSeconds / 60)}:
              {String(timerSeconds % 60).padStart(2, '0')}
            </span>
          </div>
        </div>

        <button
          onClick={initGame}
          className="flex items-center gap-1.5 text-xs text-[var(--sand-200)] hover:text-[var(--saffron-500)] py-1 px-3 rounded-lg hover:bg-[var(--ink-700)] transition"
        >
          <RotateCcw size={14} className="icon-dir" />
          <span>{t('restartGame')}</span>
        </button>
      </div>

      {/* Play Area */}
      <div className="relative p-4 sm:p-8 min-h-[380px] sm:min-h-[460px] flex items-center justify-center bg-[var(--night-900)]">
        {isCompleted ? (
          <div className="text-center p-8 max-w-md bg-[var(--night-800)] border border-[var(--saffron-500)]/40 rounded-2xl shadow-xl animate-in fade-in duration-300">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--saffron-100)] text-[var(--saffron-600)] flex items-center justify-center">
              <Trophy size={32} />
            </div>
            <h4 className="text-2xl font-serif text-[var(--sand-50)] mb-2">
              {t('gameCompleted')}
            </h4>
            <p className="text-sm text-[var(--sand-200)] mb-6">
              {t('gameCompletedSub', { moves, seconds: timerSeconds })}
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={initGame}
                className="px-6 py-2.5 rounded-xl bg-[var(--saffron-500)] text-[var(--night-900)] font-semibold hover:bg-[var(--saffron-600)] transition"
              >
                {t('playAgain')}
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-[var(--ink-700)] text-[var(--sand-50)] hover:bg-[var(--ink-500)] transition"
              >
                {t('closePlayer')}
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2.5 sm:gap-4 w-full max-w-[420px] aspect-square">
            {cards.map((card) => {
              const flipped = card.isFlipped || card.isMatched
              return (
                <button
                  key={card.id}
                  onClick={() => handleCardClick(card)}
                  disabled={card.isMatched || flippedIds.length === 2}
                  aria-label={
                    flipped
                      ? lang === 'ar'
                        ? card.labelAr
                        : card.labelEn
                      : `Card ${card.id}`
                  }
                  className={`relative rounded-xl border transition-all duration-300 transform select-none focus:outline-none focus:ring-2 focus:ring-[var(--saffron-500)] ${
                    flipped
                      ? 'bg-[var(--ink-900)] border-[var(--saffron-500)]/80 scale-[0.98]'
                      : 'bg-[var(--night-800)] border-[var(--ink-700)] hover:border-[var(--saffron-500)]/50 hover:translate-y-[-2px] shadow-sm'
                  } ${card.isMatched ? 'opacity-70 bg-[var(--ink-700)]/40 border-[var(--success)]/80' : ''}`}
                >
                  <div className="w-full h-full flex items-center justify-center p-2">
                    {flipped ? (
                      <span className="text-3xl sm:text-4xl text-[var(--saffron-500)] select-none">
                        {card.symbol}
                      </span>
                    ) : (
                      <span className="text-xl sm:text-2xl text-[var(--ink-500)] opacity-40 select-none">
                        ✦
                      </span>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
