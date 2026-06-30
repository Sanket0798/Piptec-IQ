import { cn } from '../../lib/format'

const TONES = {
  brand: 'bg-brand-500',
  ok: 'bg-ok',
  warn: 'bg-warn',
  danger: 'bg-danger',
  muted: 'bg-ink-faint',
}

export default function ProgressBar({ value = 0, tone = 'brand', className = '', height = 'h-2' }) {
  return (
    <div className={cn('w-full overflow-hidden rounded-full bg-line-soft', height, className)}>
      <div
        className={cn('h-full rounded-full transition-[width] duration-700 ease-out', TONES[tone] || TONES.brand)}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  )
}
