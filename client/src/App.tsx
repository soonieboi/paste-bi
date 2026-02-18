import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SessionPage from './pages/SessionPage'
import AboutPage from './pages/AboutPage'

function App() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/session/:id" element={<SessionPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </div>
  )
}

export default App
