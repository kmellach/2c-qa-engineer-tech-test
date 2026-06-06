import { defineConfig } from '@playwright/test';
import baseConfig from './playwright.config';

export default defineConfig(baseConfig, {
  retries: 1,
  reporter: [
    ['line'],
    ['html', { open: 'never', outputFolder: 'playwright-report-codex' }],
    ['junit', { outputFile: 'test-results-codex/junit.xml' }],
    ['json', { outputFile: 'test-results-codex/results.json' }],
  ],
  use: {
    ...baseConfig.use,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },
});
