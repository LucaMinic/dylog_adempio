import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Servizi from './pages/Servizi.jsx'
import { CookieConsent } from './components/consent/CookieConsent.jsx'

const TITLES = {
  '/': 'Benvenuto in Agenzia Impresa – Buffetti Group',
  '/servizi': 'I nostri servizi – Agenzia Impresa',
}

function RouteEffects() {
  const { pathname } = useLocation()
  useEffect(() => {
    document.title = TITLES[pathname] ?? 'Agenzia Impresa'
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <RouteEffects />
      <main id="contenuto" tabIndex={-1} className="outline-none">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servizi" element={<Servizi />} />
        </Routes>
      </main>
      <CookieConsent />
    </>
  )
}
