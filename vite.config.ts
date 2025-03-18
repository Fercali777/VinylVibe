import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/discogs': {
        target: 'https://api.discogs.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/discogs/, ''),
      },
    },
  },
});