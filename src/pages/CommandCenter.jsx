import PageHeader, { Button } from '../components/layout/PageHeader'
import ExecutiveBrief from '../components/ExecutiveBrief'
import Card from '../components/ui/Card'
import KpiTile from '../components/ui/KpiTile'
import AnimatedCounter from '../components/ui/AnimatedCounter'
import AnimatedGroup from '../components/ui/AnimatedGroup'
import Badge from '../components/ui/Badge'
import AiChip from '../components/ui/AiChip'
import Icon from '../components/Icon'
import RadialGauge from '../components/charts/RadialGauge'
import ForecastChart from '../components/charts/ForecastChart'
import TrendChart from '../components/charts/TrendChart'
import DefectsChart from '../components/charts/DefectsChart'
import PillBarChart from '../components/charts/PillBarChart'
import GroupedBarChart from '../components/charts/GroupedBarChart'
import OrdersAtRisk from '../components/cc/OrdersAtRisk'
import AiRecommendations from '../components/cc/AiRecommendations'
import CriticalAlerts from '../components/cc/CriticalAlerts'
import { money } from '../lib/format'
import * as d from '../data/commandCenter'

function ChartCard({ title, subtitle, badge, children, className = '' }) {
  return (
    <Card className={`p-5 ${className}`}>
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-ink">{title}</h3>
          {subtitle && <p className="mt-0.5 text-xs text-ink-faint">{subtitle}</p>}
        </div>
        {badge}
      </div>
      {children}
    </Card>
  )
}

