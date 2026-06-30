import { Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import CommandCenter from './pages/CommandCenter'
import ProductionIQ from './pages/ProductionIQ'

export default function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<CommandCenter />} />
        <Route path="/production" element={<ProductionIQ />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  )
}
