import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

export default defineConfig({
  plugins: [
    react(),
    dts({
      outDir: 'dist',
      rollupTypes: true,
    }),
    cssInjectedByJsPlugin(),
  ],
  build: {
    emptyOutDir: true,
    outDir: 'dist',
    minify: 'terser',
    lib: {
      entry: './src/index.ts',
      name: 'Scrollbar',
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        compact: true,
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    sourcemap: false,
  },
});
