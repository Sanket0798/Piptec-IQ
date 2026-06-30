import { useEffect, useState } from 'react'

/**
 * Typewriter effect component.
 * Renders children text character by character with a blinking cursor.
 *
 * Usage: <Typewriter speed={40}>Your text here</Typewriter>
 */
export default function Typewriter({ children, speed = 40, delay = 300, className = '' }) {
  const fullText = typeof children === 'string' ? children : ''
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!fullText) return

    let i = 0
    setDisplayed('')
    setDone(false)

    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++
        setDisplayed(fullText.slice(0, i))
        if (i >= fullText.length) {
          clearInterval(interval)
          setDone(true)
        }
      }, speed)

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(timeout)
  }, [fullText, speed, delay])

  return (
    <span className={className}>
      {displayed}
      <span className={`inline-block w-[2px] h-[1em] ml-0.5 align-middle bg-current ${done ? 'animate-blink' : ''}`} />
    </span>
  )
}
