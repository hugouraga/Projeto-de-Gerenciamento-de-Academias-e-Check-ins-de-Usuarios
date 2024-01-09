import { defineConfig } from 'vitest/dist/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environmentMatchGlobs: [['src/http/controller/**', 'prisma']],
  },
});
