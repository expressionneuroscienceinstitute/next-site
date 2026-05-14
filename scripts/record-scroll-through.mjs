/**
 * One continuous WebM scroll-through (requires server on PORT).
 * Usage: PORT=3456 node scripts/record-scroll-through.mjs
 */
import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'

const port = process.env.PORT || '3456'
const base = `http://127.0.0.1:${port}`
const outDir = path.join(process.cwd(), 'artifacts', 'scroll-recordings')

fs.mkdirSync(outDir, { recursive: true })

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function slowScroll(page) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight)
  const viewport = await page.evaluate(() => window.innerHeight)
  const max = Math.max(0, height - viewport)
  const step = Math.max(260, Math.floor(viewport * 0.32))
  for (let y = 0; y <= max; y += step) {
    await page.evaluate((scrollY) => window.scrollTo({ top: scrollY, behavior: 'instant' }), y)
    await sleep(130)
  }
  await page.evaluate(() =>
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }),
  )
  await sleep(700)
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
  await sleep(350)
}

const browser = await chromium.launch()
const context = await browser.newContext({
  viewport: { width: 1280, height: 720 },
  recordVideo: { dir: outDir, size: { width: 1280, height: 720 } },
})
const page = await context.newPage()

const routes = ['/', '/programs', '/programs/microneedle-eeg', '/research', '/about', '/contact', '/donate', '/governance']

for (const route of routes) {
  await page.goto(`${base}${route}`, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await sleep(500)
  await slowScroll(page)
  await sleep(400)
}

await context.close()
await browser.close()

const files = fs
  .readdirSync(outDir)
  .filter((f) => f.endsWith('.webm'))
  .map((f) => ({ f, t: fs.statSync(path.join(outDir, f)).mtimeMs }))
  .sort((a, b) => b.t - a.t)

const latest = files[0]?.f
let finalPath = null
if (latest) {
  finalPath = path.join(outDir, 'site-scroll-through.webm')
  fs.renameSync(path.join(outDir, latest), finalPath)
}

const manifest = {
  recordedAt: new Date().toISOString(),
  baseUrl: base,
  video: finalPath ? path.relative(process.cwd(), finalPath) : null,
}
fs.writeFileSync(path.join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 2), 'utf8')
console.log(JSON.stringify(manifest, null, 2))
