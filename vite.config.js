import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// In build il sito è pubblicato su GitHub Pages in sottocartella (/dylog_adempio/);
// BASE_PATH permette di cambiarla (es. "/" per un dominio proprio).
export default defineConfig(({ command, isPreview }) => ({
  base: process.env.BASE_PATH || (command === 'build' || isPreview ? '/dylog_adempio/' : '/'),
  plugins: [react(), tailwindcss()],
}))
