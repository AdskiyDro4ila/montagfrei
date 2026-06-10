import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ClientsBootstrap } from './components/ClientsBootstrap'
import { Gallery } from './components/Gallery'
import { CodeEntry } from './components/CodeEntry'
import { AdminDashboard } from './components/AdminDashboard'
import { ClientDemoPage } from './demos/ClientDemoPage'
import { FaqPage } from './pages/FaqPage'
import { ImpressumPage } from './pages/ImpressumPage'
import { AgbPage } from './pages/AgbPage'

export default function App() {
  return (
    <BrowserRouter>
      <ClientsBootstrap />
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/access" element={<CodeEntry />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/demo/:slug" element={<ClientDemoPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/impressum" element={<ImpressumPage />} />
        <Route path="/agb" element={<AgbPage />} />
      </Routes>
    </BrowserRouter>
  )
}
