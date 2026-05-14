/**
 * Verifies homepage CSS + hero visibility (requires server on PORT).
 * Usage: PORT=3765 node scripts/verify-site-render.mjs
 */
import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'

const port = process.env.PORT || '3765'
const base = `http://127.0.0.1:${port}`
const outDir = path.join(process.cwd(), 'artifacts', 'verify')

fs.mkdirSync(outDir, { recursive: true })

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } })

const cssRequests = []
page.on('response', (res) => {
  const u = res.url()
  if (u.includes('/_next/static/css/') && u.endsWith('.css')) {
    cssRequests.push({ url: u, status: res.status() })
  }
})

await page.goto(`${base}/`, { waitUntil: 'networkidle', timeout: 60000 })

const h1 = page.locator('main h1').first()
const h1Visible = await h1.isVisible()
const h1Opacity = await h1.evaluate((el) => getComputedStyle(el).opacity)
const h1Font = await h1.evaluate((el) => getComputedStyle(el).fontFamily)
const h1Color = await h1.evaluate((el) => getComputedStyle(el).color)
const bodyBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor)

await page.screenshot({ path: path.join(outDir, 'home-viewport.png'), fullPage: false })

await page.setViewportSize({ width: 1280, height: 2400 })
await page.screenshot({ path: path.join(outDir, 'home-fullpage.png'), fullPage: true })

const report = {
  base,
  cssResponses: cssRequests,
  hero: {
    h1Visible,
    h1Opacity,
    h1Font: h1Font?.slice(0, 120),
    h1Color,
  },
  bodyBackground: bodyBg,
  screenshots: ['home-viewport.png', 'home-fullpage.png'].map((f) => path.join(outDir, f)),
}

fs.writeFileSync(path.join(outDir, 'report.json'), JSON.stringify(report, null, 2))
console.log(JSON.stringify(report, null, 2))

await browser.close()
