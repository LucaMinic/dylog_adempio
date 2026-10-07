import { Link } from 'react-router-dom'
import { areas } from '../content/areas.js'
import { asset, Eyebrow, Reveal } from '../components/ui.jsx'

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
      className="grid grid-cols-[2.5rem_1fr] items-baseline gap-x-4 gap-y-2 border-t border-line py-6 md:grid-cols-[3rem_minmax(0,5fr)_minmax(0,6fr)_6.5rem] md:py-7"
    >
      <span className="text-sm font-semibold text-brand tabular-nums">{String(index + 1).padStart(2, '0')}</span>
      <h2 className="text-[1.375rem] font-normal leading-tight tracking-[-0.015em] md:text-[1.625rem]">{area.title}</h2>
      <p className="col-start-2 text-sm leading-relaxed text-muted md:col-start-3 md:row-start-1">{area.subareas.join(' · ')}</p>
      <span className="col-start-2 text-sm text-muted tabular-nums md:col-start-4 md:row-start-1 md:text-right">{summary(area)}</span>
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

          <div className="mt-20 md:mt-28">
            <Eyebrow className="mb-6 text-brand">Servizi</Eyebrow>
            <h1 id="aree" className="text-h1 text-balance">
              Aree di servizio
            </h1>
          </div>

          <Reveal as="ol" data-stagger="" className="mt-16 border-b border-line md:mt-20">
            {areas.map((a, i) => (
              <AreaRow key={a.slug} area={a} index={i} />
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section">
        <Reveal className="wrap">
          <div aria-hidden="true" className="mb-10 h-px w-24 bg-brand md:w-40" />
          <p className="text-lead max-w-[52ch] text-balance">
            Per registrarti, rivolgiti al tuo funzionario commerciale, che ti assisterà nella procedura di
            pre-registrazione. Successivamente, un operatore di Agenzia Impresa S.A. ti contatterà per completare la
            registrazione e fornirti le credenziali di accesso.
          </p>
        </Reveal>
      </section>
    </>
  )
}
