import { NavLink } from 'react-router-dom'
import { cn } from '../../lib/format'
import Icon from '../Icon'
import { nav } from '../../data/common'

function Logo() {
  return (
    <div className="flex items-center gap-2.5 px-2">
      <span className="grid size-10 place-items-center rounded-2xl bg-brand-500 text-white shadow-[0_8px_18px_-6px_rgba(31,122,77,0.6)]">
        <Icon name="layers" size={20} strokeWidth={2} />
      </span>
      <div className="leading-tight">
        <div className="text-[17px] font-bold tracking-tight text-ink">
          PipeTec <span className="text-brand-500">IQ</span>
        </div>
        <div className="text-[11px] font-medium text-ink-faint">Manufacturing Intelligence</div>
      </div>
    </div>
  )
}

function Item({ item, disabled }) {
  const inner = (active) => (
    <>
      <span
        className={cn(
          'grid size-9 place-items-center rounded-xl transition-colors',
          active ? 'bg-brand-500 text-white' : 'text-ink-soft group-hover:bg-brand-50 group-hover:text-brand-600',
        )}
      >
        <Icon name={item.icon} size={18} />
      </span>
      <span className="flex-1">{item.label}</span>
      {item.badge && (
        <span
          className={cn(
            'rounded-md px-1.5 py-0.5 text-[10px] font-semibold',
            active ? 'bg-brand-100 text-brand-700' : 'bg-surface-soft text-ink-faint',
          )}
        >
          {item.badge}
        </span>
      )}
    </>
  )

  if (disabled) {
    return (
      <div className="group flex cursor-not-allowed items-center gap-3 rounded-2xl px-2.5 py-1.5 text-sm font-medium text-ink-faint/70">
        {inner(false)}
      </div>
    )
  }

  return (
    <NavLink
      to={item.to}
      end={item.to === '/'}
      className={({ isActive }) =>
        cn(
          'group relative flex items-center gap-3 rounded-2xl px-2.5 py-1.5 text-sm font-medium transition-colors',
          isActive ? 'bg-brand-50/70 text-ink' : 'text-ink-soft hover:text-ink',
        )
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <span className="absolute -left-3 top-1/2 h-7 w-1.5 -translate-y-1/2 rounded-r-full bg-brand-500" />
          )}
          {inner(isActive)}
        </>
      )}
    </NavLink>
  )
}

function GroupLabel({ children }) {
  return <div className="px-3 pb-2 pt-5 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-faint">{children}</div>
}

export default function Sidebar() {
  return (
    <aside className="flex h-full w-[268px] shrink-0 flex-col border-r border-line bg-surface px-4 py-5">
      <Logo />

      <nav className="mt-3 flex-1 overflow-y-auto pr-1">
        <GroupLabel>Menu</GroupLabel>
        <div className="space-y-1">
          {nav.menu.map((item) => (
            <Item key={item.id} item={item} />
          ))}
        </div>

        <GroupLabel>General</GroupLabel>
        <div className="space-y-1">
          {nav.general.map((item) => (
            <Item key={item.id} item={item} disabled />
          ))}
        </div>
      </nav>

      {/* promo card pinned to bottom (Donezo pattern) */}
      <div className="relative mt-4 overflow-hidden rounded-3xl bg-brand-800 bg-wave p-4 text-white">
        <span className="grid size-9 place-items-center rounded-xl bg-white/15">
          <Icon name="sparkles" size={18} strokeWidth={2} />
        </span>
        <div className="mt-3 text-sm font-semibold leading-snug">
          Ask PipeTec IQ Copilot
        </div>
        <p className="mt-1 text-xs text-white/70">Get an instant AI brief on plant health & risk.</p>
        <button className="mt-3 w-full rounded-xl bg-white py-2 text-xs font-semibold text-brand-700 transition hover:bg-brand-50">
          Open Copilot
        </button>
      </div>
    </aside>
  )
}
