import * as path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa';

const configPwa: Partial<VitePWAOptions> = {
  registerType: 'autoUpdate',
  devOptions: {
    enabled: true,
    type: 'module',
    navigateFallback: '/',
  },
  includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
  manifest: {
    id: '0c9d8ashfdas43128hfde',
    name: 'Offline First Poc',
    short_name: 'OFP',
    description: 'Aplicativo Offline para Jonas Júnior',
    theme_color: '#ffffff',
    start_url: '/',
    icons: [
      {
        src: 'logo-192X192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'logo-512X512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: 'logo-512X512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: 'logo-512X512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: 'logo-180X180.png',
        sizes: '180x180',
        type: 'image/png',
      },
      {
        src: 'logo-64X64.png',
        sizes: '64x64',
        type: 'image/png',
      },
    ],
    screenshots: [
      {
        src: 'desktop-screenshot.png',
        sizes: '1280x720',
        type: 'image/png',
        form_factor: 'wide',
        label: 'Tela principal do aplicativo no desktop',
      },
      {
        src: 'mobile-screenshot.png',
        sizes: '750x1334',
        type: 'image/png',
        label: 'Tela principal do aplicativo no celular',
      },
    ],
    display: 'standalone', // Modo de exibição app-like
  },
  workbox: {
    clientsClaim: true,
    skipWaiting: true,
    globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/api\.example\.com\/.*/i,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'api-cache',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24, // 24 horas
          },
        },
      },
    ],
  },
};

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 5000,
  },
  preview: {
    port: 8080,
  },
  plugins: [react(), tailwindcss(), VitePWA(configPwa)],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
});
