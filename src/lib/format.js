// Small formatting + helper utilities shared across pages.

export function cn(...parts) {
  return parts.filter(Boolean).join(' ')
}

export function money(value, { decimals = 2 } = {}) {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(decimals)}M`
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`
  return `$${value}`
}

export function pct(value) {
  return `${Math.round(value)}%`
}

// Maps a status keyword to its token set used by Badge / StatusPill.
export const STATUS_TONE = {
  operational: { label: 'Operational', tone: 'ok' },
  active: { label: 'Active', tone: 'info' },
  attention: { label: 'Attention', tone: 'warn' },
  risk: { label: 'Risk', tone: 'danger' },
  critical: { label: 'Critical', tone: 'danger' },
  high: { label: 'High', tone: 'warn' },
  medium: { label: 'Medium', tone: 'info' },
  completed: { label: 'Completed', tone: 'ok' },
  'in progress': { label: 'In Progress', tone: 'warn' },
  pending: { label: 'Pending', tone: 'danger' },
}

export function riskTone(value) {
  if (value >= 60) return 'danger'
  if (value >= 30) return 'warn'
  return 'ok'
}
