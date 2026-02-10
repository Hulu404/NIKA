import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Все запросы к /api идут на Flask
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      // Все запросы к /static идут на Flask
      '/static': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    },
    port: 5173,  // React порт
  },
  build: {
    // Собираем в папку static Flask
    outDir: '../backend/static',
    emptyOutDir: true,
  },
  css: {
    postcss: './postcss.config.js', // Указываем конфиг PostCSS
  }
})