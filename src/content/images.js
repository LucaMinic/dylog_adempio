// Fotografie da Unsplash (https://unsplash.com/license) servite dal CDN con formato e dimensione automatici.
// Aggiungi qui le foto come { id, alt, position? } e usale con <Photo> / <FramedPhoto>.
export const photos = {}

const WIDTHS = [480, 768, 1080, 1440, 1920, 2400]

export const photoUrl = (p, w = 1600) => `https://images.unsplash.com/photo-${p.id}?auto=format&fit=crop&q=75&w=${w}`
export const photoSrcSet = (p) => WIDTHS.map((w) => `${photoUrl(p, w)} ${w}w`).join(', ')
