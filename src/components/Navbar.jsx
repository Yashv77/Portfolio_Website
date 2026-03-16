import { Link, useLocation } from 'react-router-dom'
import { Sun, Moon, Briefcase, Paintbrush } from 'lucide-react'
import { useStore } from '../store/useStore'

export default function Navbar() {
  const { mode, toggleMode } = useStore()
  const location = useLocation()

  const links = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Experience', path: '/experience' },
    { name: 'Projects', path: '/projects' },
  ]

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <span>Yash Vardhan</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-cyan-400 ${
                  location.pathname === link.path
                    ? 'text-blue-600 dark:text-cyan-400'
                    : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleMode}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              title={`Switch to ${mode === 'professional' ? 'Creative' : 'Professional'} Mode`}
            >
              {mode === 'professional' ? (
                <>
                  <Briefcase className="w-4 h-4 text-gray-700" />
                  <span className="text-sm font-medium text-gray-700">Pro</span>
                </>
              ) : (
                <>
                  <Paintbrush className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm font-medium text-cyan-400">Creative</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
