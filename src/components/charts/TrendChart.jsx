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

// Output vs plan/target line chart (Production Trend).
export default function TrendChart({ data, height = 200 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 10, right: 8, bottom: 0, left: -18 }}>
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
          stroke={C.brand}
          strokeWidth={2.5}
          dot={{ r: 3, fill: C.brand, strokeWidth: 0 }}
          activeDot={{ r: 5 }}
          name="Output"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
