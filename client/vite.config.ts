import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
    plugins: [react()],
    mode: 'development',
    server: {
        host: '0.0.0.0',
        port: 3000,
        open: false,
        cors: {
            origin: 'http://localhost:5000'
        }
    },
    resolve: {
        alias: {
          "@": resolve(__dirname, "./src"),
        },
    },
})
