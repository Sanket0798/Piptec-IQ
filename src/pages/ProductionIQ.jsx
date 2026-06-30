import PageHeader, { Button } from '../components/layout/PageHeader'
import ExecutiveBrief from '../components/ExecutiveBrief'
import Card from '../components/ui/Card'
import Icon from '../components/Icon'
import AnimatedCounter from '../components/ui/AnimatedCounter'
import PillBarChart from '../components/charts/PillBarChart'
import ScenarioSimulator from '../components/prod/ScenarioSimulator'
import MachineLineStatus from '../components/prod/MachineLineStatus'
import JobQueueTable from '../components/prod/JobQueueTable'
import { cn } from '../lib/format'
import * as d from '../data/productionIQ'

function KpiStat({ k }) {
  const tone = {
    ink: 'text-ink',
    warn: 'text-warn',
    danger: 'text-danger',
    ok: 'text-ok',
  }[k.tone]
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-ink-faint">{k.label}</span>
        <Icon name={k.icon} size={16} className={cn(k.tone === 'danger' ? 'text-danger' : 'text-brand-500')} />
      </div>
      <div className={cn('mt-2 text-2xl font-bold', tone)}><AnimatedCounter value={k.value} /></div>
      <div className="text-xs text-ink-faint">{k.sub}</div>
    </Card>
  )
}

export default function ProductionIQ() {
  return (
    <div className="animate-fade-up">
      <PageHeader
        breadcrumb="Production IQ"
        title="Production IQ"
        subtitle="Production planning, capacity, bottlenecks and predictive delivery forecasting."
        actions={<Button variant="outline" icon="target">Find bottleneck</Button>}
      />

      <ExecutiveBrief
        audience="Production IQ · for operations & plant management"
        what="A smart production planner that watches every job and predicts which orders are going to be late."
        why="We fix delays before the deadline — when it's still cheap and easy — instead of reacting once it's too late."
        stats={[
          { value: '72% → 34%', label: 'risk cut by one 2-hour shift' },
          { value: '~1.4 days', label: 'flow time recoverable' },
          { value: 'Per-job', label: 'delay risk, ranked' },
        ]}
      />

      {/* KPI tiles */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {d.kpis.map((k) => (
          <KpiStat key={k.id} k={k} />
        ))}
      </div>

      <div className="mt-4">
        <ScenarioSimulator />
      </div>

      {/* machine status + WIP/bottleneck */}
      <div className="mt-4 grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <MachineLineStatus lines={d.machineLines} />
        <div className="space-y-4">
          <Card className="p-5">
            <h3 className="font-semibold text-ink">Work-in-Progress by Stage</h3>
            <p className="mt-0.5 text-xs text-ink-faint">Jobs per stage</p>
            <div className="mt-2">
              <PillBarChart data={d.wipByStage} height={200} max={8} />
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center gap-2">
              <span className="grid size-8 place-items-center rounded-lg bg-[#fbeceb] text-danger">
                <Icon name="alert" size={16} />
              </span>
              <div>
                <h3 className="font-semibold text-ink">Bottleneck Detection</h3>
                <p className="text-xs text-ink-faint">AI flagged</p>
              </div>
            </div>
            <div className="mt-4 rounded-2xl border border-line bg-surface-soft p-4">
              <div className="flex items-center gap-1.5 text-sm font-semibold text-ink">
                <Icon name="sparkles" size={15} strokeWidth={2} className="text-brand-600" />
                {d.bottleneck.title}
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{d.bottleneck.body}</p>
            </div>
          </Card>
        </div>
      </div>

      <div className="mt-4">
        <JobQueueTable jobs={d.jobQueue} />
      </div>
    </div>
  )
}
