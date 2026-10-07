import { Icon } from '../ui.jsx'
import { categoryTexts, fill, ui } from '../../consent/consentTexts.js'
import { serviceById } from '../../consent/cookieConfig.js'
import { grantCategory, openPreferences } from '../../consent/consentStore.js'
import { useHasConsent } from '../../consent/useConsent.js'

/**
 * Mostra un contenuto esterno (iframe: video, mappe…) solo con il consenso; altrimenti un segnaposto
 * con il pulsante "Attiva contenuto". `service` è l'id in cookieConfig.js; `className` dà al segnaposto
 * le stesse dimensioni del contenuto.
 */
export function ConsentGate({ service: serviceId, children, externalUrl, className = '' }) {
  const service = serviceById(serviceId)
  if (!service) throw new Error(`ConsentGate: servizio "${serviceId}" sconosciuto (aggiungilo in cookieConfig.js)`)
  const allowed = useHasConsent(service.category)

  if (allowed) return <>{children}</>

  const values = { service: service.name, provider: service.provider, category: categoryTexts[service.category].title }

  return (
    <div className={`flex flex-col items-center justify-center gap-3 bg-mist p-6 text-center ${className}`} data-consent-placeholder={serviceId}>
      <Icon name="shield" className="size-8 text-brand" />
      <p className="font-semibold">{fill(ui.placeholderTitle, values)}</p>
      <p className="max-w-md text-sm leading-relaxed text-muted">{fill(ui.placeholderText, values)}</p>
      <div className="flex flex-col items-center gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => grantCategory(service.category)}
          className="min-h-11 bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
        >
          {ui.placeholderButton}
        </button>
        <button type="button" onClick={openPreferences} className="text-sm font-semibold text-brand underline underline-offset-2">
          {ui.footerLink}
        </button>
      </div>
      {externalUrl && (
        <a href={externalUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-muted underline">
          {fill(ui.placeholderOpenExternal, values)}
        </a>
      )}
    </div>
  )
}