export default function CommandCenter() {
  return (
    <div className="animate-page-enter">
      <PageHeader
        breadcrumb="Command Center"
        title="Command Center"
        subtitle="Executive intelligence — plant health, revenue-at-risk and the AI decision brief for leadership."
        live="Live · 05:22:51 PM"
        actions={
          <>
            <Button variant="outline" icon="target">Top 5 for CEO</Button>
            <Button icon="sparkles">Ask Copilot</Button>
          </>
        }
      />

      <ExecutiveBrief
        audience="Command Center · for CEO & executive team"
        what="The executive home screen — one page showing how healthy the plant is and where the money is at risk, right now."
        why="It replaces hours of pulling reports with a single live view, so leadership can act while there is still time to fix things."
        stats={[
          { value: 'Minutes', label: 'not hours, to the full picture' },
          { value: '$1.24M', label: 'top single-order exposure surfaced' },
          { value: 'Top 5', label: 'decisions ranked for you' },
        ]}
      />

      {/* overview KPI strip */}
      <AnimatedGroup className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KpiTile hero label="Plant Health Score" value="79" sub="composite index" icon="shield" delta="+4" />
        <KpiTile label="Orders at Risk" value="2" sub="this week" icon="alert" tone="warn" />
        <KpiTile label="Revenue at Risk" value="$2.35M" sub="exposure" icon="trendingDown" tone="danger" />
        <KpiTile label="Fleet Utilization" value="74%" sub="6 assets" icon="gauge" />
      </AnimatedGroup>

      {/* health gauge + AI brief */}
      <div className="mt-4 grid gap-4 lg:grid-cols-[340px_1fr]">
        <Card className="flex flex-col items-center justify-center p-6">
          <RadialGauge value={d.plantHealth.score} caption="Plant Health" />
          <div className="mt-4 grid w-full grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-lg font-bold text-ink">{d.plantHealth.onTimeForecast}%</div>
              <div className="text-[11px] text-ink-faint">On-time fc.</div>
            </div>
            <div>
              <div className="text-lg font-bold text-ink">{d.plantHealth.fleetUtilization}%</div>
              <div className="text-[11px] text-ink-faint">Fleet util.</div>
            </div>
            <div>
              <div className="text-lg font-bold text-ink">{d.plantHealth.sustainability}</div>
              <div className="text-[11px] text-ink-faint">Sustain.</div>
            </div>
          </div>
        </Card>

        <Card className="relative overflow-hidden p-6">
          <div className="flex items-center justify-between">
            <AiChip>Today's AI Brief</AiChip>
            <span className="text-xs text-ink-faint">{d.aiBrief.date}</span>
          </div>
          <p className="mt-4 flex items-start gap-2 text-lg font-semibold leading-snug tracking-tight text-ink">
            <Icon name="alert" size={20} className="mt-1 shrink-0 text-warn" />
            {d.aiBrief.headline}
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{d.aiBrief.body}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {d.aiBrief.chips.map((c) => (
              <button key={c} className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-medium text-ink-soft transition hover:border-brand-200 hover:text-brand-600">
                {c}
              </button>
            ))}
          </div>
        </Card>
      </div>

      {/* secondary KPI tiles */}
      <AnimatedGroup className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {d.kpis.map((k) => {
          const iconBg = {
            ink: 'bg-brand-50 text-brand-600',
            ok: 'bg-[#ecf7f0] text-ok',
            warn: 'bg-[#fdf5e6] text-warn',
            danger: 'bg-[#fbeceb] text-danger',
          }[k.tone]

          return (
            <Card key={k.id} className="p-4">
              <div className="flex items-center gap-2">
                <span className={`grid size-7 place-items-center rounded-lg ${iconBg} ${k.tone === 'danger' ? 'animate-pulse-soft' : ''}`}>
                  <Icon name={k.icon} size={14} />
                </span>
                <span className="text-xs font-medium text-ink-faint">{k.label}</span>
              </div>
              <div className={`mt-2 text-2xl font-bold ${k.tone === 'danger' ? 'text-danger' : k.tone === 'warn' ? 'text-warn' : k.tone === 'ok' ? 'text-ok' : 'text-ink'}`}>
                <AnimatedCounter value={k.value} />
              </div>
            </Card>
          )
        })}
      </AnimatedGroup>

      {/* revenue at risk bar */}
      <Card className="mt-4 p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-[#fbeceb] text-danger">
              <Icon name="trendingDown" size={20} />
            </span>
            <div>
              <div className="text-xs font-medium uppercase tracking-wide text-ink-faint">Revenue at risk this week</div>
              <div className="text-2xl font-bold text-danger">{money(d.revenueAtRisk.exposure)}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs font-medium uppercase tracking-wide text-ink-faint">Protected by applied actions</div>
            <div className="text-2xl font-bold text-ink">{money(d.revenueAtRisk.protected, { decimals: 0 })}</div>
          </div>
        </div>
        <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-line-soft">
          <div className="h-full w-full rounded-full bg-linear-to-r from-danger/80 to-warn" />
        </div>
        <div className="mt-1.5 text-xs text-ink-faint">0% mitigated</div>
      </Card>

      {/* forecast + summary */}
      <div className="mt-4 grid gap-4 lg:grid-cols-[1.7fr_1fr]">
        <ChartCard
          title="Predictive Output Forecast"
          subtitle="Bends/day · 7-day history + 5-day AI projection with confidence band"
          badge={<Badge tone="info">68% confidence</Badge>}
        >
          <ForecastChart data={d.outputForecast} />
        </ChartCard>

        <Card className="p-5">
          <h3 className="font-semibold text-ink">Forecast Summary</h3>
          <p className="mt-0.5 text-xs text-ink-faint">Next 5 working days</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-surface-soft p-3">
              <div className="text-2xl font-bold text-ink">{d.forecastSummary.predictedOutput}</div>
              <div className="text-[11px] text-ink-faint">predicted output</div>
            </div>
            <div className="rounded-xl bg-surface-soft p-3">
              <div className="text-2xl font-bold text-danger">{d.forecastSummary.trend}%</div>
              <div className="text-[11px] text-ink-faint">vs last week</div>
            </div>
            <div className="rounded-xl bg-surface-soft p-3">
              <div className="text-2xl font-bold text-ink">{d.forecastSummary.confidence}%</div>
              <div className="text-[11px] text-ink-faint">model confidence</div>
            </div>
            <div className="rounded-xl bg-surface-soft p-3">
              <div className="text-2xl font-bold text-warn">{d.forecastSummary.outlook}</div>
              <div className="text-[11px] text-ink-faint">capacity outlook</div>
            </div>
          </div>
          <div className="mt-3 rounded-xl bg-brand-50/60 p-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-700">
              <Icon name="sparkles" size={13} strokeWidth={2} /> AI forecast
            </div>
            <p className="mt-1 text-xs leading-relaxed text-ink-soft">{d.forecastSummary.note}</p>
          </div>
        </Card>
      </div>

      {/* four analytics charts */}
      <AnimatedGroup className="mt-4 grid gap-4 lg:grid-cols-2">
        <ChartCard title="Production Trend" subtitle="Output vs plan/target — week">
          <TrendChart data={d.productionTrend} />
        </ChartCard>
        <ChartCard title="Quality Defects Trend" subtitle="Defect & rework rate (6 weeks)">
          <DefectsChart data={d.defectsTrend} />
        </ChartCard>
        <ChartCard title="Machine Utilization" subtitle="By asset, today">
          <PillBarChart data={d.machineUtil} unit="%" max={100} />
        </ChartCard>
        <ChartCard title="Delivery Risk Forecast" subtitle="Orders by risk band (4 weeks)">
          <GroupedBarChart data={d.deliveryRisk} />
        </ChartCard>
      </AnimatedGroup>

      {/* orders + recommendations/alerts */}
      <div className="mt-4 grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <OrdersAtRisk orders={d.ordersAtRisk} />
        <div className="space-y-4">
          <AiRecommendations items={d.aiRecommendations} />
          <CriticalAlerts alerts={d.criticalAlerts} />
        </div>
      </div>
    </div>
  )
}
