import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    defaultCommandTimeout: 10000, // 全局超时设置
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    video: true,
    screenshotOnRunFailure: true,
    supportFile: false,
    setupNodeEvents(on, config) {
      // 加载环境变量
      config.env = process.env;
      return config;
    },
    env: {
      baseUrl: process.env.VITE_BASE_URL || '/' // 同步环境变量
    }
  }
});
