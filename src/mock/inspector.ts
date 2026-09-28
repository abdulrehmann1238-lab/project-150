export interface InspectorLog {
  id: string
  timestamp: string
  level: 'info' | 'success' | 'warn' | 'error'
  method?: string
  endpoint?: string
  details: string
}

type LogListener = (logs: InspectorLog[]) => void

class InspectorStore {
  private logs: InspectorLog[] = []
  private listeners: Set<LogListener> = new Set()

  constructor() {
    this.addLog({
      level: 'info',
      endpoint: 'SYSTEM_BOOT',
      details: 'Layali Games simulated runtime initialized. Razor Gold API mock v1.4 ready.',
    })
  }

  getLogs(): InspectorLog[] {
    return [...this.logs]
  }

  addLog(entry: Omit<InspectorLog, 'id' | 'timestamp'>): void {
    const now = new Date()
    const timeStr = now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0')
    const newLog: InspectorLog = {
      id: Math.random().toString(36).substring(2, 9),
      timestamp: timeStr,
      ...entry,
    }
    this.logs.unshift(newLog)
    // Keep max 100 entries
    if (this.logs.length > 100) {
      this.logs.pop()
    }
    this.notify()
  }

  clear(): void {
    this.logs = []
    this.notify()
  }

  subscribe(listener: LogListener): () => void {
    this.listeners.add(listener)
    listener(this.getLogs())
    return () => this.listeners.delete(listener)
  }

  private notify(): void {
    const snapshot = this.getLogs()
    this.listeners.forEach((fn) => fn(snapshot))
  }
}

export const inspectorStore = new InspectorStore()
