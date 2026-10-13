import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Servizi from './pages/Servizi.jsx'
import Listino from './pages/Listino.jsx'
import { areas } from './content/areas.js'
import { CookieConsent } from './components/consent/CookieConsent.jsx'

const TITLES = {
  '/': 'Benvenuto in Agenzia Impresa – Buffetti Group',
  '/servizi': 'I nostri servizi – Agenzia Impresa',
}
for (const a of areas) TITLES[`/servizi/${a.slug}`] = `Listino ${a.title} – Agenzia Impresa`

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
          <Route path="/servizi/:slug" element={<Listino />} />
        </Routes>
      </main>
      <CookieConsent />
    </>
  )
}
