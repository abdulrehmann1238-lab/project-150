import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, Shield, Lock, Wallet, KeyRound } from 'lucide-react'
import { useLang } from '../../i18n'
import { useUI } from '../../contexts/UIContext'
import { useEntitlement } from '../../contexts/EntitlementContext'
import { WalletTab } from './WalletTab'
import { PinTab } from './PinTab'
import { StatusTimeline } from './StatusTimeline'
import { GAMES } from '../../data/games'

export const PaywallDrawer: React.FC = () => {
  const { dir, t } = useLang()
  const navigate = useNavigate()
  const { paywallOpen, paywallTab, closePaywall, openPlayer } = useUI()
  const { isUnlocked } = useEntitlement()

  const [activeTab, setActiveTab] = useState<'wallet' | 'pin'>('wallet')
  const [isPendingConfirmation, setIsPendingConfirmation] = useState(false)

  // Sync tab with UIContext
  useEffect(() => {
    setActiveTab(paywallTab)
  }, [paywallTab])

  // Reset internal pending status when drawer closes
  useEffect(() => {
    if (!paywallOpen) {
      setTimeout(() => {
        setIsPendingConfirmation(false)
      }, 300)
    }
  }, [paywallOpen])

  if (!paywallOpen) return null

  const handlePlayFirstPremium = () => {
    closePaywall()
    const firstPrem = GAMES.find((g) => g.tier === 'premium')
    if (firstPrem) {
      openPlayer(firstPrem)
    } else {
      navigate('/games?tab=premium')
    }
  }

  const handleViewLibrary = () => {
    closePaywall()
    navigate('/library')
  }

  return (
    <div className="fixed inset-0 z-[300] flex justify-end">
      {/* Scrim Overlay */}
      <div
        onClick={() => {
          if (!isPendingConfirmation) closePaywall()
        }}
        className="fixed inset-0 bg-[#0F2322]/50 transition-opacity duration-300"
      />

      {/* Drawer Container (Side drawer >=md, bottom sheet on mobile) */}
      <div
        className={`relative z-10 w-full md:w-[480px] h-[85vh] md:h-full bg-[var(--sand-50)] text-[var(--text-1)] border-t md:border-t-0 md:border-s border-[var(--sand-300)] shadow-2xl flex flex-col overflow-hidden transition-transform duration-300 self-end md:self-auto rounded-t-3xl md:rounded-none ${
          dir === 'rtl' ? 'md:border-e md:border-s-0' : ''
        }`}
      >
        {/* Mobile Drag Handle */}
        <div className="md:hidden flex justify-center pt-3 pb-1">
          <div className="w-12 h-1.5 rounded-full bg-[var(--sand-300)]" />
        </div>

        {/* Drawer Header */}
        <div className="px-6 py-4 border-b border-[var(--sand-200)] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Lock size={16} className="text-[var(--saffron-500)]" />
              <h2 className="text-lg font-serif font-semibold text-[var(--ink-900)]">
                {t('unlockPremiumHeader')}
              </h2>
            </div>
            {/* Honest Demo Mode Chip (§3, §13) */}
            <div className="mt-1 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[var(--saffron-100)] text-[var(--saffron-600)] text-[11px] font-semibold border border-[var(--saffron-500)]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--saffron-500)]" />
              <span>{t('demoSimulatedChip')}</span>
            </div>
          </div>

          <button
            onClick={() => closePaywall()}
            aria-label="Close paywall"
            className="p-2 rounded-full text-[var(--text-3)] hover:text-[var(--text-1)] hover:bg-[var(--sand-200)] transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 flex-1 overflow-y-auto flex flex-col gap-6">
          {/* Plan Summary Block */}
          <div className="p-4 rounded-2xl bg-[var(--sand-100)] border border-[var(--sand-200)] flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-wider text-[var(--saffron-600)] font-bold">
                {t('priceCardTitle')}
              </span>
              <h3 className="text-base font-semibold text-[var(--ink-900)] mt-0.5">
                {t('summaryPlan')}
              </h3>
              <p className="text-xs text-[var(--text-3)] mt-1">
                {t('summaryBenefit')}
              </p>
            </div>
            <div className="text-end">
              <span className="font-mono text-2xl font-bold text-[var(--ink-900)]">
                RG 10
              </span>
              <span className="block text-[11px] text-[var(--text-3)]">
                / 30 days
              </span>
            </div>
          </div>

          {/* Conditional Flow: Status Timeline VS Tab Selection */}
          {isPendingConfirmation || isUnlocked ? (
            <StatusTimeline
              onPlayGame={handlePlayFirstPremium}
              onViewLibrary={handleViewLibrary}
            />
          ) : (
            <>
              {/* Payment Tabs: Wallet | PIN */}
              <div className="grid grid-cols-2 p-1 rounded-xl bg-[var(--sand-200)] text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setActiveTab('wallet')}
                  className={`py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition ${
                    activeTab === 'wallet'
                      ? 'bg-[var(--sand-50)] text-[var(--ink-900)] shadow-sm'
                      : 'text-[var(--text-2)] hover:text-[var(--text-1)]'
                  }`}
                >
                  <Wallet size={15} />
                  <span>{t('tabWallet')}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('pin')}
                  className={`py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition ${
                    activeTab === 'pin'
                      ? 'bg-[var(--sand-50)] text-[var(--ink-900)] shadow-sm'
                      : 'text-[var(--text-2)] hover:text-[var(--text-1)]'
                  }`}
                >
                  <KeyRound size={15} />
                  <span>{t('tabPin')}</span>
                </button>
              </div>

              {/* Active Tab Body */}
              <div className="pt-2">
                {activeTab === 'wallet' ? (
                  <WalletTab
                    onApproved={() => setIsPendingConfirmation(true)}
                    onSwitchToPin={() => setActiveTab('pin')}
                  />
                ) : (
                  <PinTab
                    onSuccessSubmitted={() => setIsPendingConfirmation(true)}
                  />
                )}
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer Trust Banner */}
        <div className="px-6 py-3 bg-[var(--sand-100)] border-t border-[var(--sand-200)] flex items-center justify-between text-xs text-[var(--text-3)]">
          <div className="flex items-center gap-1.5">
            <Shield size={14} className="text-[var(--ink-500)]" />
            <span>Encrypted Partner Integration</span>
          </div>
          <span className="font-mono text-[10px]">v1.4 Sandbox</span>
        </div>
      </div>
    </div>
  )
}
