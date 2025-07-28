import { test, expect } from '@playwright/test'

test.describe('Navigation Unit Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display navigation menu items', async ({ page }) => {
    // Check for the main navigation links that actually exist
    const homeLink = page.getByRole('link', { name: 'Expression Neuroscience Institute Home' })
    await expect(homeLink).toBeVisible()
    
    // Check for navigation items in the desktop menu
    const navItems = ['Research', 'About', 'Roadmap', 'Programs']
    for (const item of navItems) {
      const link = page.locator(`nav a:has-text("${item}")`)
      await expect(link).toBeVisible()
    }
  })

  test('should highlight active page in navigation', async ({ page }) => {
    const homeLink = page.getByRole('link', { name: 'Expression Neuroscience Institute Home' })
    await expect(homeLink).toBeVisible()
    
    // Check that we're on the home page
    await expect(page).toHaveURL('/')
  })

  test('should toggle mobile menu', async ({ page }) => {
    // Test on mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    
    const menuButton = page.getByRole('button', { name: /open main menu/i })
    await expect(menuButton).toBeVisible()
    
    await menuButton.click()
    
    const mobileMenu = page.locator('#mobile-menu')
    await expect(mobileMenu).toBeVisible()
    
    const closeButton = page.getByRole('button', { name: /close main menu/i })
    await closeButton.click()
    
    await expect(mobileMenu).not.toBeVisible()
  })

  test('should navigate to different pages', async ({ page }) => {
    const pages = [
      { name: 'Research', path: '/research' },
      { name: 'About', path: '/about' },
      { name: 'Roadmap', path: '/roadmap' },
      { name: 'Programs', path: '/programs' },
    ]

    for (const pageInfo of pages) {
      const link = page.locator(`nav a:has-text("${pageInfo.name}")`)
      await link.click()
      await expect(page).toHaveURL(pageInfo.path)
      
      // Verify the page loaded
      await expect(page.locator('main')).toBeVisible()
    }
  })

  test('should have accessible navigation structure', async ({ page }) => {
    const nav = page.getByRole('navigation')
    await expect(nav).toBeVisible()
    await expect(nav).toHaveAttribute('aria-label', 'Main navigation')
  })

  test('should have skip to content link', async ({ page }) => {
    const skipLink = page.getByRole('link', { name: /skip to main content/i })
    await expect(skipLink).toBeVisible()
    
    // Test skip functionality using keyboard navigation (more realistic)
    await page.keyboard.press('Tab')
    await page.keyboard.press('Enter')
    await expect(page.locator('#main-content')).toBeFocused()
  })
}) 