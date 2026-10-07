import { useEffect, useRef } from 'react'
import { Icon } from '../ui.jsx'
import { ui } from '../../consent/consentTexts.js'
import { COOKIE_POLICY_URL } from '../../consent/cookieConfig.js'
import { allCategories, openPreferences, saveChoice } from '../../consent/consentStore.js'
import { useConsentState } from '../../consent/useConsent.js'

// Le tre scelte hanno esattamente lo stesso aspetto: nessuna opzione è favorita visivamente.
export const consentButtonClass =
  'min-h-12 w-full px-5 py-3 text-[0.9375rem] font-semibold text-white bg-brand transition-colors duration-200 hover:bg-brand-dark sm:w-auto sm:flex-1'

/** Primo livello: resta visibile finché il visitatore non sceglie. Nel frattempo il sito è utilizzabile. */
export function CookieBanner() {
  const { needsChoice, preferencesOpen } = useConsentState()
  const dialogRef = useRef(null)
  const visible = needsChoice && !preferencesOpen

  // Porta il focus sul banner quando compare, così lo raggiungono tastiera e lettori di schermo.
  useEffect(() => {
    if (visible) dialogRef.current?.focus()
  }, [visible])

  if (!needsChoice) return null

  return (
    <div
      ref={dialogRef}
      data-cookie-banner=""
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-text"
      tabIndex={-1}
      hidden={preferencesOpen}
      className="fixed inset-x-0 bottom-0 z-[60] p-3 outline-none sm:p-4"
    >
      <div className="relative mx-auto max-h-[85vh] max-w-4xl overflow-y-auto bg-paper p-5 text-ink shadow-[0_-8px_48px_-12px_rgb(0_16_63/0.35)] ring-1 ring-line cut-corner [--cut:20px] sm:p-7">
        <button
          type="button"
          onClick={() => saveChoice('reject_all', allCategories(false))}
          className="absolute right-3 top-3 p-2 text-muted transition-colors hover:bg-mist hover:text-ink"
          aria-label={ui.closeBanner}
          title={ui.closeBanner}
        >
          <Icon name="close" />
        </button>

        <h2 id="cookie-banner-title" className="text-h3 mb-2 pr-10">
          {ui.bannerTitle}
        </h2>
        <p id="cookie-banner-text" className="mb-5 text-[0.9375rem] leading-relaxed text-muted">
          {ui.bannerText}
          {COOKIE_POLICY_URL && (
            <>
              {' '}
              <a href={COOKIE_POLICY_URL} target="_blank" rel="noopener" className="font-semibold text-brand underline underline-offset-2 hover:no-underline">
                {ui.policyLink}
              </a>
            </>
          )}
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button type="button" className={consentButtonClass} onClick={() => saveChoice('reject_all', allCategories(false))}>
            {ui.rejectAll}
          </button>
          <button type="button" className={consentButtonClass} onClick={openPreferences}>
            {ui.customize}
          </button>
          <button type="button" className={consentButtonClass} onClick={() => saveChoice('accept_all', allCategories(true))}>
            {ui.acceptAll}
          </button>
        </div>
      </div>
    </div>
  )
}
