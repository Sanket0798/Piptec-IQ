import { cn } from '../../lib/format'
import Icon from '../Icon'

export default function SectionHeading({ icon, title, subtitle, action, className = '' }) {
  return (
    <div className={cn('flex items-start justify-between gap-4', className)}>
      <div className="flex items-start gap-3">
        {icon && (
          <span className="mt-0.5 grid size-9 place-items-center rounded-xl bg-brand-50 text-brand-600">
            <Icon name={icon} size={18} />
          </span>
        )}
        <div>
          <h2 className="text-base font-semibold tracking-tight text-gradient">{title}</h2>
          {subtitle && <p className="mt-0.5 text-sm text-ink-soft">{subtitle}</p>}
        </div>
      </div>
      {action}
    </div>
  )
}
