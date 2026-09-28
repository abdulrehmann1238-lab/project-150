import React, { useState, useEffect } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { useLang } from '../../i18n'

interface FilterBarProps {
  searchQuery: string
  onSearchChange: (q: string) => void
  activeTab: 'all' | 'free' | 'premium'
  onTabChange: (tab: 'all' | 'free' | 'premium') => void
  selectedCategories: string[]
  onCategoryToggle: (cat: string) => void
  onClearCategories: () => void
  sortBy: 'popular' | 'new' | 'alpha'
  onSortChange: (sort: 'popular' | 'new' | 'alpha') => void
}

const CATEGORIES = ['Puzzle', 'Arcade', 'Cards', 'Racing', 'Board', 'Word', 'Family']

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  activeTab,
  onTabChange,
  selectedCategories,
  onCategoryToggle,
  onClearCategories,
  sortBy,
  onSortChange,
}) => {
  const { t } = useLang()
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false)
  const [localQuery, setLocalQuery] = useState(searchQuery)

  // Debounced search (150ms)
  useEffect(() => {
    const handler = setTimeout(() => {
      onSearchChange(localQuery)
    }, 150)
    return () => clearTimeout(handler)
  }, [localQuery, onSearchChange])

  return (
    <div className="flex flex-col gap-4 py-4">
      {/* Top Row: Search + Tabs + Sort */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search
            size={18}
            className="absolute start-3.5 top-1/2 -translate-y-1/2 text-[var(--text-3)] pointer-events-none"
          />
          <input
            type="text"
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="w-full ps-10 pe-9 py-2.5 rounded-xl border border-[var(--sand-200)] bg-[var(--sand-100)] text-sm text-[var(--text-1)] placeholder-[var(--text-3)] focus:border-[var(--ink-500)] focus:ring-2 focus:ring-[var(--saffron-500)]/30 outline-none transition"
          />
          {localQuery && (
            <button
              onClick={() => {
                setLocalQuery('')
                onSearchChange('')
              }}
              className="absolute end-3 top-1/2 -translate-y-1/2 text-[var(--text-3)] hover:text-[var(--text-1)]"
            >
              <X size={15} />
            </button>
          )}
        </div>

        {/* Tab Selector & Sort */}
        <div className="flex items-center gap-2 justify-between md:justify-end">
          {/* Tabs: All / Free / Premium */}
          <div className="inline-flex p-1 rounded-xl bg-[var(--sand-200)] text-xs font-semibold text-[var(--text-2)]">
            <button
              onClick={() => onTabChange('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'all'
                  ? 'bg-[var(--ink-900)] text-white shadow-sm'
                  : 'hover:text-[var(--text-1)]'
              }`}
            >
              {t('filterAll')}
            </button>
            <button
              onClick={() => onTabChange('free')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'free'
                  ? 'bg-[var(--ink-900)] text-white shadow-sm'
                  : 'hover:text-[var(--text-1)]'
              }`}
            >
              {t('filterFree')}
            </button>
            <button
              onClick={() => onTabChange('premium')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'premium'
                  ? 'bg-[var(--saffron-500)] text-[var(--night-900)] shadow-sm'
                  : 'hover:text-[var(--text-1)]'
              }`}
            >
              {t('filterPremium')}
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as 'popular' | 'new' | 'alpha')}
              className="px-3 py-2 text-xs font-medium rounded-xl border border-[var(--sand-200)] bg-[var(--sand-100)] text-[var(--text-1)] outline-none focus:border-[var(--ink-500)] cursor-pointer"
            >
              <option value="popular">{t('sortPopular')}</option>
              <option value="new">{t('sortNew')}</option>
              <option value="alpha">{t('sortAlpha')}</option>
            </select>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileSheetOpen(true)}
              className="md:hidden p-2 rounded-xl border border-[var(--sand-200)] bg-[var(--sand-100)] text-[var(--text-1)]"
              aria-label="Filter by category"
            >
              <SlidersHorizontal size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Category Chips (Desktop) */}
      <div className="hidden md:flex items-center gap-2 flex-wrap text-xs">
        <span className="text-[var(--text-3)] me-1 font-medium">{t('categoriesTitle')}:</span>
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategories.includes(cat)
          return (
            <button
              key={cat}
              onClick={() => onCategoryToggle(cat)}
              className={`px-3 py-1 rounded-full border transition-all ${
                isSelected
                  ? 'bg-[var(--ink-900)] text-white border-[var(--ink-900)]'
                  : 'bg-[var(--sand-50)] text-[var(--text-2)] border-[var(--sand-200)] hover:border-[var(--sand-300)]'
              }`}
            >
              {cat}
            </button>
          )
        })}

        {selectedCategories.length > 0 && (
          <button
            onClick={onClearCategories}
            className="text-[var(--rose-500)] hover:underline ms-2 font-medium"
          >
            {t('clearFilters')} ({selectedCategories.length})
          </button>
        )}
      </div>

      {/* Mobile Filter Sheet */}
      {mobileSheetOpen && (
        <div className="fixed inset-0 z-50 flex items-end bg-[var(--night-900)]/60 md:hidden animate-in fade-in duration-200">
          <div className="w-full bg-[var(--sand-50)] rounded-t-2xl p-6 border-t border-[var(--sand-300)] shadow-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[var(--sand-200)]">
              <h4 className="font-semibold text-base text-[var(--text-1)]">
                {t('categoriesTitle')}
              </h4>
              <button
                onClick={() => setMobileSheetOpen(false)}
                className="p-1 text-[var(--text-2)] hover:text-[var(--text-1)]"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategories.includes(cat)
                return (
                  <button
                    key={cat}
                    onClick={() => onCategoryToggle(cat)}
                    className={`px-4 py-2 rounded-xl text-sm border font-medium transition ${
                      isSelected
                        ? 'bg-[var(--ink-900)] text-white border-[var(--ink-900)]'
                        : 'bg-[var(--sand-100)] text-[var(--text-1)] border-[var(--sand-200)]'
                    }`}
                  >
                    {cat}
                  </button>
                )
              })}
            </div>

            <div className="flex items-center gap-3">
              {selectedCategories.length > 0 && (
                <button
                  onClick={onClearCategories}
                  className="flex-1 py-2.5 rounded-xl border border-[var(--sand-300)] text-sm font-semibold text-[var(--text-2)]"
                >
                  {t('clearFilters')}
                </button>
              )}
              <button
                onClick={() => setMobileSheetOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-[var(--ink-900)] text-sm font-semibold text-white"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
