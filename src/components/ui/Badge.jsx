import { cn } from '../../lib/format'
import Icon from '../Icon'

const TONES = {
  ok: 'bg-brand-50 text-brand-600 ring-brand-100',
  info: 'bg-[#eaf1fb] text-info ring-[#d6e4f7]',
  warn: 'bg-[#fbf3e3] text-warn ring-[#f3e3c2]',
  danger: 'bg-[#fbeceb] text-danger ring-[#f5d5d3]',
  neutral: 'bg-surface-soft text-ink-soft ring-line',
}

export default function Badge({ tone = 'neutral', dot = false, icon, children, className = '' }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset whitespace-nowrap',
        TONES[tone] || TONES.neutral,
        className,
      )}
    >
      {dot && <span className="size-1.5 rounded-full bg-current" />}
      {icon && <Icon name={icon} size={13} strokeWidth={2} />}
      {children}
    </span>
  )
}
