import { inspectorStore } from './inspector'

export interface WebhookPayload {
  eventId: string
  eventType: 'payment.confirmed' | 'payment.failed'
  idempotencyKey: string
  orderReference: string
  amount: number
  currency: 'RG'
  timestamp: string
  signatureValid: boolean
  isDuplicate?: boolean
}

type WebhookListener = (payload: WebhookPayload) => void

class WebhookEmitter {
  private listeners: Set<WebhookListener> = new Set()
  private processedIdempotencyKeys: Set<string> = new Set()
  public currentDelaySeconds: number = 2.2 // 2.2s default, 8s lag, or -1 for never
  private lastSuccessfulPayload: WebhookPayload | null = null

  subscribe(listener: WebhookListener): () => void {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  // Trigger a simulated incoming webhook
  triggerPaymentConfirmed(orderRef: string = 'LYL-8F3K29', amount: number = 10): Promise<void> {
    const idempotencyKey = `idem_${orderRef}_${Math.floor(Date.now() / 100000)}`
    
    inspectorStore.addLog({
      level: 'info',
      endpoint: 'OUTBOUND_QUEUE',
      details: `Scheduled webhook delivery: event=payment.confirmed order=${orderRef} delay=${this.currentDelaySeconds}s idempotency=${idempotencyKey}`,
    })

    if (this.currentDelaySeconds === -1) {
      // "Never" mode for 30s timeout test
      return Promise.resolve()
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        this.dispatchWebhook({
          eventId: `evt_${Math.random().toString(36).substring(2, 9)}`,
          eventType: 'payment.confirmed',
          idempotencyKey,
          orderReference: orderRef,
          amount,
          currency: 'RG',
          timestamp: new Date().toISOString(),
          signatureValid: true,
        })
        resolve()
      }, this.currentDelaySeconds * 1000)
    })
  }

  // Test tool: Replay last webhook to prove idempotency
  replayWebhook(): void {
    if (!this.lastSuccessfulPayload) {
      inspectorStore.addLog({
        level: 'warn',
        endpoint: 'WEBHOOK_REPLAY',
        details: 'No prior webhook to replay. Complete a payment first.',
      })
      return
    }

    const payload: WebhookPayload = {
      ...this.lastSuccessfulPayload,
      isDuplicate: true,
    }

    inspectorStore.addLog({
      level: 'info',
      endpoint: 'POST /wp-json/layali/v1/webhook',
      details: `Replaying webhook: idem=${payload.idempotencyKey} event=${payload.eventId}`,
    })

    this.dispatchWebhook(payload)
  }

  // Test tool: Send tampered webhook with signature mismatch
  sendTamperedWebhook(): void {
    inspectorStore.addLog({
      level: 'error',
      endpoint: 'POST /wp-json/layali/v1/webhook',
      details: 'Incoming webhook received with invalid HMAC signature: X-Razer-Signature mismatch!',
    })

    this.dispatchWebhook({
      eventId: `evt_fake_${Math.random().toString(36).substring(2, 7)}`,
      eventType: 'payment.confirmed',
      idempotencyKey: `idem_tampered_${Date.now()}`,
      orderReference: 'LYL-FAKE99',
      amount: 10,
      currency: 'RG',
      timestamp: new Date().toISOString(),
      signatureValid: false,
    })
  }

  private dispatchWebhook(payload: WebhookPayload) {
    if (!payload.signatureValid) {
      inspectorStore.addLog({
        level: 'error',
        endpoint: 'POST /wp-json/layali/v1/webhook',
        details: 'HTTP 403 Forbidden: Signature verification failed. Entitlement rejected.',
      })
      return
    }

    if (this.processedIdempotencyKeys.has(payload.idempotencyKey)) {
      inspectorStore.addLog({
        level: 'warn',
        endpoint: 'POST /wp-json/layali/v1/webhook',
        details: `HTTP 200 OK: Duplicate webhook ignored (idempotency key ${payload.idempotencyKey} already acknowledged). Zero state mutations.`,
      })
      return
    }

    // Acknowledge new key
    this.processedIdempotencyKeys.add(payload.idempotencyKey)
    this.lastSuccessfulPayload = payload

    inspectorStore.addLog({
      level: 'success',
      endpoint: 'POST /wp-json/layali/v1/webhook',
      details: `HTTP 200 OK: Authoritative confirmation verified. Order ${payload.orderReference} unlocked (+30 days).`,
    })

    this.listeners.forEach((listener) => listener(payload))
  }

  reset(): void {
    this.processedIdempotencyKeys.clear()
    this.lastSuccessfulPayload = null
  }
}

export const webhookEmitter = new WebhookEmitter()
