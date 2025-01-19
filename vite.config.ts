import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';

  return {
    plugins: [react()],
    server: {
      port: 3000,
      host: true,
      proxy: {
        '/api': {
          target: isProduction
            ? 'https://clientes-production-df47.up.railway.app/'
            : 'http://localhost:3001', // API de desenvolvimento
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom'],
            antd: ['antd'],
          },
        },
      },
      chunkSizeWarningLimit: 1500,
    },
  };
});
