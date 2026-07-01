import { useMemo, useState } from 'react'
import Card from '../ui/Card'
import Icon from '../Icon'
import SectionHeading from '../ui/SectionHeading'
import ProgressBar from '../ui/ProgressBar'
import { money, cn } from '../../lib/format'
import { scenarioOrders, scenarioLines } from '../../data/productionIQ'

function Toggle({ checked, onChange, title, subtitle }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between gap-3 rounded-2xl border border-line p-3 text-left transition hover:border-brand-200"
    >
      <div>
        <div className="text-sm font-medium text-ink">{title}</div>
        <div className="text-xs text-ink-faint">{subtitle}</div>
      </div>
      <span className={cn('relative h-6 w-11 shrink-0 rounded-full transition-colors', checked ? 'bg-brand-500' : 'bg-line')}>
        <span className={cn('absolute top-0.5 size-5 rounded-full bg-white shadow transition-all', checked ? 'left-[22px]' : 'left-0.5')} />
      </span>
    </button>
  )
}

// What-if scenario simulator — recomputes delay risk & revenue protected live.
export default function ScenarioSimulator() {
  const [orderId, setOrderId] = useState(scenarioOrders[0].id)
  const [lineId, setLineId] = useState(scenarioLines[0].id)
  const [hours, setHours] = useState(2)
  const [ndtShift, setNdtShift] = useState(false)
  const [resequence, setResequence] = useState(false)

  const order = scenarioOrders.find((o) => o.id === orderId)
  const line = scenarioLines.find((l) => l.id === lineId)

  const projected = useMemo(() => {
    let risk = order.baselineRisk
    risk -= hours * line.effPerHour // added hours reduce risk
    if (ndtShift) risk -= 12 // relieving the inspection bottleneck
    if (resequence) risk -= 6
    return Math.max(4, Math.round(risk))
  }, [order, line, hours, ndtShift, resequence])

  const protectedRev = Math.round((order.baselineRisk - projected) / order.baselineRisk * order.revenue)

  return (
    <Card className="p-5">
      <SectionHeading
        icon="sparkles"
        title="What-if Scenario Simulator"
        subtitle="Choose an intervention and see the predicted impact in real time"
      />

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        {/* controls */}
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink-faint">Order to protect</label>
            <div className="relative">
              <select
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="w-full appearance-none rounded-2xl border border-line bg-surface px-4 py-3 text-sm font-medium text-ink outline-none transition focus:border-brand-300 focus:ring-2 focus:ring-brand-100"
              >
                {scenarioOrders.map((o) => (
                  <option key={o.id} value={o.id}>{o.label} ({o.baselineRisk}% risk)</option>
                ))}
              </select>
              <Icon name="chevronDown" size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-faint" />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink-faint">Add hours on line</label>
            <div className="relative">
              <select
                value={lineId}
                onChange={(e) => setLineId(e.target.value)}
                className="w-full appearance-none rounded-2xl border border-line bg-surface px-4 py-3 text-sm font-medium text-ink outline-none transition focus:border-brand-300 focus:ring-2 focus:ring-brand-100"
              >
                {scenarioLines.map((l) => (
                  <option key={l.id} value={l.id}>{l.label}</option>
                ))}
              </select>
              <Icon name="chevronDown" size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-faint" />
            </div>
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="text-xs font-medium text-ink-faint">Additional hours today</label>
              <span className="text-sm font-bold text-brand-600">+{hours}h</span>
            </div>
            <input
              type="range"
              min={0}
              max={6}
              step={1}
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              className="w-full accent-brand-500"
            />
            <div className="mt-1 flex justify-between text-[11px] text-ink-faint">
              {[0, 1, 2, 3, 4, 5, 6].map((n) => <span key={n}>{n}</span>)}
            </div>
          </div>

          <Toggle checked={ndtShift} onChange={setNdtShift} title="Add 2nd NDT inspection shift" subtitle="Relieves the inspection bottleneck (+capacity)" />
          <Toggle checked={resequence} onChange={setResequence} title="Resequence bend queue" subtitle="Prioritise this order ahead of others" />
        </div>

        {/* live results */}
        <div className="flex flex-col gap-4 rounded-3xl bg-surface-soft p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-medium uppercase tracking-wide text-ink-faint">Baseline</div>
              <div className="text-3xl font-bold text-danger">{order.baselineRisk}%</div>
            </div>
            <Icon name="arrowRight" size={22} className="text-ink-faint" />
            <div className="text-right">
              <div className="text-xs font-medium uppercase tracking-wide text-ink-faint">Projected</div>
              <div className="text-3xl font-bold text-warn">{projected}%</div>
              <div className="text-xs font-medium text-brand-600">-{order.baselineRisk - projected} pts</div>
            </div>
          </div>
          <ProgressBar value={projected} tone={projected >= 60 ? 'danger' : projected >= 30 ? 'warn' : 'ok'} height="h-2.5" />

          <div className="rounded-2xl card-gradient p-4 text-white">
            <div className="text-xs font-medium uppercase tracking-wide text-white/70">Revenue protected</div>
            <div className="text-3xl font-bold">{money(protectedRev)}</div>
            <div className="text-xs text-white/70">of {money(order.revenue)} at risk</div>
          </div>

          <div className="rounded-2xl border border-line bg-surface p-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-700">
              <Icon name="sparkles" size={13} strokeWidth={2} /> AI scenario insight
            </div>
            <p className="mt-1 text-xs leading-relaxed text-ink-soft">
              Running {line.label.split(' · ')[0]} for {hours} additional hour{hours === 1 ? '' : 's'} today
              {ndtShift ? ', plus a 2nd NDT shift,' : ''} is predicted to cut {order.id} delivery risk from{' '}
              {order.baselineRisk}% to {projected}% and protect {money(protectedRev)} of revenue-at-risk.
            </p>
          </div>

          <button className="rounded-2xl btn-gradient py-3 text-sm font-semibold text-white">
            <Icon name="sparkles" size={15} strokeWidth={2} className="mr-1.5 inline" />
            Apply scenario
          </button>
        </div>
      </div>
    </Card>
  )
}
