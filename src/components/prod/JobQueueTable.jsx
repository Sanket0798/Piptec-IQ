import Card from '../ui/Card'
import Badge from '../ui/Badge'
import ProgressBar from '../ui/ProgressBar'
import SectionHeading from '../ui/SectionHeading'
import { Button } from '../layout/PageHeader'
import Icon from '../Icon'
import { riskTone } from '../../lib/format'

export default function JobQueueTable({ jobs }) {
  return (
    <Card className="p-5">
      <SectionHeading
        icon="list"
        title="Job Queue & Delay Prediction"
        subtitle="Predicted delay risk and recommended resequencing"
        action={<Button variant="soft" icon="sparkles">Resequence</Button>}
      />
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-sm">
          <thead>
            <tr className="text-left text-[11px] font-semibold uppercase tracking-wide text-ink-faint">
              <th className="pb-3 pr-4 font-semibold">Job</th>
              <th className="pb-3 pr-4 font-semibold">Order / Customer</th>
              <th className="pb-3 pr-4 font-semibold">Stage</th>
              <th className="pb-3 pr-4 font-semibold">Progress</th>
              <th className="pb-3 pr-4 font-semibold">Cycle</th>
              <th className="pb-3 pr-4 font-semibold">Delay Risk</th>
              <th className="pb-3 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((j) => (
              <tr key={j.id} className="border-t border-line-soft transition hover:bg-surface-soft/60">
                <td className="py-3 pr-4 font-semibold text-brand-600">{j.id}</td>
                <td className="py-3 pr-4">
                  <div className="font-medium text-ink">{j.order}</div>
                  <div className="text-xs text-ink-faint">{j.customer}</div>
                </td>
                <td className="py-3 pr-4 text-ink-soft">{j.stage}</td>
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-2">
                    <div className="w-20"><ProgressBar value={j.progress} height="h-1.5" /></div>
                    <span className="text-xs text-ink-faint">{j.progress}%</span>
                  </div>
                </td>
                <td className="py-3 pr-4">
                  <span className={j.cycleWarn ? 'inline-flex items-center gap-1 text-warn' : 'text-ink-soft'}>
                    {j.cycle}
                    {j.cycleWarn && <Icon name="alert" size={12} strokeWidth={2} />}
                  </span>
                </td>
                <td className="py-3 pr-4">
                  <Badge tone={riskTone(j.risk)} dot>{j.risk}%</Badge>
                </td>
                <td className="py-3 text-xs font-medium text-ink-soft">{j.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
