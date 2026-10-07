// Collegamento al backend dei consensi (indirizzo base in VITE_CONSENT_API_URL):
//  - POST {base}/consent/config  all'avvio: versione della policy e se il banner è attivo per
//    questo sito (il backend riconosce il sito dall'origine della richiesta);
//  - POST {base}/consent         dopo ogni scelta: la registra.
// Sono operazioni tecniche che non richiedono consenso. Non vengono inviati IP, e-mail o altri
// dati identificativi. Se il backend non risponde il sito funziona con le impostazioni locali,
// e le scelte non inviate vengono ritentate al caricamento successivo.
import { applyRemoteConfig, onConsentChoice } from './consentStore.js'

const BASE_URL = (import.meta.env.VITE_CONSENT_API_URL || '').trim().replace(/\/+$/, '')
const QUEUE_KEY = 'cc_queue'
const MAX_ATTEMPTS = 3

async function postJson(path, body, keepalive = false) {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    keepalive,
    credentials: 'omit',
  })
  const json = await response.json().catch(() => ({}))
  if (!response.ok || json.success === false) {
    throw new Error(`Consent API ${path}: ${response.status} ${json.error ?? ''}`.trim())
  }
  return json
}

function buildPayload(action, record) {
  return {
    consent_id: record.consent_id,
    azione: action,
    categorie: { ...record.categories, necessary: true },
    policy_version: record.policy_version,
    client_timestamp: record.timestamp,
  }
}

function readQueue() {
  try {
    const parsed = JSON.parse(localStorage.getItem(QUEUE_KEY) || '[]')
    return Array.isArray(parsed) ? parsed.filter((item) => item?.payload?.azione) : []
  } catch {
    return []
  }
}

function writeQueue(queue) {
  try {
    if (queue.length) localStorage.setItem(QUEUE_KEY, JSON.stringify(queue))
    else localStorage.removeItem(QUEUE_KEY)
  } catch {
    /* storage non disponibile */
  }
}

/** Invia un record; se non riesce lo conserva per un nuovo tentativo al caricamento successivo. */
async function send(payload, attempts = 0) {
  try {
    await postJson('/consent', payload, true)
  } catch {
    if (attempts + 1 < MAX_ATTEMPTS) writeQueue([...readQueue(), { payload, attempts: attempts + 1 }])
  }
}

/** Ritenta i record non inviati in precedenza (al massimo 3 tentativi in tutto). */
async function flushQueue() {
  const queue = readQueue()
  if (!queue.length) return
  writeQueue([])
  for (const item of queue) await send(item.payload, item.attempts)
}

/** Legge la configurazione del sito; in caso di errore restano le impostazioni locali. */
async function loadConfig() {
  try {
    const config = await postJson('/consent/config', {})
    if (config.data) applyRemoteConfig({ policyVersion: config.data.policy_version, active: config.data.attivo })
  } catch (error) {
    if (import.meta.env.DEV) console.info('[consent] configurazione remota non disponibile, uso quella locale.', error)
  }
}

let started = false

/** Collega il sistema di consenso al backend. Chiamato una volta all'avvio. */
export function initConsentApi() {
  if (started || typeof window === 'undefined') return
  started = true
  if (!BASE_URL) {
    if (import.meta.env.DEV) console.info('[consent] VITE_CONSENT_API_URL non impostato: scelte applicate ma non registrate.')
    return
  }
  onConsentChoice((action, record) => {
    // La scelta è già applicata in locale; la registrazione non blocca mai la pagina.
    void send(buildPayload(action, record))
  })
  void loadConfig()
  void flushQueue()
}
