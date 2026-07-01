import { useEffect, useRef, useState } from 'react'
import useInView from '../../lib/useInView'

/**
 * Animates a numeric value from 0 to target — but only once it scrolls into
 * view, so the count-up is actually seen by the user instead of running
 * silently on page load while off-screen.
 *
 * Usage: <AnimatedCounter value="$2.35M" duration={1200} />
 */
export default function AnimatedCounter({ value, duration = 1400, className = '' }) {
  const [ref, inView] = useInView({ threshold: 0.4 })
  const [display, setDisplay] = useState('')
  const rafRef = useRef(null)

  useEffect(() => {
    // Parse the value string to extract numeric portion, prefix, and suffix
    const str = String(value)
    const match = str.match(/^([^0-9]*?)([\d,.]+)(.*)$/)

    if (!match) {
      setDisplay(str)
      return
    }

    const prefix = match[1]   // e.g. "$"
    const numStr = match[2]   // e.g. "2.35" or "74"
    const suffix = match[3]   // e.g. "M" or "%"

    const target = parseFloat(numStr.replace(/,/g, ''))
    if (isNaN(target)) {
      setDisplay(str)
      return
    }

    // Determine decimal places from original
    const decimalPlaces = numStr.includes('.') ? numStr.split('.')[1].length : 0
    // Check if original uses commas (thousands separator)
    const usesCommas = numStr.includes(',')

    const format = (num) => {
      let formatted = num.toFixed(decimalPlaces)
      if (usesCommas) {
        const parts = formatted.split('.')
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        formatted = parts.join('.')
      }
      return `${prefix}${formatted}${suffix}`
    }

    // Hold at zero until the counter scrolls into view
    setDisplay(format(0))
    if (!inView) return

    const startTime = performance.now()

    const animate = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease-out cubic for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = eased * target

      setDisplay(format(current))

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      }
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [value, duration, inView])

  return <span ref={ref} className={className}>{display}</span>
}
