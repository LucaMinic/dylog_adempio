import { asset, BrandField, Button, Eyebrow } from '../components/ui.jsx'

const ADEMPIO_URL = 'https://eccotest-adempio-test.azurewebsites.net/'

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
          <div className="mt-12 flex max-w-[36rem] flex-col items-stretch gap-3 sm:items-start md:mt-16">
            <Button to="/servizi" variant="light">
              Esplora i nostri servizi
            </Button>
            <Button to={ADEMPIO_URL} variant="ghostLight" icon="arrowUpRight" className="justify-between text-left">
              Se sei già registrato entra in Adempio per effettuare le tue richieste e verificare i relativi stati di
              avanzamento
            </Button>
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="wrap pb-8 md:pb-12">
        <div className="h-px w-24 bg-white/60 md:w-40" />
      </div>
    </section>
  )
}
