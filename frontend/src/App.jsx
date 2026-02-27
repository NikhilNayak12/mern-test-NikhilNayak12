import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Courses from './pages/Courses'

function App() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <>
      <nav>
        <div>
          <Link to="/">Courses</Link>
          {!token && <Link to="/register">Register</Link>}
          {!token && <Link to="/login">Login</Link>}
        </div>
        <div>
          {token && <button onClick={handleLogout}>Logout</button>}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Courses />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
