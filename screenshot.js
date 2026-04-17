const puppeteer = require('puppeteer');
const path = require('path');

async function takeScreenshots() {
  const browser = await puppeteer.launch({ headless: true });

  const viewports = [
    { name: 'desktop', width: 1440, height: 900 },
    { name: 'tablet',  width: 768,  height: 1024 },
    { name: 'mobile',  width: 390,  height: 844 },
  ];

  for (const vp of viewports) {
    const page = await browser.newPage();
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

    // Full-page screenshot
    const file = path.join(__dirname, `screenshot-${vp.name}.png`);
    await page.screenshot({ path: file, fullPage: true });
    console.log(`✓ ${vp.name} → ${file}`);

    await page.close();
  }

  await browser.close();
  console.log('\nDone.');
}

takeScreenshots().catch(console.error);
