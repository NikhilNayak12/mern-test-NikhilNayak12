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
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <nav className="bg-gray-900 border-b border-gray-800 px-8 py-4 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-xl font-bold text-indigo-400 hover:text-indigo-300 transition">
            CourseHub
          </Link>
          {!token && (
            <Link to="/register" className="text-gray-300 hover:text-white transition font-medium">
              Register
            </Link>
          )}
          {!token && (
            <Link to="/login" className="text-gray-300 hover:text-white transition font-medium">
              Login
            </Link>
          )}
        </div>
        <div>
          {token && (
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-500 text-white px-5 py-2 rounded-lg font-semibold transition cursor-pointer"
            >
              Logout
            </button>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Courses />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
