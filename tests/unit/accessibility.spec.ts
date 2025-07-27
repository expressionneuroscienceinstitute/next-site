import { test, expect } from '@playwright/test'

test.describe('Accessibility Unit Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should have proper heading structure', async ({ page }) => {
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all()
    expect(headings.length).toBeGreaterThan(0)
    
    // Check for at least one h1
    const h1Elements = await page.locator('h1').all()
    expect(h1Elements.length).toBeGreaterThan(0)
  })

  test('should have proper alt text for images', async ({ page }) => {
    const images = await page.locator('img').all()
    
    for (const img of images) {
      const alt = await img.getAttribute('alt')
      expect(alt).toBeTruthy()
    }
  })

  test('should have proper ARIA labels', async ({ page }) => {
    const buttons = await page.locator('button').all()
    
    for (const button of buttons) {
      const ariaLabel = await button.getAttribute('aria-label')
      const textContent = await button.textContent()
      
      // Either aria-label or text content should be present
      expect(ariaLabel || textContent?.trim()).toBeTruthy()
    }
  })

  test('should have proper focus indicators', async ({ page }) => {
    const focusableElements = await page.locator('a, button, input, textarea, select').all()
    
    for (const element of focusableElements) {
      await element.focus()
      const isVisible = await element.isVisible()
      if (isVisible) {
        // Check if element has focus styles
        const computedStyle = await element.evaluate(el => {
          const style = window.getComputedStyle(el)
          return {
            outline: style.outline,
            boxShadow: style.boxShadow
          }
        })
        
        expect(computedStyle.outline !== 'none' || computedStyle.boxShadow !== 'none').toBeTruthy()
      }
    }
  })

  test('should have proper color contrast', async ({ page }) => {
    // This is a basic check - in a real scenario you'd use a more sophisticated contrast checker
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

  test('should have proper semantic HTML', async ({ page }) => {
    // Check for semantic elements
    await expect(page.locator('main')).toBeVisible()
    await expect(page.locator('nav')).toBeVisible()
    await expect(page.locator('footer')).toBeVisible()
  })

  test('should have proper language attribute', async ({ page }) => {
    const html = page.locator('html')
    await expect(html).toHaveAttribute('lang', 'en')
  })
}) 