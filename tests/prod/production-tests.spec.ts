import { test, expect } from '@playwright/test'

test.describe('Production Environment Tests @prod', () => {
  test('should have production optimizations', async ({ page }) => {
    await page.goto('/')
    
    // Check for production indicators
    const isProd = await page.evaluate(() => {
      return process.env.NODE_ENV === 'production' || 
             window.location.hostname !== 'localhost'
    })
    
    expect(isProd).toBeTruthy()
  })

  test('should have analytics tracking', async ({ page }) => {
    await page.goto('/')
    
    // Check for analytics scripts
    const analyticsScripts = await page.locator('script[src*="vercel"]').all()
    expect(analyticsScripts.length).toBeGreaterThan(0)
  })

  test('should have proper SEO meta tags', async ({ page }) => {
    await page.goto('/')
    
    // Check for essential SEO meta tags
    const metaTags = [
      'description',
      'keywords',
      'author',
      'robots',
      'viewport'
    ]
    
    for (const tag of metaTags) {
      const meta = page.locator(`meta[name="${tag}"]`)
      const count = await meta.count()
      expect(count).toBeGreaterThanOrEqual(1)
    }
  })

  test('should have proper Open Graph tags', async ({ page }) => {
    await page.goto('/')
    
    // Check for Open Graph meta tags
    const ogTags = [
      'og:title',
      'og:description',
      'og:type',
      'og:url',
      'og:image'
    ]
    
    for (const tag of ogTags) {
      const meta = page.locator(`meta[property="${tag}"]`)
      const count = await meta.count()
      expect(count).toBeGreaterThanOrEqual(1)
    }
  })

  test('should have proper Twitter Card tags', async ({ page }) => {
    await page.goto('/')
    
    // Check for Twitter Card meta tags  
    const twitterTags = [
      'twitter:card',
      'twitter:title',
      'twitter:description',
      'twitter:image'
    ]
    
    for (const tag of twitterTags) {
      const meta = page.locator(`meta[name="${tag}"]`)
      const count = await meta.count()
      expect(count).toBeGreaterThanOrEqual(1)
    }
  })

  test('should have proper structured data', async ({ page }) => {
    await page.goto('/')
    
    // Check for JSON-LD structured data
    const structuredData = page.locator('script[type="application/ld+json"]')
    const count = await structuredData.count()
    expect(count).toBeGreaterThanOrEqual(1)
    
    // Verify structured data content
    const jsonContent = await structuredData.first().textContent()
    expect(jsonContent).toBeTruthy()
    
    // Parse and validate JSON
    const parsed = JSON.parse(jsonContent!)
    expect(parsed['@type']).toBe('NonprofitOrganization')
  })

  test('should have proper security headers', async ({ page }) => {
    const response = await page.goto('/')
    
    if (response) {
      const headers = response.headers()
      
      // Check for security headers
      expect(headers['x-frame-options']).toBeTruthy()
      expect(headers['x-content-type-options']).toBeTruthy()
      expect(headers['referrer-policy']).toBeTruthy()
    }
  })

  test('should have proper caching headers', async ({ page }) => {
    const response = await page.goto('/')
    
    if (response) {
      const headers = response.headers()
      
      // Check for caching headers
      expect(headers['cache-control']).toBeTruthy()
    }
  })

  test('should have proper compression', async ({ page }) => {
    const response = await page.goto('/')
    
    if (response) {
      const headers = response.headers()
      
      // Check for compression
      expect(headers['content-encoding']).toBeTruthy()
    }
  })

  test('should have no console errors in production', async ({ page }) => {
    const consoleErrors: string[] = []
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    // In production, there should be no console errors
    expect(consoleErrors).toHaveLength(0)
  })

  test('should have proper error handling', async ({ page }) => {
    // Test 404 page
    await page.goto('/non-existent-page')
    
    // Should not crash and should show proper error handling
    await expect(page.locator('body')).toBeVisible()
    
    // Should have proper status code handling
    const response = await page.goto('/non-existent-page')
    if (response) {
      expect(response.status()).toBe(404)
    }
  })

  test('should have proper performance in production', async ({ page }) => {
    const startTime = Date.now()
    
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    const loadTime = Date.now() - startTime
    
    // Production should load within 2 seconds
    expect(loadTime).toBeLessThan(2000)
  })
}) 