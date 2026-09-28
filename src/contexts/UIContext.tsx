import React, { createContext, useContext, useState, useCallback } from 'react'
import type { Game } from '../data/games'

export interface ToastItem {
  id: string
  message: string
  type: 'success' | 'info' | 'error'
}

interface UIContextType {
  // Paywall Drawer
  paywallOpen: boolean
  paywallTab: 'wallet' | 'pin'
  openPaywall: (tab?: 'wallet' | 'pin') => void
  closePaywall: () => void

  // Hosted payment window sim
  paymentWindowOpen: boolean
  openPaymentWindow: () => void
  closePaymentWindow: () => void

  // Player Modal
  playerGame: Game | null
  openPlayer: (game: Game) => void
  closePlayer: () => void

  // Toasts
  toasts: ToastItem[]
  addToast: (message: string, type?: 'success' | 'info' | 'error') => void
  removeToast: (id: string) => void

  // Dev Inspector
  devInspectorOpen: boolean
  toggleDevInspector: () => void
  setDevInspectorOpen: (open: boolean) => void

  // Tour Chip
  tourVisible: boolean
  dismissTour: () => void

  // Global filters
  activeFilterTab: 'all' | 'free' | 'premium'
  setActiveFilterTab: (tab: 'all' | 'free' | 'premium') => void
}

const UIContext = createContext<UIContextType | null>(null)

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [paywallOpen, setPaywallOpen] = useState(false)
  const [paywallTab, setPaywallTab] = useState<'wallet' | 'pin'>('wallet')

  const [paymentWindowOpen, setPaymentWindowOpen] = useState(false)
  const [playerGame, setPlayerGame] = useState<Game | null>(null)

  const [toasts, setToasts] = useState<ToastItem[]>([])
  const [devInspectorOpen, setDevInspectorOpen] = useState(false)

  const [activeFilterTab, setActiveFilterTab] = useState<'all' | 'free' | 'premium'>('all')

  const [tourVisible, setTourVisible] = useState(() => {
    return !sessionStorage.getItem('layali.tourDismissed')
  })

  const openPaywall = useCallback((tab: 'wallet' | 'pin' = 'wallet') => {
    setPaywallTab(tab)
    setPaywallOpen(true)
  }, [])

  const closePaywall = useCallback(() => {
    setPaywallOpen(false)
  }, [])

  const openPaymentWindow = useCallback(() => {
    setPaymentWindowOpen(true)
  }, [])

  const closePaymentWindow = useCallback(() => {
    setPaymentWindowOpen(false)
  }, [])

  const openPlayer = useCallback((game: Game) => {
    setPlayerGame(game)
  }, [])

  const closePlayer = useCallback(() => {
    setPlayerGame(null)
  }, [])

  const addToast = useCallback((message: string, type: 'success' | 'info' | 'error' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 4200)
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const toggleDevInspector = useCallback(() => {
    setDevInspectorOpen((prev) => !prev)
  }, [])

  const dismissTour = useCallback(() => {
    setTourVisible(false)
    sessionStorage.setItem('layali.tourDismissed', 'true')
  }, [])

  return (
    <UIContext.Provider
      value={{
        paywallOpen,
        paywallTab,
        openPaywall,
        closePaywall,
        paymentWindowOpen,
        openPaymentWindow,
        closePaymentWindow,
        playerGame,
        openPlayer,
        closePlayer,
        toasts,
        addToast,
        removeToast,
        devInspectorOpen,
        toggleDevInspector,
        setDevInspectorOpen,
        tourVisible,
        dismissTour,
        activeFilterTab,
        setActiveFilterTab,
      }}
    >
      {children}
    </UIContext.Provider>
  )
}

export function useUI() {
  const context = useContext(UIContext)
  if (!context) {
    throw new Error('useUI must be used within a UIProvider')
  }
  return context
}
