import { test, expect } from '@playwright/test'

test.describe('Performance Tests', () => {
  test('should load homepage within performance budget', async ({ page }) => {
    const startTime = Date.now()
    
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    const loadTime = Date.now() - startTime
    
    // Performance budget: 3 seconds for initial load
    expect(loadTime).toBeLessThan(3000)
  })

  test('should have acceptable Core Web Vitals', async ({ page }) => {
    await page.goto('/')
    
    // Measure Largest Contentful Paint (LCP)
    const lcp = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1]
          resolve(lastEntry.startTime)
        }).observe({ entryTypes: ['largest-contentful-paint'] })
      })
    })
    
    // LCP should be under 2.5 seconds
    expect(lcp).toBeLessThan(2500)
  })

  test('should have acceptable First Input Delay', async ({ page }) => {
    await page.goto('/')
    
    // Measure First Input Delay (FID)
    const fid = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const firstEntry = entries[0] as any
          resolve(firstEntry.processingStart - firstEntry.startTime)
        }).observe({ entryTypes: ['first-input'] })
      })
    })
    
    // FID should be under 100ms
    expect(fid).toBeLessThan(100)
  })

  test('should have acceptable Cumulative Layout Shift', async ({ page }) => {
    await page.goto('/')
    
    // Measure Cumulative Layout Shift (CLS)
    const cls = await page.evaluate(() => {
      return new Promise((resolve) => {
        let clsValue = 0
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const layoutShiftEntry = entry as any
            if (!layoutShiftEntry.hadRecentInput) {
              clsValue += layoutShiftEntry.value
            }
          }
          resolve(clsValue)
        }).observe({ entryTypes: ['layout-shift'] })
      })
    })
    
    // CLS should be under 0.1
    expect(cls).toBeLessThan(0.1)
  })

  test('should load images efficiently', async ({ page }) => {
    await page.goto('/')
    
    const images = await page.locator('img').all()
    
    for (const img of images) {
      const src = await img.getAttribute('src')
      if (src) {
        // Check if image has proper loading attributes
        const loading = await img.getAttribute('loading')
        expect(loading === 'lazy' || loading === 'eager').toBeTruthy()
      }
    }
  })

  test('should have optimized bundle size', async ({ page }) => {
    const response = await page.goto('/')
    
    // Check response headers for compression
    if (response) {
      const contentEncoding = response.headers()['content-encoding']
      expect(contentEncoding === 'gzip' || contentEncoding === 'br').toBeTruthy()
    }
  })

  test('should have acceptable Time to Interactive', async ({ page }) => {
    await page.goto('/')
    
    // Measure Time to Interactive (TTI)
    const tti = await page.evaluate(() => {
      return new Promise((resolve) => {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.name === 'TTI') {
              resolve(entry.startTime)
              observer.disconnect()
            }
          }
        })
        observer.observe({ entryTypes: ['measure'] })
      })
    })
    
    // TTI should be under 3.8 seconds
    expect(tti).toBeLessThan(3800)
  })

  test('should have efficient resource loading', async ({ page }) => {
    const resourceSizes: number[] = []
    
    page.on('response', response => {
      const contentLength = response.headers()['content-length']
      if (contentLength) {
        resourceSizes.push(parseInt(contentLength))
      }
    })
    
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    // Total resource size should be reasonable
    const totalSize = resourceSizes.reduce((sum, size) => sum + size, 0)
    expect(totalSize).toBeLessThan(5 * 1024 * 1024) // 5MB limit
  })
}) 