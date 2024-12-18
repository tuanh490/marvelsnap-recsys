import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  }
})