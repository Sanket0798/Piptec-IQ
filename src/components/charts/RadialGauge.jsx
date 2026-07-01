import { useEffect, useRef, useState } from 'react'
import useInView from '../../lib/useInView'

// SVG radial gauge with animated arc draw and counter.
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
  const startAngle = sweep === 360 ? -90 : 135
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

  // Calculate arc length for dash animation
  const circumference = 2 * Math.PI * radius
  const arcLength = (frac * sweep / 360) * circumference

  const [dashOffset, setDashOffset] = useState(arcLength)
  const [displayValue, setDisplayValue] = useState(0)
  const rafRef = useRef(null)

  useEffect(() => {
    // Trigger arc animation
    const timeout = setTimeout(() => setDashOffset(0), 50)

    // Animate the number
    const duration = 1400
    const startTime = performance.now()
    const targetNum = typeof label === 'number' ? label : value

    const animate = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayValue(Math.round(eased * targetNum))

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      }
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      clearTimeout(timeout)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [value, label])

  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#004068" />
            <stop offset="50%" stopColor="#1870b8" />
            <stop offset="100%" stopColor="#00a098" />
          </linearGradient>
        </defs>
        {/* Background track */}
        <path d={arcPath(0, 1)} fill="none" stroke="#eef1ec" strokeWidth={thickness} strokeLinecap="round" />
        {/* Animated foreground arc */}
        <path
          d={arcPath(0, frac)}
          fill="none"
          stroke={`url(#${gid})`}
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeDasharray={arcLength}
          strokeDashoffset={dashOffset}
          style={{ transition: 'stroke-dashoffset 1.4s cubic-bezier(0.22, 1, 0.36, 1)' }}
        />
      </svg>
      <div className="absolute inset-0 grid place-content-center text-center">
        <div className="text-4xl font-bold leading-none text-ink">{displayValue}</div>
        {caption && <div className="mt-1 text-[11px] font-medium uppercase tracking-wide text-ink-faint">{caption}</div>}
      </div>
    </div>
  )
}
