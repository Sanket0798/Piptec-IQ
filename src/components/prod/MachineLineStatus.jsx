import Card from '../ui/Card'
import Badge from '../ui/Badge'
import ProgressBar from '../ui/ProgressBar'
import SectionHeading from '../ui/SectionHeading'
import Icon from '../Icon'

const STATUS = {
  running: { label: 'Running', tone: 'ok' },
  idle: { label: 'Idle', tone: 'neutral' },
  bottleneck: { label: 'Bottleneck', tone: 'danger' },
}

function utilTone(util, status) {
  if (status === 'bottleneck' || util >= 95) return 'danger'
  if (util < 40) return 'muted'
  return 'brand'
}

export default function MachineLineStatus({ lines }) {
  return (
    <Card className="p-5">
      <SectionHeading icon="cpu" title="Machine Line Status" subtitle="Live utilization, idle time & cycle health" />
      <div className="mt-4 space-y-3">
        {lines.map((m) => {
          const s = STATUS[m.status]
          return (
            <div key={m.id} className="rounded-2xl border border-line p-4 transition hover:border-brand-200">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <div className="font-semibold text-ink">{m.name}</div>
                  <div className="text-xs text-ink-faint">{m.type} · OEE {m.oee}% · health {m.health}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge tone={s.tone} dot>{s.label}</Badge>
                  {m.flags.map((f) => (
                    <Badge key={f} tone={f === 'Underutilized' ? 'warn' : 'danger'}>{f}</Badge>
                  ))}
                </div>
              </div>
              <div className="mt-3 flex items-center gap-4">
                <div className="flex-1">
                  <ProgressBar value={m.util} tone={utilTone(m.util, m.status)} />
                </div>
                <div className="shrink-0 text-right text-xs text-ink-soft">
                  <span className="font-semibold text-ink">{m.util}%</span> util · {m.idle}h idle
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-xs text-ink-faint">
                <Icon name="chevronRight" size={13} />
                {m.note}
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
