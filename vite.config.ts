import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Split long-lived vendor libraries into their own chunks so browsers
        // can cache them across releases (they rarely change together).
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'react-bootstrap': ['react-bootstrap', 'bootstrap'],
          'i18n': ['i18next', 'react-i18next', 'i18next-browser-languagedetector'],
        },
      },
    },
  },
})
