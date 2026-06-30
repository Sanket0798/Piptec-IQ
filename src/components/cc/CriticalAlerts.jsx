import Icon from '../Icon'
import Card from '../ui/Card'
import SectionHeading from '../ui/SectionHeading'

export default function CriticalAlerts({ alerts }) {
  return (
    <Card className="p-5">
      <SectionHeading icon="alert" title="Critical Alerts" subtitle="Anomalies detected" />
      <div className="mt-4 space-y-3">
        {alerts.map((a) => (
          <div key={a.id} className="rounded-2xl border border-line bg-surface-soft/60 p-4">
            <div className="flex items-start gap-2.5">
              <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg bg-[#fbeceb] text-danger">
                <Icon name="alert" size={15} strokeWidth={2} />
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-ink">{a.title}</h4>
                  <span className="rounded-md bg-surface px-1.5 py-0.5 text-[10px] font-medium text-ink-faint">{a.source}</span>
                </div>
                <p className="mt-0.5 text-xs text-ink-soft">{a.detail}</p>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {a.actions.map((act, i) => (
                <button
                  key={i}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-2.5 py-1.5 text-xs font-medium text-ink-soft transition hover:border-brand-200 hover:text-brand-600"
                >
                  <Icon name="wrench" size={12} strokeWidth={2} />
                  {act}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
