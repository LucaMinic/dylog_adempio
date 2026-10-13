import { Link } from 'react-router-dom'
import { areas } from '../content/areas.js'
import { asset, Eyebrow, Reveal } from '../components/ui.jsx'
import { CookiePreferencesLink } from '../components/consent/CookieConsent.jsx'
import vetrina from '../foto vetrina.jpeg'
import copertina from '../assets/listino-copertina.jpg'

// Le aree senza sotto-aree (Marchi, Varie) elencano i servizi diretti.
const DIRECT = ['marchi', 'varie']
const summary = (area) => {
  const n = area.subareas.length
  return DIRECT.includes(area.slug) ? `${n} ${n === 1 ? 'servizio' : 'servizi'}` : `${n} ${n === 1 ? 'sotto-area' : 'sotto-aree'}`
}

/* Riga dell'indice (come "Aree di servizio" del sito Agenzia Impresa), con tutte le sotto-aree. */
function AreaRow({ area, index }) {
  return (
    <li
      style={{ '--i': index }}
      className="grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 gap-y-2 border-t border-line py-6 md:grid-cols-[3rem_minmax(0,5fr)_minmax(0,6fr)_6.5rem_auto] md:py-7"
    >
      <span className="text-sm font-semibold text-brand tabular-nums">{String(index + 1).padStart(2, '0')}</span>
      <h2 className="text-[1.375rem] font-normal leading-tight tracking-[-0.015em] md:text-[1.625rem]">{area.title}</h2>
      <p className="col-start-2 text-sm leading-relaxed text-muted md:col-start-3 md:row-start-1">{area.subareas.join(' · ')}</p>
      <span className="col-start-2 text-sm text-muted tabular-nums md:col-start-4 md:row-start-1 md:text-right">{summary(area)}</span>
      {/* Copertina del Listino 2026 come accesso ai prezzi dell'area. */}
      <Link
        to={`/servizi/${area.slug}`}
        aria-label={`Listino ${area.title}`}
        className="group col-start-3 row-start-1 flex flex-col items-center gap-1 self-center md:col-start-5"
      >
        <img
          src={copertina}
          alt=""
          width="31"
          height="44"
          className="h-11 w-auto shadow-sm ring-1 ring-line transition-transform duration-200 group-hover:-translate-y-0.5"
        />
        <span className="text-xs font-semibold text-brand group-hover:text-brand-dark">Listino</span>
      </Link>
    </li>
  )
}

export default function Servizi() {
  return (
    <>
      <section className="section bg-mist/50 pt-8 md:pt-12" aria-labelledby="aree">
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

          <div className="mt-20 grid gap-10 md:mt-28 lg:grid-cols-2 lg:items-end lg:gap-16">
            <div>
              <Eyebrow className="mb-6 text-brand">Servizi</Eyebrow>
              <h1 id="aree" className="text-h1 text-balance">
                Aree di servizio
              </h1>
            </div>
            <div>
              <div aria-hidden="true" className="mb-6 h-px w-24 bg-brand md:w-40" />
              <p className="max-w-[56ch] text-[1.0625rem] leading-relaxed md:text-lg">
                Consulta le Aree di Servizio e i relativi adempimenti. Per richiedere uno o più servizi rivolgiti al{' '}
                <strong className="font-extrabold">tuo funzionario commerciale DYLOG</strong> che ti assisterà nella
                procedura di pre-registrazione alla piattaforma ADEMPIO. Successivamente, un operatore di Agenzia Impresa
                provvederà a contattarti per completare la registrazione, fornirti le credenziali di accesso e dare
                assistenza alle tue richieste di servizio.
              </p>
            </div>
          </div>

          <Reveal as="ol" data-stagger="" className="mt-16 border-b border-line md:mt-20">
            {areas.map((a, i) => (
              <AreaRow key={a.slug} area={a} index={i} />
            ))}
          </Reveal>
        </div>
      </section>

      <img
        src={vetrina}
        alt="Agenzia Impresa – Intermediari di adempimenti telematici verso la P.A. per Imprese e Professionisti."
        width="1494"
        height="833"
        loading="lazy"
        decoding="async"
        className="block h-auto w-full"
      />

      <footer className="border-t border-line">
        <div className="wrap flex justify-end py-6">
          <CookiePreferencesLink className="text-muted hover:text-ink" />
        </div>
      </footer>
    </>
  )
}
