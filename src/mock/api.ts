import { GAMES, type Game } from '../data/games'
import { evaluatePin, maskPin, type PinValidationResult } from './pins'
import { inspectorStore } from './inspector'
import { webhookEmitter } from './webhook'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

let feedSimulatedError = false
let syncedNewGamesAdded = false

export function setSimulateFeedError(val: boolean) {
  feedSimulatedError = val
}

export function getSimulateFeedError(): boolean {
  return feedSimulatedError
}

export async function getGames(): Promise<Game[]> {
  await delay(150 + Math.random() * 200)

  if (feedSimulatedError) {
    inspectorStore.addLog({
      level: 'error',
      endpoint: 'GET /wp-json/layali/v1/feed',
      details: 'HTTP 502 Bad Gateway: Upstream game catalog feed unavailable.',
    })
    throw new Error('Simulated feed error')
  }

  return [...GAMES]
}

export async function syncFeed(): Promise<{ newCount: number; games: Game[] }> {
  inspectorStore.addLog({
    level: 'info',
    endpoint: 'POST /wp-json/layali/v1/feed/sync',
    details: 'Initiated cron sync with third-party HTML5 game catalog feed...',
  })

  await delay(900)

  if (feedSimulatedError) {
    inspectorStore.addLog({
      level: 'error',
      endpoint: 'POST /wp-json/layali/v1/feed/sync',
      details: 'Sync failed: Feed connection timeout.',
    })
    throw new Error('Feed sync failed')
  }

  syncedNewGamesAdded = true

  inspectorStore.addLog({
    level: 'success',
    endpoint: 'POST /wp-json/layali/v1/feed/sync',
    details: 'Sync complete: 3 new titles fetched, parsed, and registered to catalog.',
  })

  return {
    newCount: 3,
    games: [...GAMES],
  }
}

export async function validatePinApi(rawPin: string): Promise<PinValidationResult> {
  const masked = maskPin(rawPin)
  inspectorStore.addLog({
    level: 'info',
    endpoint: 'POST /wp-json/layali/v1/pin/validate',
    details: `Validating PIN: [${masked}] with Razer Gold partner API...`,
  })

  await delay(450 + Math.random() * 200)

  const result = evaluatePin(rawPin)

  if (result.status === 'valid') {
    inspectorStore.addLog({
      level: 'success',
      endpoint: 'POST /wp-json/layali/v1/pin/validate',
      details: `HTTP 200 OK: PIN verified. Balance: ${result.amount}.00 RG.`,
    })
  } else if (result.status === 'network_error') {
    inspectorStore.addLog({
      level: 'error',
      endpoint: 'POST /wp-json/layali/v1/pin/validate',
      details: 'HTTP 504 Gateway Timeout: Transient network drop. Retry permitted.',
    })
  } else if (result.status === 'already_redeemed') {
    inspectorStore.addLog({
      level: 'warn',
      endpoint: 'POST /wp-json/layali/v1/pin/validate',
      details: 'HTTP 409 Conflict: PIN was previously redeemed.',
    })
  } else if (result.status === 'insufficient') {
    inspectorStore.addLog({
      level: 'warn',
      endpoint: 'POST /wp-json/layali/v1/pin/validate',
      details: `HTTP 200 OK: Valid card with insufficient balance: ${result.amount}.00 RG (Requires 10.00 RG).`,
    })
  } else {
    inspectorStore.addLog({
      level: 'error',
      endpoint: 'POST /wp-json/layali/v1/pin/validate',
      details: 'HTTP 422 Unprocessable Entity: Invalid PIN checksum or formatting.',
    })
  }

  return result
}

export async function redeemPinApi(orderRef: string = 'LYL-8F3K29'): Promise<void> {
  inspectorStore.addLog({
    level: 'info',
    endpoint: 'POST /wp-json/layali/v1/pin/redeem',
    details: `Submitting PIN redemption for order: ${orderRef}. Triggering webhook confirmation...`,
  })

  await delay(400)
  // Trigger simulated incoming webhook
  webhookEmitter.triggerPaymentConfirmed(orderRef, 10)
}

export async function startWalletPaymentApi(
  outcome: 'approve' | 'insufficient' | 'cancel' | 'timeout',
  orderRef: string = 'LYL-8F3K29'
): Promise<'approved' | 'insufficient' | 'cancelled' | 'timeout'> {
  inspectorStore.addLog({
    level: 'info',
    endpoint: 'POST /wp-json/layali/v1/wallet/init',
    details: `Initiating hosted checkout session: order=${orderRef} amount=10.00 RG currency=RG`,
  })

  await delay(700)

  if (outcome === 'approve') {
    inspectorStore.addLog({
      level: 'info',
      endpoint: 'REDIRECT /payment/callback',
      details: `User approved transaction in hosted window. Redirecting to app (Awaiting webhook for entitlement)...`,
    })
    // As per §13.1 and §13.3: the redirect alone does NOT unlock; it triggers the webhook
    webhookEmitter.triggerPaymentConfirmed(orderRef, 10)
    return 'approved'
  }

  if (outcome === 'insufficient') {
    inspectorStore.addLog({
      level: 'warn',
      endpoint: 'WALLET_CALLBACK',
      details: 'Wallet check returned insufficient funds (Balance: 4.20 RG).',
    })
    return 'insufficient'
  }

  if (outcome === 'cancel') {
    inspectorStore.addLog({
      level: 'info',
      endpoint: 'WALLET_CALLBACK',
      details: 'User cancelled payment in hosted window.',
    })
    return 'cancelled'
  }

  inspectorStore.addLog({
    level: 'error',
    endpoint: 'WALLET_CALLBACK',
    details: 'Hosted payment session timed out without response.',
  })
  return 'timeout'
}

export async function submitContactApi(formData: { name: string; email: string; topic: string; message: string }): Promise<void> {
  inspectorStore.addLog({
    level: 'info',
    endpoint: 'POST /wp-json/layali/v1/contact',
    details: `Submitting inquiry from ${formData.name} <${formData.email}> [${formData.topic}]...`,
  })

  await delay(900)

  inspectorStore.addLog({
    level: 'success',
    endpoint: 'POST /wp-json/layali/v1/contact',
    details: 'Inquiry stored to database and notification dispatched to support desk.',
  })
}
