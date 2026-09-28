export function formatPlays(plays: number, lang: 'en' | 'ar'): string {
  if (plays >= 1000000) {
    const val = (plays / 1000000).toFixed(1).replace('.0', '')
    return lang === 'ar' ? `${val} مليون` : `${val}M`
  }
  if (plays >= 1000) {
    const val = (plays / 1000).toFixed(0)
    return lang === 'ar' ? `${val} ألف` : `${val}K`
  }
  return plays.toString()
}

export function formatDate(date: Date | string, lang: 'en' | 'ar'): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat(lang === 'ar' ? 'ar-SA' : 'en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(d)
}

export function formatTime(date: Date | string, lang: 'en' | 'ar'): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat(lang === 'ar' ? 'ar-SA' : 'en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(d)
}
