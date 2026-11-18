/**
 * Axe-core accessibility check using playwright from npx cache.
 * Injects axe-core via CDN script tag to avoid npm install.
 * Usage: node scripts/axe-check.mjs
 */
import { createRequire } from "module";
import { readdirSync } from "fs";
import path from "path";

const req = createRequire(import.meta.url);

// Find playwright in npx cache or local node_modules
let playwright;
const cacheDirs = [
  "C:\\Users\\sheik\\AppData\\Local\\npm-cache\\_npx",
];

function findPlaywright() {
  for (const base of cacheDirs) {
    try {
      const hashes = readdirSync(base);
      for (const h of hashes) {
        const candidate = path.join(base, h, "node_modules", "playwright");
        try {
          return req(candidate);
        } catch {}
        const candidate2 = path.join(base, h, "node_modules", "@playwright", "test");
        try {
          return req(candidate2);
        } catch {}
      }
    } catch {}
  }
  return null;
}

playwright = findPlaywright();
if (!playwright) {
  console.error("Could not find playwright in npx cache. Run: npx playwright install chromium");
  process.exit(1);
}

const { chromium } = playwright;
const BASE = "http://localhost:3000";
const ROUTES = ["/", "/explore", "/categories", "/professionals/lamin-ceesay", "/join"];

// axe-core CDN URL
const AXE_CDN = "https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.9.1/axe.min.js";

async function runAxe(page) {
  // Inject axe from CDN
  await page.addScriptTag({ url: AXE_CDN });
  return await page.evaluate(() => {
    return new Promise((resolve) => {
      // @ts-expect-error axe is injected globally by addScriptTag
      window.axe.run({ runOnly: { type: "tag", values: ["wcag2a", "wcag2aa"] } }).then(resolve);
    });
  });
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });

  let totalViolations = 0;

  for (const route of ROUTES) {
    const page = await ctx.newPage();
    try {
      await page.goto(BASE + route, { waitUntil: "networkidle", timeout: 30000 });
      await page.waitForTimeout(800);
      const results = await runAxe(page);
      const v = results.violations;
      totalViolations += v.length;

      if (v.length === 0) {
        console.log(`✓ ${route}: 0 violations`);
      } else {
        console.log(`⚠️  ${route}: ${v.length} violations`);
        for (const item of v) {
          console.log(`   [${item.impact}] ${item.id}: ${item.description} (${item.nodes.length} nodes)`);
          for (const node of item.nodes.slice(0, 2)) {
            console.log(`      ${(node.target || []).join(", ")}`);
          }
        }
      }
    } catch (err) {
      console.error(`  ERROR on ${route}: ${err.message}`);
    }
    await page.close();
  }

  await browser.close();
  console.log(`\nTotal violations: ${totalViolations}`);
  process.exit(totalViolations > 0 ? 1 : 0);
}

main().catch(err => {
  console.error("FAILED:", err.message);
  process.exit(1);
});
