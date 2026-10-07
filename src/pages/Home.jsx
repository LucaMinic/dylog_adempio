import { asset, BrandField, Eyebrow, Icon, SmartLink } from '../components/ui.jsx'
import { CookiePreferencesLink } from '../components/consent/CookieConsent.jsx'

const ADEMPIO_URL = 'https://eccotest-adempio-test.azurewebsites.net/'

/*
 * Le due azioni come riquadri distinti: "Servizi" pieno bianco (angolo a 45°), "Adempio" su vetro con filo bianco.
 * Ognuno ha etichetta, testo e icona propri, così è chiaro che portano in posti diversi.
 */
const ACTION_BASE =
  'group relative isolate flex min-h-44 flex-col justify-between gap-8 p-6 transition-colors duration-200 ease-[var(--ease-brand)] md:min-h-52 md:p-8'

function Action({ to, index, label, icon, variant, children }) {
  const light = variant === 'light'
  return (
    <SmartLink
      to={to}
      className={`${ACTION_BASE} ${
        light
          ? 'text-brand before:absolute before:inset-0 before:-z-10 before:bg-white before:cut-corner before:[--cut:24px] before:transition-colors hover:before:bg-mist'
          : 'bg-white/[0.06] text-white ring-1 ring-inset ring-white/60 backdrop-blur-sm hover:bg-white hover:text-brand-dark'
      }`}
    >
      <span className="flex items-center justify-between gap-4">
        <span className={`eyebrow flex items-center gap-3 ${light ? 'text-brand' : 'text-white/80 group-hover:text-brand'}`}>
          <span className="tabular-nums">{index}</span>
          <span aria-hidden="true" className="h-px w-6 bg-current" />
          {label}
        </span>
        <Icon
          name={icon}
          className="size-6 shrink-0 transition-transform duration-200 ease-[var(--ease-brand)] group-hover:translate-x-1 group-hover:-translate-y-0.5"
        />
      </span>
      <span className="text-[1.1875rem] font-semibold leading-snug tracking-[-0.01em] md:text-[1.375rem]">{children}</span>
    </SmartLink>
  )
}

/* Pagina di benvenuto: fondo Main Blu con gradiente di brand, titolo grande e due CTA. */
export default function Home() {
  return (
    <section className="on-dark relative isolate flex min-h-[max(640px,100svh)] flex-col overflow-hidden bg-brand-dark text-white">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <BrandField variant="a" />
        {/* Velatura verso sinistra per dare profondità e leggibilità al titolo */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#00103f]/70 via-[#00103f]/25 to-transparent" />
        {/* Taglio diagonale a 45° (layout system guideline) */}
        <div className="absolute -bottom-px right-0 hidden h-[34%] w-[26%] bg-white/[0.06] [clip-path:polygon(100%_0,100%_100%,0_100%)] md:block" />
      </div>

      <header className="wrap pt-8 md:pt-12">
        <img
          src={asset('brand/agenzia-impresa-negativo.svg')}
          alt="Agenzia Impresa – Buffetti Group"
          width="544"
          height="82"
          className="h-auto w-[208px] sm:w-[248px] xl:w-[268px]"
        />
      </header>

      <div className="wrap flex flex-1 flex-col justify-center py-20 md:py-28">
        <div className="hero-in max-w-[62rem]">
          <Eyebrow className="mb-8 text-white">Agenzia Impresa · Buffetti Group</Eyebrow>
          <h1 className="text-display max-w-[14ch] text-balance">Benvenuto in Agenziaimpresa</h1>
          <div className="mt-12 grid max-w-[60rem] gap-4 md:mt-16 md:grid-cols-2 md:gap-6">
            <Action to="/servizi" index="01" label="Servizi" icon="arrow" variant="light">
              Esplora i nostri servizi
            </Action>
            <Action to={ADEMPIO_URL} index="02" label="Adempio" icon="arrowUpRight" variant="glass">
              Se sei già registrato entra in Adempio per effettuare le tue richieste e verificare i relativi stati di
              avanzamento
            </Action>
          </div>
        </div>
      </div>

      <div className="wrap flex items-center justify-between gap-6 pb-8 md:pb-12">
        <div aria-hidden="true" className="h-px w-24 bg-white/60 md:w-40" />
        <CookiePreferencesLink className="text-white/80 hover:text-white" />
      </div>
    </section>
  )
}
