import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Gallery } from './components/Gallery'
import { CodeEntry } from './components/CodeEntry'
import { AdminDashboard } from './components/AdminDashboard'
import { ClientDemoPage } from './demos/ClientDemoPage'
import { FaqPage } from './pages/FaqPage'
import { ImpressumPage } from './pages/ImpressumPage'
import { AgbPage } from './pages/AgbPage'
import { DatenschutzPage } from './pages/DatenschutzPage'
import { UeberUnsPage } from './pages/UeberUnsPage'
import { KontaktPage } from './pages/KontaktPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/access" element={<CodeEntry />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/demo/:slug" element={<ClientDemoPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/impressum" element={<ImpressumPage />} />
        <Route path="/agb" element={<AgbPage />} />
        <Route path="/datenschutz" element={<DatenschutzPage />} />
        <Route path="/ueber-uns" element={<UeberUnsPage />} />
        <Route path="/kontakt" element={<KontaktPage />} />
      </Routes>
    </BrowserRouter>
  )
}
