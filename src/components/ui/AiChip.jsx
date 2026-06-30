import { cn } from '../../lib/format'
import Icon from '../Icon'

// Sparkle-prefixed chip used to mark AI-generated content across the platform.
export default function AiChip({ children, className = '', tone = 'soft' }) {
  const tones = {
    soft: 'bg-brand-50 text-brand-600',
    solid: 'bg-brand-500 text-white',
    ghost: 'text-brand-600',
  }
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium',
        tones[tone],
        className,
      )}
    >
      <Icon name="sparkles" size={13} strokeWidth={2} />
      {children}
    </span>
  )
}
