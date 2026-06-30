import Icon from '../Icon'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import SectionHeading from '../ui/SectionHeading'
import { STATUS_TONE } from '../../lib/format'

export default function AiRecommendations({ items }) {
  return (
    <Card className="p-5">
      <SectionHeading icon="sparkles" title="AI Recommendations" subtitle="Highest leverage actions, ranked" />
      <div className="mt-4 space-y-3">
        {items.map((r) => {
          const t = STATUS_TONE[r.priority] || { label: r.priority, tone: 'neutral' }
          return (
            <div key={r.id} className="rounded-2xl border border-line p-4 transition hover:border-brand-200">
              <div className="flex items-start justify-between gap-3">
                <h4 className="font-semibold text-ink">{r.title}</h4>
                <Badge tone={t.tone}>{t.label}</Badge>
              </div>
              <p className="mt-1.5 text-sm text-ink-soft">{r.body}</p>
              <div className="mt-3 flex items-center gap-1.5 rounded-xl bg-brand-50/60 px-3 py-2 text-xs font-medium text-brand-700">
                <Icon name="arrowUpRight" size={13} strokeWidth={2} />
                {r.impact}
              </div>
              <div className="mt-2 text-[11px] font-medium uppercase tracking-wide text-ink-faint">{r.app}</div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
