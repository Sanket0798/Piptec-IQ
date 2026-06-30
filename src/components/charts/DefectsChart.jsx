import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { C, axisProps, TooltipShell } from './chartTheme'

// Quality defect & rework rate over recent weeks.
export default function DefectsChart({ data, height = 200 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 10, right: 8, bottom: 0, left: -18 }}>
        <defs>
          <linearGradient id="defectFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={C.danger} stopOpacity={0.28} />
            <stop offset="100%" stopColor={C.danger} stopOpacity={0} />
          </linearGradient>
          <linearGradient id="reworkFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={C.warn} stopOpacity={0.28} />
            <stop offset="100%" stopColor={C.warn} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke={C.grid} vertical={false} />
        <XAxis dataKey="label" {...axisProps} />
        <YAxis {...axisProps} width={40} />
        <Tooltip content={<TooltipShell />} cursor={{ stroke: C.brandSoft, strokeDasharray: 4 }} />
        <Area type="monotone" dataKey="defect" stroke={C.danger} strokeWidth={2} fill="url(#defectFill)" name="Defect %" />
        <Area type="monotone" dataKey="rework" stroke={C.warn} strokeWidth={2} fill="url(#reworkFill)" name="Rework %" />
      </AreaChart>
    </ResponsiveContainer>
  )
}
