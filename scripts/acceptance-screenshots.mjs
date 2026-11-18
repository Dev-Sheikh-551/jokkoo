/**
 * Acceptance screenshot + checks script (phase-5g)
 * Usage: node scripts/acceptance-screenshots.mjs
 * Uses playwright from local node_modules (after: npx playwright install chromium)
 */
import { createRequire } from "module";
import { mkdirSync, readdirSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const req = createRequire(import.meta.url);

// Find playwright in npx cache
function findPlaywright() {
  const cacheDirs = ["C:\\Users\\sheik\\AppData\\Local\\npm-cache\\_npx"];
  for (const base of cacheDirs) {
    try {
      const hashes = readdirSync(base);
      for (const h of hashes) {
        for (const sub of ["playwright", path.join("@playwright", "test")]) {
          try { return req(path.join(base, h, "node_modules", sub)); } catch {}
        }
      }
    } catch {}
  }
  return null;
}

const pw = findPlaywright();
if (!pw) { console.error("playwright not found in npx cache"); process.exit(1); }
const { chromium } = pw;

const OUT_DIR = path.join(__dirname, "../docs/audit-screenshots/phase-5g");
mkdirSync(OUT_DIR, { recursive: true });

const BASE = "http://localhost:3000";

async function shot(page, name) {
  const dest = path.join(OUT_DIR, name);
  await page.screenshot({ path: dest, fullPage: true });
  console.log(`  ✓ ${name}`);
}

async function main() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: "C:\\Users\\sheik\\AppData\\Local\\ms-playwright\\chromium-1255\\chrome-win64\\chrome.exe",
  });

  // ── 390px mobile screenshots ──────────────────────────────────────────────
  console.log("\n── Screenshots at 390×844 ──");
  {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await ctx.newPage();

    for (const [route, name] of [
      ["/", "home-390.png"],
      ["/explore", "explore-390.png"],
      ["/categories", "categories-390.png"],
      ["/join", "join-390.png"],
    ]) {
      await page.goto(BASE + route, { waitUntil: "networkidle", timeout: 30000 });
      await page.waitForTimeout(600);
      await shot(page, name);
    }

    // Profile — top + scrolled to bottom
    await page.goto(BASE + "/professionals/lamin-ceesay", { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(600);
    await shot(page, "profile-390.png");
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(400);
    await shot(page, "profile-bottom-390.png");

    await ctx.close();
  }

  // ── 1360px desktop screenshots ────────────────────────────────────────────
  console.log("\n── Screenshots at 1360×900 ──");
  {
    const ctx = await browser.newContext({ viewport: { width: 1360, height: 900 } });
    const page = await ctx.newPage();

    for (const [route, name] of [
      ["/", "home-1360.png"],
      ["/explore", "explore-1360.png"],
      ["/categories", "categories-1360.png"],
      ["/professionals/lamin-ceesay", "profile-1360.png"],
    ]) {
      await page.goto(BASE + route, { waitUntil: "networkidle", timeout: 30000 });
      await page.waitForTimeout(600);
      await shot(page, name);
    }

    await ctx.close();
  }

  // ── 320px horizontal overflow check ──────────────────────────────────────
  console.log("\n── 320×568 horizontal overflow ──");
  {
    const ctx = await browser.newContext({ viewport: { width: 320, height: 568 } });
    const page = await ctx.newPage();
    let anyOverflow = false;

    for (const route of ["/", "/explore", "/categories"]) {
      await page.goto(BASE + route, { waitUntil: "networkidle", timeout: 20000 });
      await page.waitForTimeout(400);
      const sw = await page.evaluate(() => document.documentElement.scrollWidth);
      const cw = await page.evaluate(() => document.documentElement.clientWidth);
      const overflow = sw > cw;
      if (overflow) anyOverflow = true;
      console.log(`  ${route}: scrollWidth=${sw} clientWidth=${cw} ${overflow ? "OVERFLOW ⚠️" : "OK ✓"}`);
    }

    await ctx.close();
    if (anyOverflow) console.log("  ⚠️  Horizontal overflow detected at 320px");
    else console.log("  ✓ No horizontal overflow at 320px");
  }

  // ── Explore SSR check ────────────────────────────────────────────────────
  console.log("\n── Explore SSR card check ──");
  {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await ctx.newPage();
    // Capture the raw HTML before JS runs
    const response = await page.goto(BASE + "/explore", { waitUntil: "domcontentloaded", timeout: 20000 });
    const html = await response.text();
    const count = (html.match(/href="\/professionals\//g) || []).length;
    const hasErr = html.includes("Hydration failed") || html.includes("There was an error");
    console.log(`  Professional card links in server HTML: ${count} ${count >= 8 ? "✓" : "⚠️ (expected ≥8)"}`);
    console.log(`  Hydration error in HTML: ${hasErr ? "YES ⚠️" : "NO ✓"}`);
    await ctx.close();
  }

  // ── Hero q70 vs q75 comparison images ────────────────────────────────────
  console.log("\n── Hero quality comparison (q=70 vs q=75) ──");
  {
    const ctx = await browser.newContext({ viewport: { width: 420, height: 420 } });
    const page = await ctx.newPage();
    for (const q of [75, 70]) {
      const imgUrl = `${BASE}/_next/image?url=%2Fimages%2Fcategories%2Felectrical.jpg&w=384&q=${q}`;
      await page.setContent(`<!DOCTYPE html><html><body style="margin:0;background:#fff;"><img src="${imgUrl}" style="display:block;width:384px;height:auto;" /></body></html>`);
      await page.waitForTimeout(500);
      await shot(page, `hero-compare-q${q}.png`);
    }
    await ctx.close();
  }

  await browser.close();
  console.log("\n✅ Done. Screenshots in docs/audit-screenshots/phase-5g/");
}

main().catch(err => {
  console.error("FAILED:", err.message);
  process.exit(1);
});
