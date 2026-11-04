import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// `npm run build` produit le site final (chemins absolus, routes propres).
// `npm run build:demo` produit une version autonome (chemins relatifs, routes en #/)
// qui s'ouvre sur n'importe quel hébergeur statique, sans configuration.
export default defineConfig(({ mode }) => ({
  base: mode === 'demo' ? './' : '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'es2019',
    cssTarget: 'chrome80',
  },
}))
