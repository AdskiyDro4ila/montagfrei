import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Gallery } from './components/Gallery'
import { CodeEntry } from './components/CodeEntry'
import { AdminDashboard } from './components/AdminDashboard'
import { ClientDemoPage } from './demos/ClientDemoPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/access" element={<CodeEntry />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/demo/:slug" element={<ClientDemoPage />} />
      </Routes>
    </BrowserRouter>
  )
}
