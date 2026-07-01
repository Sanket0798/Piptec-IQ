import { cn } from '../../lib/format'

export default function Card({ as: Tag = 'div', className = '', children, ...rest }) {
  return (
    <Tag
      className={cn(
        'rounded-(--radius-card) border border-line bg-surface card-hover',
        'shadow-[0_1px_2px_rgba(15,32,50,0.04),0_8px_24px_-12px_rgba(15,32,50,0.10)]',
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  )
}
