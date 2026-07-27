import { Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { SetupPage } from './pages/SetupPage'
import { WeekPage } from './pages/WeekPage'
import { ArchitecturePage } from './pages/ArchitecturePage'
import { BeltsPage } from './pages/BeltsPage'
import { ResourcesPage } from './pages/ResourcesPage'
import { CoePage } from './pages/CoePage'
import { CertificatePage } from './pages/CertificatePage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="setup" element={<SetupPage />} />
        <Route path="architecture" element={<ArchitecturePage />} />
        <Route path="belts" element={<BeltsPage />} />
        <Route path="resources" element={<ResourcesPage />} />
        <Route path="coe" element={<CoePage />} />
        <Route path="certificate" element={<CertificatePage />} />
        <Route path="week/:id" element={<WeekPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
