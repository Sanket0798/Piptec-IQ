import { useState } from 'react'
import Icon from '../Icon'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import ProgressBar from '../ui/ProgressBar'
import SectionHeading from '../ui/SectionHeading'
import { money, riskTone, cn } from '../../lib/format'

function OrderRow({ order, applied, onApply }) {
  const [open, setOpen] = useState(order.risk >= 70)
  const tone = riskTone(applied ? 33 : order.risk)

  return (
    <div className="rounded-2xl border border-line transition hover:border-brand-200">
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-center gap-4 p-4 text-left">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-ink">{order.id}</span>
            <span className="text-ink-faint">·</span>
            <span className="truncate text-sm text-ink-soft">{order.customer}</span>
          </div>
          <div className="mt-0.5 truncate text-xs text-ink-faint">{order.spec}</div>
        </div>
        <div className="hidden text-right sm:block">
          <div className="text-xs text-ink-faint">Rev. at risk</div>
          <div className="font-semibold text-ink">{money(order.revenue)}</div>
        </div>
        <Badge tone={tone} dot>
          {applied ? '33%' : `${order.risk}%`} risk
        </Badge>
        <Icon name="chevronDown" size={18} className={cn('text-ink-faint transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <div className="space-y-3 border-t border-line-soft px-4 pb-4 pt-3">
          <div>
            <div className="mb-1 flex items-center justify-between text-xs text-ink-faint">
              <span>{order.status}</span>
              <span>{applied ? 'mitigation applied' : 'on track to slip'}</span>
            </div>
            <ProgressBar value={applied ? 33 : order.risk} tone={tone} />
          </div>
          <div className="rounded-xl bg-brand-50/60 p-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-700">
              <Icon name="sparkles" size={13} strokeWidth={2} />
              Recommended mitigation
            </div>
            <p className="mt-1 text-sm text-ink-soft">{order.mitigation}</p>
          </div>
          <button
            onClick={() => onApply(order.id)}
            disabled={applied}
            className={cn(
              'inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-semibold transition',
              applied
                ? 'cursor-default bg-brand-50 text-brand-600'
                : 'bg-brand-500 text-white hover:bg-brand-600',
            )}
          >
            <Icon name={applied ? 'check' : 'sparkles'} size={15} strokeWidth={2} />
            {applied ? 'Mitigation applied' : 'Apply mitigation'}
          </button>
        </div>
      )}
    </div>
  )
}

export default function OrdersAtRisk({ orders }) {
  const [applied, setApplied] = useState({})
  return (
    <Card className="p-5">
      <SectionHeading
        icon="alert"
        title="Orders at Risk"
        subtitle="Click a row to expand mitigation — apply to protect revenue"
      />
      <div className="mt-4 space-y-3">
        {orders.map((o) => (
          <OrderRow key={o.id} order={o} applied={!!applied[o.id]} onApply={(id) => setApplied((s) => ({ ...s, [id]: true }))} />
        ))}
      </div>
    </Card>
  )
}
