import { useId } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from 'recharts'
import { C, axisProps, TooltipShell } from './chartTheme'
import ChartReveal from './ChartReveal'

// Donezo-style rounded "pill" bar chart. Each datum can carry a `tone`.
// Brand-toned bars use the logo gradient (navy base → blue → teal top);
// semantic tones (danger/warn/muted) stay solid so they keep their meaning.
export default function PillBarChart({ data, height = 220, unit = '', max }) {
  const gid = useId().replace(/:/g, '')
  const brandFill = `url(#pill-brand-${gid})`

  const toneColors = {
    brand: brandFill,
    brandBright: brandFill,
    muted: C.brandFaint,
    danger: C.danger,
    warn: C.warn,
  }

  return (
    <ChartReveal height={height}>
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 10, right: 8, bottom: 0, left: -22 }} barCategoryGap="28%">
        <defs>
          <linearGradient id={`pill-brand-${gid}`} x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#004068" />
            <stop offset="55%" stopColor="#1870b8" />
            <stop offset="100%" stopColor="#00a098" />
          </linearGradient>
        </defs>
        <CartesianGrid stroke={C.grid} vertical={false} />
        <XAxis dataKey="label" {...axisProps} interval={0} />
        <YAxis {...axisProps} width={40} domain={max ? [0, max] : undefined} />
        <Tooltip
          cursor={{ fill: 'rgba(43,118,179,0.06)' }}
          content={
            <TooltipShell
              render={(p) => (
                <div className="font-semibold text-ink">
                  {p[0].value}
                  {unit}
                </div>
              )}
            />
          }
        />
        <Bar dataKey="value" radius={[999, 999, 999, 999]} maxBarSize={26} isAnimationActive>
          {data.map((d, i) => (
            <Cell key={i} fill={toneColors[d.tone] || brandFill} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
    </ChartReveal>
  )
}
