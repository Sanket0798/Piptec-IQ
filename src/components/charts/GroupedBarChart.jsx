import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { C, axisProps, TooltipShell } from './chartTheme'

// Delivery risk forecast — orders grouped by risk band per week.
export default function GroupedBarChart({ data, height = 220 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 10, right: 8, bottom: 0, left: -22 }} barCategoryGap="24%" barGap={3}>
        <CartesianGrid stroke={C.grid} vertical={false} />
        <XAxis dataKey="label" {...axisProps} />
        <YAxis {...axisProps} width={40} allowDecimals={false} />
        <Tooltip cursor={{ fill: 'rgba(43,118,179,0.06)' }} content={<TooltipShell />} />
        <Bar dataKey="low" name="Low" fill={C.ok} radius={[6, 6, 0, 0]} maxBarSize={14} />
        <Bar dataKey="med" name="Medium" fill={C.warn} radius={[6, 6, 0, 0]} maxBarSize={14} />
        <Bar dataKey="high" name="High" fill={C.danger} radius={[6, 6, 0, 0]} maxBarSize={14} />
      </BarChart>
    </ResponsiveContainer>
  )
}
