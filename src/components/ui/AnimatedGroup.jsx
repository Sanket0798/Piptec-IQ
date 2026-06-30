import { Children, cloneElement } from 'react'
import useInView from '../../lib/useInView'
import { cn } from '../../lib/format'

/**
 * Wraps a grid/flex of children and staggers their reveal animation
 * as the group scrolls into view.
 */
export default function AnimatedGroup({ children, className = '', as: Tag = 'div', ...props }) {
  const [ref, inView] = useInView()

  return (
    <Tag ref={ref} className={className} {...props}>
      {Children.map(children, (child, i) => {
        if (!child) return null
        return cloneElement(child, {
          className: cn(
            child.props.className,
            'animate-reveal',
            inView && 'in-view',
            `stagger-${Math.min(i + 1, 6)}`,
          ),
        })
      })}
    </Tag>
  )
}
