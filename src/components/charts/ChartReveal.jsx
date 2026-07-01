import useInView from '../../lib/useInView'

/**
 * Defers mounting a chart until it scrolls into view, so the chart's
 * draw-in animation plays *when the user reaches it* — not silently on
 * page load while it's still below the fold.
 *
 * Reserves the chart's height up-front so the layout never jumps.
 */
export default function ChartReveal({ height, children }) {
  const [ref, inView] = useInView({ threshold: 0.15 })
  return (
    <div ref={ref} style={{ height, width: '100%' }}>
      {inView ? children : null}
    </div>
  )
}
