import Icon from '../Icon'
import { cn } from '../../lib/format'

export default function PageHeader({ breadcrumb, title, subtitle, actions, live }) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
      <div>
        {breadcrumb && (
          <div className="mb-2 flex items-center gap-1.5 text-xs font-medium text-ink-faint">
            <span>PipeTec IQ</span>
            <Icon name="chevronRight" size={13} />
            <span className="text-brand-600">{breadcrumb}</span>
          </div>
        )}
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight text-gradient">{title}</h1>
          {live && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-600">
              <span className="size-1.5 rounded-full bg-ok animate-pulse-soft" />
              {live}
            </span>
          )}
        </div>
        {subtitle && <p className="mt-1.5 text-[15px] text-ink-soft">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2.5">{actions}</div>}
    </div>
  )
}

export function Button({ variant = 'primary', icon, children, className = '', ...rest }) {
  const variants = {
    primary: 'btn-gradient text-white shadow-[0_10px_22px_-10px_rgba(0,64,104,0.6)]',
    outline: 'border border-line bg-surface text-ink hover:border-brand-200 hover:text-brand-600',
    soft: 'bg-brand-50 text-brand-600 hover:bg-brand-100',
    ghost: 'text-ink-soft hover:bg-surface-soft',
  }
  return (
    <button
      className={cn(
        'inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold transition',
        variants[variant],
        className,
      )}
      {...rest}
    >
      {icon && <Icon name={icon} size={17} strokeWidth={2} />}
      {children}
    </button>
  )
}
