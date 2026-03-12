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
        name: "Milk Monthly Calculator",
        short_name: "MilkApp",
        description: "Milk collection monthly calculator",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/src/assets/logo.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/src/assets/logo.png",
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