import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: "Dairy-book Calculator",
        short_name: "Dairy-book",
        description: "Milk collection monthly calculator",
        theme_color: "#ffffff",
        icons: [
          {
            src: "public/logo.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "public/logo.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    })
  ],

  server: {
    host: true,
  }

})