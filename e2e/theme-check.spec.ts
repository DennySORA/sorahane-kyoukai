import { test, expect } from '@playwright/test';

const pages = [
  { path: '/galgame', effectSelector: '.sakura-canvas', name: 'Galgame (Sakura)' },
  { path: '/anime', effectSelector: '.feather-canvas', name: 'Anime (Feathers)' },
  { path: '/programming', effectSelector: '.matrix-canvas', name: 'Programming (Matrix)' },
  { path: '/thoughts', effectSelector: '.ripple-container', name: 'Thoughts (Ripple)' },
  { path: '/writing', effectSelector: '.ink-container', name: 'Writing (Ink)' },
  { path: '/health', effectSelector: '.aurora-container', name: 'Health (Aurora)' },
  { path: '/music', effectSelector: '.visualizer-container', name: 'Music (Visualizer)' },
];

test.describe('Theme Visualization Checks', () => {
  for (const pageInfo of pages) {
    test(`should render ${pageInfo.name} without errors`, async ({ page }) => {
      const consoleErrors: string[] = [];
      page.on('console', msg => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      await page.goto(pageInfo.path);
      
      // Check for console errors
      expect(consoleErrors).toEqual([]);

      // Check title exists (layout didn't crash)
      await expect(page.locator('h1.category-title')).toBeVisible();

      // Check background effect exists
      await expect(page.locator(pageInfo.effectSelector)).toBeAttached();

      // Check articles are present (layout check)
      await expect(page.locator('.articles-grid')).toBeVisible();
      await expect(page.locator('.article-card').first()).toBeVisible();
    });
  }
});
