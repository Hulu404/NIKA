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
  // Локальная разработка (берем данные с сервера, так как локальный бэкенд не настроен)
  server: {
    host: '0.0.0.0',        // слушать все интерфейсы
    port: 5173,              // порт фронта
    proxy: {
      // Все запросы к /api идут на Flask
      '/api': {
        target: 'http://178.72.164.141:5001',
        changeOrigin: true,
      },
      // Все запросы к /static идут на Flask
      '/static': {
        target: 'http://178.72.164.141:5001',
        changeOrigin: true,
      }
    },
  },

})