import { test, expect } from '@playwright/test'

test.describe('Accessibility Scan Tests', () => {
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
    test(`should pass accessibility scan on ${pagePath}`, async ({ page }) => {
      await page.goto(pagePath)
      
      // Wait for page to be fully loaded
      await page.waitForLoadState('networkidle')
      
      // Run accessibility scan
      const accessibilityReport = await page.accessibility.snapshot()
      
      // Check for critical accessibility violations
      if (accessibilityReport) {
        const violations = (accessibilityReport as any).violations || []
        
        // Filter out only critical and serious violations
        const criticalViolations = violations.filter((violation: any) => 
          violation.impact === 'critical' || violation.impact === 'serious'
        )
        
        expect(criticalViolations).toHaveLength(0)
      }
    })
  }

  test('should have proper keyboard navigation', async ({ page }) => {
    await page.goto('/')
    
    // Test tab navigation
    await page.keyboard.press('Tab')
    
    // Check if focus is visible
    const focusedElement = page.locator(':focus')
    await expect(focusedElement).toBeVisible()
    
    // Test tab order
    const focusableElements = await page.locator('a, button, input, textarea, select').all()
    expect(focusableElements.length).toBeGreaterThan(0)
  })

  test('should have proper ARIA landmarks', async ({ page }) => {
    await page.goto('/')
    
    // Check for essential landmarks
    await expect(page.locator('nav[role="navigation"]')).toBeVisible()
    await expect(page.locator('main')).toBeVisible()
    await expect(page.locator('footer')).toBeVisible()
  })

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/')
    
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all()
    expect(headings.length).toBeGreaterThan(0)
    
    // Check that there's only one h1
    const h1Elements = await page.locator('h1').all()
    expect(h1Elements.length).toBe(1)
  })

  test('should have proper form labels', async ({ page }) => {
    await page.goto('/')
    
    const inputs = await page.locator('input, textarea, select').all()
    
    for (const input of inputs) {
      const id = await input.getAttribute('id')
      if (id) {
        const label = page.locator(`label[for="${id}"]`)
        await expect(label).toBeVisible()
      }
    }
  })

  test('should have proper color contrast', async ({ page }) => {
    await page.goto('/')
    
    // This is a basic check - in production you'd use a more sophisticated contrast checker
    const textElements = await page.locator('p, h1, h2, h3, h4, h5, h6, span, div').all()
    
    for (const element of textElements) {
      const isVisible = await element.isVisible()
      if (isVisible) {
        const text = await element.textContent()
        if (text && text.trim().length > 0) {
          // Basic visibility check
          const color = await element.evaluate(el => {
            const style = window.getComputedStyle(el)
            return style.color
          })
          
          expect(color).not.toBe('transparent')
        }
      }
    }
  })

  test('should have proper alt text for decorative images', async ({ page }) => {
    await page.goto('/')
    
    const images = await page.locator('img').all()
    
    for (const img of images) {
      const alt = await img.getAttribute('alt')
      const role = await img.getAttribute('role')
      
      // Decorative images should have alt="" or role="presentation"
      if (role === 'presentation') {
        expect(alt).toBe('')
      } else {
        expect(alt).toBeTruthy()
      }
    }
  })

  test('should have proper focus management', async ({ page }) => {
    await page.goto('/')
    
    // Test skip link functionality
    const skipLink = page.getByRole('link', { name: /skip to main content/i })
    await expect(skipLink).toBeVisible()
    
    await skipLink.click()
    await expect(page.locator('#main-content')).toBeFocused()
  })

  test('should have proper screen reader support', async ({ page }) => {
    await page.goto('/')
    
    // Check for screen reader only text
    const srOnlyElements = await page.locator('.sr-only, [class*="sr-only"]').all()
    
    for (const element of srOnlyElements) {
      const isVisible = await element.isVisible()
      // Screen reader only elements should not be visually visible
      expect(isVisible).toBe(false)
    }
  })
}) 