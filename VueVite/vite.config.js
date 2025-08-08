import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    port: 5000,
    allowedHosts: [
      '6458c63f-7459-41e4-83f8-5262db1ada31-00-1w241ejzh4u5v.riker.replit.dev'
    ]
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})
