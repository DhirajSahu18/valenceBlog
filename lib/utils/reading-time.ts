import readingTime from 'reading-time'

export function calculateReadingTime(content: string): number {
  const stats = readingTime(content)
  return Math.ceil(stats.minutes)
}

export function formatReadingTime(minutes: number): string {
  return `${minutes} min read`
}