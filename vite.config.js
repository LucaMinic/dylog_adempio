import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// Il sito è pubblicato su GitHub Pages in sottocartella (/dylog_adempio/) dal workflow .github/workflows/pages.yml;
// BASE_PATH permette di cambiarla (es. "/" per un dominio proprio).
export default defineConfig(({ command, isPreview }) => ({
  base: process.env.BASE_PATH || (command === 'build' || isPreview ? '/dylog_adempio/' : '/'),
  plugins: [react(), tailwindcss()],
}))
