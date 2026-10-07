import { useSyncExternalStore } from 'react'
import { getConsentState, hasConsent, openPreferences, subscribe } from './consentStore.js'

/** Stato del consenso; i componenti si aggiornano quando il visitatore cambia scelta. */
export function useConsentState() {
  return useSyncExternalStore(subscribe, getConsentState, getConsentState)
}

/** True se il visitatore ha accettato la categoria ('necessary' è sempre true). */
export function useHasConsent(category) {
  useConsentState()
  return hasConsent(category)
}

export { hasConsent, openPreferences }
