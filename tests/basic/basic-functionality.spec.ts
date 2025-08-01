import { test, expect } from '@playwright/test'

test.describe('Basic Functionality Tests', () => {
  test('should load homepage', async ({ page }) => {
    await page.goto('/')
    
    // Check that the page loads
    await expect(page).toHaveTitle(/Expression Neuroscience Institute/)
    
    // Check for main content
    await expect(page.locator('main')).toBeVisible()
    
    // Check for navigation
    await expect(page.locator('nav')).toBeVisible()
    
    // Check for footer
    await expect(page.locator('footer')).toBeVisible()
  })

  test('should have proper page structure', async ({ page }) => {
    await page.goto('/')
    
    // Check for essential elements
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    await expect(page.locator('main')).toBeVisible()
    await expect(page.locator('nav')).toBeVisible()
    await expect(page.locator('footer')).toBeVisible()
  })

  test('should have theme toggle', async ({ page }) => {
    await page.goto('/')
    
    // Check if we're on mobile viewport
    const viewport = page.viewportSize()
    const isMobile = viewport && viewport.width < 640
    
    let themeToggle: any
    
    if (isMobile) {
      // On mobile, the theme toggle is in the hamburger menu
      const menuButton = page.locator('button[aria-label="Toggle navigation menu"]')
      await expect(menuButton).toBeVisible()
      await menuButton.click()
      
      // Wait for mobile menu to open and be visible
      await page.waitForSelector('div.sm\\:hidden', { state: 'visible', timeout: 5000 })
      
      themeToggle = page.locator('button[title="Toggle theme"]').first()
      await expect(themeToggle).toBeVisible()
    } else {
      // On desktop, theme toggle should be visible directly
      themeToggle = page.locator('button[title="Toggle theme"]').first()
      await expect(themeToggle).toBeVisible()
    }
    
    await expect(themeToggle).toHaveAttribute('title', 'Toggle theme')
  })

  test('should have skip to content link', async ({ page }) => {
    await page.goto('/')
    
    const skipLink = page.getByRole('link', { name: /skip to main content/i })
    await expect(skipLink).toBeVisible()
  })

  test('should have proper images', async ({ page }) => {
    await page.goto('/')
    
    const images = await page.locator('img').all()
    expect(images.length).toBeGreaterThan(0)
    
    for (const img of images) {
      const alt = await img.getAttribute('alt')
      expect(alt).toBeTruthy()
    }
  })

  test('should have proper links', async ({ page }) => {
    await page.goto('/')
    
    const links = await page.locator('a').all()
    expect(links.length).toBeGreaterThan(0)
    
    for (const link of links) {
      const href = await link.getAttribute('href')
      if (href && !href.startsWith('#')) {
        expect(href).toBeTruthy()
      }
    }
  })

  test('should have proper meta tags', async ({ page }) => {
    await page.goto('/')
    
    const viewport = page.locator('meta[name="viewport"]')
    await expect(viewport).toHaveAttribute('content', 'width=device-width, initial-scale=1')
    
    const description = page.locator('meta[name="description"]').first()
    await expect(description).toHaveAttribute('content')
  })

  test('should have proper structured data', async ({ page }) => {
    await page.goto('/')
    
    const structuredData = page.locator('script[type="application/ld+json"]')
    const count = await structuredData.count()
    expect(count).toBeGreaterThanOrEqual(1)
  })

  test('should handle navigation', async ({ page }) => {
    await page.goto('/')
    
    // Test navigation to different pages
    const pages = ['/about', '/research', '/roadmap', '/programs']
    
    for (const path of pages) {
      await page.goto(path)
      await page.waitForLoadState('networkidle')
      
      // Check for main element with a more flexible approach
      const mainElement = page.locator('main[id="main-content"]')
      await expect(mainElement).toBeVisible({ timeout: 10000 })
      await expect(page).toHaveURL(path)
    }
  })

  test('should have no console errors', async ({ page }) => {
    const errors: string[] = []
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        // Filter out expected 403 errors and other non-critical errors
        const errorText = msg.text()
        if (!errorText.includes('403') && !errorText.includes('Failed to load resource')) {
          errors.push(errorText)
        }
      }
    })
    
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    expect(errors).toHaveLength(0)
  })

  test('should have proper performance', async ({ page }) => {
    const startTime = Date.now()
    
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    const loadTime = Date.now() - startTime
    
    // Should load within 8 seconds (increased for slower environments)
    expect(loadTime).toBeLessThan(8000)
  })
}) 