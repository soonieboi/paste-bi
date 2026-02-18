import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SessionPage from './pages/SessionPage'

function App() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/session/:id" element={<SessionPage />} />
      </Routes>
    </div>
  )
}

export default App
