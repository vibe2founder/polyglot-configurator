import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 9874,
    watch: {
      usePolling: true,
    },
    hmr: true,
  },
  preview: {
    port: 9874,
    allowedHosts: ["one-configurator-4-all.purecore.codes"],
  },
  plugins: [react()],
  css: {
    postcss: "./postcss.config.mjs",
  },
});