import { useEffect, useRef } from 'react'
import Icon from '../Icon'
import { user } from '../../data/common'

export default function Topbar() {
  const inputRef = useRef(null)

  // Cmd/Ctrl+F focuses the search field (matches the ⌘F affordance).
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'f') {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header className="sticky top-0 z-20 flex items-center gap-4 border-b border-line bg-canvas/80 px-6 py-3.5 backdrop-blur-md">
      <label className="group flex h-11 max-w-md flex-1 items-center gap-2.5 rounded-2xl border border-line bg-surface px-4 transition focus-within:border-brand-200 focus-within:ring-2 focus-within:ring-brand-100">
        <Icon name="search" size={18} className="text-ink-faint" />
        <input
          ref={inputRef}
          placeholder="Search or ask Copilot…"
          className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-faint"
        />
        <kbd className="hidden items-center gap-0.5 rounded-md border border-line bg-surface-soft px-1.5 py-0.5 text-[11px] font-medium text-ink-faint sm:flex">
          ⌘F
        </kbd>
      </label>

      <div className="ml-auto flex items-center gap-2">
        <button className="grid size-11 place-items-center rounded-2xl border border-line bg-surface text-ink-soft transition hover:text-brand-600">
          <Icon name="mail" size={19} />
        </button>
        <button className="relative grid size-11 place-items-center rounded-2xl border border-line bg-surface text-ink-soft transition hover:text-brand-600">
          <Icon name="bell" size={19} />
          <span className="absolute right-3 top-3 size-2 rounded-full bg-danger ring-2 ring-surface" />
        </button>

        <div className="ml-1 flex items-center gap-3 rounded-2xl border border-line bg-surface py-1.5 pl-1.5 pr-4">
          <span className="grid size-9 place-items-center rounded-xl bg-brand-500 text-sm font-semibold text-white">
            {user.initials}
          </span>
          <div className="hidden leading-tight sm:block">
            <div className="text-sm font-semibold text-ink">{user.name}</div>
            <div className="text-xs text-ink-faint">{user.email}</div>
          </div>
        </div>
      </div>
    </header>
  )
}
