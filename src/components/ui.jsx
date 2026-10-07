import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { photoSrcSet, photoUrl } from '../content/images.js'

/* Icone funzionali su griglia 24×24, tratto 1.5 (guideline Icon System). */
const ICONS = {
  arrow: <path d="M4 12h15m-6-6 6 6-6 6" />,
  arrowUpRight: <path d="M7 17 17 7M9 7h8v8" />,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z" />,
  mail: <path d="M3.5 6.5h17v11h-17zM3.5 7l8.5 6.5L20.5 7" />,
  pin: <path d="M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0 1 13 0c0 4.8-6.5 11-6.5 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />,
  login: <path d="M14 4h5v16h-5M10 8l4 4-4 4m4-4H4" />,
  search: <path d="m20 20-4.5-4.5M11 17a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" />,
  menu: <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  chevron: <path d="m6 9 6 6 6-6" />,
  play: <path d="M8 5.5v13l10.5-6.5L8 5.5Z" />,
  pause: <path d="M8 5v14M16 5v14" />,
  userPlus: <path d="M10 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-6.5 8a6.5 6.5 0 0 1 13 0M19 8v6m-3-3h6" />,
  shield: <path d="M12 3 5 6v5c0 4.5 3 8.5 7 10 4-1.5 7-5.5 7-10V6l-7-3Zm-3 9 2 2 4-4" />,
}

export function Icon({ name, className = 'size-5', strokeWidth = 1.5 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
      className={className}
    >
      {ICONS[name]}
    </svg>
  )
}

/* Percorso di un file in public/, compatibile con la pubblicazione in sottocartella. */
export const asset = (p) => import.meta.env.BASE_URL + p.replace(/^\//, '')

const isExternal = (href) => /^(https?:|mailto:|tel:)/.test(href)

export function SmartLink({ to, children, ...rest }) {
  if (isExternal(to)) {
    const ext = to.startsWith('http')
    return (
      <a href={to} {...(ext ? { target: '_blank', rel: 'noopener' } : {})} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <Link to={to} {...rest}>
      {children}
    </Link>
  )
}

/* Button system: primario (Main Blu, angolo a 45°), secondario (outline), su fondo scuro (bianco). */
const BTN_BASE =
  'group relative isolate inline-flex min-h-12 items-center justify-center gap-3 px-6 py-3 text-[0.9375rem] font-semibold tracking-[-0.005em] transition-colors duration-200 ease-[var(--ease-brand)] select-none'

const BTN_VARIANTS = {
  primary:
    'text-white before:absolute before:inset-0 before:-z-10 before:bg-brand before:cut-corner before:transition-colors before:duration-200 hover:before:bg-brand-dark',
  secondary: 'text-ink ring-1 ring-inset ring-ink/80 hover:bg-ink hover:text-white',
  light:
    'text-brand before:absolute before:inset-0 before:-z-10 before:bg-white before:cut-corner before:transition-colors hover:before:bg-mist',
  ghostLight: 'text-white ring-1 ring-inset ring-white/70 hover:bg-white hover:text-brand-dark',
}

export function Button({ to, variant = 'primary', icon = 'arrow', className = '', children, ...rest }) {
  const cls = `${BTN_BASE} ${BTN_VARIANTS[variant]} ${className}`
  const inner = (
    <>
      <span>{children}</span>
      {icon && (
        <Icon name={icon} className="size-[1.125rem] shrink-0 transition-transform duration-200 ease-[var(--ease-brand)] group-hover:translate-x-1" />
      )}
    </>
  )
  if (to) {
    return (
      <SmartLink to={to} className={cls} {...rest}>
        {inner}
      </SmartLink>
    )
  }
  return (
    <button className={cls} {...rest}>
      {inner}
    </button>
  )
}

/* Link terziario con freccia. */
export function ArrowLink({ to, children, className = '', icon = 'arrow' }) {
  return (
    <SmartLink
      to={to}
      className={`group inline-flex items-center gap-2 font-semibold text-brand hover:text-brand-dark ${className}`}
    >
      <span className="link-draw pb-0.5">{children}</span>
      <Icon name={icon} className="size-[1.1em] transition-transform duration-200 ease-[var(--ease-brand)] group-hover:translate-x-1" />
    </SmartLink>
  )
}

export function Eyebrow({ children, className = '' }) {
  return (
    <p className={`eyebrow flex items-center gap-3 ${className}`}>
      <span aria-hidden="true" className="inline-block size-2 bg-current [clip-path:polygon(0_0,100%_0,0_100%)]" />
      {children}
    </p>
  )
}

/* Rivela l'elemento quando entra nel viewport (solo transform/opacity). */
export function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) {
      el?.classList.add('is-in')
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            io.unobserve(e.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}

export function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const ref = useReveal()
  return (
    <Tag ref={ref} data-reveal="" className={className} {...rest}>
      {children}
    </Tag>
  )
}

/*
 * Gradiente di brand (guideline p. 52): fondo Main Blu con due quadrati a 45°
 * sfumati in nero (0→60%, moltiplica), speculari lungo un'area di contatto.
 */
export function BrandField({ className = '', variant = 'a' }) {
  const id = `bf-${variant}`
  const shapes =
    variant === 'a'
      ? [
          { x: 1120, y: -40, s: 980, rot: 45, from: '0%', to: '100%' },
          { x: 1120, y: 1060, s: 980, rot: 45, from: '100%', to: '0%' },
        ]
      : [
          { x: 260, y: -120, s: 900, rot: 45, from: '0%', to: '100%' },
          { x: 1500, y: 980, s: 1100, rot: 45, from: '100%', to: '0%' },
        ]
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {shapes.map((sh, i) => (
          <linearGradient key={i} id={`${id}-${i}`} x1="0" y1={sh.from} x2="0" y2={sh.to}>
            <stop offset="0" stopColor="#000" stopOpacity="0" />
            <stop offset="1" stopColor="#000" stopOpacity="0.6" />
          </linearGradient>
        ))}
      </defs>
      <rect width="1600" height="900" fill="var(--color-brand)" />
      {shapes.map((sh, i) => (
        <rect
          key={i}
          x={sh.x - sh.s / 2}
          y={sh.y - sh.s / 2}
          width={sh.s}
          height={sh.s}
          fill={`url(#${id}-${i})`}
          style={{ mixBlendMode: 'multiply' }}
          transform={`rotate(${sh.rot} ${sh.x} ${sh.y})`}
        />
      ))}
    </svg>
  )
}

