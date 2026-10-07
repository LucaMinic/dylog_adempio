import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// BASE_PATH: sottocartella di pubblicazione (es. "/dylog_adempio/" su GitHub Pages).
// Di default il sito è servito dalla radice del dominio.
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [react(), tailwindcss()],
})
