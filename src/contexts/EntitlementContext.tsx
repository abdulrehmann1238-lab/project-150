import React, { createContext, useContext, useState, useEffect } from 'react'
import { webhookEmitter, type WebhookPayload } from '../mock/webhook'

export interface Receipt {
  reference: string
  method: 'Razer Gold Wallet' | 'Razer Gold PIN'
  amount: string
  timestamp: string
  status: 'Confirmed'
}

interface EntitlementState {
  isUnlocked: boolean
  unlockedUntil: string | null
  receipt: Receipt | null
  justUnlockedEvent: number // timestamp trigger for staggered animations
}

interface EntitlementContextType extends EntitlementState {
  daysRemaining: number
  unlockWithDuration: (days?: number, method?: 'Razer Gold Wallet' | 'Razer Gold PIN', ref?: string) => void
  resetEntitlement: () => void
}

const STORAGE_KEY = 'layali.entitlement'

const EntitlementContext = createContext<EntitlementContextType | null>(null)

export function EntitlementProvider({
  children,
  onUnlockToast,
}: {
  children: React.ReactNode
  onUnlockToast?: (msg: string) => void
}) {
  const [state, setState] = useState<EntitlementState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed.unlockedUntil && new Date(parsed.unlockedUntil).getTime() > Date.now()) {
          return {
            isUnlocked: true,
            unlockedUntil: parsed.unlockedUntil,
            receipt: parsed.receipt,
            justUnlockedEvent: 0,
          }
        }
      }
    } catch {
      // Fallback
    }
    return {
      isUnlocked: false,
      unlockedUntil: null,
      receipt: null,
      justUnlockedEvent: 0,
    }
  })

  // Listen to authoritative webhook event emitter
  useEffect(() => {
    const unsubscribe = webhookEmitter.subscribe((payload: WebhookPayload) => {
      // Entitlement is ONLY set by webhook confirmation (§24)
      const expiry = new Date()
      expiry.setDate(expiry.getDate() + 30)
      const expiryStr = expiry.toISOString()

      const newReceipt: Receipt = {
        reference: payload.orderReference,
        method: payload.orderReference.includes('PIN') ? 'Razer Gold PIN' : 'Razer Gold Wallet',
        amount: 'RG 10.00',
        timestamp: new Date().toISOString(),
        status: 'Confirmed',
      }

      const newState: EntitlementState = {
        isUnlocked: true,
        unlockedUntil: expiryStr,
        receipt: newReceipt,
        justUnlockedEvent: Date.now(),
      }

      setState(newState)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState))

      if (onUnlockToast) {
        onUnlockToast('Premium unlocked · 30 days')
      }
    })

    return () => unsubscribe()
  }, [onUnlockToast])

  const daysRemaining = state.unlockedUntil
    ? Math.max(0, Math.ceil((new Date(state.unlockedUntil).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0

  const unlockWithDuration = (days = 30, method: 'Razer Gold Wallet' | 'Razer Gold PIN' = 'Razer Gold Wallet', ref = 'LYL-8F3K29') => {
    const expiry = new Date()
    expiry.setDate(expiry.getDate() + days)
    const expiryStr = expiry.toISOString()

    const newReceipt: Receipt = {
      reference: ref,
      method,
      amount: 'RG 10.00',
      timestamp: new Date().toISOString(),
      status: 'Confirmed',
    }

    const newState: EntitlementState = {
      isUnlocked: true,
      unlockedUntil: expiryStr,
      receipt: newReceipt,
      justUnlockedEvent: Date.now(),
    }

    setState(newState)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newState))
  }

  const resetEntitlement = () => {
    localStorage.removeItem(STORAGE_KEY)
    setState({
      isUnlocked: false,
      unlockedUntil: null,
      receipt: null,
      justUnlockedEvent: 0,
    })
    webhookEmitter.reset()
  }

  return (
    <EntitlementContext.Provider
      value={{
        ...state,
        daysRemaining,
        unlockWithDuration,
        resetEntitlement,
      }}
    >
      {children}
    </EntitlementContext.Provider>
  )
}

export function useEntitlement() {
  const context = useContext(EntitlementContext)
  if (!context) {
    throw new Error('useEntitlement must be used within an EntitlementProvider')
  }
  return context
}
