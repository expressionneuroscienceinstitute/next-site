import { Page, expect } from '@playwright/test'

export class TestHelpers {
  static async waitForPageLoad(page: Page) {
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(1000) // Additional wait for animations
  }

  static async checkForConsoleErrors(page: Page): Promise<string[]> {
    const errors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text())
      }
    })
    return errors
  }

  static async checkPerformanceMetrics(page: Page) {
    const metrics = await page.evaluate(() => {
      return new Promise((resolve) => {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          resolve({
            lcp: entries.find(entry => entry.entryType === 'largest-contentful-paint')?.startTime || 0,
            fid: (entries.find(entry => entry.entryType === 'first-input') as any)?.processingStart || 0,
            cls: entries.filter(entry => entry.entryType === 'layout-shift').reduce((sum, entry) => sum + (entry as any).value, 0)
          })
        })
        observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] })
      })
    })
    return metrics
  }

  static async checkAccessibility(page: Page) {
    const snapshot = await page.accessibility.snapshot()
    return snapshot
  }

  static async checkSEO(page: Page) {
    const metaTags = await page.locator('meta').all()
    const seoData: Record<string, string> = {}
    
    for (const meta of metaTags) {
      const name = await meta.getAttribute('name')
      const property = await meta.getAttribute('property')
      const content = await meta.getAttribute('content')
      
      if (name) {
        seoData[name] = content || ''
      } else if (property) {
        seoData[property] = content || ''
      }
    }
    
    return seoData
  }

  static async checkImages(page: Page) {
    const images = await page.locator('img').all()
    const imageData: Array<{ src: string | null, alt: string | null, loading: string | null }> = []
    
    for (const img of images) {
      imageData.push({
        src: await img.getAttribute('src'),
        alt: await img.getAttribute('alt'),
        loading: await img.getAttribute('loading')
      })
    }
    
    return imageData
  }

  static async checkLinks(page: Page) {
    const links = await page.locator('a').all()
    const linkData: Array<{ href: string | null, text: string | null }> = []
    
    for (const link of links) {
      linkData.push({
        href: await link.getAttribute('href'),
        text: await link.textContent()
      })
    }
    
    return linkData
  }

  static async checkForms(page: Page) {
    const forms = await page.locator('form').all()
    const formData: Array<{ action: string | null, method: string | null }> = []
    
    for (const form of forms) {
      formData.push({
        action: await form.getAttribute('action'),
        method: await form.getAttribute('method')
      })
    }
    
    return formData
  }

  static async checkResponsiveDesign(page: Page) {
    const viewports = [
      { width: 1920, height: 1080, name: 'desktop' },
      { width: 768, height: 1024, name: 'tablet' },
      { width: 375, height: 667, name: 'mobile' }
    ]
    
    const results: Record<string, any> = {}
    
    for (const viewport of viewports) {
      await page.setViewportSize(viewport)
      await page.waitForTimeout(500)
      
      const mainContent = page.locator('main')
      const isVisible = await mainContent.isVisible()
      
      results[viewport.name] = {
        width: viewport.width,
        height: viewport.height,
        mainContentVisible: isVisible
      }
    }
    
    return results
  }

  static async checkThemeToggle(page: Page) {
    const themeToggle = page.getByRole('button', { name: /toggle theme/i })
    await expect(themeToggle).toBeVisible()
    
    const initialTheme = await page.evaluate(() => {
      return document.documentElement.classList.contains('dark')
    })
    
    await themeToggle.click()
    await page.waitForTimeout(100)
    
    const newTheme = await page.evaluate(() => {
      return document.documentElement.classList.contains('dark')
    })
    
    return {
      initialTheme,
      newTheme,
      themeChanged: initialTheme !== newTheme
    }
  }

  static async checkNavigation(page: Page) {
    const navItems = ['Research', 'About', 'Roadmap', 'Programs']
    const navResults: Record<string, boolean> = {}
    
    // Check home link
    const homeLink = page.getByRole('link', { name: 'Expression Neuroscience Institute Home' })
    navResults['Home'] = await homeLink.isVisible()
    
    // Check other navigation items
    for (const item of navItems) {
      const link = page.locator(`nav a:has-text("${item}")`)
      navResults[item] = await link.isVisible()
    }
    
    return navResults
  }

  static async checkFooter(page: Page) {
    const footer = page.locator('footer')
    const isVisible = await footer.isVisible()
    
    return {
      footerVisible: isVisible,
      footerContent: await footer.textContent()
    }
  }

  static async checkPageTitle(page: Page) {
    const title = await page.title()
    return title
  }

  static async checkPageURL(page: Page) {
    const url = page.url()
    return url
  }

  static async checkPageContent(page: Page) {
    const mainContent = page.locator('main')
    const content = await mainContent.textContent()
    return content
  }

  static async checkPageStructure(page: Page) {
    const structure = {
      hasHeader: await page.locator('header, nav').isVisible(),
      hasMain: await page.locator('main').isVisible(),
      hasFooter: await page.locator('footer').isVisible(),
      hasSkipLink: await page.getByRole('link', { name: /skip to main content/i }).isVisible()
    }
    
    return structure
  }
} 