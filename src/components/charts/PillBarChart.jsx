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

const TONE_COLORS = {
  brand: C.brand,
  brandBright: C.brandBright,
  muted: C.brandFaint,
  danger: C.danger,
  warn: C.warn,
}

// Donezo-style rounded "pill" bar chart. Each datum can carry a `tone`.
export default function PillBarChart({ data, height = 220, unit = '', max }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 10, right: 8, bottom: 0, left: -22 }} barCategoryGap="28%">
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
            <Cell key={i} fill={TONE_COLORS[d.tone] || C.brand} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
