import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
plugins: [react()],
build: {
    // Собираем в папку static Flask
    outDir: '../backend/static',
    emptyOutDir: true,
  },
  css: {
    postcss: './postcss.config.js', // Указываем конфиг PostCSS
  },
  server: {
    host: '0.0.0.0',        // слушать все интерфейсы
    port: 5173,              // порт фронта
    proxy: {
      // Все запросы к /api идут на Flask
      '/api': {
          target: 'http://127.0.0.1:5001',
          changeOrigin: true,
      },
      // Все запросы к /static идут на Flask
      '/static': {
          target: 'http://127.0.0.1:5001',
          changeOrigin: true,
      }
    },
  },

})