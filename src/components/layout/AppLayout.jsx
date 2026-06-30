import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import Icon from '../Icon'

export default function AppLayout({ children }) {
  const [collapsed, setCollapsed] = useState(() => localStorage.getItem('pt_sidebar_collapsed') === '1')
  const mainRef = useRef(null)
  const { pathname } = useLocation()

  useEffect(() => {
    localStorage.setItem('pt_sidebar_collapsed', collapsed ? '1' : '0')
  }, [collapsed])

  // Scroll main content to top on route change
  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])

  return (
    <div className="flex h-screen overflow-hidden bg-canvas">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
      <div className="relative z-0 flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main ref={mainRef} className="flex-1 overflow-y-auto bg-grid">
          <div className="mx-auto max-w-[1400px] px-6 py-6">{children}</div>
        </main>
      </div>

      {/* persistent Copilot launcher */}
      <button className="group fixed bottom-6 right-6 z-30 flex items-center gap-2 rounded-full bg-brand-800 bg-wave py-3 pl-4 pr-5 text-sm font-semibold text-white shadow-[0_16px_36px_-12px_rgba(15,61,40,0.6)] transition hover:scale-[1.03]">
        <Icon name="sparkles" size={18} strokeWidth={2} className="transition group-hover:rotate-12" />
        Ask PipeTec IQ
        <kbd className="ml-1 rounded-md bg-white/15 px-1.5 py-0.5 text-[11px]">⌘K</kbd>
      </button>
    </div>
  )
}
