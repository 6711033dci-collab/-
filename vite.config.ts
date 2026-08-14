import { defineConfig } from 'vite';

export default defineConfig({
  base: '/-/', // GitHub Pages: https://6711033dci-collab.github.io/-/
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
});
