// SVG radial gauge with a gradient arc. Supports a full ring or a 270° dial.
// Pure SVG (no Recharts) for precise control over the centered label.
export default function RadialGauge({
  value = 0,
  max = 100,
  size = 168,
  thickness = 14,
  label,
  caption,
  sweep = 360,
}) {
  const radius = (size - thickness) / 2
  const cx = size / 2
  const cy = size / 2
  const startAngle = sweep === 360 ? -90 : 135 // top for full ring, lower-left for dial
  const frac = Math.min(1, Math.max(0, value / max))

  const polar = (angleDeg, r = radius) => {
    const a = (angleDeg * Math.PI) / 180
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)]
  }

  const arcPath = (fromFrac, toFrac) => {
    const a0 = startAngle + fromFrac * sweep
    const a1 = startAngle + toFrac * sweep
    const [x0, y0] = polar(a0)
    const [x1, y1] = polar(a1)
    const large = a1 - a0 > 180 ? 1 : 0
    return `M ${x0} ${y0} A ${radius} ${radius} 0 ${large} 1 ${x1} ${y1}`
  }

  const gid = `gauge-${Math.round(value)}-${size}`

  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-0">
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3fa873" />
            <stop offset="100%" stopColor="#1f7a4d" />
          </linearGradient>
        </defs>
        <path d={arcPath(0, 1)} fill="none" stroke="#eef1ec" strokeWidth={thickness} strokeLinecap="round" />
        <path
          d={arcPath(0, frac)}
          fill="none"
          stroke={`url(#${gid})`}
          strokeWidth={thickness}
          strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 0.8s ease' }}
        />
      </svg>
      <div className="absolute inset-0 grid place-content-center text-center">
        <div className="text-4xl font-bold leading-none text-ink">{label ?? value}</div>
        {caption && <div className="mt-1 text-[11px] font-medium uppercase tracking-wide text-ink-faint">{caption}</div>}
      </div>
    </div>
  )
}
