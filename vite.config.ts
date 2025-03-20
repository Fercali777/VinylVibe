import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api/discogs': {
        target: 'https://api.discogs.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/discogs/, ''),
      },
    },
  },
});