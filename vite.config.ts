import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base is relative so the built portal can be opened from any static host
// (GitHub Pages sub-path, internal file share, S3, etc.)
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
})
