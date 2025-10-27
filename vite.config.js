import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.svg', '**/*.webp'],
  server: {
    headers: {
      'Cross-Origin-Resource-Policy': 'cross-origin', // ✅ allow external images
    },
  },
  build: {
    assetsInlineLimit: 0, // ✅ prevents image bundling issues
  }
});
