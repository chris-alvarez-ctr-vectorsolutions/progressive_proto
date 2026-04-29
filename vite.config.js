import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves this at https://<user>.github.io/progressive_proto/
// so all assets need to resolve relative to that subpath.
export default defineConfig({
  plugins: [react()],
  base: '/progressive_proto/',
})
