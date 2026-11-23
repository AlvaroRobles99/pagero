import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { inlineCss } from './scripts/inline-css'

export default defineConfig({
  plugins: [react(), inlineCss()],
})
