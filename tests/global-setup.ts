import { chromium, FullConfig } from '@playwright/test'

async function globalSetup(config: FullConfig) {
  const { baseURL } = config.projects[0].use
  
  // Start the browser and perform any global setup
  const browser = await chromium.launch()
  const page = await browser.newPage()
  
  // Navigate to the site to ensure it's ready
  await page.goto(baseURL as string)
  
  // Wait for the page to be fully loaded
  await page.waitForLoadState('networkidle')
  
  await browser.close()
}

export default globalSetup 