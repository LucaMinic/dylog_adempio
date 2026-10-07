import { CookieBanner } from './CookieBanner.jsx'
import { CookiePreferences } from './CookiePreferences.jsx'
import { ui } from '../../consent/consentTexts.js'
import { openPreferences } from '../../consent/consentStore.js'

/** Montato una volta nel layout: banner di primo livello + pannello preferenze. */
export function CookieConsent() {
  return (
    <>
      <CookieBanner />
      <CookiePreferences />
    </>
  )
}

/** Link "Preferenze cookie" per riaprire il pannello e modificare o revocare la scelta. */
export function CookiePreferencesLink({ className = '' }) {
  return (
    <button type="button" onClick={openPreferences} className={`link-draw pb-0.5 text-sm ${className}`}>
      {ui.footerLink}
    </button>
  )
}
