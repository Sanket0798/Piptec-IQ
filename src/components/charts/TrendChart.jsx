import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { C, axisProps, TooltipShell } from './chartTheme'
import ChartReveal from './ChartReveal'

// Output vs plan/target line chart (Production Trend).
export default function TrendChart({ data, height = 200 }) {
  return (
    <ChartReveal height={height}>
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 10, right: 8, bottom: 0, left: -18 }}>
        <defs>
          {/* logo gradient for the line stroke: navy (start) → blue → teal (end) */}
          <linearGradient id="lineBrandTrend" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#004068" />
            <stop offset="50%" stopColor="#1870b8" />
            <stop offset="100%" stopColor="#00a098" />
          </linearGradient>
        </defs>
        <CartesianGrid stroke={C.grid} vertical={false} />
        <XAxis dataKey="label" {...axisProps} />
        <YAxis {...axisProps} width={40} />
        <Tooltip content={<TooltipShell />} cursor={{ stroke: C.brandSoft, strokeDasharray: 4 }} />
        <Line
          type="monotone"
          dataKey="plan"
          stroke={C.inkFaint}
          strokeWidth={1.5}
          strokeDasharray="5 4"
          dot={false}
          name="Plan"
        />
        <Line
          type="monotone"
          dataKey="output"
          stroke="url(#lineBrandTrend)"
          strokeWidth={3}
          dot={{ r: 3, fill: '#1870b8', strokeWidth: 0 }}
          activeDot={{ r: 5 }}
          name="Output"
        />
      </LineChart>
    </ResponsiveContainer>
    </ChartReveal>
  )
}
