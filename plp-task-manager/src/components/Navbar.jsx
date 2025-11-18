import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <nav className="bg-white dark:bg-gray-800 shadow">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-xl font-bold">TaskManager</Link>
          <Link to="/tasks" className="hidden sm:inline">Tasks</Link>
          <Link to="/posts" className="hidden sm:inline">Posts</Link>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="px-3 py-1 border rounded"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </nav>
  )
}
