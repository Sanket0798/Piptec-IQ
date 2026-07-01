// Shared chart palette + helpers so every Recharts component stays on-brand.

export const C = {
  brand: '#2b76b3',
  brandBright: '#5ea2d5',
  brandSoft: '#bedcf1',
  brandFaint: '#dbebf8',
  ink: '#1b211c',
  inkSoft: '#5b6660',
  inkFaint: '#909a93',
  line: '#e6e9e3',
  warn: '#d9962a',
  danger: '#d8554f',
  ok: '#1f9d57',
  grid: '#eef1ec',
}

export const axisProps = {
  tick: { fill: C.inkFaint, fontSize: 11, fontWeight: 500 },
  axisLine: false,
  tickLine: false,
}

export function TooltipShell({ active, payload, label, render }) {
  if (!active || !payload || !payload.length) return null
  return (
    <div className="rounded-xl border border-line bg-white/95 px-3 py-2 text-xs shadow-lg backdrop-blur">
      {label != null && <div className="mb-1 font-semibold text-ink">{label}</div>}
      {render ? render(payload) : (
        <div className="space-y-0.5">
          {payload.map((p, i) => (
            <div key={i} className="flex items-center gap-2 text-ink-soft">
              <span className="size-2 rounded-full" style={{ background: p.color || p.fill }} />
              <span>{p.name}</span>
              <span className="ml-auto font-semibold text-ink">{p.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
