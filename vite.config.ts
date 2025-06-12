import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

export default defineConfig({
  // GitHub Pages 保持子路径；AtomGit 使用根路径；开发环境使用根路径
  base:
    process.env.VITE_DEPLOY_TARGET === 'github'
      ? '/guess-pokemon/'
      : process.env.VITE_DEPLOY_TARGET === 'atomgit'
        ? '/guess-pokemon-pages/'
        : process.env.NODE_ENV === 'production'
          ? '/'
          : '/',
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  test: {
    coverage: {
      reporter: ['lcov', 'text-summary'],
      reportsDirectory: './coverage'
    }
  }
});
