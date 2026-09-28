import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { RefreshCw, AlertCircle, Layers } from 'lucide-react'
import { useLang } from '../i18n'
import { useUI } from '../contexts/UIContext'
import { getGames, syncFeed } from '../mock/api'
import type { Game } from '../data/games'
import { GameCard } from '../components/game/GameCard'
import { FilterBar } from '../components/game/FilterBar'

export const Catalogue: React.FC = () => {
  const { lang, t } = useLang()
  const { addToast } = useUI()
  const [searchParams, setSearchParams] = useSearchParams()

  const [games, setGames] = useState<Game[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSyncing, setIsSyncing] = useState(false)
  const [syncDisabled, setSyncDisabled] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Filters state
  const tabParam = (searchParams.get('tab') as 'all' | 'free' | 'premium') || 'all'
  const categoryParam = searchParams.get('category')

  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'all' | 'free' | 'premium'>(tabParam)
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryParam ? [categoryParam] : []
  )
  const [sortBy, setSortBy] = useState<'popular' | 'new' | 'alpha'>('popular')

  // Sync tab with URL
  useEffect(() => {
    if (tabParam && tabParam !== activeTab) {
      setActiveTab(tabParam)
    }
  }, [tabParam])

  // Fetch games
  const loadGames = useCallback(async () => {
    setIsLoading(true)
    setErrorMessage(null)
    try {
      const data = await getGames()
      setGames(data)
    } catch {
      setErrorMessage("We couldn't refresh the catalogue. Showing saved games.")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadGames()
  }, [loadGames])

  // Handle manual sync
  const handleSyncNow = async () => {
    if (syncDisabled || isSyncing) return
    setIsSyncing(true)
    try {
      const result = await syncFeed()
      setGames(result.games)
      addToast('+3 new games added to catalog', 'success')
      setSyncDisabled(true)
      setTimeout(() => setSyncDisabled(false), 10000)
    } catch {
      setErrorMessage("We couldn't refresh the catalogue. Showing saved games.")
      addToast('Feed sync error (simulated)', 'error')
    } finally {
      setIsSyncing(false)
    }
  }

  const handleCategoryToggle = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    )
  }

  const handleTabChange = (tab: 'all' | 'free' | 'premium') => {
    setActiveTab(tab)
    const newParams = new URLSearchParams(searchParams)
    if (tab === 'all') {
      newParams.delete('tab')
    } else {
      newParams.set('tab', tab)
    }
    setSearchParams(newParams)
  }

  // Filter and sort games
  const filteredGames = useMemo(() => {
    let result = [...games]

    // Tier Tab
    if (activeTab === 'free') {
      result = result.filter((g) => g.tier === 'free')
    } else if (activeTab === 'premium') {
      result = result.filter((g) => g.tier === 'premium')
    }

    // Categories
    if (selectedCategories.length > 0) {
      result = result.filter((g) => selectedCategories.includes(g.category))
    }

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter((g) => {
        const titleMatch =
          g.titleEn.toLowerCase().includes(q) || g.titleAr.toLowerCase().includes(q)
        const blurbMatch =
          g.blurbEn.toLowerCase().includes(q) || g.blurbAr.toLowerCase().includes(q)
        const tagMatch = g.tags.some((tag) => tag.toLowerCase().includes(q))
        const catMatch = g.category.toLowerCase().includes(q)
        return titleMatch || blurbMatch || tagMatch || catMatch
      })
    }

    // Sorting
    if (sortBy === 'popular') {
      result.sort((a, b) => b.plays - a.plays)
    } else if (sortBy === 'new') {
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
    } else if (sortBy === 'alpha') {
      result.sort((a, b) =>
        lang === 'ar'
          ? a.titleAr.localeCompare(b.titleAr)
          : a.titleEn.localeCompare(b.titleEn)
      )
    }

    return result
  }, [games, activeTab, selectedCategories, searchQuery, sortBy, lang])

  return (
    <div className="py-8 sm:py-12 bg-[var(--sand-50)] min-h-screen">
      <div className="layali-container">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--sand-200)]">
          <div>
            <h1 className="text-3xl sm:text-4xl font-serif text-[var(--ink-900)]">
              {t('catalogueTitle')}
            </h1>
            <p className="text-xs sm:text-sm text-[var(--text-3)] mt-1">
              {t('showingGames', { count: filteredGames.length })}
            </p>
          </div>

          {/* Feed Sync Badge & Trigger */}
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--sand-100)] border border-[var(--sand-200)] text-xs text-[var(--text-3)] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--success)]" />
              <span>{t('feedSyncedAgo')}</span>
            </span>

            <button
              onClick={handleSyncNow}
              disabled={syncDisabled || isSyncing}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-[var(--sand-300)] text-xs font-semibold text-[var(--ink-900)] hover:bg-[var(--sand-100)] disabled:opacity-40 disabled:cursor-not-allowed shadow-sm transition"
            >
              <RefreshCw
                size={13}
                className={isSyncing ? 'animate-spin' : 'icon-dir'}
              />
              <span>{isSyncing ? t('syncing') : t('syncFeedBtn')}</span>
            </button>
          </div>
        </div>

        {/* Error Notification Banner (if simulated) */}
        {errorMessage && (
          <div className="mt-4 p-4 rounded-xl bg-[var(--error)]/10 border border-[var(--error)]/30 text-xs text-[var(--error)] flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <AlertCircle size={16} />
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={loadGames}
              className="font-bold underline hover:opacity-80"
            >
              Try again
            </button>
          </div>
        )}

        {/* Sticky Filter Bar */}
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          selectedCategories={selectedCategories}
          onCategoryToggle={handleCategoryToggle}
          onClearCategories={() => setSelectedCategories([])}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {/* Loading Skeletons */}
        {isLoading || isSyncing ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl border border-[var(--sand-200)] bg-[var(--sand-100)] overflow-hidden animate-pulse flex flex-col"
              >
                <div className="aspect-[4/3] bg-[var(--sand-200)]" />
                <div className="p-4 flex flex-col gap-2">
                  <div className="h-4 bg-[var(--sand-200)] rounded w-3/4" />
                  <div className="h-3 bg-[var(--sand-200)] rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredGames.length === 0 ? (
          /* Empty State Illustration (§11.2) */
          <div className="text-center py-20 flex flex-col items-center justify-center max-w-sm mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-[var(--sand-200)] text-[var(--text-3)] flex items-center justify-center mb-4">
              <Layers size={28} />
            </div>
            <h3 className="text-lg font-serif text-[var(--ink-900)] mb-1">
              {t('noGamesFound')}
            </h3>
            <p className="text-xs text-[var(--text-3)] mb-6">
              Try adjusting your search terms or clearing selected category filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategories([])
                setActiveTab('all')
              }}
              className="px-4 py-2 rounded-xl bg-[var(--ink-900)] text-white text-xs font-semibold hover:bg-[var(--ink-700)] transition"
            >
              {t('clearFilters')}
            </button>
          </div>
        ) : (
          /* Games Grid */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-4">
            {filteredGames.map((game, idx) => (
              <GameCard key={game.id} game={game} index={idx} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
