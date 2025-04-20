import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),
  ],
  server: {
    host: true,        // <== Hamı daxil ola bilər (0.0.0.0)
    cors: true,        // <== Bütün origin-lərə icazə
    port: 5173,        // <== Lazım olsa portu dəyiş
    strictPort: true,  // <== Port doludursa, dəyişməsin
  }
})
