import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  ReferenceLine,
} from 'recharts'
import { C, axisProps, TooltipShell } from './chartTheme'
import ChartReveal from './ChartReveal'

// Predictive output forecast: 7-day history line + 5-day projection with a confidence band.
export default function ForecastChart({ data, splitLabel = 'Sun' }) {
  // Recharts stacks the band as [low, high-low] so we precompute the delta.
  const rows = data.map((d) => ({
    ...d,
    bandBase: d.low ?? null,
    bandSpan: d.low != null && d.high != null ? d.high - d.low : null,
  }))

  return (
    <ChartReveal height={240}>
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={rows} margin={{ top: 10, right: 8, bottom: 0, left: -18 }}>
        <defs>
          <linearGradient id="histFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={C.brand} stopOpacity={0.18} />
            <stop offset="100%" stopColor={C.brand} stopOpacity={0} />
          </linearGradient>
          {/* logo gradient for the line stroke: navy (start) → blue → teal (end) */}
          <linearGradient id="lineBrandFc" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#004068" />
            <stop offset="50%" stopColor="#1870b8" />
            <stop offset="100%" stopColor="#00a098" />
          </linearGradient>
        </defs>
        <CartesianGrid stroke={C.grid} vertical={false} />
        <XAxis dataKey="label" {...axisProps} />
        <YAxis {...axisProps} width={40} />
        <Tooltip content={<TooltipShell />} cursor={{ stroke: C.brandSoft, strokeDasharray: 4 }} />
        <ReferenceLine x={splitLabel} stroke={C.line} strokeDasharray="4 4" />

        {/* confidence band */}
        <Area dataKey="bandBase" stackId="band" stroke="none" fill="transparent" isAnimationActive={false} name="" />
        <Area
          dataKey="bandSpan"
          stackId="band"
          stroke="none"
          fill={C.brandBright}
          fillOpacity={0.16}
          isAnimationActive={false}
          name="Confidence"
        />

        <Area
          type="monotone"
          dataKey="actual"
          stroke="url(#lineBrandFc)"
          strokeWidth={3}
          fill="url(#histFill)"
          dot={false}
          name="Actual"
        />
        <Line
          type="monotone"
          dataKey="forecast"
          stroke={C.brandBright}
          strokeWidth={2.5}
          strokeDasharray="5 4"
          dot={{ r: 3, fill: C.brandBright, strokeWidth: 0 }}
          name="Forecast"
        />
      </ComposedChart>
    </ResponsiveContainer>
    </ChartReveal>
  )
}
