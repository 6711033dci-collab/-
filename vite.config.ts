import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Use relative paths for easy deployment on GitHub Pages
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
});
