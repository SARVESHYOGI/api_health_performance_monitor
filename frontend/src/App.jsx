import './App.css'
import Dashboard from './pages/Dashboard.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Home from './pages/Home.jsx'
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Navbar from './components/Navbar.jsx'
import PastApi from './pages/PastApi.jsx'
import Analytics from './pages/Analytics.jsx'

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/pastapi" element={
          <>
            <ProtectedRoute>
              <PastApi />
            </ProtectedRoute>
          </>
        } />
        <Route path="/analytics" element={
          <>
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          </>
        } />
        <Route
          path="/checker"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
