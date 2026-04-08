import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useStore } from './store/useStore'
import { supabase } from './utils/supabase'
import Portfolio from './pages/Portfolio'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import DetailPage from './pages/DetailPage'

function App() {
  const mode = useStore((state) => state.mode);
  const setAdmin = useStore((state) => state.setAdmin);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAdmin(!!session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setAdmin(!!session);
    });

    return () => subscription.unsubscribe();
  }, [setAdmin]);

  useEffect(() => {
    if (mode === 'creative') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [mode]);

  return (
    <div className="relative antialiased text-slate-900 dark:text-slate-200">
      <main>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/signin" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/detail/:type/:id" element={<DetailPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
