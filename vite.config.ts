import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
      name: 'ssu-media-and-tech-code',
      fileName: 'ssu-media-and-tech-code',
    },
  },
  plugins: [dts()],
  server: {
    port: 3000,
  },
});
