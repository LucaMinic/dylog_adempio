import { Link, Navigate, useParams } from 'react-router-dom'
import { areas } from '../content/areas.js'
import { listino, NOTE_LISTINO } from '../content/listino.js'
import { asset, Breadcrumb, Eyebrow, Reveal } from '../components/ui.jsx'
import { CookiePreferencesLink } from '../components/consent/CookieConsent.jsx'

function Price({ value }) {
  const numeric = value.includes('€')
  return (
    <span className={`whitespace-nowrap text-right tabular-nums ${numeric ? 'font-semibold text-ink' : 'text-muted'}`}>
      {value}
    </span>
  )
}

/* Listino dei servizi di una singola area (Listino 2026). */
export default function Listino() {
  const { slug } = useParams()
  const area = areas.find((a) => a.slug === slug)
  const entries = listino[slug]
  if (!area || !entries) return <Navigate to="/servizi" replace />

  return (
    <>
      <section className="section bg-mist/50 pt-8 md:pt-12" aria-labelledby="listino">
        <div className="wrap">
          <Link to="/" className="inline-block" aria-label="Agenzia Impresa – Buffetti Group, torna alla pagina di benvenuto">
            <img
              src={asset('brand/agenzia-impresa.svg')}
              alt=""
              width="544"
              height="82"
              className="h-auto w-[208px] sm:w-[248px] xl:w-[268px]"
            />
          </Link>

          <Breadcrumb
            items={[{ label: 'Servizi', to: '/servizi' }, { label: area.title }]}
            className="mt-16 md:mt-20"
          />

          <div className="mt-10 md:mt-14">
            <Eyebrow className="mb-6 text-brand">Listino</Eyebrow>
            <h1 id="listino" className="text-h1 text-balance">
              {area.title}
            </h1>
          </div>

          <Reveal as="ul" data-stagger="" className="mt-16 border-b border-line md:mt-20">
            {entries.map((e, i) => (
              <li key={e.title} style={{ '--i': i }} className="border-t border-line py-6 md:py-7">
                <div className="grid grid-cols-[1fr_auto] items-baseline gap-x-6">
                  <h2 className="text-[1.25rem] font-normal leading-snug tracking-[-0.01em] md:text-[1.375rem]">{e.title}</h2>
                  {e.price && <Price value={e.price} />}
                </div>
                {e.note && <p className="mt-2 max-w-[72ch] text-sm leading-relaxed text-muted">{e.note}</p>}
                {e.items && (
                  <ul className="mt-4 divide-y divide-line/70">
                    {e.items.map((it) => (
                      <li key={it.name} className="grid grid-cols-[1fr_auto] items-baseline gap-x-6 py-3">
                        <span className="leading-snug">{it.name}</span>
                        <Price value={it.price} />
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </Reveal>

          <div className="mt-10 space-y-1 text-sm text-muted">
            {NOTE_LISTINO.map((n) => (
              <p key={n}>{n}</p>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-line">
        <div className="wrap flex justify-end py-6">
          <CookiePreferencesLink className="text-muted hover:text-ink" />
        </div>
      </footer>
    </>
  )
}
