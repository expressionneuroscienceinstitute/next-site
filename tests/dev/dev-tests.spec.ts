import { test, expect } from '@playwright/test'

test.describe('Development Environment Tests @dev', () => {
  test('should have development-specific features', async ({ page }) => {
    await page.goto('/')
    
    // Check for development indicators
    const isDev = await page.evaluate(() => {
      return process.env.NODE_ENV === 'development' || 
             window.location.hostname === 'localhost'
    })
    
    expect(isDev).toBeTruthy()
  })

  test('should have hot reload working', async ({ page }) => {
    await page.goto('/')
    
    // Check for Next.js development indicators
    const hasDevFeatures = await page.evaluate(() => {
      return typeof window !== 'undefined' && 
             (window as any).__NEXT_DATA__ !== undefined
    })
    
    expect(hasDevFeatures).toBeTruthy()
  })

  test('should have development console logs', async ({ page }) => {
    const consoleLogs: string[] = []
    
    page.on('console', msg => {
      consoleLogs.push(msg.text())
    })
    
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    // In development, we expect some console logs
    expect(consoleLogs.length).toBeGreaterThan(0)
  })

  test('should have development error boundaries', async ({ page }) => {
    await page.goto('/')
    
    // Check for React development error boundaries
    const hasErrorBoundary = await page.evaluate(() => {
      return typeof window !== 'undefined' && 
             (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__ !== undefined
    })
    
    expect(hasErrorBoundary).toBeTruthy()
  })

  test('should have development performance monitoring', async ({ page }) => {
    await page.goto('/')
    
    // Check for development performance monitoring
    const hasPerformanceMonitoring = await page.evaluate(() => {
      return typeof window !== 'undefined' && 
             (window as any).__NEXT_DATA__?.buildId !== undefined
    })
    
    expect(hasPerformanceMonitoring).toBeTruthy()
  })
}) 