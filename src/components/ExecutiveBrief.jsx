import { useState } from 'react'
import Card from './ui/Card'
import Icon from './Icon'
import { Button } from './layout/PageHeader'
import { cn } from '../lib/format'

// The "Executive Brief" presenter banner shown atop each microapp.
export default function ExecutiveBrief({ audience, what, why, stats = [] }) {
  const [open, setOpen] = useState(false)

  return (
    <Card className="mb-5 overflow-hidden">
      {/* Header — always visible, acts as toggle */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-3 px-5 py-3 text-left transition"
      >
        <div className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-lg bg-brand-50 text-brand-600">
            <Icon name="monitor" size={16} />
          </span>
          <span className="text-sm font-semibold text-ink">Executive Brief</span>
          <span className="hidden text-xs text-ink-faint sm:inline">· Presenter mode — give the quick intro, then start the demo.</span>
        </div>
        <Icon
          name="chevronDown"
          size={18}
          className={cn('text-ink-faint transition-transform duration-300', open && 'rotate-180')}
        />
      </button>

      {/* Collapsible body */}
      <div
        className={cn(
          'grid transition-[grid-template-rows,opacity] duration-400 ease-in-out',
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
        )}
      >
        <div className="overflow-hidden">
          <div className="border-t border-line-soft">
            <div className="grid gap-6 p-6 lg:grid-cols-[1.6fr_1fr]">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-600">
                  <Icon name="sparkles" size={13} strokeWidth={2} />
                  {audience}
                </span>
                <h3 className="mt-4 text-2xl font-bold leading-snug tracking-tight text-ink">{what}</h3>
                <div className="mt-4">
                  <div className="text-xs font-semibold uppercase tracking-wide text-ink-faint">Why it matters</div>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft">{why}</p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                {stats.map((s, i) => (
                  <div key={i} className="rounded-2xl border border-line bg-surface-soft px-4 py-3">
                    <div className="text-xl font-bold text-brand-600">{s.value}</div>
                    <div className="text-xs text-ink-soft">{s.label}</div>
                  </div>
                ))}
                <Button icon="play" className="mt-auto justify-center">Start the demo</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
