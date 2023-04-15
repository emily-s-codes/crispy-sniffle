import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import ResetPasswordPage from './pages/ResetPassword'
import PageNotFound from './pages/PageNotFound'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'

function App() {

  return (
    <div className="App">
      <Router>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/passwordReset" element={<ResetPasswordPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
