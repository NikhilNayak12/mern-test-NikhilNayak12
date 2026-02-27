
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Courses from './pages/Courses'
import { useEffect, useState } from 'react'


function App() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')

  useEffect(() => {
    const root = window.document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [theme])

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className={theme === 'dark' ? 'dark min-h-screen bg-gray-950 text-gray-100' : 'min-h-screen bg-gray-100 text-gray-900'}>
      <nav className={theme === 'dark'
        ? 'bg-gray-900 border-b border-gray-800 px-8 py-4 flex justify-between items-center shadow-lg'
        : 'bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center shadow-lg'}>
        <div className="flex items-center gap-6">
          <Link to="/" className={theme === 'dark' ? 'text-xl font-bold text-indigo-400 hover:text-indigo-300 transition' : 'text-xl font-bold text-indigo-700 hover:text-indigo-500 transition'}>
            CourseHub
          </Link>
          {!token && (
            <Link to="/register" className={theme === 'dark' ? 'text-gray-300 hover:text-white transition font-medium' : 'text-gray-700 hover:text-black transition font-medium'}>
              Register
            </Link>
          )}
          {!token && (
            <Link to="/login" className={theme === 'dark' ? 'text-gray-300 hover:text-white transition font-medium' : 'text-gray-700 hover:text-black transition font-medium'}>
              Login
            </Link>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className={theme === 'dark'
              ? 'bg-gray-800 hover:bg-gray-700 text-gray-200 px-4 py-2 rounded-lg font-semibold transition cursor-pointer'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-semibold transition cursor-pointer'}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
          </button>
          {token && (
            <button
              onClick={handleLogout}
              className={theme === 'dark'
                ? 'bg-red-600 hover:bg-red-500 text-white px-5 py-2 rounded-lg font-semibold transition cursor-pointer'
                : 'bg-red-500 hover:bg-red-400 text-white px-5 py-2 rounded-lg font-semibold transition cursor-pointer'}
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
