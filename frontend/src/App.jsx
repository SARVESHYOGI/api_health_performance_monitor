import './App.css'
import Dashboard from './pages/dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </>
  )
}

export default App
