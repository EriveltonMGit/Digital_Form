import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Porta correta para o Vite
    host: true, // Expondo o servidor para a rede local
  },
});
