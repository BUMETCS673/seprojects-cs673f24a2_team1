import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';

// Use the `defineConfig` helper for proper type inference
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths() // Ensure this plugin is correctly imported
  ],
});
