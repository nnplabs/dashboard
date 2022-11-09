import React from 'react'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Log from './pages/dashboard/Log'
import Metric from './pages/dashboard/Metric'
import Event from './pages/management/Event'
import Integration from './pages/management/Integration/Integration'
import Setting from './pages/management/Setting'

export default function AppRoutes() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/dashboard/metrics" element={<Metric/>} />
            <Route path="/dashboard/logs" element={<Log />} />
            <Route path="/management/events" element={<Event />} />
            <Route path="/management/integrations" element={<Integration />} />
            <Route path="/management/settings" element={<Setting />} />
        </Routes>
    </BrowserRouter>
  )
}