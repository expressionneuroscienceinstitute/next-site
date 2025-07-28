import { test, expect } from '@playwright/test'

test.describe('Theme Unit Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should toggle theme', async ({ page }) => {
    const themeToggle = page.getByRole('button', { name: /toggle theme/i })
    await expect(themeToggle).toBeVisible()
    
    // Get initial theme state
    const initialTheme = await page.evaluate(() => {
      return document.documentElement.classList.contains('dark')
    })
    
    await themeToggle.click()
    
    // Wait for theme change
    await page.waitForTimeout(100)
    
    const newTheme = await page.evaluate(() => {
      return document.documentElement.classList.contains('dark')
    })
    
    expect(newTheme).not.toBe(initialTheme)
  })

  test('should persist theme preference', async ({ page }) => {
    const themeToggle = page.getByRole('button', { name: /toggle theme/i })
    
    // Toggle theme
    await themeToggle.click()
    await page.waitForTimeout(100)
    
    // Reload page
    await page.reload()
    
    // Check if theme preference persisted
    const themeState = await page.evaluate(() => {
      return localStorage.getItem('theme')
    })
    
    expect(themeState).toBeTruthy()
  })

  test('should have proper theme toggle accessibility', async ({ page }) => {
    const themeToggle = page.getByRole('button', { name: /toggle theme/i })
    
    await expect(themeToggle).toHaveAttribute('title', 'Toggle theme')
    await expect(themeToggle).toBeEnabled()
  })
}) 