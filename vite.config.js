import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Do not add 'react-router-dom' here unless you explicitly want it to be external
    }
  }
});
