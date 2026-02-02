import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 9874,
  },
  plugins: [react()],
  css: {
    postcss: './postcss.config.mjs',
  },
})