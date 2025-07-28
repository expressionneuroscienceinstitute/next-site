import { test, expect } from '@playwright/test'
import { TestHelpers } from '../utils/test-helpers'

test.describe('Comprehensive Site Tests', () => {
  const pages = [
    '/',
    '/about',
    '/research',
    '/roadmap',
    '/programs',
    '/donate',
    '/governance',
  ]

  for (const pagePath of pages) {
    test(`comprehensive test for ${pagePath}`, async ({ page }) => {
      await page.goto(pagePath)
      await TestHelpers.waitForPageLoad(page)

      // Check page structure
      const structure = await TestHelpers.checkPageStructure(page)
      expect(structure.hasHeader).toBeTruthy()
      expect(structure.hasMain).toBeTruthy()
      expect(structure.hasFooter).toBeTruthy()
      expect(structure.hasSkipLink).toBeTruthy()

      // Check page title
      const title = await TestHelpers.checkPageTitle(page)
      expect(title).toBeTruthy()
      expect(title.length).toBeGreaterThan(0)

      // Check page URL
      const url = await TestHelpers.checkPageURL(page)
      expect(url).toContain(pagePath)

      // Check page content
      const content = await TestHelpers.checkPageContent(page)
      expect(content).toBeTruthy()
      expect(content!.length).toBeGreaterThan(0)

      // Check navigation
      const navigation = await TestHelpers.checkNavigation(page)
      for (const [item, isVisible] of Object.entries(navigation)) {
        if (item === 'Home') {
          // Home link should be visible
          expect(isVisible).toBeTruthy()
        } else {
          // Other nav items should be visible
          expect(isVisible).toBeTruthy()
        }
      }

      // Check footer
      const footer = await TestHelpers.checkFooter(page)
      expect(footer.footerVisible).toBeTruthy()
      expect(footer.footerContent).toBeTruthy()

      // Check images
      const images = await TestHelpers.checkImages(page)
      for (const image of images) {
        if (image.src) {
          expect(image.alt).toBeTruthy()
        }
      }

      // Check links
      const links = await TestHelpers.checkLinks(page)
      expect(links.length).toBeGreaterThan(0)

      // Check forms
      const forms = await TestHelpers.checkForms(page)
      // Forms are optional, so we just check that the function works

      // Check SEO
      const seo = await TestHelpers.checkSEO(page)
      expect(seo.description).toBeTruthy()
      expect(seo.viewport).toBeTruthy()

      // Check accessibility
      const accessibility = await TestHelpers.checkAccessibility(page)
      expect(accessibility).toBeTruthy()

      // Check console errors
      const errors = await TestHelpers.checkForConsoleErrors(page)
      expect(errors).toHaveLength(0)

      // Check performance metrics
      const performance = await TestHelpers.checkPerformanceMetrics(page)
      expect(performance).toBeTruthy()
    })
  }

  test('responsive design test', async ({ page }) => {
    await page.goto('/')
    
    const responsive = await TestHelpers.checkResponsiveDesign(page)
    
    expect(responsive.desktop.mainContentVisible).toBeTruthy()
    expect(responsive.tablet.mainContentVisible).toBeTruthy()
    expect(responsive.mobile.mainContentVisible).toBeTruthy()
  })

  test('theme toggle functionality', async ({ page }) => {
    await page.goto('/')
    
    const themeTest = await TestHelpers.checkThemeToggle(page)
    expect(themeTest.themeChanged).toBeTruthy()
  })

  test('accessibility compliance', async ({ page }) => {
    await page.goto('/')
    
    // Check for proper heading structure
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all()
    expect(headings.length).toBeGreaterThan(0)
    
    // Check for proper alt text
    const images = await page.locator('img').all()
    for (const img of images) {
      const alt = await img.getAttribute('alt')
      expect(alt).toBeTruthy()
    }
    
    // Check for proper ARIA labels
    const buttons = await page.locator('button').all()
    for (const button of buttons) {
      const ariaLabel = await button.getAttribute('aria-label')
      const textContent = await button.textContent()
      expect(ariaLabel || textContent?.trim()).toBeTruthy()
    }
  })

  test('performance benchmarks', async ({ page }) => {
    await page.goto('/')
    
    const startTime = Date.now()
    await TestHelpers.waitForPageLoad(page)
    const loadTime = Date.now() - startTime
    
    // Performance budget: 3 seconds
    expect(loadTime).toBeLessThan(3000)
    
    // Check for performance metrics
    const performance = await TestHelpers.checkPerformanceMetrics(page)
    expect(performance).toBeTruthy()
  })

  test('cross-browser compatibility', async ({ page }) => {
    await page.goto('/')
    
    // Test basic functionality across browsers
    const structure = await TestHelpers.checkPageStructure(page)
    expect(structure.hasMain).toBeTruthy()
    
    const navigation = await TestHelpers.checkNavigation(page)
    expect(navigation.Home).toBeTruthy()
    
    const footer = await TestHelpers.checkFooter(page)
    expect(footer.footerVisible).toBeTruthy()
  })

  test('error handling', async ({ page }) => {
    // Test 404 page
    await page.goto('/non-existent-page')
    
    // Should not crash
    await expect(page.locator('body')).toBeVisible()
    
    // Should have some content
    const content = await page.textContent('body')
    expect(content).toBeTruthy()
  })

  test('security headers', async ({ page }) => {
    const response = await page.goto('/')
    
    if (response) {
      const headers = response.headers()
      
      // Check for security headers
      expect(headers['x-frame-options']).toBeTruthy()
      expect(headers['x-content-type-options']).toBeTruthy()
    }
  })

  test('SEO optimization', async ({ page }) => {
    await page.goto('/')
    
    const seo = await TestHelpers.checkSEO(page)
    
    // Check for essential meta tags
    expect(seo.description).toBeTruthy()
    expect(seo.keywords).toBeTruthy()
    expect(seo.viewport).toBeTruthy()
    
    // Check for Open Graph tags
    expect(seo['og:title']).toBeTruthy()
    expect(seo['og:description']).toBeTruthy()
    expect(seo['og:type']).toBeTruthy()
    
    // Check for Twitter Card tags
    expect(seo['twitter:card']).toBeTruthy()
    expect(seo['twitter:title']).toBeTruthy()
    expect(seo['twitter:description']).toBeTruthy()
  })

  test('content integrity', async ({ page }) => {
    await page.goto('/')
    
    // Check that main content is present
    const mainContent = page.locator('main')
    await expect(mainContent).toBeVisible()
    
    // Check that content is not empty
    const content = await mainContent.textContent()
    expect(content).toBeTruthy()
    expect(content!.length).toBeGreaterThan(100)
    
    // Check that images load properly
    const images = await page.locator('img').all()
    for (const img of images) {
      const src = await img.getAttribute('src')
      if (src) {
        await expect(img).toBeVisible()
      }
    }
  })
}) 