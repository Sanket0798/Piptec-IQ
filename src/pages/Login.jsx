import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import Icon from '../components/Icon'

const features = [
  { icon: 'activity', title: 'Real-time production intelligence', body: 'Live plant health, delay prediction & revenue-at-risk.' },
  { icon: 'shield', title: 'Predictive quality', body: 'Forecast defects before the bend is made.' },
  { icon: 'layers', title: 'End-to-end traceability', body: 'Heat-level digital product passports.' },
  { icon: 'leaf', title: 'ESG & sustainability', body: 'Energy, carbon and tender-ready reporting.' },
]

const FULL_TEXT = 'The intelligent digital layer for smart pipe manufacturing'
const SPLIT_INDEX = 36 // "The intelligent digital layer for " (before "smart")

function TypewriterHeading() {
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    let timeout

    if (!isDeleting && charIndex < FULL_TEXT.length) {
      // Typing forward
      timeout = setTimeout(() => setCharIndex((i) => i + 1), 45)
    } else if (!isDeleting && charIndex >= FULL_TEXT.length) {
      // Pause at end before deleting
      timeout = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && charIndex > 0) {
      // Deleting (faster)
      timeout = setTimeout(() => setCharIndex((i) => i - 1), 25)
    } else if (isDeleting && charIndex === 0) {
      // Pause at start before typing again
      timeout = setTimeout(() => setIsDeleting(false), 500)
    }

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting])

  const displayed = FULL_TEXT.slice(0, charIndex)
  const blackPart = displayed.slice(0, SPLIT_INDEX)
  const greenPart = displayed.slice(SPLIT_INDEX)

  return (
    <h1 className="mt-5 max-w-xl text-4xl font-bold leading-[1.1] tracking-tight text-ink sm:text-5xl">
      {blackPart}
      {greenPart && (
        <span className="bg-linear-to-r from-brand-500 to-brand-400 bg-clip-text text-transparent">
          {greenPart}
        </span>
      )}
      <span className="inline-block w-[3px] h-[0.85em] ml-1 align-middle bg-brand-500 animate-blink" />
    </h1>
  )
}

function Field({ label, icon, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink">{label}</label>
      <div className="flex items-center gap-2.5 rounded-2xl border border-line bg-surface px-3.5 transition focus-within:border-brand-300 focus-within:ring-2 focus-within:ring-brand-100">
        <Icon name={icon} size={18} className="text-ink-faint" />
        {children}
      </div>
    </div>
  )
}

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const [email, setEmail] = useState('admin@pipeteciq.ai')
  const [password, setPassword] = useState('pipetec2026')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    // small delay to feel like a real sign-in
    setTimeout(() => {
      const res = login({ email, password })
      if (res.ok) {
        navigate(from, { replace: true })
      } else {
        setError(res.error)
        setLoading(false)
      }
    }, 450)
  }

  return (
    <div className="relative h-screen overflow-hidden bg-canvas bg-grid">
      {/* soft brand glows */}
      <div className="pointer-events-none absolute -left-40 top-[-10%] size-[560px] rounded-full bg-[#a7d9bb]/50 blur-[100px] animate-float" />
      <div className="pointer-events-none absolute bottom-[-15%] right-[-10%] size-[600px] rounded-full bg-[#6ec293]/50 blur-[110px] animate-float-reverse" />

      <div className="relative mx-auto grid h-full max-w-[1280px] items-center gap-12 px-6 py-6 lg:grid-cols-[1.1fr_minmax(380px,440px)]">
        {/* left: brand + hero + features */}
        <div className="animate-fade-up">
          <div className="flex items-center gap-3">
            <img src="/images/logo/New_logo.png" alt="PipeTec" className="h-12 w-auto select-none" draggable="false" />
            <span className="hidden text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-600 sm:inline">
              IQ · Manufacturing Intelligence
            </span>
          </div>

          <span className="mt-8 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1.5 text-xs font-semibold text-brand-600">
            <Icon name="cpu" size={14} strokeWidth={2} />
            AI-Powered Manufacturing Intelligence Platform
          </span>

          <TypewriterHeading />
          <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-ink-soft">
            Unify production, quality, traceability and sustainability into one decision-ready
            operating platform — with a contextual AI Copilot across every workflow.
          </p>

          <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-2">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="card-hover flex items-start gap-3 rounded-2xl border border-line bg-surface/70 p-4 backdrop-blur-sm opacity-0 animate-reveal-up"
                style={{ animationDelay: `${600 + i * 100}ms` }}
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon name={f.icon} size={18} />
                </span>
                <div>
                  <div className="text-sm font-semibold text-ink">{f.title}</div>
                  <div className="mt-0.5 text-xs leading-relaxed text-ink-soft">{f.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* right: sign-in card */}
        <div className="animate-fade-up rounded-(--radius-card) border border-line bg-surface p-7 shadow-[0_1px_2px_rgba(16,40,28,0.04),0_24px_60px_-24px_rgba(16,40,28,0.22)] sm:p-8">
          <h2 className="text-2xl font-bold tracking-tight text-ink">Sign in</h2>
          <p className="mt-1 text-sm text-ink-soft">Access the PipeTec IQ platform.</p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <Field label="Email" icon="mail">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
                placeholder="you@company.com"
                className="w-full bg-transparent py-3 text-sm text-ink outline-none placeholder:text-ink-faint"
              />
            </Field>

            <Field label="Password" icon="lock">
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                placeholder="••••••••••"
                className="w-full bg-transparent py-3 text-sm text-ink outline-none placeholder:text-ink-faint"
              />
              <button
                type="button"
                onClick={() => setShowPw((s) => !s)}
                className="shrink-0 text-ink-faint transition hover:text-brand-600"
                aria-label={showPw ? 'Hide password' : 'Show password'}
              >
                <Icon name={showPw ? 'eyeOff' : 'eye'} size={18} />
              </button>
            </Field>

            {error && (
              <div className="flex items-center gap-2 rounded-xl bg-[#fbeceb] px-3 py-2.5 text-sm text-danger">
                <Icon name="alert" size={16} strokeWidth={2} />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-brand-500 to-brand-400 py-3.5 text-sm font-semibold text-white shadow-[0_12px_26px_-12px_rgba(43,118,179,0.8)] transition hover:from-brand-600 hover:to-brand-500 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <span className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Signing in…
                </>
              ) : (
                <>
                  Sign in
                  <Icon name="arrowRight" size={17} strokeWidth={2} />
                </>
              )}
            </button>
          </form>

          <div className="mt-5 rounded-xl border border-dashed border-line bg-surface-soft px-3.5 py-2.5 text-xs text-ink-soft">
            <span className="font-semibold text-ink">Demo access</span> — admin@pipeteciq.ai / pipetec2026
          </div>
        </div>
      </div>

      <footer className="absolute bottom-4 left-0 right-0 text-center text-xs text-ink-faint">
        Powered by <span className="font-semibold text-brand-600">Zealogics Technologies LLC</span> — www.zealogics.com
      </footer>
    </div>
  )
}
