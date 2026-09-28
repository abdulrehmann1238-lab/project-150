import React, { useEffect, useMemo } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Lock } from 'lucide-react'
import { GAMES } from '../data/games'
import { MemoryMatch } from '../components/game/MemoryMatch'
import { useLang } from '../i18n'
import { useEntitlement } from '../contexts/EntitlementContext'
import { useUI } from '../contexts/UIContext'

export const Play: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { lang, t } = useLang()
  const { isUnlocked } = useEntitlement()
  const { openPaywall, addToast } = useUI()

  const game = useMemo(() => GAMES.find((g) => g.slug === slug), [slug])

  // Premium guard (§11.4)
  useEffect(() => {
    if (game && game.tier === 'premium' && !isUnlocked) {
      addToast('Premium pass required to play this title', 'error')
      openPaywall()
      navigate(`/games/${game.slug}`, { replace: true })
    }
  }, [game, isUnlocked, navigate, openPaywall, addToast])

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

  return (
    <div className="py-6 sm:py-10 bg-[var(--night-900)] min-h-screen text-[var(--sand-50)]">
      <div className="layali-container">
        {/* Back Link */}
        <div className="mb-4 flex items-center justify-between">
          <button
            onClick={() => navigate(`/games/${game.slug}`)}
            className="inline-flex items-center gap-2 text-xs text-[var(--sand-300)] hover:text-white transition"
          >
            <ArrowLeft size={14} className="icon-dir" />
            <span>Back to Game Info</span>
          </button>
        </div>

        {/* Embedded Game Player */}
        <div className="flex justify-center">
          <MemoryMatch
            title={title}
            onClose={() => navigate(`/games/${game.slug}`)}
          />
        </div>
      </div>
    </div>
  )
}
