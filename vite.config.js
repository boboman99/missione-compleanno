import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base deve corrispondere ESATTAMENTE al nome del repo GitHub
// es: se il repo si chiama "missione-compleanno" → base: '/missione-compleanno/'
export default defineConfig({
  plugins: [react()],
  base: '/missione-compleanno/',
})
