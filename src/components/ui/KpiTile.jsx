import { cn } from '../../lib/format'
import Icon from '../Icon'
import AnimatedCounter from './AnimatedCounter'

// Donezo-style KPI card. `hero` renders the solid dark-green filled variant.
export default function KpiTile({
  label,
  value,
  sub,
  icon,
  hero = false,
  tone = 'ink',
  delta,
  className = '',
}) {
  const toneText = {
    ink: 'text-ink',
    ok: 'text-ok',
    warn: 'text-warn',
    danger: 'text-danger',
  }

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-3xl border p-5 transition-all duration-300',
        hero
          ? 'border-brand-700 bg-brand-800 bg-wave text-white shadow-[0_18px_40px_-18px_rgba(22,55,79,0.55)]'
          : 'border-line bg-surface hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-22px_rgba(16,40,28,0.25)]',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          {icon && (
            <span
              className={cn(
                'grid size-8 place-items-center rounded-lg',
                hero ? 'bg-white/15 text-white' : 'bg-brand-50 text-brand-600',
              )}
            >
              <Icon name={icon} size={16} />
            </span>
          )}
          <span className={cn('text-sm font-medium', hero ? 'text-white/80' : 'text-ink-soft')}>
            {label}
          </span>
        </div>
        <span
          className={cn(
            'grid size-8 place-items-center rounded-full border transition-transform duration-300 group-hover:rotate-12',
            hero ? 'border-white/25 text-white' : 'border-line text-ink-soft',
          )}
        >
          <Icon name="arrowUpRight" size={15} strokeWidth={2} />
        </span>
      </div>

      <div className="mt-5">
        <div className={cn('text-3xl font-bold leading-none tracking-tight', hero ? 'text-white' : toneText[tone])}>
          <AnimatedCounter value={value} />
        </div>
        {(delta || sub) && (
          <div className={cn('mt-2 flex items-center gap-1.5 text-xs', hero ? 'text-white/70' : 'text-ink-faint')}>
            {delta && (
              <span
                className={cn(
                  'inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 font-medium',
                  hero ? 'bg-white/15 text-white' : 'bg-brand-50 text-brand-600',
                )}
              >
                <Icon name="trendingUp" size={12} strokeWidth={2.2} />
                {delta}
              </span>
            )}
            {sub && <span>{sub}</span>}
          </div>
        )}
      </div>
    </div>
  )
}
