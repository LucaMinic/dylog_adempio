# Gestione del consenso cookie

Sistema interno, senza librerie CMP esterne, conforme a GDPR, Direttiva ePrivacy, art. 122 Codice Privacy e Linee guida del Garante del 10 giugno 2021.

## File

| File | Ruolo |
|---|---|
| `cookieConfig.js` | **Unico punto di configurazione**: categorie, servizi, fornitori, cookie e durate, versione della policy |
| `consentTexts.js` | Testi del banner, del pannello e dei segnaposto |
| `consentStore.js` | Logica: cookie `cc_consent`, `hasConsent()`, `openPreferences()`, revoca, sblocco degli script |
| `consentApi.js` | Collegamento al backend (`VITE_CONSENT_API_URL`): legge la configurazione (`POST /consent/config`) e registra ogni scelta (`POST /consent`), con coda e nuovi tentativi |
| `useConsent.js` | Hook React: `useConsentState()`, `useHasConsent(categoria)` |
| `../components/consent/CookieBanner.jsx` | Primo livello (banner) |
| `../components/consent/CookiePreferences.jsx` | Secondo livello (pannello preferenze) |
| `../components/consent/ConsentGate.jsx` | Segnaposto "Attiva contenuto" per gli embed |
| `../components/consent/CookieConsent.jsx` | Monta banner e pannello nel layout; `CookiePreferencesLink` riapre il pannello |

## Configurazione (.env)

```
VITE_CONSENT_API_URL=                # indirizzo base del backend; vuoto = scelte applicate ma non registrate
VITE_COOKIE_POLICY_VERSION=1.0.0     # versione usata finché non arriva quella del backend
VITE_COOKIE_POLICY_URL=              # link alla Cookie Policy nel banner; vuoto = link non mostrato
```

## Backend

Il backend riconosce il sito dall'origine della richiesta (CORS: deve rispondere anche a `OPTIONS`).

- **All'apertura del sito**: `POST {base}/consent/config` con body `{}`. Dalla risposta (`data.policy_version`, `data.attivo`) il sito prende la versione della policy (se cambia, il banner viene riproposto) e se mostrare il banner. Se il backend non risponde o non ha la configurazione, restano i valori locali.
- **A ogni scelta**: `POST {base}/consent` con body
  ```json
  { "consent_id": "uuid", "azione": "accept_all|reject_all|custom|update|withdraw",
    "categorie": { "necessary": true, "preferences": false, "statistics": false, "marketing": true },
    "policy_version": "2026-10-06", "client_timestamp": "ISO 8601" }
  ```
  risposta attesa `{ "success": true }`. `update` = modifica di una scelta già data; `withdraw` = revoca di tutte le categorie facoltative.

## API pubblica

```js
import { hasConsent, openPreferences } from './consent/useConsent.js'

hasConsent('statistics'); // true/false, 'necessary' è sempre true
openPreferences();        // apre il pannello preferenze
```

In un componente React: `const ok = useHasConsent('marketing')`, che si aggiorna da solo quando la scelta cambia.
Fuori da React, per esempio nella console del browser: `window.cookieConsent.hasConsent('marketing')`.

## Aggiungere un nuovo servizio

1. **Configurazione.** In `cookieConfig.js` aggiungi una voce a `SERVICES` con: `id`, `category`, `name`, `provider`, `privacyPolicyUrl`, `description`, e l'elenco `cookies`, ognuno con nome, prima o terza parte, durata e finalità.
   - Se la categoria era vuota (per esempio `statistics`), comparirà da sola nel pannello.
   - Aggiungere un servizio cambia la "firma" dei servizi, quindi il banner viene **riproposto a tutti** i visitatori.
2. **Blocco.** Dipende dal tipo di servizio:
   - **Embed** (iframe: video, mappe, widget): avvolgilo con il segnaposto.
     ```jsx
     <ConsentGate service="vimeo" externalUrl="https://vimeo.com/..." className="w-full aspect-video min-h-[300px]">
       <iframe src="https://player.vimeo.com/video/..." />
     </ConsentGate>
     ```
   - **Script** (statistiche, pixel): inseriscilo bloccato, così viene attivato solo dopo il consenso.
     ```html
     <script type="text/plain" data-cookie-category="statistics" src="https://..."></script>
     ```
     Oppure caricalo dal codice solo se `hasConsent('statistics')` è vero.
   - **Google Analytics / Google Ads**: imposta anche Google Consent Mode v2, con tutto `denied` di default e l'aggiornamento in `onConsentChoice()` di `consentStore.js`.
3. **Testi.** Se il testo del banner (`ui.bannerText` in `consentTexts.js`) elenca i servizi, aggiornalo.
4. **Cookie Policy.** Aggiorna la tabella dei cookie e, se è una modifica sostanziale, anche `VITE_COOKIE_POLICY_VERSION`.

## Checklist di test manuale

Usa una finestra in incognito, con DevTools aperti su **Application → Cookies / Local Storage** e **Network**.

1. **Prima visita senza cookie.**
   - Il banner compare e riceve il focus.
   - In Network non ci sono richieste a `youtube.com`, `google.com`, `doubleclick.net` né `fonts.googleapis.com`.
   - Tra i cookie non c'è nulla.
   - Al posto degli eventuali contenuti esterni (video, mappe) ci sono i segnaposto.
2. **Nessun consenso implicito.** Scroll, clic sulla pagina e cambio pagina non chiudono il banner e non creano cookie.
3. **Rifiuto.** "Rifiuta tutti" e la X fanno la stessa cosa:
   - viene creato `cc_consent` con `marketing:false` e scadenza di circa 6 mesi;
   - dopo un ricaricamento il banner non ricompare;
   - video e mappa restano bloccati.
4. **Accettazione.** "Accetta tutti" crea `cc_consent` con `marketing:true` e scadenza di circa 12 mesi, e video e mappa si caricano.
5. **Personalizzazione.**
   - "Personalizza" apre il pannello e il focus resta al suo interno (Tab, Shift+Tab).
   - Esc chiude il pannello e riporta al banner.
   - Gli switch si attivano con Spazio e annunciano lo stato (`role="switch"`, `aria-checked`).
6. **"Attiva contenuto" su un segnaposto.** Il video si carica e `cc_consent` registra `marketing:true`.
7. **Revoca dal link "Preferenze cookie".**
   - "Preferenze cookie" riapre il pannello; disattiva Marketing e salva.
   - Video e mappa tornano segnaposto, e l'azione inviata è `withdraw`.
8. **Nuova versione della policy.** Cambia `VITE_COOKIE_POLICY_VERSION`, rifai la build e ricarica: il banner ricompare, e il `consent_id` resta lo stesso.
9. **Chiamata all'endpoint.**
   - In Network, all'apertura parte `POST /consent/config` e a ogni scelta `POST /consent` con `consent_id`, `azione`, `categorie`, `policy_version` e `client_timestamp`.
   - Non vengono inviati IP né email.
10. **Endpoint non raggiungibile.**
    - La scelta resta applicata e in Local Storage compare `cc_queue`.
    - Ai caricamenti successivi viene ritentata, al massimo 3 tentativi in tutto.
11. **Accessibilità.**
    - Zoom al 200%: nessun testo tagliato, e il banner scorre se serve.
    - A 320px di larghezza: nessuno scorrimento orizzontale.
    - Il focus è sempre visibile.
