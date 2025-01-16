import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Porta correta para o Vite
    host: true, // Expondo o servidor para a rede local
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Dividir dependências grandes em chunks separados
          react: ['react', 'react-dom'], // React e React DOM separados
          antd: ['antd'], // Biblioteca Ant Design em seu próprio chunk
        },
      },
    },
    chunkSizeWarningLimit: 1500, // Aumentar o limite de aviso para 1.5 MB
  },
});
