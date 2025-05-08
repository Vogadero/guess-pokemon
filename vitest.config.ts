import { fileURLToPath } from 'node:url';
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      coverage: {
        provider: 'v8',
        reporter: ['lcov', 'text', 'json-summary', 'json'], // 必须包含 lcov
        reportsDirectory: './coverage', // 明确输出目录
        exclude: ['**/__mocks__/**', '**/*.d.ts', '**/.eslintrc.*', 'vite.config.*']
      }
    }
  })
);
