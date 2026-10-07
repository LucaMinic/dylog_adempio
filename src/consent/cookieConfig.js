// Unico punto di configurazione del consenso cookie: categorie, servizi e cookie di ciascun servizio.
// Banner, pannello preferenze e segnaposto dei contenuti esterni sono generati da questo file.
//
// Per aggiungere un servizio vedi src/consent/README.md. Aggiungere un servizio cambia la
// "firma" dei servizi, quindi il banner viene riproposto a tutti i visitatori.

export const CATEGORY_ORDER = ['necessary', 'preferences', 'statistics', 'marketing']

// Versione del testo della Cookie Policy: se cambia, il banner viene riproposto.
export const POLICY_VERSION = import.meta.env.VITE_COOKIE_POLICY_VERSION || '1.0.0'

// Indirizzo della Cookie Policy (link nel banner). Vuoto = link non mostrato.
export const COOKIE_POLICY_URL = import.meta.env.VITE_COOKIE_POLICY_URL || ''

export const CONSENT_COOKIE = 'cc_consent'
/** Una scelta che rifiuta tutto il facoltativo vale 6 mesi, qualsiasi accettazione 12 mesi. */
export const REJECT_MAX_AGE_DAYS = 182
export const ACCEPT_MAX_AGE_DAYS = 365

export const SERVICES = [
  {
    id: 'site',
    category: 'necessary',
    name: 'Agenzia Impresa',
    provider: 'Agenzia Impresa',
    description: 'Funzionamento del sito e memorizzazione delle tue scelte.',
    cookies: [
      {
        name: CONSENT_COOKIE,
        party: 'first',
        type: 'cookie',
        duration: '6 mesi (rifiuto) / 12 mesi (accettazione)',
        purpose: 'Memorizza le tue scelte sui cookie (identificativo anonimo, categorie, versione della policy, data).',
      },
      {
        name: 'cc_queue',
        party: 'first',
        type: 'localStorage',
        duration: "Fino all'invio",
        purpose: "Conserva temporaneamente la registrazione del consenso se l'invio non riesce.",
      },
    ],
  },
]

/** Solo le categorie che hanno servizi vengono mostrate al visitatore. */
export function activeCategories() {
  return CATEGORY_ORDER.filter((c) => SERVICES.some((s) => s.category === c))
}

/** Cambia quando si aggiunge o toglie un servizio: serve a richiedere di nuovo il consenso. */
export function servicesSignature() {
  return SERVICES.map((s) => `${s.id}:${s.category}`).sort().join(',')
}

export function serviceById(id) {
  return SERVICES.find((s) => s.id === id)
}
