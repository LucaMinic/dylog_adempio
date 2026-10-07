import { useEffect, useRef, useState } from 'react'
import { Icon } from '../ui.jsx'
import { categoryTexts, ui } from '../../consent/consentTexts.js'
import { SERVICES, activeCategories } from '../../consent/cookieConfig.js'
import { allCategories, closePreferences, currentCategories, saveChoice } from '../../consent/consentStore.js'
import { useConsentState } from '../../consent/useConsent.js'
import { consentButtonClass } from './CookieBanner.jsx'

/**
 * Secondo livello: un interruttore per categoria, tutto il facoltativo spento di default.
 * Usa <dialog> nativo: showModal() tiene il focus all'interno ed Esc chiude il pannello.
 */
export function CookiePreferences() {
  const { preferencesOpen } = useConsentState()
  const [choice, setChoice] = useState(currentCategories)
  const dialogRef = useRef(null)

  // A ogni apertura il pannello parte da quanto è concesso in quel momento.
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (preferencesOpen) {
      setChoice(currentCategories())
      if (!dialog.open) dialog.showModal()
    } else if (dialog.open) {
      dialog.close()
    }
  }, [preferencesOpen])

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="cookie-prefs-title"
      aria-describedby="cookie-prefs-intro"
      onClose={closePreferences}
      onClick={(e) => e.target === e.currentTarget && closePreferences()}
      className="m-auto max-h-[90vh] w-[calc(100%-1.5rem)] max-w-2xl overflow-y-auto bg-paper p-0 text-ink shadow-2xl backdrop:bg-[#00103f]/60"
    >
      <div className="p-5 sm:p-8">
        <div className="mb-3 flex items-start justify-between gap-4">
          <h2 id="cookie-prefs-title" className="text-h2">
            {ui.prefsTitle}
          </h2>
          <button
            type="button"
            onClick={closePreferences}
            className="-m-2 p-2 text-muted transition-colors hover:bg-mist hover:text-ink"
            aria-label={ui.closePrefs}
          >
            <Icon name="close" />
          </button>
        </div>
        <p id="cookie-prefs-intro" className="mb-6 text-[0.9375rem] leading-relaxed text-muted">
          {ui.prefsIntro}
        </p>

        <ul className="mb-8 border-b border-line">
          {activeCategories().map((category) => (
            <CategoryRow
              key={category}
              category={category}
              checked={choice[category]}
              onChange={(value) => setChoice((prev) => ({ ...prev, [category]: value }))}
            />
          ))}
        </ul>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button type="button" className={consentButtonClass} onClick={() => saveChoice('reject_all', allCategories(false))}>
            {ui.rejectAll}
          </button>
          <button type="button" className={consentButtonClass} onClick={() => saveChoice('custom', choice)}>
            {ui.savePrefs}
          </button>
          <button type="button" className={consentButtonClass} onClick={() => saveChoice('accept_all', allCategories(true))}>
            {ui.acceptAll}
          </button>
        </div>
      </div>
    </dialog>
  )
}

function CategoryRow({ category, checked, onChange }) {
  const texts = categoryTexts[category]
  const services = SERVICES.filter((s) => s.category === category)
  const titleId = `cookie-cat-${category}`
  const descId = `cookie-cat-${category}-desc`
  const necessary = category === 'necessary'

  return (
    <li className="border-t border-line py-5">
      <div className="flex items-start justify-between gap-4">
        <h3 id={titleId} className="text-h3">
          {texts.title}
        </h3>
        {necessary ? (
          <span className="whitespace-nowrap text-sm font-semibold text-brand">{ui.alwaysActive}</span>
        ) : (
          <button
            type="button"
            role="switch"
            aria-checked={checked}
            aria-labelledby={titleId}
            aria-describedby={descId}
            onClick={() => onChange(!checked)}
            className={`relative inline-flex h-7 w-12 shrink-0 items-center transition-colors ${checked ? 'bg-brand' : 'bg-muted'}`}
          >
            <span
              aria-hidden="true"
              className={`block size-5 bg-white transition-transform duration-200 ${checked ? 'translate-x-6' : 'translate-x-1'}`}
            />
          </button>
        )}
      </div>
      <p id={descId} className="mt-1 text-[0.9375rem] leading-relaxed text-muted">
        {texts.description}
      </p>

      <details className="mt-3">
        <summary className="cursor-pointer text-sm font-semibold text-brand underline underline-offset-2">{ui.showDetails}</summary>
        <div className="mt-4 space-y-5">
          {services.map((service) => (
            <div key={service.id} className="text-sm">
              <p className="font-semibold">{service.name}</p>
              <p className="text-muted">{service.description}</p>
              <p className="text-muted">
                {ui.provider}: {service.provider}
                {service.privacyPolicyUrl && (
                  <>
                    {' · '}
                    <a href={service.privacyPolicyUrl} target="_blank" rel="noopener noreferrer" className="text-brand underline">
                      {ui.privacyPolicy}
                    </a>
                  </>
                )}
              </p>
              <div className="mt-2 overflow-x-auto">
                <table className="w-full border-collapse text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-line">
                      <th scope="col" className="py-1.5 pr-3 font-semibold">{ui.cookieName}</th>
                      <th scope="col" className="py-1.5 pr-3 font-semibold">{ui.cookieDuration}</th>
                      <th scope="col" className="py-1.5 font-semibold">{ui.cookiePurpose}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {service.cookies.map((cookie) => (
                      <tr key={cookie.name} className="border-b border-mist align-top text-muted">
                        <td className="whitespace-nowrap py-1.5 pr-3 font-mono">
                          {cookie.name}
                          <span className="block font-sans">{cookie.party === 'first' ? ui.firstParty : ui.thirdParty}</span>
                        </td>
                        <td className="py-1.5 pr-3">{cookie.duration}</td>
                        <td className="py-1.5">{cookie.purpose}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </details>
    </li>
  )
}
