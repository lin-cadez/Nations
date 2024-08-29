import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import node from 'vite-plugin-node';

export default defineConfig({
  plugins: [react(), node()],
});
