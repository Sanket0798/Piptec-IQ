import { createContext, useContext, useState, useCallback } from 'react'

// Demo credentials (mock auth — no backend).
const VALID_EMAIL = 'admin@pipeteciq.ai'
const VALID_PASSWORD = 'pipetec2026'
const STORAGE_KEY = 'pt_auth'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem(STORAGE_KEY) === '1',
  )

  const login = useCallback(({ email, password }) => {
    const ok =
      email.trim().toLowerCase() === VALID_EMAIL && password === VALID_PASSWORD
    if (ok) {
      localStorage.setItem(STORAGE_KEY, '1')
      setIsAuthenticated(true)
      return { ok: true }
    }
    return { ok: false, error: 'Incorrect email or password. Please try again.' }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setIsAuthenticated(false)
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