export function Breadcrumb({ items, className = '' }) {
  return (
    <nav aria-label="Percorso" className={className}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true" className="text-line">/</span>}
            {it.to && i < items.length - 1 ? (
              <Link to={it.to} className="link-draw inline-block py-0.5 hover:text-ink">
                {it.label}
              </Link>
            ) : (
              <span aria-current={i === items.length - 1 ? 'page' : undefined} className="text-ink">
                {it.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

/* Fotografia responsive dal CDN Unsplash (formato e dimensione automatici).
   photo.position (facoltativo): punto da tenere al centro del ritaglio, es. 'center 20%'. */
export function Photo({ photo, sizes = '100vw', className = '', eager = false, width = 1600, height = 1000 }) {
  return (
    <img
      src={photoUrl(photo, 1600)}
      srcSet={photoSrcSet(photo)}
      sizes={sizes}
      alt={photo.alt}
      width={width}
      height={height}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : undefined}
      decoding="async"
      style={photo.position ? { objectPosition: photo.position } : undefined}
      className={`h-full w-full object-cover ${className}`}
    />
  )
}

/* Immagine incorniciata con l'angolo tagliato a 45° e un leggero tocco di blu (guideline foto). */
export function FramedPhoto({ photo, className = '', aspect = 'aspect-[4/3]', sizes, eager, reveal = !eager }) {
  const ref = useReveal()
  return (
    <figure
      ref={reveal ? ref : undefined}
      data-reveal-photo={reveal ? '' : undefined}
      className={`relative isolate overflow-hidden bg-mist cut-corner [--cut:28px] ${aspect} ${className}`}
    >
      {/* Svelamento lungo la diagonale a 45° (solo per le foto fuori dalla prima schermata) */}
      <div className="reveal-photo absolute inset-0">
        <Photo photo={photo} sizes={sizes} eager={eager} />
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-brand mix-blend-soft-light opacity-25" />
      </div>
    </figure>
  )
}

/* Testata delle pagine interne: fondo chiaro, titolo Light, filo blu. Con `image` aggiunge una fascia fotografica. */
export function PageHero({ eyebrow, title, lead, crumbs, children, aside, image, media }) {
  return (
    <header className="relative border-b border-line pt-28 md:pt-36">
      <div className="wrap pb-14 md:pb-20">
        {crumbs && <Breadcrumb items={crumbs} className="mb-10 md:mb-14" />}
        <div className="grid gap-10 lg:grid-cols-8 lg:gap-6">
          <div className={aside ? 'lg:col-span-5' : 'lg:col-span-7'}>
            {eyebrow && <Eyebrow className="mb-6 text-brand">{eyebrow}</Eyebrow>}
            <h1 className="text-h1 text-balance">{title}</h1>
            {lead && <p className="text-lead mt-8 max-w-[52ch] text-muted">{lead}</p>}
            {children}
          </div>
          {aside && <div className="lg:col-span-3 lg:pt-2">{aside}</div>}
        </div>
      </div>
      {media && <div className="wrap pb-12 md:pb-16">{media}</div>}
      {image && !media && (
        <div className="wrap pb-12 md:pb-16">
          <FramedPhoto photo={image} eager aspect="aspect-[16/9] md:aspect-[21/8]" sizes="(min-width: 1440px) 1280px, 92vw" />
        </div>
      )}
      <div aria-hidden="true" className="absolute bottom-0 left-0 h-px w-24 translate-y-px bg-brand md:w-40" />
    </header>
  )
}

/* Contenuti originali: paragrafi, elenchi puntati, righe di tabella, link. */
export function Blocks({ blocks, className = '' }) {
  const out = []
  let list = null
  blocks.forEach((b, i) => {
    if (b.type === 'li' || b.type === 'item') {
      if (!list) {
        list = { key: i, kind: b.type, items: [] }
        out.push(list)
      }
      list.items.push(b.text)
      return
    }
    list = null
    out.push(b)
  })
  return (
    <div className={`prose-ai ${className}`}>
      {out.map((b, i) => {
        if (b.items) {
          return (
            <ul key={i}>
              {b.items.map((t, j) => (
                <li key={j}>{t}</li>
              ))}
            </ul>
          )
        }
        if (b.type === 'h2') return <h2 key={i}>{b.text}</h2>
        if (b.type === 'ul')
          return (
            <ul key={i}>
              {b.items.map((t, j) => (
                <li key={j}>{t}</li>
              ))}
            </ul>
          )
        if (b.type === 'link')
          return (
            <p key={i}>
              <ArrowLink to={b.href} icon="arrowUpRight" className="no-underline [&]:text-brand">
                {b.text}
              </ArrowLink>
            </p>
          )
        return <p key={i}>{b.text}</p>
      })}
    </div>
  )
}
