import { test, expect } from '@playwright/test'

test.describe('Page Loading Functional Tests', () => {
  const pages = [
    { path: '/', title: 'Expression Neuroscience Institute' },
    { path: '/about', title: 'About' },
    { path: '/research', title: 'Research' },
    { path: '/roadmap', title: 'Roadmap' },
    { path: '/programs', title: 'Programs' },
    { path: '/donate', title: 'Donate' },
    { path: '/governance', title: 'Governance' },
  ]

  for (const pageInfo of pages) {
    test(`should load ${pageInfo.path} page correctly`, async ({ page }) => {
      await page.goto(pageInfo.path)
      
      // Check page title
      await expect(page).toHaveTitle(new RegExp(pageInfo.title))
      
      // Check that main content is loaded
      await expect(page.locator('main')).toBeVisible()
      
      // Check that navigation is present
      await expect(page.locator('nav')).toBeVisible()
      
      // Check that footer is present
      await expect(page.locator('footer')).toBeVisible()
      
      // Check for no console errors
      const consoleErrors: string[] = []
      page.on('console', msg => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text())
        }
      })
      
      await page.waitForLoadState('networkidle')
      
      expect(consoleErrors).toHaveLength(0)
    })
  }

  test('should handle 404 pages gracefully', async ({ page }) => {
    await page.goto('/non-existent-page')
    
    // Should not crash and should show some content
    await expect(page.locator('body')).toBeVisible()
  })

  test('should load images correctly', async ({ page }) => {
    await page.goto('/')
    
    const images = await page.locator('img').all()
    
    for (const img of images) {
      const src = await img.getAttribute('src')
      if (src) {
        // Check if image loads without errors
        await expect(img).toBeVisible()
        
        // Check if image has proper dimensions
        const boundingBox = await img.boundingBox()
        expect(boundingBox).toBeTruthy()
      }
    }
  })

  test('should have proper meta tags', async ({ page }) => {
    await page.goto('/')
    
    // Check for essential meta tags
    const viewport = page.locator('meta[name="viewport"]')
    await expect(viewport).toBeVisible()
    
    const description = page.locator('meta[name="description"]')
    await expect(description).toBeVisible()
  })

  test('should have proper structured data', async ({ page }) => {
    await page.goto('/')
    
    // Check for JSON-LD structured data
    const structuredData = page.locator('script[type="application/ld+json"]')
    await expect(structuredData).toBeVisible()
  })
}) 